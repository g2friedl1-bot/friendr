"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/users";

function timeLabel(hoursAgo: number) {
  if (hoursAgo < 1) return "just now";
  if (hoursAgo === 1) return "1h ago";
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const d = Math.floor(hoursAgo / 24);
  return d === 1 ? "1d ago" : `${d}d ago`;
}

const posts = getAllPosts();

export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("friendr_username") || "");
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-baseline gap-1 mb-1">
          <h1 className="text-2xl font-black text-white tracking-tight">
            friend<span className="text-brand">r</span>
          </h1>
        </div>
        {username && (
          <p className="text-zinc-500 text-sm mb-6">Hey, {username} 👋</p>
        )}

        <div className="space-y-2">
          {posts.map((post, i) => (
            <div key={i} className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-colors">
              <div className="flex items-start gap-3">
                <Link href={`/users/${post.user.id}`} className="flex-shrink-0">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${post.user.gradient} flex items-center justify-center text-white font-bold text-xs`}>
                    {post.user.initials}
                  </div>
                </Link>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <Link href={`/users/${post.user.id}`} className="font-semibold text-white hover:text-brand-light transition-colors text-sm">
                      {post.user.name}
                    </Link>
                    <span className="text-xs text-zinc-600">{timeLabel(post.hoursAgo)}</span>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed">{post.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
