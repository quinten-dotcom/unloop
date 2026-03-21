export interface IntentionTemplate {
  id: string
  moment: 'morning' | 'afternoon' | 'evening'
  momentLabel: string
  defaultText: string
  placeholder: string
}

export const INTENTION_TEMPLATES: IntentionTemplate[] = [
  // Morning
  {
    id: 'morning-1',
    moment: 'morning',
    momentLabel: 'Morning (when you wake up)',
    defaultText:
      'When I wake up, I will make my bed and start coffee instead of checking my phone.',
    placeholder: 'When I wake up, I will ... instead of ...',
  },
  {
    id: 'morning-2',
    moment: 'morning',
    momentLabel: 'Morning (when you wake up)',
    defaultText:
      'When I wake up, I will do 5 minutes of stretching instead of scrolling in bed.',
    placeholder: 'When I wake up, I will ... instead of ...',
  },
  {
    id: 'morning-3',
    moment: 'morning',
    momentLabel: 'Morning (when you wake up)',
    defaultText:
      'When I wake up, I will write one sentence about today instead of opening Instagram.',
    placeholder: 'When I wake up, I will ... instead of ...',
  },

  // Afternoon
  {
    id: 'afternoon-1',
    moment: 'afternoon',
    momentLabel: 'Afternoon (after lunch)',
    defaultText:
      'When I feel bored after lunch, I will take a 5-minute walk instead of opening Instagram.',
    placeholder: 'When I feel bored after lunch, I will ... instead of ...',
  },
  {
    id: 'afternoon-2',
    moment: 'afternoon',
    momentLabel: 'Afternoon (after lunch)',
    defaultText:
      'When I sit down after lunch, I will refill my water and take 3 deep breaths instead of checking my phone.',
    placeholder: 'When I sit down after lunch, I will ... instead of ...',
  },
  {
    id: 'afternoon-3',
    moment: 'afternoon',
    momentLabel: 'Afternoon (after lunch)',
    defaultText:
      'When I finish lunch, I will look out a window for 2 minutes instead of scrolling.',
    placeholder: 'When I finish lunch, I will ... instead of ...',
  },

  // Evening
  {
    id: 'evening-1',
    moment: 'evening',
    momentLabel: 'Evening (when you get into bed)',
    defaultText:
      'When I get into bed, I will read for 10 minutes instead of scrolling.',
    placeholder: 'When I get into bed, I will ... instead of ...',
  },
  {
    id: 'evening-2',
    moment: 'evening',
    momentLabel: 'Evening (when you get into bed)',
    defaultText:
      'When I get into bed, I will write down one good thing from today instead of opening my phone.',
    placeholder: 'When I get into bed, I will ... instead of ...',
  },
  {
    id: 'evening-3',
    moment: 'evening',
    momentLabel: 'Evening (when you get into bed)',
    defaultText:
      'When I get into bed, I will listen to calm music for a few minutes instead of checking notifications.',
    placeholder: 'When I get into bed, I will ... instead of ...',
  },
]

// The 3 defaults shown in onboarding: one per moment
export const DEFAULT_INTENTIONS: IntentionTemplate[] = [
  INTENTION_TEMPLATES[0], // morning-1
  INTENTION_TEMPLATES[3], // afternoon-1
  INTENTION_TEMPLATES[6], // evening-1
]
