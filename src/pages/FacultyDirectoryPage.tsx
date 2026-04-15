import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, GraduationCap, Mail, MapPin, Star } from 'lucide-react';
import { cn } from '../lib/utils';

interface NavProps { onNavigate: (page: string) => void; }

const TEACHERS = [
  {
    id: 'holloway',
    initials: 'JH',
    name: 'Mr. James Holloway',
    subject: '10th Grade History',
    dept: 'Humanities',
    room: 'Room 214',
    email: 'j.holloway@oakwood.edu',
    joined: 'Apr 2026',
    isNew: true,
    gradient: 'from-indigo-400 to-violet-500',
    bio: 'Specializes in modern American history and civic education. Former Fulbright scholar.',
  },
  {
    id: 'davis',
    initials: 'D',
    name: 'Mr. Davis',
    subject: 'Advanced Calculus',
    dept: 'Mathematics',
    room: 'Room 102',
    email: 'r.davis@oakwood.edu',
    joined: 'Sep 2019',
    isNew: false,
    gradient: 'from-emerald-400 to-teal-500',
    photo: '/teacher_davis.png',
    bio: 'AP Calculus BC instructor with a passion for mathematical proofs and competitive math.',
  },
  {
    id: 'johnson',
    initials: 'J',
    name: 'Ms. Johnson',
    subject: 'World History',
    dept: 'Humanities',
    room: 'Room 216',
    email: 's.johnson@oakwood.edu',
    joined: 'Sep 2021',
    isNew: false,
    gradient: 'from-rose-400 to-pink-500',
    photo: '/teacher_johnson.png',
    bio: 'Brings global perspectives to the classroom. Leads the Model UN club.',
  },
  {
    id: 'chen',
    initials: 'SC',
    name: 'Ms. S. Chen',
    subject: 'AP Biology',
    dept: 'Science',
    room: 'Room 308',
    email: 's.chen@oakwood.edu',
    joined: 'Sep 2022',
    isNew: false,
    gradient: 'from-cyan-400 to-blue-500',
    bio: 'PhD in molecular biology. Runs the school\'s STEM research program.',
  },
  {
    id: 'patel',
    initials: 'RP',
    name: 'Mr. R. Patel',
    subject: 'Physics',
    dept: 'Science',
    room: 'Room 311',
    email: 'r.patel@oakwood.edu',
    joined: 'Sep 2020',
    isNew: false,
    gradient: 'from-amber-400 to-orange-500',
    bio: 'Former aerospace engineer turned educator. Coaches the robotics team.',
  },
  {
    id: 'moore',
    initials: 'LM',
    name: 'Ms. L. Moore',
    subject: 'English Literature',
    dept: 'English',
    room: 'Room 118',
    email: 'l.moore@oakwood.edu',
    joined: 'Sep 2018',
    isNew: false,
    gradient: 'from-purple-400 to-fuchsia-500',
    bio: 'Published poet and creative writing coach. Leads the literary magazine.',
  },
];

const DEPT_FILTERS = ['All', 'Humanities', 'Mathematics', 'Science', 'English'];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, duration: 0.4 } }),
};

export function FacultyDirectoryPage({ onNavigate }: NavProps) {
  const [search, setSearch] = useState('');
  const [dept, setDept] = useState('All');

  const filtered = TEACHERS.filter(t =>
    (dept === 'All' || t.dept === dept) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 font-sans">

      {/* ── Dot-grid background ─────────────────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-5 max-w-7xl mx-auto">
        <div
          className="flex items-center gap-2 font-bold text-xl tracking-tight cursor-pointer"
          onClick={() => onNavigate('home')}
        >
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm font-black shadow-md shadow-indigo-600/30">O</div>
          Oakwood High
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-500">
          <span className="cursor-pointer hover:text-slate-900 transition-colors" onClick={() => onNavigate('home')}>Home</span>
          <span className="cursor-pointer hover:text-slate-900 transition-colors">Academics</span>
          <span className="cursor-pointer hover:text-slate-900 transition-colors">Athletics</span>
          <span className="text-indigo-600 border-b-2 border-indigo-600 pb-0.5 cursor-pointer">Directory</span>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-700 transition-all shadow-lg shadow-slate-900/20">
          Parent Portal
        </button>
      </nav>

      {/* ── Page header ─────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pt-12 pb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-5">
            <span className="cursor-pointer hover:text-indigo-600 transition-colors" onClick={() => onNavigate('home')}>Home</span>
            <ArrowRight className="w-3 h-3" />
            <span className="text-slate-700">Faculty Directory</span>
          </div>

          {/* Title with gradient */}
          <div className="flex items-end justify-between flex-wrap gap-4 mb-2">
            <h1 className="text-5xl font-extrabold tracking-tight">
              Faculty{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%)' }}
              >
                Directory
              </span>
            </h1>
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-700">1 new profile this week</span>
            </div>
          </div>
          <p className="text-slate-500 text-base mt-1">Oakwood High School · 2025–2026 Academic Year</p>

          {/* Stats row */}
          <div className="flex gap-6 mt-8">
            {[
              { label: 'Faculty Members', value: '48' },
              { label: 'Departments', value: '9' },
              { label: 'Avg. Experience', value: '11 yrs' },
            ].map(s => (
              <div key={s.label} className="bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
                <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Filters + Search ────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">

          {/* Dept filter pills */}
          <div className="flex gap-2 flex-wrap">
            {DEPT_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setDept(f)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-semibold border transition-all',
                  dept === f
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                )}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-full focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all w-52 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* ── Faculty Grid ────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((teacher, i) => (
            <motion.div
              key={teacher.id}
              custom={i}
              initial="hidden"
              animate="show"
              variants={fadeUp}
            >
              <TeacherCard teacher={teacher} />
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <GraduationCap className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="font-semibold">No faculty found</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Teacher Card ────────────────────────────────────────────────────────────
function TeacherCard({ teacher }: { teacher: typeof TEACHERS[0] }) {
  return (
    <div
      className={cn(
        'group relative bg-white rounded-3xl border overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/10',
        teacher.isNew
          ? 'border-indigo-300 shadow-lg shadow-indigo-500/10'
          : 'border-slate-200 shadow-sm'
      )}
    >
      {/* Border beam on new teacher */}
      {teacher.isNew && (
        <div className="absolute inset-0 rounded-3xl pointer-events-none z-10 overflow-hidden">
          <div
            className="absolute inset-[-2px] rounded-3xl"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)',
              backgroundSize: '300% 300%',
              animation: 'borderBeam 3s linear infinite',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
            }}
          />
        </div>
      )}

      {/* Card top gradient strip */}
      <div className={cn('h-24 bg-gradient-to-br relative', teacher.gradient)}>
        {teacher.isNew && (
          <div className="absolute top-3 right-3 bg-white text-indigo-600 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Star className="w-3 h-3 fill-current" /> New
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="px-6 pb-6 -mt-10 relative z-20">
        <div className="mb-4">
          {teacher.photo ? (
            <img
              src={teacher.photo}
              alt={teacher.name}
              className="w-20 h-20 rounded-2xl object-cover border-4 border-white shadow-lg"
              onError={e => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <div className={cn('w-20 h-20 rounded-2xl bg-gradient-to-br border-4 border-white shadow-lg flex items-center justify-center font-black text-white text-2xl', teacher.gradient)}>
              {teacher.initials}
            </div>
          )}
        </div>

        <h3 className="text-base font-extrabold text-slate-900 leading-tight">{teacher.name}</h3>
        <p className={cn('text-xs font-bold mt-1 inline-block px-2.5 py-1 rounded-full', teacher.isNew ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-100 text-slate-600')}>
          {teacher.subject}
        </p>

        <p className="text-xs text-slate-500 mt-3 leading-relaxed line-clamp-2">{teacher.bio}</p>

        <div className="mt-4 space-y-1.5">
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <MapPin className="w-3 h-3 shrink-0" /> {teacher.room}
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <Mail className="w-3 h-3 shrink-0" /> {teacher.email}
          </div>
        </div>

        {teacher.isNew && (
          <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-xl px-3 py-2 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse shrink-0" />
            <span className="text-[10px] font-bold text-indigo-600">Profile auto-published via PowerSchool sync</span>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Border beam keyframe (injected once) ────────────────────────────────────
const styleTag = document.createElement('style');
styleTag.textContent = `
  @keyframes borderBeam {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;
document.head.appendChild(styleTag);
