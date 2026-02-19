'use client';

import { useState, useEffect } from 'react';

interface Task {
  id?: number;
  title: string;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assignedTo?: 'Ben' | 'Scotty';
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  notes?: string;
  links?: string[];
}

interface TaskModalProps {
  task?: Task;
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  onDelete?: (id: number) => void;
}

export default function TaskModal({ task, isOpen, onClose, onSave, onDelete }: TaskModalProps) {
  const [formData, setFormData] = useState<Task>(
    task || {
      title: '',
      status: 'todo',
      priority: 'Medium',
      assignedTo: 'Scotty',
    }
  );
  const [newLink, setNewLink] = useState('');

  useEffect(() => {
    if (task) {
      setFormData(task);
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const addLink = () => {
    if (newLink.trim()) {
      setFormData({
        ...formData,
        links: [...(formData.links || []), newLink.trim()],
      });
      setNewLink('');
    }
  };

  const removeLink = (index: number) => {
    setFormData({
      ...formData,
      links: formData.links?.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h2 className="text-2xl font-bold text-white">
              {task ? 'Edit Task' : 'New Task'}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {/* Title */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter task title..."
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Add a description..."
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Notes & Details
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={4}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Add notes, updates, or details..."
            />
          </div>

          {/* Links */}
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Links & Resources
            </label>
            <div className="space-y-2">
              {formData.links?.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 bg-white/5 rounded-lg p-2">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-blue-300 hover:text-blue-200 text-sm truncate"
                  >
                    🔗 {link}
                  </a>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-white/60 hover:text-red-400 text-sm"
                  >
                    ✕
                  </button>
                </div>
              ))}
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={newLink}
                  onChange={(e) => setNewLink(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLink())}
                  className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                  placeholder="Paste a link..."
                />
                <button
                  type="button"
                  onClick={addLink}
                  className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="backlog">📦 Backlog</option>
                <option value="todo">📋 To Do</option>
                <option value="inProgress">🔥 In Progress</option>
                <option value="review">👀 Review</option>
                <option value="done">✅ Done</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Priority
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟠 Medium</option>
                <option value="Low">🔵 Low</option>
              </select>
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Assigned To
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value as any })}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="Ben">👤 Ben</option>
                <option value="Scotty">🤖 Scotty</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div>
              {task && onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Delete this task?')) {
                      onDelete(task.id!);
                      onClose();
                    }
                  }}
                  className="text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  Delete Task
                </button>
              )}
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 text-white/80 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2 rounded-lg font-medium shadow-lg transition-all"
              >
                {task ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
