import { useState } from 'react';
import { motion, type Variants } from 'framer-motion';

const currentDate = new Date();
const activities = [
  { date: 15, activity: 'Launched new feature' },
  { date: 12, activity: 'Fixed critical bug' },
  { date: 8, activity: 'Design review' },
  { date: 5, activity: 'Project kickoff' },
];

export function CalendarSlide() {
  const month = currentDate.toLocaleString('default', { month: 'long' });
  const year = currentDate.getFullYear();
  const daysInMonth = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const firstDay = new Date(year, currentDate.getMonth(), 1).getDay();

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="w-full h-full pt-32 px-8 sm:px-12 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 h-full">
        {/* Left Side - Calendar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8">
          <div className="border-l-4 border-foreground pl-6">
            <motion.h1 variants={itemVariants} className="text-6xl sm:text-7xl font-black">
              {month}
            </motion.h1>
            <motion.p variants={itemVariants} className="text-2xl text-muted-foreground mt-2">
              {year}
            </motion.p>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-7 gap-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div
                key={day}
                className="text-xs font-bold text-muted-foreground h-10 flex items-center justify-center">
                {day}
              </div>
            ))}
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="h-10" />
            ))}
            {days.map((day) => {
              const hasActivity = activities.some((a) => a.date === day);
              return (
                <motion.div
                  key={day}
                  className={`h-10 flex items-center justify-center text-sm font-medium rounded border ${
                    hasActivity
                      ? 'border-foreground bg-secondary'
                      : 'border-border hover:border-foreground'
                  } cursor-pointer transition-all`}
                  whileHover={{ scale: 1.1 }}>
                  {day}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Right Side - Today's Activity */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8 flex flex-col justify-center">
          <div className="border-l-4 border-foreground pl-6">
            <motion.h2 variants={itemVariants} className="text-5xl sm:text-6xl font-black">
              What's Next
            </motion.h2>
            <motion.p variants={itemVariants} className="text-muted-foreground mt-2">
              Current activities & milestones
            </motion.p>
          </div>

          <motion.div variants={containerVariants} className="space-y-4">
            {activities.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-4 border border-border rounded hover:border-foreground transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-sm font-bold text-muted-foreground min-w-fit">
                    {month} {item.date}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.activity}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground font-medium tracking-widest">
              CURRENTLY WORKING ON: EXCITING PROJECT
            </p>
            <p className="text-sm mt-2 text-foreground">
              Pushing boundaries, shipping great things.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
