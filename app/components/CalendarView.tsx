'use client';

import { useState, useEffect } from 'react';

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  nextRun: string;
  type: 'analytics' | 'brief' | 'research' | 'reminder' | 'system';
  status: 'active' | 'paused';
  description?: string;
}

export default function CalendarView() {
  const [jobs, setJobs] = useState<CronJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'week' | 'list'>('week');

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/cron-jobs');
      const data = await response.json();
      setJobs(data.jobs || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cron jobs:', error);
      setLoading(false);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'analytics': return 'bg-blue-500/20 border-blue-500/50 text-blue-300';
      case 'brief': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case 'research': return 'bg-purple-500/20 border-purple-500/50 text-purple-300';
      case 'reminder': return 'bg-green-500/20 border-green-500/50 text-green-300';
      case 'system': return 'bg-gray-500/20 border-gray-500/50 text-gray-300';
      default: return 'bg-white/10 border-white/30 text-white';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'analytics': return '📊';
      case 'brief': return '📋';
      case 'research': return '🔍';
      case 'reminder': return '🔔';
      case 'system': return '⚙️';
      default: return '📅';
    }
  };

  const getWeekDays = () => {
    const today = new Date();
    const days = [];
    const currentDay = today.getDay();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - currentDay + i);
      days.push(date);
    }
    
    return days;
  };

  const getJobsForDay = (date: Date) => {
    return jobs.filter(job => {
      const nextRun = new Date(job.nextRun);
      return nextRun.toDateString() === date.toDateString();
    });
  };

  const getAlwaysRunningJobs = () => {
    return jobs.filter(job => 
      job.schedule.includes('every') && 
      (job.schedule.includes('minute') || job.schedule.includes('hour'))
    );
  };

  const getUpcomingJobs = () => {
    const now = new Date();
    return jobs
      .filter(job => new Date(job.nextRun) > now)
      .sort((a, b) => new Date(a.nextRun).getTime() - new Date(b.nextRun).getTime())
      .slice(0, 5);
  };

  const formatTimeUntil = (dateStr: string) => {
    const now = new Date();
    const target = new Date(dateStr);
    const diffMs = target.getTime() - now.getTime();
    
    if (diffMs < 0) return 'overdue';
    
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffMins < 60) return `in ${diffMins}m`;
    if (diffHours < 24) return `in ${diffHours}h`;
    return `in ${diffDays}d`;
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-white/20 rounded w-48"></div>
          <div className="h-64 bg-white/20 rounded"></div>
        </div>
      </div>
    );
  }

  const weekDays = getWeekDays();
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Scheduled Tasks</h2>
            <p className="text-white/60 text-sm">Scotty's automated routines</p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setView('week')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'week'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              Week
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                view === 'list'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Always Running Section */}
      {getAlwaysRunningJobs().length > 0 && (
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
            <span>⚡</span>
            <span>Always Running</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {getAlwaysRunningJobs().map((job) => (
              <div
                key={job.id}
                className={`${getTypeColor(job.type)} rounded-lg p-3 border`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xl">{getTypeEmoji(job.type)}</span>
                  <span className="font-medium text-sm">{job.name}</span>
                </div>
                <p className="text-xs opacity-80">{job.schedule}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === 'week' ? (
        /* Weekly Calendar View */
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((date, index) => {
              const isToday = date.toDateString() === new Date().toDateString();
              const dayJobs = getJobsForDay(date);
              
              return (
                <div key={index} className="space-y-2">
                  <div className={`text-center pb-2 border-b ${
                    isToday ? 'border-purple-500' : 'border-white/10'
                  }`}>
                    <div className={`text-sm font-medium ${
                      isToday ? 'text-purple-300' : 'text-white/60'
                    }`}>
                      {dayNames[date.getDay()]}
                    </div>
                    <div className={`text-2xl font-bold ${
                      isToday ? 'text-white' : 'text-white/80'
                    }`}>
                      {date.getDate()}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    {dayJobs.length === 0 ? (
                      <div className="text-white/30 text-xs text-center py-4 italic">
                        No tasks
                      </div>
                    ) : (
                      dayJobs.map((job) => (
                        <div
                          key={job.id}
                          className={`${getTypeColor(job.type)} rounded-lg p-2 border text-xs cursor-pointer hover:scale-105 transition-transform`}
                          title={job.description}
                        >
                          <div className="font-medium mb-1 line-clamp-2">{job.name}</div>
                          <div className="opacity-80">{formatTime(job.nextRun)}</div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* List View */
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getTypeEmoji(job.type)}</span>
                    <div className="flex-1">
                      <h4 className="text-white font-medium mb-1">{job.name}</h4>
                      {job.description && (
                        <p className="text-white/60 text-sm mb-2">{job.description}</p>
                      )}
                      <div className="flex items-center space-x-4 text-xs text-white/60">
                        <span>📅 {job.schedule}</span>
                        <span>⏰ Next: {formatTime(job.nextRun)}</span>
                      </div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                    {job.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Next Up Section */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
          <span>⏭️</span>
          <span>Next Up</span>
        </h3>
        <div className="space-y-2">
          {getUpcomingJobs().map((job) => (
            <div
              key={job.id}
              className="flex items-center justify-between bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{getTypeEmoji(job.type)}</span>
                <span className="text-white font-medium text-sm">{job.name}</span>
              </div>
              <span className="text-white/60 text-sm">{formatTimeUntil(job.nextRun)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
