import { supabase } from "./supabase";
import { User } from "@supabase/supabase-js";

const getProfile = async (user: User) => {
  return await supabase
    .from("profiles")
    .select(`username, website, avatar_url`)
    .eq("id", user.id)
    .single();
};

export { getProfile };
