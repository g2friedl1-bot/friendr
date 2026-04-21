"use client";

import { useState, useMemo } from "react";
import { Search, Check, X, RefreshCw, ArrowLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const ALL_INTERESTS = [
  "Anime", "Architecture", "Art", "Astrology", "Astronomy",
  "Baking", "Basketball", "Board Games", "Books", "Business",
  "Camping", "Chess", "Coding", "Cooking", "Crafts", "Cycling",
  "Dancing", "Design", "DIY", "Drawing",
  "Fashion", "Film Making", "Fitness", "Football",
  "Gaming", "Gardening",
  "Hiking", "History",
  "Investing",
  "Journaling",
  "Kayaking",
  "Languages", "LGBTQ+",
  "Meditation", "Movies", "Music",
  "Nature",
  "Outdoors",
  "Painting", "Philosophy", "Photography", "Podcasts", "Politics",
  "Reading", "Rock Climbing", "Running",
  "Science", "Singing", "Skateboarding", "Skiing", "Soccer", "Spirituality", "Sports", "Surfing",
  "Technology", "Tennis", "Travel",
  "Video Games", "Volunteering",
  "Weightlifting", "Writing",
  "Yoga",
  "Anything & Everything",
];

type Option = { label: string; traits: string[] };
type Question = { id: string; question: string; options: Option[] };

const QUESTIONS: Question[] = [
  {
    id: "recharge",
    question: "How do you recharge after a long week?",
    options: [
      { label: "Quiet time alone — no people, no noise", traits: ["introvert"] },
      { label: "A small hangout with close friends", traits: ["ambivert"] },
      { label: "A big night out or social event", traits: ["extrovert"] },
      { label: "Spontaneous adventure — whatever feels right", traits: ["extrovert", "spontaneous"] },
    ],
  },
  {
    id: "party",
    question: "At a party or gathering, you're most likely...",
    options: [
      { label: "Working the room, talking to everyone", traits: ["extrovert", "bright"] },
      { label: "Having one deep conversation in the corner", traits: ["introvert", "deep"] },
      { label: "With my small crew, ignoring everyone else", traits: ["loyal"] },
      { label: "Honestly... checking when I can leave", traits: ["introvert"] },
    ],
  },
  {
    id: "friends_say",
    question: "Your friends would describe you as...",
    options: [
      { label: "The funny one who lights up any room", traits: ["bright", "extrovert"] },
      { label: "The one who always knows what to say", traits: ["empathetic", "deep"] },
      { label: "The wild card — unpredictable in the best way", traits: ["spontaneous", "bright"] },
      { label: "The quiet one who observes everything", traits: ["introvert", "deep"] },
    ],
  },
  {
    id: "new_people",
    question: "When you meet someone new, you...",
    options: [
      { label: "Open up right away — life's too short", traits: ["extrovert", "bright"] },
      { label: "Warm up slowly — I need to feel safe first", traits: ["introvert"] },
      { label: "Ask them a hundred questions about themselves", traits: ["empathetic", "curious"] },
      { label: "Let them come to me — I don't chase", traits: ["introvert", "calm"] },
    ],
  },
  {
    id: "friday",
    question: "Your ideal Friday night looks like...",
    options: [
      { label: "Out exploring somewhere new", traits: ["spontaneous", "extrovert"] },
      { label: "Cozy at home — blanket, snacks, something to watch", traits: ["introvert"] },
      { label: "Hosting friends at my place", traits: ["extrovert", "loyal"] },
      { label: "Deep conversation with one good friend", traits: ["introvert", "deep", "empathetic"] },
    ],
  },
  {
    id: "emotions",
    question: "How do you usually handle your emotions?",
    options: [
      { label: "Talk it out — I process by sharing", traits: ["extrovert", "empathetic"] },
      { label: "Journal or reflect quietly", traits: ["introvert", "deep"] },
      { label: "Distract myself until it passes", traits: ["spontaneous"] },
      { label: "Sit with it — feelings are data", traits: ["calm", "deep"] },
    ],
  },
  {
    id: "energy",
    question: "How do people describe your energy?",
    options: [
      { label: "Magnetic — people gravitate toward me", traits: ["bright", "extrovert"] },
      { label: "Warm and calming — I make people feel safe", traits: ["empathetic", "calm"] },
      { label: "Intense — I go deep fast", traits: ["deep", "introvert"] },
      { label: "Chill and easy-going — nothing fazes me", traits: ["calm", "spontaneous"] },
    ],
  },
  {
    id: "conflict",
    question: "When there's conflict, you...",
    options: [
      { label: "Address it head-on — I hate unresolved tension", traits: ["bright", "extrovert"] },
      { label: "Take space first, then come back to talk", traits: ["introvert", "calm"] },
      { label: "Try to make everyone laugh to defuse it", traits: ["bright", "spontaneous"] },
      { label: "Listen to both sides and find middle ground", traits: ["empathetic", "deep"] },
    ],
  },
];

type PersonalityResult = { emoji: string; title: string; tags: string[]; blurb: string };

function generateResult(interests: string[], companion: string, answers: Record<string, string[]>): PersonalityResult {
  const allTraits = Object.values(answers).flat();
  const count = (t: string) => allTraits.filter((x) => x === t).length;
  const introScore = count("introvert"), extroScore = count("extrovert");
  const isIntrovert = introScore > extroScore;
  const isBright = count("bright") >= 2, isDeep = count("deep") >= 2;
  const isEmpathetic = count("empathetic") >= 2, isCalm = count("calm") >= 2;
  const isSpontaneous = count("spontaneous") >= 2;
  const interestSet = interests.map((i) => i.toLowerCase());
  const hasInterest = (...words: string[]) => words.some((w) => interestSet.some((s) => s.includes(w)));
  const isOpenAll = hasInterest("anything & everything");
  const tags: string[] = [];
  if (isIntrovert) tags.push("Introvert"); else tags.push("Extrovert");
  if (isBright) tags.push("Bright Energy");
  if (isDeep) tags.push("Deep Thinker");
  if (isEmpathetic) tags.push("Highly Empathetic");
  if (isCalm) tags.push("Calm & Steady");
  if (isSpontaneous) tags.push("Spontaneous");
  if (isOpenAll) tags.push("Open to Everything");
  const companionLabel = companion === "any" ? "companion" : `${companion} companion`;
  if (isOpenAll) return { emoji: "🌍", title: "The Open Soul", tags, blurb: `You're a rare breed — someone genuinely open to everything life throws at you. ${isIntrovert ? "You recharge in your own world but shine when it counts." : "Your energy is infectious and you light up every room."} You're searching for a ${companionLabel} who matches your curiosity and endless capacity for connection.` };
  if (isBright && !isIntrovert) return { emoji: "✨", title: "The Social Spark", tags, blurb: `You walk into a room and people notice. Your energy is magnetic and your laugh is contagious. ${isDeep ? "But beneath the brightness, you crave real depth too." : "You live for the moment and love bringing people together."} Your ideal ${companionLabel} can keep up with your vibe and isn't afraid to match your energy.` };
  if (isDeep && isIntrovert) return { emoji: "🧠", title: "The Deep Thinker", tags, blurb: `Small talk bores you. You want the real stuff — ideas, feelings, the meaning behind things. You're ${isCalm ? "calm and observant" : "intense and passionate"}, and you form deep bonds with the few people who really get you. Your ideal ${companionLabel} won't just scratch the surface.` };
  if (isEmpathetic) return { emoji: "💜", title: "The Heart of the Group", tags, blurb: `People come to you because you actually listen. You have an uncanny ability to make others feel seen and understood. ${isIntrovert ? "You're selective with your energy, but fiercely loyal to those you let in." : "Your warmth draws people in naturally."} You need a ${companionLabel} who appreciates emotional depth and reciprocates your care.` };
  if (isCalm && isSpontaneous) return { emoji: "🌊", title: "The Free Spirit", tags, blurb: `You go with the flow — but intentionally. You don't stress the small stuff and you're always down for wherever the night takes you. ${isIntrovert ? "You recharge alone but adventure solo or with the right person." : "You're easygoing and effortlessly fun to be around."} Your ${companionLabel} should be just as laid-back and up for anything.` };
  if (!isIntrovert && hasInterest("travel", "hiking", "camping", "outdoors", "surfing", "skiing")) return { emoji: "⚡", title: "The Adventurer", tags, blurb: `You live for experiences. New places, new people, new challenges — that's your fuel. ${isSpontaneous ? "You rarely plan and you love it that way." : "You love exploring with purpose and passion."} You need a ${companionLabel} who won't hold you back and will actually want to come along for the ride.` };
  if (hasInterest("art", "music", "writing", "painting", "drawing", "film", "photography")) return { emoji: "🎨", title: "The Creative Soul", tags, blurb: `You see the world differently — and that's your gift. You turn feelings into something tangible and find beauty where others don't look. ${isIntrovert ? "You do your best work in solitude but open up beautifully with the right person." : "Your creativity comes alive with people around you."} Your ${companionLabel} should appreciate the art in everyday life.` };
  return { emoji: "🌟", title: "The Unique One", tags, blurb: `You don't fit neatly into a box — and that's exactly what makes you interesting. You're a blend of contradictions that somehow just works. ${isIntrovert ? "Thoughtful and private," : "Outgoing and open,"} you bring something rare to every friendship. Your ${companionLabel} will love uncovering every layer of who you are.` };
}

type Step = "companion" | "questions" | "interests" | "results";

export default function QuizPage() {
  const [step, setStep] = useState<Step>("companion");
  const [companion, setCompanion] = useState<"male" | "female" | "any" | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<PersonalityResult | null>(null);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return ALL_INTERESTS.filter((i) => i.toLowerCase().includes(q));
  }, [search]);

  function toggleInterest(interest: string) {
    if (interest === "Anything & Everything") {
      setSelected((prev) => prev.has("Anything & Everything") ? new Set() : new Set(ALL_INTERESTS));
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete("Anything & Everything");
        if (next.has(interest)) next.delete(interest); else next.add(interest);
        return next;
      });
    }
  }

  function handleNextQuestion() {
    if (currentQ < QUESTIONS.length - 1) setCurrentQ((q) => q + 1);
    else setStep("interests");
  }

  function handleSubmit() {
    const r = generateResult([...selected], companion!, answers);
    setResult(r);
    localStorage.setItem("friendr_quiz_result", JSON.stringify({ emoji: r.emoji, title: r.title, tags: r.tags }));
    localStorage.setItem("friendr_interests", JSON.stringify([...selected]));
    setStep("results");
  }

  function handleRetake() {
    setStep("companion"); setCompanion(null); setCurrentQ(0);
    setAnswers({}); setSearch(""); setSelected(new Set()); setResult(null);
  }

  const progress = step === "companion" ? 5 : step === "questions" ? 10 + (currentQ / QUESTIONS.length) * 60 : step === "interests" ? 80 : 100;

  const progressBar = (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-zinc-500">{step === "companion" ? "Let's get started" : step === "questions" ? `Question ${currentQ + 1} of ${QUESTIONS.length}` : step === "interests" ? "Almost done!" : "Complete"}</span>
        <span className="text-xs text-zinc-500">{Math.round(progress)}%</span>
      </div>
      <div className="h-1 rounded-full bg-zinc-800">
        <div className="h-full rounded-full bg-orange-500 transition-all duration-500" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );

  if (step === "results" && result) {
    return (
      <main className="min-h-screen bg-zinc-950 pb-32">
        <div className="max-w-lg mx-auto px-4 pt-8">
          <div className="flex items-center gap-3 mb-8">
            <Link href="/profile" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <h1 className="text-2xl font-bold text-white">Your Results</h1>
          </div>
          <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-6 mb-4 text-center">
            <div className="text-6xl mb-4">{result.emoji}</div>
            <h2 className="text-2xl font-bold text-white mb-4">{result.title}</h2>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {result.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-300 text-xs font-semibold">{tag}</span>
              ))}
            </div>
            <p className="text-zinc-300 leading-relaxed text-sm">{result.blurb}</p>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 mb-4">
            <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">Your Interests ({selected.size})</p>
            <div className="flex flex-wrap gap-2">
              {[...selected].map((s) => (
                <span key={s} className="px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs">{s}</span>
              ))}
            </div>
          </div>
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 mb-8 flex items-center justify-between">
            <span className="text-zinc-400 text-sm">Looking for...</span>
            <span className="text-white font-semibold text-sm capitalize">{companion === "any" ? "Any / Open" : companion}</span>
          </div>
          <button onClick={handleRetake} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white font-semibold transition-all">
            <RefreshCw className="w-4 h-4" />
            Retake the Quiz
          </button>
        </div>
      </main>
    );
  }

  if (step === "interests") {
    return (
      <main className="min-h-screen bg-zinc-950 pb-32">
        <div className="max-w-lg mx-auto px-4 pt-8">
          {progressBar}
          <div className="flex items-center gap-3 mb-6">
            <button onClick={() => { setCurrentQ(QUESTIONS.length - 1); setStep("questions"); }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">Your Interests</h1>
              <p className="text-zinc-500 text-sm">Pick everything that excites you</p>
            </div>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search interests..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-600 focus:outline-none focus:border-orange-500 transition-colors" />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {selected.size > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {[...selected].map((s) => (
                <span key={s} onClick={() => toggleInterest(s)}
                  className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs cursor-pointer hover:bg-orange-500/30 transition-all">
                  {s}<X className="w-3 h-3" />
                </span>
              ))}
            </div>
          )}
          <div className="grid grid-cols-2 gap-2">
            {filtered.map((interest) => {
              const isSelected = selected.has(interest);
              return (
                <button key={interest} onClick={() => toggleInterest(interest)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl border text-sm font-medium text-left transition-all ${isSelected ? "bg-orange-500/15 border-orange-500/50 text-white" : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-orange-500/40 hover:text-white"}`}>
                  <span>{interest}</span>
                  {isSelected && <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                </button>
              );
            })}
            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-8 text-zinc-600">No interests match &ldquo;{search}&rdquo;</div>
            )}
          </div>
        </div>
        <div className="fixed bottom-[65px] left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-4 py-4 z-40">
          <div className="max-w-lg mx-auto flex items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">{selected.size > 0 ? `${selected.size} selected` : "Pick at least one"}</p>
            <button onClick={handleSubmit} disabled={selected.size === 0}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-orange-500 hover:bg-orange-400 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-all">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (step === "questions") {
    const q = QUESTIONS[currentQ];
    const answered = answers[q.id];
    return (
      <main className="min-h-screen bg-zinc-950 pb-24">
        <div className="max-w-lg mx-auto px-4 pt-8">
          {progressBar}
          <div className="flex items-center gap-3 mb-8">
            <button onClick={() => { if (currentQ === 0) setStep("companion"); else setCurrentQ((q) => q - 1); }}
              className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>
            <h1 className="text-2xl font-bold text-white">Friendr Quiz</h1>
          </div>
          <p className="text-lg font-semibold text-white mb-6 leading-snug">{q.question}</p>
          <div className="space-y-3 mb-8">
            {q.options.map((opt) => {
              const isSelected = answered && JSON.stringify(answered) === JSON.stringify(opt.traits);
              return (
                <button key={opt.label} onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: opt.traits }))}
                  className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${isSelected ? "bg-orange-500/15 border-orange-500/50 text-white" : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-orange-500/40 hover:text-white"}`}>
                  <div className="flex items-center justify-between gap-3">
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-4 h-4 text-orange-400 flex-shrink-0" />}
                  </div>
                </button>
              );
            })}
          </div>
          <button onClick={handleNextQuestion} disabled={!answered}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all">
            {currentQ < QUESTIONS.length - 1 ? "Next" : "Pick Your Interests"}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 pb-24">
      <div className="max-w-lg mx-auto px-4 pt-8">
        {progressBar}
        <div className="flex items-center gap-3 mb-8">
          <Link href="/profile" className="w-9 h-9 flex items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-all">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white">Friendr Quiz</h1>
            <p className="text-zinc-500 text-sm">A few questions to find your people</p>
          </div>
        </div>
        <p className="text-lg font-semibold text-white mb-6">I&apos;m looking for a companion who is...</p>
        <div className="space-y-3 mb-8">
          {(["male", "female", "any"] as const).map((opt) => (
            <button key={opt} onClick={() => setCompanion(opt)}
              className={`w-full text-left px-5 py-4 rounded-xl border text-sm font-medium transition-all ${companion === opt ? "bg-orange-500/15 border-orange-500/50 text-white" : "bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-orange-500/40 hover:text-white"}`}>
              <div className="flex items-center justify-between">
                <span>{opt === "male" ? "Male" : opt === "female" ? "Female" : "Any / Open to anyone"}</span>
                {companion === opt && <Check className="w-4 h-4 text-orange-400" />}
              </div>
            </button>
          ))}
        </div>
        <button onClick={() => setStep("questions")} disabled={!companion}
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all">
          Start the Quiz <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </main>
  );
}
