"use client";

import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { getAIResponse } from "@/lib/ai-responses";

type Message = { role: "user" | "ai"; text: string; time: string };

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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    localStorage.setItem("friendr_ai_messages", JSON.stringify(messages));
    // Save last message for chats list
    const last = messages[messages.length - 1];
    if (last) {
      localStorage.setItem("friendr_ai_last", JSON.stringify({ text: last.text, role: last.role, time: last.time }));
    }
  }, [messages]);

  function send() {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { role: "user", text, time: nowTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    const delay = 800 + Math.random() * 800;
    setTimeout(() => {
      const aiText = getAIResponse(text);
      setMessages((prev) => [...prev, { role: "ai", text: aiText, time: nowTime() }]);
      setTyping(false);
    }, delay);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 flex flex-col pb-[65px]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-violet-950/95 backdrop-blur-md border-b border-violet-800/50 px-4 py-3 flex items-center gap-3">
        <Link href="/chats" className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-800/60 hover:bg-violet-700/70 text-violet-200 hover:text-white transition-all">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 flex items-center justify-center text-white font-bold text-sm">AI</div>
        <div>
          <p className="font-semibold text-white text-sm">Friendr AI</p>
          <p className="text-xs text-green-400">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] ${msg.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
              <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-fuchsia-500 to-rose-500 text-white rounded-br-sm"
                  : "bg-violet-800/60 border border-violet-700/50 text-violet-100 rounded-bl-sm"
              }`}>
                {msg.text}
              </div>
              <span className="text-xs text-violet-500/60 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-violet-800/60 border border-violet-700/50 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
              {[0, 1, 2].map((i) => (
                <span key={i} className="w-2 h-2 rounded-full bg-violet-400 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="fixed bottom-[65px] left-0 right-0 bg-violet-950/95 backdrop-blur-md border-t border-violet-800/50 px-4 py-3 z-40">
        <div className="max-w-lg mx-auto flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Say something..."
            className="flex-1 px-4 py-2.5 rounded-full bg-violet-900/60 border border-violet-700/50 text-white placeholder-violet-400/60 focus:outline-none focus:border-fuchsia-500 transition-colors text-sm"
          />
          <button onClick={send} disabled={!input.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center text-white disabled:opacity-40 hover:scale-105 transition-all shadow-lg">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
