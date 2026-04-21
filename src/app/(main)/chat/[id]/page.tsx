"use client";

import { useParams } from "next/navigation";
import { getUserById } from "@/lib/users";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, Send, Flag } from "lucide-react";
import ReportModal from "@/components/ReportModal";

type Message = { role: "user" | "them"; text: string; time: string };

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function PersonChatPage() {
  const { id } = useParams<{ id: string }>();
  const user = getUserById(id);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [scriptIndex, setScriptIndex] = useState(0);
  const [typing, setTyping] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    const key = `friendr_chat_${id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setMessages(data.messages || []);
        setScriptIndex(data.scriptIndex || 0);
        return;
      } catch { /* start fresh */ }
    }
    setTyping(true);
    setTimeout(() => {
      setMessages([{ role: "them", text: user.chatScript[0], time: nowTime() }]);
      setScriptIndex(1);
      setTyping(false);
    }, 1000);
  }, [id, user]);

  useEffect(() => {
    if (!user || messages.length === 0) return;
    localStorage.setItem(`friendr_chat_${id}`, JSON.stringify({ messages, scriptIndex }));
    const last = messages[messages.length - 1];
    localStorage.setItem(`friendr_person_chat_${id}`, JSON.stringify({ userId: id, lastText: last.text, lastRole: last.role, time: last.time }));
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, scriptIndex, id, user]);

  function send() {
    const text = input.trim();
    if (!text || !user) return;
    setMessages((prev) => [...prev, { role: "user", text, time: nowTime() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const reply = user.chatScript[scriptIndex] ?? "Hey I gotta run, but this was really nice! Let's chat again 😊";
      setMessages((prev) => [...prev, { role: "them", text: reply, time: nowTime() }]);
      setScriptIndex((i) => i + 1);
      setTyping(false);
    }, 1000 + Math.random() * 600);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">User not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 flex flex-col pb-[65px]">
      <div className="sticky top-0 z-10 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 px-4 py-3 flex items-center gap-3">
        <Link href="/chats" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <img src={user.photo} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
        <div className="flex-1">
          <p className="font-semibold text-zinc-900 dark:text-white text-sm">{user.name}</p>
          <p className="text-xs text-emerald-500 dark:text-emerald-400">Active now</p>
        </div>
        <button
          onClick={() => setShowReport(true)}
          className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-400 dark:text-zinc-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
          aria-label="Report user"
        >
          <Flag className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-br-sm"
                  : "bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-xs text-zinc-400 dark:text-zinc-600 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-zinc-400 dark:bg-zinc-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {showReport && <ReportModal name={user.name} onClose={() => setShowReport(false)} />}

      <div className="fixed bottom-[65px] left-0 right-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={`Message ${user.name}...`}
            className="flex-1 px-4 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors text-sm"
          />
          <button onClick={send} disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-brand hover:bg-brand-light flex items-center justify-center text-white disabled:opacity-30 transition-all">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
