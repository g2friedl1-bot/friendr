"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type QuizSummary = { emoji: string; title: string; tags: string[] };

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizSummary | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("friendr_quiz_result");
    if (saved) { try { setQuizResult(JSON.parse(saved)); } catch { /* skip */ } }
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-white mb-8">Profile</h1>

        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center overflow-hidden">
              {avatar
                ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                : <span className="text-4xl font-bold text-white select-none">?</span>}
            </div>
            <button onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-zinc-800 border-2 border-zinc-950 flex items-center justify-center hover:bg-zinc-700 transition-colors">
              <Camera className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
          <button onClick={() => fileInputRef.current?.click()} className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">
            Upload photo
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        {quizResult ? (
          <Link href="/quiz"
            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-orange-500/10 border border-orange-500/30 mb-6 hover:border-orange-500/60 transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{quizResult.emoji}</span>
              <div>
                <p className="text-xs font-semibold text-orange-400 uppercase tracking-wider mb-0.5">Friendr Type</p>
                <p className="text-white font-bold text-lg leading-tight">{quizResult.title}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {quizResult.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-zinc-500 group-hover:text-white transition-colors text-sm">Retake →</span>
          </Link>
        ) : (
          <Link href="/quiz"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-700 text-zinc-300 hover:border-orange-500/60 hover:text-white font-semibold transition-all mb-6">
            <span className="text-lg">✨</span>
            Take the Friendr Quiz
          </Link>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Name</label>
            <input type="text" placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">Bio</label>
            <textarea rows={3} placeholder="Tell others a bit about yourself..."
              className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors resize-none" />
          </div>
        </div>

        <button className="mt-6 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold transition-all">
          Save Profile
        </button>
      </div>
    </main>
  );
}
