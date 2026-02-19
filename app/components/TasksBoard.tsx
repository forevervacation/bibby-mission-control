'use client';

import { useState, useEffect } from 'react';
import TaskModal from './TaskModal';
import { supabase } from '@/lib/supabase';

interface Task {
  id?: number;
  title: string;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assigned_to?: 'Ben' | 'Scotty';
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  notes?: string;
  links?: string[];
}

export default function TasksBoard({ compact = false }: { compact?: boolean }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      // Use mock data if Supabase fails
      setTasks([
        { id: 1, title: 'Workspace setup complete', status: 'done', assigned_to: 'Scotty' },
        { id: 2, title: 'Telegram pairing complete', status: 'done', assigned_to: 'Scotty' },
        { id: 3, title: 'Mission control built', status: 'done', assigned_to: 'Scotty' },
        { id: 4, title: 'SEO blog strategy + first batch of articles', status: 'backlog', priority: 'High', assigned_to: 'Scotty' },
        { id: 5, title: 'Competitor analysis (Publer, Buffer AI, Lately)', status: 'backlog', priority: 'Medium', assigned_to: 'Scotty' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveTask = async (task: Task) => {
    try {
      if (task.id) {
        // Update existing task
        const { error } = await supabase
          .from('tasks')
          .update({
            title: task.title,
            description: task.description,
            priority: task.priority,
            assigned_to: task.assigned_to,
            status: task.status,
            notes: task.notes,
            links: task.links,
            updated_at: new Date().toISOString(),
          })
          .eq('id', task.id);

        if (error) throw error;
      } else {
        // Create new task
        const { error } = await supabase
          .from('tasks')
          .insert([{
            title: task.title,
            description: task.description,
            priority: task.priority,
            assigned_to: task.assigned_to,
            status: task.status,
            notes: task.notes,
            links: task.links,
          }]);

        if (error) throw error;
      }

      fetchTasks(); // Refresh the list
    } catch (error) {
      console.error('Error saving task:', error);
      alert('Failed to save task. Check console for details.');
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const openTaskModal = (task?: Task) => {
    setSelectedTask(task || null);
    setIsModalOpen(true);
  };

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

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className="h-40 bg-white/20 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Tasks Board</h2>
          {!compact && (
            <button
              onClick={() => openTaskModal()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all"
            >
              + Add Task
            </button>
          )}
        </div>
        
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
                        onClick={() => openTaskModal(task)}
                        className={`bg-white/5 backdrop-blur-sm rounded-lg p-3 border-l-4 ${getPriorityColor(task.priority)} hover:bg-white/10 hover:scale-105 transition-all cursor-pointer group`}
                      >
                        <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">
                          {task.title}
                        </p>
                        {task.description && !compact && (
                          <p className="text-white/60 text-xs mt-1 line-clamp-2">{task.description}</p>
                        )}
                        {task.links && task.links.length > 0 && (
                          <div className="mt-2">
                            <span className="text-blue-300 text-xs">🔗 {task.links.length} link(s)</span>
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-2">
                          {task.priority && (
                            <span className="text-xs text-white/60">
                              {task.priority}
                            </span>
                          )}
                          {task.assigned_to && (
                            <span className="text-xs bg-white/10 text-white px-2 py-0.5 rounded">
                              {task.assigned_to}
                            </span>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                  {!compact && (
                    <button
                      onClick={() => openTaskModal({ title: '', status: column.id as any, assigned_to: 'Scotty' } as Task)}
                      className="w-full border-2 border-dashed border-white/20 hover:border-white/40 rounded-lg py-3 text-white/40 hover:text-white/60 text-sm transition-colors"
                    >
                      + Add
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <TaskModal
        task={selectedTask || undefined}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </>
  );
}
