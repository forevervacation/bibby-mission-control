'use client';

import { useState, useEffect } from 'react';
import TasksBoard from './components/TasksBoard';
import BibbyDashboard from './components/BibbyDashboard';
import ContentPipeline from './components/ContentPipeline';
import CalendarView from './components/CalendarView';
import QuickActions from './components/QuickActions';
import MemoryView from './components/MemoryView';
import TeamView from './components/TeamView';
import AccessView from './components/AccessView';

export default function Home() {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: '📊 Overview', icon: '📊' },
    { id: 'tasks', label: '✅ Tasks', icon: '✅' },
    { id: 'analytics', label: '📈 Analytics', icon: '📈' },
    { id: 'content', label: '📝 Content', icon: '📝' },
    { id: 'calendar', label: '📅 Calendar', icon: '📅' },
    { id: 'memory', label: '🧠 Memory', icon: '🧠' },
    { id: 'team', label: '👥 Team', icon: '👥' },
    { id: 'access', label: '🔑 Access', icon: '🔑' },
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="text-3xl sm:text-4xl">🚀</div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">Mission Control</h1>
                <p className="text-xs sm:text-sm text-white/60">Bibby Command Center</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-white font-mono text-xs sm:text-sm">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-white/60 text-xs hidden sm:block">
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

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 py-2 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
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

      {/* Mobile Navigation */}
      <nav className="lg:hidden bg-black/10 backdrop-blur-sm border-b border-white/5">
        <div className="px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-white/10 rounded-lg text-white"
          >
            <span className="flex items-center space-x-2">
              <span>{tabs.find(t => t.id === activeTab)?.icon}</span>
              <span className="font-medium">{tabs.find(t => t.id === activeTab)?.label}</span>
            </span>
            <svg
              className={`w-5 h-5 transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {mobileMenuOpen && (
            <div className="mt-2 bg-black/20 backdrop-blur-md rounded-lg border border-white/10 overflow-hidden">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  className={`w-full px-4 py-3 text-left transition-colors border-b border-white/5 last:border-0 ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white font-medium'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="flex items-center space-x-3">
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {activeTab === 'overview' && (
          <div className="space-y-4 sm:space-y-6">
            <QuickActions />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
        {activeTab === 'access' && <AccessView />}
      </main>
    </div>
  );
}
