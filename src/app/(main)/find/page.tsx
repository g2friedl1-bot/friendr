"use client";

import { useEffect, useState } from "react";
import { getMatchedUsers, FakeUser } from "@/lib/users";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import AgeVerificationModal from "@/components/AgeVerificationModal";

export default function FindPage() {
  const router = useRouter();
  const [users, setUsers] = useState<FakeUser[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(localStorage.getItem("friendr_age_verified") === "true");
    try {
      const saved = localStorage.getItem("friendr_quiz_result");
      const quizInterests = saved ? JSON.parse(saved).tags ?? [] : [];
      // Use quiz interests to sort
      const interestsSaved = localStorage.getItem("friendr_interests");
      const interests: string[] = interestsSaved ? JSON.parse(interestsSaved) : [];
      setUsers(getMatchedUsers(interests));
    } catch {
      setUsers(getMatchedUsers([]));
    }
  }, []);

  function handleChat(userId: string) {
    if (!verified) {
      setPendingId(userId);
      setShowModal(true);
    } else {
      router.push(`/chat/${userId}`);
    }
  }

  function handleVerified() {
    localStorage.setItem("friendr_age_verified", "true");
    setVerified(true);
    setShowModal(false);
    if (pendingId) router.push(`/chat/${pendingId}`);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-white mb-2">Find People</h1>
        <p className="text-violet-300/70 text-sm mb-6">Matched by your interests</p>

        <div className="space-y-3">
          {users.map((user) => (
            <div key={user.id} className="flex items-center gap-4 px-4 py-4 rounded-2xl bg-violet-900/40 border border-violet-700/40">
              <Link href={`/users/${user.id}`} className={`w-12 h-12 rounded-full bg-gradient-to-br ${user.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {user.initials}
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/users/${user.id}`}>
                  <p className="font-semibold text-white hover:text-fuchsia-300 transition-colors">{user.name}, {user.age}</p>
                </Link>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.interests.slice(0, 3).map((i) => (
                    <span key={i} className="px-2 py-0.5 rounded-full bg-violet-800/60 text-violet-300 text-xs">{i}</span>
                  ))}
                  {user.interests.length > 3 && (
                    <span className="text-xs text-violet-400/60">+{user.interests.length - 3} more</span>
                  )}
                </div>
              </div>
              <button onClick={() => handleChat(user.id)}
                className="flex-shrink-0 w-9 h-9 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center text-fuchsia-300 hover:bg-fuchsia-500/40 hover:text-white transition-all">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <AgeVerificationModal onVerify={handleVerified} onCancel={() => setShowModal(false)} />
      )}
    </main>
  );
}
