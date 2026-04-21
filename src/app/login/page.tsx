"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  function handleEnter() {
    const trimmed = name.trim();
    if (!trimmed) return;
    localStorage.setItem("friendr_username", trimmed);
    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        {/* Logo */}
        <div className="mb-2">
          <span className="text-6xl font-black text-white tracking-tight">Friendr</span>
        </div>
        <p className="text-violet-300/80 mb-12 text-base">
          Connect with people around you.
        </p>

        {/* Name input */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-violet-300 uppercase tracking-wider mb-2 text-left">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnter()}
              placeholder="Enter your name..."
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-violet-900/50 border border-violet-700/50 text-white placeholder-violet-400/60 focus:outline-none focus:border-fuchsia-500 transition-colors text-lg"
            />
          </div>
          <button
            onClick={handleEnter}
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-bold text-lg shadow-lg shadow-fuchsia-500/30 hover:scale-[1.02] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Let&apos;s go →
          </button>
        </div>

        <p className="mt-8 text-xs text-violet-500/60">
          By continuing you confirm you are 18 or older.
        </p>
      </div>
    </main>
  );
}
