export type UnlockType = 'feature' | 'challenge' | 'visual' | 'cosmetic'

export interface Unlock {
  id: string
  name: string
  description: string
  icon: string
  type: UnlockType
}

export const UNLOCKS_BY_LEVEL: Record<number, Unlock[]> = {
  1: [
    {
      id: 'easy-practices',
      name: 'daily practices',
      description: 'you get 3 easy practices every day. they take like 5 minutes each and they actually work',
      icon: '✅',
      type: 'feature',
    },
    {
      id: 'basic-score',
      name: 'human score',
      description: "a daily score from 0 to 100 measuring how intentional you were with your phone today",
      icon: '📊',
      type: 'feature',
    },
    {
      id: 'streak-counter',
      name: 'streak counter',
      description: 'tracks how many days in a row you show up. this one gets addictive in a good way',
      icon: '🔥',
      type: 'feature',
    },
    {
      id: 'science-starter',
      name: 'science hub (starter)',
      description: '3 science cards explaining what your phone is actually doing to your brain',
      icon: '🧪',
      type: 'feature',
    },
  ],

  2: [
    {
      id: 'medium-practices',
      name: 'medium practices',
      description: 'medium difficulty practices are now in your daily rotation... they\'re a little harder but honestly way more interesting',
      icon: '⚡',
      type: 'feature',
    },
    {
      id: 'challenge-72hr',
      name: '72-hour reset challenge',
      description: 'the 72-hour reset challenge just unlocked. 3 days of intentional use to kick off the recovery process',
      icon: '🏆',
      type: 'challenge',
    },
    {
      id: 'weekly-chart',
      name: 'weekly XP chart',
      description: 'you can now see your weekly XP chart so you can actually watch your progress over time',
      icon: '📈',
      type: 'feature',
    },
    {
      id: 'loop-color',
      name: 'loop visual evolves',
      description: 'your loop visual is starting to open up and gain color. you can see it changing as you level',
      icon: '🌀',
      type: 'visual',
    },
  ],

  3: [
    {
      id: 'hard-practices',
      name: 'hard practices',
      description: 'hard difficulty practices can now show up in your daily rotation. these are the ones that actually move the needle',
      icon: '💪',
      type: 'feature',
    },
    {
      id: 'challenge-zero-autopilot',
      name: 'zero autopilot day challenge',
      description: 'the zero autopilot day challenge just unlocked. one full day of zero unconscious phone use',
      icon: '🏆',
      type: 'challenge',
    },
    {
      id: 'full-science-hub',
      name: 'full science hub',
      description: 'the full science library just opened up. all 10 cards, all the research behind why this stuff works',
      icon: '🔬',
      type: 'feature',
    },
    {
      id: 'theme-picker',
      name: 'theme picker',
      description: 'dark mode just dropped for you. go to settings and switch it up if you want',
      icon: '🎨',
      type: 'cosmetic',
    },
  ],

  4: [
    {
      id: 'challenge-sniper-week',
      name: 'sniper week challenge',
      description: 'the sniper week challenge just unlocked. one target app, one full week of not touching it',
      icon: '🏆',
      type: 'challenge',
    },
    {
      id: 'practice-stats',
      name: 'detailed practice stats',
      description: 'a full breakdown of your practice habits is now on the progress screen. which categories you crush, which days you show up most',
      icon: '📊',
      type: 'feature',
    },
    {
      id: 'custom-practices',
      name: 'custom practices',
      description: 'you can now make your own practices which is kinda cool. set whatever challenge you want for yourself',
      icon: '✏️',
      type: 'feature',
    },
  ],

  5: [
    {
      id: 'challenge-full-reset',
      name: 'full reset challenge',
      description: 'the 30-day full reset challenge just unlocked. the big one. 30 days of fully intentional phone use',
      icon: '🏆',
      type: 'challenge',
    },
    {
      id: 'home-insights',
      name: 'personalized insights',
      description: "personalized tips now show up on your home screen based on how you actually use your phone. like, actually tailored to you",
      icon: '💡',
      type: 'feature',
    },
    {
      id: 'share-cards',
      name: 'milestone cards',
      description: 'shareable cards unlock for your milestones. when you level up or hit a streak, you can generate a clean image and share it',
      icon: '🃏',
      type: 'feature',
    },
  ],

  6: [
    {
      id: 'mentor-mode',
      name: 'mentor mode',
      description: "the app is gonna start giving you personalized suggestions now based on how you actually use your phone. like 'you usually scroll around 3pm, maybe go for a walk instead'",
      icon: '🧠',
      type: 'feature',
    },
    {
      id: 'all-themes',
      name: 'all themes',
      description: 'every theme color is now available. anything you earned from challenges or just want to try',
      icon: '🎨',
      type: 'cosmetic',
    },
    {
      id: 'your-story',
      name: 'your story timeline',
      description: 'your full journey from day one shows up on the progress screen now. every key moment, highlighted',
      icon: '📖',
      type: 'feature',
    },
  ],

  7: [
    {
      id: 'unlooped-badge',
      name: 'Unlooped badge',
      description: 'you actually did it. the Unlooped achievement badge is yours. not many people get here',
      icon: '🔓',
      type: 'feature',
    },
    {
      id: 'custom-challenges',
      name: 'custom challenges',
      description: 'you can now create your own challenges and share them with friends. pass it on',
      icon: '🎯',
      type: 'feature',
    },
    {
      id: 'loop-open',
      name: 'fully open loop visual',
      description: 'your loop visual is fully open now. that subtle glow is earned',
      icon: '✨',
      type: 'visual',
    },
  ],
}

/** Returns all unlocks for a given level (empty array if none defined). */
export function getUnlocksForLevel(level: number): Unlock[] {
  return UNLOCKS_BY_LEVEL[level] ?? []
}

/** The minimum level required to access a given unlock id. */
export function getLevelRequiredForUnlock(unlockId: string): number {
  for (const [lvlStr, unlocks] of Object.entries(UNLOCKS_BY_LEVEL)) {
    if (unlocks.some((u) => u.id === unlockId)) return Number(lvlStr)
  }
  return 1
}
