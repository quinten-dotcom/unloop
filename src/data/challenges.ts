export type ChallengeDuration = 'hours' | 'days'

export interface Challenge {
  id: string
  name: string
  emoji: string
  description: string
  xpReward: number
  duration: number
  durationUnit: ChallengeDuration
  minLevel: number
  rules: string[]
  scienceCardId: string
}

export const CHALLENGES: Challenge[] = [
  {
    id: '72-hour-reset',
    name: 'The 72-Hour Reset',
    emoji: '🔋',
    description:
      'Three days of being intentional about your phone. Not no phone, just no mindless phone. Most people are kind of surprised how different they feel by day three.',
    xpReward: 200,
    duration: 72,
    durationUnit: 'hours',
    minLevel: 2,
    rules: [
      'no social media apps for 72 hours',
      'check messages in two set windows per day only',
      'finish all 3 daily practices each day',
      'phone out of the bedroom for all three nights',
    ],
    scienceCardId: '72-hour',
  },
  {
    id: 'weekend-warrior',
    name: 'Weekend Warrior',
    emoji: '⚔️',
    description:
      'Two full days without autopilot. This weekend you\'re going to be present instead of being somewhere else on your screen. Let\'s see what that actually feels like.',
    xpReward: 150,
    duration: 2,
    durationUnit: 'days',
    minLevel: 2,
    rules: [
      'no social media from Friday night to Sunday night',
      'phone out of the bedroom both nights',
      'do one real-world thing you\'ve been putting off',
      'no phone at any meal over the weekend',
    ],
    scienceCardId: 'gaba',
  },
  {
    id: 'zero-autopilot-day',
    name: 'Zero Autopilot Day',
    emoji: '🎯',
    description:
      'One whole day where every single time you open your phone, you know exactly why. Say it before you unlock, every time, no exceptions. By the end of the day you\'ll probably be a little shocked at how many times you had no real reason.',
    xpReward: 175,
    duration: 1,
    durationUnit: 'days',
    minLevel: 3,
    rules: [
      'say your reason out loud or in your head before every unlock',
      'log any automatic opens you catch honestly',
      'max 20 total phone unlocks for the whole day',
      'no passive scrolling, every session has a defined stopping point',
    ],
    scienceCardId: 'goal-directed',
  },
  {
    id: 'sniper-week',
    name: 'The Sniper Week',
    emoji: '🔭',
    description:
      'Seven days of using your phone like a tool instead of a comfort object. Every open is deliberate, every close is intentional. Most people discover in this week how much time they had that they didn\'t know about.',
    xpReward: 300,
    duration: 7,
    durationUnit: 'days',
    minLevel: 4,
    rules: [
      'delete social media apps for the week, browser only if you really need it',
      'set screen time limits on entertainment apps',
      'finish 5 out of 7 daily practice sets',
      'no phone in the bedroom any night during the challenge',
      'write a one-line reflection each day about your phone that day',
    ],
    scienceCardId: 'friction',
  },
  {
    id: 'full-reset',
    name: 'The Full Reset',
    emoji: '🌱',
    description:
      'Thirty days to change your default. Not in some dramatic all-or-nothing way, just slowly making intentional use feel normal and autopilot use feel like something you actually notice and can choose not to do.',
    xpReward: 400,
    duration: 30,
    durationUnit: 'days',
    minLevel: 5,
    rules: [
      'delete social media apps, use the browser if you have a real reason',
      'grayscale mode on for all 30 days',
      'no phone in the bedroom for all 30 nights',
      'finish daily practices at least 25 out of 30 days',
      'read one science card per week',
      'do a full 72-hour reset sometime within the 30 days',
      'end-of-day check-in: what was intentional today, what wasn\'t',
    ],
    scienceCardId: '72-hour',
  },
]

export function getChallengeById(id: string): Challenge | undefined {
  return CHALLENGES.find((c) => c.id === id)
}

export function getAvailableChallenges(userLevel: number): Challenge[] {
  return CHALLENGES.filter((c) => c.minLevel <= userLevel)
}
