-- Add notes and links columns to content_items table

ALTER TABLE content_items ADD COLUMN IF NOT EXISTS notes TEXT;
ALTER TABLE content_items ADD COLUMN IF NOT EXISTS links TEXT[];
