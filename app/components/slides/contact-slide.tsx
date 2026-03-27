import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Mail, Github, Twitter, Send } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = 'be811e4c-62db-452f-a6a7-77533cab87f3';

const socialLinks = [
  {
    icon: Mail,
    href: 'mailto:raihan.ardianata@gamil.com',
    label: 'Email',
    handle: 'raihan.ardianata@gamil.com',
  },
  { icon: Github, href: 'https://github.com/Mad1Duck', label: 'GitHub', handle: '@Mad1Duck' },
  {
    icon: Github,
    href: 'https://github.com/RaihanArdianata',
    label: 'Github',
    handle: '@raihanard',
  },
  { icon: Twitter, href: '#', label: 'Twitter', handle: '@raihanard' },
];

const services = [
  {
    icon: '⌥',
    label: 'Backend & APIs',
    sub: 'Hono, Elysia, Express · REST, GraphQL, WebSocket',
  },
  {
    icon: '◎',
    label: 'Web & Desktop apps',
    sub: 'React, Next.js, Electron · Vue, Svelte',
  },
  {
    icon: '⬡',
    label: 'Blockchain & Web3',
    sub: 'Solidity, Hardhat, Ponder ·',
  },
  {
    icon: '▣',
    label: 'Database & Infra',
    sub: 'PostgreSQL, MySQL, MongoDB, Redis · Docker',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function ContactSlide() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Portfolio contact from ${formData.name}`,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error();
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 3500);
    }
  };

  return (
    <div className="w-full h-full pt-16 px-8 sm:px-12 lg:px-16 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 items-center h-full">
        {/* ── LEFT: Form ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 py-6 mr-5">
          {/* Heading */}
          <motion.div variants={itemVariants} className="border-l-4 border-foreground pl-5">
            <h1 className="text-5xl sm:text-6xl font-black leading-tight">
              Let's Work
              <br />
              Together
            </h1>
            <p className="text-sm text-muted-foreground mt-2 max-w-xs leading-relaxed">
              Open to freelance & collaborations. Response within 24–48 hrs.
            </p>
          </motion.div>

          {/* Name + Email row */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-widest">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
                className="w-full px-3 py-2.5 text-sm bg-secondary border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-widest">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
                className="w-full px-3 py-2.5 text-sm bg-secondary border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground transition-all"
              />
            </div>
          </motion.div>

          {/* Message */}
          <motion.div variants={itemVariants}>
            <label className="block text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-widest">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Tell me about your project..."
              className="w-full px-3 py-2.5 text-sm bg-secondary border border-border rounded focus:outline-none focus:ring-1 focus:ring-foreground transition-all resize-none"
            />
          </motion.div>

          {/* Submit + status */}
          <motion.div variants={itemVariants} className="flex items-center gap-3">
            <motion.button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 border-2 border-foreground text-foreground text-sm font-medium hover:bg-foreground hover:text-background transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}>
              {isSubmitting ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={14} />
                </>
              )}
            </motion.button>

            {submitStatus === 'success' && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-green-600 font-medium">
                ✓ Sent! I'll get back to you soon.
              </motion.span>
            )}
            {submitStatus === 'error' && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm text-red-500 font-medium">
                ✕ Something went wrong. Try again.
              </motion.span>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div variants={itemVariants} className="flex gap-2 pt-1 flex-wrap">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 bg-secondary border border-border rounded text-sm hover:border-foreground transition-all">
                <link.icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                <span className="text-xs font-medium">{link.handle}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── RIGHT: What I can help with ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-5 py-6 lg:pl-6 lg:border-l border-border">
          <motion.div variants={itemVariants}>
            <h3 className="text-sm font-bold tracking-widest uppercase mb-5 pb-3 border-b border-border">
              What I Can Help With
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {services.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-3 p-3 bg-secondary border border-border rounded hover:border-foreground transition-all">
                  <span className="text-base w-5 shrink-0 text-center">{s.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold leading-snug">{s.label}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2 border-t border-border">
            <h4 className="text-sm font-bold tracking-widest uppercase mb-3">Availability</h4>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
              <span className="text-sm font-medium">Available for freelance</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Most professional work is under NDA. Public projects on GitHub. For inquiries, include
              project scope and timeline.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
