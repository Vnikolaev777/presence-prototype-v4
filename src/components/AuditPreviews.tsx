/**
 * AuditPreviews.tsx
 * ─────────────────
 * Standalone, self-contained copies of the audit UI pieces.
 * Safe to edit here — originals in AiWorkspaceView.tsx are untouched.
 *
 * V1 exports (original, simple):
 *   AuditGauge, AuditChatCard, PostAuditChatCard, AuditCanvas, PostAuditCanvas
 *
 * V2 exports (redesigned, Lighthouse-style):
 *   AuditChatCardV2, PostAuditChatCardV2, AuditCanvasV2, PostAuditCanvasV2
 *
 *   AuditPreviewPage — dev showcase for both versions
 */

import { AlertCircle, CheckCircle, Zap, Eye, Search, ShieldCheck, FileText } from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Score color helpers ─────────────────────────────────────────────────────
function scoreColor(n: number) {
  if (n >= 90) return { text: 'text-emerald-600', bar: 'bg-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-200', hex: '#10b981' };
  if (n >= 50) return { text: 'text-orange-500', bar: 'bg-orange-400', bg: 'bg-orange-50', border: 'border-orange-200', hex: '#f97316' };
  return { text: 'text-red-500', bar: 'bg-red-500', bg: 'bg-red-50', border: 'border-red-200', hex: '#ef4444' };
}

// ─── Category row (used in V2 canvas) ────────────────────────────────────────
function CategoryRow({ icon, label, score, detail }: {
  icon: React.ReactNode; label: string; score: number; detail: string;
}) {
  const c = scoreColor(score);
  return (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-slate-400 shrink-0">{icon}</span>
        <span className="text-xs font-semibold text-slate-700 flex-1">{label}</span>
        <span className={cn('text-sm font-extrabold tabular-nums', c.text)}>{score}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden ml-5">
        <div className={cn('h-full rounded-full', c.bar)} style={{ width: `${score}%` }} />
      </div>
      <p className="text-[10px] text-slate-400 ml-5 leading-tight">{detail}</p>
    </div>
  );
}

// ─── Shared circular gauge ──────────────────────────────────────────────────
export function AuditGauge({
  score,
  maxScore,
  size = 120,
  strokeWidth = 12,
  color = '#ef4444',
}: {
  score: number;
  maxScore: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
}) {
  const cx = size / 2, cy = size / 2;
  const r  = (size - strokeWidth * 2) / 2;
  const c  = 2 * Math.PI * r;
  const filled = (score / maxScore) * c;
  return (
    <svg width={size} height={size} className="shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={strokeWidth} />
      <circle
        cx={cx} cy={cy} r={r}
        fill="none" stroke={color} strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={`${filled} ${c - filled}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

// ─── Current site audit mini card (chat bubble) ─────────────────────────────
export function AuditChatCard() {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <AuditGauge score={4} maxScore={10} size={48} strokeWidth={6} color="#ef4444" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500 font-extrabold text-sm leading-none">4</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            Site Audit <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
            <div>Usability: <span className="font-bold text-red-500">32%</span></div>
            <div>Readability: <span className="font-bold text-amber-500">45%</span></div>
            <div>Discoverability: <span className="font-bold text-red-500">20%</span></div>
          </div>
        </div>
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">
        Click to view details
      </div>
    </div>
  );
}

// ─── New site audit mini card (chat bubble) ──────────────────────────────────
export function PostAuditChatCard() {
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <AuditGauge score={10} maxScore={10} size={48} strokeWidth={6} color="#10b981" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-emerald-500 font-extrabold text-sm leading-none">10</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            New Site Audit <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xs text-slate-600 space-y-0.5 mt-1">
            <div>Usability: <span className="font-bold text-emerald-600">98%</span></div>
            <div>Readability: <span className="font-bold text-emerald-600">96%</span></div>
            <div>Discoverability: <span className="font-bold text-emerald-600">94%</span></div>
          </div>
        </div>
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">
        Click to view details
      </div>
    </div>
  );
}

// ─── Current site audit — full canvas panel ──────────────────────────────────
export function AuditCanvas() {
  const metrics = [
    { label: 'Usability',       hint: 'Navigation & mobile experience',    value: 32, color: 'text-red-500',   barColor: 'bg-red-500'   },
    { label: 'Readability',     hint: 'How clearly content is presented',  value: 45, color: 'text-amber-500', barColor: 'bg-amber-500' },
    { label: 'Discoverability', hint: 'Visibility in search results',       value: 20, color: 'text-red-500',   barColor: 'bg-red-500'   },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-12 bg-white animate-in fade-in duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Site Audit</h2>
        <p className="text-slate-400 mt-1 text-sm font-medium">How visitors experience your site today</p>
      </div>

      <div className="relative">
        <AuditGauge score={4} maxScore={10} size={200} strokeWidth={20} color="#ef4444" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-6xl font-extrabold text-red-500 leading-none">4</span>
          <span className="text-slate-400 text-base font-medium">/10</span>
          <AlertCircle className="w-5 h-5 text-red-400 mt-1" />
        </div>
      </div>

      <div className="flex gap-8 w-full max-w-md">
        {metrics.map(m => (
          <div key={m.label} className="flex-1 space-y-2">
            <div className={cn('text-2xl font-extrabold', m.color)}>{m.value}%</div>
            <div className="text-xs text-slate-700 font-bold">{m.label}</div>
            <div className="text-[10px] text-slate-400 leading-tight">{m.hint}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full', m.barColor)} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {['Missing images & favicon', 'Invisible in Google SEO & Maps search', 'Outdated content & info'].map(tag => (
          <span key={tag} className="bg-red-50 border border-red-200 text-red-500 text-xs font-semibold px-4 py-2 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── New site audit — full canvas panel ─────────────────────────────────────
export function PostAuditCanvas() {
  const metrics = [
    { label: 'Usability',       value: 98, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { label: 'Readability',     value: 96, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
    { label: 'Discoverability', value: 94, color: 'text-emerald-600', barColor: 'bg-emerald-500' },
  ];
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-10 p-12 bg-white animate-in fade-in duration-700">
      <div className="text-center">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">New Site Audit</h2>
        <p className="text-slate-400 mt-1 text-sm font-medium">Web Performance Score</p>
      </div>

      <div className="relative">
        <AuditGauge score={10} maxScore={10} size={200} strokeWidth={20} color="#10b981" />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5">
          <span className="text-6xl font-extrabold text-emerald-500 leading-none">10</span>
          <span className="text-slate-400 text-base font-medium">/10</span>
          <CheckCircle className="w-5 h-5 text-emerald-400 mt-1" />
        </div>
      </div>

      <div className="flex gap-10 w-full max-w-sm">
        {metrics.map(m => (
          <div key={m.label} className="flex-1 space-y-2">
            <div className={cn('text-2xl font-extrabold', m.color)}>{m.value}%</div>
            <div className="text-xs text-slate-500 font-medium">{m.label}</div>
            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className={cn('h-full rounded-full transition-all duration-700', m.barColor)} style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {['Fully Optimized', 'WCAG Compliant', 'SEO Ready'].map(tag => (
          <span key={tag} className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold px-4 py-2 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── V2: Current site audit — chat bubble ────────────────────────────────────
export function AuditChatCardV2() {
  const cats = [
    { label: 'Perf', score: 38 },
    { label: 'A11y', score: 45 },
    { label: 'SEO',  score: 31 },
    { label: 'Best', score: 52 },
  ];
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-3 space-y-2.5 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <AuditGauge score={42} maxScore={100} size={52} strokeWidth={6} color="#ef4444" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-red-500 font-extrabold text-[13px] leading-none">42</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            Site Audit <AlertCircle className="w-3.5 h-3.5 text-red-500" />
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">oakwoodhigh.edu · 14 issues found</div>
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {cats.map(cat => {
          const c = scoreColor(cat.score);
          return (
            <span key={cat.label} className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', c.bg, c.border, c.text)}>
              {cat.label} {cat.score}
            </span>
          );
        })}
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Click to view details</div>
    </div>
  );
}

// ─── V2: New site audit — chat bubble ────────────────────────────────────────
export function PostAuditChatCardV2() {
  const cats = [
    { label: 'Perf', score: 98 },
    { label: 'A11y', score: 96 },
    { label: 'SEO',  score: 100 },
    { label: 'Best', score: 95 },
  ];
  return (
    <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 space-y-2.5 w-full">
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <AuditGauge score={97} maxScore={100} size={52} strokeWidth={6} color="#10b981" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-emerald-600 font-extrabold text-[13px] leading-none">97</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 font-bold text-sm text-slate-800">
            New Site Audit <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">oakwoodhigh.edu · All checks passed</div>
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        {cats.map(cat => {
          const c = scoreColor(cat.score);
          return (
            <span key={cat.label} className={cn('text-[10px] font-bold px-2 py-0.5 rounded-full border', c.bg, c.border, c.text)}>
              {cat.label} {cat.score}
            </span>
          );
        })}
      </div>
      <div className="text-xs font-bold text-blue-600 cursor-pointer hover:underline">Click to view details</div>
    </div>
  );
}

// ─── V2: Current site audit — full canvas ────────────────────────────────────
export function AuditCanvasV2() {
  const SCORE = 42;
  const c = scoreColor(SCORE);
  const categories = [
    { icon: <Zap className="w-3.5 h-3.5" />,       label: 'Performance',    score: 38, detail: 'LCP 8.4s · 4 render-blocking resources · Images unoptimized' },
    { icon: <Eye className="w-3.5 h-3.5" />,        label: 'Accessibility',  score: 45, detail: '23 images missing alt text · Low contrast ratio on 12 elements' },
    { icon: <Search className="w-3.5 h-3.5" />,     label: 'SEO',            score: 31, detail: 'No meta descriptions · Missing sitemap · Not indexed in Maps' },
    { icon: <ShieldCheck className="w-3.5 h-3.5" />,label: 'Best Practices', score: 52, detail: 'No HTTPS redirect · Outdated jQuery 1.x · 3 broken links' },
    { icon: <FileText className="w-3.5 h-3.5" />,   label: 'Content',        score: 40, detail: 'Events last updated 2023 · 6 staff photos missing · 4 dead pages' },
  ];
  const issues = [
    { sev: 'critical', text: 'Largest Contentful Paint: 8.4s (threshold: 2.5s)' },
    { sev: 'critical', text: '23 images missing alt text — accessibility failure' },
    { sev: 'critical', text: 'No meta descriptions on any page — invisible to search' },
    { sev: 'warning',  text: 'Content not updated since Oct 2023' },
  ];
  return (
    <div className="flex-1 flex flex-col gap-5 p-7 bg-white animate-in fade-in duration-700">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Site Audit Report</h2>
          <p className="text-slate-400 text-[11px] mt-0.5">oakwoodhigh.edu · April 2026</p>
        </div>
        <span className="bg-red-50 border border-red-200 text-red-500 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
          Needs Improvement
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <AuditGauge score={SCORE} maxScore={100} size={88} strokeWidth={9} color={c.hex} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-2xl font-extrabold leading-none', c.text)}>{SCORE}</span>
            <span className="text-slate-400 text-[10px]">/100</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-sm font-bold text-slate-700">Overall Score</div>
          <div className="flex gap-3 text-[11px]">
            <span className="text-red-500 font-bold">● 8 critical</span>
            <span className="text-orange-500 font-bold">● 6 warnings</span>
          </div>
          <div className="text-[10px] text-slate-400">Powered by Lighthouse · Apr 2026</div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category Scores</div>
        {categories.map(cat => <CategoryRow key={cat.label} {...cat} />)}
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Top Issues</div>
        <div className="space-y-1.5">
          {issues.map((issue, i) => (
            <div key={i} className="flex items-start gap-2">
              <AlertCircle className={cn('w-3.5 h-3.5 mt-0.5 shrink-0', issue.sev === 'critical' ? 'text-red-500' : 'text-orange-400')} />
              <span className="text-[11px] text-slate-600 leading-tight">{issue.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── V2: New site audit — full canvas ────────────────────────────────────────
export function PostAuditCanvasV2() {
  const SCORE = 97;
  const c = scoreColor(SCORE);
  const categories = [
    { icon: <Zap className="w-3.5 h-3.5" />,       label: 'Performance',    score: 98, detail: 'LCP 1.2s · No blocking resources · WebP images · CDN enabled' },
    { icon: <Eye className="w-3.5 h-3.5" />,        label: 'Accessibility',  score: 96, detail: 'All images have alt text · WCAG AA compliant · Keyboard nav' },
    { icon: <Search className="w-3.5 h-3.5" />,     label: 'SEO',            score: 100, detail: 'Meta descriptions on all pages · Sitemap submitted · Maps verified' },
    { icon: <ShieldCheck className="w-3.5 h-3.5" />,label: 'Best Practices', score: 95, detail: 'HTTPS enforced · Modern dependencies · 0 broken links' },
    { icon: <FileText className="w-3.5 h-3.5" />,   label: 'Content',        score: 97, detail: 'Events current · Full staff directory · All pages active' },
  ];
  const passed = [
    'Largest Contentful Paint: 1.2s (was 8.4s)',
    'All 23 images now have descriptive alt text',
    'Meta descriptions added to all 24 pages',
    'Content fully current as of April 2026',
  ];
  return (
    <div className="flex-1 flex flex-col gap-5 p-7 bg-white animate-in fade-in duration-700">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">New Site Audit Report</h2>
          <p className="text-slate-400 text-[11px] mt-0.5">oakwoodhigh.edu · April 2026</p>
        </div>
        <span className="bg-emerald-50 border border-emerald-200 text-emerald-600 text-[10px] font-bold px-2.5 py-1 rounded-full shrink-0">
          Excellent
        </span>
      </div>

      <div className="flex items-center gap-5">
        <div className="relative shrink-0">
          <AuditGauge score={SCORE} maxScore={100} size={88} strokeWidth={9} color={c.hex} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={cn('text-2xl font-extrabold leading-none', c.text)}>{SCORE}</span>
            <span className="text-slate-400 text-[10px]">/100</span>
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="text-sm font-bold text-slate-700">Overall Score</div>
          <div className="text-[11px] text-emerald-600 font-bold">● All checks passed</div>
          <div className="text-[10px] text-slate-400">Powered by Lighthouse · Apr 2026</div>
        </div>
      </div>

      <div className="space-y-2.5">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Category Scores</div>
        {categories.map(cat => <CategoryRow key={cat.label} {...cat} />)}
      </div>

      <div className="space-y-2">
        <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Key Improvements</div>
        <div className="space-y-1.5">
          {passed.map((item, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0 text-emerald-500" />
              <span className="text-[11px] text-slate-600 leading-tight">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Dev showcase page ───────────────────────────────────────────────────────
export function AuditPreviewPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-8 space-y-14">
      <div className="text-center">
        <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Audit Previews — Dev Showcase</h1>
        <p className="text-slate-500 text-sm mt-1">All components in <code className="bg-slate-200 px-1 rounded">AuditPreviews.tsx</code> · originals in <code className="bg-slate-200 px-1 rounded">AiWorkspaceView.tsx</code> untouched</p>
      </div>

      {/* ── V2 redesign (Lighthouse-style) ─────────────────────────────────── */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-700">V2 — Redesigned (Lighthouse-style)</h2>
          <span className="bg-indigo-100 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-full">NEW</span>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Chat bubble cards</p>
          <div className="flex gap-6 flex-wrap">
            <div className="w-72">
              <p className="text-[10px] text-slate-400 mb-1.5">42/100 — before migration</p>
              <AuditChatCardV2 />
            </div>
            <div className="w-72">
              <p className="text-[10px] text-slate-400 mb-1.5">97/100 — after migration</p>
              <PostAuditChatCardV2 />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Full canvas panels</p>
          <div className="flex gap-6 flex-wrap items-start">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ width: 480, minHeight: 540 }}>
              <div className="bg-slate-800 text-slate-400 text-[10px] font-mono px-4 py-2 shrink-0">AuditCanvasV2 — 42/100</div>
              <AuditCanvasV2 />
            </div>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ width: 480, minHeight: 540 }}>
              <div className="bg-slate-800 text-slate-400 text-[10px] font-mono px-4 py-2 shrink-0">PostAuditCanvasV2 — 97/100</div>
              <PostAuditCanvasV2 />
            </div>
          </div>
        </div>
      </section>

      {/* ── V1 original (for reference) ─────────────────────────────────────── */}
      <section className="space-y-4 opacity-50">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">V1 — Original (kept for reference)</h2>

        <div className="flex gap-6 flex-wrap">
          <div className="w-72">
            <p className="text-[10px] text-slate-400 mb-1.5">4/10 — before</p>
            <AuditChatCard />
          </div>
          <div className="w-72">
            <p className="text-[10px] text-slate-400 mb-1.5">10/10 — after</p>
            <PostAuditChatCard />
          </div>
        </div>

        <div className="flex gap-6 flex-wrap items-start">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ width: 480, minHeight: 520 }}>
            <div className="bg-slate-800 text-slate-400 text-[10px] font-mono px-4 py-2 shrink-0">AuditCanvas — 4/10</div>
            <AuditCanvas />
          </div>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col" style={{ width: 480, minHeight: 520 }}>
            <div className="bg-slate-800 text-slate-400 text-[10px] font-mono px-4 py-2 shrink-0">PostAuditCanvas — 10/10</div>
            <PostAuditCanvas />
          </div>
        </div>
      </section>
    </div>
  );
}
