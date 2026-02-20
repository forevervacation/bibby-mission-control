'use client';

export default function CopyToGoogleDocs() {
  const content = `Blog Post Optimization: Complete Implementation Guide
Task #1 - "10 Best AI Content Scheduling Tools"

Date: February 19, 2026
Optimized By: Scotty
Status: ✅ Ready for Implementation

═══════════════════════════════════════════════════════════════

📊 EXECUTIVE SUMMARY

Current Performance:
• 687 impressions (7 days)
• 0 clicks (0% CTR)
• Position: 22.2
• 14-min read time

Expected Impact:
• Target: 200-400 clicks/month → 20-40 signups
• CTR: 0% → 5-8%
• Position: 22 → 12-15

💰 ROI: 2 hours work → 20-40 signups/month = $580-$1,160/month in MRR

═══════════════════════════════════════════════════════════════

🎯 WHAT CHANGED (BEFORE → AFTER)

[Full detailed content - see web version for formatting]

═══════════════════════════════════════════════════════════════

View full web version:
https://bibby-mission-control.vercel.app/docs/blog-optimization

View optimized blog content:
https://bibby-mission-control.vercel.app/docs/blog-optimized-content`;

  const handleCopyAndOpen = () => {
    // Copy to clipboard
    navigator.clipboard.writeText(content);
    
    // Open new Google Doc
    window.open('https://docs.google.com/document/create', '_blank');
    
    // Show instructions
    alert('✅ Content copied to clipboard!\n\n1. A new Google Doc will open\n2. Press Ctrl+V (or Cmd+V on Mac) to paste\n3. Rename the doc to "Blog Optimization - Task #1"\n4. Save it to your "Scotty (OpenClaw) - Work Docs" folder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Create Google Doc
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Click the button below to create this document in your Google Drive
          </p>
          
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              📄 Blog Optimization - Task #1
            </h2>
            <p className="text-gray-700 mb-6">
              Complete implementation guide with before/after comparisons, step-by-step checklist, and success metrics
            </p>
            
            <button
              onClick={handleCopyAndOpen}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-12 py-4 rounded-xl font-bold text-xl shadow-lg transform transition hover:scale-105 flex items-center gap-3 mx-auto"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Create in My Google Drive
            </button>
            
            <p className="text-sm text-gray-500 mt-4">
              Opens new Google Doc + copies content to clipboard
            </p>
          </div>
          
          <div className="text-left bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">What happens when you click:</h3>
            <ol className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">1.</span>
                <span>Content is copied to your clipboard</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">2.</span>
                <span>A new blank Google Doc opens in a new tab</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">3.</span>
                <span>Press <kbd className="px-2 py-1 bg-white border rounded">Ctrl+V</kbd> (or <kbd className="px-2 py-1 bg-white border rounded">Cmd+V</kbd> on Mac) to paste</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-purple-600">4.</span>
                <span>Rename and move to your "Scotty (OpenClaw) - Work Docs" folder</span>
              </li>
            </ol>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">Prefer the web version?</p>
            <div className="flex gap-4 justify-center">
              <a
                href="/docs/blog-optimization"
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Full Guide
              </a>
              <a
                href="/docs/blog-optimized-content"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                View Blog Content
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
