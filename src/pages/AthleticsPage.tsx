import { ArrowRight, Trophy, Users, Calendar, Medal, Timer, MapPin, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export function AthleticsPage() {
  return (
    <div className="relative pb-32">

      {/* Hero */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 mt-8">
        <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200/60 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
          <div className="relative h-[520px] rounded-[2rem] overflow-hidden flex items-center justify-center text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-slate-800/10 z-10" />
            <img
              src={`${import.meta.env.BASE_URL}school_hero.png`}
              alt="Oakwood Athletics"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="relative z-20 max-w-4xl mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg text-white text-sm font-bold"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>State Champions — Varsity Soccer 2026</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-xl"
              >
                Compete. <br /> Win. Grow.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md"
              >
                18 varsity sports, championship-level coaching, and a tradition of excellence on and off the field.
              </motion.p>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2 mx-auto"
              >
                View All Sports <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="bg-white rounded-[2rem] border border-slate-200/60 shadow-sm grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
          {[
            { value: '18', label: 'Varsity Sports' },
            { value: '23×', label: 'State Championships' },
            { value: '400+', label: 'Student Athletes' },
            { value: '96%', label: 'Seniors Play in College' },
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

      {/* Sports Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Our Sports</h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">
            Full Schedule <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {[
            { emoji: '⚽', label: 'Soccer', season: 'Fall · Varsity & JV', tag: 'State Champions', tagColor: 'bg-slate-100 text-slate-500' },
            { emoji: '🏀', label: 'Basketball', season: 'Winter · Varsity & JV', tag: 'Regional Finalists', tagColor: 'bg-slate-100 text-slate-500' },
            { emoji: '🏊', label: 'Swimming', season: 'Winter · Varsity', tag: 'Conference Champions', tagColor: 'bg-slate-100 text-slate-500' },
            { emoji: '🎾', label: 'Tennis', season: 'Spring · Varsity', tag: 'Top 10 State', tagColor: 'bg-slate-100 text-slate-500' },
            { emoji: '🏃', label: 'Track & Field', season: 'Spring · Varsity & JV', tag: '6 State Qualifiers', tagColor: 'bg-slate-100 text-slate-500' },
            { emoji: '⚾', label: 'Baseball / Softball', season: 'Spring · Varsity', tag: 'District Champions', tagColor: 'bg-slate-100 text-slate-500' },
          ].map((sport, i) => (
            <motion.div
              key={sport.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <BentoCard className="bg-white p-7 group cursor-pointer h-full">
                <div className="text-4xl mb-5">{sport.emoji}</div>
                <div className="font-extrabold text-lg text-slate-900 mb-1">{sport.label}</div>
                <div className="text-sm text-slate-500 font-medium mb-4">{sport.season}</div>
                <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full', sport.tagColor)}>{sport.tag}</span>
                <div className="mt-5 text-sm font-bold text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  View roster <ArrowRight className="w-4 h-4" />
                </div>
              </BentoCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Upcoming Events + Resources */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Upcoming Games */}
        <BentoCard className="bg-white p-8 group">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Upcoming Games</h3>
          <p className="text-slate-500 text-sm leading-relaxed mb-7">
            Schedule synced automatically from the athletics calendar.
          </p>
          <div className="space-y-3">
            {[
              { sport: 'Varsity Soccer', detail: 'vs. Riverside High', date: 'Apr 18', location: 'Home · Main Field', color: 'text-slate-500 bg-slate-100' },
              { sport: 'Boys Basketball', detail: 'vs. Lincoln Academy', date: 'Apr 21', location: 'Away · Lincoln Gym', color: 'text-slate-500 bg-slate-100' },
              { sport: 'Girls Tennis', detail: 'District Semifinals', date: 'Apr 24', location: 'Home · Courts 1–4', color: 'text-slate-500 bg-slate-100' },
              { sport: 'Track & Field', detail: 'Spring Invitational', date: 'Apr 26', location: 'Away · City Stadium', color: 'text-slate-500 bg-slate-100' },
            ].map(game => (
              <div key={game.sport + game.date} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className={cn('text-xs font-bold px-2.5 py-1 rounded-full whitespace-nowrap', game.color)}>{game.date}</span>
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{game.sport}</div>
                    <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" />{game.location}
                    </div>
                  </div>
                </div>
                <div className="text-xs font-semibold text-slate-400 text-right hidden sm:block">{game.detail}</div>
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Athletics Resources — dark card */}
        <BentoCard className="bg-slate-900 text-white p-10 flex flex-col justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(79,70,229,0.2)_0%,_transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-3">Athletics Resources</h3>
            <p className="text-slate-400 text-base max-w-sm mb-8">
              Eligibility forms, schedules, and coaching contacts — all kept up to date automatically.
            </p>
          </div>
          <div className="relative z-10 space-y-4">
            {[
              { title: 'Athletic Eligibility Form 2026', sub: 'Updated April 2026 via Drive Sync', isNew: true },
              { title: 'Spring Season Schedule', sub: 'Synced from Athletics Calendar', isNew: false },
              { title: 'Physical Exam Requirements', sub: 'Required before first practice', isNew: false },
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
