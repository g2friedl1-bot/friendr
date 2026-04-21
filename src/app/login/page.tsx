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
    <main className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm text-center">
        <div className="mb-3">
          <span className="text-6xl font-black text-white tracking-tight">
            friend<span className="text-orange-500">r</span>
          </span>
        </div>
        <p className="text-zinc-400 mb-12 text-base">
          Meet people who actually get you.
        </p>

        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2 text-left">
              What&apos;s your name?
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleEnter()}
              placeholder="Enter your name..."
              autoFocus
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors text-lg"
            />
          </div>
          <button
            onClick={handleEnter}
            disabled={!name.trim()}
            className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-bold text-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Let&apos;s go →
          </button>
        </div>

        <p className="mt-8 text-xs text-zinc-600">
          By continuing you confirm you are 18 or older.
        </p>
      </div>
    </main>
  );
}
