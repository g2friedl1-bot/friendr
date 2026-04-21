"use client";

import Link from "next/link";
import { Camera } from "lucide-react";
import { useRef, useState, useEffect } from "react";

type QuizSummary = {
  emoji: string;
  title: string;
  tags: string[];
};

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizSummary | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem("friendr_quiz_result");
    if (saved) {
      try {
        setQuizResult(JSON.parse(saved));
      } catch {
        // ignore malformed data
      }
    }
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setAvatar(url);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
        </div>

        {/* Profile picture */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-fuchsia-500 to-rose-500 flex items-center justify-center overflow-hidden shadow-xl shadow-fuchsia-500/30">
              {avatar ? (
                <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="text-5xl font-bold text-white select-none">?</span>
              )}
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-9 h-9 rounded-full bg-violet-800 border-2 border-violet-950 flex items-center justify-center hover:bg-violet-700 transition-colors"
            >
              <Camera className="w-4 h-4 text-white" />
            </button>
          </div>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-violet-300 hover:text-white transition-colors"
          >
            Upload profile picture
          </button>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        {/* Quiz result badge */}
        {quizResult ? (
          <Link
            href="/quiz"
            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-gradient-to-r from-fuchsia-500/20 to-rose-500/20 border border-fuchsia-500/40 mb-6 hover:border-fuchsia-500/70 transition-all group"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">{quizResult.emoji}</span>
              <div>
                <p className="text-xs font-semibold text-fuchsia-300 uppercase tracking-wider mb-0.5">Friendr Type</p>
                <p className="text-white font-bold text-lg leading-tight">{quizResult.title}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {quizResult.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-fuchsia-500/25 border border-fuchsia-500/40 text-fuchsia-200 text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-violet-400 group-hover:text-white transition-colors text-sm">Retake →</span>
          </Link>
        ) : (
          <Link
            href="/quiz"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-fuchsia-500/60 text-fuchsia-300 hover:bg-fuchsia-500/10 hover:text-white font-semibold transition-all mb-6"
          >
            <span className="text-lg">✨</span>
            Take the Friendr Quiz
          </Link>
        )}

        {/* Profile fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-violet-300 uppercase tracking-wider mb-1">Name</label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl bg-violet-900/50 border border-violet-700/50 text-white placeholder-violet-400/60 focus:outline-none focus:border-fuchsia-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-violet-300 uppercase tracking-wider mb-1">Bio</label>
            <textarea
              rows={3}
              placeholder="Tell others a bit about yourself..."
              className="w-full px-4 py-3 rounded-xl bg-violet-900/50 border border-violet-700/50 text-white placeholder-violet-400/60 focus:outline-none focus:border-fuchsia-500 transition-colors resize-none"
            />
          </div>
        </div>

        {/* Save button */}
        <button className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition-all">
          Save Profile
        </button>
      </div>
    </main>
  );
}
