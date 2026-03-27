import { motion, type Variants } from 'framer-motion';

const EXPERIENCE = [
  {
    role: 'Fullstack Developer',
    company: 'Current Company',
    period: '-',
    duration: '5 years',
    tags: ['Backend', 'Frontend', 'Blockchain'],
    note: 'Confidential — NDA applies to project details',
  },
];

const SKILL_GROUPS = [
  {
    domain: 'Backend',
    primary: true,
    skills: ['Hono', 'Elysia', 'Express', 'REST API', 'GraphQL', 'Socket.io', 'WebSocket'],
  },
  {
    domain: 'Frontend',
    primary: true,
    skills: ['React', 'Next.js', 'Electron', 'Vue', 'Svelte', 'React Native', 'Storybook'],
  },
  {
    domain: 'Database',
    primary: false,
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
  },
  {
    domain: 'Blockchain',
    primary: false,
    skills: ['Solidity', 'Hardhat', 'Ponder Indexer'],
  },
  {
    domain: 'Infra & Cloud',
    primary: false,
    skills: ['Docker', 'Firebase', 'Google Cloud'],
  },
];

const VALUES = [
  { icon: '◎', text: 'Solve real problems for real people' },
  { icon: '⌥', text: 'Architecture first' },
  { icon: '→', text: 'Ship things that matter, not for ego' },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-3">
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px bg-border" />;
}

export function AboutSlide() {
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
          className="border-r border-border flex flex-col gap-6 px-8 py-7 overflow-y-auto">
          {/* Heading */}
          <motion.div variants={itemVariants} className="flex items-stretch gap-3">
            <div className="w-0.75 bg-[#2d4a2d] rounded-sm shrink-0" />
            <div>
              <h1 className="font-serif text-5xl font-black leading-none tracking-tight">
                About Me
              </h1>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
                Backend-first fullstack developer. I go deep, not wide.
              </p>
            </div>
          </motion.div>

          <Divider />

          {/* Bio */}
          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            <SectionLabel>Background</SectionLabel>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I've spent the last{' '}
              <strong className="text-foreground font-medium">5 years at a single company</strong> —
              going deep rather than wide. Real production ownership, end-to-end responsibility, and
              shipping things that actually matter.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              My strongest layer is <strong className="text-foreground font-medium">backend</strong>{' '}
              — APIs, real-time systems, databases — backed by solid frontend and blockchain depth.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Outside of work:{' '}
              <strong className="text-foreground font-medium">Hardhat Studio</strong>,{' '}
              <strong className="text-foreground font-medium">GRTI</strong>, and{' '}
              <strong className="text-foreground font-medium">PayID SDK</strong>.
            </p>
          </motion.div>

          <Divider />

          {/* Values */}
          <motion.div variants={itemVariants}>
            <SectionLabel>What I believe in</SectionLabel>
            <div className="flex flex-col gap-2.5">
              {VALUES.map((v, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="font-mono text-[12px] text-[#2d4a2d] mt-0.5 shrink-0">
                    {v.icon}
                  </span>
                  <span className="text-sm text-muted-foreground leading-snug">{v.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <Divider />

          {/* Contact */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2.5">
            <SectionLabel>Get in touch</SectionLabel>
            <div className="flex gap-2.5 flex-wrap">
              <a
                href="https://github.com/Mad1Duck"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1a2e1a] text-[#f0f4f0] text-xs font-medium px-4 py-2 rounded-xs hover:opacity-85 transition-opacity">
                GitHub ↗
              </a>
              <a
                href="https://discord.com/users/raihanard"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-transparent text-muted-foreground border border-border text-xs px-4 py-2 rounded-xs hover:text-foreground hover:border-foreground transition-all">
                Discord · raihanard
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-6 px-8 py-7 overflow-y-auto">
          {/* Experience */}
          <motion.div variants={itemVariants}>
            <SectionLabel>Experience</SectionLabel>
            {EXPERIENCE.map((exp, i) => (
              <div key={i} className="border border-border rounded-xs overflow-hidden">
                <div className="flex items-start justify-between px-4 py-3.5 border-b border-border bg-secondary/30">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">{exp.role}</p>
                    <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end gap-1">
                    <span className="font-mono text-[10px] text-[#1a2e1a] bg-[#e8f0e8] border border-[#2d4a2d30] px-2 py-0.5 rounded-xs">
                      {exp.duration}
                    </span>
                    <span className="font-mono text-[9px] text-muted-foreground">{exp.period}</span>
                  </div>
                </div>
                <div className="px-4 py-3 flex flex-col gap-2.5">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-0.5 rounded-xs bg-[#e8f0e8] text-[#1a2e1a] border border-[#2d4a2d30]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <p className="font-mono text-[10px] text-muted-foreground/50 italic">
                    {exp.note}
                  </p>
                </div>
              </div>
            ))}
            <div className="mt-3 flex items-center gap-2.5">
              <div className="h-px flex-1 bg-border" />
              <span className="font-mono text-[9px] text-muted-foreground/40 whitespace-nowrap">
                5 years · 1 company · full ownership
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
          </motion.div>

          <Divider />

          {/* Skills — grouped by domain */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            <SectionLabel>Skills by domain</SectionLabel>
            {SKILL_GROUPS.map((group) => (
              <div key={group.domain}>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="font-mono text-[9px] tracking-[0.08em] text-muted-foreground/50 uppercase">
                    {group.domain}
                  </span>
                  {group.primary && (
                    <span className="font-mono text-[8px] px-1.5 py-0.5 rounded-xs bg-[#e8f0e8] text-[#1a2e1a] border border-[#2d4a2d30]">
                      primary
                    </span>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.skills.map((s) => (
                    <span
                      key={s}
                      className={`font-mono text-[11px] px-2.5 py-1 rounded-xs border cursor-default transition-all ${
                        group.primary
                          ? 'bg-[#e8f0e8] text-[#1a2e1a] border-[#2d4a2d30] hover:bg-[#1a2e1a] hover:text-[#f0f4f0]'
                          : 'border-border text-muted-foreground hover:bg-secondary'
                      }`}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
