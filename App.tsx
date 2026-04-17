import { useState, useCallback, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SkillInput from './components/SkillInput';
import ResultDashboard from './components/ResultDashboard';
import Loader from './components/Loader';
import Footer from './components/Footer';
import Notification from './components/Notification';
import { analyzeSkillGap, generateLearningRoadmap } from './utils/skillAnalyzer';
import type { AnalysisResult, LearningRoadmap, NotificationState, JobRole } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [roadmap, setRoadmap] = useState<LearningRoadmap | null>(null);
  const [notification, setNotification] = useState<NotificationState>({
    show: false,
    message: '',
    type: 'info',
  });

  const analyzeRef = useRef<HTMLDivElement>(null);

  const showNotification = useCallback((message: string, type: NotificationState['type']) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  }, []);

  const handleAnalyze = useCallback(async (skills: string[], role: JobRole) => {
    setIsLoading(true);
    setResult(null);
    setRoadmap(null);

    try {
      // Simulate AI processing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 2200));

      const analysisResult = analyzeSkillGap(skills, role);
      const learningRoadmap = generateLearningRoadmap(analysisResult, role);

      setResult(analysisResult);
      setRoadmap(learningRoadmap);

      showNotification(
        `Analysis complete! You match ${analysisResult.matchPercentage}% of ${role.title} skills.`,
        analysisResult.matchPercentage >= 60 ? 'success' : 'info'
      );
    } catch (err) {
      console.error('Analysis error:', err);
      showNotification('Analysis failed. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showNotification]);

  const handleReset = useCallback(() => {
    setResult(null);
    setRoadmap(null);
    setTimeout(() => {
      document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, []);

  const scrollToAnalyze = useCallback(() => {
    document.getElementById('analyze')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Notifications */}
      <Notification
        {...notification}
        onClose={() => setNotification(prev => ({ ...prev, show: false }))}
      />

      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && <Loader />}
      </AnimatePresence>

      {/* Main Content */}
      <main>
        {/* Hero */}
        <HeroSection onGetStarted={scrollToAnalyze} />

        {/* Skill Input Section */}
        <section className="bg-[#0d1117]">
          <div ref={analyzeRef}>
            {!result && (
              <SkillInput
                onAnalyze={handleAnalyze}
                isLoading={isLoading}
              />
            )}
          </div>
        </section>

        {/* Results Section */}
        <AnimatePresence mode="wait">
          {result && roadmap && (
            <motion.section
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-[#0d1117]"
            >
              <ResultDashboard
                result={result}
                roadmap={roadmap}
                onReset={handleReset}
              />
            </motion.section>
          )}
        </AnimatePresence>

        {/* Feature highlights section */}
        {!result && (
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-7xl mx-auto px-4 sm:px-6 py-20"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">
                How SkillForge Works
              </h2>
              <p className="text-[#8b949e] max-w-2xl mx-auto">
                Our AI-powered engine provides deep semantic analysis of your skills
                against real industry requirements.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  emoji: '🧠',
                  title: 'Semantic AI Matching',
                  description: 'Goes beyond keyword matching. Understands that "ML" = "Machine Learning" and finds conceptual similarities.',
                  color: '#58a6ff',
                },
                {
                  emoji: '📊',
                  title: 'Detailed Gap Analysis',
                  description: 'Breaks down matched, partial, and missing skills by category — core, optional, and tools.',
                  color: '#a371f7',
                },
                {
                  emoji: '🗺️',
                  title: 'Personalized Roadmap',
                  description: 'Generates a phase-by-phase learning plan with resources, projects, and milestones tailored to your gaps.',
                  color: '#3fb950',
                },
                {
                  emoji: '📄',
                  title: 'Resume Intelligence',
                  description: 'Upload your PDF resume and our engine automatically extracts and normalizes your skills.',
                  color: '#ffa657',
                },
                {
                  emoji: '💼',
                  title: '50+ Job Roles',
                  description: 'Comprehensive database of tech, data, design, product, security, and leadership roles.',
                  color: '#f778ba',
                },
                {
                  emoji: '⚡',
                  title: 'Instant Results',
                  description: 'Get your complete skill gap analysis and learning roadmap in under 3 seconds.',
                  color: '#d29922',
                },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4, boxShadow: `0 20px 40px ${feature.color}10` }}
                  className="p-5 rounded-xl border border-[#21262d] bg-[#161b22] cursor-default transition-all duration-300"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-4"
                    style={{ background: `${feature.color}15`, border: `1px solid ${feature.color}25` }}
                  >
                    {feature.emoji}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-[#8b949e] leading-relaxed">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <motion.button
                onClick={scrollToAnalyze}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg shadow-blue-500/20"
              >
                Start Your Analysis →
              </motion.button>
            </div>
          </motion.section>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
