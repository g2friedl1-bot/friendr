"use client";

import { ShieldCheck } from "lucide-react";

type Props = {
  onVerify: () => void;
  onCancel: () => void;
};

export default function AgeVerificationModal({ onVerify, onCancel }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-violet-950 border border-violet-700/60 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col items-center text-center">
          <div className="w-14 h-14 rounded-full bg-fuchsia-500/20 border border-fuchsia-500/40 flex items-center justify-center mb-4">
            <ShieldCheck className="w-7 h-7 text-fuchsia-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Age Verification</h2>
          <p className="text-violet-300/80 text-sm leading-relaxed mb-6">
            Friendr is for users <strong className="text-white">18 and older</strong>. By tapping Verify, you confirm that you meet this requirement.
          </p>

          <button
            onClick={onVerify}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-rose-500 text-white font-semibold mb-3 hover:scale-[1.02] transition-all shadow-lg"
          >
            ✓ Verify — I am 18 or older
          </button>
          <button
            onClick={onCancel}
            className="w-full py-2.5 rounded-xl border border-violet-600/50 text-violet-300 hover:text-white hover:border-violet-400 transition-all text-sm font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
