"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Shield } from "lucide-react";

export default function SettingsPage() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setVerified(localStorage.getItem("friendr_age_verified") === "true");
  }, []);

  const items = [
    { label: "Interests & Quiz", desc: "Update your interests and personality quiz", href: "/quiz" },
    { label: "Notifications", desc: "Manage push notifications", href: "#" },
    { label: "Privacy", desc: "Control who can see your profile", href: "#" },
    { label: "Blocked Users", desc: "View and manage blocked accounts", href: "#" },
    { label: "Account", desc: "Email, password and account info", href: "#" },
    { label: "Help & Support", desc: "FAQs and contact support", href: "#" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        {/* Age verification status */}
        <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl border mb-6 ${verified ? "bg-green-500/10 border-green-500/40" : "bg-violet-900/40 border-violet-700/50"}`}>
          {verified ? (
            <ShieldCheck className="w-6 h-6 text-green-400 flex-shrink-0" />
          ) : (
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0" />
          )}
          <div>
            <p className={`font-semibold text-sm ${verified ? "text-green-300" : "text-white"}`}>
              Age Verification: {verified ? "✓ Verified (18+)" : "Not Verified"}
            </p>
            <p className="text-xs text-violet-400/70 mt-0.5">
              {verified ? "You have confirmed you are 18 or older." : "Required to chat with other users."}
            </p>
          </div>
        </div>

        {/* Settings list */}
        <div className="space-y-2">
          {items.map((item) => (
            <Link key={item.label} href={item.href}
              className="flex items-center justify-between px-4 py-4 rounded-xl bg-violet-900/40 border border-violet-700/50 hover:border-fuchsia-500/50 cursor-pointer transition-colors">
              <div>
                <p className="font-semibold text-white text-sm">{item.label}</p>
                <p className="text-xs text-violet-300/80 mt-0.5">{item.desc}</p>
              </div>
              <span className="text-violet-400 text-lg">›</span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
          className="mt-8 w-full py-3 rounded-xl border border-rose-500/50 text-rose-400 font-semibold hover:bg-rose-500/10 transition-all">
          Sign Out
        </button>
      </div>
    </main>
  );
}
