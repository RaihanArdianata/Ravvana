import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { ProjectModal } from './project-modal';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    technologies: ['Next.js', 'React', 'Stripe', 'PostgreSQL', 'Tailwind CSS'],
    link: '#',
    github: '#',
    type: 'fullstack' as const,
    url: 'example.com',
    featured: true,
  },
  {
    id: 2,
    title: 'SaaS Analytics Dashboard',
    description:
      'Interactive analytics platform with real-time data visualization and custom reporting features.',
    technologies: ['React', 'TypeScript', 'Chart.js', 'Node.js', 'MongoDB'],
    link: '#',
    github: '#',
    type: 'frontend' as const,
    url: 'analytics.example.com',
    featured: true,
  },
  {
    id: 3,
    title: 'Mobile Chat App',
    description:
      'Real-time messaging application with end-to-end encryption and video call support.',
    technologies: ['React Native', 'Firebase', 'WebRTC', 'Socket.io'],
    link: '#',
    github: '#',
    type: 'fullstack' as const,
    url: 'chat.example.com',
  },
  {
    id: 4,
    title: 'Content Management System',
    description:
      'Headless CMS with rich text editing, version control, and multi-language support.',
    technologies: ['Next.js', 'GraphQL', 'PostgreSQL', 'Redis'],
    link: '#',
    github: '#',
    type: 'backend' as const,
    url: 'cms-api.example.com',
  },
  {
    id: 5,
    title: 'Machine Learning Pipeline',
    description:
      'Data processing pipeline for ML model training with automated testing and monitoring.',
    technologies: ['Python', 'TensorFlow', 'Kubernetes', 'FastAPI'],
    link: '#',
    github: '#',
    type: 'backend' as const,
  },
  {
    id: 6,
    title: 'Design System Library',
    description: 'Reusable component library with comprehensive documentation and Storybook.',
    technologies: ['React', 'TypeScript', 'Storybook', 'Tailwind CSS'],
    link: '#',
    github: '#',
    type: 'frontend' as const,
    url: 'design-system.example.com',
  },
];

export function Work() {
  const [selectedProject, setSelectedProject] = useState<(typeof projects)[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProjectModal = (project: (typeof projects)[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
      <section id="work" className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Featured Work</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A selection of projects showcasing my expertise in full-stack development, design, and
              problem solving.
            </p>
          </motion.div>

          {/* Featured Projects */}
          <motion.div
            className="mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}>
            {projects
              .filter((p) => p.featured)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className={`mb-12 pb-12 border-b border-border last:border-b-0 last:pb-0 ${
                    index % 2 === 1 ? 'md:ml-auto md:max-w-lg' : ''
                  }`}>
                  <motion.div
                    className="group cursor-pointer"
                    onClick={() => openProjectModal(project)}
                    whileHover={{ x: 8 }}>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Info Text */}
                    <p className="text-sm font-medium text-primary underline">View Details</p>
                  </motion.div>
                </motion.div>
              ))}
          </motion.div>

          {/* Other Projects Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-12">
            <h3 className="text-2xl font-bold mb-8">Other Notable Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {projects
                .filter((p) => !p.featured)
                .map((project) => (
                  <motion.button
                    key={project.id}
                    onClick={() => openProjectModal(project)}
                    className="p-6 border border-border rounded-lg hover:border-foreground transition-colors text-left"
                    whileHover={{ y: -4 }}>
                    <h4 className="text-xl font-bold mb-3">{project.title}</h4>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded font-medium">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm font-medium text-primary underline">View Details</p>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
