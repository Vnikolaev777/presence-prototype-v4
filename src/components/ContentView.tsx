import { useState } from 'react';
import type { AiAction } from '../data/mockData';
import { Sparkles, Check, FileEdit, LayoutTemplate, MessageSquareText } from 'lucide-react';
import { SchoolWebsitePreview } from './SchoolWebsitePreview';

export function ContentView({ actions, setActions }: { actions: AiAction[], setActions: any }) {
  const pendingExternal = actions.filter(a => a.status === 'pending' && !a.isInternal);
  
  const pendingBlogs = pendingExternal.filter(a => a.previewType === 'blog');
  const pendingUpdates = pendingExternal.filter(a => a.previewType !== 'blog');

  const [selectedAction, setSelectedAction] = useState<AiAction | null>(null);
  const [showAfter, setShowAfter] = useState(true);

  const handleApprove = () => {
    if (!selectedAction) return;
    setActions(actions.map(a => a.id === selectedAction.id ? { ...a, status: 'approved' } : a));
    setSelectedAction(null);
  };

  const handleReject = () => {
    if (!selectedAction) return;
    setActions(actions.map(a => a.id === selectedAction.id ? { ...a, status: 'rejected' } : a));
    setSelectedAction(null);
  }

  const renderActionList = (items: AiAction[], icon: React.ReactNode, title: string) => (
    <div className="mb-6">
      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/80 flex items-center gap-2">
        {icon}
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
        <span className="ml-auto bg-slate-200 text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">{items.length}</span>
      </div>
      <div className="p-2 space-y-2">
        {items.length === 0 ? (
          <div className="p-4 text-center text-slate-400 text-xs">No pending items.</div>
        ) : (
          items.map(action => (
             <button
               key={action.id}
               onClick={() => setSelectedAction(action)}
               className={`w-full text-left p-4 rounded-xl transition-all ${selectedAction?.id === action.id ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'hover:bg-slate-50 border-transparent'} border`}
             >
               <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-600 mb-2 uppercase tracking-wide">
                 <Sparkles className="w-3.5 h-3.5" />
                 {action.source}
               </div>
               <h4 className="font-bold text-slate-900 mb-1 leading-snug">{action.title}</h4>
               <p className="text-sm text-slate-500 line-clamp-2">{action.summary}</p>
             </button>
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-[1400px] mx-auto animate-in fade-in duration-500 flex flex-col h-full lg:flex-row gap-8">
      
      {/* Left Column Feed ListView */}
      <div className="w-full lg:w-[450px] shrink-0 space-y-6 flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Manual Approvals</h1>
          <p className="text-slate-500 text-sm">Review external AI insights and decide whether to publish them as standalone Blog Posts or as structural Website Updates.</p>
        </div>

        <div className="bg-white border text-left border-slate-200 rounded-2xl shadow-sm flex-1 overflow-y-auto">
          {renderActionList(pendingBlogs, <MessageSquareText className="w-4 h-4 text-indigo-500" />, "Suggested Blog Posts")}
          {renderActionList(pendingUpdates, <LayoutTemplate className="w-4 h-4 text-orange-500" />, "Suggested Website Updates")}
        </div>
      </div>

      {/* Right Column: Split Screen Review / Detail */}
      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col relative">
        {!selectedAction ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 px-6 text-center">
            <FileEdit className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-bold text-slate-700">Select a Suggestion</h3>
            <p className="max-w-xs mt-2 text-sm">Select an item from the feed to review the proposal and see a live preview of your site.</p>
          </div>
        ) : (
          <div className="flex-1 flex flex-col relative">
            
            {/* Action Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-start">
              <div className="max-w-xl">
                 <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                   {selectedAction.previewType === 'blog' ? 'Blog Post Proposal' : 'Website Structure Proposal'}
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedAction.title}</h2>
                 <p className="text-slate-600 text-sm">{selectedAction.summary}</p>
                 
                 {selectedAction.requiresUserInput && (
                   <div className="mt-4 bg-yellow-50 border border-yellow-200 p-3 rounded-lg flex items-start gap-3">
                     <Sparkles className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                     <div className="text-sm text-yellow-800">
                       <strong>AI Requires Input:</strong> {selectedAction.userPrompt}
                     </div>
                   </div>
                 )}
              </div>
              <div className="flex flex-col gap-2 shrink-0 ml-4">
                 <button onClick={handleApprove} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-lg text-sm shadow flex items-center gap-2 transition-colors">
                   <Check className="w-4 h-4" /> 
                   {selectedAction.previewType === 'blog' ? 'Publish Blog Post' : 'Apply Site Update'}
                 </button>
                 <button onClick={handleReject} className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-2 px-6 rounded-lg text-sm transition-colors">
                   Dismiss
                 </button>
              </div>
            </div>

            {/* Live Preview Toggle Bar */}
            <div className="bg-white border-b border-slate-200 p-2 flex justify-center sticky top-0 z-10 shadow-sm">
              <div className="flex bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setShowAfter(false)}
                  className={`px-6 py-1.5 text-xs font-bold rounded-md transition-all ${!showAfter ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Current Website
                </button>
                <button
                  onClick={() => setShowAfter(true)}
                  className={`px-6 py-1.5 text-xs font-bold rounded-md transition-all ${showAfter ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {selectedAction.previewType === 'blog' ? 'With New Blog Post' : 'With Suggested Update'}
                </button>
              </div>
            </div>

            {/* Preview Frame */}
            <div className="flex-1 bg-slate-100 p-4 overflow-hidden relative">
              <div className="w-full h-full max-w-4xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden ring-1 ring-slate-200">
                <SchoolWebsitePreview 
                  previewType={selectedAction.previewType} 
                  showAfter={showAfter} 
                />
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
