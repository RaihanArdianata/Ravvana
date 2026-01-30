import { motion, type Variants } from 'framer-motion';

const experiences = [
  {
    role: 'Senior Developer',
    company: 'Tech Company',
    period: '2023 - Present',
  },
  {
    role: 'Full Stack Developer',
    company: 'Startup',
    period: '2021 - 2023',
  },
  {
    role: 'Frontend Developer',
    company: 'Agency',
    period: '2019 - 2021',
  },
];

const skills = [
  'React & Next.js',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Design Systems',
  'Performance',
  'UX/UI',
];

export function AboutSlide() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full pt-32 px-8 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
        {/* Left Side - Bio */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8">
          <div className="border-l-4 border-foreground pl-6">
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl font-black mb-4">
              About Me
            </motion.h1>
            <motion.p variants={itemVariants} className="text-lg text-muted-foreground">
              Full-stack engineer passionate about building delightful products.
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="space-y-4 text-sm leading-relaxed">
            <p className="text-muted-foreground">
              With 5+ years of experience in web development, I've worked with startups and
              established companies to create products that users love.
            </p>
            <p className="text-muted-foreground">
              I'm deeply interested in design systems, performance optimization, and creating
              seamless user experiences through thoughtful code and design.
            </p>
            <p className="text-muted-foreground">
              When I'm not coding, you'll find me exploring new technologies, contributing to open
              source, or enjoying time outdoors.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side - Experience & Skills */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 flex flex-col justify-center">
          {/* Experience */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-bold mb-6 pb-4 border-b border-border">Experience</h2>
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="space-y-1 pb-4 border-b border-border last:border-b-0 last:pb-0">
                <div className="font-bold text-sm">{exp.role}</div>
                <div className="text-xs text-muted-foreground">{exp.company}</div>
                <div className="text-xs text-muted-foreground">{exp.period}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Skills */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-lg font-bold mb-6 pb-4 border-b border-border">Skills</h2>
            <div className="grid grid-cols-2 gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="px-4 py-3 border border-border rounded hover:border-foreground transition-all text-sm font-medium">
                  {skill}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
