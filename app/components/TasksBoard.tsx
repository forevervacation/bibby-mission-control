'use client';

import { useState } from 'react';

interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assignedTo?: 'Ben' | 'Scotty';
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
}

export default function TasksBoard({ compact = false }: { compact?: boolean }) {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Workspace setup complete', status: 'done', assignedTo: 'Scotty' },
    { id: 2, title: 'Telegram pairing complete', status: 'done', assignedTo: 'Scotty' },
    { id: 3, title: 'Mission control structure built', status: 'done', assignedTo: 'Scotty' },
    { id: 4, title: 'SEO blog strategy + first batch of articles', status: 'backlog', priority: 'High', assignedTo: 'Scotty' },
    { id: 5, title: 'Competitor analysis (Publer, Buffer AI, Lately)', status: 'backlog', priority: 'Medium', assignedTo: 'Scotty' },
    { id: 6, title: 'Landing page copy tweaks for better conversion', status: 'backlog', priority: 'High', assignedTo: 'Scotty' },
  ]);

  const columns = compact 
    ? [
        { id: 'inProgress', title: '🔥 In Progress', color: 'border-orange-500' },
        { id: 'todo', title: '📋 To Do', color: 'border-blue-500' },
      ]
    : [
        { id: 'backlog', title: '📦 Backlog', color: 'border-gray-500' },
        { id: 'todo', title: '📋 To Do', color: 'border-blue-500' },
        { id: 'inProgress', title: '🔥 In Progress', color: 'border-orange-500' },
        { id: 'review', title: '👀 Review', color: 'border-purple-500' },
        { id: 'done', title: '✅ Done', color: 'border-green-500' },
      ];

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'High': return 'border-l-red-500';
      case 'Medium': return 'border-l-orange-500';
      case 'Low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <h2 className="text-2xl font-bold text-white mb-6">Tasks Board</h2>
      
      <div className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5'} gap-4`}>
        {columns.map((column) => {
          const columnTasks = tasks.filter((t) => t.status === column.id);
          
          return (
            <div key={column.id} className="space-y-3">
              <div className={`flex items-center space-x-2 border-b-2 ${column.color} pb-2`}>
                <h3 className="font-semibold text-white">{column.title}</h3>
                <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="space-y-2">
                {columnTasks.length === 0 ? (
                  <p className="text-white/40 text-sm italic text-center py-4">No tasks</p>
                ) : (
                  columnTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border-l-4 ${getPriorityColor(task.priority)} hover:bg-white/10 transition-colors cursor-pointer`}
                    >
                      <p className="text-white text-sm font-medium">{task.title}</p>
                      {task.description && (
                        <p className="text-white/60 text-xs mt-1">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        {task.priority && (
                          <span className="text-xs text-white/60">
                            {task.priority}
                          </span>
                        )}
                        {task.assignedTo && (
                          <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded">
                            {task.assignedTo}
                          </span>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {!compact && (
        <div className="mt-6 pt-6 border-t border-white/10">
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
            + Add New Task
          </button>
        </div>
      )}
    </div>
  );
}
