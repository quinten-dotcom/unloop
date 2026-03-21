export type IdentityActionType =
  | 'mission-complete-easy'
  | 'mission-complete-medium'
  | 'mission-complete-hard'
  | 'pause-skip'
  | 'pause-proceed'
  | 'streak-3'
  | 'streak-7'
  | 'streak-14'
  | 'streak-30'
  | 'level-up-early'
  | 'level-up-mid'
  | 'level-up-late'
  | 'daily-complete'
  | 'return-day'

export interface IdentityStatement {
  id: string
  actionType: IdentityActionType
  text: string
}

export const IDENTITY_STATEMENTS: IdentityStatement[] = [
  // mission-complete-easy
  {
    id: 'mce-1',
    actionType: 'mission-complete-easy',
    text: 'Small win. But small wins are how it starts.',
  },
  {
    id: 'mce-2',
    actionType: 'mission-complete-easy',
    text: 'That\'s a vote for the kind of person you want to be.',
  },
  {
    id: 'mce-3',
    actionType: 'mission-complete-easy',
    text: 'Easy, but you still did it. That counts more than you think.',
  },
  {
    id: 'mce-4',
    actionType: 'mission-complete-easy',
    text: 'Consistent beats impressive. Every time.',
  },

  // mission-complete-medium
  {
    id: 'mcm-1',
    actionType: 'mission-complete-medium',
    text: 'That\'s what someone who owns their time does.',
  },
  {
    id: 'mcm-2',
    actionType: 'mission-complete-medium',
    text: 'Not easy, but you did it anyway. That\'s the whole game.',
  },
  {
    id: 'mcm-3',
    actionType: 'mission-complete-medium',
    text: 'Someone building real habits does exactly this.',
  },
  {
    id: 'mcm-4',
    actionType: 'mission-complete-medium',
    text: 'Done. Another vote cast for who you\'re becoming.',
  },

  // mission-complete-hard
  {
    id: 'mch-1',
    actionType: 'mission-complete-hard',
    text: 'Hard mission done. That kind of person doesn\'t need motivation. They just do it.',
  },
  {
    id: 'mch-2',
    actionType: 'mission-complete-hard',
    text: 'That was the hard one. And you did it anyway.',
  },
  {
    id: 'mch-3',
    actionType: 'mission-complete-hard',
    text: 'Someone who reacts would have skipped that. Not you.',
  },
  {
    id: 'mch-4',
    actionType: 'mission-complete-hard',
    text: 'That\'s not willpower anymore. That\'s who you are.',
  },

  // pause-skip
  {
    id: 'ps-1',
    actionType: 'pause-skip',
    text: 'Paused, thought about it, said no. That\'s a whole skill.',
  },
  {
    id: 'ps-2',
    actionType: 'pause-skip',
    text: 'Someone who reacts would have opened it. You chose not to. That\'s the difference.',
  },
  {
    id: 'ps-3',
    actionType: 'pause-skip',
    text: 'The pause itself was the win here.',
  },
  {
    id: 'ps-4',
    actionType: 'pause-skip',
    text: 'Intentional people skip things on purpose. That was on purpose.',
  },

  // pause-proceed
  {
    id: 'pp-1',
    actionType: 'pause-proceed',
    text: 'You chose to open it. Knowing that you chose is what matters.',
  },
  {
    id: 'pp-2',
    actionType: 'pause-proceed',
    text: 'Intentional use is still use. The pause made it intentional.',
  },
  {
    id: 'pp-3',
    actionType: 'pause-proceed',
    text: 'Going in with awareness is completely different from going in on autopilot.',
  },
  {
    id: 'pp-4',
    actionType: 'pause-proceed',
    text: 'Conscious choice is the whole point. That was a conscious choice.',
  },

  // streak-3
  {
    id: 's3-1',
    actionType: 'streak-3',
    text: 'Three days in a row. A pattern is starting to form.',
  },
  {
    id: 's3-2',
    actionType: 'streak-3',
    text: 'Three days isn\'t a coincidence. It\'s the beginning of something.',
  },
  {
    id: 's3-3',
    actionType: 'streak-3',
    text: 'Day 3. This is when it starts to feel like yours.',
  },

  // streak-7
  {
    id: 's7-1',
    actionType: 'streak-7',
    text: 'A week of choosing intentionally. This is becoming part of who you are.',
  },
  {
    id: 's7-2',
    actionType: 'streak-7',
    text: 'Seven days. The version of you from a week ago would be impressed.',
  },
  {
    id: 's7-3',
    actionType: 'streak-7',
    text: 'One full week. What felt hard on day one is starting to feel normal.',
  },

  // streak-14
  {
    id: 's14-1',
    actionType: 'streak-14',
    text: 'Two weeks. This isn\'t a phase. It\'s becoming a character trait.',
  },
  {
    id: 's14-2',
    actionType: 'streak-14',
    text: '14 days of showing up. That\'s a real track record now.',
  },
  {
    id: 's14-3',
    actionType: 'streak-14',
    text: 'Two weeks in. The phone has a little less power over you than it did.',
  },

  // streak-30
  {
    id: 's30-1',
    actionType: 'streak-30',
    text: '30 days. This is genuinely who you are now.',
  },
  {
    id: 's30-2',
    actionType: 'streak-30',
    text: 'A whole month. Habits this strong are hard to break. That\'s the point.',
  },
  {
    id: 's30-3',
    actionType: 'streak-30',
    text: 'Thirty days of choosing on purpose. That\'s not willpower. That\'s identity.',
  },

  // level-up-early
  {
    id: 'lue-1',
    actionType: 'level-up-early',
    text: 'Level up. Still early days, but the trajectory is clear.',
  },
  {
    id: 'lue-2',
    actionType: 'level-up-early',
    text: 'Moving up. Most people never get past where you started.',
  },
  {
    id: 'lue-3',
    actionType: 'level-up-early',
    text: 'New level. The foundation is getting solid.',
  },

  // level-up-mid
  {
    id: 'lum-1',
    actionType: 'level-up-mid',
    text: 'Halfway through. This is where real change lives.',
  },
  {
    id: 'lum-2',
    actionType: 'level-up-mid',
    text: 'Mid-game level up. The habits are sticking in ways you can feel.',
  },
  {
    id: 'lum-3',
    actionType: 'level-up-mid',
    text: 'Someone seriously working on this hits this level. That\'s you.',
  },

  // level-up-late
  {
    id: 'lul-1',
    actionType: 'level-up-late',
    text: 'Late-game level. This version of you is hard to shake.',
  },
  {
    id: 'lul-2',
    actionType: 'level-up-late',
    text: 'Almost at the top. The person who started this would barely recognize you.',
  },
  {
    id: 'lul-3',
    actionType: 'level-up-late',
    text: 'That\'s not a small achievement. Almost nobody gets here.',
  },

  // daily-complete
  {
    id: 'dc-1',
    actionType: 'daily-complete',
    text: 'All three done. Someone who owns their day does exactly this.',
  },
  {
    id: 'dc-2',
    actionType: 'daily-complete',
    text: 'Full day. Morning, noon, and night. That\'s the whole thing.',
  },
  {
    id: 'dc-3',
    actionType: 'daily-complete',
    text: 'Three for three. Days like this are how lives change.',
  },
  {
    id: 'dc-4',
    actionType: 'daily-complete',
    text: 'Complete day. Not everyone finishes what they start. You did.',
  },

  // return-day
  {
    id: 'rd-1',
    actionType: 'return-day',
    text: 'Coming back is harder than staying. Welcome back.',
  },
  {
    id: 'rd-2',
    actionType: 'return-day',
    text: 'Gaps happen. Showing up again after a gap is what separates people who make it.',
  },
  {
    id: 'rd-3',
    actionType: 'return-day',
    text: 'Back at it. The streak can be rebuilt. Today is day one again.',
  },
  {
    id: 'rd-4',
    actionType: 'return-day',
    text: 'You came back. That\'s actually the most important part of all of this.',
  },
]
