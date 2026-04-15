import { Trophy, FileText, ArrowRight, GraduationCap, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../lib/utils';
import { AcademicsPage } from './AcademicsPage';
import { AthleticsPage } from './AthleticsPage';
import { TeamPage } from './TeamPage';
import { BLOG_POSTS, HOLLOWAY, type PendingChanges } from '../data/schoolData';

interface Props {
  previewType?: string;
  showAfter?: boolean;
  userLocationValue?: string;
  onNavigate?: (page: string) => void;
  pendingChanges?: PendingChanges;
  onApprove?: (type: 'teacher' | 'blogPost') => void;
  onReject?: (type: 'teacher' | 'blogPost') => void;
}

export function SchoolAfterMagic({ previewType, showAfter, userLocationValue, onNavigate, pendingChanges, onApprove, onReject }: Props) {
  // new_teacher preview opens directly on the team page
  const [currentPage, setCurrentPage] = useState<'home' | 'academics' | 'athletics' | 'team'>(
    previewType === 'new_teacher' ? 'team' : 'home'
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden relative pb-32">
      
      {/* Magic UI Subtle Radial Background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_#ffffff_0%,_#f1f5f9_100%)]" />

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-md bg-white/30 rounded-full mt-4 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-600/20">O</div>
          Oakwood High
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-slate-600">
          <span
            className={cn('cursor-pointer transition-colors', currentPage === 'home' ? 'text-slate-900' : 'hover:text-indigo-600')}
            onClick={() => setCurrentPage('home')}
          >Home</span>
          <span
            className={cn('cursor-pointer transition-colors', currentPage === 'academics' ? 'text-slate-900' : 'hover:text-indigo-600')}
            onClick={() => setCurrentPage('academics')}
          >Academics</span>
          <span
            className={cn('cursor-pointer transition-colors', currentPage === 'athletics' ? 'text-slate-900' : 'hover:text-indigo-600')}
            onClick={() => setCurrentPage('athletics')}
          >Athletics</span>
          <span
            className={cn('cursor-pointer transition-colors', currentPage === 'team' ? 'text-slate-900' : 'hover:text-indigo-600')}
            onClick={() => setCurrentPage('team')}
          >Team</span>
        </div>
        <button className="bg-slate-900 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20">
          Parent Portal
        </button>
      </nav>

      {/* ── Home page content ───────────────────────────────────────── */}
      {currentPage === 'home' && (<>

      {/* Quick Links Widget (Web Admin Action) */}
      {(previewType === 'quick_links' && showAfter) && (
        <motion.div 
          initial={{ opacity: 0, height: 0, scale: 0.95 }}
          animate={{ opacity: 1, height: 'auto', scale: 1 }}
          className="relative z-50 max-w-7xl mx-auto px-8 mt-6"
        >
          <div className="bg-indigo-600 text-white shadow-2xl rounded-[2rem] flex flex-wrap items-center justify-center gap-8 py-5 border-4 border-indigo-200">
            <div className="font-bold text-sm tracking-widest uppercase opacity-80">Quick Links:</div>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-5 py-2 rounded-full text-sm font-semibold border border-white/20">Parent Portal</button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-5 py-2 rounded-full text-sm font-semibold border border-white/20">Lunch Menus</button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-5 py-2 rounded-full text-sm font-semibold border border-white/20">Athletics Calendar</button>
          </div>
        </motion.div>
      )}

      {/* High Fidelity Hero Section with Integrated Image */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-20 mt-8">
        <div className="bg-white rounded-[2.5rem] p-4 border border-slate-200/60 shadow-2xl shadow-indigo-900/5 relative overflow-hidden">
          
          <div className="relative h-[600px] rounded-[2rem] overflow-hidden flex items-center justify-center text-center">
            {/* Dark Gradient Overlay for text readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent z-10" />
            <img src={`${import.meta.env.BASE_URL}school_hero.png`} alt="Oakwood Campus" className="absolute inset-0 w-full h-full object-cover" />
            
            <div className="relative z-20 max-w-4xl mx-auto px-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl shadow-lg text-white text-sm font-bold cursor-pointer hover:bg-white/20 transition-colors"
              >
                <Trophy className="w-4 h-4 text-amber-400 drop-shadow-md" />
                <span>Varsity Soccer Championship Date Announced!</span>
                <ArrowRight className="w-3.5 h-3.5 text-white/70" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 drop-shadow-xl"
              >
                Excellence in <br/> Every Student.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-medium drop-shadow-md"
              >
                A community dedicated to academic rigor, athletic excellence, and personal growth. 
              </motion.p>

              <motion.button 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2 mx-auto"
              >
                Discover Oakwood <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </main>

      {/* Featured Faculty & Essential Resources Grid */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 mb-24 grid grid-cols-1 md:grid-cols-2 gap-8">
          
        {/* Faculty Feature (Action 1: Auto SIS Sync) */}
        <BentoCard className="bg-white p-8 group">
          <div className="flex items-center justify-between mb-8">
             <div>
               <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                 <GraduationCap className="w-6 h-6" />
               </div>
               <h3 className="text-2xl font-bold text-slate-900">Featured Faculty</h3>
             </div>
             <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">View Directory <ArrowRight className="w-4 h-4" /></button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
               <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Mr. Davis" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-sm mb-3" />
               <div className="font-bold text-slate-900">Mr. Davis</div>
               <div className="text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded-full mt-2">Advanced Calculus</div>
            </div>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:shadow-md transition-shadow">
               <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Ms. Johnson" className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-sm mb-3" />
               <div className="font-bold text-slate-900">Ms. Johnson</div>
               <div className="text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2 py-1 rounded-full mt-2">World History</div>
            </div>
          </div>
        </BentoCard>

        {/* Essential Resources (Action 2: Auto Drive Sync) */}
        <BentoCard className="bg-slate-900 text-white p-10 flex flex-col justify-center group overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,_rgba(79,70,229,0.2)_0%,_transparent_60%)] pointer-events-none" />
          
          <div className="relative z-10">
             <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-extrabold text-white mb-3">Essential Resources</h3>
            <p className="text-slate-400 text-base max-w-sm mb-8">Direct integrations with Google Workspace keep our documents updated automatically.</p>
          </div>

          <div className="relative z-10 space-y-4">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/10 hover:bg-white/20 transition-colors cursor-pointer flex justify-between items-center group/item shadow-2xl">
               <div>
                 <div className="font-bold text-lg text-white flex items-center gap-2">Parent Handbook 2026 <span className="bg-indigo-500 text-xs px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">New</span></div>
                 <div className="text-sm text-indigo-300 mt-1">Updated recently via Drive Sync</div>
               </div>
               <ArrowRight className="w-5 h-5 text-slate-400 group-hover/item:text-white transition-colors group-hover/item:translate-x-1 duration-300" />
            </div>
          </div>
        </BentoCard>
      </section>

      {/* Blog Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Latest News & Blogs</h2>
          <button className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1">Browse All Posts <ArrowRight className="w-4 h-4" /></button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Pending blog post — shown first with review overlay */}
          {pendingChanges?.newBlogPost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="absolute -top-3 left-4 right-4 z-20 flex items-center justify-between bg-amber-400 text-amber-900 text-xs font-extrabold px-4 py-2 rounded-full shadow-lg">
                <span>⏳ Pending Review</span>
                <div className="flex items-center gap-2">
                  <button onClick={() => onApprove?.('blogPost')} className="flex items-center gap-1 bg-emerald-600 text-white px-3 py-1 rounded-full hover:bg-emerald-500 transition-colors">
                    <Check className="w-3 h-3" /> Approve
                  </button>
                  <button onClick={() => onReject?.('blogPost')} className="flex items-center gap-1 bg-white/60 text-amber-900 px-3 py-1 rounded-full hover:bg-white transition-colors">
                    <X className="w-3 h-3" /> Reject
                  </button>
                </div>
              </div>
              <BentoCard className="group cursor-pointer p-0 bg-white ring-2 ring-amber-400 ring-offset-2 mt-3">
                <div className="h-64 overflow-hidden relative bg-slate-100 flex items-center justify-center">
                  {pendingChanges.newBlogPost.image
                    ? <img src={pendingChanges.newBlogPost.image} alt={pendingChanges.newBlogPost.title} className="w-full h-full object-cover" />
                    : <span className="text-slate-400 font-bold">No image provided</span>
                  }
                  <div className="absolute top-4 left-4 bg-amber-400 text-amber-900 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-10">{pendingChanges.newBlogPost.category}</div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-3">{pendingChanges.newBlogPost.title}</h3>
                  <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">{pendingChanges.newBlogPost.excerpt}</p>
                  <div className="text-sm font-bold text-indigo-600 flex items-center gap-2">Read Full Article <ArrowRight className="w-4 h-4" /></div>
                </div>
              </BentoCard>
            </motion.div>
          )}

          {/* Existing posts from schoolData — highlighted post always shown first (left) */}
          {[...BLOG_POSTS].sort((a, b) => {
            if (previewType === 'science_fair_blog' && showAfter) {
              if (a.id === 'science-fair') return -1;
              if (b.id === 'science-fair') return 1;
            }
            return 0;
          }).map(post => (
            <BentoCard key={post.id} className={cn(
              'group cursor-pointer p-0 bg-white',
              previewType === 'science_fair_blog' && post.id === 'science-fair' && showAfter
                ? 'ring-4 ring-emerald-500 shadow-2xl shadow-emerald-500/20 scale-[1.03] z-10 transition-all duration-700'
                : ''
            )}>
              <div className="h-64 overflow-hidden relative">
                {previewType === 'science_fair_blog' && post.id === 'science-fair' && showAfter && (
                  <div className="absolute inset-0 bg-emerald-500/10 z-10 pointer-events-none mix-blend-overlay" />
                )}
                <img
                  src={`${import.meta.env.BASE_URL}${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className={cn(
                  'absolute top-4 left-4 backdrop-blur-sm text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full z-20',
                  previewType === 'science_fair_blog' && post.id === 'science-fair' && showAfter
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/90 text-slate-600'
                )}>
                  {previewType === 'science_fair_blog' && post.id === 'science-fair' && showAfter ? 'New Post' : post.category}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">{post.excerpt}</p>
                <div className="text-sm font-bold text-indigo-600 flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                  Read Full Article <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </BentoCard>
          ))}

        </div>
      </section>

      </>)}

      {/* ── Academics Page ───────────────────────────────────────────── */}
      {currentPage === 'academics' && <AcademicsPage />}

      {/* ── Athletics Page ───────────────────────────────────────────── */}
      {currentPage === 'athletics' && <AthleticsPage />}

      {/* ── Team Page ────────────────────────────────────────────────── */}
      {currentPage === 'team' && (
        <TeamPage
          pendingTeacher={previewType !== 'new_teacher' ? pendingChanges?.newTeacher : undefined}
          autoAddedTeacher={previewType === 'new_teacher' && showAfter ? HOLLOWAY : undefined}
          onApprove={onApprove}
          onReject={onReject}
        />
      )}

    </div>
  );
}

function BentoCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("border border-slate-200/60 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-900/5 transition-all overflow-hidden relative", className)}>
      {children}
    </div>
  );
}
