"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShieldCheck, Shield, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/useTheme";

export default function SettingsPage() {
  const [verified, setVerified] = useState(false);
  const { theme, toggle } = useTheme();

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
    <main className="min-h-screen bg-white dark:bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Settings</h1>

        {/* Theme toggle */}
        <div className="flex items-center justify-between px-4 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-4">
          <div className="flex items-center gap-3">
            {theme === "dark"
              ? <Moon className="w-5 h-5 text-zinc-400" />
              : <Sun className="w-5 h-5 text-amber-500" />}
            <div>
              <p className="font-semibold text-zinc-900 dark:text-white text-sm">
                {theme === "dark" ? "Dark Mode" : "Light Mode"}
              </p>
              <p className="text-xs text-zinc-500 mt-0.5">
                {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
              </p>
            </div>
          </div>
          <button
            onClick={toggle}
            className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${theme === "dark" ? "bg-brand" : "bg-zinc-300"}`}
          >
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${theme === "dark" ? "translate-x-6" : "translate-x-0.5"}`} />
          </button>
        </div>

        {/* Age verification */}
        <div className={`flex items-center gap-4 px-4 py-4 rounded-2xl border mb-6 ${verified ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50" : "bg-zinc-50 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"}`}>
          {verified
            ? <ShieldCheck className="w-5 h-5 text-emerald-500 dark:text-emerald-400 flex-shrink-0" />
            : <Shield className="w-5 h-5 text-zinc-400 flex-shrink-0" />}
          <div>
            <p className={`font-semibold text-sm ${verified ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-900 dark:text-white"}`}>
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
              className="flex items-center justify-between px-4 py-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors">
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white text-sm">{item.label}</p>
                <p className="text-xs text-zinc-500 mt-0.5">{item.desc}</p>
              </div>
              <span className="text-zinc-400">›</span>
            </Link>
          ))}
        </div>

        <button
          onClick={() => { localStorage.clear(); window.location.href = "/login"; }}
          className="mt-8 w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:border-red-300 dark:hover:border-red-800 hover:text-red-500 font-semibold transition-all text-sm">
          Sign Out
        </button>
      </div>
    </main>
  );
}
