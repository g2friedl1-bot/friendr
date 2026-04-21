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
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>

        <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl border mb-6 ${verified ? "bg-emerald-950/40 border-emerald-800/50" : "bg-zinc-900 border-zinc-800"}`}>
          {verified
            ? <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            : <Shield className="w-5 h-5 text-zinc-500 flex-shrink-0" />}
          <div>
            <p className={`font-semibold text-sm ${verified ? "text-emerald-300" : "text-white"}`}>
              Age Verification: {verified ? "✓ Verified (18+)" : "Not Verified"}
            </p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {verified ? "You have confirmed you are 18 or older." : "Required to chat with other users."}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          {items.map((item) => (
            <Link key={item.label} href={item.href}
              className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer">
              <div>
                <p className="font-semibold text-white text-sm">{item.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
              <span className="text-zinc-600">›</span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          className="mt-8 w-full py-3 rounded-xl border border-zinc-800 text-zinc-500 hover:border-red-800 hover:text-red-400 font-semibold transition-all text-sm">
          Sign Out
        </button>
      </div>
    </main>
  );
}
