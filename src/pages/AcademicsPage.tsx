import { BookOpen, ArrowRight, GraduationCap, FlaskConical, Globe, Music, Calculator, Atom, FileText, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function AcademicsPage() {
  return (
    <div className="relative pb-32">

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 mt-8">
        <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200/60 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
          <div className="relative h-[520px] rounded-[2rem] overflow-hidden flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-indigo-900/20 z-10" />
            <img
              src={`${import.meta.env.BASE_URL}school_hero.png`}
              alt="Oakwood Campus"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg text-white text-sm font-bold"
              >
                <Award className="w-4 h-4 text-amber-400" />
                <span>12 AP Courses — Top 5% State Rankings 2026</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-xl"
              >
                Academics at <br /> Oakwood High.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md"
              >
                Rigorous curricula, dedicated faculty, and a culture that challenges every student to reach their potential.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2 mx-auto"
              >
                Browse Courses <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[
            { value: '12', label: 'AP Courses Offered' },
            { value: '94%', label: 'Graduation Rate' },
            { value: '3.8', label: 'Average GPA' },
            { value: '48', label: 'Qualified Teachers' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center justify-center py-8 px-4 text-center"
            >
              <div className="text-4xl font-extrabold tracking-tight text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-slate-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Departments Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Departments</h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
            Full Course Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { icon: Calculator, label: 'Mathematics', courses: '8 courses · AP Calculus, Statistics' },
            { icon: FlaskConical, label: 'Science', courses: '7 courses · AP Biology, Chemistry' },
            { icon: Globe, label: 'Social Studies', courses: '6 courses · AP History, Geography' },
            { icon: BookOpen, label: 'English & Literature', courses: '6 courses · AP Language, Literature' },
            { icon: Atom, label: 'STEM & Technology', courses: '5 courses · AP CS, Robotics' },
            { icon: Music, label: 'Arts & Electives', courses: '10 courses · Drama, Band, Visual Art' },
          ].map((dept, i) => (
            <motion.div
              key={dept.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <BentoCard className="bg-white p-7 group cursor-pointer h-full">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110">
                  <dept.icon className="w-6 h-6" />
                </div>
                <div className="font-extrabold text-lg text-slate-900 mb-1">{dept.label}</div>
                <div className="text-sm text-slate-500 font-medium">{dept.courses}</div>
                <div className="mt-5 text-sm font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View courses <ArrowRight className="w-4 h-4" />
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AP Program + Resources */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* AP Program */}
        <BentoCard className="bg-white p-8 group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Advanced Placement Program</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-7">
            Oakwood offers 12 College Board-approved AP courses. Our students consistently outperform state averages on AP exams.
          </p>
          <div className="space-y-3">
            {[
              { subject: 'AP Calculus AB/BC', score: '4.2 avg score', tag: 'Mathematics' },
              { subject: 'AP Biology', score: '4.0 avg score', tag: 'Science' },
              { subject: 'AP US History', score: '3.9 avg score', tag: 'Social Studies' },
              { subject: 'AP Computer Science', score: '4.4 avg score', tag: 'STEM' },
            ].map(course => (
              <div key={course.subject} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 hover:shadow-md transition-shadow cursor-pointer group/item">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{course.subject}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{course.score}</div>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{course.tag}</span>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Academic Resources — dark card */}
        <BentoCard className="bg-slate-900 text-white p-10 flex flex-col justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(79,70,229,0.2)_0%,_transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-3">Academic Resources</h3>
            <p className="text-slate-400 text-base max-w-sm mb-8">
              All course guides, syllabi, and academic calendars synced automatically from Google Workspace.
            </p>
          </div>
          <div className="relative z-10 space-y-4">
            {[
              { title: '2025–26 Course Selection Guide', sub: 'Updated April 2026 via Drive Sync', isNew: true },
              { title: 'Academic Calendar 2025–26', sub: 'Synced from Google Workspace', isNew: false },
              { title: 'AP Exam Prep Schedule', sub: 'Released by College Board', isNew: false },
            ].map(resource => (
              <div
                key={resource.title}
                className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer flex justify-between items-center group/item shadow-xl"
              >
                <div>
                  <div className="font-bold text-base text-white flex items-center gap-2">
                    {resource.title}
                    {resource.isNew && (
                      <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">New</span>
                    )}
                  </div>
                  <div className="text-sm text-indigo-300 mt-1">{resource.sub}</div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover/item:text-white group-hover/item:translate-x-1 transition-all duration-300" />
              </div>
            ))}
          </div>
        </BentoCard>
      </section>

    </div>
  );
}

function BentoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('border border-slate-200/60 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all overflow-hidden relative', className)}>
      {children}
    </div>
  );
}
