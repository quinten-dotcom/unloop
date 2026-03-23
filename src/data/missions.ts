export type MissionDifficulty = 'easy' | 'medium' | 'hard'
export type MissionCategory = 'morning' | 'focus' | 'environment' | 'intentional' | 'social' | 'reset' | 'body' | 'mind' | 'nature'
export type MissionTrigger =
  | 'gaming'
  | 'binge-watching'
  | 'food-delivery'
  | 'adult-content'
  | 'online-shopping'
  | 'news-doomscrolling'
  | 'constant-messaging'

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

export interface TriggerMission {
  id: string
  name: string
  emoji: string
  description: string
  xpReward: number
  difficulty: MissionDifficulty
  scienceCardId: string
  trigger: MissionTrigger
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
      "Give yourself one hour of uninterrupted morning energy. Your brain's focus chemicals peak in the first hour after waking. This is your most powerful thinking time and you get it all to yourself. Phone goes face-down or in another room for that first hour.",
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
      "When your alarm goes off in the morning, just turn it off and put the phone back down. Don't scroll, don't check notifications, don't do the 'one quick look.' Alarm off, phone down, that's literally the whole thing.",
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
      "Before you open any app today, write down one thing you actually want to get done. Could be anything big or small. Just name it before you open anything, that way your brain is driving instead of the apps.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-8',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "What's the one thing you're setting as your intention today?",
  },
  {
    id: 'phone-free-breakfast',
    name: 'Phone-Free Breakfast',
    emoji: '🥣',
    description:
      "Eat breakfast and let your brain wake up on its own. Put your phone in another room or flip it face-down out of reach. That first meal is one of the best moments of the day when you're actually present for it.",
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
      "Go for a 10 minute walk before you check any apps. Doesn't matter where. Around the block, to the end of your street, whatever. Just you and the world for 10 minutes before the screen gets involved.",
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
      "Get fully ready for your day before you touch your phone. Shower, dressed, breakfast, all of it. You get to start the day on your own terms instead of on the internet's terms. The phone will still be there.",
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
      "Before you open any app today, write down 3 things you're grateful for. In the app, on paper, doesn't matter. Just 3 things before the scroll starts.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-11',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "What are the 3 things you wrote down?",
  },
  {
    id: 'sunrise-journal',
    name: 'Sunrise Journal',
    emoji: '📓',
    description:
      "Spend 5 minutes writing down whatever's on your mind before you check anything. No structure needed. Just get your own thoughts out before everyone else's thoughts get in.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'focus-15',
    category: 'morning',
    requiresEvidence: true,
    evidencePrompt: "What was one thing you wrote about?",
  },
  {
    id: 'no-news-before-noon',
    name: 'No News Before Noon',
    emoji: '📰',
    description:
      "Keep your morning for your own priorities. No news apps, no news sites, nothing until after 12pm. Your morning brain is your sharpest thinking time and you get to decide what goes in it first.",
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
      "Use your phone for the alarm and then put it in another room for 30 minutes. That's it. 30 minutes of morning that belongs entirely to you.",
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
      "Before you check your phone, make your bed. It takes 2 minutes and you've already accomplished something real before the screen even turns on.",
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
      "You can use your phone for music this morning but that's it. Pick a playlist, press play, put it down. No checking anything else until you leave the house or start your work.",
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
      "Set a timer for 23 minutes and put your phone face-down somewhere you can't see it. Then just do one thing, work, reading, cooking, whatever. One thing for 23 minutes with no phone. It sounds easy but honestly it's harder than you'd think.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-1',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What did you work on for those 23 minutes?",
  },
  {
    id: 'notification-detox',
    name: 'Notification Detox',
    emoji: '🔕',
    description:
      "Reclaim your own attention for one full day. Turn off every notification except calls and calendar reminders, and watch how many times you still reach for your phone out of pure habit, even with nothing going off. That's the interesting part.",
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
      "One full hour. Phone in another room, no music with lyrics, no TV in the background. Just you and whatever you're working on. It's kind of uncomfortable at first and then it gets really good.",
    xpReward: 60,
    difficulty: 'hard',
    scienceCardId: 'focus-3',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What did you work on and how did it feel toward the end of the hour?",
  },
  {
    id: 'grayscale-day',
    name: 'Grayscale Day',
    emoji: '⚫',
    description:
      "Go into your display settings and turn your phone to grayscale for the whole day. The apps look way less exciting without color. Pay attention to whether you still feel pulled to open things as much. Most people are kinda surprised by what they notice.",
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
      "Do two 25-minute focus blocks with a 5 minute break in between. Phone goes in another room for the full hour. You'd be amazed what you get done.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'focus-8',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What did you work on and how did the second block feel compared to the first?",
  },
  {
    id: 'single-tab-hour',
    name: 'Single Tab Hour',
    emoji: '🗂️',
    description:
      "Work with exactly one browser tab open for a full hour. Sounds easy until you try it. Every time you want to open a new tab, notice that urge and come back to the one thing.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-14',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "How many times did you feel the urge to open another tab?",
  },
  {
    id: 'airplane-mode-block',
    name: 'Airplane Mode Block',
    emoji: '✈️',
    description:
      "Put your phone on airplane mode for 2 hours while you do something that matters to you. Work, a project, whatever. 2 hours of actual uninterrupted time where your thinking stays yours.",
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
      "Pick one thing. Do only that thing for 30 minutes straight. No switching, no checking, no quick glances. Just one thing. It's harder and more rewarding than it sounds.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'focus-2',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What was the one thing and did you manage to stay with it?",
  },
  {
    id: 'creative-hour',
    name: 'Creative Hour',
    emoji: '🎨',
    description:
      "Spend a full hour making something. Drawing, writing, cooking, building, playing music, whatever. Phone completely off. Create something instead of consuming something.",
    xpReward: 50,
    difficulty: 'hard',
    scienceCardId: 'focus-11',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What did you make or work on?",
  },
  {
    id: 'no-phone-meeting',
    name: 'No Phone Meeting',
    emoji: '🤝',
    description:
      "Next time you have a meeting or conversation today, leave your phone somewhere else entirely. You get to actually be there for the whole thing, which sounds small and makes a real difference.",
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
      "Every time you feel the urge to check your phone during work today, write down what you were doing and what triggered the urge. Don't fight it, just notice it. By the end of the day you'll see your patterns clearly.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-25',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "What did you notice? What were the most common triggers?",
  },
  {
    id: 'flow-finder',
    name: 'Flow Finder',
    emoji: '🌊',
    description:
      "Block out 90 minutes for something you care about. Phone off. No interruptions. Try to find that flow state where you lose track of time. It might take a few tries but when you hit it, you'll remember what your brain can actually do.",
    xpReward: 55,
    difficulty: 'hard',
    scienceCardId: 'focus-6',
    category: 'focus',
    requiresEvidence: true,
    evidencePrompt: "Did you hit flow? What happened in that 90 minutes?",
  },

  // ── Environment (12) ────────────────────────────────────────────────────────

  {
    id: 'no-bedroom-phone',
    name: 'No Bedroom Phone',
    emoji: '🌙',
    description:
      "Tonight, charge your phone somewhere outside your bedroom. Hallway, kitchen, wherever. Not next to your bed. Your sleep will probably be noticeably better, and your mornings will feel different when the first thing you reach for isn't a screen.",
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
      "No phones at the table for any meal today. Yours and, if you're eating with people, theirs too if they're up for it. Just food and actual conversation or comfortable silence. Both are good.",
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
      "Pick one spot in your place and make it phone-free today. Your desk, the couch, the kitchen, wherever you spend the most time. Every time you go there, leave the phone somewhere else. Notice if being in that space feels any different.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'habits-4',
    category: 'environment',
    requiresEvidence: true,
    evidencePrompt: "Which spot did you pick and what was it like being there without your phone?",
  },
  {
    id: 'no-phone-bathroom',
    name: 'No Phone Bathroom',
    emoji: '🚿',
    description:
      "Leave your phone outside the bathroom every single time today. Most people quietly reclaim 20 to 30 minutes a day from this one change. That's real time that was just disappearing.",
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
      "Next time you drive somewhere, put your phone in the glove box or trunk before you start the car. Enjoy the drive.",
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
      "Move all your phone chargers to one designated spot that isn't your bedroom, couch, or kitchen table. Charge it there from now on. Where your phone charges is where it lives.",
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
      "Your commute belongs to you today. If you drive, phone goes in the back seat. If you take transit, it stays in your bag. If you work from home, take a 15 minute walk without it. You get to just be somewhere without being connected.",
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
      "20 minutes outside today without your phone. Don't bring it 'just in case.' Just go. Look at things. Your brain does something really cool when it processes natural environments without a screen filter.",
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
      "Give yourself a real evening tonight. Screens off after 9pm. Read a book, talk to someone, stretch, stare at the ceiling. Your sleep quality goes up measurably when you get even an hour of screen-free wind-down before bed.",
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
      "Clean or organize something for 15 minutes without any audio from your phone. No music, no podcasts. Just you and the quiet and the satisfaction of a clean space.",
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
      "Designate a specific spot in your home where your phone lives when you're not actively using it. Not your pocket. Not the couch cushion. A spot. Put it there every time you're done.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'friction',
    category: 'environment',
    requiresEvidence: true,
    evidencePrompt: "Where's the spot you picked?",
  },
  {
    id: 'window-time',
    name: 'Window Time',
    emoji: '🪟',
    description:
      "Spend 10 minutes just looking out a window today. No phone. Sounds weird but your brain processes natural light and distance viewing in ways that screens completely shut down.",
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
      "Every time you pick up your phone today, say out loud or in your head exactly why before you unlock it. Like 'i'm checking if my friend replied' or 'i'm looking up a recipe.' Do it at least 5 times with full awareness. You're going to catch yourself doing it for no reason way more often than you'd expect.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'goal-directed',
    category: 'intentional',
    requiresEvidence: true,
    evidencePrompt: "What were the most common reasons you actually opened your phone today?",
  },
  {
    id: 'the-waiting-game',
    name: 'The Waiting Game',
    emoji: '⏳',
    description:
      "Every time you feel the urge to check your phone today, wait 60 seconds before you do anything. Just sit with the urge for a minute. It peaks and kind of fades on its own. You don't have to never check, just wait the 60 seconds first each time.",
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
      "Call someone you actually want to talk to today. Not a text, not a voice note, an actual phone call. Use the phone for the thing it was originally made for. Most people find it feels way better than they expected it to.",
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
      "Every time you feel bored or restless today and you reach for your phone, pause and do one physical thing instead. Stand up, get water, take a breath, look out a window. You don't have to do it forever, just that one moment. Then decide if you still want to open your phone.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'habits-14',
    category: 'intentional',
    requiresEvidence: true,
    evidencePrompt: "What did you replace phone reaches with today and which felt most natural?",
  },

  // ── Social (10) ─────────────────────────────────────────────────────────────

  {
    id: 'eye-contact-challenge',
    name: 'Eye Contact Challenge',
    emoji: '👀',
    description:
      "In your next real conversation, put your phone completely away and actually make eye contact. Sounds basic but notice how much harder it is than you'd expect.",
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
      "Write a short note or letter to someone by hand. A thank you, an 'i'm thinking of you', whatever. The effort of writing by hand communicates something a text literally cannot.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'relationships-14',
    category: 'social',
    requiresEvidence: true,
    evidencePrompt: "Who did you write to and what did you say?",
  },
  {
    id: 'device-free-dinner',
    name: 'Device-Free Dinner',
    emoji: '🍕',
    description:
      "Dinner tonight with zero phones at the table. If you're eating with others, everyone stacks their phones somewhere else. First person to grab theirs does the dishes.",
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
      "Instead of sending someone a link today, actually tell them about something you liked. In person or on a call. Describe it in your own words. That's how people used to share things and it hits different.",
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
      "Call someone you haven't talked to in a while. Not a text. An actual call. 15 minutes minimum. Notice how much better it feels than a text thread.",
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
      "Do a favor for someone today that has nothing to do with your phone. Help them carry something, make them food, give them a ride, whatever. Just something real and in person.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'relationships-9',
    category: 'social',
    requiresEvidence: true,
    evidencePrompt: "What did you do and how did it feel?",
  },
  {
    id: 'ask-and-listen',
    name: 'Ask and Listen',
    emoji: '👂',
    description:
      "Have a conversation today where you mostly just ask questions and listen. Don't check your phone once during it. Really hear what the other person is saying.",
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
      "Give 3 genuine compliments to people today. In person. Not over text. You'll be surprised how good it feels for both of you.",
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
      "Take a photo of something you think is cool today and show it to someone in person instead of posting it. Share the moment with one person, not a feed.",
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
      "Make a deal with someone you're spending time with today: no phones for one full hour. Hold each other to it. It's easier with accountability and way more fun.",
    xpReward: 45,
    difficulty: 'medium',
    scienceCardId: 'relationships-13',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Reset (8) ────────────────────────────────────────────────────────────────

  {
    id: 'cold-finish',
    name: 'Cold Finish',
    emoji: '🚿',
    description:
      "End your shower with 30 seconds of cold water. Your body releases norepinephrine and endorphins in response to cold. It's uncomfortable for 30 seconds and you'll feel genuinely good for hours. This is one of those things that sounds annoying and then becomes something you look forward to.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'cold-exposure',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'hard-thing-first',
    name: 'Hard Thing First',
    emoji: '🏋️',
    description:
      "Start your day by doing the task you least want to do. The thing you've been avoiding. Before your phone, before email, before the easy warm-up stuff. Your dopamine system is designed to reward effort and the payoff from starting hard is real. The rest of the day feels easier.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'effort-paradox',
    category: 'reset',
    requiresEvidence: true,
    evidencePrompt: "What was the hard thing and how did you feel after doing it first?",
  },
  {
    id: 'voluntary-boredom',
    name: 'Voluntary Boredom',
    emoji: '🪑',
    description:
      "Sit somewhere for 10 minutes with absolutely nothing to do. No phone, no book, no music, no podcast. Just sit there. This feels genuinely terrible at first, and that's the point. You're teaching your brain that it doesn't need constant stimulation. Boredom is where creativity actually lives.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'boredom-medicine',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'sweat-session',
    name: 'Sweat Session',
    emoji: '🏃',
    description:
      "Do 20 minutes of exercise that makes you actually sweat. Running, biking, jumping jacks in your living room, whatever. Exercise intentionally works the effort side of your brain's balance beam, and your brain responds by releasing natural dopamine, serotonin, and endorphins that can last for hours. It's literally medicine.",
    xpReward: 40,
    difficulty: 'medium',
    scienceCardId: 'exercise-dopamine',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'early-alarm-no-snooze',
    name: 'Early Alarm, No Snooze',
    emoji: '⏰',
    description:
      "Set your alarm 15 minutes earlier than usual and get up the moment it goes off. No snooze, no negotiating with yourself. Getting out of a warm bed is a form of voluntary discomfort that starts your day with a win. The small act of doing the hard thing first thing sets a tone that carries forward.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'effort-paradox',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'boring-meal',
    name: 'The Boring Meal',
    emoji: '🥗',
    description:
      "Eat one meal today that's simple, whole, and not engineered to be exciting. An apple and some nuts. Rice and vegetables. Something basic. Your taste buds have been conditioned by flavor-engineered food the same way your attention has been conditioned by engineered content. Simple food starts tasting incredible again when you give your system a break.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'dopamine-baseline',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'hand-wash-dishes',
    name: 'Hand Wash the Dishes',
    emoji: '🫧',
    description:
      "Hand wash your dishes today instead of the dishwasher, or instead of leaving them. It takes about 5 minutes and requires just enough attention to pull you out of your head. Manual tasks that require low-level attention are exactly the kind of understimulating activity that helps your dopamine system reset. It sounds boring. That's kind of the point.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'boredom-medicine',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'stretch-in-silence',
    name: 'Stretch in Silence',
    emoji: '🧘',
    description:
      "Spend 10 minutes stretching without any audio at all. No music, no podcast, no tv in the background. Just your body, the stretch, and the quiet. Your nervous system needs practice being understimulated. This is some of the best recovery your brain can get and it works better than you'd expect.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'boredom-medicine',
    category: 'reset',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Body (6) ─────────────────────────────────────────────────────────────────

  {
    id: 'walk-no-headphones',
    name: '20-Minute Walk',
    emoji: '🚶',
    description: 'Take a 20-minute walk outside with no headphones and no phone in hand. Let your mind wander. This is one of the most effective dopamine-reset practices there is — movement plus no-input gives your brain exactly what it needs.',
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'body-1',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'morning-stretch',
    name: 'Morning Stretch',
    emoji: '🧘',
    description: "Spend 10 minutes stretching before you check your phone. This primes your nervous system for the day and sets a tone of intentionality. You're choosing how your morning starts.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-2',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'exercise-30',
    name: 'Exercise for 30',
    emoji: '💪',
    description: 'Do 30 minutes of exercise today — anything counts. Run, gym, yoga, whatever. Exercise is one of the most reliable ways to restore healthy dopamine baseline. Not a bonus. A reset.',
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'body-3',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'cold-finish-body',
    name: 'Cold Finish',
    emoji: '🚿',
    description: 'End your shower with 30 seconds of cold water. This triggers a dopamine spike that lasts for hours — not a jolt like caffeine, but a sustained lift. Do it once and notice how different you feel.',
    xpReward: 25,
    difficulty: 'medium',
    scienceCardId: 'body-4',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'dance-break',
    name: 'Dance Break',
    emoji: '🎵',
    description: 'Put on a song you love and just move for 5 minutes. No routine, no performance. This is one of the fastest ways to shift your neurological state — movement plus music is a direct dopamine pathway.',
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-5',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'no-phone-bathroom',
    name: 'No Phone Bathroom',
    emoji: '🚽',
    description: "Leave your phone outside the bathroom every time today. This seems trivial but it breaks one of the most automatic phone-grabbing habits people have. Bathroom time is your brain's natural pause. Let it actually be one.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'habits-5',
    category: 'body',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Mind (6) ─────────────────────────────────────────────────────────────────

  {
    id: 'voluntary-boredom-mind',
    name: '10 Minutes of Boredom',
    emoji: '🪑',
    description: "Sit somewhere and do nothing for 10 minutes. No phone, no music, no podcast. Just sit. Your brain will resist immediately — that resistance is exactly what you're training. Boredom tolerance is a superpower in the attention economy.",
    xpReward: 30,
    difficulty: 'medium',
    scienceCardId: 'dopamine-3',
    category: 'mind',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'deep-work-block',
    name: 'Deep Work Block',
    emoji: '🎯',
    description: "Choose one task and work on it for 45 minutes without switching. Phone in another room. No tabs, no notifications. This is what real focus feels like — and your brain has to relearn it.",
    xpReward: 35,
    difficulty: 'hard',
    scienceCardId: 'focus-1',
    category: 'mind',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'journaling-5',
    name: 'Journaling',
    emoji: '📓',
    description: "Write for 5 minutes. Anything — what's on your mind, what you want, what you're avoiding. Writing externalizes your internal state and gives your prefrontal cortex something real to work with. Even 5 minutes has measurable effects.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'habits-8',
    category: 'mind',
    requiresEvidence: true,
    evidencePrompt: 'What did you write about today?',
  },
  {
    id: 'meditation-10',
    name: 'Meditation',
    emoji: '🧠',
    description: "Sit comfortably and focus on your breathing for 10 minutes. When your mind wanders, bring it back. That's the whole practice — noticing and returning. After a few weeks of this, you'll start doing it automatically in real life.",
    xpReward: 30,
    difficulty: 'medium',
    scienceCardId: 'dopamine-2',
    category: 'mind',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'read-physical-book',
    name: 'Read a Physical Book',
    emoji: '📚',
    description: "Read a physical book for 20 minutes. Not an e-reader, not an audiobook. The act of reading paper trains sustained attention in a way that screens actively undo. You'll probably find the first few minutes hard. That's normal.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'focus-2',
    category: 'mind',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'single-tab-hour',
    name: 'Single Tab Hour',
    emoji: '💻',
    description: "For one hour, allow yourself only one browser tab open at a time. Close everything else. This isn't about being more productive — it's about training your brain to stay with one thing instead of bouncing between stimuli.",
    xpReward: 35,
    difficulty: 'hard',
    scienceCardId: 'focus-3',
    category: 'mind',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Social (5) ───────────────────────────────────────────────────────────────

  {
    id: 'call-a-friend',
    name: 'Call a Friend',
    emoji: '📞',
    description: "Call someone you care about — voice, not text. A real conversation activates parts of your brain that messaging simply can't reach. Oxytocin, genuine connection, the stuff that actually fills you up.",
    xpReward: 30,
    difficulty: 'medium',
    scienceCardId: 'social-1',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'in-person-hangout',
    name: 'In-Person Hangout',
    emoji: '🤝',
    description: "Spend at least 30 minutes with someone in person. No phones out. Real presence, real conversation. Human connection is the highest-quality dopamine source there is — and it's the first thing we sacrifice for screen time.",
    xpReward: 35,
    difficulty: 'medium',
    scienceCardId: 'social-2',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'eye-contact-conversations',
    name: 'Full Presence Conversations',
    emoji: '👁️',
    description: "Put your phone away during every conversation today. Not on the table — actually away. When you're with someone, be with them. This is one of the highest-impact practices in the whole app.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'social-3',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'help-someone',
    name: 'One Act of Kindness',
    emoji: '🤲',
    description: "Do one thing for someone else today, unprompted. Hold a door, make someone lunch, send a genuine compliment. Acts of giving activate dopamine and serotonin together — it's one of the cleanest highs the brain can produce.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'social-4',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'app-free-meal',
    name: 'App-Free Meal',
    emoji: '🍽️',
    description: 'Eat one meal today without your phone, without a screen, without a podcast. Just the food and your thoughts. When was the last time you were actually present for a meal? Today, at least once.',
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-12',
    category: 'social',
    requiresEvidence: false,
    evidencePrompt: null,
  },

  // ── Nature (4) ───────────────────────────────────────────────────────────────

  {
    id: 'time-outside',
    name: 'Time Outside',
    emoji: '🌿',
    description: "Spend 20 minutes outside — a park, your backyard, a walk around the block. Natural environments lower cortisol and restore directed attention in ways that indoor spaces simply don't. Your brain evolved outside.",
    xpReward: 25,
    difficulty: 'easy',
    scienceCardId: 'body-6',
    category: 'nature',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'sunrise-sunset',
    name: 'Watch the Sky',
    emoji: '🌅',
    description: 'Watch a sunrise or sunset today. Not on your phone — actually go outside and look at the sky. This resets your circadian rhythm and gives your visual system a break from artificial light. It also just feels good.',
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-7',
    category: 'nature',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'eat-meal-slowly',
    name: 'Eat Slowly',
    emoji: '🥗',
    description: "Eat one meal today deliberately slowly, with no screens. Put your fork down between bites. Taste what you're eating. Mindful eating is one of the few practices that directly trains the part of your brain that's hijacked by dopamine loops.",
    xpReward: 20,
    difficulty: 'easy',
    scienceCardId: 'body-8',
    category: 'nature',
    requiresEvidence: false,
    evidencePrompt: null,
  },
  {
    id: 'phone-free-morning',
    name: 'Phone-Free First Hour',
    emoji: '🌄',
    description: "Keep your phone off or in another room for the first hour after waking. Your cortisol naturally peaks in the first 30-45 minutes of the day — this is your brain's natural energy peak. Don't spend it scrolling.",
    xpReward: 30,
    difficulty: 'easy',
    scienceCardId: 'habits-12',
    category: 'nature',
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
      "Take 3 photos of things you find beautiful today. But here's the rule: you can't post any of them. They're just for you.",
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
      "Do something for an hour that people did before smartphones existed. Read a paper book, play a board game, write in a journal, draw something, cook from a recipe book. Go analog.",
    xpReward: 40,
    scienceCardId: '72-hour',
    requiresEvidence: true,
    evidencePrompt: "What did you do and how did it feel?",
  },
  {
    id: 'surprise-tech-archaeologist',
    name: 'Tech Archaeologist',
    emoji: '🦕',
    description:
      "Go through your phone and delete 10 apps you haven't used in the last month. Every app is a tiny piece of your attention. Lighten the load.",
    xpReward: 30,
    scienceCardId: 'focus-12',
    requiresEvidence: true,
    evidencePrompt: "Which apps did you delete? Any surprises?",
  },
  {
    id: 'surprise-the-listener',
    name: 'The Listener',
    emoji: '🎧',
    description:
      "Have a conversation where you only ask questions and listen. Don't talk about yourself unless asked. Just be curious about someone else for a while.",
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
      "Send 5 people a genuine nice message today. Not a reaction, not an emoji. A real, specific compliment. But then put your phone away after sending them.",
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
      "Look at your screen time stats today. Actually look. Take a screenshot and sit with it for a minute. No judgment, just awareness. Write down one thing you noticed.",
    xpReward: 30,
    scienceCardId: 'habits-10',
    requiresEvidence: true,
    evidencePrompt: "What was the one thing you noticed?",
  },
  {
    id: 'surprise-memory-lane',
    name: 'Memory Lane Walk',
    emoji: '🗺️',
    description:
      "Go for a walk to somewhere you used to go as a kid, or just somewhere that has a memory. No phone. Just be there and remember.",
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
      "Explain one thing you learned from unloop's science cards to someone in real life today. You know you really understand something when you can explain it simply.",
    xpReward: 40,
    scienceCardId: 'habits-15',
    requiresEvidence: true,
    evidencePrompt: "What did you explain and how did the conversation go?",
  },
  {
    id: 'surprise-digital-sunset',
    name: 'Digital Sunset Experiment',
    emoji: '🌙',
    description:
      "Turn your phone off at 7pm and don't turn it back on until morning. A full evening without it. Notice what you do with the time.",
    xpReward: 45,
    scienceCardId: 'body-16',
    requiresEvidence: true,
    evidencePrompt: "What did you end up doing with the evening?",
  },
  {
    id: 'surprise-five-senses',
    name: 'The 5 Senses Check',
    emoji: '🌟',
    description:
      "Right now, put your phone down and name 5 things you can see, 4 you can hear, 3 you can touch, 2 you can smell, 1 you can taste. It's a grounding exercise that yanks your brain out of screen mode immediately.",
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
