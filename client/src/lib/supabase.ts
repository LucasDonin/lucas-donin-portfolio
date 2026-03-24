import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://seswwpigzhvxbpzkzngs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlc3d3cGlnemh2eGJwemt6bmdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyODcxOTUsImV4cCI6MjA4OTg2MzE5NX0.pfxtMdo6Sl3-CUJ4tu8sB_3lam99Nrq8Qtnh3Bt6C-U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  full_description: string;
  cover_image: string;
  images: string;
  tags: string;
  behance_url: string;
  order: number;
  published: boolean;
  created_at: string;
}

export function parseTags(tags: string): string[] {
  if (!tags) return [];
  return tags.split(',').map(t => t.trim()).filter(Boolean);
}

export function parseImages(images: string): string[] {
  if (!images) return [];
  return images.split(',').map(i => i.trim()).filter(Boolean);
}
