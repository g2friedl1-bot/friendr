"use client";

import { useState } from "react";
import { X, Flag, CheckCircle } from "lucide-react";

const REASONS = [
  "Inappropriate behavior",
  "Harassment or bullying",
  "Spam or fake account",
  "Hate speech",
  "Unwanted messages",
  "Other",
];

type Props = {
  name: string;
  onClose: () => void;
};

export default function ReportModal({ name, onClose }: Props) {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit() {
    if (!reason) return;
    const reports = JSON.parse(localStorage.getItem("friendr_reports") || "[]");
    reports.push({ name, reason, description, at: new Date().toISOString() });
    localStorage.setItem("friendr_reports", JSON.stringify(reports));
    setSubmitted(true);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-2xl shadow-2xl overflow-hidden">
        {submitted ? (
          <div className="flex flex-col items-center text-center px-6 py-10">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center mb-4">
              <CheckCircle className="w-7 h-7 text-emerald-500" />
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Report Submitted</h2>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-6">
              Thanks for letting us know. We review every report and take action when needed.
            </p>
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all text-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-100 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <Flag className="w-4 h-4 text-red-500" />
                <h2 className="font-bold text-zinc-900 dark:text-white text-sm">Report {name}</h2>
              </div>
              <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-all">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-5 py-4 space-y-4">
              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-3">
                  Why are you reporting?
                </p>
                <div className="space-y-2">
                  {REASONS.map((r) => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${
                        reason === r
                          ? "bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-700/60 text-red-700 dark:text-red-300"
                          : "bg-zinc-50 dark:bg-zinc-800/60 border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      {r}
                      {reason === r && (
                        <span className="w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">
                  Additional details <span className="normal-case font-normal">(optional)</span>
                </p>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe what happened..."
                  className="w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-brand transition-colors resize-none text-sm"
                />
              </div>

              <div className="flex gap-3 pt-1 pb-1">
                <button
                  onClick={onClose}
                  className="flex-1 py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!reason}
                  className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all text-sm"
                >
                  Submit Report
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
