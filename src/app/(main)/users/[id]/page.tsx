"use client";

import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/lib/users";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";
import AgeVerificationModal from "@/components/AgeVerificationModal";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = getUserById(id);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(localStorage.getItem("friendr_age_verified") === "true");
  }, []);

  function handleChat() {
    if (!verified) setShowAgeModal(true);
    else router.push(`/chat/${id}`);
  }

  function handleVerified() {
    localStorage.setItem("friendr_age_verified", "true");
    setVerified(true);
    setShowAgeModal(false);
    router.push(`/chat/${id}`);
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-500">User not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <Link href="/home" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="flex items-center gap-5 mb-6">
          <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-white font-bold text-2xl`}>
            {user.initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-zinc-500 text-sm">Age {user.age}</p>
            <p className="text-zinc-400 text-sm mt-1">{user.bio}</p>
          </div>
        </div>

        <button
          onClick={handleChat}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-brand hover:bg-brand-light text-white font-semibold transition-all mb-6"
        >
          <MessageCircle className="w-4 h-4" />
          Chat with {user.name}
        </button>

        <div className="mb-6">
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Interests</p>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span key={interest} className="px-3 py-1.5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Posts</p>
          <div className="space-y-2">
            {user.posts.map((post, i) => (
              <div key={i} className="px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800">
                <p className="text-zinc-300 text-sm leading-relaxed">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAgeModal && <AgeVerificationModal onVerify={handleVerified} onCancel={() => setShowAgeModal(false)} />}
    </main>
  );
}
