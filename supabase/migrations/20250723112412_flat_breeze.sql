/*
  # Create submissions and contacts system

  1. New Tables
    - `commission_submissions`
      - `id` (uuid, primary key)
      - `discord_user` (text)
      - `email` (text)
      - `commission_type` (text)
      - `animation_type` (text)
      - `description` (text)
      - `deadline` (text, optional)
      - `custom_size` (text, optional)
      - `reference_file_name` (text, optional)
      - `status` (text, default 'pending')
      - `created_at` (timestamp)
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `discord_user` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `status` (text, default 'unread')
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for public insert and admin read access
*/

-- Commission submissions table
CREATE TABLE IF NOT EXISTS commission_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_user text NOT NULL,
  email text NOT NULL,
  commission_type text NOT NULL,
  animation_type text,
  description text NOT NULL,
  deadline text,
  custom_size text,
  reference_file_name text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  discord_user text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'unread',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE commission_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for public insert (anyone can submit)
CREATE POLICY "Anyone can submit commissions"
  ON commission_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can submit contacts"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policies for admin access (you'll need to be authenticated)
CREATE POLICY "Admin can read all commission submissions"
  ON commission_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update commission submissions"
  ON commission_submissions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin can read all contact submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admin can update contact submissions"
  ON contact_submissions
  FOR UPDATE
  TO authenticated
  USING (true);