-- Mission Control Database Schema

-- Tasks table
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  priority TEXT CHECK (priority IN ('High', 'Medium', 'Low')),
  assigned_to TEXT CHECK (assigned_to IN ('Ben', 'Scotty')),
  status TEXT NOT NULL CHECK (status IN ('backlog', 'todo', 'inProgress', 'review', 'done')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content items table
CREATE TABLE IF NOT EXISTS content_items (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('blog', 'social', 'video')),
  stage TEXT NOT NULL CHECK (stage IN ('idea', 'draft', 'review', 'published')),
  assigned_to TEXT CHECK (assigned_to IN ('Ben', 'Scotty')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Calendar events table
CREATE TABLE IF NOT EXISTS calendar_events (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('task', 'meeting', 'deadline', 'reminder')),
  assigned_to TEXT CHECK (assigned_to IN ('Ben', 'Scotty')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data for tasks
INSERT INTO tasks (title, description, priority, assigned_to, status) VALUES
('Workspace setup complete', NULL, NULL, 'Scotty', 'done'),
('Telegram pairing complete', NULL, NULL, 'Scotty', 'done'),
('Mission control structure built', NULL, NULL, 'Scotty', 'done'),
('SEO blog strategy + first batch of articles', NULL, 'High', 'Scotty', 'backlog'),
('Competitor analysis (Publer, Buffer AI, Lately)', NULL, 'Medium', 'Scotty', 'backlog'),
('Landing page copy tweaks for better conversion', NULL, 'High', 'Scotty', 'backlog');

-- Insert sample content items
INSERT INTO content_items (title, type, stage, assigned_to) VALUES
('SEO Blog: AI Social Media Automation Guide', 'blog', 'idea', 'Scotty'),
('LinkedIn Post: Bibby Launch Announcement', 'social', 'draft', 'Scotty'),
('Blog: How to Save 10 Hours/Week with AI', 'blog', 'idea', 'Scotty');

-- Insert sample calendar events
INSERT INTO calendar_events (title, date, time, type, assigned_to) VALUES
('Blog post deadline: AI Automation Guide', '2026-02-21', '5:00 PM', 'deadline', 'Scotty'),
('Check Bibby signups', '2026-02-20', '9:00 AM', 'task', 'Scotty'),
('Weekly marketing review', '2026-02-22', '2:00 PM', 'meeting', 'Ben');

-- Enable Row Level Security
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (adjust as needed for production)
CREATE POLICY "Allow all operations on tasks" ON tasks FOR ALL USING (true);
CREATE POLICY "Allow all operations on content_items" ON content_items FOR ALL USING (true);
CREATE POLICY "Allow all operations on calendar_events" ON calendar_events FOR ALL USING (true);
