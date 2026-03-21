export interface Level {
  level: number
  name: string
  minXP: number
  description: string
  levelUpMessage: string
  scienceNote: string
  pathDescription: string   // shown on Home screen "Your Path" section
}

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Autopilot',
    minXP: 0,
    description: 'You\'re picking it up without even deciding to.',
    levelUpMessage:
      'Just being here and doing the first practice is more than most people ever do. You noticed the loop. That\'s the first step and it\'s a real one.',
    scienceNote:
      'Right now most of your phone use is running on autopilot through a part of your brain called the basal ganglia. It\'s basically the habit machine — no conscious thought required.',
    pathDescription:
      'You\'re starting to notice when it happens. That awareness is the first real step.',
  },
  {
    level: 2,
    name: 'Noticing',
    minXP: 100,
    description: 'You\'re starting to catch yourself mid-scroll.',
    levelUpMessage:
      'Here\'s what just happened. There\'s a part of your brain called the anterior cingulate cortex, which acts like an internal alarm that goes off when you do something on autopilot. You\'re waking it up right now. Every time you catch an urge without immediately acting on it, that alarm gets a little louder. It\'s working.',
    scienceNote:
      'Catching an urge without acting on it activates your anterior cingulate cortex, basically your brain\'s conflict detector. Each time you do it, that signal gets a little stronger.',
    pathDescription:
      'You\'re starting to catch yourself reaching for your phone without thinking. That awareness is the first real step.',
  },
  {
    level: 3,
    name: 'Pausing',
    minXP: 300,
    description: 'There\'s a gap between the urge and what you do about it.',
    levelUpMessage:
      'This is genuinely significant. Even a 3-second pause before reaching for your phone can cut automatic behavior by around 40%. That gap you\'re creating between wanting to scroll and actually scrolling? Your brain is using it to make a real choice. That\'s not a small thing at all.',
    scienceNote:
      'When you pause before reaching, your prefrontal cortex gets involved in the decision before your hands move. That\'s called inhibitory control and you\'re literally training it right now.',
    pathDescription:
      'There\'s a gap between the urge and what you do with it. Your brain is starting to check in before acting.',
  },
  {
    level: 4,
    name: 'Choosing',
    minXP: 600,
    description: 'You\'re using your phone on purpose most of the time.',
    levelUpMessage:
      'Your brain is shifting from running on habit to running on intention, and that shift is actually measurable in brain scans. The part of your brain that processes rewards is learning to care about what you chose to do, not just what felt good automatically. That\'s a fundamentally different relationship with your phone than you had at the start.',
    scienceNote:
      'The shift from habit-based to goal-directed behavior shows up in fMRI scans as a change in which part of your striatum is most active. Right now yours is moving toward the intentional side.',
    pathDescription:
      'Most of your phone use is intentional now. The automatic pull is still there, but you\'re the one deciding.',
  },
  {
    level: 5,
    name: 'Directing',
    minXP: 1000,
    description: 'You\'re in charge and it mostly feels natural now.',
    levelUpMessage:
      'You\'ve basically reset your dopamine baseline at this point. Things that have nothing to do with your phone are starting to feel interesting and satisfying again. That\'s called receptor upregulation and it means your brain\'s reward system is genuinely healing. Actually physiologically healing, not just metaphorically.',
    scienceNote:
      'Consistent intentional use brings your tonic dopamine down just enough to restore sensitivity to natural rewards. Your brain is literally rebuilding the circuitry around what feels good.',
    pathDescription:
      'You\'re in charge and it mostly feels natural. Your dopamine baseline is resetting to a healthier level.',
  },
  {
    level: 6,
    name: 'Free',
    minXP: 1500,
    description: 'The compulsive pull is mostly gone.',
    levelUpMessage:
      'What most people don\'t realize is that freedom from your phone isn\'t about willpower. It\'s about your brain restoring a part called the ventromedial prefrontal cortex, the region that handles real value-based decisions. You have access to that again now. You\'re not white-knuckling anything anymore.',
    scienceNote:
      'Freedom from compulsive phone behavior correlates with restored activity in the ventromedial prefrontal cortex, the region responsible for weighing what actually matters to you.',
    pathDescription:
      'The compulsive pull is mostly gone. You open your phone when you mean to and put it down when you\'re done.',
  },
  {
    level: 7,
    name: 'Unlooped',
    minXP: 2100,
    description: 'The phone is just a tool you use when you actually mean to.',
    levelUpMessage:
      'You did something very few people actually do: you changed your brain. Not metaphorically. The automatic pull of apps is structurally weaker than it was when you started. The intentional circuits are stronger. You didn\'t just build good habits, you rebuilt the underlying hardware.',
    scienceNote:
      'At this stage, neuroplasticity has reinforced your intentional circuits at a synaptic level. The automatic pull of apps is measurably weaker than it was when you started.',
    pathDescription:
      'The phone is just a tool now. You pick it up when you mean to, and put it down when you\'re done.',
  },
]

/** Returns the Level object for a given total XP amount. */
export function getLevelFromXP(xp: number): Level {
  let current = LEVELS[0]
  for (const lvl of LEVELS) {
    if (xp >= lvl.minXP) {
      current = lvl
    } else {
      break
    }
  }
  return current
}

/** Returns XP needed to reach the next level (or null if at max). */
export function xpToNextLevel(xp: number): number | null {
  const next = LEVELS.find((lvl) => lvl.minXP > xp)
  return next ? next.minXP - xp : null
}

/** Returns progress fraction (0–1) toward the next level. */
export function levelProgress(xp: number): number {
  const current = getLevelFromXP(xp)
  const nextLevel = LEVELS.find((lvl) => lvl.minXP > xp)
  if (!nextLevel) return 1
  const span = nextLevel.minXP - current.minXP
  const earned = xp - current.minXP
  return Math.min(earned / span, 1)
}
