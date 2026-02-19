'use client';

import { useState } from 'react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'task' | 'meeting' | 'deadline' | 'reminder';
  assignedTo?: 'Ben' | 'Scotty';
}

export default function CalendarView() {
  const [events, setEvents] = useState<CalendarEvent[]>([
    { id: 1, title: 'Blog post deadline: AI Automation Guide', date: '2026-02-21', time: '5:00 PM', type: 'deadline', assignedTo: 'Scotty' },
    { id: 2, title: 'Check Bibby signups', date: '2026-02-20', time: '9:00 AM', type: 'task', assignedTo: 'Scotty' },
    { id: 3, title: 'Weekly marketing review', date: '2026-02-22', time: '2:00 PM', type: 'meeting', assignedTo: 'Ben' },
  ]);

  const today = new Date();
  const upcomingEvents = events
    .filter(e => new Date(e.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'task': return 'bg-blue-500';
      case 'meeting': return 'bg-purple-500';
      case 'deadline': return 'bg-red-500';
      case 'reminder': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'task': return '✅';
      case 'meeting': return '👥';
      case 'deadline': return '⏰';
      case 'reminder': return '🔔';
      default: return '📅';
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Calendar & Schedule</h2>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all">
          + Add Event
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="space-y-4">
        <h3 className="text-white font-semibold mb-3">📅 Upcoming Events</h3>
        
        {upcomingEvents.length === 0 ? (
          <p className="text-white/40 text-center py-12 italic">No upcoming events</p>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className={`${getTypeColor(event.type)} text-white text-2xl w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {getTypeEmoji(event.type)}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{event.title}</h4>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-white/60">
                      <span>📅 {formatDate(event.date)}</span>
                      <span>🕐 {event.time}</span>
                      {event.assignedTo && (
                        <span className="bg-white/10 text-white px-2 py-0.5 rounded">
                          {event.assignedTo}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-4 gap-3">
          {['task', 'meeting', 'deadline', 'reminder'].map((type) => {
            const count = events.filter(e => e.type === type).length;
            return (
              <div key={type} className="bg-white/5 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">{getTypeEmoji(type)}</div>
                <p className="text-white text-xl font-bold">{count}</p>
                <p className="text-white/60 text-xs capitalize">{type}s</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
