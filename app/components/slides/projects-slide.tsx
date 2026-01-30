import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    stack: ['Next.js', 'PostgreSQL', 'Stripe'],
    type: 'Full Stack',
    year: '2024',
    url: 'https://example.com',
  },
  {
    id: 2,
    title: 'SaaS Analytics Dashboard',
    description:
      'Interactive analytics platform with real-time data visualization and custom reporting features.',
    stack: ['React', 'TypeScript', 'Chart.js'],
    type: 'Frontend',
    year: '2024',
    url: 'https://example.com',
  },
  {
    id: 3,
    title: 'Mobile Chat App',
    description:
      'Real-time messaging application with end-to-end encryption and video call support.',
    stack: ['React Native', 'Firebase', 'WebRTC'],
    type: 'Full Stack',
    year: '2023',
    url: 'https://example.com',
  },
  {
    id: 4,
    title: 'Design System',
    description: 'Comprehensive component library with documentation and Storybook integration.',
    stack: ['React', 'Tailwind', 'TypeScript'],
    type: 'Frontend',
    year: '2023',
    url: 'https://example.com',
  },
];

export function ProjectsSlide() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  const containerVariants: Variants = {
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full pt-32 px-8 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
        {/* Left Side - Project List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4 overflow-y-auto max-h-96 pr-4">
          <h2 className="text-sm font-bold tracking-widest mb-8 sticky top-0 bg-background py-2">
            PROJECTS
          </h2>
          {projects.map((project, index) => (
            <motion.button
              key={project.id}
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
              className={`w-full text-left p-4 border border-border rounded transition-all ${
                selectedProject.id === project.id
                  ? 'border-foreground bg-secondary'
                  : 'hover:border-foreground'
              }`}
              whileHover={{ x: 8 }}>
              <div className="font-bold text-lg mb-1">{project.title}</div>
              <div className="text-xs text-muted-foreground">
                {project.type} • {project.year}
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Right Side - Project Details */}
        <motion.div
          key={selectedProject.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8 flex flex-col justify-center">
          <div className="border-l-4 border-foreground pl-6">
            <h1 className="text-5xl sm:text-6xl font-black mb-4 leading-tight">
              {selectedProject.title}
            </h1>
            <p className="text-muted-foreground">
              {selectedProject.type} Project • {selectedProject.year}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold tracking-widest mb-3 pb-3 border-b border-border">
                DESCRIPTION
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {selectedProject.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-widest mb-3 pb-3 border-b border-border">
                TECH STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <motion.a
            href={selectedProject.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 border-2 border-foreground text-foreground font-medium hover:bg-foreground hover:text-background transition-all w-fit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            View Project
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}
