import { useState } from 'react';
import { Dashboard } from './components/Dashboard';
import { AiWorkspaceView } from './components/AiWorkspaceView';
import { OurTeamView } from './components/OurTeamView';
import { WebAdminAgentView } from './components/WebAdminAgentView';
import { ContentCreatorAgentView } from './components/ContentCreatorAgentView';
import { HiredAgentsChatView } from './components/HiredAgentsChatView';
import { UtilitiesHubView } from './components/UtilitiesHubView';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { LayoutDashboard, Sparkles, Users, Layers, BookOpen, Code2, PenTool } from 'lucide-react';
import { cn } from './lib/utils';
import type { AiAction } from './data/mockData';
import { MOCK_AI_ACTIONS, MOCK_STATS, MOCK_AGENTS } from './data/mockData';

export type TabType = 'dashboard' | 'workspace' | 'team' | 'web_admin_agent' | 'content_creator_agent' | 'hired_agents' | 'utilities' | 'knowledge_base';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // App-level state to power the demo continuity
  const [actions, setActions] = useState<AiAction[]>(MOCK_AI_ACTIONS);
  const [connectedSystems, setConnectedSystems] = useState<any[]>(MOCK_STATS.connectedSystems);
  const [agents, setAgents] = useState<any[]>(MOCK_AGENTS);

  // Scenario state
  const [hasHiredAgents, setHasHiredAgents] = useState(false);

  return (
    <div className="h-screen bg-slate-50 text-slate-900 relative selection:bg-blue-500/20 flex flex-col overflow-hidden">
      {/* Background ambient glow effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[150px]" />
      </div>

      {/* Navigation / Header */}
      <header className="h-16 border-b border-slate-200/60 flex items-center justify-between px-6 bg-white/70 backdrop-blur-md sticky top-0 z-40 shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-white shadow-[0_4px_10px_rgba(59,130,246,0.3)]">
            AI
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-base tracking-tight text-slate-900 leading-tight">
              Presence AI <span className="text-blue-600 font-semibold">by IONOS</span>
            </span>
            <span className="text-xs text-slate-400 font-medium tracking-wide">Autonomous websites for K–12</span>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-sm text-slate-600 font-medium">System Online</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700">
            JD
          </div>
        </div>
      </header>

      {/* Main layout wrapper */}
      <div className="flex-1 flex overflow-hidden z-10">

        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white/50 border-r border-slate-200/60 backdrop-blur-md hidden md:flex flex-col p-4 shrink-0 overflow-y-auto">
          <nav className="space-y-2">
            <NavItem
              active={activeTab === 'workspace'}
              onClick={() => setActiveTab('workspace')}
              icon={<Sparkles className="w-5 h-5" />}
              label="Presence Assistant"
            />
            <NavItem
              active={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Inbox"
            />

            {hasHiredAgents && (
              <>
                <NavItem
                  active={activeTab === 'team'}
                  onClick={() => setActiveTab('team')}
                  icon={<Users className="w-5 h-5 text-indigo-500" />}
                  label="Our Team (AI)"
                />
                <NavItem
                  active={activeTab === 'web_admin_agent'}
                  onClick={() => setActiveTab('web_admin_agent')}
                  icon={<Code2 className="w-5 h-5 text-blue-500" />}
                  label="Web Admin Agent"
                />
                <NavItem
                  active={activeTab === 'content_creator_agent'}
                  onClick={() => setActiveTab('content_creator_agent')}
                  icon={<PenTool className="w-5 h-5 text-emerald-500" />}
                  label="Content Creator Agent"
                />
              </>
            )}
            <NavItem
              active={activeTab === 'utilities'}
              onClick={() => setActiveTab('utilities')}
              icon={<Layers className="w-5 h-5" />}
              label="Utilities Hub"
            />
            <NavItem
              active={activeTab === 'knowledge_base'}
              onClick={() => setActiveTab('knowledge_base')}
              icon={<BookOpen className="w-5 h-5" />}
              label="Knowledge Base"
            />
          </nav>
        </aside>

        {/* View Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && (
            <Dashboard
              actions={actions}
              connectedSystems={connectedSystems}
              agents={agents}
              onNavigate={setActiveTab}
              hasHiredAgents={hasHiredAgents}
            />
          )}
          {activeTab === 'hired_agents' && (
            <HiredAgentsChatView
              actions={actions}
              setActions={setActions}
              connectedSystems={connectedSystems}
              setConnectedSystems={setConnectedSystems}
              agents={agents}
              setAgents={setAgents}
            />
          )}
          {activeTab === 'workspace' && (
            <AiWorkspaceView
              onAgentsHired={() => setHasHiredAgents(true)}
              onFinishScenario={() => setActiveTab('dashboard')}
            />
          )}
          {activeTab === 'team' && (
            <OurTeamView
              agents={agents}
              connectedSystems={connectedSystems}
              autoUpdatesCount={actions.filter((a: any) => a.status === 'auto-applied' && a.isInternal).length}
            />
          )}
          {activeTab === 'web_admin_agent' && <WebAdminAgentView />}
          {activeTab === 'content_creator_agent' && <ContentCreatorAgentView />}
          {activeTab === 'utilities' && (
            <UtilitiesHubView />
          )}
          {activeTab === 'knowledge_base' && (
            <KnowledgeBaseView />
          )}
        </main>
      </div>

    </div>
  );
}

function NavItem({ active, onClick, icon, label, badge }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string, badge?: number }) {
  return (
    <button
      onClick={onClick}
      className={cn("w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all text-sm",
        active
          ? "bg-blue-50 text-blue-700 shadow-sm border border-blue-100"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent"
      )}
    >
      <div className="flex items-center gap-3">
        {icon}
        {label}
      </div>
      {(badge !== undefined && badge > 0) && (
        <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

export default App;
