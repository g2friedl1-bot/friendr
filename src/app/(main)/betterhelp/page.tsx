import Link from "next/link";
import { ArrowLeft, ExternalLink, Phone } from "lucide-react";
import BetterHelpLogo from "@/components/BetterHelpLogo";

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-950 via-fuchsia-950 to-rose-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/home" className="w-9 h-9 flex items-center justify-center rounded-full bg-violet-800/60 hover:bg-violet-700/70 text-violet-200 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Crisis & Support</h1>
        </div>

        {/* 988 Lifeline */}
        <div className="rounded-2xl bg-red-500/10 border border-red-500/40 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center">
              <Phone className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <p className="font-bold text-white">988 Suicide & Crisis Lifeline</p>
              <p className="text-xs text-red-300/80">Free · Confidential · 24/7</p>
            </div>
          </div>
          <p className="text-sm text-rose-200/80 leading-relaxed mb-4">
            If you or someone you know is in crisis, reach out immediately. Call or text <strong className="text-white">988</strong> from any phone in the US.
          </p>
          <a href="tel:988" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold transition-all">
            <Phone className="w-4 h-4" />
            Call or Text 988
          </a>
        </div>

        {/* Crisis Text Line */}
        <div className="rounded-2xl bg-violet-800/30 border border-violet-600/40 p-5 mb-4">
          <p className="font-bold text-white mb-1">Crisis Text Line</p>
          <p className="text-sm text-violet-200/80 mb-3">Text <strong className="text-white">HOME</strong> to <strong className="text-white">741741</strong> to connect with a trained crisis counselor via text message.</p>
          <a href="sms:741741?body=HOME" className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-violet-700/60 border border-violet-600/50 text-white font-semibold text-sm hover:bg-violet-700 transition-all">
            Text HOME to 741741
          </a>
        </div>

        {/* BetterHelp */}
        <div className="rounded-2xl bg-white/5 border border-violet-700/40 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <BetterHelpLogo className="w-10 h-10" />
            <div>
              <p className="font-bold text-white">BetterHelp</p>
              <p className="text-xs text-violet-300/80">Licensed therapists online</p>
            </div>
          </div>
          <p className="text-sm text-violet-200/80 leading-relaxed mb-4">
            Connect with a licensed therapist for ongoing mental health support. Not for emergencies — for that, use 988.
          </p>
          <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#5C6BC0] hover:bg-[#4a58a8] text-white font-semibold text-sm transition-all">
            <BetterHelpLogo className="w-4 h-4" />
            Visit BetterHelp
            <ExternalLink className="w-3.5 h-3.5 opacity-70" />
          </a>
        </div>

        <p className="text-center text-xs text-violet-400/60 mt-4">
          You are not alone. Help is available right now.
        </p>
      </div>
    </main>
  );
}
