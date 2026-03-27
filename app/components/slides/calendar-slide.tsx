import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useCalendarData } from '~/hooks/useCalendarData';

const GH_USER = 'Mad1Duck';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface GhStats {
  repos: number | null;
  stars: number | null;
  followers: number | null;
}

function useGitHubStats() {
  const [stats, setStats] = useState<GhStats>({ repos: null, stars: null, followers: null });

  useEffect(() => {
    fetch(`https://api.github.com/users/${GH_USER}`)
      .then((r) => r.json())
      .then((d) =>
        setStats((s) => ({ ...s, repos: d.public_repos ?? null, followers: d.followers ?? null })),
      )
      .catch(() => {});

    fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100`)
      .then((r) => r.json())
      .then((repos: any[]) => {
        const stars = repos.reduce((acc, r) => acc + (r.stargazers_count ?? 0), 0);
        setStats((s) => ({ ...s, stars }));
      })
      .catch(() => {});
  }, []);

  return stats;
}

function SectionCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border border-border rounded-xs overflow-hidden">
      <div className="flex items-center gap-2 px-3.5 py-2.5 border-b border-border bg-secondary/40">
        <span className="text-[12px] text-muted-foreground">{icon}</span>
        <span className="font-mono text-[9px] tracking-[0.08em] text-muted-foreground uppercase">
          {title}
        </span>
      </div>
      <div className="px-3.5 py-3 flex flex-col gap-3">{children}</div>
    </div>
  );
}

function SkeletonLine({ w = 'w-full' }: { w?: string }) {
  return <div className={`h-3 rounded bg-border animate-pulse ${w}`} />;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function CalendarSlide() {
  const now = new Date();
  const month = MONTHS[now.getMonth()];
  const year = now.getFullYear();
  const today = now.getDate();
  const daysInMonth = new Date(year, now.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, now.getMonth(), 1).getDay();
  const totalRows = Math.ceil((firstDay + daysInMonth) / 7);

  const { data, loading, error } = useCalendarData();
  const stats = useGitHubStats();

  const milestoneDays = new Set(data.milestones.map((m) => m.day));

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.038] animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '180px 180px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center h-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="border-r border-border flex flex-col gap-5 px-8 py-7 overflow-y-auto">
          {/* Month heading */}
          <motion.div variants={itemVariants} className="flex items-stretch gap-3">
            <div className="w-0.75 bg-[#2d4a2d] rounded-sm shrink-0" />
            <div>
              <h1 className="font-serif text-4xl font-black leading-none tracking-tight">
                {month}
              </h1>
              <p className="font-mono text-[11px] text-muted-foreground mt-1">{year}</p>
            </div>
          </motion.div>

          {/* Calendar grid */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <div className="grid grid-cols-7 gap-1">
              {DAYS.map((d) => (
                <div
                  key={d}
                  className="font-mono text-[9px] text-muted-foreground text-center py-1 tracking-widest uppercase">
                  {d}
                </div>
              ))}
            </div>
            {Array.from({ length: totalRows }).map((_, row) => (
              <div key={row} className="grid grid-cols-7 gap-1">
                {Array.from({ length: 7 }).map((_, col) => {
                  const dayNum = row * 7 + col - firstDay + 1;
                  if (dayNum < 1 || dayNum > daysInMonth) {
                    return <div key={col} className="h-8" />;
                  }
                  const isToday = dayNum === today;
                  const hasEvent = milestoneDays.has(dayNum);
                  return (
                    <div
                      key={col}
                      className={`
                        h-8 flex items-center justify-center font-mono text-[11px]
                        border rounded-xs cursor-default transition-all
                        ${
                          isToday
                            ? 'bg-[#1a2e1a] text-[#f0f4f0] border-[#1a2e1a] font-semibold'
                            : hasEvent
                              ? 'bg-[#e8f0e8] text-[#1a2e1a] border-[#2d4a2d30]'
                              : 'border-border text-muted-foreground hover:bg-secondary hover:text-foreground'
                        }
                      `}>
                      {dayNum}
                    </div>
                  );
                })}
              </div>
            ))}
          </motion.div>

          {/* Milestones */}
          <motion.div variants={itemVariants}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-2">
              Milestones
            </p>
            <div className="flex flex-col gap-1.5">
              {loading ? (
                <>
                  <SkeletonLine />
                  <SkeletonLine w="w-3/4" />
                  <SkeletonLine w="w-5/6" />
                </>
              ) : error ? (
                <p className="font-mono text-[10px] text-muted-foreground/50 italic">{error}</p>
              ) : data.milestones.length === 0 ? (
                <p className="font-mono text-[10px] text-muted-foreground/50 italic">
                  No milestones this month.
                </p>
              ) : (
                data.milestones.map((m, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2 border border-border rounded-xs hover:border-[#2d4a2d30] hover:bg-[#e8f0e8] transition-all group">
                    <span className="font-mono text-[10px] text-[#1a2e1a] bg-[#e8f0e8] border border-[#2d4a2d30] px-2 py-0.5 rounded-xs whitespace-nowrap group-hover:bg-[#1a2e1a] group-hover:text-[#f0f4f0] transition-all">
                      {month.slice(0, 3)} {m.day}
                    </span>
                    <span className="text-[12px] text-foreground">{m.text}</span>
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Currently working on */}
          <motion.div variants={itemVariants} className="pt-3 border-t border-border">
            <p className="font-mono text-[9px] tracking-widest text-muted-foreground/50 uppercase mb-1">
              Currently working on
            </p>
            {loading ? (
              <>
                <SkeletonLine w="w-1/2" />
                <SkeletonLine w="w-3/4" />
              </>
            ) : data.currentWork ? (
              <>
                <p className="font-mono text-[11px] text-[#1a2e1a]">{data.currentWork.project}</p>
                <p className="text-[12px] text-muted-foreground mt-0.5">
                  {data.currentWork.description}
                </p>
              </>
            ) : (
              <p className="font-mono text-[10px] text-muted-foreground/40 italic">
                Nothing set yet.
              </p>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 px-8 py-7 overflow-y-auto">
          {/* Header */}
          <motion.div variants={itemVariants} className="flex items-stretch gap-3">
            <div className="w-0.75 bg-[#2d4a2d] rounded-sm shrink-0" />
            <div>
              <h2 className="font-serif text-2xl font-black leading-tight">What's on my mind</h2>
              <p className="font-mono text-[10px] text-muted-foreground/60 tracking-widest mt-1">
                Learning · Reading · Exploring
              </p>
            </div>
          </motion.div>

          {/* Currently Learning */}
          <motion.div variants={itemVariants}>
            <SectionCard icon="◎" title="Currently Learning">
              {loading ? (
                <>
                  <SkeletonLine />
                  <SkeletonLine w="w-2/3" />
                </>
              ) : data.learning.length === 0 ? (
                <p className="font-mono text-[10px] text-muted-foreground/40 italic">
                  Nothing set.
                </p>
              ) : (
                data.learning.map((l, i) => (
                  <div key={i}>
                    {i > 0 && <div className="h-px bg-border mb-3" />}
                    <div className="flex items-start gap-2.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2d4a2d] shrink-0 mt-1.5" />
                      <div className="flex-1">
                        <p className="text-[13px] font-medium text-foreground leading-snug">
                          {l.title}
                        </p>
                        <p className="font-mono text-[10px] text-muted-foreground mt-1">{l.meta}</p>
                      </div>
                      <span className="font-mono text-[9px] px-2 py-0.5 rounded-xs bg-[#e8f0e8] text-[#1a2e1a] shrink-0">
                        {l.status}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </SectionCard>
          </motion.div>

          {/* Currently Reading */}
          <motion.div variants={itemVariants}>
            <SectionCard icon="◻" title="Currently Reading">
              {loading ? (
                <SkeletonLine />
              ) : data.reading.length === 0 ? (
                <p className="font-mono text-[10px] text-muted-foreground/40 italic">
                  Nothing set.
                </p>
              ) : (
                data.reading.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="shrink-0 w-8 flex items-center justify-center bg-foreground text-background font-serif text-[10px] rounded-[1px] p-1.5 leading-tight text-center">
                      {r.title.split(' ').slice(0, 2).join('\n')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-medium text-foreground leading-snug">
                        {r.title}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                        {r.author}
                      </p>
                      <div className="mt-2 h-0.75 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#2d4a2d] rounded-full transition-all"
                          style={{ width: `${r.progress}%` }}
                        />
                      </div>
                      <p className="font-mono text-[9px] text-muted-foreground mt-1">
                        {r.progress}% · In progress
                      </p>
                    </div>
                  </div>
                ))
              )}
            </SectionCard>
          </motion.div>

          {/* Tech to Explore */}
          <motion.div variants={itemVariants}>
            <SectionCard icon="→" title="Tech to Explore Next">
              {loading ? (
                <div className="flex gap-1.5">
                  <SkeletonLine w="w-16" />
                  <SkeletonLine w="w-12" />
                  <SkeletonLine w="w-20" />
                </div>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {data.explore.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] px-3 py-1 border border-border rounded-xs text-muted-foreground flex items-center gap-1.5 hover:border-[#2d4a2d30] hover:bg-[#e8f0e8] hover:text-[#1a2e1a] transition-all cursor-default">
                      <span className="text-[9px] opacity-50">→</span>
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </SectionCard>
          </motion.div>

          {/* GitHub mini */}
          <motion.div variants={itemVariants}>
            <SectionCard icon="⌥" title="GitHub">
              <div className="flex items-center justify-between">
                <div className="flex gap-5">
                  {[
                    { val: stats.repos, label: 'Repos' },
                    { val: stats.stars, label: 'Stars' },
                    { val: stats.followers, label: 'Followers' },
                  ].map(({ val, label }) => (
                    <div key={label} className="flex flex-col gap-0.5">
                      <span className="font-serif text-xl font-black leading-none">
                        {val !== null ? val : '—'}
                      </span>
                      <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
                <a
                  href={`https://github.com/${GH_USER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[#1a2e1a] border-b border-[#2d4a2d30] pb-px hover:border-[#1a2e1a] transition-colors">
                  @{GH_USER} ↗
                </a>
              </div>
              <div className="border border-border rounded-xs overflow-hidden">
                <p className="font-mono text-[9px] tracking-[0.06em] text-muted-foreground/60 uppercase px-2.5 pt-2 pb-1">
                  Contributions · Past Year
                </p>
                <img
                  src={`https://ghchart.ranjithkumar.me/${GH_USER}`}
                  alt="GitHub contribution chart"
                  className="w-full block"
                  style={{ filter: 'saturate(0.75)' }}
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
            </SectionCard>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
