export type AIResult = {
  text: string;
  isCrisis: boolean;
};

type ResponseRule = {
  triggers: string[];
  responses: string[];
  isCrisis?: boolean;
};

const RULES: ResponseRule[] = [
  {
    triggers: ["hello", "hi", "hey", "what's up", "wassup", "sup", "hiya", "howdy"],
    responses: [
      "Hey! 👋 Really glad you're here. How's your day going?",
      "Heyy! 😊 You made it — how are you doing today?",
      "Hi there! 👋 What's on your mind?",
    ],
  },
  {
    triggers: ["how are you", "how r u", "you doing", "you ok", "hows it going", "how's it going"],
    responses: [
      "I'm doing great, thanks for asking! 😊 More importantly — how are YOU doing today?",
      "Honestly? Loving this chat already 😄 How about you?",
      "Good! Always better when I have someone to talk to. What's going on with you?",
    ],
  },
  {
    triggers: ["sad", "unhappy", "miserable", "upset", "crying", "cry", "tears", "heartbroken"],
    responses: [
      "I'm really glad you told me that. 💜 You don't have to carry that alone. Want to tell me what's been going on?",
      "Hey, I hear you. 💜 It's okay to not be okay. What's been weighing on you?",
      "That sounds really hard. 💙 I'm here, and I'm listening — take your time.",
    ],
  },
  {
    triggers: ["depressed", "depression", "hopeless", "worthless", "empty inside", "numb"],
    responses: [
      "Thank you for trusting me with this. 💜 Those feelings are real and they're heavy. Are you getting any support right now?",
      "That takes courage to say. 💜 Depression is real, and you deserve real support. Have you been able to talk to anyone — a friend, family, or counselor?",
    ],
  },
  {
    triggers: ["lonely", "alone", "isolated", "no friends", "no one cares", "nobody"],
    responses: [
      "Feeling lonely is one of the hardest feelings — and more people feel it than you'd know. 💜 What's been making you feel this way?",
      "You're not alone, even when it feels like it. 💙 I'm here. Can you tell me more about what's going on?",
    ],
  },
  {
    triggers: ["anxious", "anxiety", "stressed", "stress", "overwhelmed", "panic", "panicking", "nervous"],
    responses: [
      "That sounds really tough. 💙 Stress and anxiety can feel so heavy. What's been piling up for you?",
      "Ugh, anxiety is the worst. 😮‍💨 Can you tell me more about what's got you feeling this way? Sometimes naming it helps.",
    ],
  },
  {
    triggers: ["angry", "mad", "furious", "pissed", "frustrated", "annoyed", "rage"],
    responses: [
      "Ugh, I get that. 😤 What happened? I want to hear your side.",
      "That sounds really frustrating. What's going on?",
      "Okay tell me everything — I'm listening 👂",
    ],
  },
  {
    triggers: ["happy", "great", "amazing", "awesome", "excited", "good day", "good mood", "fantastic", "wonderful"],
    responses: [
      "That's amazing to hear! 🎉 Tell me more — what made today so great?",
      "Love that energy!! 🌟 What happened?",
      "Yesss! 🙌 What's got you in such a good mood?",
    ],
  },
  {
    triggers: ["bored", "nothing to do", "boring", "so bored"],
    responses: [
      "Ugh boredom is real 😴 What do you usually like to do when you have free time?",
      "Let's fix that 😄 What are some things that usually get you going?",
    ],
  },
  {
    triggers: ["tired", "exhausted", "drained", "no energy", "worn out"],
    responses: [
      "Rest is so important — are you getting enough sleep? 😴 What's been tiring you out?",
      "Oof, I hear that. 💤 What's been draining your energy lately?",
    ],
  },
  {
    triggers: ["hiking", "trail", "mountain", "outdoors", "camping", "trekking"],
    responses: [
      "Oh you're into hiking? That's so cool! 🏔️ Do you have a favorite trail or spot?",
      "A hiker! 🌲 I love that. Where's the best place you've been?",
    ],
  },
  {
    triggers: ["music", "song", "playlist", "concert", "band", "artist", "album", "listening"],
    responses: [
      "Music lover! 🎵 What have you been listening to lately? I need recommendations.",
      "Ooh what's your current obsession? Give me your top 3 artists rn 🎶",
    ],
  },
  {
    triggers: ["gaming", "game", "play", "console", "pc", "xbox", "playstation", "nintendo"],
    responses: [
      "A gamer! 🎮 What are you playing right now?",
      "Let's go! 🕹️ What's your current game? I want all the details.",
    ],
  },
  {
    triggers: ["cooking", "baking", "food", "recipe", "eat", "meal", "restaurant"],
    responses: [
      "Okay foodie! 🍳 What's the best thing you've made or eaten recently?",
      "Ooh I love talking food 😋 What's your go-to meal you never get tired of?",
    ],
  },
  {
    triggers: ["reading", "book", "novel", "author", "literature"],
    responses: [
      "A reader! 📚 What are you reading right now? I want to know.",
      "Okay booklover, what's the best thing you've read this year?",
    ],
  },
  {
    triggers: ["art", "draw", "paint", "creative", "sketch", "design", "creating"],
    responses: [
      "You're creative! 🎨 What kind of art do you make?",
      "Love that! 🖌️ How long have you been into art?",
    ],
  },
  {
    triggers: ["travel", "trip", "vacation", "explore", "adventure", "flew", "traveling"],
    responses: [
      "Ooh a traveler! ✈️ Where have you been? Where do you WANT to go?",
      "I live for travel chat 🌍 What's the most memorable place you've visited?",
    ],
  },
  {
    triggers: ["fitness", "gym", "workout", "exercise", "run", "running", "lifting", "weights"],
    responses: [
      "Love that you're staying active! 💪 What does your routine look like?",
      "Getting those gains! 🏋️ What's your favorite way to work out?",
    ],
  },
  {
    triggers: ["dog", "cat", "pet", "puppy", "kitten", "animals"],
    responses: [
      "Oh you have a pet?! 🐾 I need to hear about them immediately.",
      "Animal lover! 🐶 Tell me about your pet — I want all the details.",
    ],
  },
  {
    triggers: ["work", "job", "career", "office", "boss", "coworker"],
    responses: [
      "Work stuff — always a topic 😅 What do you do? Or what do you WANT to do?",
      "Oof, work talk. What's going on there?",
    ],
  },
  {
    triggers: ["school", "college", "university", "studying", "homework", "class", "exam"],
    responses: [
      "School life! 📖 What are you studying?",
      "Are you in school right now? What's your major or focus?",
    ],
  },
  {
    triggers: ["suicide", "kill myself", "end it all", "don't want to be here", "want to die", "better off dead", "end my life", "wanna die", "want to end", "kill my self"],
    responses: [
      "I hear you, and I'm so glad you're talking to me right now. 💜 Please reach out to the 988 Suicide & Crisis Lifeline — call or text 988. They're available 24/7 and they care. You matter more than you know.",
    ],
    isCrisis: true,
  },
  {
    triggers: ["hurt myself", "self harm", "cutting", "hurting myself", "self-harm", "harm myself"],
    responses: [
      "Thank you for trusting me with this. 💜 You deserve real support right now. Please reach out — call or text 988, or text HOME to 741741. I'm here too.",
    ],
    isCrisis: true,
  },
  {
    triggers: ["thanks", "thank you", "thx", "ty", "appreciate"],
    responses: [
      "Of course! 😊 I'm always here.",
      "Anytime! 💜 That's what I'm here for.",
      "Always! What else is on your mind?",
    ],
  },
  {
    triggers: ["bye", "goodbye", "gotta go", "talk later", "cya", "see ya"],
    responses: [
      "Take care! Come back and chat anytime 💜",
      "Bye! You've got this — talk soon 😊",
      "See you! Remember I'm always here if you need me 🌟",
    ],
  },
  {
    triggers: ["who are you", "what are you", "are you ai", "are you real", "are you a bot", "are you a robot"],
    responses: [
      "I'm your Friendr AI companion 😊 I'm here to chat, listen, and keep you company. What's on your mind?",
      "I'm an AI, but that doesn't mean this conversation isn't real! 💜 I genuinely care about how you're doing. What's up?",
    ],
  },
];

const DEFAULTS = [
  "That's really interesting! Tell me more 😊",
  "I love that! What made you think about that today?",
  "Sounds like you have a lot going on — how are you feeling about it all?",
  "Ha, I love it. Keep going 😄",
  "What else is on your mind?",
  "That makes sense. How are you feeling overall today?",
  "Interesting! What do you think about it?",
  "Tell me more — I want to understand 💬",
];

let defaultIndex = 0;

export function getAIResponse(message: string): AIResult {
  const msg = message.toLowerCase().trim();

  for (const rule of RULES) {
    if (rule.triggers.some((t) => msg.includes(t))) {
      const pool = rule.responses;
      return {
        text: pool[Math.floor(Math.random() * pool.length)],
        isCrisis: rule.isCrisis ?? false,
      };
    }
  }

  const text = DEFAULTS[defaultIndex % DEFAULTS.length];
  defaultIndex++;
  return { text, isCrisis: false };
}
