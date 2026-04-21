"use client";

import Link from "next/link";
import { Camera, Pencil, UserMinus } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useFriends } from "@/lib/useFriends";
import { getUserById } from "@/lib/users";

type QuizSummary = { emoji: string; title: string; tags: string[] };

export default function ProfilePage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [quizResult, setQuizResult] = useState<QuizSummary | null>(null);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { friends, removeFriend } = useFriends();

  useEffect(() => {
    const saved = localStorage.getItem("friendr_quiz_result");
    if (saved) { try { setQuizResult(JSON.parse(saved)); } catch { /* skip */ } }
    setName(localStorage.getItem("friendr_profile_name") || "");
    setBio(localStorage.getItem("friendr_profile_bio") || "");
  }, []);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatar(URL.createObjectURL(file));
  }

  function handleSave() {
    localStorage.setItem("friendr_profile_name", name);
    localStorage.setItem("friendr_profile_bio", bio);
    setEditing(false);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Profile</h1>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>

        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-light to-brand flex items-center justify-center overflow-hidden">
              {avatar
                ? <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                : <span className="text-4xl font-bold text-white select-none">?</span>}
            </div>
            {editing && (
              <button onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 border-2 border-white dark:border-zinc-950 flex items-center justify-center hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
                <Camera className="w-3.5 h-3.5 text-zinc-700 dark:text-white" />
              </button>
            )}
          </div>
          {editing && (
            <button onClick={() => fileInputRef.current?.click()} className="text-xs text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
              Upload photo
            </button>
          )}
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        {quizResult ? (
          <Link href="/quiz"
            className="flex items-center justify-between px-5 py-4 rounded-2xl bg-brand/5 dark:bg-brand/10 border border-brand/20 dark:border-brand/30 mb-6 hover:border-brand/50 transition-all group">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{quizResult.emoji}</span>
              <div>
                <p className="text-xs font-semibold text-brand uppercase tracking-wider mb-0.5">Friendr Type</p>
                <p className="text-zinc-900 dark:text-white font-bold text-lg leading-tight">{quizResult.title}</p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {quizResult.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded-full bg-brand/10 dark:bg-brand/20 border border-brand/20 dark:border-brand/30 text-brand text-xs font-medium">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
            <span className="text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-white transition-colors text-sm">Retake →</span>
          </Link>
        ) : (
          <Link href="/quiz"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300 hover:border-brand/50 hover:text-brand font-semibold transition-all mb-6">
            <span className="text-lg">✨</span>
            Take the Friendr Quiz
          </Link>
        )}

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Tell others a bit about yourself..."
                className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors resize-none"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditing(false)}
                className="flex-1 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 py-3 rounded-xl bg-brand hover:bg-brand-light text-white font-semibold transition-all text-sm"
              >
                Save Profile
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {name && (
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Name</p>
                <p className="text-zinc-900 dark:text-white font-medium">{name}</p>
              </div>
            )}
            {bio && (
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Bio</p>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm leading-relaxed">{bio}</p>
              </div>
            )}
            {!name && !bio && (
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">Tap Edit to fill out your profile.</p>
            )}
          </div>
        )}

        {/* Friends list */}
        <div className="mt-8">
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
            Friends {friends.length > 0 && <span className="normal-case font-normal">({friends.length})</span>}
          </p>
          {friends.length === 0 ? (
            <div className="px-4 py-5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
              <p className="text-zinc-400 dark:text-zinc-600 text-sm">No friends added yet.</p>
              <Link href="/find" className="text-brand text-sm font-medium mt-1 inline-block hover:underline">
                Find people →
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {friends.map((fid) => {
                const u = getUserById(fid);
                if (!u) return null;
                return (
                  <div key={fid} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                    <Link href={`/users/${fid}`} className="flex-shrink-0">
                      <img src={u.photo} alt={u.name} className="w-10 h-10 rounded-full object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/users/${fid}`}>
                        <p className="font-semibold text-zinc-900 dark:text-white text-sm hover:text-brand transition-colors">{u.name}</p>
                      </Link>
                      <p className="text-zinc-500 text-xs truncate">{u.interests.slice(0, 2).join(", ")}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Link href={`/chat/${fid}`} className="px-3 py-1.5 rounded-full bg-brand hover:bg-brand-light text-white text-xs font-semibold transition-all">
                        Chat
                      </Link>
                      <button
                        onClick={() => removeFriend(fid)}
                        className="w-7 h-7 flex items-center justify-center rounded-full text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
                        aria-label="Remove friend"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
