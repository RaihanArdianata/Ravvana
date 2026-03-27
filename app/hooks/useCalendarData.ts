import { useEffect, useState } from 'react';


const SHEETDB_API_ID = 'k4luibx5tu96p';
const BASE_URL = `https://sheetdb.io/api/v1/${SHEETDB_API_ID}`;
const CACHE_KEY = 'portfolio_calendar_data';
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes

export interface Milestone {
  date: string;
  day: number;
  text: string;
}

export interface LearningItem {
  startDate: string;
  title: string;
  meta: string;
  status: string;
}

export interface ReadingItem {
  startDate: string;
  title: string;
  author: string;
  progress: number;
  status: string;
}

export interface CurrentWork {
  updatedAt: string;
  project: string;
  description: string;
}

export interface CalendarData {
  milestones: Milestone[];
  learning: LearningItem[];
  reading: ReadingItem[];
  explore: string[];
  currentWork: CurrentWork | null;
}

interface CacheEntry {
  data: CalendarData;
  cachedAt: number;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(data: CalendarData) {
  try {
    const entry: CacheEntry = { data, cachedAt: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
  }
}

function isFresh(entry: CacheEntry): boolean {
  return Date.now() - entry.cachedAt < CACHE_TTL_MS;
}

function cacheAge(entry: CacheEntry): string {
  const mins = Math.floor((Date.now() - entry.cachedAt) / 60000);
  return mins < 1 ? 'just now' : `${mins}m ago`;
}

async function fetchSheet(sheet: string, expectedKeys: string[]): Promise<any[]> {
  const url = new URL(BASE_URL);
  url.searchParams.set('sheet', sheet);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`SheetDB ${sheet}: ${res.status}`);

  const json = await res.json();
  if (!Array.isArray(json)) throw new Error(`SheetDB ${sheet}: unexpected response`);

  return json.filter((row) =>
    expectedKeys.some((k) => row[k] !== undefined && String(row[k]).trim() !== ''),
  );
}

function parseDate(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function isSameMonthYear(dateStr: string, ref: Date): boolean {
  const d = parseDate(dateStr);
  if (!d) return false;
  return d.getMonth() === ref.getMonth() && d.getFullYear() === ref.getFullYear();
}

async function fetchAllData(): Promise<CalendarData> {
  const [milestoneRows, learningRows, readingRows, exploreRows, currentRows] =
    await Promise.all([
      fetchSheet('milestones', ['date', 'text']),
      fetchSheet('learning', ['title', 'status']),
      fetchSheet('reading', ['title', 'status']),
      fetchSheet('explore', ['tech']),
      fetchSheet('current', ['project']),
    ]);

  const now = new Date();

  const milestones: Milestone[] = milestoneRows
    .filter((r) => r.date && r.text)
    .map((r) => {
      const d = parseDate(String(r.date));
      return d ? { date: d.toISOString(), day: d.getDate(), text: String(r.text) } : null;
    })
    .filter((m): m is Milestone => m !== null && isSameMonthYear(m.date, now))
    .sort((a, b) => b.day - a.day);

  const learning: LearningItem[] = learningRows
    .filter((r) => r.title && String(r.status ?? '').toLowerCase() === 'active')
    .map((r) => ({
      startDate: parseDate(String(r.start_date ?? ''))?.toISOString() ?? new Date(0).toISOString(),
      title: String(r.title),
      meta: String(r.meta ?? ''),
      status: String(r.status ?? 'Active'),
    }))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const reading: ReadingItem[] = readingRows
    .filter((r) => r.title && String(r.status ?? '').toLowerCase() === 'reading')
    .map((r) => ({
      startDate: parseDate(String(r.start_date ?? ''))?.toISOString() ?? new Date(0).toISOString(),
      title: String(r.title),
      author: String(r.author ?? ''),
      progress: parseInt(String(r.progress ?? '0'), 10) || 0,
      status: String(r.status ?? 'Reading'),
    }))
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const explore: string[] = exploreRows
    .filter((r) => r.tech)
    .map((r) => String(r.tech));

  const cr = currentRows[0];
  const currentWork: CurrentWork | null = cr?.project
    ? {
      updatedAt: parseDate(String(cr.updated_at ?? ''))?.toISOString() ?? new Date().toISOString(),
      project: String(cr.project),
      description: String(cr.description ?? ''),
    }
    : null;

  return { milestones, learning, reading, explore, currentWork };
}

export function useCalendarData() {
  const cached = readCache();

  const [data, setData] = useState<CalendarData>(
    cached?.data ?? { milestones: [], learning: [], reading: [], explore: [], currentWork: null },
  );
  const [loading, setLoading] = useState(!cached); // no spinner if cache hit
  const [revalidating, setRevalidating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(
    cached ? cacheAge(cached) : null,
  );

  useEffect(() => {
    const entry = readCache();

    if (entry && isFresh(entry)) {
      setData(entry.data);
      setLastUpdated(cacheAge(entry));
      setLoading(false);
      return;
    }

    const isBackground = !!entry;
    if (isBackground) {
      setRevalidating(true);
    } else {
      setLoading(true);
    }

    let cancelled = false;

    fetchAllData()
      .then((fresh) => {
        if (cancelled) return;
        writeCache(fresh);
        setData(fresh);
        setLastUpdated('just now');
        setError(null);
      })
      .catch((e) => {
        if (cancelled) return;
        console.error('[useCalendarData]', e);
        if (!entry) {
          setError('Failed to load — check SheetDB API ID or sheet tab names.');
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
          setRevalidating(false);
        }
      });

    return () => { cancelled = true; };
  }, []);

  return { data, loading, revalidating, error, lastUpdated };
}

export function clearCalendarCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch { }
}