'use client';

import { useState, useEffect } from 'react';
import TasksBoard from './components/TasksBoard';
import BibbyDashboard from './components/BibbyDashboard';
import ContentPipeline from './components/ContentPipeline';
import CalendarView from './components/CalendarView';
import QuickActions from './components/QuickActions';
import MemoryView from './components/MemoryView';
import TeamView from './components/TeamView';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">🚀</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Mission Control</h1>
                <p className="text-sm text-white/60">Bibby Command Center</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-sm">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-white/60 text-xs">
                {currentTime.toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2">
            {[
              { id: 'overview', label: '📊 Overview', icon: '📊' },
              { id: 'tasks', label: '✅ Tasks', icon: '✅' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'content', label: '📝 Content', icon: '📝' },
              { id: 'calendar', label: '📅 Calendar', icon: '📅' },
              { id: 'memory', label: '🧠 Memory', icon: '🧠' },
              { id: 'team', label: '👥 Team', icon: '👥' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-gray-900 shadow-lg'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <QuickActions />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <BibbyDashboard compact />
              <TasksBoard compact />
            </div>
          </div>
        )}
        
        {activeTab === 'tasks' && <TasksBoard />}
        {activeTab === 'analytics' && <BibbyDashboard />}
        {activeTab === 'content' && <ContentPipeline />}
        {activeTab === 'calendar' && <CalendarView />}
        {activeTab === 'memory' && <MemoryView />}
        {activeTab === 'team' && <TeamView />}
      </main>
    </div>
  );
}
