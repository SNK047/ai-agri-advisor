-- AI Agri-Advisor Database Schema
-- Run this in your Supabase SQL Editor

-- Users table (syncs with Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  village TEXT,
  language TEXT DEFAULT 'en',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Scan history
CREATE TABLE IF NOT EXISTS public.scan_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT,
  prediction TEXT,
  confidence DECIMAL(5,4),
  treatment_organic TEXT,
  treatment_chemical TEXT,
  treatment_prevention TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.scan_history ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Users can view own scans"
    ON public.scan_history FOR SELECT
    USING (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Users can insert own scans"
    ON public.scan_history FOR INSERT
    WITH CHECK (auth.uid() = user_id);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Market prices
CREATE TABLE IF NOT EXISTS public.market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  crop_name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  unit TEXT DEFAULT 'kg',
  market_name TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.market_prices ENABLE ROW LEVEL SECURITY;

DO $$ BEGIN
  CREATE POLICY "Anyone can view market prices"
    ON public.market_prices FOR SELECT
    USING (true);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Seed market prices (idempotent)
DELETE FROM public.market_prices WHERE id IN (
  SELECT id FROM (
    SELECT id, ROW_NUMBER() OVER (
      PARTITION BY crop_name, market_name ORDER BY updated_at DESC
    ) AS rn FROM public.market_prices
  ) sub WHERE rn > 1
);
DO $$ BEGIN
  ALTER TABLE public.market_prices ADD CONSTRAINT unique_crop_market UNIQUE (crop_name, market_name);
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
INSERT INTO public.market_prices (crop_name, price, unit, market_name) VALUES
  ('Tomato', 32.00, 'kg', 'Koyambedu Mandi'),
  ('Potato', 24.00, 'kg', 'Koyambedu Mandi'),
  ('Onion', 28.00, 'kg', 'Koyambedu Mandi'),
  ('Rice', 45.00, 'kg', 'Thiruvanmiyur Market'),
  ('Wheat', 38.00, 'kg', 'Thiruvanmiyur Market'),
  ('Maize', 22.00, 'kg', 'Koyambedu Mandi'),
  ('Groundnut', 56.00, 'kg', 'Local Mandi'),
  ('Cotton', 68.00, 'kg', 'Local Mandi')
ON CONFLICT (crop_name, market_name) DO NOTHING;

-- Create trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'name', 'Farmer'));
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
