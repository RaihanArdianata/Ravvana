import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link: string;
    github: string;
    type: 'frontend' | 'backend' | 'fullstack';
    url?: string;
  } | null;
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null;

  const getTypeLabel = (type: string) => {
    const typeMap = {
      frontend: 'Frontend',
      backend: 'Backend',
      fullstack: 'Full Stack',
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="fixed inset-4 sm:inset-0 sm:flex sm:items-center sm:justify-center z-50">
            <div className="w-full h-full sm:h-auto sm:max-w-2xl bg-background rounded-lg border border-border overflow-y-auto">
              {/* Close Button */}
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-6 right-6 p-2 hover:bg-secondary rounded-lg transition-colors z-10">
                <X size={24} />
              </motion.button>

              {/* Modal Content */}
              <div className="p-8 sm:p-12">
                {/* Header Section */}
                <div className="mb-8 pb-8 border-b-2 border-foreground">
                  <h2 className="text-4xl sm:text-5xl font-bold mb-2">{project.title}</h2>
                  <p className="text-muted-foreground text-lg">{project.description}</p>
                </div>

                {/* Project Type */}
                <div className="mb-8 pb-8 border-b-2 border-foreground">
                  <div className="grid grid-cols-2 gap-4 sm:gap-8">
                    <div>
                      <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                        Type
                      </h3>
                      <p className="text-xl font-medium">{getTypeLabel(project.type)}</p>
                    </div>
                    {project.url && (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider mb-2 text-muted-foreground">
                          URL
                        </h3>
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xl font-medium hover:underline break-all">
                          {project.url}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Stack */}
                <div className="mb-8 pb-8 border-b-2 border-foreground">
                  <h3 className="text-sm font-bold uppercase tracking-wider mb-4 text-muted-foreground">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="px-4 py-2 bg-secondary text-secondary-foreground font-medium rounded-lg">
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row gap-4">
                  {project.link && project.link !== '#' && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:opacity-90 transition-opacity">
                      View Live
                      <ExternalLink size={20} />
                    </motion.a>
                  )}
                  {project.github && project.github !== '#' && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-foreground text-foreground font-medium rounded-lg hover:bg-secondary transition-colors">
                      View Code
                      <Github size={20} />
                    </motion.a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
