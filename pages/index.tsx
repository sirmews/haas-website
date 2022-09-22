import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Head from "next/head";
import { supabase } from "../utils/supabase";
import { default as Auth } from "../components/Auth";
import { default as Account } from "../components/Account";
import type { Session } from "@supabase/supabase-js";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const session = await supabase.auth.session();

      // only update the react state if the component is still mounted
      if (mounted) {
        if (session) {
          setSession(session);
        }

        setIsLoading(false);
      }
    }

    getInitialSession();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      mounted = false;

      subscription?.unsubscribe();
    };
  }, []);

  return (
    <>
      <Head>
        <title>HaaS</title>
        <meta name="description" content="Habits as a Service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container m-auto sm:w-2/3 md:w-2/3 px-4 sm:px-0">
        <div className="" style={{ padding: "50px 0 100px 0" }}>
          {!session ? (
            <Auth />
          ) : (
            <Account key={session.user?.id} session={session} />
          )}
        </div>
      </main>

      <footer></footer>
    </>
  );
};

export default Home;
