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
      "hey! do you hike at all?",
      "ok wait that trail sounds so good, i did one last weekend that had this insane waterfall view halfway through",
      "i've been bringing my camera lately too. the light hits different out there honestly",
      "what do you listen to when you're hiking? i feel like the playlist makes or breaks it",
      "ok this was fun. we should actually do a trail sometime lol",
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
      "yo what are you playing rn",
      "i literally just finished a 40 hour rpg and have no idea what to do with myself",
      "are you into anime at all? i've been on a rewatch kick lately, started from the beginning on a few classics",
      "we should play something co-op sometime, i'm down whenever",
      "aight this was chill, hmu anytime",
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
      "hi! ok random but are you into baking at all",
      "i've been making sourdough for like 3 months straight, my roommate is so sick of it lol",
      "do you do yoga or anything like that? i just started going regularly and it's kind of changed my whole morning",
      "what are you reading rn? i need a rec, i keep starting things and not finishing them",
      "this was really nice actually, talk soon",
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
      "hey! are you into photography or film at all?",
      "i'm literally in the middle of editing a short film rn, it's been consuming my life for weeks",
      "i've been traveling a bunch lately for shoots — where's the coolest place you've ever been?",
      "we should hit a gallery sometime, i feel like we'd have the same taste honestly",
      "ok i need to get back to editing but this was fun, let's talk more",
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
      { text: "Game tonight at 7 — let's go", hoursAgo: 44 },
    ],
    chatScript: [
      "yo! you work out at all?",
      "i'm at the gym basically every day, it's kind of a problem at this point lol",
      "just hit a new squat pr this morning, honestly my whole day is better now",
      "you should come run with us sometime, we do pick up games on saturdays",
      "solid, let's link up",
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
      "heyy what kind of music are you into",
      "i make playlists literally all the time, like an embarrassing amount",
      "i just started taking dance classes and i am genuinely terrible but i don't even care",
      "what's your current song? like the one you've had on repeat this week",
      "ok send me your top song rn, no pressure but also do it",
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
      "hi! do you spend much time outside?",
      "i've been at the community garden like every weekend lately, it's genuinely my favorite place",
      "do you cook? i've been trying to do this whole garden-to-table thing and it's going ok lol",
      "i also volunteer at a food bank sometimes — weirdly one of the best things i've started doing",
      "really glad we connected, take care of yourself",
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
      "hey, what do you do / what are you building?",
      "i just shipped a side project last week, small thing but felt good to actually finish something",
      "i'm kind of obsessed with podcasts rn, mostly tech and finance stuff — any you'd actually recommend?",
      "honestly what keeps you motivated? i go through phases where i'm locked in and then just... not",
      "good talking, let's keep in touch",
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
      "hi! do you make stuff? like write or film or anything?",
      "i just finished a script i've been working on for months, feels so weird to be done with it",
      "photography is my other thing — i don't know there's something about capturing a moment that i can't explain",
      "what's the last book that actually made you think differently about something?",
      "ok i love talking to people who create things, this was really good",
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
      "hey, really glad you reached out",
      "i've been meditating every morning for almost a year now and honestly it's changed a lot for me",
      "do you have any kind of practice? walks count, journaling counts, even just sitting quietly for a bit",
      "i've been reading a lot of philosophy lately — specifically stuff about what it actually means to live well. heavy but i can't stop",
      "this conversation genuinely made my day, be well",
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
