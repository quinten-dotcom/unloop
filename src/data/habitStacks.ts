export interface HabitStack {
  missionId: string
  stackTemplate: string // "After I [existing habit], I will [mission behavior]."
}

export const HABIT_STACKS: HabitStack[] = [
  {
    missionId: 'first-hour-human',
    stackTemplate:
      'After I turn off my alarm, I leave my phone on the nightstand and get up.',
  },
  {
    missionId: 'no-alarm-scroll',
    stackTemplate:
      'After I turn off my alarm, I put the phone face-down and don\'t pick it up again.',
  },
  {
    missionId: 'morning-intention',
    stackTemplate:
      'After I pour my first coffee, I write down today\'s one thing.',
  },
  {
    missionId: 'phone-free-breakfast',
    stackTemplate:
      'After I pour my coffee, I put my phone in the kitchen drawer.',
  },
  {
    missionId: 'rise-and-walk',
    stackTemplate:
      'After I put on my shoes, I step out the door before checking anything.',
  },
  {
    missionId: 'screen-free-morning',
    stackTemplate:
      'After I wake up, I get dressed and ready before touching my phone.',
  },
  {
    missionId: 'gratitude-before-scroll',
    stackTemplate:
      'After I wake up, I write 3 things I\'m grateful for before opening any app.',
  },
  {
    missionId: 'the-23',
    stackTemplate:
      'After I sit down at my desk, I set a 23-minute timer and put my phone in my bag.',
  },
  {
    missionId: 'deep-work-hour',
    stackTemplate:
      'After I make my workspace ready, I put my phone in another room.',
  },
  {
    missionId: 'pomodoro-round',
    stackTemplate:
      'After I make tea or coffee, I set the timer and start the first focus block.',
  },
  {
    missionId: 'no-bedroom-phone',
    stackTemplate:
      'After I brush my teeth, I plug my phone in the hallway instead of by the bed.',
  },
  {
    missionId: 'tech-free-table',
    stackTemplate:
      'After I sit down to eat, I put my phone face-down in another room.',
  },
  {
    missionId: 'phone-free-zone',
    stackTemplate:
      'After I walk into my chosen zone, I leave my phone outside it.',
  },
  {
    missionId: 'phone-a-human',
    stackTemplate:
      'After I finish lunch, I call one person instead of scrolling.',
  },
  {
    missionId: 'the-waiting-game',
    stackTemplate:
      'After I feel the urge to check my phone, I wait and count to 60 first.',
  },
  {
    missionId: 'eye-contact-challenge',
    stackTemplate:
      'After I sit down with someone, I put my phone in my pocket before we start talking.',
  },
  {
    missionId: 'morning-playlist-only',
    stackTemplate:
      'After I wake up, I pick a playlist and then put my phone down.',
  },
  {
    missionId: 'sunrise-journal',
    stackTemplate:
      'After I wake up, I write for 5 minutes before I check anything.',
  },
  {
    missionId: 'no-phone-meeting',
    stackTemplate:
      'After I walk into a meeting room, I leave my phone outside.',
  },
  {
    missionId: 'tech-sunset',
    stackTemplate:
      'After dinner, I plug my phone in and switch to screen-free mode for the night.',
  },
  {
    missionId: 'nature-break',
    stackTemplate:
      'After I finish a work block, I go outside for 20 minutes before my next task.',
  },
]
