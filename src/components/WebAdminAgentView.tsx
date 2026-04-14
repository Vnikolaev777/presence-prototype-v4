import { Code2, CheckCircle, Clock, BrainCircuit } from 'lucide-react';
import { cn } from '../lib/utils';

const RECENT_ACTIONS = [
  { action: 'Detected 300% traffic spike → recommended Quick Links widget', status: 'pending_review', time: '4 min ago' },
  { action: 'Ran accessibility scan — 0 issues found', status: 'auto_applied', time: '18 min ago' },
  { action: 'Synced faculty directory from PowerSchool', status: 'auto_applied', time: '1 hr ago' },
  { action: 'Updated Parent Handbook link (new version detected in Drive)', status: 'auto_applied', time: '3 hrs ago' },
  { action: 'Fixed 2 broken navigation links', status: 'auto_applied', time: 'Yesterday' },
];

export function WebAdminAgentView() {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">

      {/* Agent header */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute -top-8 -right-8 opacity-10"><BrainCircuit className="w-40 h-40" /></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
            <Code2 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Web Admin Agent</h1>
            <p className="text-blue-100 text-sm">SysOps · Always On</p>
          </div>
          <div className="ml-auto flex items-center gap-2 bg-white/20 border border-white/20 px-3 py-1.5 rounded-full text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div>
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-3">Recent Activity</h2>
        <div className="space-y-2">
          {RECENT_ACTIONS.map((entry, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-xl p-4 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                <Code2 className="w-3.5 h-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{entry.action}</p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1"><Clock className="w-3 h-3" />{entry.time}</p>
              </div>
              {entry.status === 'auto_applied' ? (
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full shrink-0 flex items-center gap-1", "text-emerald-600 bg-emerald-50 border border-emerald-200")}>
                  <CheckCircle className="w-3 h-3" /> Done
                </span>
              ) : (
                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-full shrink-0 flex items-center gap-1", "text-amber-600 bg-amber-50 border border-amber-200")}>
                  <Clock className="w-3 h-3" /> Review
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
