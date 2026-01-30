import { motion, type Variants } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
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
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="max-w-4xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible">
          {/* Subtitle */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-secondary text-foreground rounded-full text-sm font-mono font-medium">
              Welcome to my portfolio
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold font-sans mb-6 leading-tight text-balance">
            Clean, focused developer with a passion for solving problems
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 leading-relaxed">
            I build modern web applications with attention to detail, performance, and user
            experience. Specializing in full-stack development with Next.js, React, and modern
            tooling.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground rounded-md font-medium transition-all hover:shadow-lg"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}>
              View my work
              <ArrowRight className="ml-2" size={20} />
            </motion.a>

            <motion.a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary text-primary rounded-md font-medium hover:bg-primary hover:text-primary-foreground transition-all"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}>
              Get in touch
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-border grid grid-cols-3 gap-8">
            {[
              { number: '50+', label: 'Projects' },
              { number: '8+', label: 'Years Exp' },
              { number: '100%', label: 'Dedicated' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
