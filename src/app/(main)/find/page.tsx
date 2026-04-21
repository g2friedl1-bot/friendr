"use client";

import { useEffect, useState } from "react";
import { getMatchedUsers, FakeUser } from "@/lib/users";
import Link from "next/link";
import { MessageCircle, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import AgeVerificationModal from "@/components/AgeVerificationModal";
import { useFriends } from "@/lib/useFriends";

export default function FindPage() {
  const router = useRouter();
  const [users, setUsers] = useState<FakeUser[]>([]);
  const [myInterests, setMyInterests] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const { isFriend, addFriend } = useFriends();

  useEffect(() => {
    setVerified(localStorage.getItem("friendr_age_verified") === "true");
    try {
      const saved = localStorage.getItem("friendr_interests");
      const interests: string[] = saved ? JSON.parse(saved) : [];
      setMyInterests(interests);
      setUsers(getMatchedUsers(interests));
    } catch {
      setUsers(getMatchedUsers([]));
    }
  }, []);

  function handleChat(userId: string) {
    if (!verified) { setPendingId(userId); setShowModal(true); }
    else router.push(`/chat/${userId}`);
  }

  function handleVerified() {
    localStorage.setItem("friendr_age_verified", "true");
    setVerified(true);
    setShowModal(false);
    if (pendingId) router.push(`/chat/${pendingId}`);
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">Find People</h1>
        <p className="text-zinc-500 text-sm mb-6">
          {myInterests.length > 0 ? "Sorted by shared interests — yours are highlighted" : "Add someone to start chatting"}
        </p>

        <div className="space-y-3">
          {users.map((user) => {
            const friend = isFriend(user.id);
            const shared = myInterests.length > 0
              ? user.interests.filter((i) => myInterests.includes(i))
              : [];
            const others = user.interests.filter((i) => !shared.includes(i));

            return (
              <div key={user.id} className="rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors overflow-hidden">
                {/* Top row */}
                <div className="flex items-center gap-4 px-4 pt-4 pb-3">
                  <Link href={`/users/${user.id}`} className="flex-shrink-0">
                    <img src={user.photo} alt={user.name} className="w-11 h-11 rounded-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link href={`/users/${user.id}`}>
                        <span className="font-semibold text-zinc-900 dark:text-white hover:text-brand transition-colors text-sm">{user.name}, {user.age}</span>
                      </Link>
                      {shared.length > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-brand/10 border border-brand/20 text-brand text-xs font-semibold">
                          {shared.length} in common
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs mt-0.5 truncate">{user.bio}</p>
                  </div>

                  {friend ? (
                    <button
                      onClick={() => handleChat(user.id)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-brand hover:bg-brand-light text-white text-xs font-semibold transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Chat
                    </button>
                  ) : (
                    <button
                      onClick={() => addFriend(user.id)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full bg-zinc-900 dark:bg-white hover:bg-zinc-700 dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold transition-all"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Add
                    </button>
                  )}
                </div>

                {/* Interest chips */}
                {(shared.length > 0 || others.length > 0) && (
                  <div className="flex flex-wrap gap-1.5 px-4 pb-4">
                    {shared.map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/30 text-brand text-xs font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                    {others.slice(0, 4 - Math.min(shared.length, 4)).map((interest) => (
                      <span
                        key={interest}
                        className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 text-xs"
                      >
                        {interest}
                      </span>
                    ))}
                    {user.interests.length > 4 && (
                      <span className="px-2.5 py-1 text-xs text-zinc-400 dark:text-zinc-600">
                        +{user.interests.length - 4} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {myInterests.length === 0 && (
          <div className="mt-6 px-4 py-4 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-zinc-500 text-sm mb-1">Take the quiz to see shared interests</p>
            <Link href="/quiz" className="text-brand text-sm font-semibold hover:underline">
              Take the Friendr Quiz →
            </Link>
          </div>
        )}
      </div>
      {showModal && <AgeVerificationModal onVerify={handleVerified} onCancel={() => setShowModal(false)} />}
    </main>
  );
}
