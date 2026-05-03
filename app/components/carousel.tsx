import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sun, Moon, Menu, X } from 'lucide-react';
import { HomeSlide } from './slides/home-slide';
import { ProjectsSlide } from './slides/projects-slide';
import { CalendarSlide } from './slides/calendar-slide';
import { AboutSlide } from './slides/about-slide';
import { ContactSlide } from './slides/contact-slide';
import Logo from '../assets/logo.png';
import { useDarkMode } from '~/hooks/useDarkMode';

const slides = [
  { id: 'home', label: 'Home', component: HomeSlide },
  { id: 'projects', label: 'Projects', component: ProjectsSlide },
  { id: 'calendar', label: 'Calendar', component: CalendarSlide },
  { id: 'about', label: 'About', component: AboutSlide },
  { id: 'contact', label: 'Contact', component: ContactSlide },
];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 1000 : -1000, opacity: 0 }),
  center: { zIndex: 1, x: 0, opacity: 1 },
  exit: (dir: number) => ({ zIndex: 0, x: dir < 0 ? 1000 : -1000, opacity: 0 }),
};

export function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isDark, toggle } = useDarkMode();

  useEffect(() => {
    setMounted(true);
  }, []);

  const goTo = (index: number) => {
    if (index === currentIndex) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const paginate = (dir: number) => {
    const next = (currentIndex + dir + slides.length) % slides.length;
    setDirection(dir);
    setCurrentIndex(next);
  };

  if (!mounted) return null;

  const CurrentSlide = slides[currentIndex].component;

  return (
    <div className="relative w-full h-screen bg-background overflow-hidden">
      {/* ── Nav wrapper (fixed, contains both nav bar and mobile menu) ── */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="flex flex-row gap-x-4 items-center">
            <img src={Logo} alt="" width={40} />
            <span className="font-mono text-xl font-semibold tracking-tight">Rahvvana</span>
          </div>

          <div className="flex items-center gap-1">
            {/* Desktop nav links */}
            <div className="hidden md:flex gap-8 lg:gap-10 items-center mr-2">
              {slides.map((slide, index) => (
                <motion.button
                  key={slide.id}
                  onClick={() => goTo(index)}
                  className={`text-sm font-medium transition-colors cursor-pointer relative pb-0.5 ${
                    currentIndex === index
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  whileHover={{ y: -1 }}>
                  {slide.label}
                  {currentIndex === index && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-5.5 left-0 right-0 h-[1.5px] bg-[#2d4a2d]"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Dark mode toggle */}
            <motion.button
              onClick={toggle}
              className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.button>

            {/* Mobile hamburger */}
            <motion.button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle navigation menu">
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </motion.button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="md:hidden bg-background/98 backdrop-blur-sm border-b border-border">
              <div className="flex flex-col py-1">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      goTo(index);
                      setMenuOpen(false);
                    }}
                    className={`px-8 py-3.5 text-sm font-medium text-left transition-colors border-b border-border/40 last:border-b-0 ${
                      currentIndex === index
                        ? 'text-foreground bg-secondary/60'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/30'
                    }`}>
                    {slide.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Main Carousel ── */}
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
            opacity: { duration: 0.4 },
          }}
          className="absolute inset-0 w-full h-full pt-14.25">
          <CurrentSlide />
        </motion.div>
      </AnimatePresence>

      {/* ── Prev arrow ── */}
      <motion.button
        onClick={() => paginate(-1)}
        className="fixed left-1 sm:left-6 bottom-[50%] z-40 p-2 text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Previous slide">
        <ChevronLeft size={20} />
      </motion.button>

      {/* ── Next arrow ── */}
      <motion.button
        onClick={() => paginate(1)}
        className="fixed right-1 sm:right-6 bottom-[50%] z-40 p-2 text-muted-foreground hover:text-foreground transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Next slide">
        <ChevronRight size={20} />
      </motion.button>

      {/* ── Slide indicators ── */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? 'w-6 bg-[#2d4a2d]'
                : 'w-1.5 bg-[#2d4a2d]/50 hover:bg-muted-foreground/60'
            }`}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>

      {/* ── Social links (desktop only) ── */}
      <div className="fixed bottom-7 right-14 z-40 hidden sm:flex gap-5">
        <motion.a
          href="mailto:raihan.ardianata@gmail.com"
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          whileHover={{ y: -2 }}>
          Email
        </motion.a>
        <motion.a
          href="https://github.com/Mad1Duck"
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[11px] text-muted-foreground hover:text-foreground transition-colors tracking-wide"
          whileHover={{ y: -2 }}>
          GitHub
        </motion.a>
      </div>
    </div>
  );
}
