import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const workspacePath = '/data/.openclaw/workspace';
    const memoryPath = path.join(workspacePath, 'memory');
    const memories = [];

    // Read MEMORY.md (long-term memory)
    const memoryMdPath = path.join(workspacePath, 'MEMORY.md');
    if (fs.existsSync(memoryMdPath)) {
      const content = fs.readFileSync(memoryMdPath, 'utf-8');
      memories.push({
        id: 'memory-longterm',
        title: 'MEMORY.md - Long-term Memory',
        date: 'Ongoing',
        type: 'longterm',
        content: content,
      });
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

    return NextResponse.json({ memories });
  } catch (error) {
    console.error('Error reading memories:', error);
    return NextResponse.json({ error: 'Failed to fetch memories' }, { status: 500 });
  }
}
