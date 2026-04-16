import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { AiAction } from '../data/mockData';
import { Sparkles, X, Check, ArrowRight, AlertTriangle, Eye, Zap, Pencil, ExternalLink } from 'lucide-react';
import { SchoolAfterMagic } from '../pages/SchoolAfterMagic';

interface Props {
  action: AiAction;
  onClose: () => void;
  onComplete: (id: string, status: 'approved' | 'rejected') => void;
}

export function AiReviewModal({ action, onClose, onComplete }: Props) {
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showAfter, setShowAfter] = useState(true);

  const handleApprove = () => {
    if (action.requiresUserInput && !userInput.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      onComplete(action.id, 'approved');
      setIsProcessing(false);
    }, 1200);
  };

  const handleReject = () => {
    onComplete(action.id, 'rejected');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
        {/* Backdrop */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        {/* Modal Content - Wide Split View */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full h-full max-w-[1400px] bg-white border border-slate-200 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row"
        >
          {/* Close button - absolute top right */}
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 text-slate-500 hover:text-slate-800 bg-white/80 backdrop-blur hover:bg-slate-100 rounded-full p-2 shadow-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Panel: Review Context & Actions */}
          <div className="w-full md:w-[400px] lg:w-[450px] flex flex-col shrink-0 bg-white z-0 relative">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-2 text-blue-600 text-xs font-bold tracking-wide uppercase mb-2">
                <Sparkles className="w-4 h-4" />
                AI Content Proposal
              </div>
              <h2 className="text-xl font-bold text-slate-900 leading-tight">{action.title}</h2>
            </div>

            {/* Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-8">
              
              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Source Context</h3>

                {/* Summary text */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <p className="text-sm text-slate-700 leading-relaxed">{action.summary}</p>
                </div>

                {/* Multi-source citations */}
                {action.sources && action.sources.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Sources</h3>
                    {action.sources.map((src, idx) => (
                      <a
                        key={idx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-slate-100 transition-colors group -mx-2"
                      >
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${new URL(src.url).hostname}&sz=32`}
                          alt=""
                          className="w-3.5 h-3.5 object-contain shrink-0 opacity-70 group-hover:opacity-100"
                          onError={e => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="text-xs font-semibold text-slate-600 group-hover:text-indigo-600 transition-colors shrink-0">{src.website}</span>
                        <span className="text-xs text-slate-400 truncate">— {src.detail}</span>
                        <ExternalLink className="w-3 h-3 text-slate-300 group-hover:text-indigo-400 shrink-0 ml-auto transition-colors" />
                      </a>
                    ))}
                  </div>
                ) : action.sourceUrl ? (
                  /* Single source fallback */
                  <a
                    href={action.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 transition-colors group"
                  >
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${new URL(action.sourceUrl).hostname}&sz=32`}
                      alt=""
                      className="w-3.5 h-3.5 object-contain opacity-70 group-hover:opacity-100"
                      onError={e => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="underline underline-offset-2 decoration-slate-300 group-hover:decoration-indigo-400 truncate max-w-[260px]">
                      {action.sourceWebsite ?? action.source}
                    </span>
                    <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100 shrink-0" />
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <Sparkles className="w-3 h-3" />
                    {action.source}
                  </span>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Proposed Changes</h3>
                <ul className="space-y-3 bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
                  {action.proposedChanges.map((change, idx) => (
                    <li key={idx} className="flex gap-3 text-slate-700">
                      <ArrowRight className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium">{change}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <Pencil className="w-4 h-4" />
                  Edit with Assistant
                </button>
              </div>

              {action.requiresUserInput && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-orange-50 border border-orange-200 p-5 rounded-xl space-y-3 shadow-inner"
                >
                  <div className="flex items-center gap-2 text-orange-700 font-bold uppercase text-xs tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    Input Required
                  </div>
                  <p className="text-sm font-medium text-slate-800">{action.userPrompt}</p>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type missing info here..."
                    className="w-full bg-white border border-slate-300 rounded-lg px-4 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
                  />
                </motion.div>
              )}

            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-slate-100 bg-slate-50/80 space-y-2">
              {/* Primary actions row */}
              <div className="flex gap-2">
                <button
                  onClick={handleReject}
                  disabled={isProcessing}
                  className="flex-1 py-2.5 rounded-lg text-sm font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-200 transition-colors disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  onClick={handleApprove}
                  disabled={isProcessing || (action.requiresUserInput && !userInput.trim())}
                  className="flex-[2] py-2.5 rounded-lg text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(59,130,246,0.39)] bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
                      Applying...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Approve & Publish
                    </>
                  )}
                </button>
              </div>
              {/* Secondary action — full width */}
              <button
                onClick={handleApprove}
                disabled={isProcessing || (action.requiresUserInput && !userInput.trim())}
                className="w-full py-2.5 rounded-lg text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Always apply this type automatically
              </button>
            </div>
          </div>

          {/* Right Panel: Live Preview */}
          <div className="hidden md:flex flex-1 flex-col bg-slate-100 relative">
            {/* Preview Toolbar */}
            <div className="h-14 bg-white border-b border-l border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
              <div className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-500" /> Live Site Preview
              </div>
              
              {/* Before / After Toggle */}
              <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${!showAfter ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Current Site
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${showAfter ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  AI Proposed
                </button>
              </div>
            </div>

            {/* Preview Canvas */}
            <div className="flex-1 relative overflow-hidden bg-slate-100">
              <div className="w-full h-full overflow-y-auto bg-slate-50">
                <SchoolAfterMagic
                  previewType={action.previewType}
                  showAfter={showAfter}
                  userLocationValue={userInput}
                  pendingChanges={action.pendingChanges}
                />
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
