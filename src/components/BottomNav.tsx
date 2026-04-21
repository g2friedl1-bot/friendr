"use client";

import Link from "next/link";
import { Home as HomeIcon, Bot, Sparkles, MessageCircle, UserCircle, Settings } from "lucide-react";
import { useState } from "react";
import BetterHelpLogo from "./BetterHelpLogo";

export default function BottomNav() {
  const [expanded, setExpanded] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-violet-950/95 backdrop-blur-md border-t border-violet-800/50">
      {expanded && (
        <div className="flex flex-wrap justify-center gap-3 px-4 py-3 border-b border-violet-800/40">
          <Link href="/chat" onClick={() => setExpanded(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-fuchsia-500 to-violet-500 text-white font-semibold shadow-lg hover:scale-105 transition-all text-sm">
            <Bot className="w-4 h-4" />
            Chat with AI
          </Link>
          <Link href="/find" onClick={() => setExpanded(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-105 transition-all text-sm">
            <Sparkles className="w-4 h-4" />
            People with Similar Interests
          </Link>
          <Link href="/betterhelp" onClick={() => setExpanded(false)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#5C6BC0] hover:bg-[#4a58a8] text-white font-semibold shadow-lg hover:scale-105 transition-all text-sm">
            <BetterHelpLogo className="w-5 h-5" />
            Crisis & Support
          </Link>
        </div>
      )}

      <div className="flex items-center justify-between px-6 py-3 max-w-lg mx-auto">
        <Link href="/home" className="flex flex-col items-center gap-1 text-violet-300 hover:text-white transition-colors">
          <HomeIcon className="w-6 h-6" strokeWidth={2} />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link href="/chats" className="flex flex-col items-center gap-1 text-violet-300 hover:text-white transition-colors">
          <MessageCircle className="w-6 h-6" strokeWidth={2} />
          <span className="text-xs font-medium">Chats</span>
        </Link>

        <button onClick={() => setExpanded((v) => !v)}
          className={`flex flex-col items-center justify-center w-14 h-14 rounded-full -mt-8 shadow-lg transition-all ${
            expanded
              ? "bg-white text-violet-900 shadow-white/30 rotate-45"
              : "bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white shadow-fuchsia-500/40 hover:scale-110"
          }`}>
          <span className="text-2xl font-bold leading-none">+</span>
        </button>

        <Link href="/profile" className="flex flex-col items-center gap-1 text-violet-300 hover:text-white transition-colors">
          <UserCircle className="w-6 h-6" strokeWidth={2} />
          <span className="text-xs font-medium">Profile</span>
        </Link>

        <Link href="/settings" className="flex flex-col items-center gap-1 text-violet-300 hover:text-white transition-colors">
          <Settings className="w-6 h-6" strokeWidth={2} />
          <span className="text-xs font-medium">Settings</span>
        </Link>
      </div>
    </nav>
  );
}
