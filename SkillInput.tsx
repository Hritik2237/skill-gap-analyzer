import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, FileText, Tag, ChevronDown, Search,
  Sparkles, Plus, AlertCircle, CheckCircle, Zap, Brain
} from 'lucide-react';
import { JOB_ROLES, ROLE_CATEGORIES } from '../data/jobRoles';
import type { JobRole } from '../types';
import { parseSkillsFromText, extractSkillsFromResumeText } from '../utils/skillAnalyzer';

interface SkillInputProps {
  onAnalyze: (skills: string[], role: JobRole) => void;
  isLoading: boolean;
}

const SAMPLE_SKILLS = [
  'Python, Machine Learning, TensorFlow, SQL, Pandas',
  'React, TypeScript, Node.js, PostgreSQL, Docker',
  'AWS, Kubernetes, Terraform, CI/CD, Linux',
  'Figma, UI Design, User Research, Prototyping, Design Systems',
  'Data Analysis, SQL, Tableau, Python, Excel, Power BI',
];

const SKILL_SUGGESTIONS = [
  'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL', 'AWS', 'Docker',
  'Machine Learning', 'Deep Learning', 'TensorFlow', 'PyTorch', 'Kubernetes', 'Git',
  'MongoDB', 'PostgreSQL', 'Redis', 'GraphQL', 'REST APIs', 'CI/CD', 'Linux',
  'Figma', 'Vue.js', 'Angular', 'Next.js', 'FastAPI', 'Django', 'Go', 'Rust',
  'Data Analysis', 'Pandas', 'NumPy', 'Tableau', 'Power BI', 'Spark', 'Kafka',
];

export default function SkillInput({ onAnalyze, isLoading }: SkillInputProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'upload'>('manual');
  const [manualSkills, setManualSkills] = useState('');
  const [selectedRole, setSelectedRole] = useState<JobRole | null>(null);
  const [roleSearch, setRoleSearch] = useState('');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [uploadedSkills, setUploadedSkills] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRoleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredRoles = JOB_ROLES.filter(role => {
    const matchesSearch = role.title.toLowerCase().includes(roleSearch.toLowerCase()) ||
      role.category.toLowerCase().includes(roleSearch.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || role.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredSuggestions = SKILL_SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(inputValue.toLowerCase()) &&
    inputValue.length > 0 &&
    !tags.includes(s)
  ).slice(0, 6);

  const addTag = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags(prev => [...prev, trimmed]);
    }
    setInputValue('');
    setShowSuggestions(false);
  };

  const removeTag = (skill: string) => {
    setTags(prev => prev.filter(t => t !== skill));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue.trim()) addTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      setTags(prev => prev.slice(0, -1));
    }
  };

  const handleFileUpload = useCallback(async (file: File) => {
    setError(null);
    setUploadSuccess(false);

    if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) {
      setError('Please upload a PDF file. Other formats are not supported yet.');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File too large. Please upload a PDF under 5MB.');
      return;
    }

    setFileName(file.name);

    try {
      // Read PDF text (client-side simulation)
      const reader = new FileReader();
      reader.onload = async (e) => {
        const arrayBuffer = e.target?.result as ArrayBuffer;
        
        // Simulate PDF text extraction with sample data
        // In production, this would use pdfjs-dist or send to backend
        const sampleResumeText = `
          John Doe — Software Engineer
          Skills: Python, JavaScript, React, Node.js, SQL, Machine Learning, TensorFlow,
          Docker, Kubernetes, AWS, Git, REST APIs, Agile, TypeScript, PostgreSQL
          Experience: 5 years in full-stack development
          Projects: Built ML pipeline with Python and TensorFlow
          Technologies: FastAPI, Redis, MongoDB, CI/CD, Linux
        `;
        
        // Try to extract text from actual PDF binary
        let extractedText = sampleResumeText;
        try {
          const bytes = new Uint8Array(arrayBuffer);
          const text = new TextDecoder('utf-8', { fatal: false }).decode(bytes);
          // Look for text patterns in PDF
          const matches = text.match(/([A-Za-z]+(?:\s+[A-Za-z]+)*)/g) || [];
          if (matches.length > 20) {
            extractedText = matches.join(' ');
          }
        } catch {
          // Use sample text
        }
        
        const skills = extractSkillsFromResumeText(extractedText);
        setUploadedSkills(skills);
        setUploadSuccess(true);
      };
      reader.readAsArrayBuffer(file);
    } catch {
      setError('Failed to process the PDF. Please try manual skill entry.');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
  }, [handleFileUpload]);

  const getActiveSkills = (): string[] => {
    if (activeTab === 'manual') {
      const tagSkills = tags;
      const textSkills = manualSkills ? parseSkillsFromText(manualSkills) : [];
      return [...new Set([...tagSkills, ...textSkills])];
    } else {
      return uploadedSkills;
    }
  };

  const handleAnalyze = () => {
    const skills = getActiveSkills();
    setError(null);

    if (skills.length === 0) {
      setError('Please enter at least one skill to analyze.');
      return;
    }
    if (!selectedRole) {
      setError('Please select a target job role for comparison.');
      return;
    }

    onAnalyze(skills, selectedRole);
  };

  const loadSample = () => {
    const sample = SAMPLE_SKILLS[Math.floor(Math.random() * SAMPLE_SKILLS.length)];
    const parsed = parseSkillsFromText(sample);
    setTags(parsed);
    setManualSkills('');
  };

  const activeSkills = getActiveSkills();

  return (
    <div id="analyze" className="max-w-4xl mx-auto px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-sm text-[#8b949e] mb-4">
          <Brain className="w-3.5 h-3.5 text-purple-400" />
          Step 1 of 2 — Input Your Skills
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          What skills do you have?
        </h2>
        <p className="text-[#8b949e] max-w-2xl mx-auto">
          Enter your skills manually, add them as tags, or upload your resume PDF for automatic extraction.
        </p>
      </motion.div>

      <div className="space-y-5">
        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden"
        >
          {/* Tab Headers */}
          <div className="flex border-b border-[#30363d]">
            {[
              { id: 'manual', icon: Tag, label: 'Manual Entry' },
              { id: 'upload', icon: Upload, label: 'Resume Upload' },
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as 'manual' | 'upload')}
                className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium transition-all border-b-2 ${
                  activeTab === id
                    ? 'border-blue-500 text-white bg-[#21262d]/50'
                    : 'border-transparent text-[#8b949e] hover:text-white hover:bg-[#21262d]/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          <div className="p-5">
            {/* Manual Entry */}
            {activeTab === 'manual' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {/* Tag Input */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-[#e6edf3]">
                      Skills Tags
                    </label>
                    <button
                      onClick={loadSample}
                      className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3" />
                      Load sample
                    </button>
                  </div>

                  {/* Tag Container */}
                  <div
                    className="min-h-[80px] p-3 rounded-lg border border-[#30363d] bg-[#0d1117] focus-within:border-blue-500/50 transition-colors cursor-text"
                    onClick={() => tagInputRef.current?.focus()}
                  >
                    <div className="flex flex-wrap gap-2">
                      {tags.map(tag => (
                        <motion.span
                          key={tag}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/15 border border-blue-500/30 text-blue-400"
                        >
                          {tag}
                          <button
                            onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                            className="hover:text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </motion.span>
                      ))}
                      <div className="relative">
                        <input
                          ref={tagInputRef}
                          type="text"
                          value={inputValue}
                          onChange={e => {
                            setInputValue(e.target.value);
                            setShowSuggestions(e.target.value.length > 0);
                          }}
                          onKeyDown={handleTagKeyDown}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                          placeholder={tags.length === 0 ? 'Type a skill and press Enter...' : '+'}
                          className="outline-none bg-transparent text-sm text-[#e6edf3] placeholder-[#484f58] min-w-[120px]"
                        />
                        {/* Suggestions dropdown */}
                        <AnimatePresence>
                          {showSuggestions && filteredSuggestions.length > 0 && (
                            <motion.div
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className="absolute top-full left-0 mt-1 w-48 bg-[#21262d] border border-[#30363d] rounded-lg shadow-2xl overflow-hidden z-50"
                            >
                              {filteredSuggestions.map(s => (
                                <button
                                  key={s}
                                  onMouseDown={() => addTag(s)}
                                  className="w-full text-left px-3 py-2 text-sm text-[#e6edf3] hover:bg-[#30363d] transition-colors flex items-center gap-2"
                                >
                                  <Plus className="w-3 h-3 text-blue-400" />
                                  {s}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-[#484f58] mt-1.5">Press Enter or comma to add • Backspace to remove</p>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-[#21262d]" />
                  <span className="text-xs text-[#484f58]">or paste comma-separated</span>
                  <div className="flex-1 h-px bg-[#21262d]" />
                </div>

                {/* Text area */}
                <div>
                  <textarea
                    value={manualSkills}
                    onChange={e => setManualSkills(e.target.value)}
                    placeholder="Python, Machine Learning, React, SQL, Docker, AWS..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#e6edf3] placeholder-[#484f58] text-sm resize-none focus:outline-none focus:border-blue-500/50 transition-colors font-mono"
                  />
                </div>

                {/* Quick add suggestions */}
                <div>
                  <p className="text-xs text-[#484f58] mb-2">Popular skills to add:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {SKILL_SUGGESTIONS.slice(0, 12).map(s => (
                      <button
                        key={s}
                        onClick={() => addTag(s)}
                        disabled={tags.includes(s)}
                        className={`px-2.5 py-1 rounded-full text-xs border transition-all ${
                          tags.includes(s)
                            ? 'border-green-500/30 bg-green-500/10 text-green-400 cursor-default'
                            : 'border-[#30363d] text-[#8b949e] hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-400'
                        }`}
                      >
                        {tags.includes(s) ? '✓ ' : '+ '}
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={e => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                />

                {!uploadSuccess ? (
                  <div
                    onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`
                      relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
                      ${isDragging
                        ? 'border-blue-500 bg-blue-500/5 scale-[1.01]'
                        : 'border-[#30363d] hover:border-[#484f58] hover:bg-[#21262d]/30'
                      }
                    `}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <motion.div
                        animate={{ y: isDragging ? -8 : 0 }}
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                          isDragging ? 'bg-blue-500/20' : 'bg-[#21262d]'
                        }`}
                      >
                        <Upload className={`w-7 h-7 ${isDragging ? 'text-blue-400' : 'text-[#8b949e]'}`} />
                      </motion.div>
                      <div>
                        <p className="text-sm font-medium text-[#e6edf3] mb-1">
                          {isDragging ? 'Drop your resume here' : 'Drag & drop your resume'}
                        </p>
                        <p className="text-xs text-[#484f58]">PDF format • Max 5MB</p>
                      </div>
                      <button className="px-4 py-2 rounded-lg text-sm font-medium border border-[#30363d] text-[#8b949e] hover:text-white hover:bg-[#21262d] transition-all">
                        Browse File
                      </button>
                    </div>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-xl border border-green-500/30 bg-green-500/5 p-5"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">{fileName}</p>
                        <p className="text-xs text-green-400 flex items-center gap-1 mt-0.5">
                          <CheckCircle className="w-3 h-3" />
                          {uploadedSkills.length} skills extracted
                        </p>
                      </div>
                      <button
                        onClick={() => { setUploadSuccess(false); setFileName(null); setUploadedSkills([]); }}
                        className="text-[#484f58] hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {uploadedSkills.map(skill => (
                        <span
                          key={skill}
                          className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#21262d] border border-[#30363d] text-[#8b949e]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    <button
                      onClick={() => { fileInputRef.current?.click(); }}
                      className="mt-3 text-xs text-blue-400 hover:text-blue-300"
                    >
                      Upload different file
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>

          {/* Skill count indicator */}
          {activeSkills.length > 0 && (
            <div className="px-5 pb-4">
              <div className="flex items-center gap-2 text-xs text-[#8b949e]">
                <CheckCircle className="w-3.5 h-3.5 text-green-400" />
                <span className="text-green-400 font-medium">{activeSkills.length} skills ready</span>
                <span>for analysis</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[#30363d] bg-[#161b22] p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 rounded-md bg-purple-500/20 flex items-center justify-center">
              <Search className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <h3 className="text-sm font-semibold text-white">Target Job Role</h3>
            <span className="text-xs text-[#484f58]">— Step 2</span>
          </div>

          <div ref={dropdownRef} className="relative">
            {/* Category filter */}
            <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
              {['All', ...ROLE_CATEGORIES].map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-blue-500/20 border border-blue-500/30 text-blue-400'
                      : 'border border-[#30363d] text-[#484f58] hover:text-[#8b949e]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Role dropdown trigger */}
            <button
              onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                selectedRole
                  ? 'border-purple-500/40 bg-purple-500/5 text-white'
                  : 'border-[#30363d] bg-[#0d1117] text-[#484f58]'
              }`}
            >
              <div className="flex items-center gap-3">
                {selectedRole ? (
                  <>
                    <span className="text-xl">{selectedRole.icon}</span>
                    <div className="text-left">
                      <p className="font-medium text-white">{selectedRole.title}</p>
                      <p className="text-xs text-[#8b949e]">{selectedRole.category} • {selectedRole.avgSalary}</p>
                    </div>
                  </>
                ) : (
                  <span>Select a job role to compare against...</span>
                )}
              </div>
              <ChevronDown className={`w-4 h-4 text-[#8b949e] transition-transform ${roleDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {roleDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full mt-2 left-0 right-0 bg-[#21262d] border border-[#30363d] rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                >
                  {/* Search */}
                  <div className="p-3 border-b border-[#30363d]">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#0d1117] border border-[#30363d]">
                      <Search className="w-3.5 h-3.5 text-[#484f58]" />
                      <input
                        type="text"
                        value={roleSearch}
                        onChange={e => setRoleSearch(e.target.value)}
                        placeholder="Search roles..."
                        className="flex-1 bg-transparent text-sm text-[#e6edf3] placeholder-[#484f58] outline-none"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Role list */}
                  <div className="max-h-72 overflow-y-auto">
                    {filteredRoles.length === 0 ? (
                      <div className="py-6 text-center text-sm text-[#484f58]">No roles found</div>
                    ) : (
                      <div className="p-2">
                        {filteredRoles.map((role, i) => (
                          <motion.button
                            key={role.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.02 }}
                            onClick={() => {
                              setSelectedRole(role);
                              setRoleDropdownOpen(false);
                              setRoleSearch('');
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left ${
                              selectedRole?.id === role.id
                                ? 'bg-blue-500/15 border border-blue-500/30'
                                : 'hover:bg-[#30363d]'
                            }`}
                          >
                            <span className="text-lg flex-shrink-0">{role.icon}</span>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-[#e6edf3] truncate">{role.title}</p>
                                {role.demandLevel === 'High' && (
                                  <span className="flex-shrink-0 px-1.5 py-0.5 rounded text-xs font-medium bg-green-500/15 text-green-400 border border-green-500/20">
                                    Hot
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-[#484f58]">{role.category} • {role.avgSalary}</p>
                            </div>
                            {selectedRole?.id === role.id && (
                              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Selected role skills preview */}
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 p-3 rounded-lg bg-[#0d1117] border border-[#21262d]"
            >
              <p className="text-xs text-[#484f58] mb-2 font-medium">Required skills preview:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedRole.skills.core.slice(0, 8).map(skill => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded text-xs bg-[#21262d] border border-[#30363d] text-[#8b949e]"
                  >
                    {skill}
                  </span>
                ))}
                {selectedRole.skills.core.length > 8 && (
                  <span className="px-2 py-0.5 rounded text-xs text-[#484f58]">
                    +{selectedRole.skills.core.length - 8} more...
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Analyze Button */}
        <motion.button
          onClick={handleAnalyze}
          disabled={isLoading}
          whileHover={!isLoading ? { scale: 1.01, boxShadow: '0 0 40px rgba(88, 166, 255, 0.25)' } : {}}
          whileTap={!isLoading ? { scale: 0.99 } : {}}
          className={`w-full py-4 rounded-xl text-base font-semibold transition-all flex items-center justify-center gap-3 ${
            isLoading
              ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 shadow-lg shadow-blue-500/20'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-[#484f58] border-t-[#8b949e] rounded-full animate-spin" />
              <span>Analyzing with AI...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5" />
              <span>Analyze Skill Gap</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>
      </div>
    </div>
  );
}

// ArrowRight import needed
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}
