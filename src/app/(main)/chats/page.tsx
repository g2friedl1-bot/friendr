"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FAKE_USERS } from "@/lib/users";
import { Trash2 } from "lucide-react";

type ChatEntry = {
  href: string;
  key: string;
  name: string;
  initials: string;
  gradient: string;
  photo?: string;
  lastText: string;
  time: string;
  deletable: boolean;
};

export default function ChatsPage() {
  const [chats, setChats] = useState<ChatEntry[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  function loadChats() {
    const entries: ChatEntry[] = [];

    const aiLast = localStorage.getItem("friendr_ai_last");
    if (aiLast) {
      try {
        const d = JSON.parse(aiLast);
        entries.push({ href: "/chat", key: "ai", name: "Friendr AI", initials: "AI", gradient: "from-brand-light to-brand", lastText: d.text, time: d.time, deletable: false });
      } catch { /* skip */ }
    } else {
      entries.push({ href: "/chat", key: "ai", name: "Friendr AI", initials: "AI", gradient: "from-brand-light to-brand", lastText: "Start a conversation!", time: "", deletable: false });
    }

    FAKE_USERS.forEach((u) => {
      const saved = localStorage.getItem(`friendr_person_chat_${u.id}`);
      if (saved) {
        try {
          const d = JSON.parse(saved);
          entries.push({ href: `/chat/${u.id}`, key: u.id, name: u.name, initials: u.initials, gradient: u.gradient, photo: u.photo, lastText: d.lastText, time: d.time, deletable: true });
        } catch { /* skip */ }
      }
    });

    setChats(entries);
  }

  useEffect(() => { loadChats(); }, []);

  function deleteChat(key: string) {
    localStorage.removeItem(`friendr_person_chat_${key}`);
    localStorage.removeItem(`friendr_chat_${key}`);
    setConfirmDelete(null);
    loadChats();
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Messages</h1>

        <div className="space-y-1">
          {chats.map((chat) => (
            <div key={chat.key} className="flex items-center gap-1 group">
              <Link href={chat.href} className="flex items-center gap-4 px-4 py-4 rounded-2xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all flex-1 min-w-0">
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
                    {chat.time && <span className="text-xs text-zinc-400 dark:text-zinc-600 ml-2 flex-shrink-0">{chat.time}</span>}
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-500 text-sm truncate">{chat.lastText}</p>
                </div>
              </Link>

              {chat.deletable && (
                <button
                  onClick={() => setConfirmDelete(chat.key)}
                  className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full text-zinc-300 dark:text-zinc-600 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all opacity-0 group-hover:opacity-100"
                  aria-label="Delete chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {chats.length === 0 && (
          <div className="text-center py-16 text-zinc-400 dark:text-zinc-600">
            <p className="text-lg mb-2">No chats yet</p>
            <p className="text-sm">Tap + to start chatting</p>
          </div>
        )}
      </div>

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-xs bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl p-6 shadow-2xl text-center">
            <p className="font-bold text-zinc-900 dark:text-white mb-2">Delete this chat?</p>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">This will remove the conversation history. This can&apos;t be undone.</p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-semibold text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteChat(confirmDelete)}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
