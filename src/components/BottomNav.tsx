"use client";

import Link from "next/link";
import { Home as HomeIcon, Bot, Sparkles, MessageCircle, UserCircle, Settings } from "lucide-react";
import { useState } from "react";
import BetterHelpLogo from "./BetterHelpLogo";

export default function BottomNav() {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200/80 dark:border-zinc-800/70">
      {expanded && (
        <>
          <div className="fixed inset-0 -z-10" onClick={() => setExpanded(false)} />
          <div className="flex flex-wrap justify-center gap-2.5 px-4 py-3 border-b border-zinc-200/60 dark:border-zinc-800/60">
            <Link href="/chat" onClick={() => setExpanded(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-brand hover:bg-brand-light text-white font-semibold transition-all text-sm shadow-md">
              <Bot className="w-4 h-4" />
              Chat with AI
            </Link>
            <Link href="/find" onClick={() => setExpanded(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600 text-zinc-800 dark:text-white font-semibold transition-all text-sm shadow-md">
              <Sparkles className="w-4 h-4" />
              Similar Interests
            </Link>
            <Link href="/betterhelp" onClick={() => setExpanded(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#5C6BC0] hover:bg-[#4a58a8] text-white font-semibold transition-all text-sm shadow-md">
              <BetterHelpLogo className="w-4 h-4" />
              Crisis & Support
            </Link>
          </div>
        </>
      )}

      <div className="flex items-center justify-between px-6 py-3 max-w-lg mx-auto">
        <Link href="/home" className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <HomeIcon className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs">Home</span>
        </Link>

        <Link href="/chats" className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <MessageCircle className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs">Chats</span>
        </Link>

        <button onClick={() => setExpanded((v) => !v)}
          className={`flex items-center justify-center w-12 h-12 rounded-full -mt-6 shadow-lg transition-all ${
            expanded
              ? "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rotate-45"
              : "bg-brand hover:bg-brand-light text-white shadow-brand/30"
          }`}>
          <span className="text-2xl font-bold leading-none">+</span>
        </button>

        <Link href="/profile" className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <UserCircle className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs">Profile</span>
        </Link>

        <Link href="/settings" className="flex flex-col items-center gap-1 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors">
          <Settings className="w-5 h-5" strokeWidth={2} />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
