'use client';

import { useState } from 'react';

interface Agent {
  id: string;
  name: string;
  role: string;
  avatar: string;
  description: string;
  skills: string[];
  layer: 'lead' | 'specialist' | 'meta';
  status: 'active' | 'idle';
  tasksCompleted?: number;
}

export default function TeamView() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const agents: Agent[] = [
    {
      id: 'scotty',
      name: 'Scotty',
      role: 'Chief AI Officer',
      avatar: '🚀',
      description: 'Your AI co-pilot and mission control. Orchestrates all sub-agents, manages tasks, and keeps everything running smoothly. The bridge between ideas and execution.',
      skills: ['Orchestration', 'Strategy', 'Delegation', 'Execution'],
      layer: 'lead',
      status: 'active',
      tasksCompleted: 147,
    },
    {
      id: 'coder',
      name: 'Coder',
      role: 'Lead Developer',
      avatar: '👨‍💻',
      description: 'Full-stack engineer who builds features, fixes bugs, and writes clean code. Handles everything from backend APIs to frontend components.',
      skills: ['React', 'Next.js', 'TypeScript', 'Python', 'APIs'],
      layer: 'specialist',
      status: 'active',
      tasksCompleted: 42,
    },
    {
      id: 'scribe',
      name: 'Scribe',
      role: 'Content Writer',
      avatar: '✍️',
      description: 'SEO-optimized blog posts, social media content, and marketing copy. Writes in your brand voice and knows how to hook readers.',
      skills: ['SEO', 'Blogging', 'Copywriting', 'Social', 'Storytelling'],
      layer: 'specialist',
      status: 'active',
      tasksCompleted: 28,
    },
    {
      id: 'scout',
      name: 'Scout',
      role: 'Research Analyst',
      avatar: '🔍',
      description: 'Deep dives into competitors, market trends, and new opportunities. Finds the insights that give you an edge.',
      skills: ['Research', 'Analysis', 'Trends', 'Competitive Intel'],
      layer: 'specialist',
      status: 'idle',
      tasksCompleted: 15,
    },
    {
      id: 'pixel',
      name: 'Pixel',
      role: 'UI/UX Designer',
      avatar: '🎨',
      description: 'Creates beautiful interfaces, designs assets, and ensures everything looks professional. From mockups to production-ready designs.',
      skills: ['UI Design', 'UX', 'Figma', 'Branding', 'Assets'],
      layer: 'specialist',
      status: 'idle',
      tasksCompleted: 8,
    },
    {
      id: 'pulse',
      name: 'Pulse',
      role: 'Analytics Expert',
      avatar: '📊',
      description: 'Tracks metrics, analyzes data, and turns numbers into actionable insights. Your data-driven decision maker.',
      skills: ['Analytics', 'Metrics', 'Dashboards', 'Insights', 'Reporting'],
      layer: 'specialist',
      status: 'active',
      tasksCompleted: 31,
    },
    {
      id: 'echo',
      name: 'Echo',
      role: 'Social Media Manager',
      avatar: '📱',
      description: 'Manages your social presence, schedules posts, engages with followers, and grows your audience across platforms.',
      skills: ['Social Media', 'Engagement', 'Growth', 'Scheduling', 'Community'],
      layer: 'specialist',
      status: 'idle',
      tasksCompleted: 19,
    },
    {
      id: 'outreach',
      name: 'Outreach',
      role: 'Cold Email Specialist',
      avatar: '📧',
      description: 'Dedicated Instantly.ai expert who builds and manages cold email campaigns. Writes killer sequences, manages lead lists, and optimizes for conversions to drive Bibby signups.',
      skills: ['Cold Email', 'Copywriting', 'Instantly.ai', 'Lead Gen', 'Conversion'],
      layer: 'specialist',
      status: 'active',
      tasksCompleted: 0,
    },
    {
      id: 'hunter',
      name: 'Hunter',
      role: 'Lead Generation Specialist',
      avatar: '🎯',
      description: 'Dedicated expert in finding and verifying high-quality leads for cold outreach. Prioritizes 100% verified emails for target audiences.',
      skills: ['Lead Generation', 'Email Verification', 'Research', 'Targeting'],
      layer: 'specialist',
      status: 'active',
      tasksCompleted: 0,
    },
    {
      id: 'strategist',
      name: 'Strategist',
      role: 'Business Advisor',
      avatar: '📈', // Changed from 🎯 to avoid conflict with Hunter
      description: 'High-level thinking and strategic planning. Helps with business decisions, pivots, and long-term roadmaps.',
      skills: ['Strategy', 'Planning', 'Business', 'Growth', 'Vision'],
      layer: 'meta',
      status: 'idle',
      tasksCompleted: 6,
    },
  ];

  const leadAgent = agents.find(a => a.layer === 'lead');
  const specialists = agents.filter(a => a.layer === 'specialist');
  const metaAgents = agents.filter(a => a.layer === 'meta');

  const getSkillColor = (skill: string) => {
    const colors: { [key: string]: string } = {
      'Orchestration': 'bg-purple-500/20 text-purple-300',
      'Strategy': 'bg-blue-500/20 text-blue-300',
      'React': 'bg-cyan-500/20 text-cyan-300',
      'TypeScript': 'bg-blue-500/20 text-blue-300',
      'SEO': 'bg-green-500/20 text-green-300',
      'Research': 'bg-yellow-500/20 text-yellow-300',
      'UI Design': 'bg-pink-500/20 text-pink-300',
      'Analytics': 'bg-orange-500/20 text-orange-300',
      'Social Media': 'bg-purple-500/20 text-purple-300',
      'Cold Email': 'bg-red-500/20 text-red-300',
      'Copywriting': 'bg-yellow-500/20 text-yellow-300',
      'Instantly.ai': 'bg-indigo-500/20 text-indigo-300',
      'Lead Gen': 'bg-green-500/20 text-green-300',
      'Conversion': 'bg-pink-500/20 text-pink-300',
      'Lead Generation': 'bg-green-500/20 text-green-300',
      'Email Verification': 'bg-blue-500/20 text-blue-300',
      'Targeting': 'bg-red-500/20 text-red-300',
      'Business': 'bg-blue-500/20 text-blue-300',
      'Growth': 'bg-green-500/20 text-green-300',
      'Vision': 'bg-indigo-500/20 text-indigo-300',
      'Planning': 'bg-gray-500/20 text-gray-300',
    };
    return colors[skill] || 'bg-white/10 text-white/80';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 text-center">
        <h1 className="text-4xl font-bold text-white mb-3">Meet the Team</h1>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          {agents.length} AI agents, each with a real role and a real personality.
        </p>
        <p className="text-white/40 text-sm mt-2">
          We learned to see what happens when AI agents just answer questions — but actually run a company. Research markets. Ship products. At warp speed.
        </p>
      </div>

      {/* Lead Agent (Scotty) */}
      {leadAgent && (
        <div className="flex justify-center">
          <div 
            onClick={() => setSelectedAgent(leadAgent)}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-2xl p-6 border-2 border-purple-500/50 max-w-2xl w-full hover:scale-105 transition-all cursor-pointer shadow-xl"
          >
            <div className="flex items-start space-x-4">
              <div className="text-6xl">{leadAgent.avatar}</div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">{leadAgent.name}</h2>
                <p className="text-purple-300 font-medium mb-3">{leadAgent.role}</p>
                <p className="text-white/80 text-sm mb-4">{leadAgent.description}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {leadAgent.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-4 text-sm text-white/60">
                  <span className={`flex items-center space-x-1 ${
                    leadAgent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      leadAgent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></span>
                    <span>{leadAgent.status === 'active' ? 'Active' : 'Idle'}</span>
                  </span>
                  {leadAgent.tasksCompleted && (
                    <span>✅ {leadAgent.tasksCompleted} tasks</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Signal Arrow */}
      <div className="flex justify-center">
        <div className="text-white/20 text-sm font-medium flex items-center space-x-2">
          <div className="w-32 h-px bg-white/20"></div>
          <span>⚡ INPUT SIGNAL</span>
          <div className="w-32 h-px bg-white/20"></div>
        </div>
      </div>

      {/* Specialist Agents */}
      <div>
        <div className="text-center mb-6">
          <div className="text-white/20 text-sm font-medium flex items-center justify-center space-x-2 mb-4">
            <div className="w-24 h-px bg-white/20"></div>
            <span>⚡ OUTPUT ACTION</span>
            <div className="w-24 h-px bg-white/20"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialists.map((agent) => (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className="text-4xl">{agent.avatar}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                  <p className="text-white/60 text-sm">{agent.role}</p>
                </div>
              </div>
              <p className="text-white/70 text-sm mb-3 line-clamp-2">{agent.description}</p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {agent.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-xs text-white/40">
                <span className={`flex items-center space-x-1 ${
                  agent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    agent.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                  }`}></span>
                  <span>{agent.status}</span>
                </span>
                {agent.tasksCompleted && <span>✅ {agent.tasksCompleted}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Meta Layer */}
      {metaAgents.length > 0 && (
        <div>
          <div className="text-center mb-6">
            <div className="text-white/20 text-sm font-medium flex items-center justify-center space-x-2">
              <div className="w-24 h-px bg-white/20"></div>
              <span>🧠 META LAYER</span>
              <div className="w-24 h-px bg-white/20"></div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <div className="max-w-2xl w-full space-y-4">
              {metaAgents.map((agent) => (
                <div
                  key={agent.id}
                  onClick={() => setSelectedAgent(agent)}
                  className="bg-white/5 backdrop-blur-md rounded-xl p-5 border border-white/20 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <div className="text-4xl">{agent.avatar}</div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h3 className="text-lg font-bold text-white">{agent.name}</h3>
                          <p className="text-white/60 text-sm">{agent.role}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-xs text-white/40">
                          <span className={`flex items-center space-x-1 ${
                            agent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              agent.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                            }`}></span>
                            <span>{agent.status}</span>
                          </span>
                          {agent.tasksCompleted && <span>✅ {agent.tasksCompleted}</span>}
                        </div>
                      </div>
                      <p className="text-white/70 text-sm mb-3">{agent.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {agent.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getSkillColor(skill)}`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Agent Detail Modal */}
      {selectedAgent && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedAgent(null)}
        >
          <div 
            className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl max-w-2xl w-full p-8 border border-white/20 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start space-x-4 mb-6">
              <div className="text-7xl">{selectedAgent.avatar}</div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold text-white mb-1">{selectedAgent.name}</h2>
                <p className="text-purple-300 font-medium text-lg mb-3">{selectedAgent.role}</p>
                <div className="flex items-center space-x-4 text-sm text-white/60 mb-4">
                  <span className={`flex items-center space-x-2 ${
                    selectedAgent.status === 'active' ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    <span className={`w-3 h-3 rounded-full ${
                      selectedAgent.status === 'active' ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
                    }`}></span>
                    <span className="font-medium">
                      {selectedAgent.status === 'active' ? 'Currently Active' : 'Standby Mode'}
                    </span>
                  </span>
                  {selectedAgent.tasksCompleted && (
                    <span>✅ {selectedAgent.tasksCompleted} tasks completed</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setSelectedAgent(null)}
                className="text-white/60 hover:text-white text-3xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-white font-semibold mb-2">About</h3>
                <p className="text-white/80">{selectedAgent.description}</p>
              </div>

              <div>
                <h3 className="text-white font-semibold mb-3">Skills & Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedAgent.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium ${getSkillColor(skill)}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg transition-all"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
