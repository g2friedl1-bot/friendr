"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send, Phone } from "lucide-react";
import Link from "next/link";
import { getAIResponse } from "@/lib/ai-responses";

type Message = { role: "user" | "ai"; text: string; time: string; isCrisis?: boolean };

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function AIChatPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") return [{ role: "ai", text: "Hey! 👋 I'm your Friendr AI. How's your day going?", time: nowTime() }];
    try {
      const saved = localStorage.getItem("friendr_ai_messages");
      return saved ? JSON.parse(saved) : [{ role: "ai", text: "Hey! 👋 I'm your Friendr AI. How's your day going?", time: nowTime() }];
    } catch { return [{ role: "ai", text: "Hey! 👋 I'm your Friendr AI. How's your day going?", time: nowTime() }]; }
  });
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    localStorage.setItem("friendr_ai_messages", JSON.stringify(messages));
    const last = messages[messages.length - 1];
    if (last) localStorage.setItem("friendr_ai_last", JSON.stringify({ text: last.text, role: last.role, time: last.time }));
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: "user", text, time: nowTime() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      const result = getAIResponse(text);
      setMessages((prev) => [...prev, { role: "ai", text: result.text, time: nowTime(), isCrisis: result.isCrisis }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex flex-col pb-[65px]">
      <div className="sticky top-0 z-10 bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-4 py-3 flex items-center gap-3">
        <Link href="/chats" className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-light flex items-center justify-center text-white font-bold text-xs">AI</div>
        <div>
          <p className="font-semibold text-white text-sm">Friendr AI</p>
          <p className="text-xs text-emerald-400">Online</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-brand text-white rounded-br-sm"
                  : msg.isCrisis
                    ? "bg-red-950 border border-red-700/60 text-white rounded-bl-sm"
                    : "bg-zinc-800 border border-zinc-700 text-zinc-100 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              {msg.isCrisis && (
                <div className="flex flex-col gap-2 mt-1 w-full">
                  <a href="tel:988" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all">
                    <Phone className="w-4 h-4" />
                    Call or Text 988 Now
                  </a>
                  <Link href="/betterhelp" className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-red-700/50 text-red-400 hover:bg-red-950 text-sm font-medium transition-all">
                    View all support resources →
                  </Link>
                </div>
              )}
              <span className="text-xs text-zinc-600 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-zinc-800 border border-zinc-700 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="fixed bottom-[65px] left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            type="text" value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Say something..."
            className="flex-1 px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors text-sm"
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
