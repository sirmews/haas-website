import { useState, useEffect } from "react";
import { supabase } from "../utils/supabase";
import type { Session, PostgrestError } from "@supabase/supabase-js";

type Username = string | null;
type Website = string | null;
type AvatarUrl = string | null;

interface Profile {
  username: Username;
  website: Website;
  avatar_url: AvatarUrl;
}

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<Username>(null);
  const [website, setWebsite] = useState<Website>(null);
  const [avatar_url, setAvatarUrl] = useState<AvatarUrl>(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getCurrentUser() {
    const session = await supabase.auth.session();

    if (!session?.user) {
      throw new Error("User not logged in");
    }

    return session.user;
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }: Profile) {
    try {
      setLoading(true);
      const user = await getCurrentUser();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      const { data, error } = await supabase.from("profiles").upsert(updates);

      if (error) {
        throw error as PostgrestError;
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" type="text" value={session.user?.email} disabled />
        </div>
        <div>
          <label htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            type="website"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>

        <div>
          <button
            className="button primary block"
            onClick={() => updateProfile({ username, website, avatar_url })}
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </button>
        </div>

        <div>
          <button
            className="button block"
            onClick={() => supabase.auth.signOut()}
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
