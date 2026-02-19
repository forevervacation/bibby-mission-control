import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET() {
  try {
    // This would call OpenClaw CLI to get cron jobs
    // For now, return mock data that matches your actual setup
    const jobs = [
      {
        id: '1',
        name: 'Bibby Analytics Check',
        schedule: 'every 6 hours',
        nextRun: getNextRun(6 * 60 * 60 * 1000),
        type: 'analytics',
        status: 'active',
        description: 'Check Bibby user signups and traffic',
      },
      {
        id: '2',
        name: 'Morning Brief',
        schedule: 'daily at 9:00 AM',
        nextRun: getNextRunDaily(9, 0),
        type: 'brief',
        status: 'active',
        description: 'Daily summary of tasks and priorities',
      },
      {
        id: '3',
        name: 'Competitor YouTube Scan',
        schedule: 'weekly on Monday at 10:00 AM',
        nextRun: getNextRunWeekly(1, 10, 0),
        type: 'research',
        status: 'active',
        description: 'Scan competitor YouTube channels for new content',
      },
      {
        id: '4',
        name: 'Newsletter Reminder',
        schedule: 'weekly on Wednesday at 3:00 PM',
        nextRun: getNextRunWeekly(3, 15, 0),
        type: 'reminder',
        status: 'active',
        description: 'Remind to send weekly newsletter',
      },
      {
        id: '5',
        name: 'Mission Control Check',
        schedule: 'every 30 minutes',
        nextRun: getNextRun(30 * 60 * 1000),
        type: 'system',
        status: 'active',
        description: 'Check for task updates and notifications',
      },
      {
        id: '6',
        name: 'AI Security Research',
        schedule: 'daily at 2:00 PM',
        nextRun: getNextRunDaily(14, 0),
        type: 'research',
        status: 'active',
        description: 'Research latest AI security developments',
      },
    ];

    return NextResponse.json({ jobs, success: true });
  } catch (error) {
    console.error('Error fetching cron jobs:', error);
    return NextResponse.json({ error: 'Failed to fetch cron jobs', jobs: [] }, { status: 500 });
  }
}

function getNextRun(intervalMs: number): string {
  const now = new Date();
  const next = new Date(now.getTime() + intervalMs);
  return next.toISOString();
}

function getNextRunDaily(hour: number, minute: number): string {
  const now = new Date();
  const next = new Date(now);
  next.setHours(hour, minute, 0, 0);
  
  if (next <= now) {
    next.setDate(next.getDate() + 1);
  }
  
  return next.toISOString();
}

function getNextRunWeekly(dayOfWeek: number, hour: number, minute: number): string {
  const now = new Date();
  const next = new Date(now);
  const currentDay = now.getDay();
  const daysUntilNext = (dayOfWeek - currentDay + 7) % 7 || 7;
  
  next.setDate(next.getDate() + daysUntilNext);
  next.setHours(hour, minute, 0, 0);
  
  return next.toISOString();
}
