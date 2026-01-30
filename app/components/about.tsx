import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const skills = [
  'Frontend Development',
  'Backend Development',
  'Full-Stack Development',
  'UI/UX Design',
  'Database Design',
  'API Development',
  'DevOps & Deployment',
  'Performance Optimization',
];

export function About() {
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section id="about" className="min-h-screen py-20 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Learn more about my background, expertise, and approach to building great software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                I'm a full-stack developer with over 8 years of experience building web applications
                that users love. My journey started with curiosity about how things work on the
                internet, and it's evolved into a passion for creating elegant solutions to complex
                problems.
              </p>

              <p className="text-lg leading-relaxed mb-6">
                I believe in the power of clean code, thoughtful design, and continuous learning.
                Every project is an opportunity to improve my craft and deliver value to users. I'm
                particularly passionate about performance optimization and creating accessible
                interfaces that work for everyone.
              </p>

              <p className="text-lg leading-relaxed">
                When I'm not coding, you'll find me contributing to open-source projects, writing
                technical articles, or exploring new technologies. I'm always eager to collaborate
                and help teams build something remarkable.
              </p>
            </div>
          </motion.div>

          {/* Right column - Skills */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}>
            <h3 className="text-2xl font-bold mb-8">Core Skills</h3>
            <div className="space-y-4">
              {skills.map((skill) => (
                <motion.div
                  key={skill}
                  variants={itemVariants}
                  className="flex items-center gap-4 p-4 bg-background rounded-lg border border-border hover:border-foreground transition-colors"
                  whileHover={{ x: 4 }}>
                  <div className="flex-shrink-0">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-medium">{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 pt-20 border-t border-border">
          <h3 className="text-2xl font-bold mb-12">Experience</h3>
          <div className="space-y-12">
            {[
              {
                role: 'Senior Developer',
                company: 'Tech Corp',
                period: '2022 - Present',
                description:
                  'Leading full-stack development initiatives, mentoring junior developers.',
              },
              {
                role: 'Full-Stack Developer',
                company: 'Digital Agency',
                period: '2020 - 2022',
                description:
                  'Built scalable web applications for clients across various industries.',
              },
              {
                role: 'Frontend Developer',
                company: 'Startup Hub',
                period: '2018 - 2020',
                description: 'Focused on creating beautiful, responsive user interfaces.',
              },
            ].map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col md:flex-row md:items-start gap-8">
                <div className="md:w-32 flex-shrink-0">
                  <div className="text-sm font-mono text-muted-foreground">{job.period}</div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-bold mb-2">{job.role}</h4>
                  <p className="text-primary font-medium mb-2">{job.company}</p>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
