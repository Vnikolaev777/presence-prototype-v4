import { useState, useEffect } from 'react';
import {
  Sparkles, MoveRight, Layers, LayoutTemplate, Accessibility,
  Database, Bot, CheckCircle, PenTool, Code2, ShieldAlert,
  Server, Link as LinkIcon, Users, Loader2, AlertCircle,
  RefreshCw, FileText, Zap
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SchoolBefore } from '../pages/SchoolBefore';
import { SchoolAfterMagic } from '../pages/SchoolAfterMagic';

type ScenarioStep = 'idle' | 'url_input' | 'audit' | 'orchestrator' | 'generation' | 'post_audit' | 'hiring';

interface AiWorkspaceViewProps {
  onFinishScenario?: () => void;
  onAgentsHired?: () => void;
}

const QUICK_ACTIONS = [
  { icon: <LayoutTemplate className="w-4 h-4" />, label: 'Make a new website',        color: 'bg-blue-50 text-blue-600 border-blue-100',    scenario: false },
  { icon: <Layers         className="w-4 h-4" />, label: 'Migrate an existing website', color: 'bg-indigo-50 text-indigo-600 border-indigo-100', scenario: true  },
  { icon: <ShieldAlert    className="w-4 h-4" />, label: 'Perform an AI audit',         color: 'bg-emerald-50 text-emerald-600 border-emerald-100', scenario: false },
  { icon: <Accessibility  className="w-4 h-4" />, label: 'Improve accessibility',       color: 'bg-rose-50 text-rose-600 border-rose-100',    scenario: false },
  { icon: <Users          className="w-4 h-4" />, label: "Create a parent's hub",       color: 'bg-amber-50 text-amber-600 border-amber-100',  scenario: false },
  { icon: <Database       className="w-4 h-4" />, label: 'Create mini websites',        color: 'bg-cyan-50 text-cyan-600 border-cyan-100',     scenario: false },
];

// ─── Shared circular gauge ──────────────────────────────────────────────────
function CircularGauge({ score, maxScore, size = 120, strokeWidth = 12, color = '#ef4444' }: {
  score: number; maxScore: number; size?: number; strokeWidth?: number; color?: string;
}) {
  const cx = size / 2, cy = size / 2;
  const r  = (size - strokeWidth * 2) / 2;
  const c  = 2 * Math.PI * r;
  const filled = (score / maxScore) * c;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={strokeWidth} />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round" strokeDasharray={`${filled} ${c - filled}`}
        transform={`rotate(-90 ${cx} ${cy})`} />
    </svg>
  );
}

// ─── Legacy audit mini card (chat) ─────────────────────────────────────────
function AuditChatCard() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <CircularGauge score={4} maxScore={10} size={48} strokeWidth={6} color="#ef4444" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500 font-extrabold text-sm leading-none">4</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            Legacy Audit <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
            <div>Performance: <span className="font-bold text-red-500">32%</span></div>
            <div>Accessibility: <span className="font-bold text-amber-500">45%</span></div>
            <div>SEO: <span className="font-bold text-red-500">20%</span></div>
          </div>
        </div>
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Click to view details</div>
    </div>
  );
}

// ─── New site audit mini card (chat) ───────────────────────────────────────
function PostAuditChatCard() {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <CircularGauge score={10} maxScore={10} size={48} strokeWidth={6} color="#10b981" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-emerald-500 font-extrabold text-sm leading-none">10</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            New Site Audit <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
            <div>Performance: <span className="font-bold text-emerald-600">98%</span></div>
            <div>Accessibility: <span className="font-bold text-emerald-600">96%</span></div>
            <div>SEO: <span className="font-bold text-emerald-600">94%</span></div>
          </div>
        </div>
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Click to view details</div>
    </div>
  );
}

// ─── Legacy audit full canvas ───────────────────────────────────────────────
function AuditCanvas() {
  const metrics = [
    { label: 'Performance',   value: 32, color: 'text-red-500',   barColor: 'bg-red-500'   },
    { label: 'Accessibility', value: 45, color: 'text-amber-500', barColor: 'bg-amber-500' },
    { label: 'SEO',           value: 20, color: 'text-red-500',   barColor: 'bg-red-500'   },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-12 bg-white animate-in fade-in duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Legacy Audit</h2>
        <p className="text-slate-400 mt-1 text-sm font-medium">Web Performance Score</p>
      </div>
      <div className="relative">
        <CircularGauge score={4} maxScore={10} size={200} strokeWidth={20} color="#ef4444" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-6xl font-extrabold text-red-500 leading-none">4</span>
          <span className="text-slate-400 text-base font-medium">/10</span>
          <AlertCircle className="w-5 h-5 text-red-400 mt-1" />
        </div>
      </div>
      <div className="flex gap-10 w-full max-w-sm">
        {metrics.map(m => (
          <div key={m.label} className="flex-1 space-y-2">
            <div className={cn("text-2xl font-extrabold", m.color)}>{m.value}%</div>
            <div className="text-xs text-slate-500 font-medium">{m.label}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full", m.barColor)} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {['Outdated Assets', 'Missing Alt-Text', 'Slow Server Response'].map(tag => (
          <span key={tag} className="bg-red-50 border border-red-200 text-red-500 text-xs font-semibold px-4 py-2 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ─── New site audit full canvas ─────────────────────────────────────────────
function PostAuditCanvas() {
  const metrics = [
    { label: 'Performance',   value: 98, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { label: 'Accessibility', value: 96, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { label: 'SEO',           value: 94, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-12 bg-white animate-in fade-in duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">New Site Audit</h2>
        <p className="text-slate-400 mt-1 text-sm font-medium">Web Performance Score</p>
      </div>
      <div className="relative">
        <CircularGauge score={10} maxScore={10} size={200} strokeWidth={20} color="#10b981" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-6xl font-extrabold text-emerald-500 leading-none">10</span>
          <span className="text-slate-400 text-base font-medium">/10</span>
          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
        </div>
      </div>
      <div className="flex gap-10 w-full max-w-sm">
        {metrics.map(m => (
          <div key={m.label} className="flex-1 space-y-2">
            <div className={cn("text-2xl font-extrabold", m.color)}>{m.value}%</div>
            <div className="text-xs text-slate-500 font-medium">{m.label}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={cn("h-full rounded-full transition-all duration-700", m.barColor)} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        {['Fully Optimized', 'WCAG Compliant', 'SEO Ready'].map(tag => (
          <span key={tag} className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full">{tag}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Agent hire card (chat bubble) ─────────────────────────────────────────
function AgentHireCard({ name, role, description, gradientClass, icon }: {
  name: string; role: string; description: string; gradientClass: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm w-full animate-in fade-in slide-in-from-bottom-2 duration-400">
      <div className={cn("px-4 py-3 flex items-center gap-3", gradientClass)}>
        <div className="w-8 h-8 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/20 shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-white text-sm leading-tight">{name}</div>
          <div className="text-white/70 text-[10px]">{role}</div>
        </div>
        <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-1 rounded-full border border-white/30 shrink-0 flex items-center gap-1">
          <CheckCircle className="w-3 h-3" /> Hired
        </span>
      </div>
      <div className="px-4 py-3">
        <p className="text-xs text-slate-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────
export function AiWorkspaceView({ onFinishScenario, onAgentsHired }: AiWorkspaceViewProps) {
  const [scenarioStep, setScenarioStep] = useState<ScenarioStep>('idle');
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'agent', content: React.ReactNode}[]>([]);
  const [orchestratorTick, setOrchestratorTick] = useState<number>(-4);

  const [typedUrl, setTypedUrl]           = useState('');
  const [urlSubmitted, setUrlSubmitted]   = useState(false);
  const [urlPromptReady, setUrlPromptReady] = useState(false);
  const [auditReady, setAuditReady]       = useState(false);
  const [postAuditReady, setPostAuditReady] = useState(false);

  const TARGET_URL = 'http://lincolnhigh.edu';

  // Auto-tick orchestrator
  useEffect(() => {
    if (scenarioStep === 'orchestrator' && orchestratorTick < 5) {
      let waitTime = 1200;
      if (orchestratorTick === -4) waitTime = 2000;
      if (orchestratorTick === -3) waitTime = 2500;
      if (orchestratorTick === -2) waitTime = 3000;
      if (orchestratorTick === -1) waitTime = 1500;
      const timer = setTimeout(() => setOrchestratorTick(prev => prev + 1), waitTime);
      return () => clearTimeout(timer);
    }
  }, [scenarioStep, orchestratorTick]);

  // Orchestrator chat messages
  useEffect(() => {
    if (scenarioStep === 'orchestrator') {
      if (orchestratorTick === -3) {
        agentMessage("I am allocating specialized AI Sub-Agents to your workspace. They will handle site maintenance, copywriting, and widget layouts so you don't have to.");
      } else if (orchestratorTick === -1) {
        agentMessage("To ensure your calendar, directory, and parent data stay perfectly in sync, I am securely connecting our Data Hooks to your core school databases.");
      } else if (orchestratorTick === 4) {
        agentMessage("All agents deployed and SIS platforms connected. Your ecosystem is ready. Would you like me to execute the migration and deploy the new platform?");
      }
    }
  }, [orchestratorTick, scenarioStep]);

  const agentMessage = (content: React.ReactNode) => setChatMessages(prev => [...prev, { role: 'agent', content }]);
  const userMessage  = (content: React.ReactNode) => setChatMessages(prev => [...prev, { role: 'user',  content }]);

  // ── Step handlers ─────────────────────────────────────────────────────────

  const startScenario = () => {
    setScenarioStep('url_input');
    setTypedUrl(TARGET_URL);
    setUrlSubmitted(false);
    setUrlPromptReady(false);
    setAuditReady(false);
    setPostAuditReady(false);
    setChatMessages([{ role: 'user', content: 'Migrate our existing website' }]);
    setTimeout(() => {
      agentMessage("Sure! To get started, please share the URL of your current school website and I'll analyze its structure, content, and performance.");
      setUrlPromptReady(true);
    }, 800);
  };

  const confirmUrl = () => {
    setUrlSubmitted(true);
    userMessage(typedUrl);
    setTimeout(() => {
      agentMessage(
        <span>Scanning <span className="font-bold text-blue-600">{typedUrl}</span> now — pulling up the current structure, page hierarchy, and assets. This will only take a moment...</span>
      );
      setTimeout(() => {
        setScenarioStep('audit');
        agentMessage(<AuditChatCard />);
        setTimeout(() => {
          agentMessage("Your site is slow, non-responsive, and lacks SEO metadata");
          setTimeout(() => setAuditReady(true), 500);
        }, 700);
      }, 2500);
    }, 900);
  };

  const advanceToOrchestrator = () => {
    userMessage("Let's fix it — migrate the site.");
    setTimeout(() => {
      setScenarioStep('orchestrator');
      setOrchestratorTick(-4);
      agentMessage("On it! I will handle mapping your old structure to our modern React CMS framework.");
    }, 1000);
  };

  const advanceToGeneration = () => {
    userMessage("Connections look good. Deploy the new framework.");
    setTimeout(() => {
      setScenarioStep('generation');
      agentMessage("Data streams secured! Generating the new React-based design and migrating your content now...");
      // Auto-advance to post_audit after the site "loads"
      setTimeout(() => {
        setScenarioStep('post_audit');
        agentMessage(<PostAuditChatCard />);
        setTimeout(() => {
          agentMessage(
            <div className="space-y-3">
              <p className="font-semibold text-slate-800">This isn't just a new design — it's a living platform.</p>
              <div className="space-y-2 text-slate-600">
                <div className="flex items-start gap-2">
                  <RefreshCw className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                  <span><strong>Auto-syncs</strong> with PowerSchool, FACTS SIS & Google Drive — your directory, schedules, and documents update themselves.</span>
                </div>
                <div className="flex items-start gap-2">
                  <PenTool className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                  <span><strong>Content Creator Agent</strong> drafts blogs, newsletters, and parent emails directly from your inbox.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span><strong>Web Admin Agent</strong> monitors widgets, fixes broken links, and enforces accessibility in the background.</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span>You <strong>review and approve</strong> — the agents handle the rest. Zero manual publishing.</span>
                </div>
              </div>
            </div>
          );
          setTimeout(() => setPostAuditReady(true), 600);
        }, 800);
      }, 2800);
    }, 1000);
  };

  const advanceToHiring = () => {
    userMessage("Amazing — let's set it all up.");
    setTimeout(() => {
      setScenarioStep('hiring');
      agentMessage("The foundation is set! I'm now hiring two specialized agents to maintain your site in the background:");
      setTimeout(() => {
        agentMessage(
          <AgentHireCard
            name="Web Admin Agent"
            role="SysOps · Always On"
            description="Manages widget layout, accessibility compliance, and integrations. Monitors for broken links, performance regressions, and unauthorized changes."
            gradientClass="bg-gradient-to-r from-blue-600 to-indigo-600"
            icon={<Code2 className="w-4 h-4 text-white" />}
          />
        );
        setTimeout(() => {
          agentMessage(
            <AgentHireCard
              name="Content Creator Agent"
              role="Copywriting · Automated"
              description="Drafts blogs, emails, and newsletters automatically from your inbox and district feeds. Surfaces updates for your review before publishing."
              gradientClass="bg-gradient-to-r from-emerald-500 to-teal-600"
              icon={<PenTool className="w-4 h-4 text-white" />}
            />
          );
          // Unlock the nav tab as soon as both cards are visible
          onAgentsHired?.();
          setTimeout(() => {
            agentMessage("I've set up a dedicated inbox on your Overview Dashboard — everything they produce will land there for your review.");
          }, 600);
        }, 700);
      }, 800);
    }, 1000);
  };

  const finishAndGoToDashboard = () => {
    if (onFinishScenario) onFinishScenario();
  };

  // ── Derived booleans ──────────────────────────────────────────────────────
  const isIdle      = scenarioStep === 'idle';
  const isUrlInput  = scenarioStep === 'url_input';
  const isAudit     = scenarioStep === 'audit';
  const isPostAudit = scenarioStep === 'post_audit';

  return (
    <div className="flex h-full w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">

      {/* ── LEFT: CHAT PANEL ─────────────────────────────────────────────── */}
      <div className="w-1/3 min-w-[300px] max-w-sm border-r border-slate-200 bg-slate-50 flex flex-col">
        <div className="p-4 border-b border-slate-200 bg-white flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 text-sm">Presence Assistant</h2>
            <p className="text-xs text-slate-500">
              {isIdle ? 'Ready to help' : isAudit ? 'Audit complete' : isPostAudit ? 'Site live — 10/10' : 'Migrating website'}
            </p>
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">

          {/* IDLE STATE */}
          {isIdle && (
            <div className="space-y-4 animate-in fade-in duration-500">
              <div className="flex flex-col mr-auto items-start max-w-[95%]">
                <div className="px-3 py-2 rounded-2xl rounded-bl-sm text-sm shadow-sm bg-white border border-slate-200 text-slate-700">
                  <p className="font-medium mb-1">👋 Hello! I'm your Presence Assistant.</p>
                  <p className="text-slate-500 text-xs leading-relaxed">I can build websites, manage integrations, and deploy AI agents. What would you like to do?</p>
                </div>
                <span className="text-[10px] text-slate-400 mt-1">Presence Assistant</span>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Quick Actions</p>
                {QUICK_ACTIONS.map((action, i) => (
                  <button key={i} onClick={action.scenario ? startScenario : undefined}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all group text-sm font-semibold bg-white hover:shadow-md hover:border-slate-300 cursor-pointer border-slate-200 text-slate-700">
                    <span className={cn("p-1.5 rounded-lg border shrink-0", action.color)}>{action.icon}</span>
                    <span className="flex-1">{action.label}</span>
                    <MoveRight className="w-3.5 h-3.5 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SCENARIO: chat messages */}
          {!isIdle && chatMessages.map((msg, i) => (
            <div key={i} className={cn("flex flex-col max-w-[90%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
              <div className={cn("px-3 py-2 rounded-2xl text-sm shadow-sm",
                msg.role === 'user'
                  ? "bg-slate-800 text-white rounded-br-sm"
                  : "bg-white border border-slate-200 text-slate-700 rounded-bl-sm"
              )}>
                {msg.content}
              </div>
              <span className="text-[10px] text-slate-400 mt-1">{msg.role === 'user' ? 'You' : 'Presence Assistant'}</span>
            </div>
          ))}

          {/* URL INPUT: confirm button */}
          {isUrlInput && !urlSubmitted && urlPromptReady && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 pt-2">
              <button onClick={confirmUrl}
                className="border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors flex items-center gap-2">
                Submit link &rarr;
              </button>
            </div>
          )}

          {/* SCENARIO ACTION BUTTONS */}
          {!isIdle && !isUrlInput && (
            <div className="pt-4 flex justify-start">
              {isAudit && auditReady && (
                <button onClick={advanceToOrchestrator}
                  className="animate-in fade-in slide-in-from-bottom border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors">
                  Proceed with migration &rarr;
                </button>
              )}
              {scenarioStep === 'orchestrator' && orchestratorTick >= 4 && (
                <button onClick={advanceToGeneration}
                  className="animate-in fade-in slide-in-from-bottom border border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors">
                  Generate site &rarr;
                </button>
              )}
              {isPostAudit && postAuditReady && (
                <button onClick={advanceToHiring}
                  className="animate-in fade-in slide-in-from-bottom border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors">
                  What's next? &rarr;
                </button>
              )}
              {scenarioStep === 'hiring' && (
                <button onClick={finishAndGoToDashboard}
                  className="animate-in fade-in slide-in-from-bottom bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors flex items-center gap-2">
                  Return to Overview <CheckCircle className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── CENTER: CANVAS ────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 relative hidden md:flex flex-col border-r border-slate-200 overflow-hidden bg-white">

        {/* IDLE + URL INPUT: placeholder */}
        {(isIdle || isUrlInput) && (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center bg-slate-100 animate-in fade-in duration-700">
            <div className="w-20 h-20 rounded-2xl bg-white border border-slate-200 shadow-md flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-slate-300" />
            </div>
            <p className="text-slate-400 font-semibold text-sm max-w-xs">
              {isIdle
                ? <>Select a quick action on the left to get started.<br />Your website preview will appear here.</>
                : 'Your site preview will load once the URL is confirmed.'}
            </p>
          </div>
        )}

        {/* AUDIT: legacy audit report */}
        {isAudit && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-700">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
                <div className="w-2.5 h-2.5 rounded-full bg-slate-200"/>
              </div>
              <div className="bg-red-50 px-3 py-1 rounded text-xs text-red-600 font-mono flex-1 text-center border border-red-200">
                {TARGET_URL} (Audit Report)
              </div>
            </div>
            <AuditCanvas />
          </div>
        )}

        {/* ORCHESTRATOR: "before" site — desaturated */}
        {scenarioStep === 'orchestrator' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-700 opacity-60 saturate-50 contrast-75">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/></div>
              <div className="bg-slate-100 px-3 py-1 rounded text-xs text-slate-500 font-mono flex-1 text-center border border-slate-200">http://lincolnhigh.edu (Migrating...)</div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div className="min-w-[1100px] pointer-events-none"><SchoolBefore /></div>
            </div>
          </div>
        )}

        {/* GENERATION: "after" site — brief reveal */}
        {scenarioStep === 'generation' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/></div>
              <div className="bg-blue-50 px-3 py-1 rounded text-xs text-blue-700 font-bold font-mono flex-1 text-center border border-blue-200">http://lincolnhigh.edu (Generating...)</div>
              <div className="text-[10px] text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                <Loader2 className="w-3 h-3 animate-spin" /> Building
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div className="min-w-[1100px] pointer-events-none"><SchoolAfterMagic /></div>
            </div>
          </div>
        )}

        {/* POST AUDIT: new site audit report */}
        {isPostAudit && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-700">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400"/>
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
              </div>
              <div className="bg-emerald-50 px-3 py-1 rounded text-xs text-emerald-700 font-mono flex-1 text-center border border-emerald-200">
                {TARGET_URL} (Audit Report — New Site)
              </div>
              <div className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3 h-3" /> 10/10
              </div>
            </div>
            <PostAuditCanvas />
          </div>
        )}

        {/* HIRING: "after" site — AI Managed */}
        {scenarioStep === 'hiring' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/></div>
              <div className="bg-blue-50 px-3 py-1 rounded text-xs text-blue-700 font-bold font-mono flex-1 text-center border border-blue-200">http://lincolnhigh.edu (AI Managed)</div>
              <div className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3 h-3" /> Live
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div className="min-w-[1100px] pointer-events-none"><SchoolAfterMagic /></div>
            </div>
          </div>
        )}
      </div>

      {/* ── RIGHT: CONTROL PANEL ─────────────────────────────────────────── */}
      <div className="w-72 min-w-[260px] bg-slate-50 overflow-y-auto relative hidden lg:block shadow-inner">
        <div className="p-5 space-y-6">

          {/* IDLE / URL INPUT / AUDIT: empty state */}
          {(isIdle || isUrlInput || isAudit) && (
            <div className="flex flex-col items-center justify-center gap-3 pt-16 text-center px-2 animate-in fade-in">
              <Server className="w-8 h-8 text-slate-200" />
              <p className="text-xs text-slate-400 leading-relaxed">
                Agents and data hooks will appear here once migration starts.
              </p>
            </div>
          )}

          {/* ORCHESTRATOR+: workspace header */}
          {!isIdle && !isUrlInput && !isAudit && (scenarioStep !== 'orchestrator' || orchestratorTick > -4) && (
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2 animate-in fade-in">
              <Server className="w-4 h-4 text-indigo-500" /> Active Workspace
            </h3>
          )}

          {/* Sub-Agents */}
          {!isIdle && !isUrlInput && !isAudit && (scenarioStep !== 'orchestrator' || orchestratorTick >= -2) && (
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl animate-in slide-in-from-right-10 fade-in duration-500">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Assigned Agents</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shadow-sm"><Code2 className="w-4 h-4 text-blue-600"/></div>
                  <div className="flex-1"><p className="text-xs font-bold text-slate-700">Web Admin</p><p className="text-[10px] text-slate-500">SysOps</p></div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shadow-sm"><PenTool className="w-4 h-4 text-emerald-600"/></div>
                  <div className="flex-1"><p className="text-xs font-bold text-slate-700">Content Creator</p><p className="text-[10px] text-slate-500">Copywriting</p></div>
                  <CheckCircle className="w-4 h-4 text-emerald-500" />
                </div>
              </div>
            </div>
          )}

          {/* Data Hooks */}
          {!isIdle && !isUrlInput && !isAudit && (scenarioStep !== 'orchestrator' || orchestratorTick >= 0) && (
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl animate-in slide-in-from-right-10 fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Hooks</p>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full cursor-help">40+ Ready</span>
              </div>
              <div className="space-y-2">
                {[
                  { name: "PowerSchool",     domain: "powerschool.com"     },
                  { name: "FACTS SIS",       domain: "factsmgt.com"        },
                  { name: "Infinite Campus", domain: "infinitecampus.com"  },
                  { name: "Skyward",         domain: "skyward.com"         }
                ].map((sis, idx) => {
                  const isConnecting = orchestratorTick === idx;
                  const isConnected  = orchestratorTick > idx || scenarioStep !== 'orchestrator';
                  return (
                    <div key={sis.name} className={cn("flex items-center justify-between p-2 rounded-xl transition-all duration-500",
                      isConnected  ? "bg-emerald-50 border border-emerald-100/50" :
                      isConnecting ? "bg-blue-50 border border-blue-200"          : "bg-slate-50 border border-slate-100 opacity-50"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-white shadow-sm p-0.5 border border-slate-200 flex items-center justify-center overflow-hidden">
                          <img src={`https://www.google.com/s2/favicons?domain=${sis.domain}&sz=128`} alt={sis.name} className="w-full h-full object-contain"
                            onError={(e) => { e.currentTarget.style.display = 'none' }} />
                        </div>
                        <span className={cn("text-xs font-bold transition-colors",
                          isConnected ? "text-emerald-800" : isConnecting ? "text-blue-800" : "text-slate-500")}>
                          {sis.name}
                        </span>
                      </div>
                      {isConnected  ? <CheckCircle className="w-4 h-4 text-emerald-500 animate-in zoom-in" /> :
                       isConnecting ? <Loader2     className="w-4 h-4 text-blue-500 animate-spin" />        :
                                      <LinkIcon    className="w-3 h-3 text-slate-300" />}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
