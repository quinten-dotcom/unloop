export interface Level {
  level: number
  name: string
  minXP: number
  identityStatement: string
  whatThisLevelIsAbout: string
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
    identityStatement: "I use my phone without thinking about it.",
    whatThisLevelIsAbout: "Awareness",
    description: "Right now your phone habits are running on autopilot. You're not choosing to scroll. Your brain is choosing for you. The first step is just noticing when it happens.",
    levelUpMessage:
      "Just being here and doing the first practice is more than most people ever do. You noticed the loop. That's where change actually starts.",
    scienceNote:
      "Right now most of your phone use is running on autopilot through a part of your brain called the basal ganglia. It's the habit machine. No conscious thought required. That's about to change.",
    pathDescription:
      "You're starting to notice when it happens. That awareness is the first real step.",
  },
  {
    level: 2,
    name: 'Noticing',
    minXP: 100,
    identityStatement: "I'm starting to catch myself.",
    whatThisLevelIsAbout: "The pause between stimulus and response",
    description: "You're beginning to notice the moments when you reach for your phone on autopilot. Every time you catch yourself, even if you still pick it up, that awareness is changing your brain. You're building the skill of noticing.",
    levelUpMessage:
      "There's a part of your brain called the anterior cingulate cortex, which acts like an internal alarm when you do something on autopilot. You're waking it up. Every time you catch an urge without immediately acting on it, that alarm gets a little louder.",
    scienceNote:
      "Catching an urge without acting on it activates your anterior cingulate cortex, your brain's conflict detector. Each time you do it, that signal gets stronger.",
    pathDescription:
      "You're starting to catch yourself reaching for your phone without thinking. The noticing is working.",
  },
  {
    level: 3,
    name: 'Choosing',
    minXP: 300,
    identityStatement: "I choose whether to pick up my phone.",
    whatThisLevelIsAbout: "Agency",
    description: "Noticing has become a habit. Now you're making active choices about your phone use instead of reacting on autopilot. Some days you choose to scroll and that's fine. The point is that it's a choice now.",
    levelUpMessage:
      "Even a 3-second pause before reaching for your phone can reduce automatic behavior by around 40%. That gap between wanting to scroll and actually scrolling? Your brain is using it to make a real choice. That's not a small thing.",
    scienceNote:
      "When you pause before reaching, your prefrontal cortex gets involved in the decision before your hands move. That's called inhibitory control and you're literally training it right now.",
    pathDescription:
      "There's a gap between the urge and what you do with it. Your brain is checking in before acting.",
  },
  {
    level: 4,
    name: 'Building',
    minXP: 600,
    identityStatement: "I'm building new habits to replace old ones.",
    whatThisLevelIsAbout: "Construction",
    description: "You're not just avoiding bad habits anymore. You're actively building better ones. Morning routines, focus blocks, phone-free zones. You're designing your environment and your day around the person you want to be.",
    levelUpMessage:
      "Your brain is shifting from running on habit to running on intention, and that shift is actually measurable in brain scans. The part that processes rewards is learning to care about what you chose to do, not just what felt good automatically.",
    scienceNote:
      "The shift from habit-based to goal-directed behavior shows up in fMRI scans as a change in which part of your striatum is most active. Yours is moving toward the intentional side.",
    pathDescription:
      "Most of your phone use is intentional now. You're designing your environment around the person you want to be.",
  },
  {
    level: 5,
    name: 'Strengthening',
    minXP: 1000,
    identityStatement: "My new habits are getting stronger than my old ones.",
    whatThisLevelIsAbout: "Consolidation",
    description: "The new patterns are starting to feel more natural than the old ones. You still have moments where you slip back into autopilot, but they're less frequent and you catch them faster. Your brain's pleasure-pain balance is recalibrating.",
    levelUpMessage:
      "Your dopamine baseline is resetting. Things that have nothing to do with your phone are starting to feel genuinely interesting and satisfying again. That's called receptor upregulation and it means your brain's reward system is actually healing.",
    scienceNote:
      "Consistent intentional use brings your tonic dopamine down just enough to restore sensitivity to natural rewards. Your brain is literally rebuilding the circuitry around what feels good.",
    pathDescription:
      "The new patterns are starting to feel more natural than the old ones. You're in charge and it's starting to feel that way.",
  },
  {
    level: 6,
    name: 'Living',
    minXP: 1500,
    identityStatement: "I use my phone on purpose.",
    whatThisLevelIsAbout: "Integration",
    description: "Phone use is no longer something that happens to you. It's something you do intentionally. You still use your phone plenty. The difference is that you're choosing when, why, and how long. That's freedom.",
    levelUpMessage:
      "Freedom from your phone isn't about willpower. It's about your brain restoring a region called the ventromedial prefrontal cortex, the part that handles real value-based decisions. You have access to that again now. You're not white-knuckling anything anymore.",
    scienceNote:
      "Freedom from compulsive phone behavior correlates with restored activity in the ventromedial prefrontal cortex, the region responsible for weighing what actually matters to you.",
    pathDescription:
      "The compulsive pull is mostly gone. You open your phone when you mean to and put it down when you're done.",
  },
  {
    level: 7,
    name: 'Unlooped',
    minXP: 2100,
    identityStatement: "I'm someone who is present, focused, and intentional.",
    whatThisLevelIsAbout: "Mastery",
    description: "This isn't about your phone anymore. It's about who you've become. You're more present, more focused, and more in control of your attention than most people will ever be. The loop is broken.",
    levelUpMessage:
      "You did something very few people actually do: you changed your brain. Not metaphorically. The automatic pull of apps is structurally weaker than it was when you started. The intentional circuits are stronger. You didn't just build good habits. You rebuilt the underlying hardware.",
    scienceNote:
      "At this stage, neuroplasticity has reinforced your intentional circuits at a synaptic level. The automatic pull of apps is measurably weaker than it was when you started.",
    pathDescription:
      "The phone is just a tool now. You pick it up when you mean to and put it down when you're done.",
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

/** Returns progress fraction (0-1) toward the next level. */
export function levelProgress(xp: number): number {
  const current = getLevelFromXP(xp)
  const nextLevel = LEVELS.find((lvl) => lvl.minXP > xp)
  if (!nextLevel) return 1
  const span = nextLevel.minXP - current.minXP
  const earned = xp - current.minXP
  return Math.min(earned / span, 1)
}
