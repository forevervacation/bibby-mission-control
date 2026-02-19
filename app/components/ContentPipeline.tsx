'use client';

import { useState, useEffect } from 'react';
import ContentModal from './ContentModal';
import { supabase } from '@/lib/supabase';

interface Comment {
  author: string;
  text: string;
  timestamp: string;
}

interface ContentItem {
  id?: number;
  title: string;
  type: 'blog' | 'social' | 'video';
  stage: 'idea' | 'draft' | 'review' | 'published';
  assigned_to?: 'Ben' | 'Scotty';
  notes?: string;
  links?: string[];
  due_date?: string;
  comments?: Comment[];
}

export default function ContentPipeline() {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      // Use mock data if Supabase fails
      setContent([
        { id: 1, title: 'SEO Blog: AI Social Media Automation Guide', type: 'blog', stage: 'idea', assigned_to: 'Scotty' },
        { id: 2, title: 'LinkedIn Post: Bibby Launch Announcement', type: 'social', stage: 'draft', assigned_to: 'Scotty' },
        { id: 3, title: 'Blog: How to Save 10 Hours/Week with AI', type: 'blog', stage: 'idea', assigned_to: 'Scotty' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (contentItem: ContentItem) => {
    try {
      if (contentItem.id) {
        // Update existing
        const { error } = await supabase
          .from('content_items')
          .update({
            title: contentItem.title,
            type: contentItem.type,
            stage: contentItem.stage,
            assigned_to: contentItem.assigned_to,
            notes: contentItem.notes,
            links: contentItem.links,
            due_date: contentItem.due_date,
            comments: contentItem.comments,
            updated_at: new Date().toISOString(),
          })
          .eq('id', contentItem.id);

        if (error) throw error;
      } else {
        // Create new
        const { error } = await supabase
          .from('content_items')
          .insert([{
            title: contentItem.title,
            type: contentItem.type,
            stage: contentItem.stage,
            assigned_to: contentItem.assigned_to,
            notes: contentItem.notes,
            links: contentItem.links,
            due_date: contentItem.due_date,
            comments: contentItem.comments,
          }]);

        if (error) throw error;
      }

      fetchContent();
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Check console for details.');
    }
  };

  const handleDeleteContent = async (id: number) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchContent();
    } catch (error) {
      console.error('Error deleting content:', error);
    }
  };

  const openContentModal = (contentItem?: ContentItem) => {
    setSelectedContent(contentItem || null);
    setIsModalOpen(true);
  };

  const stages = [
    { id: 'idea', title: '💡 Ideas', color: 'border-yellow-500' },
    { id: 'draft', title: '✍️ Draft', color: 'border-blue-500' },
    { id: 'review', title: '👀 Review', color: 'border-purple-500' },
    { id: 'published', title: '🚀 Published', color: 'border-green-500' },
  ];

  const getTypeEmoji = (type: string) => {
    switch (type) {
      case 'blog': return '📝';
      case 'social': return '📱';
      case 'video': return '🎥';
      default: return '📄';
    }
  };

  const isOverdue = (dueDate?: string) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date();
  };

  const formatDueDate = (dueDate?: string) => {
    if (!dueDate) return null;
    const date = new Date(dueDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
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
          <h2 className="text-2xl font-bold text-white">Content Pipeline</h2>
          <button
            onClick={() => openContentModal()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all"
          >
            + New Content
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stages.map((stage) => {
            const stageContent = content.filter((c) => c.stage === stage.id);
            
            return (
              <div key={stage.id} className="space-y-3">
                <div className={`flex items-center space-x-2 border-b-2 ${stage.color} pb-2`}>
                  <h3 className="font-semibold text-white">{stage.title}</h3>
                  <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                    {stageContent.length}
                  </span>
                </div>
                
                <div className="space-y-2">
                  {stageContent.length === 0 ? (
                    <p className="text-white/40 text-sm italic text-center py-8">No content</p>
                  ) : (
                    stageContent.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openContentModal(item)}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 hover:scale-105 transition-all cursor-pointer border border-white/10 group"
                      >
                        <div className="flex items-start space-x-2">
                          <span className="text-2xl">{getTypeEmoji(item.type)}</span>
                          <div className="flex-1">
                            <p className="text-white text-sm font-medium leading-tight group-hover:text-purple-300 transition-colors">
                              {item.title}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {item.due_date && (
                                <span className={`text-xs px-2 py-0.5 rounded ${
                                  isOverdue(item.due_date) 
                                    ? 'bg-red-500/20 text-red-300' 
                                    : 'bg-blue-500/20 text-blue-300'
                                }`}>
                                  📅 {formatDueDate(item.due_date)}
                                </span>
                              )}
                              {item.links && item.links.length > 0 && (
                                <span className="text-blue-300 text-xs bg-blue-500/10 px-2 py-0.5 rounded">
                                  🔗 {item.links.length}
                                </span>
                              )}
                              {item.comments && item.comments.length > 0 && (
                                <span className="text-purple-300 text-xs bg-purple-500/10 px-2 py-0.5 rounded">
                                  💬 {item.comments.length}
                                </span>
                              )}
                            </div>
                            {item.assigned_to && (
                              <span className="inline-block mt-2 text-xs bg-white/10 text-white px-2 py-1 rounded">
                                {item.assigned_to}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <button
                    onClick={() => openContentModal({ title: '', type: 'blog', stage: stage.id as any, assigned_to: 'Scotty' } as ContentItem)}
                    className="w-full border-2 border-dashed border-white/20 hover:border-white/40 rounded-lg py-3 text-white/40 hover:text-white/60 text-sm transition-colors"
                  >
                    + Add
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Content Stats */}
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/60 text-xs uppercase">Total</p>
              <p className="text-white text-2xl font-bold mt-1">{content.length}</p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/60 text-xs uppercase">In Progress</p>
              <p className="text-white text-2xl font-bold mt-1">
                {content.filter(c => c.stage === 'draft' || c.stage === 'review').length}
              </p>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <p className="text-white/60 text-xs uppercase">Published</p>
              <p className="text-white text-2xl font-bold mt-1">
                {content.filter(c => c.stage === 'published').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ContentModal
        content={selectedContent || undefined}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContent(null);
        }}
        onSave={handleSaveContent}
        onDelete={handleDeleteContent}
      />
    </>
  );
}
