import { motion, type Variants } from 'framer-motion';

export function HomeSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full pt-32 px-8 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full">
        {/* Left Side - Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8">
          <div className="border-l-4 border-foreground pl-6">
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl lg:text-8xl font-black leading-tight">
              Welcome
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="text-xl sm:text-2xl text-muted-foreground mt-4">
              Developer & Designer
            </motion.p>
          </div>

          <motion.div
            variants={itemVariants}
            className="text-sm font-medium text-muted-foreground tracking-widest">
            BASED IN EARTH • AVAILABLE FOR WORK
          </motion.div>

          <motion.button
            variants={itemVariants}
            className="px-8 py-4 border-2 border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            Get in Touch
          </motion.button>
        </motion.div>

        {/* Right Side - Bio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 text-sm leading-relaxed">
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-bold mb-4 pb-4 border-b border-border">About Me</h2>
            <p className="text-muted-foreground">
              I'm a full-stack developer with a passion for creating beautiful, functional web
              experiences. With expertise in modern web technologies, I help startups and
              established companies build their digital presence.
            </p>
            <p className="text-muted-foreground">
              Currently focused on design systems, performance optimization, and creating delightful
              user experiences through thoughtful code and design.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-3 pt-4 border-t border-border">
            <h3 className="font-bold">Core Stack</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'Next.js', 'TypeScript', 'Tailwind', 'Node.js'].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
