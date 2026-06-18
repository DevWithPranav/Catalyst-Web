import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
      "Add them to your .env.local file."
  );
} else {
  // Clean up URL: remove trailing slash and strip /rest/v1 if pasted by mistake
  supabaseUrl = supabaseUrl.trim();
  if (supabaseUrl.endsWith("/rest/v1")) {
    supabaseUrl = supabaseUrl.slice(0, -8);
  }
  if (supabaseUrl.endsWith("/")) {
    supabaseUrl = supabaseUrl.slice(0, -1);
  }
}

// Fallback placeholder values to avoid throwing "Invalid supabaseUrl" on initialization when env vars are missing
export const supabase = createClient(
  supabaseUrl || "https://your-project-id.supabase.co",
  supabaseAnonKey || "placeholder-anon-key"
);
