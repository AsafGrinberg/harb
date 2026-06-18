-- Create leads table in Supabase
-- Run this SQL in the Supabase Query Editor (SQL tab)

CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  ssn VARCHAR(20),
  ssn_date VARCHAR(20),
  page_url TEXT,
  utm_source VARCHAR(255),
  utm_medium VARCHAR(255),
  utm_campaign VARCHAR(255),
  utm_content VARCHAR(255),
  utm_term VARCHAR(255),
  submitted_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create index on submitted_at for faster sorting
CREATE INDEX idx_leads_submitted_at ON leads(submitted_at DESC);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
