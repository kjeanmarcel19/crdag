import { createClient } from "@supabase/supabase-js";

const runtimeEnv = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};
const supabaseUrl = runtimeEnv.VITE_SUPABASE_URL;
const supabaseAnonKey = runtimeEnv.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn("Supabase non configuré : VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY sont requis.");
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-anon-key",
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);
