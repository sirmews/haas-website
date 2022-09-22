import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import type { ApiError } from "@supabase/supabase-js";
import Header from "./Header";
import Button from "./Button";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) {
        throw error;
      }
      alert("Check your email for the login link!");
    } catch (error) {
      const { message } = error as ApiError;
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleLogin(email);
  };

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm">You just need an email</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md text-gray-800">
        <div className="bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-md font-medium">
                Email address
              </label>
              <div className="mt-2">
                <input
                  className="block w-full appearance-none rounded-md border border-gray-400 px-3 py-2 placeholder-gray-800 shadow-sm focus:border-gray-900 focus:outline-none focus:ring-gray-900 sm:text-md"
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <Button onClick={onClick} disabled={loading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
