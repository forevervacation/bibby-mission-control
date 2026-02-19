-- Add due_date and comments to tasks
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE tasks ADD COLUMN IF NOT EXISTS comments JSONB DEFAULT '[]'::jsonb;

-- Add due_date and comments to content_items
ALTER TABLE content_items ADD COLUMN IF NOT EXISTS due_date DATE;
ALTER TABLE content_items ADD COLUMN IF NOT EXISTS comments JSONB DEFAULT '[]'::jsonb;

-- Comments will be stored as JSON array of objects:
-- [{ "author": "Ben", "text": "This looks good!", "timestamp": "2026-02-19T12:00:00Z" }]
