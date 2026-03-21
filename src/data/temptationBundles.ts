export interface TemptationBundle {
  id: string
  emoji: string
  condition: string
  reward: string
  fullText: string
  celebrationMsg: string
}

export const TEMPTATION_BUNDLES: TemptationBundle[] = [
  {
    id: 'podcast-walk',
    emoji: '🎧',
    condition: 'go for a walk (at least 15 minutes)',
    reward: 'listen to your favorite podcast',
    fullText: 'I only listen to my favorite podcast when I go for a walk.',
    celebrationMsg: 'Bundle unlocked. Time for your podcast. Shoes on.',
  },
  {
    id: 'show-practices',
    emoji: '📺',
    condition: 'complete all three of today\'s missions',
    reward: 'watch an episode of your favorite show',
    fullText:
      'I only watch my favorite show when I complete all three of today\'s missions.',
    celebrationMsg:
      'Bundle unlocked. All three done. Now go enjoy that episode.',
  },
  {
    id: 'coffee-morning',
    emoji: '☕',
    condition: 'finish your morning mission',
    reward: 'make your favorite coffee drink',
    fullText:
      'I only make my fancy coffee drink when I finish my morning mission.',
    celebrationMsg:
      'Bundle unlocked. Morning mission done. Go make that coffee.',
  },
  {
    id: 'music-workout',
    emoji: '🎵',
    condition: 'start your workout',
    reward: 'listen to your pump-up playlist',
    fullText: 'I only listen to my pump-up playlist when I work out.',
    celebrationMsg: 'Bundle unlocked. Playlist ready. Let\'s go.',
  },
  {
    id: 'podcast-cleaning',
    emoji: '🧹',
    condition: 'clean or tidy for at least 15 minutes',
    reward: 'listen to a podcast episode',
    fullText: 'I only listen to a podcast when I\'m cleaning.',
    celebrationMsg:
      'Bundle unlocked. Place is cleaner, podcast is ready. Good trade.',
  },
  {
    id: 'meal-no-phone',
    emoji: '🍽️',
    condition: 'eat an entire meal without looking at my phone',
    reward: 'enjoy my favorite meal guilt-free',
    fullText:
      'I only enjoy my favorite meal when I eat it phone-free, start to finish.',
    celebrationMsg:
      'Bundle unlocked. Full presence at the table. Enjoy every bite.',
  },
  {
    id: 'tv-reading',
    emoji: '📖',
    condition: 'read for 30 minutes',
    reward: 'watch TV',
    fullText: 'I only watch TV after I\'ve read for 30 minutes.',
    celebrationMsg:
      'Bundle unlocked. 30 pages in the bank. Remote is all yours.',
  },
  {
    id: 'gaming-deepwork',
    emoji: '🎮',
    condition: 'complete a full deep work session',
    reward: 'play games',
    fullText:
      'I only play games after I\'ve completed a full deep work session.',
    celebrationMsg:
      'Bundle unlocked. Real work done. Now go have some fun. You earned it.',
  },
]

export interface UserBundle {
  id: string
  condition: string
  reward: string
  active: boolean
}
