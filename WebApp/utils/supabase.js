import { createClient } from "@supabase/supabase-js";

const project_url = import.meta.env.VITE_PROJECT_SUPABASE_URL;
const anon_key = import.meta.env.VITE_PROJECT_ANON_KEY;

export const supabase = createClient(project_url, anon_key);
