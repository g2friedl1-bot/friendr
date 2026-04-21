"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllPosts } from "@/lib/users";

function timeLabel(hoursAgo: number) {
  if (hoursAgo < 1) return "just now";
  if (hoursAgo === 1) return "1 hour ago";
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const d = Math.floor(hoursAgo / 24);
  return d === 1 ? "1 day ago" : `${d} days ago`;
}

export default function HomePage() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    setUsername(localStorage.getItem("friendr_username") || "");
  }, []);

  const posts = getAllPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-black text-white tracking-tight">Friendr</h1>
          {username && (
            <p className="text-violet-300/80 mt-1">Hey, {username}! 👋</p>
          )}
        </div>

        {/* Feed */}
        <div className="space-y-3">
          {posts.map((post, i) => (
            <div key={i} className="p-4 rounded-2xl bg-violet-900/40 border border-violet-700/40 hover:border-violet-600/60 transition-colors">
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <Link href={`/users/${post.user.id}`} className="flex-shrink-0">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${post.user.gradient} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                    {post.user.initials}
                  </div>
                </Link>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 mb-1">
                    <Link href={`/users/${post.user.id}`} className="font-semibold text-white hover:text-fuchsia-300 transition-colors text-sm">
                      {post.user.name}
                    </Link>
                    <span className="text-xs text-violet-400/70">{timeLabel(post.hoursAgo)}</span>
                  </div>
                  <p className="text-violet-100/90 text-sm leading-relaxed">{post.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
