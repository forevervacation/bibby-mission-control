import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const workspacePath = '/data/.openclaw/workspace';
    const memoryPath = path.join(workspacePath, 'memory');
    const memories = [];

    // Try to read from actual filesystem (works on VPS/local, not on Vercel)
    try {
      // Read MEMORY.md (long-term memory)
      const memoryMdPath = path.join(workspacePath, 'MEMORY.md');
      if (fs.existsSync(memoryMdPath)) {
        const content = fs.readFileSync(memoryMdPath, 'utf-8');
        if (content.trim()) {
          memories.push({
            id: 'memory-longterm',
            title: 'MEMORY.md - Long-term Memory',
            date: 'Ongoing',
            type: 'longterm',
            content: content,
          });
        }
      }

      // Read memory/*.md files (daily memories)
      if (fs.existsSync(memoryPath)) {
        const files = fs.readdirSync(memoryPath)
          .filter(file => file.endsWith('.md'))
          .sort()
          .reverse(); // Most recent first

        for (const file of files) {
          const filePath = path.join(memoryPath, file);
          const content = fs.readFileSync(filePath, 'utf-8');
          const date = file.replace('.md', '');
          
          memories.push({
            id: `memory-${date}`,
            title: `${date} - Daily Memory`,
            date: date,
            type: 'daily',
            content: content,
          });
        }
      }
    } catch (fsError) {
      // Filesystem not available (Vercel deployment) - return placeholder
      console.log('Filesystem not available, using static data');
    }

    // If no memories were loaded from filesystem, return static content
    if (memories.length === 0) {
      memories.push({
        id: 'memory-placeholder',
        title: 'Memory System',
        date: 'Info',
        type: 'longterm',
        content: `# Memory System

This feature is best accessed directly from your OpenClaw installation where memory files are stored.

**Memory files location:** \`/data/.openclaw/workspace/\`
- \`MEMORY.md\` - Long-term curated memory
- \`memory/*.md\` - Daily logs

**To view memories:**
The Memory tab works when accessed through OpenClaw's local Control UI. The Vercel deployment shows this placeholder since memory files live on your VPS.

**What's stored in memory:**
- Who you are (Ben, Janie, team members)
- Important projects (Bibby, ForeverVacation)  
- Preferences and communication style
- Tasks completed, decisions made
- Key learnings and context

Memories are automatically created as we work together and can be searched/viewed through the Memory screen.`,
      });
    }

    return NextResponse.json({ memories });
  } catch (error) {
    console.error('Error reading memories:', error);
    return NextResponse.json({ 
      memories: [{
        id: 'error',
        title: 'Error Loading Memories',
        date: 'Error',
        type: 'longterm',
        content: 'Unable to load memory files. This feature works best when accessed through your OpenClaw installation.',
      }] 
    });
  }
}
