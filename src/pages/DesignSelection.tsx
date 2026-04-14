import { useState } from 'react';
import { Sparkles, ArrowRight, LayoutDashboard, Search, Monitor, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const TEMPLATES = [
  {
    id: 'classic',
    title: 'Heritage Classic',
    description: 'A traditional, academic layout perfectly suited for established institutions focusing on legacy and rigor.',
    image: '/template_classic.png',
    icon: <Monitor className="w-5 h-5 text-blue-600" />
  },
  {
    id: 'modern',
    title: 'Modern Minimalist',
    description: 'Our most popular AI-powered choice. Clean typography, spacious bento grid layouts, and premium glassmorphism.',
    image: '/template_modern.png',
    icon: <LayoutDashboard className="w-5 h-5 text-indigo-600" />
  },
  {
    id: 'art',
    title: 'Creative Arts',
    description: 'Vibrant and energetic. Features masonry dynamic loading, bold shapes, and prominent photography focus.',
    image: '/template_art.png',
    icon: <Palette className="w-5 h-5 text-orange-500" />
  }
];

export function DesignSelection() {
  const [selected, setSelected] = useState('modern');

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 flex flex-col">
      
      {/* Top Application Header (Mock AI Builder Interface) */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight">IONOS <span className="text-slate-400 font-medium">| Site Builder AI</span></span>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-400 px-3 border-r border-slate-200">
             Step 1 of 3: Theme
          </div>
          <button className="text-sm font-bold text-slate-600 hover:text-slate-900 px-3">Save Draft</button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col items-center">
        
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Choose a Foundation for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Oakwood High</span>
          </h1>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            Our AI has analyzed your existing portal content and recommends the following structural layouts. Select a starting point, and the AI will auto-populate your entire site.
          </p>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mb-12">
          {TEMPLATES.map((tmpl) => (
            <motion.div 
              key={tmpl.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(tmpl.id)}
              className={`bg-white rounded-[2rem] p-4 cursor-pointer transition-all border-2 relative ${
                selected === tmpl.id 
                ? 'border-indigo-600 shadow-xl shadow-indigo-900/10' 
                : 'border-slate-200 hover:border-indigo-300 hover:shadow-lg'
              }`}
            >
              {selected === tmpl.id && (
                <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full shadow-md z-10 flex items-center gap-1">
                  Selected
                </div>
              )}
              
              <div className="rounded-2xl overflow-hidden border border-slate-100 aspect-[4/3] relative group mb-6 bg-slate-100">
                <img src={tmpl.image} alt={tmpl.title} className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700" />
                
                {/* Overlay gradient on hover for quick preview icon */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <div className="bg-white/90 text-slate-900 font-bold text-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-xl">
                    <Search className="w-4 h-4" /> Live Preview
                  </div>
                </div>
              </div>

              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 mb-2">
                  {tmpl.icon}
                  <h3 className="text-xl font-bold text-slate-900">{tmpl.title}</h3>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">
                  {tmpl.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Controls / Submission */}
        <div className="flex flex-col items-center gap-6">
          <button className="text-sm font-bold text-slate-500 hover:text-slate-800 flex items-center gap-2 transition-colors border border-slate-300 hover:border-slate-400 bg-white px-6 py-2 rounded-full">
            <Search className="w-4 h-4" />
            Explore More Options (50+)
          </button>

          <a 
            href="/school-after-magic" 
            className="bg-indigo-600 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-indigo-500 transition-all shadow-xl shadow-indigo-600/30 flex items-center gap-2"
          >
            Generate Site with AI <ArrowRight className="w-5 h-5" />
          </a>
          <p className="text-xs text-slate-400 font-medium max-w-sm text-center">
            Clicking this will magically transition into the built site view (our "school-after-magic" prototype)
          </p>
        </div>

      </main>

    </div>
  );
}
