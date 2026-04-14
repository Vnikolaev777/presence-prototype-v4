import { motion } from 'framer-motion';
import { BookOpen, Calendar, ChevronRight, Trophy, Users, FileText, ArrowRight } from 'lucide-react';

export function SchoolAfter() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30">
      
      {/* Top Banner (Action 4: Sports Update) */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-3 text-center text-sm font-bold flex items-center justify-center gap-3">
        <Trophy className="w-4 h-4 text-yellow-300" />
        Varsity Soccer Championship Date Announced! Join us this Friday at the main stadium!
        <button className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs transition-colors backdrop-blur-sm">View Details</button>
      </div>

      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-600/20">
              O
            </div>
            <div>
              <h1 className="font-bold text-xl tracking-tight text-slate-900">Oakwood High</h1>
              <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">Inspiring Excellence</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-bold text-indigo-600">Home</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">About</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Academics</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Athletics</a>
            <a href="#" className="text-sm font-semibold text-slate-600 hover:text-indigo-600 transition-colors">Directory</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 bg-blue-50/50" />
        <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-indigo-100/50 to-transparent" />
        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
              Empowering the next generation of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">innovators and leaders.</span>
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl leading-relaxed">
              Welcome to a community dedicated to academic rigor, athletic excellence, and personal growth. Our doors are open to your success.
            </p>
            <div className="flex gap-4">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/20 transition-all flex items-center gap-2">
                Apply Now <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3 rounded-xl font-bold shadow-sm transition-all">
                Virtual Tour
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-4 w-full md:w-auto shrink-0">
            <div className="bg-white/80 backdrop-blur border border-slate-200 p-6 rounded-2xl shadow-sm">
              <Users className="w-6 h-6 text-blue-500 mb-3" />
              <div className="text-3xl font-black text-slate-900 mb-1">1,200+</div>
              <div className="text-sm font-medium text-slate-500">Students Enrolled</div>
            </div>
            <div className="bg-white/80 backdrop-blur border border-slate-200 p-6 rounded-2xl shadow-sm">
              <BookOpen className="w-6 h-6 text-indigo-500 mb-3" />
              <div className="text-3xl font-black text-slate-900 mb-1">15:1</div>
              <div className="text-sm font-medium text-slate-500">Student/Teacher Ratio</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Areas */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* News & Blog (Action 3: Blog Suggestion Approved) */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-900">Latest News & Blogs</h3>
            <a href="#" className="text-sm font-bold text-indigo-600 hover:underline flex items-center gap-1">View All <ChevronRight className="w-4 h-4" /></a>
          </div>

          <div className="grid gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
              <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
                <span className="w-2 h-2 rounded-full bg-indigo-500" /> Academics
              </div>
              <h4 className="text-2xl font-extrabold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Join the Statewide Math Olympiad!</h4>
              <p className="text-slate-600 leading-relaxed max-w-3xl mb-4">
                The Ministry of Education has just announced the dates for the upcoming Annual Math Olympiad. We strongly encourage our advanced mathematics students to sign up early. Registration details can be found in the main office or on the district portal.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-600 mt-4">Read Full Story <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></div>
            </motion.div>

            <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm flex gap-6 items-center">
              <div className="w-24 h-24 bg-slate-100 rounded-xl flex items-center justify-center shrink-0">
                <Calendar className="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Welcome Back Assembly</h4>
                <p className="text-sm text-slate-600 line-clamp-2">Join us in the auditorium next Monday as we kick off a spectacular new semester with performances by the marching band.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info (Actions 1 & 2: Auto SIS / Drive Sync) */}
        <div className="space-y-8">
          
          {/* Quick Resources (Action 2: Auto Drive Sync) */}
          <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="absolute right-[-10%] top-[-10%] w-32 h-32 bg-blue-500/20 blur-2xl rounded-full" />
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-400" /> Essential Resources
            </h3>
            <ul className="space-y-4 relative z-10">
              <li>
                <a href="#" className="flex items-center justify-between group p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors">
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors">Parent Handbook 2026</div>
                    <div className="text-xs text-slate-400 mt-0.5">Updated recently</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center justify-between group p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors">
                  <div className="font-semibold text-sm text-slate-300 group-hover:text-white transition-colors">Academic Calendar</div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </a>
              </li>
            </ul>
          </div>

          {/* Directory Snippet (Action 1: Auto SIS Sync) */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
             <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
               <Users className="w-5 h-5 text-indigo-500" /> Featured Faculty
             </h3>
             <div className="space-y-4">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">MD</div>
                 <div>
                   <div className="font-bold text-slate-900">Mr. Davis</div>
                   <div className="text-sm font-medium text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded border border-emerald-100 mt-1">Advanced Calculus</div>
                 </div>
               </div>
               <div className="flex items-center gap-4 border-t border-slate-100 pt-4">
                 <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">EJ</div>
                 <div>
                   <div className="font-bold text-slate-900">Ms. Johnson</div>
                   <div className="text-sm font-medium text-slate-500 mt-1">World History</div>
                 </div>
               </div>
             </div>
             <button className="w-full mt-6 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 transition-colors">
               View Full Directory
             </button>
          </div>

        </div>

      </div>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm font-medium">
          &copy; {new Date().getFullYear()} Oakwood High School. Seamlessly powered by AI.
        </div>
      </footer>
    </div>
  );
}
