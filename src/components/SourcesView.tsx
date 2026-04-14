import { useState } from 'react';
import { Database, MonitorSmartphone, Mail, CheckCircle2, Bot } from 'lucide-react';
import type { AiAction } from '../data/mockData';

export function SourcesView({ connectedSystems, setConnectedSystems, actions, setActions }: any) {
  const [activeTab, setActiveTab] = useState<'internal' | 'external'>('internal');
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = (system: string, type: string) => {
    setConnecting(system);
    setTimeout(() => {
      setConnectedSystems([...connectedSystems, { name: system, type, status: 'connected', lastSync: 'Just now' }]);
      
      // If PowerSchool or Google Drive is connected, we simulate finding an automatic update
      if (system === 'PowerSchool SIS') {
         // Create the auto-applied action in the dashboard
         const newAction: AiAction = {
           id: `sis_${Date.now()}`,
           source: 'PowerSchool SIS Sync',
           sourceType: 'sis',
           isInternal: true,
           title: 'New Math Teacher Schedule',
           summary: 'SIS detected Mr. Davis was assigned to Advanced Calculus. The class schedule has been automatically updated on the portal.',
           confidence: 0.99,
           proposedChanges: [
             'Update the "Academic Calendar" and "Directory" pages.',
             'Send automatic email notification to enrolled students.'
           ],
           status: 'auto-applied',
           timestamp: 'Just now',
           previewType: 'calendar'
         };
         setActions([newAction, ...actions]);
      } else if (system === 'Google Workspace') {
         const newAction: AiAction = {
           id: `gws_${Date.now()}`,
           source: 'Google Workspace (Shared Drive)',
           sourceType: 'google-drive',
           isInternal: true,
           title: 'Updated Parent Handbook 2026',
           summary: 'Detected a new version of the Parent Handbook PDF in the Principal\'s shared drive. Replaced the old link on the website.',
           confidence: 0.99,
           proposedChanges: [
             'Replace link on the "Resources" page.',
           ],
           status: 'auto-applied',
           timestamp: 'Just now',
           previewType: 'document'
         };
         setActions([newAction, ...actions]);
      }

      setConnecting(null);
    }, 1500);
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Data Integrations</h1>
        <p className="text-slate-500">Connect internal databases for automatic site updates, or external feeds for AI blog suggestions.</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1.5 rounded-xl w-max mb-8 border border-slate-200 shadow-sm">
        <button
          onClick={() => setActiveTab('internal')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'internal' ? 'bg-white text-blue-600 shadow border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
          Internal Sources (Auto-Approve)
        </button>
        <button
          onClick={() => setActiveTab('external')}
          className={`px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === 'external' ? 'bg-white text-indigo-600 shadow border border-slate-200/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
          External Feeds (Manual Approval)
        </button>
      </div>

      {/* Internal Sources Tab */}
      {activeTab === 'internal' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IntegrationCard 
            title="PowerSchool SIS"
            description="Sync class schedules, teacher directories, and student event data directly to your website portals. Updates apply automatically."
            icon={<Database className="w-6 h-6 text-blue-500" />}
            isConnected={connectedSystems.some((s: any) => s.name === 'PowerSchool SIS')}
            isConnecting={connecting === 'PowerSchool SIS'}
            onConnect={() => handleConnect('PowerSchool SIS', 'Intranet Sync')}
          />
          <IntegrationCard 
            title="Google Workspace"
            description="Connect a Shared Drive. If administrators overwrite essential PDFs (like Handbooks or Lunch Menus), the site updates the link instantly."
            icon={<MonitorSmartphone className="w-6 h-6 text-emerald-500" />}
            isConnected={connectedSystems.some((s: any) => s.name === 'Google Workspace')}
            isConnecting={connecting === 'Google Workspace'}
            onConnect={() => handleConnect('Google Workspace', 'Drive Sync')}
          />
        </div>
      )}

      {/* External Sources Tab */}
      {activeTab === 'external' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <IntegrationCard 
            title="Ministry of Education"
            description="Monitor state-level policy updates, grants, and statewide academic competitions. Suggestions sent to your Content Feed."
            icon={<Bot className="w-6 h-6 text-indigo-500" />}
            isConnected={connectedSystems.some((s: any) => s.name === 'Ministry of Education')}
            isConnecting={connecting === 'Ministry of Education'}
            onConnect={() => handleConnect('Ministry of Education', 'Gov Scraper')}
          />
          <IntegrationCard 
            title="City News & Athletics"
            description="Monitor local news outlets and sports pages for mentions of your school. Suggests blog posts or banner alerts."
            icon={<Mail className="w-6 h-6 text-orange-500" />}
            isConnected={connectedSystems.some((s: any) => s.name === 'City News & Athletics')}
            isConnecting={connecting === 'City News & Athletics'}
            onConnect={() => handleConnect('City News & Athletics', 'News Scraper')}
          />
        </div>
      )}
    </div>
  );
}

function IntegrationCard({ title, description, icon, isConnected, isConnecting, onConnect }: any) {
  return (
    <div className="bg-white border text-left border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col h-full hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
          {icon}
        </div>
        {isConnected && (
          <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" /> Connected
          </span>
        )}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed mb-6 flex-1">{description}</p>
      
      {!isConnected ? (
        <button
          onClick={onConnect}
          disabled={isConnecting}
          className="w-full py-2.5 rounded-lg text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-600 rounded-full animate-spin" />
              Authenticating...
            </>
          ) : (
            'Connect System'
          )}
        </button>
      ) : (
        <button className="w-full py-2.5 rounded-lg text-sm font-bold text-slate-400 border border-slate-200 cursor-not-allowed">
          Manage Settings
        </button>
      )}
    </div>
  )
}
