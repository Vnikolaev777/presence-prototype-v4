import { useState, useEffect, useRef } from 'react';
import {
  Sparkles, MoveRight, Layers, LayoutTemplate, Accessibility,
  Database, Bot, CheckCircle, PenTool, Code2, ShieldAlert,
  Server, Link as LinkIcon, Users, Loader2, AlertCircle,
  RefreshCw, FileText, Zap, ShieldCheck, ExternalLink,
  FolderOpen, BookOpen, ChevronDown, Plus
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

const SIS_PROVIDERS = [
  { name: 'PowerSchool',        domain: 'powerschool.com'          },
  { name: 'FACTS SIS',          domain: 'factsmgt.com'             },
  { name: 'Infinite Campus',    domain: 'infinitecampus.com'       },
  { name: 'Skyward',            domain: 'skyward.com'              },
  { name: 'Frontline SIS',      domain: 'frontlineeducation.com'   },
  { name: 'Aeries SIS',         domain: 'aeries.com'               },
  { name: 'Tyler SIS',          domain: 'tylertech.com'            },
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

// ─── Connection type picker (center canvas) ─────────────────────────────────
function ConnectionTypeScreen({ onSelectSIS }: { onSelectSIS: () => void }) {
  const types = [
    {
      id: 'sis',
      label: 'SIS',
      sub: 'Student Information System',
      icon: <Database className="w-7 h-7" />,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      active: true,
    },
    {
      id: 'lms',
      label: 'LMS',
      sub: 'Learning Management System',
      icon: <BookOpen className="w-7 h-7" />,
      color: 'text-indigo-500',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      active: false,
    },
    {
      id: 'folder',
      label: 'Shared Folder',
      sub: 'Google Drive, OneDrive & more',
      icon: <FolderOpen className="w-7 h-7" />,
      color: 'text-amber-500',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      active: false,
    },
  ];
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 w-full max-w-lg space-y-7">

        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900">Connect a Data Source</h2>
          <p className="text-slate-500 text-sm mt-1">Choose the type of integration to get started</p>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {types.map(t => (
            <button
              key={t.id}
              onClick={t.active ? onSelectSIS : undefined}
              className={cn(
                'flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all duration-200',
                t.active
                  ? `${t.bg} ${t.border} hover:shadow-md hover:scale-[1.03] cursor-pointer`
                  : `${t.bg} ${t.border} cursor-default`
              )}
            >
              <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center', t.bg, t.color)}>
                {t.icon}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">{t.label}</p>
                <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{t.sub}</p>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-400">
          40+ integrations available · More can be added at any time
        </p>
      </div>
    </div>
  );
}

// ─── SIS provider selector (center canvas) ──────────────────────────────────
function SISSelectScreen({ onContinue }: { onContinue: (sis: string) => void }) {
  const [selected, setSelected] = useState('PowerSchool');
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 w-full max-w-sm space-y-6">

        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Database className="w-7 h-7 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Select your SIS</h2>
            <p className="text-slate-500 text-sm mt-0.5">Choose your Student Information System provider</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-600 uppercase tracking-wide">SIS Provider</label>
          <div className="relative">
            <select
              value={selected}
              onChange={e => setSelected(e.target.value)}
              className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
            >
              {SIS_PROVIDERS.map(p => (
                <option key={p.name} value={p.name}>{p.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        <button
          onClick={() => onContinue(selected)}
          className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
        >
          Continue with {selected}
        </button>
      </div>
    </div>
  );
}

// ─── PowerSchool OAuth connect screen (center canvas) ──────────────────────
function ConnectPowerSchoolScreen({ onAuthorize }: { onAuthorize: () => void }) {
  const permissions = [
    'Student enrollment information',
    'Class schedules and rosters',
    'Academic calendar events',
    'Student demographics (name, grade)',
  ];
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-100 p-8 animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 w-full max-w-sm space-y-6">

        {/* Header */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20">
            <Database className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Connect PowerSchool</h2>
            <p className="text-slate-500 text-sm mt-0.5">Secure OAuth 2.0 Authorization</p>
          </div>
        </div>

        {/* Security badges */}
        <div className="space-y-2">
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
            <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Secure Connection</p>
              <p className="text-xs text-slate-500">Your credentials are never stored on our servers</p>
            </div>
          </div>
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl p-3">
            <CheckCircle className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-slate-800">Read-Only Access</p>
              <p className="text-xs text-slate-500">We only request permission to view student data</p>
            </div>
          </div>
        </div>

        {/* Permissions list */}
        <div>
          <p className="text-sm font-bold text-slate-800 mb-3">This integration will access:</p>
          <div className="space-y-2">
            {permissions.map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-2">
          <button
            onClick={onAuthorize}
            className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-bold py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25"
          >
            <ExternalLink className="w-4 h-4" />
            Authorize with PowerSchool
          </button>
          <p className="text-center text-xs text-slate-400">
            You'll be redirected to PowerSchool's secure login page
          </p>
        </div>

      </div>
    </div>
  );
}

// ─── Migration progress path ────────────────────────────────────────────────
const PROGRESS_STEPS = ['Audit', 'Connect', 'Build', 'Review', 'Launch'] as const;

function getProgressIndex(step: ScenarioStep): number {
  switch (step) {
    case 'url_input':
    case 'audit':       return 0;
    case 'orchestrator': return 1;
    case 'generation':  return 2;
    case 'post_audit':  return 3;
    case 'hiring':      return 4;
    default:            return -1;
  }
}

function ScenarioProgressBar({ step }: { step: ScenarioStep }) {
  const active = getProgressIndex(step);
  return (
    <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100 shrink-0 animate-in fade-in duration-300">
      <div className="flex items-start">
        {PROGRESS_STEPS.map((label, i) => {
          const isComplete = i < active;
          const isActive   = i === active;
          return (
            <div key={label} className="flex items-center flex-1 last:flex-none">
              {/* Node */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className={cn(
                  'w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500',
                  isComplete ? 'bg-blue-600' :
                  isActive   ? 'bg-blue-600 ring-2 ring-blue-200 ring-offset-1' :
                               'bg-slate-200'
                )}>
                  {isComplete
                    ? <CheckCircle className="w-3 h-3 text-white" />
                    : isActive
                      ? <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      : <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  }
                </div>
                <span className={cn(
                  'text-[9px] font-bold tracking-wide transition-colors duration-300',
                  isComplete || isActive ? 'text-blue-600' : 'text-slate-400'
                )}>
                  {label}
                </span>
              </div>
              {/* Connector line */}
              {i < PROGRESS_STEPS.length - 1 && (
                <div className={cn(
                  'flex-1 h-0.5 mx-1 mb-4 transition-colors duration-500',
                  i < active ? 'bg-blue-500' : 'bg-slate-200'
                )} />
              )}
            </div>
          );
        })}
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
  const [connectionStep, setConnectionStep] = useState<'type_select' | 'sis_select' | 'powerschool_auth' | null>(null);

  const TARGET_URL = 'https://lincolnhigh.edu';

  // Scale site previews to fit the center column
  const centerColRef = useRef<HTMLDivElement>(null);
  const [siteScale, setSiteScale] = useState(0.5);
  useEffect(() => {
    const el = centerColRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (w > 0) setSiteScale(w / 1100);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Auto-tick orchestrator
  useEffect(() => {
    if (scenarioStep === 'orchestrator' && orchestratorTick < 5 && connectionStep === null) {
      let waitTime = 1200;
      if (orchestratorTick === -4) waitTime = 2000;
      if (orchestratorTick === -3) waitTime = 2500;
      if (orchestratorTick === -2) waitTime = 3000;
      if (orchestratorTick === -1) waitTime = 1500;
      const timer = setTimeout(() => setOrchestratorTick(prev => prev + 1), waitTime);
      return () => clearTimeout(timer);
    }
  }, [scenarioStep, orchestratorTick, connectionStep]);

  // Orchestrator chat messages
  useEffect(() => {
    if (scenarioStep === 'orchestrator') {
      if (orchestratorTick === -3) {
        agentMessage("I'm setting up your workspace — mapping your content structure, rebuilding the framework, and preparing your data connections.");
      } else if (orchestratorTick === -1) {
        agentMessage("To keep your directory, calendar, and parent data perfectly in sync, I need to connect Data Hooks to your school's core systems. Let's start by selecting the type of integration.");
        setConnectionStep('type_select');
      } else if (orchestratorTick === 4) {
        agentMessage("All systems connected and ready. Shall I go ahead and migrate your content into the new platform?");
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
    setConnectionStep(null);
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
          agentMessage("Your site is slow, non-responsive, and lacks SEO metadata.");
          setTimeout(() => {
            agentMessage(
              <span>The good news? Schools that migrate to Presence typically go from a score like this to a <span className="font-bold text-emerald-600">perfect 10/10</span> — faster load times, full accessibility, and top SEO rankings, all on day one.</span>
            );
            setTimeout(() => setAuditReady(true), 400);
          }, 900);
        }, 700);
      }, 2500);
    }, 900);
  };

  const handleTypeSelectSIS = () => {
    userMessage('SIS — Student Information System');
    setConnectionStep('sis_select');
  };

  const handleSISContinue = (sisName: string) => {
    userMessage(`Connect via ${sisName}`);
    setConnectionStep('powerschool_auth');
  };

  const handleAuthorize = () => {
    setConnectionStep(null);
    agentMessage("PowerSchool connected! Linking remaining systems — FACTS SIS, Google Calendar, and the district announcements feed...");
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
                  <span>Blogs, newsletters, and parent emails are <strong>drafted automatically</strong> from your inbox and district feeds.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <span>Broken links are fixed, widgets optimized, and <strong>accessibility enforced</strong> continuously in the background.</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-3.5 h-3.5 text-blue-500 mt-0.5 shrink-0" />
                  <span>You <strong>review and approve</strong> — everything else is handled for you. Zero manual publishing.</span>
                </div>
              </div>
            </div>
          );
          setTimeout(() => {
            agentMessage(
              <span>🎉 <strong>Your new site is live</strong> at a temporary Presence URL. Ready to connect your own domain and make it official?</span>
            );
            setTimeout(() => setPostAuditReady(true), 500);
          }, 700);
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

        {/* MIGRATION PROGRESS PATH */}
        {!isIdle && <ScenarioProgressBar step={scenarioStep} />}

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
                  Migrate &amp; Improve &rarr;
                </button>
              )}
              {isPostAudit && postAuditReady && (
                <button onClick={advanceToHiring}
                  className="animate-in fade-in slide-in-from-bottom border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm transition-colors">
                  Connect domain &amp; publish &rarr;
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
      <div ref={centerColRef} className="flex-1 min-w-0 relative hidden md:flex flex-col border-r border-slate-200 overflow-hidden bg-white">

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

        {/* ORCHESTRATOR: connection flow screens OR desaturated old site */}
        {scenarioStep === 'orchestrator' && connectionStep === 'type_select' && (
          <ConnectionTypeScreen onSelectSIS={handleTypeSelectSIS} />
        )}
        {scenarioStep === 'orchestrator' && connectionStep === 'sis_select' && (
          <SISSelectScreen onContinue={handleSISContinue} />
        )}
        {scenarioStep === 'orchestrator' && connectionStep === 'powerschool_auth' && (
          <ConnectPowerSchoolScreen onAuthorize={handleAuthorize} />
        )}
        {scenarioStep === 'orchestrator' && connectionStep === null && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in duration-700 opacity-60 saturate-50 contrast-75">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/><div className="w-2.5 h-2.5 rounded-full bg-slate-200"/></div>
              <div className="bg-slate-100 px-3 py-1 rounded text-xs text-slate-500 font-mono flex-1 text-center border border-slate-200">http://lincolnhigh.edu (Migrating...)</div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div style={{ zoom: siteScale, width: '1100px' }} className="pointer-events-none"><SchoolBefore /></div>
            </div>
          </div>
        )}

        {/* GENERATION: "after" site — brief reveal */}
        {scenarioStep === 'generation' && (
          <div className="flex-1 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-700">
            <div className="shrink-0 bg-white px-3 py-2 border-b border-slate-200 flex items-center gap-2">
              <div className="flex gap-1.5 shrink-0"><div className="w-2.5 h-2.5 rounded-full bg-red-400"/><div className="w-2.5 h-2.5 rounded-full bg-amber-400"/><div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/></div>
              <div className="bg-blue-50 px-3 py-1 rounded text-xs text-blue-700 font-bold font-mono flex-1 text-center border border-blue-200">https://lincolnhigh.edu (Generating...)</div>
              <div className="text-[10px] text-blue-600 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                <Loader2 className="w-3 h-3 animate-spin" /> Building
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div style={{ zoom: siteScale, width: '1100px' }} className="pointer-events-none"><SchoolAfterMagic /></div>
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
              <div className="bg-blue-50 px-3 py-1 rounded text-xs text-blue-700 font-bold font-mono flex-1 text-center border border-blue-200">https://lincolnhigh.edu (AI Managed)</div>
              <div className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-full font-bold flex items-center gap-1 shrink-0">
                <CheckCircle className="w-3 h-3" /> Live
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-auto bg-white">
              <div style={{ zoom: siteScale, width: '1100px' }} className="pointer-events-none"><SchoolAfterMagic /></div>
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

          {/* Data Hooks */}
          {!isIdle && !isUrlInput && !isAudit && (scenarioStep !== 'orchestrator' || orchestratorTick >= 0) && (
            <div className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl animate-in slide-in-from-right-10 fade-in duration-500">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Data Hooks</p>
                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full cursor-help">40+ Ready</span>
              </div>

              {/* SIS section */}
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">SIS</p>
              <div className="space-y-2 mb-4">
                {[
                  { name: "PowerSchool", domain: "powerschool.com" },
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

              {/* LMS + Shared Folder — waiting tiles */}
              <div className="border-t border-slate-100 pt-3 space-y-2">
                {[
                  { label: 'LMS', sub: 'Canvas, Schoology, Google Classroom…', icon: <BookOpen className="w-3.5 h-3.5" /> },
                  { label: 'Shared Folder', sub: 'Google Drive, OneDrive, Dropbox…', icon: <FolderOpen className="w-3.5 h-3.5" /> },
                ].map(tile => (
                  <div key={tile.label} className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-dashed border-slate-300 opacity-70">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center text-slate-400">
                        {tile.icon}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500">{tile.label}</p>
                        <p className="text-[9px] text-slate-400 leading-tight">{tile.sub}</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1 text-[10px] font-bold text-blue-500 bg-blue-50 border border-blue-200 px-2 py-1 rounded-full hover:bg-blue-100 transition-colors">
                      <Plus className="w-3 h-3" /> Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
