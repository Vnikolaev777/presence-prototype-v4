import { motion } from 'framer-motion';

interface Props {
  previewType: 'calendar' | 'news' | 'banner' | 'blog' | 'document' | 'quick_links' | 'science_fair_blog' | string;
  showAfter: boolean;
  userLocationValue?: string;
}

export function SchoolWebsitePreview({ previewType, showAfter, userLocationValue }: Props) {
  return (
    <div className="w-full h-full bg-slate-50 overflow-hidden flex flex-col font-sans border-l border-slate-200">
      
      {/* Fake Browser Toolbar */}
      <div className="h-10 border-b border-slate-200 bg-slate-100 flex items-center px-4 gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
          <div className="w-3 h-3 rounded-full bg-slate-300" />
        </div>
        <div className="ml-4 bg-white border border-slate-200 rounded-md h-6 flex-1 max-w-sm flex items-center px-3">
          <span className="text-xs text-slate-400">https://www.highschool.edu/</span>
        </div>
      </div>

      {/* Actual Website Frame */}
      <div className="flex-1 overflow-y-auto relative scroll-smooth bg-white">
        
        {/* Header */}
        <header className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <div className="font-bold text-xl tracking-tight text-slate-800">
            Oakwood High <span className="text-slate-400 font-light">School</span>
          </div>
          <nav className="hidden sm:flex gap-4 text-sm font-semibold text-slate-500">
            <a href="#" className="hover:text-blue-600">Home</a>
            <a href="#" className="hover:text-blue-600">Academics</a>
            <a href="#" className="hover:text-blue-600">Athletics</a>
            <a href="#" className="hover:text-blue-600">Calendar</a>
          </nav>
        </header>

        {/* Hero Section */}
        <div className="relative h-64 bg-slate-200 flex items-center justify-center overflow-hidden">
          {/* Subtle gradient instead of an image for neutrality */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-800 opacity-90" />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-4xl font-extrabold mb-2 tracking-tight">Empowering Excellence</h1>
            <p className="text-lg opacity-80 max-w-lg mx-auto leading-tight">Join a community dedicated to academic growth and athletic prowess.</p>
          </div>
        </div>

        {/* Quick Links Widget (Web Admin Action) */}
        {(previewType === 'quick_links' && showAfter) && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="bg-blue-600 text-white shadow-inner flex items-center justify-center gap-8 py-3"
          >
            <div className="font-bold text-sm tracking-widest uppercase opacity-80">Quick Links:</div>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20">Parent Portal</button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20">Lunch Menus</button>
            <button className="bg-white/10 hover:bg-white/20 transition-colors px-4 py-1.5 rounded-full text-sm font-semibold border border-white/20">Athletics Calendar</button>
          </motion.div>
        )}

        {/* Main Content Sections */}
        <div className="p-6 max-w-5xl mx-auto space-y-12">
          
          {/* Calendar Section (Action 1) */}
          <section>
            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 text-slate-800">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <EventCard date="Nov 15" title="Fall Play" />
              
              <motion.div
                animate={{
                  backgroundColor: (previewType === 'calendar' && showAfter) ? '#dcfce7' : '#f8fafc',
                  borderColor: (previewType === 'calendar' && showAfter) ? '#22c55e' : '#e2e8f0',
                  scale: (previewType === 'calendar' && showAfter) ? [1, 1.05, 1] : 1
                }}
                transition={{ duration: 0.5 }}
                className="border rounded-lg p-4"
              >
                <div className="font-bold text-blue-600 mb-1">
                  {(previewType === 'calendar' && showAfter) ? 'Dec 18 - Jan 4' : 'Dec 21 - Jan 7'}
                </div>
                <div className="font-semibold text-slate-800">Winter Break</div>
                <div className="text-sm text-slate-500 mt-1">
                  {(previewType === 'calendar' && showAfter) ? 'Updated via District notification' : 'District schools closed'}
                </div>
              </motion.div>

              {(previewType === 'banner' && showAfter) ? (
                <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-orange-400 bg-orange-50 rounded-lg p-4"
              >
                <div className="font-bold text-orange-600 mb-1">TBD Soon</div>
                <div className="font-semibold text-slate-800">Varsity Soccer State Championship</div>
                <div className="text-sm text-slate-600 mt-1 font-medium italic">
                   📍 Location: {userLocationValue || "Awaiting Input..."}
                </div>
              </motion.div>
              ) : (
                <EventCard date="Jan 15" title="Spring Semester Starts" />
              )}
            </div>
          </section>

          {/* Academic News (Action 3 or Blog Appoval) */}
          <section>
            <h2 className="text-xl font-bold border-b border-slate-200 pb-2 mb-4 text-slate-800">Curriculum & Academics</h2>
            <div className="space-y-4">
              
              {/* Blog Preview */}
              {((previewType === 'blog' || previewType === 'science_fair_blog') && showAfter) && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="border-2 border-indigo-500 bg-white p-6 rounded-xl shadow-lg relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <div className="text-xs font-bold text-indigo-500 uppercase tracking-widest mb-1">Latest Blog Post</div>
                  <h3 className="font-bold text-2xl text-slate-900 mb-2">
                    {previewType === 'science_fair_blog' ? "Oakwood Excels at State Science Fair" : "Join the Statewide Math Olympiad!"}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {previewType === 'science_fair_blog' 
                      ? "Incredible innovations were on display this weekend as our brightest STEM minds took home 3 gold medals at the regional competition..." 
                      : "The Ministry of Education has just announced the dates for the upcoming Annual Math Olympiad. We strongly encourage our advanced mathematics students to sign up early. Registration details can be found in the main office or on the district portal."}
                  </p>
                  <button className="mt-4 text-indigo-600 font-bold text-sm hover:underline">Read Full Article &rarr;</button>
                </motion.div>
              )}

              {/* Document Preview */}
              {(previewType === 'document' && showAfter) ? (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-emerald-50 border border-emerald-200 p-4 rounded-lg flex items-start gap-4"
                >
                  <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded">DOCUMENT UPDATE</div>
                  <div>
                    <h3 className="font-bold text-emerald-900">Parent Handbook 2026</h3>
                    <p className="text-sm text-emerald-700/80 mt-1">Automatically updated from Principal's Google Drive. Click to download the latest PDF.</p>
                  </div>
                </motion.div>
              ) : (
                <div className="p-4 border border-slate-100 bg-slate-50 rounded-lg flex items-start gap-4">
                  <div className="bg-slate-300 text-slate-600 text-xs font-bold px-2 py-1 rounded">GUIDE</div>
                  <div>
                    <h3 className="font-bold text-slate-700">Honors Program Application Deadline</h3>
                    <p className="text-sm text-slate-500 mt-1">Please ensure all materials are submitted by the end of the month.</p>
                  </div>
                </div>
              )}
              
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}

function EventCard({ date, title }: { date: string, title: string }) {
  return (
    <div className="border border-slate-200 bg-slate-50 rounded-lg p-4">
      <div className="font-bold text-blue-600 mb-1">{date}</div>
      <div className="font-semibold text-slate-800">{title}</div>
    </div>
  );
}
