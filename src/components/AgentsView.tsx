import { useState } from 'react';
import { Bot, Radar, Search, Plus, Trash2 } from 'lucide-react';

export function AgentsView({ agents, setAgents }: { agents: any[], setAgents: any }) {
  const [newTopic, setNewTopic] = useState('');
  const [activeAgentId, setActiveAgentId] = useState<number>(agents[0]?.id || 1);

  const activeAgent = agents.find(a => a.id === activeAgentId);

  const handleAddTopic = () => {
    if (!newTopic.trim() || !activeAgent) return;
    setAgents(agents.map(a => {
      if (a.id === activeAgentId) {
        return { ...a, topics: [...a.topics, newTopic.trim()] };
      }
      return a;
    }));
    setNewTopic('');
  };

  const handleRemoveTopic = (topicToRemove: string) => {
    setAgents(agents.map(a => {
      if (a.id === activeAgentId) {
        return { ...a, topics: a.topics.filter((t: string) => t !== topicToRemove) };
      }
      return a;
    }));
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500 flex flex-col md:flex-row gap-8">
      
      {/* Left Column: Agent List */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Web Agents</h1>
          <p className="text-sm text-slate-500">Configure what your AI agents look for on external websites.</p>
        </div>

        <div className="space-y-2 mt-6">
          {agents.map(agent => (
            <button
              key={agent.id}
              onClick={() => setActiveAgentId(agent.id)}
              className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors ${activeAgentId === agent.id ? 'bg-indigo-50 border border-indigo-200 shadow-sm' : 'bg-white border border-slate-200 hover:bg-slate-50'} `}
            >
              <div className={`p-2 rounded-lg ${agent.iconType === 'radar' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                {agent.iconType === 'radar' ? <Radar className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">{agent.name}</div>
                <div className="text-xs text-slate-500 truncate max-w-[140px]">{agent.target}</div>
              </div>
            </button>
          ))}
          <button className="w-full p-3 rounded-xl flex items-center justify-center gap-2 border border-dashed border-slate-300 text-slate-500 hover:bg-slate-50 transition-colors text-sm font-bold">
            <Plus className="w-4 h-4" /> New Agent
          </button>
        </div>
      </div>

      {/* Right Column: Agent Configuration */}
      {activeAgent && (
        <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col">
          <div className="border-b border-slate-100 pb-6 mb-6">
             <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${activeAgent.iconType === 'radar' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'}`}>
                  {activeAgent.iconType === 'radar' ? <Radar className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{activeAgent.name}</h2>
                  <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    {activeAgent.status}
                  </div>
                </div>
             </div>
          </div>

          <div className="space-y-8 flex-1">
            
            {/* Target Sites */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Target Websites</h3>
              <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <Search className="w-5 h-5 text-slate-400" />
                <input 
                  type="text" 
                  defaultValue={activeAgent.target} 
                  className="bg-transparent border-none flex-1 text-slate-800 font-medium focus:outline-none"
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">The exact URLs or domains this agent will scrape periodically.</p>
            </div>

            {/* Topics / Keywords */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">Monitored Topics</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {activeAgent.topics.map((topic: string) => (
                  <div key={topic} className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 text-indigo-800 px-3 py-1.5 rounded-lg text-sm font-medium">
                    {topic}
                    <button onClick={() => handleRemoveTopic(topic)} className="hover:text-indigo-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAddTopic()}
                  placeholder="e.g. University Administration, Security Alerts..."
                  className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none"
                />
                <button 
                  onClick={handleAddTopic}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
