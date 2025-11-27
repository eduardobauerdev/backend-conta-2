-- Add 'interesse' and 'cargo' columns to the leads table
ALTER TABLE leads
ADD COLUMN IF NOT EXISTS interesse text,
ADD COLUMN IF NOT EXISTS cargo character varying(100);

-- Add comments to document the columns
COMMENT ON COLUMN leads.interesse IS 'Area of interest or product/service the lead is interested in';
COMMENT ON COLUMN leads.cargo IS 'Job title or position of the lead';
