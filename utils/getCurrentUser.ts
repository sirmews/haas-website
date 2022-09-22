import { supabase } from "./supabase";

const getCurrentUser = async () => {
  const session = await supabase.auth.session();

  if (!session?.user) {
    throw new Error("User not logged in");
  }

  return session.user;
};

export default getCurrentUser;
