import { useState, useRef } from 'react';
import {
  Clock, Calendar, BookOpen, Users, GraduationCap,
  ChevronDown, ChevronRight, Search, FileText, Upload,
  Trash2, File, Image, FileSpreadsheet, Info, X
} from 'lucide-react';
import { cn } from '../lib/utils';

// ─── Data ────────────────────────────────────────────────────────────────────

type ArticleId =
  | 'bell_schedule' | 'lunch_periods'
  | 'attendance_policy' | 'dress_code' | 'technology_use'
  | 'hall_passes' | 'locker_assignment' | 'emergency_procedures'
  | 'counseling_services' | 'library'
  | 'uploaded_files';

interface Article {
  id: ArticleId;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  sections: { heading: string; body: string }[];
  contact?: { phone: string; email: string };
}

const ARTICLES: Record<ArticleId, Article> = {
  bell_schedule: {
    id: 'bell_schedule',
    title: 'Bell Schedule',
    subtitle: 'Daily class periods and passing times',
    icon: <Clock className="w-6 h-6 text-blue-500" />,
    sections: [
      { heading: 'Regular Schedule', body: 'Period 1: 8:00 – 8:55 AM\nPeriod 2: 9:00 – 9:55 AM\nPeriod 3: 10:00 – 10:55 AM\nLunch: 11:00 – 11:40 AM\nPeriod 4: 11:45 AM – 12:40 PM\nPeriod 5: 12:45 – 1:40 PM\nPeriod 6: 1:45 – 2:40 PM' },
      { heading: 'Early Release Fridays', body: 'On designated early release days, all periods are shortened by 10 minutes and school ends at 1:30 PM. Check the school calendar for upcoming early release dates.' },
    ],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
  lunch_periods: {
    id: 'lunch_periods',
    title: 'Lunch Periods',
    subtitle: 'Cafeteria schedule and meal options',
    icon: <Calendar className="w-6 h-6 text-orange-500" />,
    sections: [
      { heading: 'Lunch Windows', body: 'Grades 9–10: 11:00 – 11:40 AM\nGrades 11–12: 11:45 AM – 12:25 PM' },
      { heading: 'Meal Options', body: 'Hot lunch, salad bar, and grab-and-go options are available daily. Students with dietary restrictions should contact the cafeteria manager at least 48 hours in advance.' },
      { heading: 'Free & Reduced Lunch', body: 'Families who qualify for free or reduced-price meals should complete the annual application available in the main office or on the district website.' },
    ],
    contact: { phone: '(555) 123-4568', email: 'cafeteria@school.edu' },
  },
  attendance_policy: {
    id: 'attendance_policy',
    title: 'Attendance Policy',
    subtitle: 'Requirements and procedures for student attendance',
    icon: <Users className="w-6 h-6 text-blue-500" />,
    sections: [
      { heading: 'Daily Attendance', body: 'Students are expected to attend all classes daily. Absences must be reported by a parent or guardian within 24 hours of the absence.' },
      { heading: 'Excused Absences', body: 'The following are considered excused absences: Illness or medical appointments • Family emergency • Religious observance • School-approved activities • Court appearances. Documentation may be required for extended absences.' },
      { heading: 'Tardiness', body: 'Students arriving after 8:00 AM must check in at the attendance office. Three tardies equal one absence. Excessive tardiness may result in disciplinary action.' },
    ],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
  dress_code: {
    id: 'dress_code',
    title: 'Dress Code',
    subtitle: 'Clothing guidelines for all students',
    icon: <BookOpen className="w-6 h-6 text-purple-500" />,
    sections: [
      { heading: 'General Guidelines', body: 'All clothing must be clean, neat, and appropriate for a school environment. Tops must have sleeves. Shorts and skirts must reach fingertip length.' },
      { heading: 'Prohibited Items', body: 'Clothing displaying offensive language, alcohol, tobacco, or drug references is strictly prohibited. Hats and hoods are not permitted inside buildings during school hours.' },
      { heading: 'Spirit Days', body: 'On designated spirit days, students may wear school colors, team jerseys, and themed attire while remaining within general dress code guidelines.' },
    ],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
  technology_use: {
    id: 'technology_use',
    title: 'Technology Use',
    subtitle: 'Acceptable use policy for devices and internet',
    icon: <BookOpen className="w-6 h-6 text-teal-500" />,
    sections: [
      { heading: 'Personal Devices', body: 'Students may bring personal devices (phones, tablets, laptops) but must keep them silenced and put away during instructional time unless directed otherwise by a teacher.' },
      { heading: 'School Network', body: 'Use of the school Wi-Fi network is a privilege. Accessing inappropriate content, gaming sites, or social media is prohibited. All activity is monitored.' },
      { heading: 'AI Tools', body: 'Students must disclose use of AI-generated content on assignments. Teachers will provide specific guidance on acceptable AI use per subject.' },
    ],
    contact: { phone: '(555) 123-4569', email: 'tech@school.edu' },
  },
  hall_passes: {
    id: 'hall_passes',
    title: 'Hall Passes',
    subtitle: 'Procedures for moving through the building during class',
    icon: <FileText className="w-6 h-6 text-blue-500" />,
    sections: [
      { heading: 'Requesting a Pass', body: 'Students must obtain a signed physical hall pass from their teacher before leaving the classroom for any reason during instructional time.' },
      { heading: 'Pass Limits', body: 'Each student is allowed a maximum of 3 non-emergency hall passes per week per class. Passes reset on Monday each week.' },
      { heading: 'Restroom & Nurse Visits', body: 'Restroom visits should be completed during passing periods whenever possible. Nurse visits always require a hall pass.' },
    ],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
  locker_assignment: {
    id: 'locker_assignment',
    title: 'Locker Assignment',
    subtitle: 'How lockers are assigned and managed',
    icon: <Clock className="w-6 h-6 text-slate-500" />,
    sections: [
      { heading: 'Getting Your Locker', body: 'Locker assignments are distributed during the first week of school. Students must use their assigned locker; trading lockers is not permitted without office approval.' },
      { heading: 'Combination Security', body: 'Never share your locker combination. The school is not responsible for items stolen from unlocked lockers. Students are encouraged to use their own padlock.' },
      { heading: 'Locker Inspections', body: 'School administration reserves the right to inspect lockers at any time. Lockers must be kept clean. Damage may result in fines.' },
    ],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
  emergency_procedures: {
    id: 'emergency_procedures',
    title: 'Emergency Procedures',
    subtitle: 'Safety protocols for various emergency situations',
    icon: <Clock className="w-6 h-6 text-red-500" />,
    sections: [
      { heading: 'Fire Drills', body: 'Fire drills are conducted monthly. Students must exit quickly and quietly, following their teacher to the designated assembly area. Do not use elevators.' },
      { heading: 'Lockdown Protocol', body: 'During a lockdown, students lock doors, turn off lights, and move away from windows and doors. Remain silent until given the all-clear by authorized personnel.' },
      { heading: 'Medical Emergencies', body: 'Call 911 immediately for life-threatening situations. Notify the nearest staff member. AED devices are located at the gym entrance and main office.' },
    ],
    contact: { phone: '(555) 911-0000', email: 'safety@school.edu' },
  },
  counseling_services: {
    id: 'counseling_services',
    title: 'Counseling Services',
    subtitle: 'Academic and personal support resources',
    icon: <Users className="w-6 h-6 text-emerald-500" />,
    sections: [
      { heading: 'Academic Counseling', body: 'Counselors assist with course selection, graduation requirements, and college/career planning. Walk-in hours are Mon–Fri 8:00–9:00 AM, or schedule via the student portal.' },
      { heading: 'Personal & Social Support', body: 'Confidential individual and group counseling is available for students experiencing social, emotional, or family challenges. All conversations are kept private.' },
      { heading: 'Crisis Intervention', body: 'If you or a peer is in crisis, go directly to the counseling office or contact a trusted adult immediately. The counselor is available 24/7 via the school emergency line.' },
    ],
    contact: { phone: '(555) 123-4570', email: 'counseling@school.edu' },
  },
  library: {
    id: 'library',
    title: 'Library & Media Center',
    subtitle: 'Resources, hours, and borrowing policies',
    icon: <BookOpen className="w-6 h-6 text-amber-500" />,
    sections: [
      { heading: 'Hours', body: 'Monday – Friday: 7:30 AM – 4:00 PM\nThe library is open 30 minutes before school and 1 hour after for student use.' },
      { heading: 'Borrowing Policy', body: 'Students may borrow up to 5 items at a time for up to 2 weeks. Overdue fines are $0.10/day per item. Lost items must be replaced at the current purchase price.' },
      { heading: 'Digital Resources', body: 'The media center provides access to research databases, e-books, and computer workstations. Log in with your student credentials to access resources from home.' },
    ],
    contact: { phone: '(555) 123-4571', email: 'library@school.edu' },
  },
  uploaded_files: {
    id: 'uploaded_files',
    title: 'Uploaded Files',
    subtitle: 'Documents and resources uploaded to the knowledge base',
    icon: <Upload className="w-6 h-6 text-blue-500" />,
    sections: [],
    contact: { phone: '(555) 123-4567', email: 'info@school.edu' },
  },
};

// ─── Sidebar tree structure ───────────────────────────────────────────────────

interface NavSection {
  label: string;
  icon: React.ReactNode;
  items: { id: ArticleId; label: string; icon: React.ReactNode }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Daily Schedule',
    icon: <Clock className="w-4 h-4" />,
    items: [
      { id: 'bell_schedule', label: 'Bell Schedule', icon: <Clock className="w-3.5 h-3.5" /> },
      { id: 'lunch_periods', label: 'Lunch Periods', icon: <Calendar className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'School Policies',
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      { id: 'attendance_policy', label: 'Attendance Policy', icon: <Users className="w-3.5 h-3.5" /> },
      { id: 'dress_code', label: 'Dress Code', icon: <BookOpen className="w-3.5 h-3.5" /> },
      { id: 'technology_use', label: 'Technology Use', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Student Procedures',
    icon: <FileText className="w-4 h-4" />,
    items: [
      { id: 'hall_passes', label: 'Hall Passes', icon: <FileText className="w-3.5 h-3.5" /> },
      { id: 'locker_assignment', label: 'Locker Assignment', icon: <Clock className="w-3.5 h-3.5" /> },
      { id: 'emergency_procedures', label: 'Emergency Procedures', icon: <Clock className="w-3.5 h-3.5" /> },
    ],
  },
  {
    label: 'Student Resources',
    icon: <GraduationCap className="w-4 h-4" />,
    items: [
      { id: 'counseling_services', label: 'Counseling Services', icon: <Users className="w-3.5 h-3.5" /> },
      { id: 'library', label: 'Library & Media Center', icon: <BookOpen className="w-3.5 h-3.5" /> },
    ],
  },
];

// ─── Uploaded file type helper ────────────────────────────────────────────────

function getFileIcon(name: string) {
  const ext = name.split('.').pop()?.toLowerCase();
  if (['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg'].includes(ext || ''))
    return <Image className="w-4 h-4 text-emerald-500" />;
  if (['xls', 'xlsx', 'csv'].includes(ext || ''))
    return <FileSpreadsheet className="w-4 h-4 text-emerald-600" />;
  return <File className="w-4 h-4 text-blue-500" />;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  uploadedAt: string;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function KnowledgeBaseView() {
  const [activeArticle, setActiveArticle] = useState<ArticleId>('attendance_policy');
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [query, setQuery] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    { id: '1', name: 'Parent_Handbook_2026.pdf', size: 2_450_000, uploadedAt: 'Apr 10, 2026' },
    { id: '2', name: 'Emergency_Contact_Form.pdf', size: 312_000, uploadedAt: 'Mar 28, 2026' },
    { id: '3', name: 'School_Calendar_2025-26.xlsx', size: 88_000, uploadedAt: 'Sep 1, 2025' },
  ]);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleSection = (label: string) =>
    setCollapsed(prev => ({ ...prev, [label]: !prev[label] }));

  // Filter articles by search query
  const filteredSections = query.trim()
    ? NAV_SECTIONS.map(s => ({
        ...s,
        items: s.items.filter(i =>
          i.label.toLowerCase().includes(query.toLowerCase())
        ),
      })).filter(s => s.items.length > 0)
    : NAV_SECTIONS;

  const article = ARTICLES[activeArticle];

  // ── File upload handlers ──
  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach(file => {
      setUploadedFiles(prev => [
        {
          id: Date.now().toString() + file.name,
          name: file.name,
          size: file.size,
          uploadedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        },
        ...prev,
      ]);
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  const removeFile = (id: string) =>
    setUploadedFiles(prev => prev.filter(f => f.id !== id));

  return (
    <div className="flex h-full overflow-hidden rounded-2xl border border-slate-200/60 shadow-sm bg-white animate-in fade-in duration-500">

      {/* ── Left sidebar ── */}
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-slate-50 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-200">
          <h2 className="text-base font-bold text-slate-900 mb-3">Knowledge Base</h2>
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400/50 placeholder:text-slate-400"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {/* Article sections */}
          {filteredSections.map(section => {
            const isOpen = !collapsed[section.label];
            return (
              <div key={section.label}>
                <button
                  onClick={() => toggleSection(section.label)}
                  className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  {isOpen
                    ? <ChevronDown className="w-3 h-3 shrink-0" />
                    : <ChevronRight className="w-3 h-3 shrink-0" />
                  }
                  <span className="text-slate-500">{section.icon}</span>
                  {section.label}
                </button>
                {isOpen && (
                  <div className="ml-4 mt-0.5 space-y-0.5">
                    {section.items.map(item => (
                      <button
                        key={item.id}
                        onClick={() => setActiveArticle(item.id)}
                        className={cn(
                          "w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors text-left",
                          activeArticle === item.id
                            ? "bg-blue-50 text-blue-700 font-semibold border border-blue-100"
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        )}
                      >
                        <span className={activeArticle === item.id ? 'text-blue-500' : 'text-slate-400'}>
                          {item.icon}
                        </span>
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          {/* Divider */}
          <div className="my-2 border-t border-slate-200" />

          {/* Uploaded Files nav item */}
          <button
            onClick={() => setActiveArticle('uploaded_files')}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg transition-colors text-left font-semibold",
              activeArticle === 'uploaded_files'
                ? "bg-blue-50 text-blue-700 border border-blue-100"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            )}
          >
            <Upload className={cn("w-3.5 h-3.5 shrink-0", activeArticle === 'uploaded_files' ? 'text-blue-500' : 'text-slate-400')} />
            Uploaded Files
            <span className={cn(
              "ml-auto text-xs font-bold px-1.5 py-0.5 rounded-full",
              activeArticle === 'uploaded_files' ? "bg-blue-100 text-blue-600" : "bg-slate-200 text-slate-500"
            )}>
              {uploadedFiles.length}
            </span>
          </button>
        </nav>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 overflow-y-auto">
        {activeArticle === 'uploaded_files' ? (
          <UploadedFilesView
            files={uploadedFiles}
            onRemove={removeFile}
            onFiles={handleFiles}
            dragOver={dragOver}
            onDragOver={() => setDragOver(true)}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            fileInputRef={fileInputRef}
          />
        ) : (
          <ArticleView article={article} />
        )}
      </main>
    </div>
  );
}

// ─── Article View ─────────────────────────────────────────────────────────────

function ArticleView({ article }: { article: Article }) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          {article.icon}
        </div>
        <h1 className="text-2xl font-bold text-slate-900">{article.title}</h1>
      </div>
      <p className="text-slate-500 text-sm mb-8 ml-12">{article.subtitle}</p>

      {/* Sections */}
      <div className="space-y-4">
        {article.sections.map((section, i) => (
          <div key={i} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-base font-bold text-slate-900 mb-2">{section.heading}</h2>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">{section.body}</p>
          </div>
        ))}
      </div>

      {/* Help box */}
      {article.contact && (
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <div className="text-sm text-slate-700">
            <span className="font-semibold">Need more help?</span>{' '}
            Contact the main office at {article.contact.phone} or email{' '}
            <a href={`mailto:${article.contact.email}`} className="text-blue-600 hover:underline">
              {article.contact.email}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Uploaded Files View ──────────────────────────────────────────────────────

interface UploadedFilesViewProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onFiles: (files: FileList | null) => void;
  dragOver: boolean;
  onDragOver: () => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function UploadedFilesView({
  files, onRemove, onFiles, dragOver,
  onDragOver, onDragLeave, onDrop, fileInputRef
}: UploadedFilesViewProps) {
  return (
    <div className="max-w-2xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-1">
        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
          <Upload className="w-5 h-5 text-blue-500" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Uploaded Files</h1>
      </div>
      <p className="text-slate-500 text-sm mb-8 ml-12">
        Documents and resources added to the knowledge base
      </p>

      {/* Drop zone */}
      <div
        onDragOver={e => { e.preventDefault(); onDragOver(); }}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all mb-6",
          dragOver
            ? "border-blue-400 bg-blue-50"
            : "border-slate-200 bg-slate-50 hover:border-blue-300 hover:bg-blue-50/40"
        )}
      >
        <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center">
          <Upload className="w-5 h-5 text-blue-500" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-700">
            {dragOver ? 'Drop to upload' : 'Drag & drop files here'}
          </p>
          <p className="text-xs text-slate-400 mt-0.5">or click to browse — PDF, DOCX, XLSX, images</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          className="hidden"
          onChange={e => onFiles(e.target.files)}
        />
      </div>

      {/* File list */}
      {files.length === 0 ? (
        <div className="text-center py-16 text-slate-400">
          <File className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="text-sm font-medium">No files uploaded yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {files.map(file => (
            <div
              key={file.id}
              className="bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                {getFileIcon(file.name)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-800 truncate">{file.name}</p>
                <p className="text-xs text-slate-400">{formatFileSize(file.size)} · Uploaded {file.uploadedAt}</p>
              </div>
              <button
                onClick={() => onRemove(file.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400"
                title="Remove file"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Info box */}
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
        <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-sm text-slate-700">
          <span className="font-semibold">Tip:</span> Files uploaded here are available to AI agents as reference material when generating content and answering questions about school policies.
        </p>
      </div>
    </div>
  );
}
