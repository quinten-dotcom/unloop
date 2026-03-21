export interface DecisiveMoment {
  id: string
  description: string
  timeOfDay: 'morning' | 'work' | 'meal' | 'bedtime' | 'anytime'
  defaultResponse: string
  reminderText: string
}

export const DECISIVE_MOMENTS: DecisiveMoment[] = [
  {
    id: 'wake-up',
    description: 'The moment I wake up and reach for my phone',
    timeOfDay: 'morning',
    defaultResponse:
      'I get up, make my bed, and wait 30 minutes before checking anything.',
    reminderText:
      'Your morning plan: phone down until you\'re actually ready for the day.',
  },
  {
    id: 'sit-down-to-work',
    description:
      'The moment I sit down to work and could check social media first',
    timeOfDay: 'work',
    defaultResponse:
      'I open the thing I\'m supposed to be working on first, before anything else.',
    reminderText: 'Your work plan: one thing first, then check everything else.',
  },
  {
    id: 'eating',
    description: 'The moment I sit down to eat and could pull out my phone',
    timeOfDay: 'meal',
    defaultResponse:
      'I leave my phone in another room and just eat.',
    reminderText: 'Your meal plan: phone stays out of reach while you eat.',
  },
  {
    id: 'get-into-bed',
    description: 'The moment I get into bed and could start scrolling',
    timeOfDay: 'bedtime',
    defaultResponse: 'I read for 10 minutes instead of scrolling.',
    reminderText: 'Your bedtime plan: book instead of scroll.',
  },
  {
    id: 'bored-waiting',
    description: 'The moment I\'m bored and waiting somewhere',
    timeOfDay: 'anytime',
    defaultResponse:
      'I look around, breathe, or do nothing. I let the boredom be.',
    reminderText:
      'Your boredom plan: sit with it for 60 seconds before reaching for your phone.',
  },
]
