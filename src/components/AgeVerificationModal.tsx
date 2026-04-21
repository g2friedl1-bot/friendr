"use client";

import { ShieldCheck } from "lucide-react";

type Props = { onVerify: () => void; onCancel: () => void };

export default function AgeVerificationModal({ onVerify, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-orange-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Age Verification</h2>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Friendr is for users <strong className="text-white">18 and older</strong>. By tapping Verify, you confirm that you meet this requirement.
          </p>
          <button onClick={onVerify}
            className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold mb-3 transition-all">
            ✓ Verify — I am 18 or older
          </button>
          <button onClick={onCancel}
            className="w-full py-2.5 rounded-xl border border-zinc-700 text-zinc-400 hover:text-white hover:border-zinc-500 transition-all text-sm font-medium">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
