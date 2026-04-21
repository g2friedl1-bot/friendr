export type FakeUser = {
  id: string;
  name: string;
  age: number;
  initials: string;
  gradient: string;
  photo: string;
  interests: string[];
  bio: string;
  posts: { text: string; hoursAgo: number }[];
  chatScript: string[];
};

export const FAKE_USERS: FakeUser[] = [
  {
    id: "alex",
    name: "Alex",
    age: 22,
    initials: "A",
    gradient: "from-violet-500 to-fuchsia-600",
    photo: "https://randomuser.me/api/portraits/men/55.jpg",
    interests: ["Hiking", "Photography", "Music", "Nature", "Outdoors"],
    bio: "Trail runner & amateur photographer. Always chasing golden hour.",
    posts: [
      { text: "Caught the most amazing sunrise on the trail this morning.", hoursAgo: 1 },
      { text: "New hiking boots just arrived — first real test this weekend.", hoursAgo: 8 },
      { text: "Nothing beats mountain air after a long week.", hoursAgo: 26 },
    ],
    chatScript: [
      "Hey! Saw we have some similar interests 😊 Do you hike at all?",
      "That's awesome! I just did this incredible trail with a waterfall view last weekend 🏔️",
      "I also got into photography recently — started bringing my camera on trails. The lighting out there is unreal",
      "We should compare playlists sometime too, music + hiking is such a combo 🎵",
      "This has been really nice chatting! Hope we can meet up on a trail sometime 😄",
    ],
  },
  {
    id: "jordan",
    name: "Jordan",
    age: 25,
    initials: "J",
    gradient: "from-blue-500 to-indigo-600",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    interests: ["Gaming", "Anime", "Coding", "Technology", "Board Games"],
    bio: "Software dev by day, gamer by night. Anime list never gets shorter.",
    posts: [
      { text: "Finally beat that boss I've been stuck on for two weeks.", hoursAgo: 2 },
      { text: "Anyone else watching the new season? No spoilers please.", hoursAgo: 14 },
      { text: "Pushed my first open source project today. Small win but a win.", hoursAgo: 36 },
    ],
    chatScript: [
      "Hey! Always nice to find someone with similar vibes 👾",
      "What are you playing right now? I just finished a 40-hour RPG and I have no idea what to do with my life 😂",
      "Into anime at all? I've been rewatching classics lately",
      "If you ever want to game together sometime that would be fun — I'm always down for co-op",
      "Anyway this was cool! Feel free to message me anytime 🙌",
    ],
  },
  {
    id: "sam",
    name: "Sam",
    age: 20,
    initials: "S",
    gradient: "from-rose-400 to-pink-600",
    photo: "https://randomuser.me/api/portraits/women/45.jpg",
    interests: ["Baking", "Reading", "Yoga", "Cooking", "Meditation"],
    bio: "Sourdough obsessed. Yoga student. Always have a book on the go.",
    posts: [
      { text: "Made sourdough from scratch today, turned out perfect.", hoursAgo: 3 },
      { text: "Morning yoga set the whole tone for today.", hoursAgo: 18 },
      { text: "Currently reading three books at once. Send help.", hoursAgo: 42 },
    ],
    chatScript: [
      "Hi! 😊 Love that we have similar interests",
      "Are you into cooking/baking at all? I've been on a sourdough kick for months",
      "I also do yoga — it's been such a good reset lately. Do you meditate?",
      "What are you reading right now? I'm always looking for recommendations 📚",
      "This was so nice! Let's chat again soon 🌸",
    ],
  },
  {
    id: "riley",
    name: "Riley",
    age: 28,
    initials: "R",
    gradient: "from-brand-light to-brand",
    photo: "https://randomuser.me/api/portraits/women/68.jpg",
    interests: ["Travel", "Photography", "Art", "Fashion", "Film Making"],
    bio: "Chasing sunsets, galleries, and good coffee. Aspiring filmmaker.",
    posts: [
      { text: "Car show downtown at 10am tomorrow, anyone going?", hoursAgo: 4 },
      { text: "Just booked flights for my next trip. Cannot wait.", hoursAgo: 22 },
      { text: "Gallery opening tonight was stunning. Art really does heal.", hoursAgo: 48 },
    ],
    chatScript: [
      "Hey! Fun to find someone with overlapping interests 🎬",
      "I'm working on a short film right now actually — into filmmaking or photography at all?",
      "I've been traveling a lot lately for shoots. Where's the coolest place you've been?",
      "Your aesthetic sense sounds incredible — we'd probably have a blast at a gallery sometime",
      "Really enjoyed this chat! Keep creating 🎨",
    ],
  },
  {
    id: "morgan",
    name: "Morgan",
    age: 23,
    initials: "M",
    gradient: "from-green-500 to-emerald-600",
    photo: "https://randomuser.me/api/portraits/men/11.jpg",
    interests: ["Fitness", "Sports", "Running", "Weightlifting", "Basketball"],
    bio: "5AM runs, heavy lifts, and game nights. Competitive but friendly.",
    posts: [
      { text: "5K personal best this morning. Felt unstoppable.", hoursAgo: 5 },
      { text: "Leg day. Enough said.", hoursAgo: 20 },
      { text: "Game tonight at 7 — let's go 🏀", hoursAgo: 44 },
    ],
    chatScript: [
      "Yo! Nice to connect 💪",
      "You into any sports or working out? I'm at the gym basically every day",
      "Just hit a new PR on my squat — those small wins keep you going ya know?",
      "We should play ball sometime if you're around — always looking for people to run with",
      "Solid chat! Let's link up 🤝",
    ],
  },
  {
    id: "taylor",
    name: "Taylor",
    age: 21,
    initials: "T",
    gradient: "from-fuchsia-500 to-purple-600",
    photo: "https://randomuser.me/api/portraits/women/22.jpg",
    interests: ["Music", "Dancing", "Fashion", "Singing", "Art"],
    bio: "Making playlists, making moves, making memories.",
    posts: [
      { text: "New playlist drop coming this week — been working on it for so long.", hoursAgo: 6 },
      { text: "Dance class was everything today.", hoursAgo: 28 },
      { text: "Can't stop listening to this album on repeat. Send music recs please.", hoursAgo: 52 },
    ],
    chatScript: [
      "Heyyy! 🎵 Love the vibe",
      "What kind of music are you into? I make playlists obsessively and am always looking for new ears",
      "I just started going to dance classes and I'm honestly terrible but I love it 😂",
      "What's your current song of the month? Like the one you can't stop playing?",
      "This was fun! Send me your fav song — no pressure 😌",
    ],
  },
  {
    id: "casey",
    name: "Casey",
    age: 26,
    initials: "C",
    gradient: "from-teal-400 to-cyan-600",
    photo: "https://randomuser.me/api/portraits/women/76.jpg",
    interests: ["Nature", "Gardening", "Cooking", "Outdoors", "Volunteering"],
    bio: "Community garden keeper. Slow mornings and long walks.",
    posts: [
      { text: "I loved the park today. Cherry blossoms are absolutely peak right now.", hoursAgo: 1 },
      { text: "Planted my first herb garden this spring — rosemary and basil are thriving.", hoursAgo: 30 },
      { text: "Volunteering at the food bank this Saturday — anyone want to join?", hoursAgo: 54 },
    ],
    chatScript: [
      "Hi there! 🌿 Always nice to meet someone who appreciates the outdoors",
      "I spend a lot of time at the community garden — there's something so grounding about it",
      "Do you cook much? I've been experimenting with garden-to-table stuff lately",
      "I also volunteer a lot — it's really helped me meet amazing people. Are you into that at all?",
      "Really glad we connected 😊 Take care of yourself out there!",
    ],
  },
  {
    id: "drew",
    name: "Drew",
    age: 24,
    initials: "D",
    gradient: "from-slate-400 to-blue-600",
    photo: "https://randomuser.me/api/portraits/men/43.jpg",
    interests: ["Technology", "Investing", "Podcasts", "Business", "Coding"],
    bio: "Builder, listener, learner. Trying to make things that matter.",
    posts: [
      { text: "New episode of my favorite podcast just dropped — highly recommend.", hoursAgo: 7 },
      { text: "Markets are wild right now but staying the course.", hoursAgo: 32 },
      { text: "Built a small tool today that saved me 2 hours a week. Small wins compound.", hoursAgo: 56 },
    ],
    chatScript: [
      "Hey! Seems like we're both into building things 👨‍💻",
      "I just shipped a side project — what do you work on? Or what are you learning?",
      "I'm obsessed with podcasts right now, mostly tech and investing ones. Any you'd recommend?",
      "I think the most underrated skill is just consistency. What keeps you motivated?",
      "Good talking! Let's keep in touch 🙌",
    ],
  },
  {
    id: "avery",
    name: "Avery",
    age: 22,
    initials: "AV",
    gradient: "from-pink-400 to-rose-600",
    photo: "https://randomuser.me/api/portraits/women/33.jpg",
    interests: ["Art", "Writing", "Film Making", "Photography", "Books"],
    bio: "Aspiring filmmaker. Amateur writer. Full-time overthinker.",
    posts: [
      { text: "Finished my short film script — now to find a crew.", hoursAgo: 9 },
      { text: "Reading three books at once is a personality trait apparently.", hoursAgo: 35 },
      { text: "Wrote 2000 words today. Tired but really proud.", hoursAgo: 60 },
    ],
    chatScript: [
      "Hi! Fellow creative? 🎨 Love that",
      "I just finished a script I've been working on for months — do you write or make things?",
      "Photography is my other obsession. There's something about capturing a moment that never gets old",
      "What's the last book that actually changed how you see things?",
      "This was so good! I love meeting people who create things 🙏",
    ],
  },
  {
    id: "quinn",
    name: "Quinn",
    age: 27,
    initials: "Q",
    gradient: "from-violet-400 to-indigo-600",
    photo: "https://randomuser.me/api/portraits/women/55.jpg",
    interests: ["Volunteering", "Spirituality", "Meditation", "Yoga", "Philosophy"],
    bio: "Still learning how to be present. Big believer in small acts of kindness.",
    posts: [
      { text: "Morning meditation changed my whole week. 10/10 would recommend.", hoursAgo: 2 },
      { text: "Grateful for the little things today. That's all.", hoursAgo: 38 },
      { text: "Had the most meaningful conversation with a stranger at the park today.", hoursAgo: 62 },
    ],
    chatScript: [
      "Hey, really glad you reached out 😊",
      "I've been meditating every morning for about a year now and it's genuinely shifted how I move through life",
      "Do you have any kind of mindfulness practice? Even just walks or journaling counts",
      "I'm really into philosophy lately — specifically what it means to live well. Heavy stuff but fun 😄",
      "This conversation made my day honestly. Be well 🙏",
    ],
  },
];

export function getUserById(id: string): FakeUser | undefined {
  return FAKE_USERS.find((u) => u.id === id);
}

export const ALL_POSTS = FAKE_USERS.flatMap((u) =>
  u.posts.map((p) => ({ ...p, user: u }))
).sort((a, b) => a.hoursAgo - b.hoursAgo);

export function getAllPosts() {
  return ALL_POSTS;
}

export function getMatchedUsers(interests: string[]): FakeUser[] {
  if (!interests.length) return FAKE_USERS;
  return [...FAKE_USERS].sort((a, b) => {
    const scoreA = a.interests.filter((i) => interests.includes(i)).length;
    const scoreB = b.interests.filter((i) => interests.includes(i)).length;
    return scoreB - scoreA;
  });
}
