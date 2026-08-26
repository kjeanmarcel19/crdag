import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import { DEFAULT_USERS } from "../client/src/data/defaultUsers.ts";

const url = process.env.SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  throw new Error("SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY sont obligatoires.");
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const rows = DEFAULT_USERS.map((user) => {
  const { codepersonnel, ...safeUser } = user;
  return {
    user_id: user.id,
    payload: safeUser,
    updated_at: new Date().toISOString(),
  };
});

const { error } = await supabase.from("user_data").upsert(rows, { onConflict: "user_id" });
if (error) throw new Error(`Import Supabase impossible : ${error.message}`);

console.log(`${rows.length} profils importés dans user_data.`);
