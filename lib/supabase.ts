import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Task {
  id: number;
  title: string;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low';
  assigned_to?: 'Ben' | 'Scotty';
  status: 'backlog' | 'todo' | 'inProgress' | 'review' | 'done';
  created_at?: string;
  updated_at?: string;
}

export interface ContentItem {
  id: number;
  title: string;
  type: 'blog' | 'social' | 'video';
  stage: 'idea' | 'draft' | 'review' | 'published';
  assigned_to?: 'Ben' | 'Scotty';
  created_at?: string;
  updated_at?: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  type: 'task' | 'meeting' | 'deadline' | 'reminder';
  assigned_to?: 'Ben' | 'Scotty';
  created_at?: string;
}
