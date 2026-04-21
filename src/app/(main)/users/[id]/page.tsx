"use client";

import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/lib/users";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Flag } from "lucide-react";
import { useState, useEffect } from "react";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import ReportModal from "@/components/ReportModal";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const user = getUserById(id);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [showReport, setShowReport] = useState(false);
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
      <main className="min-h-screen bg-white dark:bg-zinc-950 flex items-center justify-center">
        <p className="text-zinc-400">User not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-center justify-between mb-6">
          <Link href="/home" className="inline-flex items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors text-sm">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <button
            onClick={() => setShowReport(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 dark:text-zinc-500 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
          >
            <Flag className="w-3.5 h-3.5" />
            Report
          </button>
        </div>

        <div className="flex items-center gap-5 mb-6">
          <img
            src={user.photo}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover ring-2 ring-zinc-200 dark:ring-zinc-700"
          />
          <div>
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">{user.name}</h1>
            <p className="text-zinc-500 text-sm">Age {user.age}</p>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm mt-1">{user.bio}</p>
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
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">Interests</p>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span key={interest} className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 text-sm">
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">Posts</p>
          <div className="space-y-2">
            {user.posts.map((post, i) => (
              <div key={i} className="px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <p className="text-zinc-700 dark:text-zinc-300 text-sm leading-relaxed">{post.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showAgeModal && <AgeVerificationModal onVerify={handleVerified} onCancel={() => setShowAgeModal(false)} />}
      {showReport && <ReportModal name={user.name} onClose={() => setShowReport(false)} />}
    </main>
  );
}
