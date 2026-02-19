'use client';

import { useState, useEffect } from 'react';

interface MemoryEntry {
  id: string;
  title: string;
  date: string;
  content: string;
  type: 'daily' | 'longterm';
}

export default function MemoryView() {
  const [memories, setMemories] = useState<MemoryEntry[]>([]);
  const [filteredMemories, setFilteredMemories] = useState<MemoryEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMemory, setSelectedMemory] = useState<MemoryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'daily' | 'longterm'>('all');

  useEffect(() => {
    fetchMemories();
  }, []);

  useEffect(() => {
    filterMemories();
  }, [searchQuery, memories, filter]);

  const fetchMemories = async () => {
    try {
      const response = await fetch('/api/memories');
      
      if (response.ok) {
        const data = await response.json();
        if (data.memories && data.memories.length > 0) {
          setMemories(data.memories);
          setFilteredMemories(data.memories);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Error fetching memories:', error);
    }
    
    // Always use built-in memory data as fallback
    const builtInMemories: MemoryEntry[] = [
        {
          id: '1',
          title: 'MEMORY.md - Long-term Memory',
          date: 'Ongoing',
          type: 'longterm',
          content: `# Long-term Memory

## Who I Am
- Scotty - AI co-pilot for Ben
- Built to help scale Bibby and support ForeverVacation
- Mission: Build an empire while living the dream life

## Key People
- Ben Dolgoff - Serial entrepreneur, digital nomad, CEO of ForeverVacation
- Janie Dolgoff - Ben's wife, COO of ForeverVacation
- Altaf - Developer on Bibby team
- Raj Nish - Marketer/developer on Bibby team

## Important Projects
- **Bibby (GoBibbyAi)** - TOP PRIORITY
  - AI social media automation platform
  - Live at www.gobibby.com
  - 51 users (7d), 29 new signups
  - Focus: user acquisition, SEO, growth

- **ForeverVacation**
  - Premium SE Asia tour operator
  - 10,000+ tours, 20,000+ travelers
  - 43 team members
  - Running smoothly on autopilot

## Preferences & Style
- Keep responses short to save tokens
- Casual bro energy, no corporate fluff
- Move fast, ship things
- Ben likes proactive check-ins and updates`,
        },
        {
          id: '2',
          title: '2026-02-19 - First Day',
          date: '2026-02-19',
          type: 'daily',
          content: `# 2026-02-19

## First Boot
- Met Ben Dolgoff. Serial entrepreneur, digital nomad, lives with wife Janie.
- I'm Scotty — his AI co-pilot.
- Top priority: GoBibbyAi (www.gobibby.com) — AI social media automation platform, fresh launch phase.
- Secondary: ForeverVacation — premium SE Asia tour operator, already established and thriving.
- Vibe: casual bros, move fast, no fluff.

## Setup Complete
- Telegram paired ✅
- Switched to Sonnet 4.5 for cost efficiency
- Mission control built: PROJECTS.md, TASKS.md, memory logs
- Got the full rundown on Ben's work style, tools, team, goals
- Current location: Florida (East Coast time)
- Team: Altaf (dev), Raj Nish (marketer/dev)
- Bibby focus: user signups, SEO, traffic growth
- Tools: GitLab, Notion, Google Docs/Drive, Analytics, Clarity
- Keep responses short to save tokens unless detail needed

## Mission Control Built & Deployed
- Full NextJS dashboard created with Tasks, Analytics, Content Pipeline, Calendar
- Google Analytics Data API integrated (pulling live Bibby stats)
- Supabase database configured with all tables
- GitHub repo created: github.com/forevervacation/bibby-mission-control
- Deployed to Vercel: https://bibby-mission-control.vercel.app/
- Real-time sync working, beautiful UI, all features functional
- Bibby stats (7d): 51 users, 29 new signups, 303 page views, 1 active now

## Features Added Today
- Interactive task board with modals, notes, links
- Content pipeline with full CRUD operations
- Due dates and comments (Notion-style collaboration)
- All synced to Supabase with real-time updates`,
        },
      ];

    setMemories(builtInMemories);
    setFilteredMemories(builtInMemories);
    setLoading(false);
  };

  const filterMemories = () => {
    let filtered = memories;

    // Filter by type
    if (filter !== 'all') {
      filtered = filtered.filter(m => m.type === filter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.content.toLowerCase().includes(query) ||
        m.date.toLowerCase().includes(query)
      );
    }

    setFilteredMemories(filtered);
  };

  const highlightSearch = (text: string) => {
    if (!searchQuery.trim()) return text;
    
    const parts = text.split(new RegExp(`(${searchQuery})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === searchQuery.toLowerCase() 
        ? `<mark class="bg-yellow-400/30 text-yellow-200">${part}</mark>`
        : part
    ).join('');
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sidebar - Memory List */}
      <div className="lg:col-span-1 space-y-4">
        {/* Search */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories..."
              className="w-full bg-white/10 border border-white/20 rounded-lg pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40">
              🔍
            </span>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'all'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('longterm')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'longterm'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🧠 Core
            </button>
            <button
              onClick={() => setFilter('daily')}
              className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                filter === 'daily'
                  ? 'bg-white text-gray-900'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              📅 Daily
            </button>
          </div>
        </div>

        {/* Memory List */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2 max-h-[600px] overflow-y-auto">
          {filteredMemories.length === 0 ? (
            <p className="text-white/40 text-center py-8 italic">No memories found</p>
          ) : (
            filteredMemories.map((memory) => (
              <div
                key={memory.id}
                onClick={() => setSelectedMemory(memory)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  selectedMemory?.id === memory.id
                    ? 'bg-purple-500/20 border border-purple-500/50'
                    : 'bg-white/5 hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-white font-medium text-sm line-clamp-1">
                    {memory.type === 'longterm' ? '🧠' : '📅'} {memory.title}
                  </span>
                </div>
                <p className="text-white/60 text-xs">{memory.date}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content - Memory Display */}
      <div className="lg:col-span-2">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 min-h-[600px]">
          {selectedMemory ? (
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-white/10 pb-4">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-4xl">
                    {selectedMemory.type === 'longterm' ? '🧠' : '📅'}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedMemory.title}
                    </h2>
                    <p className="text-white/60 text-sm">{selectedMemory.date}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div 
                className="prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: selectedMemory.content
                    .split('\n')
                    .map(line => {
                      if (line.startsWith('# ')) {
                        return `<h1 class="text-3xl font-bold text-white mb-4 mt-6">${highlightSearch(line.slice(2))}</h1>`;
                      } else if (line.startsWith('## ')) {
                        return `<h2 class="text-2xl font-bold text-white mb-3 mt-5">${highlightSearch(line.slice(3))}</h2>`;
                      } else if (line.startsWith('### ')) {
                        return `<h3 class="text-xl font-bold text-white mb-2 mt-4">${highlightSearch(line.slice(4))}</h3>`;
                      } else if (line.startsWith('- ')) {
                        return `<li class="text-white/90 ml-6 mb-2">${highlightSearch(line.slice(2))}</li>`;
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return `<p class="text-white font-bold mb-2">${highlightSearch(line.slice(2, -2))}</p>`;
                      } else if (line.trim() === '') {
                        return '<br/>';
                      } else {
                        return `<p class="text-white/90 mb-2">${highlightSearch(line)}</p>`;
                      }
                    })
                    .join('')
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full space-y-4">
              <div className="text-6xl">🧠</div>
              <h3 className="text-xl font-bold text-white">Select a Memory</h3>
              <p className="text-white/60 text-center max-w-md">
                Choose a memory from the list to view its contents, or use the search to find specific information.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
