import { useState, useRef, useEffect } from 'react';
import { PenTool, Code2, Send, CheckCircle, Eye } from 'lucide-react';
import { ContentView } from './ContentView';
import { SourcesView } from './SourcesView';
import { AgentsView } from './AgentsView';
import { AiReviewModal } from './AiReviewModal';
import { cn } from '../lib/utils';
import type { AiAction } from '../data/mockData';
import type { Teacher, BlogPost } from '../data/schoolData';

interface HiredAgentsChatViewProps {
  actions: AiAction[];
  setActions: any;
  connectedSystems: any[];
  setConnectedSystems: any;
  agents: any[];
  setAgents: any;
}

type AgentType = 'content' | 'admin';

type ChatMessage = {
  id: number;
  role: string;
  content: string;
  isTyping?: boolean;
  actionId?: string; // links to a generated AiAction
};

// ── Intent parser ─────────────────────────────────────────────────────────────

function parseIntent(text: string): 'add_teacher' | 'add_blog_post' | 'unknown' {
  const t = text.toLowerCase();
  if (/\b(add|new|hire|create|introduce)\b.*\b(teacher|professor|faculty|staff|instructor)\b/i.test(t)
    || /\b(teacher|professor|faculty|staff|instructor)\b.*\b(add|new|hire|create)\b/i.test(t)) return 'add_teacher';
  if (/\b(add|new|write|publish|create|post)\b.*\b(blog|post|article|news|announcement)\b/i.test(t)
    || /\b(blog|post|article|news)\b.*\b(add|new|write|publish|create)\b/i.test(t)) return 'add_blog_post';
  return 'unknown';
}

function extractName(text: string): string | null {
  const m = text.match(/\b(Mr\.|Ms\.|Mrs\.|Dr\.)\s+([A-Z][a-z]+)/);
  return m ? `${m[1]} ${m[2]}` : null;
}

function extractSubject(text: string): string | null {
  const subjects: Record<string, string> = {
    math: 'Mathematics', calculus: 'Advanced Calculus', algebra: 'Algebra',
    science: 'Science', biology: 'AP Biology', chemistry: 'Chemistry', physics: 'Physics',
    english: 'English & Literature', history: 'World History', geography: 'Geography',
    'computer science': 'Computer Science', cs: 'Computer Science', coding: 'Computer Science',
    art: 'Visual Arts', music: 'Music', pe: 'Physical Education', sports: 'Athletics',
    economics: 'Economics', psychology: 'Psychology',
  };
  const t = text.toLowerCase();
  for (const [key, val] of Object.entries(subjects)) {
    if (t.includes(key)) return val;
  }
  return null;
}

function buildTeacherAction(text: string): AiAction {
  const name = extractName(text) || 'Ms. Chen';
  const subject = extractSubject(text) || 'General Studies';
  const dept = subject.includes('Math') || subject.includes('Calculus') ? 'Mathematics'
    : subject.includes('Science') || subject.includes('Biology') || subject.includes('Chemistry') ? 'Science'
    : subject.includes('English') ? 'English'
    : subject.includes('History') || subject.includes('Geography') ? 'Social Studies'
    : subject.includes('Computer') ? 'STEM'
    : subject.includes('Art') || subject.includes('Music') ? 'Arts'
    : subject.includes('Athletic') || subject.includes('PE') ? 'Athletics'
    : 'General';

  const photoIndex = Math.floor(Math.random() * 40) + 20;
  const isFemale = name.startsWith('Ms.') || name.startsWith('Mrs.');
  const photo = `https://randomuser.me/api/portraits/${isFemale ? 'women' : 'men'}/${photoIndex}.jpg`;

  const teacher: Teacher = {
    name,
    role: subject,
    department: dept,
    photo,
    tag: 'New Faculty',
    bio: `Joining Oakwood High this semester to teach ${subject}. Brings a passion for education and a commitment to student success.`,
  };

  return {
    id: `chat_teacher_${Date.now()}`,
    source: 'Chat — CC Wordsworth',
    sourceType: 'chat',
    isInternal: true,
    title: `Add New Teacher: ${name}`,
    summary: `Request to add ${name} to the faculty directory as a ${subject} teacher in the ${dept} department.`,
    confidence: 0.95,
    proposedChanges: [
      `Add ${name} to the Team page faculty grid.`,
      `Tag as "New Faculty" with ${dept} department label.`,
      `Profile photo sourced automatically.`,
    ],
    status: 'pending',
    timestamp: 'Just now',
    previewType: 'new_teacher',
    pendingChanges: { newTeacher: teacher },
  };
}

function buildBlogAction(text: string): AiAction {
  // Extract topic hint from message
  const topicMatch = text.match(/about\s+(.+?)(?:\.|$)/i) || text.match(/(?:post|article|blog)\s+(?:on|about|for)\s+(.+?)(?:\.|$)/i);
  const topicHint = topicMatch ? topicMatch[1].trim() : 'school highlights';

  const title = `Oakwood Update: ${topicHint.charAt(0).toUpperCase() + topicHint.slice(1)}`;
  const excerpt = `We're excited to share the latest news from Oakwood High regarding ${topicHint}. Our students and staff continue to demonstrate excellence and dedication across all areas of school life.`;

  const post: BlogPost = {
    id: `chat_post_${Date.now()}`,
    title,
    excerpt,
    image: '',
    category: 'News',
  };

  return {
    id: `chat_blog_${Date.now()}`,
    source: 'Chat — CC Wordsworth',
    sourceType: 'chat',
    isInternal: true,
    title: `New Blog Post: ${title}`,
    summary: `Draft blog post created based on your request. Topic: "${topicHint}". Ready for review and editing before publishing.`,
    confidence: 0.92,
    proposedChanges: [
      `Add new blog post "${title}" to the homepage news feed.`,
      `Category tagged as "News".`,
      `You can edit the copy before approving.`,
    ],
    status: 'pending',
    timestamp: 'Just now',
    previewType: 'new_blog_post',
    pendingChanges: { newBlogPost: post },
  };
}

// ── Typing steps shown in chat ────────────────────────────────────────────────

const TEACHER_STEPS = [
  '🔍 Analyzing your request...',
  '👤 Generating faculty profile...',
  '📸 Sourcing profile photo...',
  '✅ Draft ready — review before publishing.',
];

const BLOG_STEPS = [
  '🔍 Analyzing your request...',
  '✍️ Drafting blog post copy...',
  '🏷️ Assigning category and metadata...',
  '✅ Draft ready — review before publishing.',
];

// ── Component ─────────────────────────────────────────────────────────────────

export function HiredAgentsChatView({
  actions, setActions, connectedSystems, setConnectedSystems, agents, setAgents
}: HiredAgentsChatViewProps) {

  const [activeAgent, setActiveAgent] = useState<AgentType>('content');
  const [inputText, setInputText] = useState('');
  const [reviewAction, setReviewAction] = useState<AiAction | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialMessages: Record<AgentType, ChatMessage[]> = {
    content: [
      { id: 1, role: 'agent', content: "Hi! I'm CC Wordsworth, your Content Creator Agent. I monitor all channels and draft updates automatically.\n\nTry asking me to **add a new teacher** or **write a blog post** — I'll build a draft and you can review it before it goes live." }
    ],
    admin: [
      { id: 1, role: 'agent', content: "Hello! W.A. Turing here. I'm handling widget optimization, site performance, and database connectors. On the right you can see the live systems panel." }
    ]
  };

  const [messages, setMessages] = useState<Record<AgentType, ChatMessage[]>>(initialMessages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addMessage = (agent: AgentType, msg: Omit<ChatMessage, 'id'>) => {
    setMessages(prev => ({
      ...prev,
      [agent]: [...prev[agent], { id: Date.now() + Math.random(), ...msg }]
    }));
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const text = inputText.trim();
    const agent = activeAgent;
    addMessage(agent, { role: 'user', content: text });
    setInputText('');

    if (agent !== 'content') {
      setTimeout(() => {
        addMessage(agent, { role: 'agent', content: 'Understood. Re-calibrating the integration parameters now.' });
      }, 900);
      return;
    }

    const intent = parseIntent(text);

    if (intent === 'unknown') {
      setTimeout(() => {
        addMessage(agent, { role: 'agent', content: "Got it! I can help with that. Try something like:\n• \"Add a new teacher Ms. Chen for Math\"\n• \"Write a blog post about the science fair\"" });
      }, 800);
      return;
    }

    const steps = intent === 'add_teacher' ? TEACHER_STEPS : BLOG_STEPS;

    // Stream the step messages with delays
    steps.forEach((step, i) => {
      const isLast = i === steps.length - 1;
      setTimeout(() => {
        if (!isLast) {
          addMessage(agent, { role: 'agent', content: step });
        } else {
          // Build the action
          const action = intent === 'add_teacher' ? buildTeacherAction(text) : buildBlogAction(text);
          setActions((prev: AiAction[]) => [action, ...prev]);
          addMessage(agent, { role: 'agent', content: step, actionId: action.id });
        }
      }, 700 + i * 900);
    });
  };

  return (
    <>
    <div className="flex h-[calc(100vh-6rem)] w-full bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
      
      {/* LEFT SIDEBAR: AGENT SELECTION */}
      <div className="w-64 border-r border-slate-200 bg-slate-50 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between">
          <span className="font-bold text-slate-800">My Hired Team</span>
        </div>
        
        <div className="p-2 space-y-2 flex-1">
          <button
            onClick={() => setActiveAgent('content')}
            className={cn(
              "w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-colors",
              activeAgent === 'content' ? "bg-emerald-50 border border-emerald-200" : "hover:bg-slate-200/50 border border-transparent"
            )}
          >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm", activeAgent === 'content' ? "bg-emerald-500 text-white" : "bg-white text-emerald-600")}>
              <PenTool className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Content Creator</p>
              <p className="text-xs text-slate-500">CC Wordsworth</p>
            </div>
          </button>
          
          <button
            onClick={() => setActiveAgent('admin')}
            className={cn(
              "w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-colors",
              activeAgent === 'admin' ? "bg-blue-50 border border-blue-200" : "hover:bg-slate-200/50 border border-transparent"
            )}
          >
            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0 shadow-sm", activeAgent === 'admin' ? "bg-blue-600 text-white" : "bg-white text-blue-600")}>
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800">Web Admin</p>
              <p className="text-xs text-slate-500">W.A. Turing</p>
            </div>
          </button>
        </div>
      </div>

      {/* CENTER: CHAT WINDOW */}
      <div className="flex-1 min-w-[350px] flex flex-col border-r border-slate-200 bg-white">
        {/* Header */}
        <div className="h-16 border-b border-slate-200 flex items-center px-6 shrink-0 gap-3">
          {activeAgent === 'content' ? (
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center"><PenTool className="w-4 h-4 text-emerald-600"/></div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Code2 className="w-4 h-4 text-blue-600"/></div>
          )}
          <div>
            <h2 className="font-bold text-slate-800 text-sm">
              {activeAgent === 'content' ? "Direct Line: Content Creator" : "Direct Line: Web Admin"}
            </h2>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> ONLINE
            </div>
          </div>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages[activeAgent].map((msg) => (
            <div key={msg.id} className={cn("flex flex-col max-w-[85%]", msg.role === 'user' ? "ml-auto items-end" : "mr-auto items-start")}>
              <div className={cn(
                "px-4 py-3 rounded-2xl text-sm shadow-sm leading-relaxed",
                msg.role === 'user'
                  ? "bg-slate-800 text-white rounded-br-sm"
                  : (activeAgent === 'content' ? "bg-emerald-50 border border-emerald-100 text-slate-800 font-medium rounded-bl-sm" : "bg-blue-50 border border-blue-100 text-slate-800 font-medium rounded-bl-sm")
              )}>
                {msg.content}
              </div>
              {msg.actionId && (
                <button
                  onClick={() => {
                    const action = actions.find(a => a.id === msg.actionId);
                    if (action) setReviewAction(action);
                  }}
                  className="mt-2 flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Review Proposed Change →
                </button>
              )}
              <span className="text-[10px] font-bold text-slate-400 mt-1">{msg.role === 'user' ? 'You' : (activeAgent === 'content' ? 'CC Wordsworth' : 'W.A. Turing')}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input */}
        <div className="p-4 bg-white border-t border-slate-100 shrink-0">
          <div className="relative flex items-end">
            <textarea 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Message ${activeAgent === 'content' ? 'Content Creator' : 'Web Admin'}...`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-14 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none max-h-32 min-h-[48px]"
              rows={1}
            />
            <button 
              onClick={sendMessage}
              disabled={!inputText.trim()}
              className={cn("absolute right-2 bottom-2 p-1.5 text-white rounded-lg transition-colors shadow-sm disabled:opacity-50", activeAgent === 'content' ? "bg-emerald-600 hover:bg-emerald-700" : "bg-blue-600 hover:bg-blue-700")}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL: CONTEXT "DESK" */}
      <div className="w-[55%] flex flex-col bg-slate-100/50 shrink-0 overflow-y-auto relative hidden xl:block shadow-inner">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 py-2 text-xs font-bold text-slate-500 flex items-center justify-between z-10">
          <span className="uppercase tracking-widest">{activeAgent === 'content' ? "Content Pipeline Dashboard" : "Systems Integrity Panel"}</span>
          <CheckCircle className={cn("w-3 h-3", activeAgent === 'content' ? "text-emerald-500" : "text-blue-500")} />
        </div>
        
        <div className="p-4 w-full h-full">
          {activeAgent === 'content' ? (
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full overflow-y-auto w-full scale-[0.80] origin-top">
               <ContentView actions={actions} setActions={setActions} />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg border border-slate-200 h-full overflow-y-auto w-full scale-[0.85] origin-top">
               <SourcesView 
                  connectedSystems={connectedSystems} 
                  setConnectedSystems={setConnectedSystems} 
                  actions={actions}
                  setActions={setActions}
               />
               <div className="mt-8 border-t border-slate-200 pt-8 pb-12">
                 <h2 className="px-8 text-xl font-bold mb-4">Core Web Agents Configurations</h2>
                 <AgentsView agents={agents} setAgents={setAgents} />
               </div>
            </div>
          )}
        </div>
      </div>

    </div>

    {/* Review Modal */}
    {reviewAction && (
      <AiReviewModal
        action={reviewAction}
        onClose={() => setReviewAction(null)}
        onComplete={(id, status) => {
          setActions((prev: AiAction[]) => prev.map(a => a.id === id ? { ...a, status } : a));
          setReviewAction(null);
        }}
      />
    )}
    </>
  );
}
