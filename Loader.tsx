import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const STEPS = [
  { emoji: '🔍', text: 'Parsing your skills...', color: '#58a6ff' },
  { emoji: '🧠', text: 'Running semantic analysis...', color: '#a371f7' },
  { emoji: '📊', text: 'Computing skill similarities...', color: '#3fb950' },
  { emoji: '🗺️', text: 'Generating learning roadmap...', color: '#ffa657' },
  { emoji: '✨', text: 'Preparing your results...', color: '#f778ba' },
];

export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d1117]/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md mx-4 rounded-2xl border border-[#30363d] bg-[#161b22] p-8 shadow-2xl shadow-black/50"
      >
        {/* Center icon with orbit animation */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Outer ring */}
            <motion.div
              className="w-24 h-24 rounded-full border-2 border-blue-500/20"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
            </motion.div>
            
            {/* Middle ring */}
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-purple-500/20"
              animate={{ rotate: -360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
            </motion.div>
            
            {/* Center icon */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Brain className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>

        <h3 className="text-center text-lg font-semibold text-white mb-2">
          AI Analysis in Progress
        </h3>
        <p className="text-center text-sm text-[#8b949e] mb-8">
          Our semantic engine is mapping your skills to industry requirements
        </p>

        {/* Steps */}
        <div className="space-y-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.4 }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.4 + 0.2, type: 'spring' }}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                style={{ background: `${step.color}20`, border: `1px solid ${step.color}40` }}
              >
                {step.emoji}
              </motion.div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#e6edf3]">{step.text}</span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.4 + 0.6 }}
                    className="text-xs"
                    style={{ color: step.color }}
                  >
                    {i < 4 ? '✓' : '...'}
                  </motion.span>
                </div>
                <div className="h-1 rounded-full bg-[#21262d] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: step.color }}
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ delay: i * 0.4, duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom shimmer bar */}
        <div className="mt-8 h-1 rounded-full overflow-hidden bg-[#21262d]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '60%' }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Skeleton loader for cards
export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5 space-y-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg shimmer" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 rounded shimmer" />
          <div className="h-3 w-1/2 rounded shimmer" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 rounded shimmer" />
        <div className="h-3 w-4/5 rounded shimmer" />
        <div className="h-3 w-3/5 rounded shimmer" />
      </div>
      <div className="flex gap-2">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-6 w-16 rounded-full shimmer" />
        ))}
      </div>
    </div>
  );
}
