import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const STATS = [
  { value: 50, suffix: '+', label: 'Job Roles', description: 'Across tech, data, design & more', color: '#58a6ff' },
  { value: 500, suffix: '+', label: 'Skills Tracked', description: 'With semantic normalization', color: '#a371f7' },
  { value: 95, suffix: '%', label: 'Match Accuracy', description: 'Via semantic similarity AI', color: '#3fb950' },
  { value: 100, suffix: '%', label: 'Free Forever', description: 'No credit card required', color: '#ffa657' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(false);
  const inViewRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(inViewRef, { once: true });

  useEffect(() => {
    if (isInView && !ref.current) {
      ref.current = true;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={inViewRef}>
      {count}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 border-y border-[#21262d]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl font-bold mb-1"
                style={{ color: stat.color }}
              >
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-semibold text-white mb-0.5">{stat.label}</div>
              <div className="text-xs text-[#484f58]">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
