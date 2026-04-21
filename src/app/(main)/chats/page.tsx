"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FAKE_USERS } from "@/lib/users";

type ChatEntry = {
  href: string;
  name: string;
  initials: string;
  gradient: string;
  lastText: string;
  time: string;
  isAI?: boolean;
};

export default function ChatsPage() {
  const [chats, setChats] = useState<ChatEntry[]>([]);

  useEffect(() => {
    const entries: ChatEntry[] = [];

    // AI chat
    const aiLast = localStorage.getItem("friendr_ai_last");
    if (aiLast) {
      try {
        const d = JSON.parse(aiLast);
        entries.push({ href: "/chat", name: "Friendr AI", initials: "AI", gradient: "from-fuchsia-500 to-violet-500", lastText: d.text, time: d.time, isAI: true });
      } catch { /* skip */ }
    } else {
      entries.push({ href: "/chat", name: "Friendr AI", initials: "AI", gradient: "from-fuchsia-500 to-violet-500", lastText: "Start a conversation!", time: "", isAI: true });
    }

    // Person chats
    FAKE_USERS.forEach((u) => {
      const saved = localStorage.getItem(`friendr_person_chat_${u.id}`);
      if (saved) {
        try {
          const d = JSON.parse(saved);
          entries.push({ href: `/chat/${u.id}`, name: u.name, initials: u.initials, gradient: u.gradient, lastText: d.lastText, time: d.time });
        } catch { /* skip */ }
      }
    });

    setChats(entries);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>

        <div className="space-y-2">
          {chats.map((chat) => (
            <Link key={chat.href} href={chat.href}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-violet-900/40 border border-violet-700/40 hover:border-fuchsia-500/50 transition-all">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {chat.initials}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="font-semibold text-white text-sm">{chat.name}</span>
                  {chat.time && <span className="text-xs text-violet-400/60">{chat.time}</span>}
                </div>
                <p className="text-violet-300/70 text-sm truncate">{chat.lastText}</p>
              </div>
            </Link>
          ))}
        </div>

        {chats.length === 0 && (
          <div className="text-center py-16 text-violet-400/60">
            <p className="text-lg mb-2">No chats yet</p>
            <p className="text-sm">Tap the + button to start chatting</p>
          </div>
        )}
      </div>
    </main>
  );
}
