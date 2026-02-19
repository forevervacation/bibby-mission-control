'use client';

import { useState, useEffect } from 'react';

interface AnalyticsData {
  activeUsers: number;
  totalUsers: number;
  newUsers: number;
  sessions: number;
  pageViews: number;
  topPages: { page: string; views: number }[];
  trafficSources: { source: string; sessions: number }[];
  searchQueries?: { query: string; clicks: number; impressions: number; ctr: number; position: number }[];
}

export default function BibbyDashboard({ compact = false }: { compact?: boolean }) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for now - we'll connect to API later
    const mockData: AnalyticsData = {
      activeUsers: 1,
      totalUsers: 52,
      newUsers: 29,
      sessions: 86,
      pageViews: 316,
      topPages: [
        { page: '/', views: 79 },
        { page: '/dashboard', views: 44 },
        { page: '/dashboard/v4/automation', views: 19 },
      ],
      trafficSources: [
        { source: 'google', sessions: 23 },
        { source: 'linkedin.com', sessions: 15 },
        { source: '(direct)', sessions: 14 },
      ],
      searchQueries: [
        { query: 'bibby ai', clicks: 1, impressions: 34, ctr: 2.9, position: 3.1 },
        { query: 'bibby', clicks: 1, impressions: 22, ctr: 4.5, position: 24.3 },
        { query: 'ai social media scheduler', clicks: 0, impressions: 10, ctr: 0, position: 78.1 },
      ],
    };
    
    setTimeout(() => {
      setData(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
        <div className="animate-pulse">
          <div className="h-8 bg-white/20 rounded w-48 mb-6"></div>
          <div className="space-y-4">
            <div className="h-24 bg-white/20 rounded"></div>
            <div className="h-24 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Bibby Analytics</h2>
        <span className="text-xs text-white/60">Last 7 days</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase tracking-wide">Active Now</p>
          <p className="text-white text-3xl font-bold mt-1">🔴 {data.activeUsers}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase tracking-wide">Total Users (7d)</p>
          <p className="text-white text-3xl font-bold mt-1">{data.totalUsers}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase tracking-wide">New Signups (7d)</p>
          <p className="text-white text-3xl font-bold mt-1">{data.newUsers}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase tracking-wide">Sessions (7d)</p>
          <p className="text-white text-3xl font-bold mt-1">{data.sessions}</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4">
          <p className="text-white/60 text-xs uppercase tracking-wide">Page Views (7d)</p>
          <p className="text-white text-3xl font-bold mt-1">{data.pageViews}</p>
        </div>
      </div>

      {!compact && (
        <>
          {/* Top Pages */}
          <div className="mb-6">
            <h3 className="text-white font-semibold mb-3">📄 Top Pages</h3>
            <div className="space-y-2">
              {data.topPages.map((page, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-white text-sm font-mono">{page.page}</span>
                  <span className="text-white/80 text-sm font-medium">{page.views} views</span>
                </div>
              ))}
            </div>
          </div>

          {/* Traffic Sources */}
          <div>
            <h3 className="text-white font-semibold mb-3">🌐 Traffic Sources</h3>
            <div className="space-y-2">
              {data.trafficSources.map((source, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded-lg p-3">
                  <span className="text-white text-sm">{source.source}</span>
                  <span className="text-white/80 text-sm font-medium">{source.sessions} sessions</span>
                </div>
              ))}
            </div>
          </div>

          {/* Search Console - Top Queries */}
          {data.searchQueries && data.searchQueries.length > 0 && (
            <div className="mt-6">
              <h3 className="text-white font-semibold mb-3">🔍 Top Search Queries (7d)</h3>
              <div className="space-y-2">
                {data.searchQueries.map((query, idx) => (
                  <div key={idx} className="bg-white/5 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white text-sm font-medium">{query.query}</span>
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        query.position <= 10 ? 'bg-green-500/20 text-green-300' :
                        query.position <= 30 ? 'bg-yellow-500/20 text-yellow-300' :
                        'bg-red-500/20 text-red-300'
                      }`}>
                        #{query.position.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-white/60">
                      <span>👆 {query.clicks} clicks</span>
                      <span>👀 {query.impressions} views</span>
                      <span>📊 {query.ctr.toFixed(1)}% CTR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
