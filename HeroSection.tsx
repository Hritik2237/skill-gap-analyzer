import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, TrendingUp, Zap, CheckCircle, Star } from 'lucide-react';

const STATS = [
  { value: '50+', label: 'Job Roles', icon: '💼' },
  { value: '95%', label: 'Accuracy', icon: '🎯' },
  { value: '10k+', label: 'Analyses', icon: '⚡' },
  { value: 'Free', label: 'Forever', icon: '🎁' },
];

const FEATURES = [
  { icon: '🧠', text: 'Semantic AI skill matching' },
  { icon: '📄', text: 'Resume PDF parsing' },
  { icon: '🗺️', text: 'Personalized roadmap' },
  { icon: '📊', text: 'GitHub-style dashboard' },
];

const FLOATING_SKILLS = [
  { skill: 'Python', color: '#3b82f6', x: '10%', y: '20%' },
  { skill: 'React', color: '#61dafb', x: '85%', y: '15%' },
  { skill: 'Machine Learning', color: '#a371f7', x: '75%', y: '70%' },
  { skill: 'Docker', color: '#2496ed', x: '5%', y: '75%' },
  { skill: 'TypeScript', color: '#3178c6', x: '20%', y: '85%' },
  { skill: 'Kubernetes', color: '#326ce5', x: '90%', y: '45%' },
];

export default function HeroSection({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-14">
      {/* Background Grid */}
      <div className="absolute inset-0 grid-bg opacity-40" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-3xl" />

      {/* Floating skill pills */}
      {FLOATING_SKILLS.map((item, i) => (
        <motion.div
          key={item.skill}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border"
          style={{
            left: item.x,
            top: item.y,
            borderColor: `${item.color}40`,
            background: `${item.color}15`,
            color: item.color,
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0.6, 1, 0.6],
            y: [0, -8, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: 'easeInOut'
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: item.color }} />
          {item.skill}
        </motion.div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] text-sm text-[#8b949e] mb-8"
        >
          <div className="flex items-center gap-1 text-green-400">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
          </div>
          <span className="text-[#30363d]">|</span>
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span>Powered by Semantic AI — No API key needed</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Discover your{' '}
            <span className="gradient-text">Skill Gaps</span>
            {' '}with{' '}
            <br className="hidden sm:block" />
            <span className="gradient-text-blue">AI Precision</span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-[#8b949e] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Upload your resume or enter your skills. Get instant semantic analysis against{' '}
          <span className="text-white font-medium">50+ industry roles</span> and receive a{' '}
          <span className="text-white font-medium">personalized learning roadmap</span>.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-10"
        >
          {FEATURES.map((f) => (
            <div
              key={f.text}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161b22] border border-[#30363d] text-sm text-[#8b949e]"
            >
              <span>{f.icon}</span>
              <span>{f.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.button
            onClick={onGetStarted}
            whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(88, 166, 255, 0.3)' }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
          >
            <Zap className="w-4 h-4" />
            Analyze My Skills
            <ArrowRight className="w-4 h-4" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-medium border border-[#30363d] text-[#e6edf3] hover:bg-[#21262d] hover:border-[#484f58] transition-all"
          >
            <TrendingUp className="w-4 h-4 text-green-400" />
            View Sample Analysis
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex flex-col items-center gap-1 p-4 rounded-xl border border-[#21262d] bg-[#161b22]/50"
            >
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-bold text-white">{stat.value}</span>
              <span className="text-xs text-[#8b949e]">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="flex items-center justify-center gap-6 text-sm text-[#8b949e]"
        >
          <div className="flex items-center gap-1.5">
            <div className="flex -space-x-2">
              {['🧑‍💻', '👩‍🔬', '👨‍🎨', '👩‍💼', '🧑‍🚀'].map((emoji, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full bg-[#21262d] border-2 border-[#0d1117] flex items-center justify-center text-sm"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <span>10,000+ developers analyzed</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span>4.9/5 rating</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-green-400" />
            <span>No signup required</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent" />
      
      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8b949e]"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs">Scroll to analyze</span>
        <div className="w-px h-8 bg-gradient-to-b from-[#8b949e] to-transparent" />
      </motion.div>
    </section>
  );
}
