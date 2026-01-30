import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { HomeSlide } from './slides/home-slide';
import { ProjectsSlide } from './slides/projects-slide';
import { CalendarSlide } from './slides/calendar-slide';
import { AboutSlide } from './slides/about-slide';

const slides = [
  { id: 'home', label: 'Home', component: HomeSlide },
  { id: 'projects', label: 'Projects', component: ProjectsSlide },
  { id: 'calendar', label: 'Calendar', component: CalendarSlide },
  { id: 'about', label: 'About', component: AboutSlide },
];

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => {
      const next = prev + newDirection;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
  };

  if (!mounted) {
    return null;
  }

  const CurrentSlide = slides[currentIndex].component;

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* Navigation Menu */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-8 border-b border-border">
        <div className="text-xl font-bold tracking-tight">Portfolio</div>
        <div className="hidden md:flex gap-12 items-center">
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`text-sm font-medium transition-colors ${
                currentIndex === index
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              whileHover={{ y: -2 }}>
              {slide.label}
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Main Carousel */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.5 },
          }}
          className="absolute inset-0 w-full h-full">
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <motion.button
        onClick={() => paginate(-1)}
        className="fixed left-8 bottom-8 z-40 p-3 hover:bg-secondary rounded-full transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide">
        <ChevronLeft size={24} />
      </motion.button>

      <motion.button
        onClick={() => paginate(1)}
        className="fixed right-8 bottom-8 z-40 p-3 hover:bg-secondary rounded-full transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide">
        <ChevronRight size={24} />
      </motion.button>

      {/* Slide Indicators */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40 flex gap-2">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`h-2 rounded-full transition-all ${
              currentIndex === index ? 'w-8 bg-foreground' : 'w-2 bg-muted'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="fixed bottom-8 right-16 z-40 flex gap-6 md:gap-8">
        <motion.a
          href="https://twitter.com"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ y: -2 }}>
          Twitter
        </motion.a>
        <motion.a
          href="https://github.com"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          whileHover={{ y: -2 }}>
          GitHub
        </motion.a>
      </div>
    </div>
  );
}
