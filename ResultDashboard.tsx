import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle, XCircle, TrendingUp, Target, BookOpen,
  BarChart3, AlertCircle, ChevronRight, ArrowLeft,
  Layers, Wrench, Star, Clock, ExternalLink, Download,
  Zap, Trophy, Map
} from 'lucide-react';
import type { AnalysisResult, LearningRoadmap, TabType } from '../types';
import { JOB_ROLES } from '../data/jobRoles';

interface ResultDashboardProps {
  result: AnalysisResult;
  roadmap: LearningRoadmap;
  onReset: () => void;
}

const TAB_CONFIG = [
  { id: 'overview' as TabType, icon: BarChart3, label: 'Overview' },
  { id: 'skills' as TabType, icon: Layers, label: 'Skills Analysis' },
  { id: 'roadmap' as TabType, icon: Map, label: 'Learning Roadmap' },
];

function getMatchColor(pct: number) {
  if (pct >= 75) return { text: '#3fb950', bg: 'rgba(63,185,80,0.15)', border: 'rgba(63,185,80,0.3)' };
  if (pct >= 50) return { text: '#d29922', bg: 'rgba(210,153,34,0.15)', border: 'rgba(210,153,34,0.3)' };
  if (pct >= 25) return { text: '#ffa657', bg: 'rgba(255,166,87,0.15)', border: 'rgba(255,166,87,0.3)' };
  return { text: '#f85149', bg: 'rgba(248,81,73,0.15)', border: 'rgba(248,81,73,0.3)' };
}

function getMatchLabel(pct: number) {
  if (pct >= 80) return 'Excellent Match';
  if (pct >= 60) return 'Good Match';
  if (pct >= 40) return 'Partial Match';
  if (pct >= 20) return 'Needs Work';
  return 'Significant Gap';
}

function CircularProgress({ percentage }: { percentage: number }) {
  const color = getMatchColor(percentage);
  const circumference = 2 * Math.PI * 54;
  const [animated, setAnimated] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width="136" height="136" viewBox="0 0 136 136">
        {/* Background circle */}
        <circle
          cx="68" cy="68" r="54"
          fill="none"
          stroke="#21262d"
          strokeWidth="10"
        />
        {/* Progress circle */}
        <motion.circle
          cx="68" cy="68" r="54"
          fill="none"
          stroke={color.text}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animated / 100) * circumference}
          transform="rotate(-90 68 68)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (animated / 100) * circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 6px ${color.text}50)` }}
        />
        {/* Glow circle */}
        <motion.circle
          cx="68" cy="68" r="54"
          fill="none"
          stroke={color.text}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (animated / 100) * circumference}
          transform="rotate(-90 68 68)"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - (animated / 100) * circumference }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
          opacity={0.3}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="text-3xl font-bold"
          style={{ color: color.text }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {percentage}%
        </motion.span>
        <span className="text-xs text-[#8b949e] mt-0.5">Match</span>
      </div>
    </div>
  );
}

function SkillTag({ skill, type, similarity }: {
  skill: string;
  type: 'matched' | 'missing' | 'partial';
  similarity?: number;
}) {
  const configs = {
    matched: {
      bg: 'rgba(63,185,80,0.12)',
      border: 'rgba(63,185,80,0.3)',
      text: '#3fb950',
      icon: '✓',
    },
    missing: {
      bg: 'rgba(248,81,73,0.12)',
      border: 'rgba(248,81,73,0.3)',
      text: '#f85149',
      icon: '✕',
    },
    partial: {
      bg: 'rgba(210,153,34,0.12)',
      border: 'rgba(210,153,34,0.3)',
      text: '#d29922',
      icon: '~',
    },
  };

  const config = configs[type];

  return (
    <motion.span
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border"
      style={{ background: config.bg, borderColor: config.border, color: config.text }}
      title={similarity !== undefined ? `Similarity: ${Math.round(similarity * 100)}%` : undefined}
    >
      <span className="font-bold text-[10px]">{config.icon}</span>
      {skill}
      {similarity !== undefined && similarity < 0.95 && (
        <span className="opacity-70 text-[10px]">{Math.round(similarity * 100)}%</span>
      )}
    </motion.span>
  );
}

export default function ResultDashboard({ result, roadmap, onReset }: ResultDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const role = JOB_ROLES.find(r => r.id === result.roleId);
  const matchColor = getMatchColor(result.matchPercentage);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }, []);

  return (
    <div ref={resultRef} id="results" className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
      {/* Back button */}
      <motion.button
        onClick={onReset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        whileHover={{ x: -3 }}
        className="flex items-center gap-2 text-sm text-[#8b949e] hover:text-white mb-6 transition-all"
      >
        <ArrowLeft className="w-4 h-4" />
        New Analysis
      </motion.button>

      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#30363d] bg-[#161b22] overflow-hidden mb-5"
      >
        {/* Top gradient bar */}
        <div
          className="h-1.5 w-full"
          style={{ background: `linear-gradient(90deg, ${matchColor.text}, transparent)` }}
        />

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Circular progress */}
            <div className="flex-shrink-0">
              <CircularProgress percentage={result.matchPercentage} />
            </div>

            {/* Role info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{role?.icon}</span>
                <div>
                  <h2 className="text-xl font-bold text-white">{result.role}</h2>
                  <p className="text-sm text-[#8b949e]">{role?.category} • {role?.avgSalary}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium border"
                  style={{ background: matchColor.bg, borderColor: matchColor.border, color: matchColor.text }}
                >
                  {getMatchLabel(result.matchPercentage)}
                </span>
                {role?.demandLevel === 'High' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-500/10 border border-green-500/20 text-green-400 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    High Demand
                  </span>
                )}
              </div>

              {/* Quick stats bar */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Matched', value: result.matchedSkills.length, color: '#3fb950', icon: CheckCircle },
                  { label: 'Partial', value: result.partialMatches.length, color: '#d29922', icon: AlertCircle },
                  { label: 'Missing', value: result.missingSkills.length, color: '#f85149', icon: XCircle },
                ].map(({ label, value, color, icon: Icon }) => (
                  <div key={label} className="text-center p-3 rounded-xl bg-[#0d1117] border border-[#21262d]">
                    <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
                    <div className="text-lg font-bold text-white">{value}</div>
                    <div className="text-xs text-[#484f58]">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Download button */}
            <div className="flex-shrink-0 hidden sm:block">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#30363d] text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all"
              >
                <Download className="w-4 h-4" />
                Export
              </motion.button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-t border-[#30363d]">
          {TAB_CONFIG.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`relative flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all flex-1 sm:flex-none justify-center sm:justify-start ${
                activeTab === id
                  ? 'text-white'
                  : 'text-[#8b949e] hover:text-white hover:bg-[#21262d]/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
              {activeTab === id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                />
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <OverviewTab key="overview" result={result} role={role} matchColor={matchColor} roadmap={roadmap} />
        )}
        {activeTab === 'skills' && (
          <SkillsTab key="skills" result={result} />
        )}
        {activeTab === 'roadmap' && (
          <RoadmapTab key="roadmap" roadmap={roadmap} />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────
function OverviewTab({ result, role, roadmap: _overviewRoadmap }: {
  result: AnalysisResult;
  role: typeof JOB_ROLES[0] | undefined;
  matchColor?: ReturnType<typeof getMatchColor>;
  roadmap: LearningRoadmap;
}) {
  const [progressAnimated, setProgressAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setProgressAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Match breakdown */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-400" />
          Skill Match Breakdown
        </h3>

        <div className="space-y-3">
          {[
            { label: 'Core Skills', matched: result.skillsByCategory.core.matched.length, total: result.skillsByCategory.core.matched.length + result.skillsByCategory.core.missing.length, color: '#58a6ff' },
            { label: 'Optional Skills', matched: result.skillsByCategory.optional.matched.length, total: result.skillsByCategory.optional.matched.length + result.skillsByCategory.optional.missing.length, color: '#a371f7' },
            { label: 'Tools & Tech', matched: result.skillsByCategory.tools.matched.length, total: result.skillsByCategory.tools.matched.length + result.skillsByCategory.tools.missing.length, color: '#3fb950' },
          ].map(({ label, matched, total, color }) => {
            const pct = total === 0 ? 0 : Math.round((matched / total) * 100);
            return (
              <div key={label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-[#8b949e]">{label}</span>
                  <span className="text-sm font-medium text-white">{matched}/{total}</span>
                </div>
                <div className="h-2 rounded-full bg-[#21262d] overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${color}, ${color}80)` }}
                    initial={{ width: '0%' }}
                    animate={{ width: progressAnimated ? `${pct}%` : '0%' }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Matched skills */}
      {result.matchedSkills.length > 0 && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            Your Matched Skills
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400">
              {result.matchedSkills.length} matched
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.matchedSkills.map(s => (
              <SkillTag key={s.skill} skill={s.skill} type="matched" similarity={s.similarity} />
            ))}
          </div>
        </div>
      )}

      {/* Partial matches */}
      {result.partialMatches.length > 0 && (
        <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-400" />
            Partial Matches
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400">
              {result.partialMatches.length} partial
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.partialMatches.map(s => (
              <SkillTag key={s.skill} skill={s.skill} type="partial" similarity={s.similarity} />
            ))}
          </div>
          <p className="text-xs text-[#8b949e] mt-3">
            You have related skills but need to deepen knowledge in these areas.
          </p>
        </div>
      )}

      {/* Missing skills */}
      {result.missingSkills.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-400" />
            Missing Skills
            <span className="ml-auto text-xs font-medium px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
              {result.missingSkills.length} gaps
            </span>
          </h3>
          <div className="flex flex-wrap gap-2">
            {result.missingSkills.map(s => (
              <SkillTag key={s.skill} skill={s.skill} type="missing" />
            ))}
          </div>
        </div>
      )}

      {/* Career insight */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-purple-400" />
          Career Insight
        </h3>
        <p className="text-sm text-[#8b949e] leading-relaxed">{_overviewRoadmap.careerOutcome}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#21262d]">
            <p className="text-xs text-[#484f58] mb-1">Salary Range</p>
            <p className="text-sm font-semibold text-white">{role?.avgSalary || 'N/A'}</p>
          </div>
          <div className="p-3 rounded-lg bg-[#0d1117] border border-[#21262d]">
            <p className="text-xs text-[#484f58] mb-1">Time to Ready</p>
            <p className="text-sm font-semibold text-white">{_overviewRoadmap.totalDuration}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── SKILLS TAB ──────────────────────────────────────────────────────────────
function SkillsTab({ result }: { result: AnalysisResult }) {
  const categories = [
    {
      title: 'Core Skills',
      icon: Star,
      color: '#58a6ff',
      matched: result.skillsByCategory.core.matched,
      missing: result.skillsByCategory.core.missing,
      description: 'Essential skills every professional in this role must have',
    },
    {
      title: 'Optional Skills',
      icon: Zap,
      color: '#a371f7',
      matched: result.skillsByCategory.optional.matched,
      missing: result.skillsByCategory.optional.missing,
      description: 'Differentiating skills that make you stand out',
    },
    {
      title: 'Tools & Technologies',
      icon: Wrench,
      color: '#3fb950',
      matched: result.skillsByCategory.tools.matched,
      missing: result.skillsByCategory.tools.missing,
      description: 'Industry-standard tools used day-to-day in this role',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Your skills list */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Layers className="w-4 h-4 text-blue-400" />
          Your Analyzed Skills
          <span className="ml-auto text-xs text-[#484f58]">{result.userSkills.length} total</span>
        </h3>
        <div className="flex flex-wrap gap-2">
          {result.userSkills.map(skill => {
            const isMatched = result.matchedSkills.some(m => m.matchedWith === skill || m.skill === skill);
            const isPartial = result.partialMatches.some(m => m.matchedWith === skill);
            return (
              <span
                key={skill}
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                  isMatched
                    ? 'bg-green-500/12 border-green-500/30 text-green-400'
                    : isPartial
                    ? 'bg-yellow-500/12 border-yellow-500/30 text-yellow-400'
                    : 'bg-[#21262d] border-[#30363d] text-[#8b949e]'
                }`}
              >
                {isMatched ? '✓ ' : isPartial ? '~ ' : ''}{skill}
              </span>
            );
          })}
        </div>
      </div>

      {/* Category breakdown */}
      {categories.map(({ title, icon: Icon, color, matched, missing, description }) => (
        <div key={title} className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#21262d]">
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" style={{ color }} />
              <h3 className="text-sm font-semibold text-white">{title}</h3>
              <span className="ml-auto text-xs text-[#484f58]">
                {matched.length}/{matched.length + missing.length} skills
              </span>
            </div>
            <p className="text-xs text-[#484f58] mt-1">{description}</p>
            {/* Mini progress */}
            <div className="mt-2 h-1.5 rounded-full bg-[#21262d] overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ background: color }}
                initial={{ width: '0%' }}
                animate={{ width: `${matched.length + missing.length === 0 ? 0 : (matched.length / (matched.length + missing.length)) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="p-5 grid sm:grid-cols-2 gap-4">
            {/* Matched */}
            <div>
              <p className="text-xs font-medium text-green-400 flex items-center gap-1 mb-2">
                <CheckCircle className="w-3 h-3" />
                You have ({matched.length})
              </p>
              {matched.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {matched.map(s => (
                    <SkillTag key={s} skill={s} type="matched" />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#484f58] italic">None matched</p>
              )}
            </div>

            {/* Missing */}
            <div>
              <p className="text-xs font-medium text-red-400 flex items-center gap-1 mb-2">
                <XCircle className="w-3 h-3" />
                To learn ({missing.length})
              </p>
              {missing.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {missing.map(s => (
                    <SkillTag key={s} skill={s} type="missing" />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-green-400 italic">All covered! 🎉</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  );
}

// ─── ROADMAP TAB ─────────────────────────────────────────────────────────────
function RoadmapTab({ roadmap }: { roadmap: LearningRoadmap }) {
  const levelColors = {
    Beginner: '#3fb950',
    Intermediate: '#d29922',
    Advanced: '#f85149',
  };

  const resourceIcons: Record<string, string> = {
    Course: '🎓',
    Book: '📚',
    Documentation: '📖',
    Tutorial: '🎯',
    Project: '💻',
    Practice: '⚡',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-5"
    >
      {/* Roadmap header */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">
              🗺️ Your Personalized Learning Path
            </h3>
            <p className="text-sm text-[#8b949e]">
              Customized roadmap to become a <span className="text-white font-medium">{roadmap.role}</span>
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <div className="text-xl font-bold text-white">{roadmap.totalDuration}</div>
            <div className="text-xs text-[#484f58]">estimated time</div>
          </div>
        </div>

        {/* Key technologies */}
        <div className="mt-4 pt-4 border-t border-[#21262d]">
          <p className="text-xs text-[#484f58] mb-2 font-medium">Key Technologies to Master:</p>
          <div className="flex flex-wrap gap-1.5">
            {roadmap.keyTechnologies.map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-full text-xs font-medium border border-blue-500/30 bg-blue-500/10 text-blue-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="space-y-4">
        {roadmap.phases.map((phase, phaseIdx) => {
          const levelColor = levelColors[phase.level];
          return (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: phaseIdx * 0.15 }}
              className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden"
            >
              {/* Phase header */}
              <div className="px-5 py-4 border-b border-[#21262d]">
                <div className="flex items-center gap-3">
                  {/* Phase number */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                    style={{ background: `${levelColor}20`, border: `1px solid ${levelColor}40`, color: levelColor }}
                  >
                    {phase.phase}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-white">{phase.title}</h4>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-medium border"
                        style={{ background: `${levelColor}15`, borderColor: `${levelColor}30`, color: levelColor }}
                      >
                        {phase.level}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="text-xs text-[#484f58] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {phase.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#8b949e] mt-2 ml-12">{phase.description}</p>
              </div>

              <div className="p-5 grid sm:grid-cols-2 gap-5">
                {/* Skills to learn */}
                <div>
                  <h5 className="text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" />
                    Skills in This Phase
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skills.map(skill => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-full text-xs font-medium border"
                        style={{ background: `${levelColor}12`, borderColor: `${levelColor}25`, color: levelColor }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div>
                  <h5 className="text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" />
                    Practice Projects
                  </h5>
                  <ul className="space-y-1.5">
                    {phase.projects.map((project, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                        <ChevronRight className="w-3.5 h-3.5 text-[#30363d] mt-0.5 flex-shrink-0" />
                        {project}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div className="sm:col-span-2">
                  <h5 className="text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2 flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    Learning Resources
                  </h5>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {phase.resources.map((resource, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 p-3 rounded-lg bg-[#0d1117] border border-[#21262d] hover:border-[#30363d] transition-colors"
                      >
                        <span className="text-sm flex-shrink-0">{resourceIcons[resource.type]}</span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-[#e6edf3] truncate">{resource.title}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="text-xs text-[#484f58]">{resource.platform}</span>
                            {resource.free && (
                              <span className="text-xs text-green-400 font-medium">Free</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div className="sm:col-span-2">
                  <h5 className="text-xs font-medium text-[#8b949e] uppercase tracking-wider mb-2">
                    Phase Milestones
                  </h5>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {phase.milestones.map((milestone, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-[#8b949e]">
                        <div
                          className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                          style={{ borderColor: `${levelColor}50` }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: levelColor }} />
                        </div>
                        {milestone}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pro tips */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] p-5">
        <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          Pro Tips for Your Journey
        </h3>
        <ul className="space-y-2.5">
          {roadmap.tips.map((tip, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3 text-sm text-[#8b949e]"
            >
              <span className="w-5 h-5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              {tip}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
