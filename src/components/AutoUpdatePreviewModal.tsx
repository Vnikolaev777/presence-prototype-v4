import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap } from 'lucide-react';
import { FacultyDirectoryPage } from '../pages/FacultyDirectoryPage';

interface Props {
  onClose: () => void;
}

export function AutoUpdatePreviewModal({ onClose }: Props) {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header bar */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100 bg-slate-50/80 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                <Zap className="w-3.5 h-3.5" />
                Auto-applied · Just now
              </div>
              <span className="text-sm font-semibold text-slate-700">New Teacher Profile Published — Faculty Directory</span>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-1.5 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Faculty Directory page rendered inside */}
          <div className="overflow-y-auto flex-1">
            <FacultyDirectoryPage onNavigate={onClose} />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
