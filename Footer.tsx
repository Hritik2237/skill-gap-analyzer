import { Brain, Heart, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-[#21262d] bg-[#0d1117] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">SkillForge</span>
            </div>
            <p className="text-sm text-[#8b949e] leading-relaxed">
              AI-powered skill gap analysis for modern developers and professionals.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="text-sm font-semibold text-white mb-3">Platform</p>
            <ul className="space-y-2">
              {['Skill Analyzer', 'Job Roles', 'Learning Roadmap', 'Resume Parser'].map(item => (
                <li key={item}>
                  <a href="#analyze" className="text-sm text-[#8b949e] hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <p className="text-sm font-semibold text-white mb-3">Built With</p>
            <div className="flex flex-wrap gap-1.5">
              {['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Semantic AI'].map(tech => (
                <span
                  key={tech}
                  className="px-2 py-0.5 rounded text-xs border border-[#30363d] text-[#8b949e] bg-[#161b22]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#21262d] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#484f58] flex items-center gap-1.5">
            Built with <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" /> for developers
          </p>
          <div className="flex items-center gap-4 text-sm text-[#484f58]">
            <span className="flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-yellow-400" />
              <span>50+ Job Roles</span>
            </span>
            <span>•</span>
            <span>Semantic AI Analysis</span>
            <span>•</span>
            <span>100% Free</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
