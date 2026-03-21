export type MissionDifficulty = 'easy' | 'medium' | 'hard'
export type MissionCategory = 'morning' | 'focus' | 'environment' | 'intentional' | 'social'

export interface Mission {
  id: string
  name: string
  emoji: string
  description: string
  xpReward: number
  difficulty: MissionDifficulty
  scienceCardId: string
  category: MissionCategory
  requiresEvidence: boolean
  evidencePrompt: string | null
}

export interface SurpriseMission {
  id: string
  name: string
  emoji: string
  description: string
  xpReward: number
  scienceCardId: string
  requiresEvidence: boolean
  evidencePrompt: string | null
}

export const MISSIONS: Mission[] = [

  // ── Morning (12) ────────────────────────────────────────────────────────────

  {
    id: 'first-hour-human',
    name: 'First Hour Human',
    emoji: '🌅',
    description:
      "when you wake up tomorrow, your phone goes face-down or in another room for the whole first hour. just one hour. you can drink coffee, shower, stare at the wall, whatever. just no phone for that first hour.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'body-4',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'no-alarm-scroll',
    name: 'No Alarm Scroll',
    emoji: '⏰',
    description:
      "when your alarm goes off in the morning, just turn it off and put the phone back down. don't scroll, don't check notifications, don't do the 'one quick look.' alarm off, phone down, that's literally the whole thing.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-12',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'morning-intention',
    name: 'Morning Intention',
    emoji: '🎯',
    description:
      "before you open any app today, write down one thing you actually want to get done. could be anything big or small. just name it before you open anything, that way your brain is driving instead of the apps.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-8',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "what's the one thing you're setting as your intention today?",
  },
  {
    id: 'phone-free-breakfast',
    name: 'Phone-Free Breakfast',
    emoji: '🥣',
    description:
      "eat breakfast without your phone near you. put it in another room or flip it face-down out of reach. just eat your food and let your brain wake up on its own for once.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'body-12',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'rise-and-walk',
    name: 'Rise and Walk',
    emoji: '🚶',
    description:
      "go for a 10 minute walk before you check any apps. doesn't matter where. around the block, to the end of your street, whatever. just you and the world for 10 minutes before the screen gets involved.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'body-6',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'screen-free-morning',
    name: 'Screen-Free Morning Routine',
    emoji: '🪥',
    description:
      "get fully ready for your day before you touch your phone. shower, dressed, breakfast, all of it. your phone can wait.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'first-hour',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'gratitude-before-scroll',
    name: 'Gratitude Before the Scroll',
    emoji: '🙏',
    description:
      "before you open any app today, write down 3 things you're grateful for. in the app, on paper, doesn't matter. just 3 things before the scroll starts.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-11',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "what are the 3 things you wrote down?",
  },
  {
    id: 'sunrise-journal',
    name: 'Sunrise Journal',
    emoji: '📓',
    description:
      "spend 5 minutes writing down whatever's on your mind before you check anything. no structure needed. just get your own thoughts out before everyone else's thoughts get in.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'focus-15',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "what was one thing you wrote about?",
  },
  {
    id: 'no-news-before-noon',
    name: 'No News Before Noon',
    emoji: '📰',
    description:
      "no news apps, no news sites, no news at all until after 12pm. the world will still be there at lunch. your morning brain deserves your own priorities first.",
    xpReward: 30,
    difficulty: 'medium',
    scienceCardId: 'body-17',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'alarm-and-done',
    name: 'Alarm and Done',
    emoji: '📵',
    description:
      "use your phone for the alarm and then put it in another room for 30 minutes. that's it. 30 minutes of morning that belongs to you.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-19',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'make-your-bed-first',
    name: 'Make Your Bed First',
    emoji: '🛏️',
    description:
      "before you check your phone, make your bed. it takes 2 minutes and you've already accomplished something real before the screen even turns on.",
    xpReward: 15,
    difficulty: 'easy',
    scienceCardId: 'habits-7',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'morning-playlist-only',
    name: 'Morning Playlist Only',
    emoji: '🎵',
    description:
      "you can use your phone for music this morning but that's it. pick a playlist, press play, put it down. no checking anything else until you leave the house or start your work.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-3',
    category: 'morning',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Focus (12) ──────────────────────────────────────────────────────────────

  {
    id: 'the-23',
    name: 'The 23',
    emoji: '⏱️',
    description:
      "set a timer for 23 minutes and put your phone face-down somewhere you can't see it. then just do one thing, work, reading, cooking, whatever. one thing for 23 minutes with no phone. it sounds easy but honestly it's harder than you'd think.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-1',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what did you work on for those 23 minutes?",
  },
  {
    id: 'notification-detox',
    name: 'Notification Detox',
    emoji: '🔕',
    description:
      "turn off every notification that isn't a phone call or a calendar reminder, just for today. no buzzes, no banners, no little red dots. pay attention to how many times you still reach for your phone out of pure habit even without anything going off. that's the interesting part.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'focus-10',
    category: 'focus',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'deep-work-hour',
    name: 'Deep Work Hour',
    emoji: '🧠',
    description:
      "one full hour. phone in another room, no music with lyrics, no TV in the background. just you and whatever you're working on. it's kind of uncomfortable at first and then it gets really good.",
    xpReward: 60,
    difficulty: 'hard',
    scienceCardId: 'focus-3',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what did you work on and how did it feel toward the end of the hour?",
  },
  {
    id: 'grayscale-day',
    name: 'Grayscale Day',
    emoji: '⚫',
    description:
      "go into your display settings and turn your phone to grayscale for the whole day. the apps look way less exciting without color. pay attention to whether you still feel pulled to open things as much. most people are kinda surprised by what they notice.",
    xpReward: 50,
    difficulty: 'hard',
    scienceCardId: 'grayscale',
    category: 'focus',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'pomodoro-round',
    name: 'Pomodoro Round',
    emoji: '🍅',
    description:
      "do two 25-minute focus blocks with a 5 minute break in between. phone goes in another room for the full hour. you'd be amazed what you get done.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'focus-8',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what did you work on and how did the second block feel compared to the first?",
  },
  {
    id: 'single-tab-hour',
    name: 'Single Tab Hour',
    emoji: '🗂️',
    description:
      "work with exactly one browser tab open for a full hour. sounds easy until you try it. every time you want to open a new tab, notice that urge and come back to the one thing.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-14',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "how many times did you feel the urge to open another tab?",
  },
  {
    id: 'airplane-mode-block',
    name: 'Airplane Mode Block',
    emoji: '✈️',
    description:
      "put your phone on airplane mode for 2 hours while you do something that matters to you. work, a project, whatever. 2 hours of actual uninterrupted life.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'focus-9',
    category: 'focus',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'the-monotask',
    name: 'The Monotask',
    emoji: '📌',
    description:
      "pick one thing. do only that thing for 30 minutes straight. no switching, no checking, no 'quick glances.' just one thing. it's harder and more rewarding than it sounds.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-2',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what was the one thing and did you manage to stay with it?",
  },
  {
    id: 'creative-hour',
    name: 'Creative Hour',
    emoji: '🎨',
    description:
      "spend a full hour making something. drawing, writing, cooking, building, playing music, whatever. phone completely off. create something instead of consuming something.",
    xpReward: 50,
    difficulty: 'hard',
    scienceCardId: 'focus-11',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what did you make or work on?",
  },
  {
    id: 'no-phone-meeting',
    name: 'No Phone Meeting',
    emoji: '🤝',
    description:
      "next time you have a meeting or conversation today, leave your phone somewhere else entirely. just be there fully.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'relationships-8',
    category: 'focus',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'distraction-log',
    name: 'Distraction Log',
    emoji: '📋',
    description:
      "every time you feel the urge to check your phone during work today, write down what you were doing and what triggered the urge. don't fight it, just notice it. by the end of the day you'll see your patterns clearly.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-25',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "what did you notice? what were the most common triggers?",
  },
  {
    id: 'flow-finder',
    name: 'Flow Finder',
    emoji: '🌊',
    description:
      "block out 90 minutes for something you care about. phone off. no interruptions. try to find that flow state where you lose track of time. it might take a few tries but when you hit it, you'll remember what your brain can actually do.",
    xpReward: 55,
    difficulty: 'hard',
    scienceCardId: 'focus-6',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "did you hit flow? what happened in that 90 minutes?",
  },

  // ── Environment (12) ────────────────────────────────────────────────────────

  {
    id: 'no-bedroom-phone',
    name: 'No Bedroom Phone',
    emoji: '🌙',
    description:
      "tonight, charge your phone somewhere outside your bedroom. hallway, kitchen, wherever. not next to your bed. if you use it as an alarm, just grab a cheap alarm clock. your sleep will probably be noticeably better.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'relationships-6',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'tech-free-table',
    name: 'Tech-Free Table',
    emoji: '🍽️',
    description:
      "no phones at the table for any meal today. yours and, if you're eating with people, theirs too if they're up for it. just food and actual conversation or comfortable silence. both are good.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'meal-presence',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'phone-free-zone',
    name: 'Phone-Free Zone',
    emoji: '🚫',
    description:
      "pick one spot in your place and make it phone-free today. your desk, the couch, the kitchen, wherever you spend the most time. every time you go there, leave the phone somewhere else. notice if being in that space feels any different.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'habits-4',
    category: 'environment',
    requiresEvidence: true,
    evidencePrompt: "which spot did you pick and what was it like being there without your phone?",
  },
  {
    id: 'no-phone-bathroom',
    name: 'No Phone Bathroom',
    emoji: '🚿',
    description:
      "leave your phone outside the bathroom every single time today. just today. most people quietly reclaim like 20 to 30 minutes a day from this one change without realizing that's where it was going.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-14',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'car-phone-vault',
    name: 'Car Phone Vault',
    emoji: '🚗',
    description:
      "next time you drive somewhere, put your phone in the glove box or trunk before you start the car. enjoy the drive.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-5',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'living-room-reset',
    name: 'Living Room Reset',
    emoji: '🏠',
    description:
      "move all your phone chargers to one designated spot that isn't your bedroom, couch, or kitchen table. charge it there from now on. where your phone charges is where it lives.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'habits-22',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'screen-free-commute',
    name: 'Screen-Free Commute',
    emoji: '🚌',
    description:
      "no phone during your commute. if you drive, it's in the back seat. if you take transit, keep it in your bag. if you work from home, take a 15 minute walk without it.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'body-13',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'nature-break',
    name: 'Nature Break',
    emoji: '🌿',
    description:
      "20 minutes outside today without your phone. don't bring it 'just in case.' just go. look at things. your brain does something really cool when it processes natural environments without a screen filter.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'exercise',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'tech-sunset',
    name: 'Tech Sunset',
    emoji: '🌇',
    description:
      "no screens after 9pm tonight. read a book, talk to someone, stretch, stare at the ceiling, anything. just no screens after 9.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'body-11',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'tidy-without-tunes',
    name: 'Tidy Without Tunes',
    emoji: '🧹',
    description:
      "clean or organize something for 15 minutes without any audio from your phone. no music, no podcasts. just you and the quiet and the satisfaction of a clean space.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'body-2',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'phone-parking-spot',
    name: 'Phone Parking Spot',
    emoji: '📍',
    description:
      "designate a specific spot in your home where your phone lives when you're not actively using it. not your pocket. not the couch cushion. a spot. put it there every time you're done.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'friction',
    category: 'environment',
    requiresEvidence: true,
    evidencePrompt: "where's the spot you picked?",
  },
  {
    id: 'window-time',
    name: 'Window Time',
    emoji: '🪟',
    description:
      "spend 10 minutes just looking out a window today. no phone. sounds weird but your brain processes natural light and distance viewing in ways that screens completely shut down.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'body-3',
    category: 'environment',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Intentional (4) ─────────────────────────────────────────────────────────

  {
    id: 'intentional-open-x5',
    name: 'Intentional Open x5',
    emoji: '🔓',
    description:
      "every time you pick up your phone today, say out loud or in your head exactly why before you unlock it. like 'i'm checking if my friend replied' or 'i'm looking up a recipe.' do it at least 5 times with full awareness. you're going to catch yourself doing it for no reason way more often than you'd expect.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'goal-directed',
    category: 'intentional',
    requiresEvidence: true,
    evidencePrompt: "what were the most common reasons you actually opened your phone today?",
  },
  {
    id: 'the-waiting-game',
    name: 'The Waiting Game',
    emoji: '⏳',
    description:
      "every time you feel the urge to check your phone today, wait 60 seconds before you do anything. just sit with the urge for a minute. it peaks and kind of fades on its own. you don't have to never check, just wait the 60 seconds first each time.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'habits-1',
    category: 'intentional',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'phone-a-human',
    name: 'Phone a Human',
    emoji: '📞',
    description:
      "call someone you actually want to talk to today. not a text, not a voice note, an actual phone call. use the phone for the thing it was originally made for. most people find it feels way better than they expected it to.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'relationships-5',
    category: 'intentional',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'replace-dont-escape',
    name: "Replace, Don't Escape",
    emoji: '🔄',
    description:
      "every time you feel bored or restless today and you reach for your phone, pause and do one physical thing instead. stand up, get water, take a breath, look out a window. you don't have to do it forever, just that one moment. then decide if you still want to open your phone.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'habits-14',
    category: 'intentional',
    requiresEvidence: true,
    evidencePrompt: "what did you replace phone reaches with today and which felt most natural?",
  },

  // ── Social (10) ─────────────────────────────────────────────────────────────

  {
    id: 'eye-contact-challenge',
    name: 'Eye Contact Challenge',
    emoji: '👀',
    description:
      "in your next real conversation, put your phone completely away and actually make eye contact. sounds basic but notice how much harder it is than you'd expect.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'relationships-2',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'handwritten-note',
    name: 'Handwritten Note',
    emoji: '✉️',
    description:
      "write a short note or letter to someone by hand. a thank you, an 'i'm thinking of you', whatever. the effort of writing by hand communicates something a text literally cannot.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'relationships-14',
    category: 'social',
    requiresEvidence: true,
    evidencePrompt: "who did you write to and what did you say?",
  },
  {
    id: 'device-free-dinner',
    name: 'Device-Free Dinner',
    emoji: '🍕',
    description:
      "dinner tonight with zero phones at the table. if you're eating with others, everyone stacks their phones somewhere else. first person to grab theirs does the dishes.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'habits-23',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'real-recommendation',
    name: 'Real Recommendation',
    emoji: '💬',
    description:
      "instead of sending someone a link today, actually tell them about something you liked. in person or on a call. describe it in your own words. that's how people used to share things and it hits different.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'relationships-4',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: '15-minute-call',
    name: '15 Minute Call',
    emoji: '📲',
    description:
      "call someone you haven't talked to in a while. not a text. an actual call. 15 minutes minimum. notice how much better it feels than a text thread.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'relationships-15',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'help-someone-offline',
    name: 'Help Someone Offline',
    emoji: '🤲',
    description:
      "do a favor for someone today that has nothing to do with your phone. help them carry something, make them food, give them a ride, whatever. just something real and in person.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'relationships-9',
    category: 'social',
    requiresEvidence: true,
    evidencePrompt: "what did you do and how did it feel?",
  },
  {
    id: 'ask-and-listen',
    name: 'Ask and Listen',
    emoji: '👂',
    description:
      "have a conversation today where you mostly just ask questions and listen. don't check your phone once during it. really hear what the other person is saying.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'relationships-10',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'compliment-run',
    name: 'Compliment Run',
    emoji: '✨',
    description:
      "give 3 genuine compliments to people today. in person. not over text. you'll be surprised how good it feels for both of you.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-20',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'photo-share',
    name: 'Photo Share',
    emoji: '📸',
    description:
      "take a photo of something you think is cool today and show it to someone in person instead of posting it. share the moment with one person, not a feed.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'relationships-11',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'presence-pact',
    name: 'Presence Pact',
    emoji: '🤜',
    description:
      "make a deal with someone you're spending time with today: no phones for one full hour. hold each other to it. it's easier with accountability and way more fun.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'relationships-13',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
]

// ── Surprise mission pool (shown ~once per week, revealed on tap) ─────────────

export const SURPRISE_MISSIONS: SurpriseMission[] = [
  {
    id: 'surprise-photographer',
    name: 'The Photographer',
    emoji: '📷',
    description:
      "take 3 photos of things you find beautiful today. but here's the rule: you can't post any of them. they're just for you.",
    xpReward: 35,
    scienceCardId: 'body-10',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'surprise-analog-hour',
    name: 'Analog Hour',
    emoji: '📚',
    description:
      "do something for an hour that people did before smartphones existed. read a paper book, play a board game, write in a journal, draw something, cook from a recipe book. go analog.",
    xpReward: 40,
    scienceCardId: '72-hour',
    requiresEvidence: true,
    evidencePrompt: "what did you do and how did it feel?",
  },
  {
    id: 'surprise-tech-archaeologist',
    name: 'Tech Archaeologist',
    emoji: '🦕',
    description:
      "go through your phone and delete 10 apps you haven't used in the last month. every app is a tiny piece of your attention. lighten the load.",
    xpReward: 30,
    scienceCardId: 'focus-12',
    requiresEvidence: true,
    evidencePrompt: "which apps did you delete? any surprises?",
  },
  {
    id: 'surprise-the-listener',
    name: 'The Listener',
    emoji: '🎧',
    description:
      "have a conversation where you only ask questions and listen. don't talk about yourself unless asked. just be curious about someone else for a while.",
    xpReward: 35,
    scienceCardId: 'relationships-7',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'surprise-compliment-bomb',
    name: 'Compliment Bomb',
    emoji: '💌',
    description:
      "send 5 people a genuine nice message today. not a reaction, not an emoji. a real, specific compliment. but then put your phone away after sending them.",
    xpReward: 25,
    scienceCardId: 'habits-24',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'surprise-phone-portrait',
    name: 'Phone Portrait',
    emoji: '🪞',
    description:
      "look at your screen time stats today. actually look. take a screenshot and sit with it for a minute. no judgment, just awareness. write down one thing you noticed.",
    xpReward: 30,
    scienceCardId: 'habits-10',
    requiresEvidence: true,
    evidencePrompt: "what was the one thing you noticed?",
  },
  {
    id: 'surprise-memory-lane',
    name: 'Memory Lane Walk',
    emoji: '🗺️',
    description:
      "go for a walk to somewhere you used to go as a kid, or just somewhere that has a memory. no phone. just be there and remember.",
    xpReward: 35,
    scienceCardId: 'body-20',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'surprise-teach-someone',
    name: 'Teach Someone',
    emoji: '🎓',
    description:
      "explain one thing you learned from unloop's science cards to someone in real life today. you know you really understand something when you can explain it simply.",
    xpReward: 40,
    scienceCardId: 'habits-15',
    requiresEvidence: true,
    evidencePrompt: "what did you explain and how did the conversation go?",
  },
  {
    id: 'surprise-digital-sunset',
    name: 'Digital Sunset Experiment',
    emoji: '🌙',
    description:
      "turn your phone off at 7pm and don't turn it back on until morning. a full evening without it. notice what you do with the time.",
    xpReward: 45,
    scienceCardId: 'body-16',
    requiresEvidence: true,
    evidencePrompt: "what did you end up doing with the evening?",
  },
  {
    id: 'surprise-five-senses',
    name: 'The 5 Senses Check',
    emoji: '🌟',
    description:
      "right now, put your phone down and name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, 1 you can taste. it's a grounding exercise that yanks your brain out of screen mode immediately.",
    xpReward: 25,
    scienceCardId: 'gaba',
    requiresEvidence: false,
    evidencePrompt: null,
  },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

export function getMissionById(id: string): Mission | undefined {
  return MISSIONS.find((m) => m.id === id)
}

export function getMissionsByCategory(category: MissionCategory): Mission[] {
  return MISSIONS.filter((m) => m.category === category)
}

export function getMissionsByDifficulty(difficulty: MissionDifficulty): Mission[] {
  return MISSIONS.filter((m) => m.difficulty === difficulty)
}

export function getSurpriseMissionById(id: string): SurpriseMission | undefined {
  return SURPRISE_MISSIONS.find((m) => m.id === id)
}
