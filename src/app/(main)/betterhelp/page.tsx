import Link from "next/link";
import { ArrowLeft, ExternalLink, Phone } from "lucide-react";
import BetterHelpLogo from "@/components/BetterHelpLogo";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/home" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Crisis & Support</h1>
        </div>

        <div className="rounded-2xl bg-red-950/50 border border-red-800/50 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-900/60 flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="font-bold text-white">988 Suicide & Crisis Lifeline</p>
              <p className="text-xs text-red-400/80">Free · Confidential · 24/7</p>
            </div>
          </div>
          <p className="text-sm text-zinc-300 leading-relaxed mb-4">
            If you or someone you know is in crisis, call or text <strong className="text-white">988</strong> from any US phone. Available 24/7.
          </p>
          <a href="tel:988" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all">
            <Phone className="w-4 h-4" />
            Call or Text 988
          </a>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 mb-4">
          <p className="font-bold text-white mb-1">Crisis Text Line</p>
          <p className="text-sm text-zinc-400 mb-3">Text <strong className="text-white">HOME</strong> to <strong className="text-white">741741</strong> to chat with a trained counselor via text.</p>
          <a href="sms:741741?body=HOME" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white font-semibold text-sm transition-all">
            Text HOME to 741741
          </a>
        </div>

        <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <BetterHelpLogo className="w-10 h-10" />
            <div>
              <p className="font-bold text-white">BetterHelp</p>
              <p className="text-xs text-zinc-500">Licensed therapists online</p>
            </div>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed mb-4">
            Connect with a licensed therapist for ongoing support. For emergencies, use 988 instead.
          </p>
          <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#5C6BC0] hover:bg-[#4a58a8] text-white font-semibold text-sm transition-all">
            Visit BetterHelp <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4">You are not alone. Help is available right now.</p>
      </div>
    </main>
  );
}
