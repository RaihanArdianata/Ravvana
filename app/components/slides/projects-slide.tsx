import { useState, useRef, useEffect } from 'react';
import { motion, type Variants, AnimatePresence } from 'framer-motion';

type ProjectStatus = 'live' | 'wip' | 'archived';
type ProjectTab = 'preview' | 'details';

interface Project {
  id: number;
  name: string;
  type: string;
  year: string;
  status: ProjectStatus;
  statusLabel: string;
  desc: string;
  stack: string[];
  demo: string | null;
  demoLabel: string | null;
  repo: string;
  repoLabel: string;
}

const PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Hardhat Studio',
    type: 'Desktop App',
    year: '2024',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A desktop Web3 developer tool built with Electron + React + Vite. Features a P2P collaboration layer via Trystero (BitTorrent DHT, zero backend), smart contract management, and a polished dark-themed UI for blockchain developers.',
    stack: ['Electron', 'React', 'Vite', 'TypeScript', 'Trystero', 'Tailwind'],
    demo: 'https://hardhat-studio-landing-page.vercel.app',
    demoLabel: 'hardhatstudio.app',
    repo: 'https://github.com/Mad1Duck/hardhat-studio',
    repoLabel: 'github.com/Mad1Duck/hardhat-studio',
  },
  {
    id: 2,
    name: 'GRTI Platform',
    type: 'Web3 · Reforestation',
    year: '2024',
    status: 'live',
    statusLabel: 'Live',
    desc: 'Green Reforestation Token Initiative — a Web3 platform for tokenized reforestation. Includes CommunityVaultV2 with Chainlink oracles, Morpho yield, Uniswap v4 hooks, and an on-chain SVG Planting Zone NFT system with geographic math.',
    stack: ['Solidity', 'Chainlink', 'Morpho', 'Uniswap v4', 'Next.js', 'TypeScript'],
    demo: 'https://grti.app',
    demoLabel: 'grti.app',
    repo: 'https://github.com/Mad1Duck/grti',
    repoLabel: 'github.com/Mad1Duck/grti',
  },
  {
    id: 3,
    name: 'PayID SDK',
    type: 'Open Source SDK',
    year: '2025',
    status: 'live',
    statusLabel: 'Live',
    desc: 'An open-source payment SDK combining a WASM rule engine, EIP-712 typed proofs, and ERC-4337 account abstraction. Designed to make on-chain payment flows composable and auditable.',
    stack: ['TypeScript', 'WASM', 'EIP-712', 'ERC-4337', 'Viem'],
    demo: 'https://payid-docs.vercel.app/',
    demoLabel: 'payid-docs',
    repo: 'https://github.com/Mad1Duck/payid',
    repoLabel: 'github.com/Mad1Duck/payid',
  },
  {
    id: 4,
    name: 'Hono Decorator Template',
    type: 'npm Package',
    year: '2024',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A scaffold CLI and backend template for Hono with NestJS-inspired TypeScript decorators. Ships controllers, DI container, auth guards, rate limiting, Redis caching, and observability out of the box — built for Bun runtime.',
    stack: ['TypeScript', 'Hono', 'Bun', 'Drizzle ORM', 'Redis', 'Zod', 'Docker'],
    demo: 'https://frontend-hono-template-decorator.vercel.app/',
    demoLabel: 'Hono Decorator Template',
    repo: 'https://github.com/Mad1Duck/hono-backend-template-decorator-style',
    repoLabel: 'github.com/Mad1Duck/hono-backend-template-decorator-style',
  },
  {
    id: 5,
    name: 'Wall Message',
    type: 'Web App',
    year: '2026',
    status: 'live',
    statusLabel: 'Live',
    desc: 'A public wall where anyone can post messages — authenticated or anonymously. Leave a note, share a thought, or just say hi.',
    stack: ['TypeScript', 'React', 'Vercel'],
    demo: 'https://wall-message.vercel.app',
    demoLabel: 'wall-message.vercel.app',
    repo: 'https://github.com/Mad1Duck/wall-message',
    repoLabel: 'github.com/Mad1Duck/wall-message',
  },
];

const screenshotUrl = (url: string) =>
  `https://api.screenshotone.com/take?url=${encodeURIComponent(url)}&full_page=false&viewport_width=1280&viewport_height=800&format=jpg&image_quality=80`;

const statusStyles: Record<ProjectStatus, string> = {
  live: 'bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]',
  wip: 'bg-[#fef3c7] text-[#b45309] border-[#fde68a]',
  archived: 'bg-secondary text-muted-foreground border-border',
};

function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] px-3 py-1 rounded-full border ${statusStyles[status]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function StackPill({ label }: { label: string }) {
  return (
    <span className="font-mono text-[10px] px-2.5 py-1 rounded-xs bg-[#e8f0e8] text-[#1a2e1a] border border-[#2d4a2d30]">
      {label}
    </span>
  );
}

function PreviewPanel({ project }: { project: Project }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeBlocked, setIframeBlocked] = useState(false);
  const [screenshotError, setScreenshotError] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const url = project.demo ?? project.repo;
  const label = project.demoLabel ?? project.repoLabel;

  useEffect(() => {
    if (!project.demo) return;
    const timer = setTimeout(() => setIframeLoading(false), 10000);
    return () => clearTimeout(timer);
  }, []);

  const reload = () => {
    if (!iframeRef.current) return;
    const src = iframeRef.current.src;
    iframeRef.current.src = '';
    setIframeLoading(true);
    setTimeout(() => {
      if (iframeRef.current) iframeRef.current.src = src;
    }, 80);
  };

  if (!project.demo) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-secondary/40">
        <p className="font-mono text-[11px] text-muted-foreground">No live demo available</p>
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-[#1a2e1a] border-b border-[#2d4a2d30] pb-px hover:border-[#1a2e1a] transition-colors">
          View source on GitHub ↗
        </a>
      </div>
    );
  }

  return (
    <>
      {/* Browser chrome */}
      <div className="flex items-center gap-2.5 px-4 py-2.5 bg-secondary border-b border-border shrink-0">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 bg-background border border-border rounded px-2.5 py-1 font-mono text-[11px] text-muted-foreground truncate">
          {label}
        </div>
        <button
          onClick={reload}
          className="font-mono text-[13px] text-muted-foreground hover:text-foreground transition-colors px-1">
          ↺
        </button>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[10px] text-muted-foreground hover:text-[#1a2e1a] transition-colors">
          ↗
        </a>
      </div>

      {/* Iframe */}
      <div className="flex-1 relative overflow-hidden">
        {!iframeBlocked && (
          <iframe
            ref={iframeRef}
            src={url}
            title={project.name}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            className="w-full h-full border-none block"
            onLoad={() => setIframeLoading(false)}
            onError={() => {
              setIframeBlocked(true);
              setIframeLoading(false);
            }}
          />
        )}

        {/* Loading fallback */}
        {iframeLoading && !iframeBlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-secondary/40">
            <div className="w-5 h-5 rounded-full border-2 border-[#2d4a2d] border-t-transparent animate-spin" />
            <p className="font-mono text-[11px] text-muted-foreground">Loading preview…</p>
          </div>
        )}

        {/* Fallback: screenshot */}
        {iframeBlocked && (
          <div className="absolute inset-0 flex flex-col">
            {!screenshotError ? (
              <>
                <img
                  src={screenshotUrl(url)}
                  alt={`${project.name} screenshot`}
                  className="w-full h-full object-cover object-top"
                  onError={() => setScreenshotError(true)}
                />
                <div className="absolute bottom-0 inset-x-0 flex items-center justify-between px-3 py-1.5 bg-background/80 backdrop-blur-sm border-t border-border">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    Preview blocked · showing screenshot
                  </span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[10px] text-[#1a2e1a] hover:underline">
                    Open live ↗
                  </a>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-secondary/40">
                <p className="font-mono text-[11px] text-muted-foreground">Preview unavailable</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-[#1a2e1a] border-b border-[#2d4a2d30] pb-px hover:border-[#1a2e1a] transition-colors">
                  Open in new tab ↗
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

function DetailsPanel({ project }: { project: Project }) {
  return (
    <div className="flex-1 overflow-y-auto px-8 py-7 flex flex-col gap-5">
      <div className="border-l-[3px] border-[#2d4a2d] pl-4">
        <h2 className="font-serif text-3xl font-black leading-tight tracking-tight">
          {project.name}
        </h2>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mt-1.5">
          {project.type} · {project.year}
        </p>
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-2">
          Status
        </p>
        <StatusBadge status={project.status} label={project.statusLabel} />
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-2">
          Description
        </p>
        <p className="text-sm text-muted-foreground leading-relaxed">{project.desc}</p>
      </div>

      <div className="h-px bg-border" />

      <div>
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-2">
          Tech Stack
        </p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((t) => (
            <StackPill key={t} label={t} />
          ))}
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="flex flex-col gap-2">
        <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
          Links
        </p>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] text-muted-foreground w-3.5">⌥</span>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[11px] text-muted-foreground border-b border-border pb-px hover:text-foreground hover:border-foreground transition-colors break-all">
            {project.repoLabel}
          </a>
        </div>
        {project.demo && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] text-muted-foreground w-3.5">↗</span>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] text-[#1a2e1a] border-b border-[#2d4a2d30] pb-px hover:border-[#1a2e1a] transition-colors">
              {project.demoLabel}
            </a>
          </div>
        )}
      </div>

      <div className="flex gap-2 flex-wrap pt-1">
        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 bg-[#1a2e1a] text-[#f0f4f0] text-xs font-medium px-4 py-2 rounded-xs hover:opacity-85 transition-opacity">
          View on GitHub ↗
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-transparent text-muted-foreground border border-border text-xs px-4 py-2 rounded-xs hover:text-foreground hover:border-foreground transition-all">
            Live Demo ↗
          </a>
        )}
      </div>
    </div>
  );
}

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function ProjectsSlide() {
  const [selected, setSelected] = useState<Project>(PROJECTS[0]);
  const [tab, setTab] = useState<ProjectTab>('preview');

  return (
    <div className="relative w-full h-full pt-5 pb-24 px-8 sm:px-12 lg:px-16 overflow-hidden">
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

      <div className="relative z-10 flex h-full" style={{ gridTemplateColumns: '300px 1fr' }}>
        {/* LEFT — project list */}
        <motion.div
          variants={listVariants}
          initial="hidden"
          animate="visible"
          className="w-75 shrink-0 border-r border-border flex flex-col overflow-y-auto">
          <div className="px-6 pt-7 pb-4">
            <p className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/60 uppercase">
              Projects
            </p>
          </div>

          {PROJECTS.map((p) => (
            <motion.button
              key={p.id}
              variants={itemVariants}
              onClick={() => {
                setSelected(p);
                setTab('preview');
              }}
              className={`
                w-full text-left flex flex-col gap-1 px-6 py-3.5 border-l-2 transition-all duration-150
                ${
                  selected.id === p.id
                    ? 'bg-[#e8f0e8] border-l-[#2d4a2d]'
                    : 'border-l-transparent hover:bg-secondary'
                }
              `}>
              <span
                className={`text-[13px] font-semibold transition-colors ${selected.id === p.id ? 'text-[#1a2e1a]' : 'text-foreground'}`}>
                {p.name}
              </span>
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    p.status === 'live'
                      ? 'bg-green-500'
                      : p.status === 'wip'
                        ? 'bg-amber-400'
                        : 'bg-muted-foreground/40'
                  }`}
                />
                <span className="font-mono text-[10px] text-muted-foreground">
                  {p.type} · {p.year}
                </span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* RIGHT — tab panel */}
        <div className="flex-1 flex flex-col min-w-0 h-full">
          {/* Tab bar */}
          <div className="flex items-center gap-0 border-b border-border px-8 shrink-0">
            {(['preview', 'details'] as ProjectTab[]).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`
                  font-mono text-[11px] tracking-[0.06em] uppercase px-4 py-3.5 border-b-2 -mb-px transition-all
                  ${
                    tab === t
                      ? 'text-[#1a2e1a] border-[#2d4a2d]'
                      : 'text-muted-foreground border-transparent hover:text-foreground'
                  }
                `}>
                {t}
              </button>
            ))}
            <div className="flex-1" />
            <a
              href={selected.demo ?? selected.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] text-muted-foreground hover:text-[#1a2e1a] transition-colors py-3.5">
              Open ↗
            </a>
          </div>

          {/* Tab content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selected.id}-${tab}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="flex-1 flex flex-col min-h-0 overflow-hidden">
              {tab === 'preview' ? (
                <PreviewPanel project={selected} />
              ) : (
                <DetailsPanel project={selected} />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
