export interface Level {
  level: number
  name: string
  minXP: number
  description: string
  levelUpMessage: string
  scienceNote: string
}

export const LEVELS: Level[] = [
  {
    level: 1,
    name: 'Autopilot',
    minXP: 0,
    description: 'you\'re picking it up without even deciding to',
    levelUpMessage:
      'okay so just being here and doing the first practice is more than most people ever do. you noticed the loop. that\'s the first step and it\'s a real one.',
    scienceNote:
      'right now most of your phone use is running on autopilot through a part of your brain called the basal ganglia, basically the habit machine, no conscious thought required',
  },
  {
    level: 2,
    name: 'Noticing',
    minXP: 100,
    description: 'you\'re starting to catch yourself mid-scroll',
    levelUpMessage:
      'so here\'s what just happened: there\'s this part of your brain called the anterior cingulate cortex, it\'s like your internal alarm that goes off when you do something on autopilot. you\'re waking it up right now. every time you catch an urge without immediately acting on it, that alarm gets a little louder. it\'s working.',
    scienceNote:
      'catching an urge without acting on it activates your anterior cingulate cortex, basically your brain\'s conflict detector, and each time you do it that signal gets a little stronger',
  },
  {
    level: 3,
    name: 'Pausing',
    minXP: 300,
    description: 'there\'s a gap between the urge and what you do about it',
    levelUpMessage:
      'okay this is genuinely significant. even a 3-second pause before reaching for your phone can cut automatic behavior by around 40%. that gap you\'re creating between wanting to scroll and actually scrolling? your brain is using it to make a real choice. that\'s not a small thing at all.',
    scienceNote:
      'when you pause before reaching, your prefrontal cortex gets involved in the decision before your hands move, that\'s called inhibitory control and you\'re literally training it right now',
  },
  {
    level: 4,
    name: 'Choosing',
    minXP: 600,
    description: 'you\'re using your phone on purpose most of the time',
    levelUpMessage:
      'your brain is shifting from running on habit to running on intention and that shift is actually measurable in brain scans. the part of your brain that processes rewards is learning to care about what you chose to do, not just what felt good automatically. that\'s a fundamentally different relationship with your phone than you had at the start.',
    scienceNote:
      'the shift from habit-based to goal-directed behavior shows up in fMRI scans as a change in which part of your striatum is most active, and right now yours is moving toward the intentional side',
  },
  {
    level: 5,
    name: 'Directing',
    minXP: 1000,
    description: 'you\'re in charge and it mostly feels natural now',
    levelUpMessage:
      'so you\'ve basically reset your dopamine baseline at this point. things that have nothing to do with your phone are starting to feel interesting and satisfying again. that\'s called receptor upregulation and it means your brain\'s reward system is genuinely healing. like actually physiologically healing, not just metaphorically.',
    scienceNote:
      'consistent intentional use brings your tonic dopamine down just enough to restore sensitivity to natural rewards, your brain is literally rebuilding the circuitry around what feels good',
  },
  {
    level: 6,
    name: 'Free',
    minXP: 1500,
    description: 'the compulsive pull is mostly gone',
    levelUpMessage:
      'what most people don\'t realize is that freedom from your phone isn\'t about willpower. it\'s about your brain restoring a part called the ventromedial prefrontal cortex, the region that handles real value-based decisions. you have access to that again now. you\'re not white-knuckling anything anymore.',
    scienceNote:
      'freedom from compulsive phone behavior correlates with restored activity in the ventromedial prefrontal cortex, the region responsible for weighing what actually matters to you',
  },
  {
    level: 7,
    name: 'Unlooped',
    minXP: 2100,
    description: 'the phone is just a tool you use when you actually mean to',
    levelUpMessage:
      'so you did something very few people actually do: you changed your brain. not metaphorically. the automatic pull of apps is structurally weaker than it was when you started. the intentional circuits are stronger. you didn\'t just build good habits, you rebuilt the underlying hardware.',
    scienceNote:
      'at this stage neuroplasticity has reinforced your intentional circuits at a synaptic level, the automatic pull of apps is measurably weaker than it was when you started',
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
