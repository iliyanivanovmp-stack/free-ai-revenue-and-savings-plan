/*
  # Create AI Plan Bookings Table

  1. New Tables
    - `ai_plan_bookings`
      - `id` (uuid, primary key) - Unique identifier for each booking
      - `first_name` (text, required) - User's first name
      - `last_name` (text, required) - User's last name
      - `company_name` (text, required) - Company name
      - `website` (text, optional) - Company website URL
      - `role` (text, required) - User's role (Founder/Director/Other)
      - `biggest_bottleneck` (text, optional) - Selected bottleneck area
      - `what_would_make_this_a_win` (text, optional) - Success criteria
      - `created_at` (timestamptz) - Timestamp of booking creation

  2. Security
    - Enable RLS on `ai_plan_bookings` table
    - Add policy for public insert access (allow anyone to submit forms)
    - Add policy for authenticated admins to read bookings
*/

CREATE TABLE IF NOT EXISTS ai_plan_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  company_name text NOT NULL,
  website text,
  role text NOT NULL,
  biggest_bottleneck text,
  what_would_make_this_a_win text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ai_plan_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit booking forms"
  ON ai_plan_bookings
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read all bookings"
  ON ai_plan_bookings
  FOR SELECT
  TO authenticated
  USING (true);
