export interface TwoMinuteVersion {
  missionId: string
  description: string
  xpReward: number
}

export const TWO_MINUTE_VERSIONS: TwoMinuteVersion[] = [
  // Morning missions
  {
    missionId: 'first-hour-human',
    description:
      'Put your phone in another room for just 5 minutes after you wake up. That\'s the whole thing. 5 minutes.',
    xpReward: 15,
  },
  {
    missionId: 'no-alarm-scroll',
    description:
      'Turn off your alarm, put the phone face-down, and don\'t touch it for 2 minutes. Just 2 minutes of not grabbing it.',
    xpReward: 10,
  },
  {
    missionId: 'morning-intention',
    description:
      'Before opening any app, just think of one thing you want to do today. You don\'t even have to write it down.',
    xpReward: 10,
  },
  {
    missionId: 'phone-free-breakfast',
    description:
      'Eat just the first half of your breakfast without looking at your phone. Put it in another room until you\'re halfway done.',
    xpReward: 15,
  },
  {
    missionId: 'rise-and-walk',
    description:
      'Step outside for just 2 minutes before you check anything. Doesn\'t matter where. Just outside.',
    xpReward: 15,
  },
  {
    missionId: 'screen-free-morning',
    description:
      'Get dressed before you check your phone. That\'s it. Just be fully dressed first.',
    xpReward: 15,
  },
  {
    missionId: 'gratitude-before-scroll',
    description:
      'Before you open any app, think of just one thing you\'re grateful for. One.',
    xpReward: 10,
  },
  {
    missionId: 'sunrise-journal',
    description:
      'Write one sentence about how you\'re feeling before you check anything. One sentence.',
    xpReward: 10,
  },
  {
    missionId: 'no-news-before-noon',
    description: 'Skip news until after 10am instead of noon. Baby steps.',
    xpReward: 15,
  },
  {
    missionId: 'alarm-and-done',
    description:
      'Use your phone for the alarm and put it down for just 5 minutes. 5 minutes.',
    xpReward: 10,
  },
  {
    missionId: 'make-your-bed-first',
    description:
      'Straighten just your pillow and blanket before you look at your phone. Takes 30 seconds.',
    xpReward: 5,
  },
  {
    missionId: 'morning-playlist-only',
    description:
      'Pick your music before you check anything else. Press play, phone down.',
    xpReward: 10,
  },

  // Focus missions
  {
    missionId: 'the-23',
    description:
      'Set a timer for 5 minutes. Phone away. Just do one thing for 5 minutes.',
    xpReward: 15,
  },
  {
    missionId: 'notification-detox',
    description:
      'Turn notifications off for just one hour. Just one hour of quiet.',
    xpReward: 15,
  },
  {
    missionId: 'deep-work-hour',
    description: 'Set a timer for 10 minutes. Phone face-down. Do one thing.',
    xpReward: 25,
  },
  {
    missionId: 'grayscale-day',
    description:
      'Put your phone in grayscale for just the next 2 hours and notice what happens.',
    xpReward: 20,
  },
  {
    missionId: 'pomodoro-round',
    description:
      'Do one 25-minute focus block with your phone in another room. Just the one.',
    xpReward: 15,
  },
  {
    missionId: 'single-tab-hour',
    description:
      'Work with just one browser tab for 10 minutes. Notice the urge to open more.',
    xpReward: 15,
  },
  {
    missionId: 'airplane-mode-block',
    description:
      'Airplane mode for just 30 minutes while you do something that matters.',
    xpReward: 20,
  },
  {
    missionId: 'the-monotask',
    description:
      'Pick one thing. Do only that for 10 minutes without switching.',
    xpReward: 15,
  },
  {
    missionId: 'creative-hour',
    description:
      'Make something for just 10 minutes. Draw, write, cook, whatever. Phone off.',
    xpReward: 20,
  },
  {
    missionId: 'no-phone-meeting',
    description:
      'For the first 5 minutes of your next conversation, keep your phone out of sight.',
    xpReward: 15,
  },
  {
    missionId: 'distraction-log',
    description:
      'The next time you feel the urge to check your phone at work, just write down what you were doing. Just once.',
    xpReward: 10,
  },
  {
    missionId: 'flow-finder',
    description:
      'Block 20 minutes for something you care about. Phone off. Try to get into it.',
    xpReward: 25,
  },

  // Environment missions
  {
    missionId: 'no-bedroom-phone',
    description:
      'Just move your phone to the other side of the bedroom instead of right next to the bed. Some distance.',
    xpReward: 15,
  },
  {
    missionId: 'tech-free-table',
    description:
      'Eat one bite before you look at your phone. Just one bite of full presence.',
    xpReward: 10,
  },
  {
    missionId: 'phone-free-zone',
    description:
      'Pick a spot. Leave your phone outside it for just 10 minutes.',
    xpReward: 20,
  },
  {
    missionId: 'no-phone-bathroom',
    description: 'Leave your phone outside the bathroom just once today.',
    xpReward: 10,
  },
  {
    missionId: 'car-phone-vault',
    description:
      'Put your phone in the back seat (not the front) for your next drive.',
    xpReward: 10,
  },
  {
    missionId: 'living-room-reset',
    description: 'Move just one charger to a more intentional spot today.',
    xpReward: 15,
  },
  {
    missionId: 'screen-free-commute',
    description:
      'Keep your phone in your bag for at least the first half of your commute.',
    xpReward: 15,
  },
  {
    missionId: 'nature-break',
    description: 'Go outside without your phone for 5 minutes. Just 5.',
    xpReward: 15,
  },
  {
    missionId: 'tech-sunset',
    description:
      'No screens for just 30 minutes before bed instead of the whole evening.',
    xpReward: 20,
  },
  {
    missionId: 'tidy-without-tunes',
    description: 'Tidy for 5 minutes in silence. No audio at all.',
    xpReward: 10,
  },
  {
    missionId: 'phone-parking-spot',
    description:
      'Think of a spot right now. That\'s where your phone lives when you\'re done with it.',
    xpReward: 10,
  },
  {
    missionId: 'window-time',
    description:
      'Look out a window for 2 minutes without your phone. Just look at stuff.',
    xpReward: 15,
  },

  // Intentional missions
  {
    missionId: 'intentional-open-x5',
    description:
      'The next time you pick up your phone, say out loud why before you unlock. Just once.',
    xpReward: 15,
  },
  {
    missionId: 'the-waiting-game',
    description:
      'The next time you feel the urge to check, wait 15 seconds before you do. Just 15.',
    xpReward: 15,
  },
  {
    missionId: 'phone-a-human',
    description:
      'Send a voice note to someone you\'ve been meaning to reach out to. 30 seconds.',
    xpReward: 15,
  },
  {
    missionId: 'replace-dont-escape',
    description:
      'The next time you reach for your phone out of boredom, stand up first. Just stand up.',
    xpReward: 20,
  },

  // Social missions
  {
    missionId: 'eye-contact-challenge',
    description:
      'In your next conversation, make eye contact at the start. For 5 seconds. That\'s it.',
    xpReward: 15,
  },
  {
    missionId: 'handwritten-note',
    description:
      'Write one sentence by hand to someone. Could be on a sticky note. One sentence.',
    xpReward: 15,
  },
  {
    missionId: 'device-free-dinner',
    description:
      'Keep your phone away for just the first 10 minutes of dinner.',
    xpReward: 15,
  },
  {
    missionId: 'real-recommendation',
    description:
      'The next time you want to send someone a link, describe it in your own words instead. Just try it once.',
    xpReward: 10,
  },
  {
    missionId: '15-minute-call',
    description:
      'Send a voice note instead of a text to one person today.',
    xpReward: 15,
  },
  {
    missionId: 'help-someone-offline',
    description:
      'Do one tiny offline favor. Open a door, offer to grab something. One small thing.',
    xpReward: 15,
  },
  {
    missionId: 'ask-and-listen',
    description:
      'In your next conversation, ask one genuine question and actually listen to the full answer.',
    xpReward: 15,
  },
  {
    missionId: 'compliment-run',
    description: 'Give one genuine in-person compliment today. Just one.',
    xpReward: 10,
  },
  {
    missionId: 'photo-share',
    description:
      'Show one photo to one person in person instead of posting it. Just one.',
    xpReward: 15,
  },
  {
    missionId: 'presence-pact',
    description:
      'Ask one person you\'re with to put phones away for just 15 minutes together.',
    xpReward: 20,
  },

  // Reset missions
  {
    missionId: 'cold-finish',
    description:
      'Just put your hand under cold water for 10 seconds. Cold water, 10 seconds. That\'s the intro version.',
    xpReward: 15,
  },
  {
    missionId: 'hard-thing-first',
    description:
      'Before you check anything, do one minute of the hard thing. Set a timer. One minute.',
    xpReward: 15,
  },
  {
    missionId: 'voluntary-boredom',
    description:
      'Sit with nothing for 2 minutes. No phone, no book, nothing. Just sit.',
    xpReward: 10,
  },
  {
    missionId: 'sweat-session',
    description:
      'Do 3 minutes of movement that gets your heart going. Jumping jacks, stairs, whatever.',
    xpReward: 15,
  },
  {
    missionId: 'early-alarm-no-snooze',
    description:
      'Get up the first time your alarm goes off. No snooze. That\'s it.',
    xpReward: 15,
  },
  {
    missionId: 'boring-meal',
    description:
      'Eat one snack today that\'s just simple and real. An apple, some nuts, something basic.',
    xpReward: 10,
  },
  {
    missionId: 'hand-wash-dishes',
    description: 'Hand wash just a few dishes right now. 2 minutes.',
    xpReward: 10,
  },
  {
    missionId: 'stretch-in-silence',
    description:
      'Stretch for 2 minutes with zero audio. No music, no podcast.',
    xpReward: 10,
  },
]
