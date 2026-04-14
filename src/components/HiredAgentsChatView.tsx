import { useState } from 'react';
import { PenTool, Code2, Send, CheckCircle } from 'lucide-react';
import { ContentView } from './ContentView';
import { SourcesView } from './SourcesView';
import { AgentsView } from './AgentsView';
import { cn } from '../lib/utils';
import type { AiAction } from '../data/mockData';

interface HiredAgentsChatViewProps {
  actions: AiAction[];
  setActions: any;
  connectedSystems: any[];
  setConnectedSystems: any;
  agents: any[];
  setAgents: any;
}

type AgentType = 'content' | 'admin';

export function HiredAgentsChatView({
  actions, setActions, connectedSystems, setConnectedSystems, agents, setAgents
}: HiredAgentsChatViewProps) {
  
  const [activeAgent, setActiveAgent] = useState<AgentType>('content');
  const [inputText, setInputText] = useState('');
  
  const initialMessages = {
    content: [
      { id: 1, role: 'agent', content: "Hi! I am CC Wordsworth, your newly hired Content Creator Agent. I am monitoring all internal channels and drafting updates automatically. To my right, you'll see my desk with the live Content & Blog feed of my drafts. Let me know what to prioritize!" }
    ],
    admin: [
      { id: 1, role: 'agent', content: "Hello! W.A. Turing here. I'm taking over widget optimization, site performance, and your database connectors. On the right, you'll see the Data Integrations panel showing what systems I am currently tapping into for data streams." }
    ]
  };

  const [messages, setMessages] = useState<Record<AgentType, {id: number, role: string, content: string}[]>>(initialMessages);

  const sendMessage = () => {
    if (!inputText.trim()) return;
    
    const newMsg = { id: Date.now(), role: 'user', content: inputText };
    
    setMessages(prev => ({
      ...prev,
      [activeAgent]: [...prev[activeAgent], newMsg]
    }));
    
    setInputText('');
    
    // Fake agent reply
    setTimeout(() => {
      const replyMsg = { 
        id: Date.now() + 1, 
        role: 'agent', 
        content: activeAgent === 'content' 
          ? "I'm generating drafts based on that input. Watch the feed on the right!" 
          : "Understood. Re-calibrating the integration parameters now."
      };
      setMessages(prev => ({
        ...prev,
        [activeAgent]: [...prev[activeAgent], replyMsg]
      }));
    }, 1000);
  };

  return (
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
              <span className="text-[10px] font-bold text-slate-400 mt-1">{msg.role === 'user' ? 'You' : (activeAgent === 'content' ? 'CC Wordsworth' : 'W.A. Turing')}</span>
            </div>
          ))}
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
  );
}
