"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FAKE_USERS } from "@/lib/users";

type ChatEntry = {
  href: string;
  name: string;
  initials: string;
  gradient: string;
  photo?: string;
  lastText: string;
  time: string;
};

export default function ChatsPage() {
  const [chats, setChats] = useState<ChatEntry[]>([]);

  useEffect(() => {
    const entries: ChatEntry[] = [];

    const aiLast = localStorage.getItem("friendr_ai_last");
    if (aiLast) {
      try {
        const d = JSON.parse(aiLast);
        entries.push({ href: "/chat", name: "Friendr AI", initials: "AI", gradient: "from-brand-light to-brand", lastText: d.text, time: d.time });
      } catch { /* skip */ }
    } else {
      entries.push({ href: "/chat", name: "Friendr AI", initials: "AI", gradient: "from-brand-light to-brand", lastText: "Start a conversation!", time: "" });
    }

    FAKE_USERS.forEach((u) => {
      const saved = localStorage.getItem(`friendr_person_chat_${u.id}`);
      if (saved) {
        try {
          const d = JSON.parse(saved);
          entries.push({ href: `/chat/${u.id}`, name: u.name, initials: u.initials, gradient: u.gradient, photo: u.photo, lastText: d.lastText, time: d.time });
        } catch { /* skip */ }
      }
    });

    setChats(entries);
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Messages</h1>

        <div className="space-y-1">
          {chats.map((chat) => (
            <Link key={chat.href} href={chat.href}
              className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all">
              <div className="flex-shrink-0 relative">
                {chat.photo ? (
                  <img src={chat.photo} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${chat.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                    {chat.initials}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between mb-0.5">
                  <span className="font-semibold text-zinc-900 dark:text-white text-sm">{chat.name}</span>
                  {chat.time && <span className="text-xs text-zinc-400 dark:text-zinc-600">{chat.time}</span>}
                </div>
                <p className="text-zinc-500 dark:text-zinc-500 text-sm truncate">{chat.lastText}</p>
              </div>
            </Link>
          ))}
        </div>

        {chats.length === 0 && (
          <div className="text-center py-16 text-zinc-400 dark:text-zinc-600">
            <p className="text-lg mb-2">No chats yet</p>
            <p className="text-sm">Tap + to start chatting</p>
          </div>
        )}
      </div>
    </main>
  );
}
