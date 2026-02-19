'use client';

import { useState } from 'react';

interface AccessItem {
  id: string;
  name: string;
  icon: string;
  status: 'connected' | 'needed' | 'planned';
  category: 'infrastructure' | 'analytics' | 'development' | 'communication' | 'payment' | 'marketing';
  details: {
    label: string;
    value: string;
    masked?: boolean;
  }[];
  connectedDate?: string;
  description?: string;
}

export default function AccessView() {
  const [filter, setFilter] = useState<'all' | 'connected' | 'needed'>('all');

  const accessItems: AccessItem[] = [
    {
      id: 'supabase',
      name: 'Supabase',
      icon: '🗄️',
      status: 'connected',
      category: 'infrastructure',
      connectedDate: '2026-02-19',
      description: 'Real-time database for tasks, content, calendar events',
      details: [
        { label: 'Project URL', value: 'https://gudlagwcivsngddpoekf.supabase.co' },
        { label: 'Project ID', value: 'gudlagwcivsngddpoekf' },
        { label: 'Anon Key', value: 'eyJhbGciOiJIUzI1NiIs...', masked: true },
        { label: 'Tables', value: 'tasks, content_items, calendar_events' },
      ],
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      icon: '📊',
      status: 'connected',
      category: 'analytics',
      connectedDate: '2026-02-19',
      description: 'Live Bibby user metrics, traffic, and engagement data',
      details: [
        { label: 'Property ID', value: '514974974' },
        { label: 'Service Account', value: 'ben-s-openclaw-scotty@octopost-ai.iam.gserviceaccount.com' },
        { label: 'Tracking', value: 'Real-time users, sessions, page views, traffic sources' },
      ],
    },
    {
      id: 'search-console',
      name: 'Google Search Console',
      icon: '🔍',
      status: 'connected',
      category: 'analytics',
      connectedDate: '2026-02-19',
      description: 'SEO metrics, search queries, keyword rankings, and CTR data',
      details: [
        { label: 'Property', value: 'sc-domain:gobibby.com' },
        { label: 'Service Account', value: 'ben-s-openclaw-scotty@octopost-ai.iam.gserviceaccount.com' },
        { label: 'Tracking', value: 'Search queries, impressions, clicks, CTR, position' },
        { label: 'Key Insight', value: '"bibby ai" ranks at position #3!' },
      ],
    },
    {
      id: 'vercel',
      name: 'Vercel',
      icon: '▲',
      status: 'connected',
      category: 'infrastructure',
      connectedDate: '2026-02-19',
      description: 'Mission Control hosting and deployment',
      details: [
        { label: 'Project', value: 'bibby-mission-control' },
        { label: 'Live URL', value: 'https://bibby-mission-control.vercel.app/' },
        { label: 'Deployment', value: 'Auto-deploy from GitHub main branch' },
      ],
    },
    {
      id: 'github',
      name: 'GitHub',
      icon: '🐙',
      status: 'connected',
      category: 'development',
      connectedDate: '2026-02-19',
      description: 'Source code repository for Mission Control',
      details: [
        { label: 'Repository', value: 'forevervacation/bibby-mission-control' },
        { label: 'URL', value: 'https://github.com/forevervacation/bibby-mission-control' },
        { label: 'Access', value: 'Full read/write via personal access token', masked: true },
      ],
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: '✈️',
      status: 'connected',
      category: 'communication',
      connectedDate: '2026-02-19',
      description: 'Direct messaging and notifications',
      details: [
        { label: 'Bot Token', value: 'Connected', masked: true },
        { label: 'Paired User', value: 'Ben Dolgoff (ID: 455588545)' },
        { label: 'Status', value: 'Active - DM enabled' },
      ],
    },
    {
      id: 'workspace',
      name: 'OpenClaw Workspace',
      icon: '📁',
      status: 'connected',
      category: 'infrastructure',
      connectedDate: '2026-02-19',
      description: 'File system access for memory, tasks, and workspace files',
      details: [
        { label: 'Path', value: '/data/.openclaw/workspace' },
        { label: 'Files', value: 'MEMORY.md, memory/*.md, TASKS.md, PROJECTS.md' },
        { label: 'Permissions', value: 'Full read/write' },
      ],
    },
    {
      id: 'google-drive',
      name: 'Google Drive',
      icon: '📄',
      status: 'connected',
      category: 'infrastructure',
      connectedDate: '2026-02-19',
      description: 'Document creation and storage for deliverables',
      details: [
        { label: 'Shared Folder', value: 'Scotty (OpenClaw) - Work Docs' },
        { label: 'Folder ID', value: '1TJAbzJqH3_ml_pFRF1NJxCtj8P5uN4dE' },
        { label: 'Service Account', value: 'ben-s-openclaw-scotty@octopost-ai.iam.gserviceaccount.com' },
        { label: 'Permissions', value: 'Editor - Can create & edit documents' },
        { label: 'Note', value: 'Docs API enabled, storage quota needs increase' },
      ],
    },
    {
      id: 'stripe',
      name: 'Stripe',
      icon: '💳',
      status: 'needed',
      category: 'payment',
      description: 'Payment processing and paid subscriber tracking',
      details: [
        { label: 'Status', value: 'Not connected' },
        { label: 'Needed for', value: 'Tracking paid users, MRR, subscription metrics' },
        { label: 'Priority', value: 'When monetization scales' },
      ],
    },
    {
      id: 'sendgrid',
      name: 'SendGrid / Email Service',
      icon: '📧',
      status: 'planned',
      category: 'marketing',
      description: 'Transactional emails and drip campaigns',
      details: [
        { label: 'Status', value: 'Not connected' },
        { label: 'Use case', value: 'Welcome emails, newsletters, drip sequences' },
        { label: 'Priority', value: 'Medium' },
      ],
    },
    {
      id: 'social-apis',
      name: 'Social Media APIs',
      icon: '📱',
      status: 'planned',
      category: 'marketing',
      description: 'Direct posting and analytics for social platforms',
      details: [
        { label: 'Platforms', value: 'Facebook, Instagram, X (Twitter), LinkedIn' },
        { label: 'Use case', value: 'Auto-posting, engagement tracking' },
        { label: 'Priority', value: 'Low (Bibby handles this)' },
      ],
    },
    {
      id: 'clarity',
      name: 'Microsoft Clarity',
      icon: '🔍',
      status: 'planned',
      category: 'analytics',
      description: 'Heatmaps and session recordings for Bibby',
      details: [
        { label: 'Status', value: 'Not connected to API' },
        { label: 'Use case', value: 'Pull heatmap insights automatically' },
        { label: 'Priority', value: 'Low' },
      ],
    },
  ];

  const filteredItems = accessItems.filter(item => {
    if (filter === 'connected') return item.status === 'connected';
    if (filter === 'needed') return item.status === 'needed' || item.status === 'planned';
    return true;
  });

  const connectedCount = accessItems.filter(i => i.status === 'connected').length;
  const neededCount = accessItems.filter(i => i.status === 'needed' || i.status === 'planned').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-green-500/20 text-green-300 border-green-500/50';
      case 'needed':
        return 'bg-red-500/20 text-red-300 border-red-500/50';
      case 'planned':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/50';
      default:
        return 'bg-white/10 text-white/80';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'infrastructure': return '🏗️';
      case 'analytics': return '📊';
      case 'development': return '👨‍💻';
      case 'communication': return '💬';
      case 'payment': return '💳';
      case 'marketing': return '📢';
      default: return '🔧';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Access & Integrations</h1>
            <p className="text-white/60">Everything Scotty has access to and what's needed next</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Connected</p>
            <p className="text-white text-3xl font-bold">{connectedCount}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Needed</p>
            <p className="text-white text-3xl font-bold">{neededCount}</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-white/60 text-xs uppercase tracking-wide mb-1">Total</p>
            <p className="text-white text-3xl font-bold">{accessItems.length}</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex space-x-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'all'
              ? 'bg-white text-gray-900'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          All ({accessItems.length})
        </button>
        <button
          onClick={() => setFilter('connected')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'connected'
              ? 'bg-white text-gray-900'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          ✅ Connected ({connectedCount})
        </button>
        <button
          onClick={() => setFilter('needed')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            filter === 'needed'
              ? 'bg-white text-gray-900'
              : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
          }`}
        >
          🔴 Needed ({neededCount})
        </button>
      </div>

      {/* Access Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/[0.12] transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className="text-5xl">{item.icon}</div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-2xl font-bold text-white">{item.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusBadge(item.status)}`}>
                      {item.status === 'connected' ? '✅ Connected' : item.status === 'needed' ? '🔴 Needed' : '📋 Planned'}
                    </span>
                    <span className="text-white/40 text-sm">{getCategoryIcon(item.category)} {item.category}</span>
                  </div>
                  {item.description && (
                    <p className="text-white/70 mb-3">{item.description}</p>
                  )}
                  {item.connectedDate && (
                    <p className="text-white/40 text-sm">Connected: {item.connectedDate}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              {item.details.map((detail, idx) => (
                <div key={idx} className="flex items-start justify-between py-2 border-b border-white/5 last:border-0">
                  <span className="text-white/60 text-sm font-medium">{detail.label}</span>
                  <span className={`text-white text-sm text-right max-w-md ${detail.masked ? 'font-mono' : ''}`}>
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
