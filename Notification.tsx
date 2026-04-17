import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import type { NotificationState } from '../types';

interface NotificationProps extends NotificationState {
  onClose: () => void;
}

const CONFIG = {
  success: { icon: CheckCircle, color: '#3fb950', bg: 'rgba(63,185,80,0.12)', border: 'rgba(63,185,80,0.3)' },
  error: { icon: XCircle, color: '#f85149', bg: 'rgba(248,81,73,0.12)', border: 'rgba(248,81,73,0.3)' },
  warning: { icon: AlertCircle, color: '#d29922', bg: 'rgba(210,153,34,0.12)', border: 'rgba(210,153,34,0.3)' },
  info: { icon: Info, color: '#58a6ff', bg: 'rgba(88,166,255,0.12)', border: 'rgba(88,166,255,0.3)' },
};

export default function Notification({ show, message, type, onClose }: NotificationProps) {
  const config = CONFIG[type];
  const Icon = config.icon;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed top-20 right-4 z-50 flex items-start gap-3 px-4 py-3 rounded-xl border shadow-2xl shadow-black/30 max-w-sm"
          style={{ background: config.bg, borderColor: config.border }}
        >
          <Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: config.color }} />
          <p className="text-sm text-[#e6edf3] flex-1">{message}</p>
          <button
            onClick={onClose}
            className="text-[#484f58] hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
