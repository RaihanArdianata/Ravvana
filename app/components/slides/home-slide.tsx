import { motion, type Variants } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const STACK = [
  { label: 'TypeScript', tier: 'core' },
  { label: 'Hono', tier: 'core' },
  { label: 'React', tier: 'core' },
  { label: 'Electron', tier: 'core' },
  { label: 'PostgreSQL', tier: 'core' },
  { label: 'Hardhat', tier: 'core' },
  { label: 'Next.js', tier: 'secondary' },
  { label: 'Elysia', tier: 'secondary' },
  { label: 'Socket.io', tier: 'secondary' },
  { label: 'Docker', tier: 'secondary' },
  { label: 'React Native', tier: 'optional' },
] as const;

const pillClass = (tier: (typeof STACK)[number]['tier']) => {
  const base =
    'font-mono text-[11px] px-3 py-1 border rounded-[2px] tracking-wide cursor-default transition-all duration-150';
  if (tier === 'core')
    return `${base} bg-[#e8f0e8] text-[#1a2e1a] border-[#2d4a2d30] hover:bg-[#1a2e1a] hover:text-[#f0f4f0] hover:border-[#1a2e1a]`;
  if (tier === 'optional')
    return `${base} opacity-35 border-border text-muted-foreground hover:opacity-70`;
  return `${base} border-border text-muted-foreground hover:bg-[#e8f0e8] hover:text-[#1a2e1a] hover:border-[#2d4a2d30]`;
};

export function HomeSlide() {
  return (
    <div className="relative w-full h-full overflow-y-auto">
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

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 lg:items-center lg:h-full px-6 sm:px-8 pb-24 lg:pb-0">
        {/* Left Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 lg:pr-16 lg:border-r border-border border-b lg:border-b-0 py-8 lg:py-0">
          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <span className="w-7 h-px bg-muted-foreground/30" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-muted-foreground/60 uppercase">
              Fullstack Developer
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={itemVariants}
            className="font-black text-5xl sm:text-7xl lg:text-[5.5rem] leading-none tracking-tight">
            Welcome
            <span className="text-[#2d4a2d]">.</span>
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-muted-foreground leading-relaxed max-w-sm">
            Backend-first fullstack developer — APIs, web apps, and blockchain. I solve{' '}
            <strong className="text-foreground font-semibold">real problems</strong> for real
            people, not just ship code.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 flex-wrap">
            <button className="inline-flex items-center gap-2 bg-[#1a2e1a] text-[#f0f4f0] text-sm font-medium px-6 py-2.75 rounded-xs hover:opacity-85 transition-opacity cursor-pointer">
              Get in Touch ↗
            </button>
            <button className="inline-flex items-center gap-2 bg-transparent text-muted-foreground border border-border text-sm px-5 py-2.5 rounded-xs hover:text-foreground hover:border-foreground transition-all cursor-pointer">
              View Projects
            </button>
          </motion.div>

          {/* Status pill */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 border border-border rounded-full px-3 py-1.5 font-mono text-[10px] tracking-[0.08em] text-muted-foreground w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shrink-0" />
              AVAILABLE FOR WORK · BASED IN INDONESIA
            </span>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-7 lg:pl-16 py-8 lg:py-0">
          {/* About */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
              About Me
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Fullstack developer with{' '}
              <strong className="text-foreground font-medium">
                5 years of professional experience
              </strong>
              . Strongest in backend — APIs, real-time systems, and databases — with solid frontend
              and blockchain depth.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              I build things that{' '}
              <strong className="text-foreground font-medium">solve real-world problems</strong> for
              people — not for ego, not for portfolio padding.
            </p>
          </motion.div>

          <div className="h-px bg-border" />

          {/* Stats */}
          <motion.div variants={itemVariants}>
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase mb-4">
              By the numbers
            </p>
            <div className="flex">
              <div className="flex-1 pr-6 border-r border-border">
                <p className="font-serif text-[2rem] font-black leading-none mb-1">5+</p>
                <p className="text-xs text-muted-foreground">Years professional experience</p>
              </div>
              <div className="flex-1 pl-6">
                <p className="font-serif text-[2rem] font-black leading-none mb-1">3</p>
                <p className="font-mono text-[9px] tracking-[0.08em] text-muted-foreground/50 mb-1">
                  BACKEND · FRONTEND · BLOCKCHAIN
                </p>
                <p className="text-xs text-muted-foreground">Core layers of expertise</p>
              </div>
            </div>
          </motion.div>

          <div className="h-px bg-border" />

          {/* Stack */}
          <motion.div variants={itemVariants} className="space-y-3">
            <p className="font-mono text-[10px] tracking-widest text-muted-foreground/60 uppercase">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {STACK.map(({ label, tier }) => (
                <span key={label} className={pillClass(tier)}>
                  {label}
                </span>
              ))}
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/40 tracking-wide">
              * faded = familiar but not primary
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
