'use client';

import { useState } from 'react';

interface ContentItem {
  id: number;
  title: string;
  type: 'blog' | 'social' | 'video';
  stage: 'idea' | 'draft' | 'review' | 'published';
  assignedTo?: 'Ben' | 'Scotty';
}

export default function ContentPipeline() {
  const [content, setContent] = useState<ContentItem[]>([
    { id: 1, title: 'SEO Blog: AI Social Media Automation Guide', type: 'blog', stage: 'idea', assignedTo: 'Scotty' },
    { id: 2, title: 'LinkedIn Post: Bibby Launch Announcement', type: 'social', stage: 'draft', assignedTo: 'Scotty' },
    { id: 3, title: 'Blog: How to Save 10 Hours/Week with AI', type: 'blog', stage: 'idea', assignedTo: 'Scotty' },
  ]);

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

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Content Pipeline</h2>
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg transition-all">
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
                      className="bg-white/5 backdrop-blur-sm rounded-lg p-4 hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-2xl">{getTypeEmoji(item.type)}</span>
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium leading-tight">
                            {item.title}
                          </p>
                          {item.assignedTo && (
                            <span className="inline-block mt-2 text-xs bg-white/10 text-white px-2 py-1 rounded">
                              {item.assignedTo}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
  );
}
