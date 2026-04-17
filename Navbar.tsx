import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Star, GitFork, Menu, X, Zap, BarChart3, Map } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#30363d]" style={{ background: 'rgba(13,17,23,0.95)', backdropFilter: 'blur(12px)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0d1117] animate-pulse" />
            </div>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white text-base tracking-tight">SkillForge</span>
              <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 ml-1">
                AI
              </span>
            </div>
          </div>

          {/* Nav Links - Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { icon: Zap, label: 'Analyze', href: '#analyze' },
              { icon: BarChart3, label: 'Results', href: '#results' },
              { icon: Map, label: 'Roadmap', href: '#roadmap' },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all duration-150"
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* GitHub Stars badge */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#30363d] bg-[#21262d] text-xs text-[#8b949e] hover:border-[#8b949e] cursor-pointer transition-all">
              <Star className="w-3 h-3 text-yellow-400" />
              <span>2.4k</span>
              <span className="text-[#30363d]">|</span>
              <GitFork className="w-3 h-3" />
              <span>438</span>
            </div>

            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-[#21262d] border border-[#30363d] text-white hover:bg-[#30363d] transition-all duration-150"
            >
              <Star className="w-3.5 h-3.5" />
              GitHub
            </a>

            {/* Get Started */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
            >
              <Zap className="w-3.5 h-3.5" />
              Get Started
            </motion.button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-1.5 rounded-md text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#30363d] bg-[#0d1117]"
          >
            <div className="px-4 py-3 space-y-1">
              {[
                { icon: Zap, label: 'Analyze' },
                { icon: BarChart3, label: 'Results' },
                { icon: Map, label: 'Roadmap' },
              ].map(({ icon: Icon, label }) => (
                <button
                  key={label}
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all"
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
