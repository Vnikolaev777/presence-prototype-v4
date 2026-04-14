import { useState } from 'react';
import { Bot } from 'lucide-react';
import type { AiAction } from '../data/mockData';
import { AiReviewModal } from './AiReviewModal';

export function Dashboard({ hasHiredAgents }: any) {
  const [selectedAction, setSelectedAction] = useState<AiAction | null>(null);
  const [removedActions, setRemovedActions] = useState<string[]>([]);

  const CC_ACTION: AiAction = {
    id: 'cc_dash_1',
    isInternal: false,
    timestamp: 'Just now',
    title: 'Publish: State Science Fair Results',
    summary: "I drafted a new blog post highlighting the achievements from our recent State Science Fair based on the emails provided.",
    proposedChanges: [
      "Create new Blog Post: 'Oakwood Excels at State Science Fair'",
      "Publish to Homepage Feed",
      "Send notification email to Parents"
    ],
    requiresUserInput: false,
    previewType: 'science_fair_blog',
    status: 'pending',
    source: 'Principal Inbox',
    sourceType: 'newsletter',
    confidence: 0.95
  };

  const WA_ACTION: AiAction = {
    id: 'wa_dash_1',
    isInternal: false,
    timestamp: '1m ago',
    title: 'Add Quick Links Widget',
    summary: "I noticed a 300% spike in traffic directed towards the Parent Portal. I recommend adding a 'Quick Links' widget to the homepage to reduce friction.",
    proposedChanges: [
      "Inject 'Quick Links' component below Hero Section.",
      "Add direct link to Parent Portal.",
      "Add direct link to Lunch Menus.",
      "Add direct link to Athletics Calendar."
    ],
    requiresUserInput: false,
    previewType: 'quick_links',
    status: 'pending',
    source: 'Google Analytics',
    sourceType: 'district',
    confidence: 0.98
  };

  const isCCPending = !removedActions.includes(CC_ACTION.id);
  const isWAPending = !removedActions.includes(WA_ACTION.id);

  return (
    <div className="animate-in fade-in duration-700 max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-1">Inbox</h1>
        <p className="text-slate-500 text-sm">Suggestions from your AI agents, ready for your review.</p>
      </div>

      {/* Suggestions */}
      {hasHiredAgents ? (
        <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-3 border-b border-blue-200 pb-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><Bot className="w-5 h-5"/></div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Suggestions from your Hired Agents</h2>
              <p className="text-xs text-slate-500">Your dedicated team has prepared updates based on recent activity.</p>
            </div>
          </div>
          <div className="grid gap-4">
            {isCCPending && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 items-start animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold shrink-0 text-sm">CC</div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Content Creator Agent</h3>
                  <p className="text-sm text-slate-600 mt-1">"{CC_ACTION.summary}"</p>
                  <button onClick={() => setSelectedAction(CC_ACTION)} className="mt-3 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Review Draft</button>
                </div>
              </div>
            )}

            {isWAPending && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex gap-4 items-start animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold shrink-0 text-sm">WA</div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm">Web Admin Agent</h3>
                  <p className="text-sm text-slate-600 mt-1">"{WA_ACTION.summary}"</p>
                  <button onClick={() => setSelectedAction(WA_ACTION)} className="mt-3 text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">Approve Widget Addition</button>
                </div>
              </div>
            )}

            {(!isCCPending && !isWAPending) && (
              <p className="text-sm text-slate-500 italic p-4 text-center">Your agents have no pending suggestions right now.</p>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-16 text-center text-slate-400 space-y-3">
          <Bot className="w-10 h-10 mx-auto opacity-30" />
          <p className="font-medium">No agents hired yet.</p>
          <p className="text-sm">Complete the Presence Assistant onboarding to deploy agents that will send suggestions here.</p>
        </div>
      )}

      {selectedAction && (
        <AiReviewModal
          action={selectedAction}
          onClose={() => setSelectedAction(null)}
          onComplete={(id) => {
            setRemovedActions(prev => [...prev, id]);
            setSelectedAction(null);
          }}
        />
      )}
    </div>
  );
}
