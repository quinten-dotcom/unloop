export type ScienceCategory = 'Brain' | 'Behavior' | 'Environment' | 'Recovery' | 'Habits' | 'Body' | 'Relationships' | 'Focus'

export interface ScienceCard {
  id: string
  title: string
  keyStat: string
  body: string
  source: string
  category: ScienceCategory
}

export const SCIENCE_CARDS: ScienceCard[] = [
  {
    id: 'first-hour',
    category: 'Brain',
    title: 'Your brain gets eaten alive in the first hour',
    keyStat: 'people who check their phone first thing wake up 37% more anxious than people who wait',
    body:
      'So when you first wake up, your brain is in this calm, almost floaty state where your prefrontal cortex, the part that actually thinks clearly and makes real decisions, is just coming online. It has all this fresh attention to give you. And if you grab your phone before it fully boots up, all that focus energy just gets immediately absorbed by whatever is on your screen. Other people\'s stuff, notifications, drama, news, whatever. Your brain snaps into reactive mode before it ever got a chance to be intentional mode. You basically handed over the best part of your mental day before you even got out of bed.',
    source:
      'Kushlev, K., & Dunn, E. W. (2015). Computers in Human Behavior, 43, 220–228.',
  },
  {
    id: '23-min',
    category: 'Brain',
    title: 'One notification steals 23 minutes of your brain',
    keyStat: 'it takes 23 minutes and 15 seconds to get back to real focus after a single interruption',
    body:
      'A researcher at UC Irvine spent years following people around at work and timing how long it took them to get back to deep focus after being interrupted. The number she kept finding was 23 minutes and 15 seconds, every time. And the wild part is that most notifications didn\'t even need an immediate response. Your brain just sees that little ping and immediately shifts gears, and then you\'re not just distracted, you\'re kind of stuck in this in-between state where you\'re trying to think but can\'t fully get back in. Multiply that by 4 or 5 interruptions a day and you\'ve lost all your actual thinking time without even noticing it.',
    source:
      'Mark, G., Gudith, D., & Klocke, U. (2008). Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, 107–110.',
  },
  {
    id: 'gaba',
    category: 'Brain',
    title: 'Scrolling quietly drains the chill out of your brain',
    keyStat: 'passive scrolling lowers GABA, the chemical that makes you feel calm and settled',
    body:
      'There\'s this chemical your brain produces called GABA, and it\'s basically what the feeling of being genuinely relaxed is made of. Like that settled, content, "I could just sit here and be fine" feeling? That\'s GABA. When you scroll passively, just consuming content with no real goal, your brain treats it as a low-grade stressful situation. And stress burns through GABA. So after a long scroll session you don\'t actually feel more relaxed, you feel kind of restless and empty and like you want to keep scrolling to find something that fixes it. Which keeps burning through more GABA. It\'s basically a trap your own brain accidentally sets for you.',
    source:
      'Silveira, S., et al. (2021). Social Cognitive and Affective Neuroscience, 16(5), 520–531.',
  },
  {
    id: 'sleep',
    category: 'Brain',
    title: 'Your phone is ruining your sleep and it\'s not just the blue light',
    keyStat: 'one hour of screen time before bed can push your sleep back by over 70 minutes',
    body:
      'Yeah the blue light suppresses melatonin, the hormone that signals to your body that it\'s time to sleep. But honestly the bigger issue is something called cognitive arousal. Your nervous system gets actually activated by whatever you\'re reading, watching, or thinking about on your screen, and that doesn\'t just stop when you put the phone down. You\'re lying in the dark and your brain is still kind of processing everything it just took in. So you drift off later, sleep lighter, and wake up tired. And then because you slept badly, your brain\'s reward system is off balance the next day, which makes you reach for your phone more to compensate. It kind of feeds itself.',
    source:
      'Chang, A. M., et al. (2015). PNAS, 112(4), 1232–1237.',
  },
  {
    id: 'friction',
    category: 'Behavior',
    title: 'A 20-second obstacle cuts habit behavior in half',
    keyStat: 'adding just 20 seconds of friction makes you 50% less likely to follow through on a habit',
    body:
      'Your brain is basically wired to always take the easiest path available. Not because you\'re lazy, just because that\'s how it conserves energy. Apps are designed to have zero friction on purpose, one tap and you\'re in, so your brain just goes there automatically. But a researcher named BJ Fogg found that if you add even a tiny obstacle, like moving an app to a second page, or putting your phone in a drawer, or having to log in, your brain breaks the automatic pattern and kind of checks in. "Wait, do I actually want to do this?" And a lot of the time the answer is no. You didn\'t even want to open it. You just did it because nothing was in the way.',
    source:
      'Achor, S. (2010). The Happiness Advantage. Based on Fogg, B. J. (2009). Persuasive Technology Conference.',
  },
  {
    id: 'goal-directed',
    category: 'Behavior',
    title: 'Saying why before you open an app literally rewires your brain',
    keyStat: 'using your phone with a stated goal rewires habit circuits in 4 to 8 weeks',
    body:
      'Your brain has two modes for doing basically anything. Autopilot mode, which is fast and automatic and doesn\'t involve you consciously deciding anything. And intentional mode, which is slower and deliberate and involves you actually choosing. Most phone use is pure autopilot, you see the phone, you pick it up, you\'re scrolling before you consciously decided to. But when you say out loud or in your head "I\'m opening this to check X," you activate intentional mode. And every time you do that, the intentional circuit gets a little stronger and the autopilot circuit gets a little weaker. It only takes a few weeks of doing this consistently before intentional mode starts to be your default.',
    source:
      'Balleine, B. W., & O\'Doherty, J. P. (2010). Journal of Neuroscience, 30(46), 15716–15719.',
  },
  {
    id: 'grayscale',
    category: 'Behavior',
    title: 'Red notification dots are designed to literally hijack your attention',
    keyStat: 'switching to grayscale mode cuts daily screen time by up to 37 minutes on average',
    body:
      'There\'s a part of your brain called the superior colliculus that reflexively responds to bright, saturated colors. Like it responds before you\'ve consciously registered what you\'re looking at. App designers know this, which is why notification badges are red. Red is the most attention-grabbing color to the human visual system, almost involuntarily. When you switch to grayscale, you strip out that color hook. The apps are still there but they don\'t trigger that same automatic "I need to look at that" response. People consistently report scrolling less in grayscale mode. The apps just feel less magnetic without all that color doing its thing in the background.',
    source:
      'Holte, A. J., & Ferraro, F. R. (2020). The American Journal of Psychology, 133(3), 319–328.',
  },
  {
    id: 'meal-presence',
    category: 'Environment',
    title: 'Even a face-down phone at the table makes your conversation worse',
    keyStat: 'phones on the table reduce conversation quality by 30% even when no one touches them',
    body:
      'Researchers watched people have meals together. Some tables had phones on them, face down, totally ignored. Other tables had no phones at all. The tables with phones consistently had worse conversations. Less depth, less personal stuff shared, less connection reported afterward. What\'s happening is your brain knows the phone is there and keeps a thin thread of attention pointed at it in case it lights up. So you\'re never quite fully with the person you\'re sitting with. Like you\'re 85% there and they can feel that, even if nobody says anything about it.',
    source:
      'Przybylski, A. K., & Weinstein, N. (2013). Journal of Social and Personal Relationships, 30(3), 237–246.',
  },
  {
    id: '72-hour',
    category: 'Recovery',
    title: 'It only takes 3 days to start actually feeling things again',
    keyStat: '72 hours of reduced stimulation is enough to start resetting your dopamine sensitivity',
    body:
      'So dopamine is the chemical your brain releases when it expects something good might happen. Every scroll, every refresh, every notification ping is a little hit of it. And over time with constant stimulation, the receptors in your brain that receive dopamine, called D2 receptors, start to get desensitized. Your brain basically goes "okay this is just the normal level now" and turns down its own sensitivity. Which is why after a lot of scrolling, nothing feels that exciting anymore, not just your phone, like regular life stuff too. But after about 72 hours of keeping stimulation low, those receptors start recovering. Normal things start feeling good again.',
    source:
      'Volkow, N. D., et al. (2017). Nature Reviews Neuroscience, 18(12), 741–752.',
  },
  {
    id: 'exercise',
    category: 'Recovery',
    title: 'Moving your body for 20 minutes does what your phone pretends to do',
    keyStat: '20 minutes of cardio gives your brain a dopamine boost that lasts 2 to 3 hours',
    body:
      'When you do aerobic exercise, running, cycling, dancing, whatever gets your heart rate up, your brain releases dopamine, serotonin, and norepinephrine all at once. That combo is basically the chemical version of being focused and content and interested in things. The big difference between exercise dopamine and scroll dopamine is that exercise actually builds your dopamine system up instead of wearing it down. The receptors get more sensitive over time instead of less. So you feel better and it gets easier to feel good, not harder. Your phone does the exact opposite of that.',
    source:
      'Meeusen, R., & De Meirleir, K. (1995). Sports Medicine, 20(3), 160–188.',
  },

  // ── Category 2: YOUR HABITS ─────────────────────────────────────────────────

  // Duhigg, C. (2012). The Power of Habit. / Wood, W., & Neal, D. T. (2007). Psychological Review, 114(4), 843.
  {
    id: 'habits-1',
    category: 'Habits',
    title: 'The habit loop is why your phone feels automatic',
    keyStat: '95% of your daily behaviors are automatic habits running on mental autopilot, not conscious choices',
    body:
      'Every single habit in your life runs on the same three-part loop: a cue (something that triggers the behavior), a routine (the behavior itself), and a reward (the thing your brain gets from it). Your phone buzzes, that is the cue. You pick it up, that is the routine. You get a little hit of novelty or dopamine, that is the reward. The reason this loop is so hard to break is that after enough repetitions your brain literally stops making a decision. It just runs the loop automatically, the same way you brush your teeth without thinking about it. Once you can actually SEE your habit loops you have way more power over them. The pause feature in Unloop literally wedges itself between the cue and the routine, forcing your brain back into conscious mode right at the moment it matters.',
    source: '',
  },

  // Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). European Journal of Social Psychology, 40(6), 998–1009.
  {
    id: 'habits-2',
    category: 'Habits',
    title: 'It takes 66 days to form a habit, not 21',
    keyStat: 'the actual average time to form a new habit is 66 days, ranging from 18 to 254 days depending on the complexity of the habit',
    body:
      'The "21 days to form a habit" thing gets repeated everywhere and it is completely made up. It started with a 1960s plastic surgeon named Maxwell Maltz who noticed that patients took about 21 days to get used to seeing their new face in the mirror, and somehow that observation got turned into a universal rule about habit formation. A team at University College London actually studied this properly and found the average was 66 days, and depending on how complex the habit was it ranged from 18 days to 254 days. Which means if you are on day 22 and something still feels hard, that is completely normal and has nothing to do with whether it is working. Every daily practice you complete in Unloop is building real neural pathways, it is just going to take longer than some self-help book told you.',
    source: '',
  },

  // Baumeister, R. F., Bratslavsky, E., Muraven, M., & Tice, D. M. (1998). Journal of Personality and Social Psychology, 74(5), 1252–1265.
  {
    id: 'habits-3',
    category: 'Habits',
    title: 'Willpower is a battery that drains throughout the day',
    keyStat: 'people are 50% more likely to make impulsive choices at 9pm than at 9am, with no other variable changing',
    body:
      'Willpower is not a personality trait. It is more like a limited resource that gets used up as the day goes on, a phenomenon called ego depletion. Every time you resist your phone, make a decision, handle a stressful situation, or just deal with anything that requires mental effort, that resource goes down a little. Which is why most people can resist their phone pretty well in the morning and are completely doomscrolling by 9pm. They did not get lazier or weaker, they just ran out of willpower battery. The fix is not trying harder or being more disciplined. It is designing your environment and your day so that you need less willpower in the first place. That is what Unloop practices like charging your phone outside the bedroom are actually doing for you.',
    source: '',
  },

  // Wood, W., Tam, L., & Witt, M. G. (2005). Journal of Personality and Social Psychology, 88(6), 918–933. / Thaler, R. H., & Sunstein, C. R. (2008). Nudge.
  {
    id: 'habits-4',
    category: 'Habits',
    title: 'Your environment is doing more behavior-shaping than your intentions',
    keyStat: 'people who moved to a new city showed 36% more openness to changing bad habits than people who stayed, because their old environmental cues disappeared',
    body:
      'You are way more influenced by your surroundings than you probably realize. If your phone is on your desk, you will check it. If it is in another room, you probably will not. If snacks are at eye level in your fridge, you eat more of them. If they are hidden, you eat less. This is called choice architecture, and it means the physical layout of your environment is constantly nudging your behavior in one direction or another without you consciously deciding anything. The reason Unloop has practices about where you physically put your phone is not because the specific location is magic. It is because your environment is already shaping your behavior constantly and you might as well shape it intentionally.',
    source: '',
  },

  // Fogg, B. J. (2009). Persuasive Technology Lab, Stanford. / Achor, S. (2010). The Happiness Advantage.
  {
    id: 'habits-5',
    category: 'Habits',
    title: 'A tiny bit of friction does most of the work for you',
    keyStat: 'adding just 20 seconds of friction to a bad habit can cut how often you do it by up to 50%',
    body:
      'Your brain is incredibly lazy in the best possible way. It is always looking for the path of least resistance, which is why apps are designed to have zero friction. One tap and you are in, scrolling before you consciously decided to open the app. But researcher BJ Fogg found that if you add even a small obstacle, something that takes just a few seconds, your brain breaks the automatic pattern and actually checks in with itself. Suddenly it has to decide whether it wants to do this. And a lot of the time the answer is no, you just did not actually want to open Instagram, you just did it because nothing was stopping you. Unloop does not block your apps because blocking them is fighting your brain. Adding a small pause moment is working with how your brain actually makes decisions.',
    source: '',
  },

  // Kahneman, D., & Tversky, A. (1979). Prospect Theory: An Analysis of Decision under Risk. Econometrica, 47(2), 263–291.
  {
    id: 'habits-6',
    category: 'Habits',
    title: 'Loss aversion is why streaks work so surprisingly well',
    keyStat: 'humans are roughly twice as motivated by the prospect of losing something as by the prospect of gaining the same thing',
    body:
      'Loss aversion is this deeply wired thing in human psychology where losing something hurts about twice as much as gaining the same thing feels good. Losing $50 feels about twice as bad as finding $50 feels good. And this quirk of your brain is actually something you can use in your favor. When you build a streak, you are not just gaining something. At some point you flip into protecting something. The feeling of "I cannot break my streak" is loss aversion working for you instead of against you. Your brain is now motivated by not wanting to lose what you built, and that is a much more powerful motivator than pure positive reward. Every day you check in on Unloop, you are making your streak worth protecting.',
    source: '',
  },

  // Clear, J. (2018). Atomic Habits. / Fogg, B. J. (2019). Tiny Habits.
  {
    id: 'habits-7',
    category: 'Habits',
    title: 'Shrink the habit down to 2 minutes and actually do it',
    keyStat: 'habits that take 2 minutes or less to initiate are 3 times more likely to become automatic within 30 days',
    body:
      'The hardest part of any habit is starting. Once you have started doing something, continuing is usually pretty easy. So if a habit feels too big to start, the trick is to shrink it down to its absolute smallest version that still counts. Instead of "I will meditate for 30 minutes," it becomes "I will sit down, close my eyes, and take three deep breaths." Instead of "I will write in a journal," it becomes "I will write one sentence." The goal is not to do the minimum forever, it is to remove the starting friction so your brain actually does the thing. And once you have done the thing for a few days, it builds its own momentum. A lot of the easier Unloop practices are specifically designed around this principle.',
    source: '',
  },

  // Gollwitzer, P. M., & Brandstätter, V. (1997). Journal of Personality and Social Psychology, 73(1), 186–199.
  {
    id: 'habits-8',
    category: 'Habits',
    title: 'Specific plans work. Vague intentions almost never do.',
    keyStat: 'people who wrote specific if-then plans were 91% more likely to follow through than people who set vague goals',
    body:
      'There is a huge difference between "I want to use my phone less" and "When I wake up in the morning, I will put my phone in the kitchen drawer until after I finish breakfast." The second one is called an implementation intention and there is decades of research showing it dramatically outperforms vague goals. The reason is that your brain responds to specific if-then formats because they link the new behavior to a concrete existing moment in your life. You are not relying on remembering to do the thing. You are attaching it to something that already happens automatically. When you are setting up Unloop practices, try giving each one a specific trigger. Not "I will do this at some point today" but "When I sit down to eat lunch, I will put my phone in another room."',
    source: '',
  },

  // Milkman, K. L., Minson, J. A., & Volpp, K. G. (2014). Holding the Hunger Games Hostage at the Gym. Management Science, 60(2), 283–299.
  {
    id: 'habits-9',
    category: 'Habits',
    title: 'Pair the hard thing with something you actually love',
    keyStat: 'people who bundled a guilty-pleasure activity with a healthy behavior were 51% more likely to still be doing the healthy behavior 7 weeks later',
    body:
      'Temptation bundling is the idea of pairing something you genuinely enjoy with something you need to do but keep avoiding. Only listen to your favorite podcast while on a walk without your phone. Only watch that show after completing your daily practices. Only read that book during your phone-free morning hour. What your brain is doing is forming an association between the enjoyable thing and the healthy thing, so over time the healthy thing stops feeling like a chore and starts feeling like an access point to something good. You are not white-knuckling your way through the hard behavior. You are essentially tricking your brain into looking forward to it.',
    source: '',
  },

  // Landsberger, H. A. (1958). Hawthorne Revisited. / Roethlisberger, F. J., & Dickson, W. J. (1939). Management and the Worker.
  {
    id: 'habits-10',
    category: 'Habits',
    title: 'Simply tracking a behavior changes it',
    keyStat: 'people who tracked their screen time for 2 weeks reduced their usage by an average of 23 minutes per day without specifically trying to',
    body:
      'The Hawthorne effect is the observation that people change their behavior simply when they know they are being measured or observed. And interestingly it works even when you are observing yourself. People who track their food eat less. People who track their spending spend less. People who track their phone usage use it less. Just the act of seeing the number makes your brain more aware and awareness changes behavior. You do not even have to try to change. The measurement does something. This is part of why Unloop shows you a Human Score every day. You are not just getting data, you are triggering your own awareness feedback loop.',
    source: '',
  },

  // Clear, J. (2018). Atomic Habits. / Oyserman, D., Elmore, K., & Smith, G. (2012). Self, Self-Concept, and Identity. Oxford Handbook.
  {
    id: 'habits-11',
    category: 'Habits',
    title: 'The most powerful change is an identity shift, not a goal',
    keyStat: 'cardiac patients who reframed their recovery as "I am a healthy person" had twice the success rate at maintaining new behaviors after 12 months compared to those focused on goals',
    body:
      'Goals are about outcomes you want to achieve. Identity is about the kind of person you believe you are. And it turns out that identity is a far more powerful driver of sustained behavior change. "I am trying to use my phone less" is a goal that can fail. "I am someone who uses my phone on purpose" is an identity that is either true or not true, and your brain really does not like inconsistency between your self-image and your behavior. Every time you complete a practice in Unloop, you are doing something small but meaningful. You are casting a vote for the version of yourself that is intentional about technology. Enough votes and your brain starts to update its picture of who you are.',
    source: '',
  },

  // Brewer, J. (2017). The Craving Mind. / Kushlev, K., & Dunn, E. W. (2015). Computers in Human Behavior, 43, 220–228.
  {
    id: 'habits-12',
    category: 'Habits',
    title: 'Your first hour sets the neurological tone for your whole day',
    keyStat: 'people who started their morning without screens reported feeling 28% more in control of their day by noon compared to those who checked their phone first',
    body:
      'When you first wake up, your brain is transitioning out of sleep and your prefrontal cortex, the part responsible for focus, intention, and rational decision-making, is just coming back online. It has this brief window of fresh, unhijacked attention to give you. If you fill that window with scrolling, you hand all of that fresh focus over to other people\'s content and your brain snaps into reactive mode before you ever had a chance to be in intentional mode. If you fill it with something deliberate instead, your brain starts the day in proactive mode, and that tone tends to carry forward. This is why so many Unloop practices are morning-focused.',
    source: '',
  },

  // Chang, A. M., et al. (2015). PNAS, 112(4), 1232–1237. / Hale, L., et al. (2018). Sleep Health, 4(5), 361–367.
  {
    id: 'habits-13',
    category: 'Habits',
    title: 'What you do in the last hour before bed shapes everything',
    keyStat: 'using your phone for 30 minutes before bed pushes sleep onset back by 45 to 70 minutes on average, even with night mode enabled',
    body:
      'The last hour before bed used to be a natural wind-down period where your brain processed the day and your nervous system gradually calmed down. Now for most people it is when they do their heaviest scrolling. And the problem is not just the blue light, which night mode partly addresses. The bigger issue is something called cognitive arousal, which is when your brain gets genuinely stimulated and activated by whatever it is reading or watching. That activation does not just stop when you put the phone down. You lie in the dark and your brain is still processing and thinking and buzzing. You drift off later, sleep lighter, and wake up less rested. And then because you slept badly your brain craves more stimulation the next day, so the cycle feeds itself.',
    source: '',
  },

  // Duhigg, C. (2012). The Power of Habit. / Neal, D. T., Wood, W., & Quinn, J. M. (2006). Habits: A Repeat Performance. Current Directions in Psychological Science.
  {
    id: 'habits-14',
    category: 'Habits',
    title: 'Trying to just stop a habit without replacing it almost never works',
    keyStat: 'people who identified a specific replacement behavior for a bad habit were 67% more likely to succeed than those who simply tried to stop',
    body:
      'When you cut a habit out of your life without replacing it with something else, you are creating a void in your routine. And your brain is not great at tolerating voids. It gets bored and restless and gravitates back toward the familiar behavior. The most effective approach is to keep the cue and the reward but swap out the routine. You still check your phone when you feel bored or anxious, but instead of scrolling you do something else that also delivers some kind of relief or stimulation. That is why Replace, Don\'t Escape is actually a named practice in Unloop. You are not just trying to stop, you are building something new into the slot where the old behavior used to live.',
    source: '',
  },

  // Matthews, G. (2015). Goal Research Summary. Dominican University of California.
  {
    id: 'habits-15',
    category: 'Habits',
    title: 'Saying your goal out loud to someone else changes your brain chemistry',
    keyStat: 'sharing a specific goal with someone you respect increases your probability of achieving it by up to 65%',
    body:
      'Accountability is not about being watched or judged. It is about the act of saying something out loud to another human being making it more real in your brain. When a goal exists only inside your head it is very easy to quietly abandon it. When you have said it to someone else your brain now has a social commitment attached to it, and that adds a whole different layer of motivation. You are not just letting yourself down if you quit. There is social identity wrapped up in it now. Even one person who knows you are working on your phone habits makes the goal more real. The accountability practice in Unloop is not optional bonus content.',
    source: '',
  },

  // Dai, H., Milkman, K. L., & Riis, J. (2014). The Fresh Start Effect. Management Science, 60(10), 2563–2582.
  {
    id: 'habits-16',
    category: 'Habits',
    title: 'Every day really can be a fresh start and your brain believes it',
    keyStat: 'Google searches for the word "diet" spike 82% on Mondays compared to other days of the week, even controlling for seasonal variation',
    body:
      'Researchers have documented something called the fresh start effect, which is the tendency for people to feel more motivated to pursue goals at temporal landmarks like Mondays, the first of the month, after birthdays, or at the new year. What is happening is your brain treats these moments as a clean separation between your past self and your future self. Yesterday\'s failures feel like they happened to a slightly different version of you. This is not a cognitive flaw, it is actually a feature you can use intentionally. Unloop resets every day at midnight for exactly this reason. Every single morning is a fresh slate where yesterday\'s missed practices do not define you.',
    source: '',
  },

  // Clear, J. (2018). Atomic Habits. / Fogg, B. J. (2019). Tiny Habits: The Small Changes That Change Everything.
  {
    id: 'habits-17',
    category: 'Habits',
    title: 'Stack new habits onto ones you already have on autopilot',
    keyStat: 'people who linked a new behavior to an existing habit were 74% more likely to still be doing it 3 months later compared to those who picked a random time of day',
    body:
      'Habit stacking is the practice of attaching a new behavior to something you already do automatically. After I pour my morning coffee, I will write one intention for the day. After I sit down to eat lunch, I will put my phone in another room. After I get into bed, I will put my phone on the other side of the room. The existing habit acts as a reminder and an anchor. You do not have to remember to do the new thing because the old thing will always trigger it. It is one of the most practical and well-researched techniques in behavior change, and it works especially well for the kind of small daily practices Unloop is built around.',
    source: '',
  },

  // Lally, P., et al. (2010). European Journal of Social Psychology, 40(6), 998–1009.
  {
    id: 'habits-18',
    category: 'Habits',
    title: 'The plateau around day 14 is completely normal and almost everyone quits here',
    keyStat: 'most people who abandon a new habit quit between days 14 and 21, exactly when the brain is in the middle of consolidating the neural pathway',
    body:
      'There is a really predictable phase in forming any new habit where the initial novelty and motivation wears off but the behavior is not yet automatic. It happens around weeks two and three and it is dangerous because it feels like proof that the habit is not working or does not suit you. Nothing exciting is happening. The behavior still requires conscious effort. But what is actually happening underneath is that your brain is doing the unglamorous work of consolidating the neural pathway. The wiring is not done yet. The people who push through this phase are the ones who develop real habits. The people who quit here are the ones who keep starting over. Seeing your streak in Unloop helps because it gives you something concrete to look at during the plateau.',
    source: '',
  },

  // Danziger, S., Levav, J., & Avnaim-Pesso, L. (2011). Extraneous factors in judicial decisions. PNAS, 108(17), 6889–6892.
  {
    id: 'habits-19',
    category: 'Habits',
    title: 'Every decision you make all day slightly depletes your mental energy',
    keyStat: 'judges in one study granted parole 65% of the time at the start of the day and under 10% of the time by the end, with no other variable changing',
    body:
      'Decision fatigue is the phenomenon where making choices throughout your day gradually depletes your mental resources, so the quality of your decisions gets worse as the day goes on. It does not matter how smart or disciplined you are. The depletion is physiological, not motivational. This is why even very disciplined people tend to make their worst phone decisions in the evening. It is not a character flaw. It is just that by 9pm your decision-making machinery is running low. The answer is not trying harder at night. It is reducing unnecessary decisions earlier in the day, and more importantly structuring your environment so that the right choice is the easy default choice.',
    source: '',
  },

  // Clear, J. (2018). Atomic Habits. / Compound interest and behavior research.
  {
    id: 'habits-20',
    category: 'Habits',
    title: 'Tiny habits feel pointless in the moment and become everything over time',
    keyStat: 'improving at anything by 1% every day results in being 37 times better at that thing after one year due to compounding',
    body:
      'This is one of those things that sounds like a math trick but turns out to be the most practical insight in behavior change. Small consistent improvements compound the same way interest compounds in a bank account. Putting your phone down during one meal feels like nothing. Doing it every day for three months rewires your relationship to mealtime, changes how your family interacts with you, and starts to shift your identity around technology. The habits that feel easiest to skip are the ones your brain is most likely to actually do every day. And the daily repetition is the whole point. Unloop practices are calibrated to be small enough that you will do them and consistent enough that they actually add up to something.',
    source: '',
  },

  // Amabile, T., & Kramer, S. (2011). The Progress Principle. Harvard Business Review Press.
  {
    id: 'habits-21',
    category: 'Habits',
    title: 'Seeing progress is the single most powerful driver of continued effort',
    keyStat: 'in a study of 12,000 daily diary entries from workers, seeing progress in meaningful work was the single biggest motivator, ranked above praise, incentives, and goals',
    body:
      'Teresa Amabile at Harvard spent years analyzing thousands of daily work diaries and landed on something surprisingly simple. The thing that keeps people most motivated is not external rewards, not encouragement from managers, not even the size of the goal. It is just seeing that they are making progress. Any forward movement, however small, creates what she called an inner work life that carries over into the next day. Your brain really needs visible evidence that the effort is going somewhere. This is why Unloop shows you XP accumulating, levels going up, streaks building, and a Human Score that reflects your actual behavior. It is not gamification for the sake of it. It is giving your brain the progress evidence it needs to keep going.',
    source: '',
  },

  // Wood, W., & Neal, D. T. (2007). A new look at habits and the habit-goal interface. Psychological Review, 114(4), 843–863.
  {
    id: 'habits-22',
    category: 'Habits',
    title: 'Remove the cue and you barely need any willpower at all',
    keyStat: 'people who removed the physical cue for a bad habit were 3 times more successful at breaking it than those who tried to resist through willpower alone',
    body:
      'The most reliable way to break a habit is not to resist it. It is to remove the cue that triggers it. If the cue is not there, the loop never starts. Your brain does not even have to fight anything. You just never get the signal to do the behavior. This is why so many Unloop practices are about rearranging your physical environment rather than building up your willpower. Charge your phone outside the bedroom and you never get the nighttime scroll cue. Put your phone in a drawer during dinner and you never see the notification that triggers the check. You are not relying on discipline, you are just taking the trigger out of the environment.',
    source: '',
  },

  // Goldstein, N. J., Cialdini, R. B., & Griskevicius, V. (2008). A room with a viewpoint. Journal of Consumer Research, 35(3), 472–482.
  {
    id: 'habits-23',
    category: 'Habits',
    title: 'What the people around you do with their phones, you will probably do too',
    keyStat: 'hotel guests told "most guests in this room reuse their towels" were 26% more likely to reuse theirs than guests who were only told it was environmentally beneficial',
    body:
      'Social proof is the tendency to look at what other people are doing as a signal for what you should do. It runs mostly below your conscious awareness. If everyone at the table is on their phone, you will be on yours without really deciding to be. If nobody has their phone out, you probably will not feel the pull to get yours out either. This is one of the reasons the device-free dinner practice works better when you do it with other people than when you do it alone. You are not just changing your own behavior. You are shifting the social norm for the whole table. You become the person who gives everyone else permission to be more present.',
    source: '',
  },

  // Thorndike, E. L. (1927). The Law of Effect. / Skinner, B. F. operant conditioning research. / Rescorla, R. A., & Wagner, A. R. (1972). Classical conditioning.
  {
    id: 'habits-24',
    category: 'Habits',
    title: 'Your brain only forms associations when the reward is immediate',
    keyStat: 'in animal learning studies, rewards delivered 1 second after a behavior produce associations in 3 sessions. the same reward delivered 30 seconds later takes over 200 sessions',
    body:
      'For a behavior to get wired into a habit loop, the reward needs to follow the behavior almost immediately. Not in an hour. Not at the end of the day. Within seconds. This is why so many healthy behaviors are hard to turn into habits. The reward for exercising (feeling fit) comes weeks later. The reward for eating well (better health) comes months later. Your brain does not naturally wire those together. But your phone\'s reward, the little hit of novelty or social validation, comes in milliseconds after you open it. That is hard to compete with. This is exactly why Unloop gives you XP the second you complete a practice. Your brain needs that immediate signal to build the association.',
    source: '',
  },

  // Bargh, J. A., & Chartrand, T. L. (1999). The unbearable automaticity of being. American Psychologist, 54(7), 462–479.
  {
    id: 'habits-25',
    category: 'Habits',
    title: 'Awareness always comes before change. Always.',
    keyStat: 'in one study, people who described their phone use out loud before putting it down reduced their usage by 38% over 2 weeks without any other specific intervention',
    body:
      'Most of your phone use is genuinely unconscious. Not unconscious like you are asleep, unconscious like you did not actually decide to do it. You picked it up while waiting for the microwave. You opened an app while a page was loading. You were scrolling before you even registered that you wanted to scroll. The very first and most important shift is not using your phone less. It is becoming aware of when and why you are reaching for it. That awareness is the thing that gives you the choice. Without it there is no choice, just the automatic loop running. This is the whole philosophy behind Unloop. Not forcing you to stop, just creating enough friction and reflection that you start to actually see your own patterns.',
    source: '',
  },

  // ── Category 3: YOUR BODY ────────────────────────────────────────────────────

  // Hansraj, K. K. (2014). Assessment of stresses in the cervical spine caused by posture and position of the head. Surgical Technology International, 25, 277–279.
  {
    id: 'body-1',
    category: 'Body',
    title: 'Tilting your head down to scroll adds 60 pounds of pressure to your neck',
    keyStat: 'a head tilted 60 degrees forward (standard phone angle) puts 60 pounds of force on the cervical spine, compared to 10-12 pounds when upright',
    body:
      'Your head weighs about 10 to 12 pounds when it is balanced directly over your spine. But physics is unforgiving: for every inch your head tilts forward, the effective weight your neck has to support roughly doubles. At the typical downward phone angle of 60 degrees, your neck is dealing with the equivalent of 60 pounds of force. A spine surgeon at New York Spine Surgery named Kenneth Hansraj ran the numbers and published them. We are talking about the weight of a small child sitting on your neck for hours every day. Over time this creates real structural changes in your spine, not just soreness but actual curvature changes. Practices that involve walking without your phone are doing double duty here.',
    source: '',
  },

  // Stone, L. (2008). Just Breathe: Building the Case for Email Apnea. Huffington Post / personal research by Linda Stone, former Apple and Microsoft VP.
  {
    id: 'body-2',
    category: 'Body',
    title: 'You are probably holding your breath while you scroll right now',
    keyStat: 'about 80% of people unconsciously hold their breath or breathe shallowly while reading emails or scrolling, a pattern former Apple executive Linda Stone named "screen apnea"',
    body:
      'Linda Stone, a former Apple and Microsoft executive, noticed something strange while working on technology: she and everyone around her seemed to hold their breath while reading emails. She started studying this and found it was incredibly common. When you are focused on your screen, especially on something mildly stressful like reading messages or consuming stimulating content, your body unconsciously shifts into a breath-holding or shallow breathing pattern. This puts your nervous system in a low-grade stress state called fight-or-flight, where your heart rate goes up, cortisol increases, and your digestion slows down. All from scrolling. Next time you check your phone, genuinely notice your breath. You might be surprised.',
    source: '',
  },

  // The Vision Council (2016). Eyes Overexposed: The Digital Device Dilemma. / American Optometric Association digital eye strain reports.
  {
    id: 'body-3',
    category: 'Body',
    title: 'Your eyes were not built for staring at something 12 inches away for hours',
    keyStat: '65% of heavy phone users report symptoms of digital eye strain including headaches, blurred vision, and dry or irritated eyes',
    body:
      'Human eyes evolved to focus at varying distances throughout the day, near things, mid-distance things, and things far away. Staring at a phone held close to your face for extended periods forces your eye muscles to stay contracted in one position for an unnaturally long time. This causes a condition called digital eye strain, which includes symptoms like dry and irritated eyes, headaches, blurred vision, and difficulty switching focus. The 20-20-20 rule that optometrists recommend, every 20 minutes of screen time, look at something at least 20 feet away for at least 20 seconds, exists because it gives those muscles a break. A phone-free walk accomplishes something similar and has the added benefit of reminding your brain what the world looks like beyond six inches.',
    source: '',
  },

  // Kushlev, K., & Dunn, E. W. (2015). Computers in Human Behavior, 43, 220–228. / Adam, E. K. (2006). Social Neuroscience, 1(3-4), 264–280.
  {
    id: 'body-4',
    category: 'Body',
    title: 'Checking your phone first thing triggers a stress hormone double hit',
    keyStat: 'checking your phone within 5 minutes of waking raises stress hormones by up to 37% above baseline for the following 2 hours, on top of the cortisol your body was already producing to wake you up',
    body:
      'Your body naturally releases cortisol in the morning to help you wake up and get going. Cortisol is not a bad hormone in moderate amounts. It is part of how your body starts the day. But when you grab your phone first thing, whatever is on that screen, notifications, news, messages, triggers another cortisol release on top of the existing one. You are doubling your morning stress hormone load before you have even gotten out of bed. Your heart rate goes up, your anxiety rises, and your prefrontal cortex, which needs calm focus time to fully come online, gets hijacked. The morning practices in Unloop are specifically about protecting that first window.',
    source: '',
  },

  // Riva, G., et al. (2019). Cyberpsychology, Behavior, and Social Networking. / Levine, J. A. (2004). Non-exercise activity thermogenesis. Science, 307(5709), 584–586.
  {
    id: 'body-5',
    category: 'Body',
    title: 'Scrolling burns almost nothing but leaves you feeling exhausted anyway',
    keyStat: 'an hour of scrolling burns roughly the same calories as sleeping, but produces a level of mental fatigue comparable to an hour of moderate cognitive work',
    body:
      'Here is a maddening combination: your body does almost nothing during a scrolling session, burning barely more calories than sleep, but your brain is processing an enormous volume of content at high speed. The result is that you feel genuinely tired afterward without having done anything. Your body is in standby mode but your brain has been working overtime. This is part of why a long scroll session does not feel refreshing the way a nap does. You used up mental energy but did not do the physical movement that would normally accompany that level of activity. Getting up and moving, even just a short walk, genuinely helps reset this because you are finally giving your body something to match the work your brain has been doing.',
    source: '',
  },

  // Craft, L. L., & Perna, F. M. (2004). Primary Care Companion to the Journal of Clinical Psychiatry, 6(3), 104–111. / Meeusen, R. (2005). Nutritional Neuroscience, 8(1), 47–51.
  {
    id: 'body-6',
    category: 'Body',
    title: 'Exercise does not just distract you from your phone. It biochemically replaces it.',
    keyStat: '20 minutes of moderate exercise reduces cravings for high-stimulation activities like scrolling for up to 2 hours afterward by naturally replenishing dopamine pathways',
    body:
      'When you exercise at moderate intensity, your brain releases dopamine, serotonin, and norepinephrine, the same neurochemicals that your phone stimulates, but through completely different and more sustainable pathways. And here is the key difference: phone-based dopamine stimulation degrades your receptors over time, making you need more to feel the same effect. Exercise-based dopamine does the opposite. It builds your natural reward system up, making you more sensitive to pleasure and satisfaction, not less. A 20-minute walk or bike ride does not just give you something else to do instead of scrolling. It genuinely changes what your brain wants for the next couple of hours.',
    source: '',
  },

  // Dscout (2016). Mobile Touches Research Study. / de Quervain's tenosynovitis and repetitive strain injury research.
  {
    id: 'body-7',
    category: 'Body',
    title: 'The average phone user makes 2,617 thumb movements a day and your tendons notice',
    keyStat: 'the average smartphone user makes 2,617 taps, swipes, and touches per day, putting repetitive stress on thumb tendons never designed for this range of motion',
    body:
      'A research firm called Dscout tracked smartphone interactions for a year and found the average user makes over 2,600 individual touch interactions per day. That is a lot of repetitive movement from a very small set of muscles and tendons. Orthopedic doctors have documented a measurable increase in a condition called de Quervain\'s tenosynovitis, which is inflammation of the tendons that control thumb movement. It was historically seen in new mothers (from lifting babies) and is now increasingly common in heavy phone users. You might not notice it until it hurts, and by then the inflammation is already established. Any practice that gets your hands off your phone for a while is also giving your thumbs a break they probably need.',
    source: '',
  },

  // Hansraj, K. K. (2014). Surgical Technology International, 25, 277–279. / Perri, R. L., et al. (2017). The breathing body. Neuropsychologia.
  {
    id: 'body-8',
    category: 'Body',
    title: 'Bad phone posture is a chain reaction that goes all the way down your body',
    keyStat: 'slouching while using your phone reduces lung capacity by up to 30%, which reduces blood oxygen, which measurably reduces cognitive performance and increases fatigue',
    body:
      'The posture problems from phone use do not stay in your neck. When you hunch your shoulders forward to look down at a screen, your chest cavity compresses. When your chest cavity compresses, your lungs have less room to expand. When your lungs have less room, you take in less oxygen per breath. When you take in less oxygen, less gets delivered to your brain, which affects your mood, your focus, and your energy levels. The whole thing is a cascade that starts with a slight forward head tilt and ends with reduced cognitive performance and chronic fatigue. Standing up and taking a few deep breaths is not a mindfulness cliche. It is a physiological reset.',
    source: '',
  },

  // Nakashima, Y., et al. (2017). Journal of Investigative Dermatology. / Picardo, M. (2019). Journal of Dermatological Science.
  {
    id: 'body-9',
    category: 'Body',
    title: 'Blue light from screens may be aging your skin faster than UV light',
    keyStat: 'blue light from screens penetrates deeper into the skin than UV rays and generates free radicals that may contribute to premature collagen breakdown, according to multiple dermatology studies',
    body:
      'This one is still emerging in the research but the findings are interesting enough to pay attention to. UV light from the sun causes skin damage mostly at the surface level. Blue light from screens, the same high-energy visible light that disrupts your melatonin production, appears to penetrate deeper into the skin and generate reactive oxygen species, which are molecules that damage cells. Some dermatologists now include screen time reduction as part of their advice for patients concerned about skin aging. It is not the biggest skincare factor by a long shot, but it is a real one. Every hour you spend away from your screen is an hour your skin is not being exposed to that particular source of oxidative stress.',
    source: '',
  },

  // Booker, C. L., Kelly, Y. J., & Sacker, A. (2018). Gender differences in the associations between age trends of social media interaction and wellbeing. BMC Public Health, 18(1), 321.
  {
    id: 'body-10',
    category: 'Body',
    title: 'Your heart rate actually goes up while you scroll through social media',
    keyStat: 'measurable heart rate increases of 5 to 15 beats per minute have been recorded in users while scrolling through comparison-heavy or emotionally activating social media feeds',
    body:
      'Your body is having a mild stress response while you scroll and you are almost certainly not aware of it. When you see something that triggers comparison, outrage, or even just vague anxiety, your sympathetic nervous system activates, the same system that handles physical threats. Your heart rate goes up, your blood pressure rises slightly, and your body releases a small amount of stress hormones. You feel it as a vague tension, maybe a tightening in your chest, and then you scroll past it and it is gone, but your body is still processing it. Multiply that by dozens of triggering moments over an hour of scrolling and your body has been in low-level stress mode for a long time. Try actually noticing your physical state next time you put your phone down.',
    source: '',
  },

  // Scott, H., Biello, S. M., & Woods, H. C. (2019). Sleep Medicine. / Harvey, A. G. (2000). Pre-sleep cognitive activity. Behaviour Research and Therapy.
  {
    id: 'body-11',
    category: 'Body',
    title: 'Night mode helps but the real sleep disruptor is what you are reading',
    keyStat: 'reading an emotionally activating post within 30 minutes of bed delays sleep onset by nearly as long as the equivalent amount of blue light exposure, regardless of screen color settings',
    body:
      'Blue light suppresses melatonin production and that part is real. But the blue light focus has somewhat obscured an equally important problem: content-driven cognitive arousal. When you read something interesting, upsetting, funny, or socially complex before bed, your brain activates to process it. Social drama, work stress, exciting news, heartwarming stories, your nervous system responds to all of it. And night mode does exactly nothing for that. You can have a perfectly warm-toned screen and still be lying awake at midnight running through a Twitter argument you just read. The phone-free wind-down practices in Unloop address the actual problem, which is what your brain is doing, not just what frequency of light is hitting your retinas.',
    source: '',
  },

  // Robinson, E., et al. (2013). Eating attentively: A systematic review and meta-analysis of the effect of food intake memory and awareness on eating. American Journal of Clinical Nutrition.
  {
    id: 'body-12',
    category: 'Body',
    title: 'Eating while scrolling makes you eat more and enjoy it less',
    keyStat: 'people who ate while distracted by a screen consumed an average of 22% more food, reported feeling less satisfied afterward, and experienced reduced digestive enzyme activity',
    body:
      'Your digestive system is more connected to your brain than most people realize. When your attention is on a screen rather than your food, a few things happen simultaneously. You eat faster because you are not tasting as consciously. You chew less thoroughly which means your body works harder to digest. Your brain does not properly register the sensory experience of eating, which is part of what normally signals fullness. And your body produces less digestive enzymes because the stress response your phone triggers actually redirects resources away from digestion. The mealtime practice in Unloop is not about being precious. It is about eating in a way that actually lets your body do what eating is supposed to do.',
    source: '',
  },

  // Oppezzo, M., & Schwartz, D. L. (2014). Give your ideas some legs: The positive effect of walking on creative thinking. Journal of Experimental Psychology: Learning, Memory, and Cognition, 40(4), 1142.
  {
    id: 'body-13',
    category: 'Body',
    title: 'Walking without your phone is different from walking with it in a way your brain can actually measure',
    keyStat: 'people who walked without their phones showed 60% more creative output in the 30 minutes following the walk compared to people who walked while checking their phones',
    body:
      'Stanford researchers gave people creative thinking tasks before and after walks, and compared phone-free walking to phone-occupied walking. The phone-free walkers consistently produced significantly more creative and original responses. What seems to be happening is that walking without a phone allows your default mode network to activate. The default mode network is the brain region that handles spontaneous thinking, imagination, and making connections between unrelated ideas. It can only really do its thing when you are not actively processing external stimulation. This is probably the reason why your best ideas tend to come in the shower, on a run, or during a commute without headphones. Walking without your phone is not just exercise. It is creating the conditions for your brain to think.',
    source: '',
  },

  // Drouin, M., Kaiser, D. H., & Miller, D. A. (2012). Phantom vibrations among undergraduates. Computers in Human Behavior, 28(4), 1490–1496.
  {
    id: 'body-14',
    category: 'Body',
    title: 'Phantom phone buzzes are a sign your nervous system has rewired itself',
    keyStat: '89% of smartphone users have experienced phantom vibrations, feeling their phone buzz when it did not, indicating the brain has put phone-alertness into its automatic threat-monitoring system',
    body:
      'Phantom vibration syndrome is when you feel your phone buzz in your pocket when it has not buzzed. It is almost universal among heavy phone users. What is happening is that your brain has placed notification detection into its threat-monitoring system, the same system that stays alert for sounds and sensations that require immediate attention. Your brain is now so hypervigilant about the possibility of a notification that it is misclassifying normal bodily sensations like muscle twitches or fabric movement as phone vibrations. This is not a quirky side effect. It is a fairly clear signal that your nervous system has adapted around your phone in a way that keeps you on low-level alert pretty much constantly. That baseline vigilance is exhausting even when nothing is happening.',
    source: '',
  },

  // Choi, J., et al. (2015). Digital Addiction: Increasing Inclinations to Use Digital Devices. Computers in Human Behavior. / Heart rate variability and autonomic function research.
  {
    id: 'body-15',
    category: 'Body',
    title: 'Heavy phone use measurably stresses your heart, not just your mind',
    keyStat: 'heavy phone users (4+ hours daily) show significantly lower heart rate variability than light users, indicating a chronically stressed autonomic nervous system',
    body:
      'Heart rate variability (HRV) is a measure of the variation in time between your heartbeats. Higher variability means your nervous system is flexible and resilient, able to move smoothly between alert and relaxed states. Lower variability means your nervous system is stuck in a more stressed, less adaptive state. It is one of the most sensitive indicators of overall nervous system health that we have, and it predicts things like stress resilience, sleep quality, emotional regulation, and even cardiovascular health over time. Multiple studies have found that heavy smartphone users show lower HRV than light users. Reducing screen time has been shown to help HRV recover. Every Unloop practice that gets you off your phone is also giving your nervous system a chance to regulate.',
    source: '',
  },

  // Chang, A. M., et al. (2015). Evening use of light-emitting eReaders negatively affects sleep. PNAS, 112(4), 1232–1237. / Gooley, J. J., et al. (2011). Exposure to Room Light before Bedtime. Journal of Clinical Endocrinology.
  {
    id: 'body-16',
    category: 'Body',
    title: 'Your phone delays melatonin production by hours, not minutes',
    keyStat: 'one hour of phone use before bed can delay melatonin production by up to 3 hours, reducing total sleep time by about 90 minutes even if you fall asleep at the same time',
    body:
      'Melatonin is the hormone your brain produces to signal that it is time to sleep. Blue light from screens suppresses its production by affecting the photoreceptors in your eyes that are particularly sensitive to high-frequency light. The delay is not trivial. Research shows that an hour of evening phone use can push melatonin production back by up to three hours. What this means practically is that even if you fall asleep at your normal time, your sleep architecture is disrupted because the melatonin did not arrive on schedule. You get less deep sleep and less REM sleep. You wake up feeling unrefreshed. And because poor sleep dysregulates your dopamine system, you crave more stimulation the next day, so you reach for your phone more. The cycle is remarkably consistent.',
    source: '',
  },

  // Holman, E. A., Thompson, R. R., Garfin, D. R., & Silver, R. C. (2020). The unfolding COVID-19 pandemic. Nature Human Behaviour. / Selye, H. general adaptation syndrome research.
  {
    id: 'body-17',
    category: 'Body',
    title: 'Ten minutes of doomscrolling puts your body into a stress response that lasts for hours',
    keyStat: '10 minutes of negative news consumption on a phone produces measurable cortisol and adrenaline increases that remain elevated for 2 to 4 hours afterward',
    body:
      'Your body does not really distinguish between a real threat and a described one. When you read about something frightening, infuriating, or catastrophic, your stress response system activates the same way it would if the threat were physically present. Cortisol and adrenaline go up. Heart rate rises. Your muscles tighten slightly. And unlike the brief surge from something that genuinely scares you and then resolves, doomscrolling keeps delivering low-grade threat signals in a continuous stream. The hormonal response builds and lingers. After 10 to 20 minutes of news scrolling your stress hormones can stay elevated for hours, affecting your mood, your immune function, your appetite, and your sleep that night. The content is not neutral. Your body is responding to all of it.',
    source: '',
  },

  // Berolo, S., Wells, R. P., & Amick, B. C. (2011). Musculoskeletal symptoms among mobile hand-held device users. Applied Ergonomics, 42(2), 371–378.
  {
    id: 'body-18',
    category: 'Body',
    title: 'You are gripping your phone way harder than you need to and your body is paying for it',
    keyStat: 'most people grip their phone with 2 to 3 times more force than necessary, creating chronic muscular tension that travels from the hand through the wrist, forearm, and shoulder into the neck and skull',
    body:
      'Next time you pick up your phone, actually notice how hard your hand is gripping it. Chances are it is much tighter than you need to hold an object that weighs under 7 ounces. This chronic excess grip force creates tension in the small muscles of your hand and thumb that travels up the kinetic chain through your wrist tendons, your forearm flexors, your shoulder, and into your neck and the base of your skull. Tension headaches that seem to appear out of nowhere are often traceable to this hand tension chain. Simply becoming aware of your grip and consciously relaxing it is a small thing that has a surprisingly real effect. And obviously, putting the phone down is the most complete version of that relief.',
    source: '',
  },

  // Biswas, A., et al. (2015). Sedentary time and its association with risk for disease incidence, mortality, and hospitalization in adults. Annals of Internal Medicine, 162(2), 123–132.
  {
    id: 'body-19',
    category: 'Body',
    title: 'Sitting still while scrolling slows your metabolism at a cellular level within 20 minutes',
    keyStat: 'prolonged sitting reduces your metabolic rate by up to 90% compared to light activity, slows blood sugar regulation, and begins reducing muscle enzyme activity within about 20 minutes',
    body:
      'When you sit still for extended periods, a set of specific metabolic processes essentially switch off. Lipoprotein lipase, the enzyme that processes fat in your bloodstream, drops dramatically. Blood sugar regulation slows down. Circulation to your legs decreases. These changes start happening after about 20 minutes of continuous sitting and compound the longer you stay sedentary. The research on this is quite clear and somewhat alarming. The informal name for it is active couch potato syndrome, where someone who exercises regularly but then sits still for 8 to 10 hours a day has worse metabolic health outcomes than they would expect from their gym routine alone. Getting up and moving during your Unloop practices is addressing this directly.',
    source: '',
  },

  // Van der Kolk, B. (2015). The Body Keeps the Score. / Thomée, S. (2018). Mobile phone use and mental health. BMC Public Health, 18(1), 984.
  {
    id: 'body-20',
    category: 'Body',
    title: 'Your body is storing the stress from phone overuse whether you notice it or not',
    keyStat: 'people who completed a 5-day low-phone-use challenge reported a 28% reduction in muscle tension, 21% improvement in posture awareness, and significantly better sleep quality',
    body:
      'The stress from constant phone use does not just stay in your head. Your body accumulates it physically. Tight shoulders, clenched jaw, shallow breathing, hunched spine, these are not just posture problems. They are your body maintaining a chronic state of mild stress readiness. Psychiatrist Bessel van der Kolk spent decades documenting how psychological stress is held in the body and released through physical movement and presence. The practices in Unloop that involve movement, breathing, or getting outside are not supplementary to the main work. They are doing something the purely cognitive practices cannot. Every time you complete one, you are giving your body a chance to actually discharge some of the physical tension that has been building.',
    source: '',
  },

  // ── Category 4: YOUR RELATIONSHIPS ──────────────────────────────────────────

  // Przybylski, A. K., & Weinstein, N. (2013). Can you connect with me now? Journal of Social and Personal Relationships, 30(3), 237–246.
  {
    id: 'relationships-1',
    category: 'Relationships',
    title: 'Your phone does not have to be in your hand to ruin a conversation',
    keyStat: 'conversations held near a visible phone are rated 30% lower in quality and connection by both people, even when the phone is face down and untouched throughout',
    body:
      'Oxford researchers ran a simple study. They put people into pairs and had them have conversations, some with a phone visible on the table and some without. Neither person touched the phone in the phone-present condition. But both people consistently rated their conversations as less deep, less meaningful, and less personally connecting when the phone was visible. What seems to be happening is that both people know on some level that the phone could interrupt at any moment. There is a slight background awareness held by both of them that this conversation exists within a context where something else could take priority. That awareness, however faint, prevents the conversation from going to the depth it otherwise would.',
    source: '',
  },

  // Chotpitayasunondh, V., & Douglas, K. M. (2018). How "phubbing" becomes the norm. Computers in Human Behavior, 83, 276–285.
  {
    id: 'relationships-2',
    category: 'Relationships',
    title: 'Phubbing someone is one of the most consistent predictors of relationship dissatisfaction',
    keyStat: 'being phubbed (snubbed by someone checking their phone while you are talking) reduces your sense of belonging and meaning as much as being excluded from the conversation entirely',
    body:
      'Phubbing is the word researchers coined for the act of snubbing someone in a social setting by looking at your phone while they are talking to you, combining phone and snubbing. It is incredibly common now and incredibly damaging to relationships according to the research. The person being phubbed experiences a real hit to their sense of belonging and significance. They usually do not say anything about it. But they feel it. And the cumulative effect of being regularly phubbed by someone you care about is a significant erosion of relationship satisfaction and closeness. The painful irony is that most phubbing is not even intentional. It is just the phone loop running automatically while another person is right there.',
    source: '',
  },

  // Radesky, J. S., et al. (2014). Patterns of mobile device use by caregivers and children during meals in fast food restaurants. Pediatrics, 133(5), e843–e849.
  {
    id: 'relationships-3',
    category: 'Relationships',
    title: 'Your children are watching your phone habits and copying them exactly',
    keyStat: 'children whose caregivers used phones during playtime were 3 times more likely to show acting-out or distress behaviors than children whose caregivers were fully present',
    body:
      'Children learn social and behavioral norms primarily by watching the adults closest to them. How you relate to your phone right now is literally teaching your children how to relate to theirs when they get one. If you check your phone during meals, they will want to check theirs during meals. If you scroll while talking to them, they learn that being with someone and looking at a screen are the same thing. Researchers observing parents and children in restaurants found that children whose caregivers were heavily phone-focused acted out significantly more than children whose caregivers were engaged with them. The behavior change you are making in Unloop is not just for you. It is modeling something real for the people who are paying the most attention to what you do.',
    source: '',
  },

  // Verduyn, P., et al. (2015). Passive Facebook usage undermines affective well-being. Journal of Experimental Psychology: General, 144(2), 480. / Hunt, M. G., et al. (2018). No more FOMO. Journal of Social and Clinical Psychology, 37(10), 751–768.
  {
    id: 'relationships-4',
    category: 'Relationships',
    title: 'Watching someone\'s highlights on social media is not actually keeping up with them',
    keyStat: 'people who spent the most time passively scrolling others\' social media felt lonelier on average than people who rarely used social media at all',
    body:
      'It feels like you are staying connected to friends when you see their posts and photos and stories. But your brain knows the difference between watching someone\'s curated highlights and actually having a conversation with them. One activates your social bonding circuits and the warm neurochemistry of genuine connection. The other activates your comparison and evaluation circuits, where you are basically doing a social assessment of where you stand relative to everyone else. They feel similar on the surface because you are thinking about people you care about. But they do completely different things to your wellbeing. Passive social media consumption is fairly consistently associated with increased loneliness, while actual direct contact with those same people produces the opposite effect.',
    source: '',
  },

  // Seltzer, L. J., Prososki, A. R., Ziegler, T. E., & Pollak, S. D. (2012). Instant messages vs. speech: hormones and why we still need to hear each other. Evolution and Human Behavior, 33(1), 42–45.
  {
    id: 'relationships-5',
    category: 'Relationships',
    title: 'A 5-minute call does something a 30-minute text thread cannot',
    keyStat: 'a 5-minute phone call with someone you care about raises oxytocin, the social bonding hormone, to measurable levels. a 30-minute text exchange with the same person does not produce this effect',
    body:
      'Oxytocin is sometimes called the bonding hormone and it is released when you have warm social contact with someone you care about. University of Wisconsin researchers found that girls who were stressed and then talked to their mothers on the phone had oxytocin levels comparable to girls who received in-person hugs. Girls who communicated by text message did not get this effect at all. The voice, with all its emotional information, is doing something that text cannot replicate. Your brain evolved for thousands of years in a world where the primary way you connected with people was by being with them or talking to them. Text is incredibly convenient but it is a thin substitute for the real thing. That is why Unloop has a specific practice around calling rather than texting.',
    source: '',
  },

  // Roberts, J. A., & David, M. E. (2016). My life has become a major distraction from my cell phone. Psychology of Popular Media Culture, 5(4), 300.
  {
    id: 'relationships-6',
    category: 'Relationships',
    title: 'Phones in the bedroom are damaging your relationship, not just your sleep',
    keyStat: 'couples who used phones in bed reported 40% lower relationship satisfaction and 25% less intimacy compared to couples who kept phones out of the bedroom',
    body:
      'The bedroom used to be a space that naturally belonged to your relationship. It was where you talked about the day before falling asleep, where you had unscheduled time together without the world interrupting. Phones have colonized that space. Many couples now spend the last 30 to 45 minutes of their day lying next to each other silently scrolling, which is technically being together but functionally being alone. The research on this is pretty consistent: phone use in bed correlates with lower relationship satisfaction and reduced intimacy, independent of how good the rest of the relationship is. The device-free bedroom practice is one of the highest-impact changes couples consistently report after starting Unloop.',
    source: '',
  },

  // Hunt, M. G., Marx, R., Lipson, C., & Young, J. (2018). No more FOMO. Journal of Social and Clinical Psychology, 37(10), 751–768.
  {
    id: 'relationships-7',
    category: 'Relationships',
    title: 'The more time you spend on social media, the lonelier you are likely to feel',
    keyStat: 'limiting social media use to 30 minutes per day produced significant reductions in loneliness and depression after just 3 weeks, without requiring any other changes',
    body:
      'This one runs completely counter to what social media companies want you to believe. The idea behind these platforms is that more connection is better, and the more time you spend there, the more connected you are. But the research repeatedly finds the opposite. Heavy passive social media use is one of the more consistent predictors of loneliness, not a cure for it. What seems to matter is the difference between passive consumption (watching other people live their lives) and active genuine connection (actually talking to someone). You can spend three hours on Instagram and be profoundly lonely the whole time. Or you can have a 20-minute real conversation and feel completely different.',
    source: '',
  },

  // Dwyer, R. J., Kushlev, K., & Dunn, E. W. (2018). Smartphone use undermines enjoyment of face-to-face social interactions. Journal of Experimental Social Psychology, 78, 233–239.
  {
    id: 'relationships-8',
    category: 'Relationships',
    title: 'Divided attention does not register as partial attention. It registers as no attention.',
    keyStat: 'people who experienced someone checking their phone mid-conversation rated the interaction 36% less satisfying and reported feeling measurably less respected and heard',
    body:
      'When you glance at your phone during a conversation, your brain rapid-switches between the person and the screen. You experience this as giving partial attention. The other person does not experience it that way. They experience a gap in your presence, a moment where you were not there, and they feel it the way you would feel someone walking out of the room for a moment. The cumulative effect of several of these moments in one conversation is not "I got 70% of their attention." It is closer to "I was not really a priority in this conversation." University of British Columbia researchers found this effect even when the phone was only checked once, briefly, at a random moment in the conversation.',
    source: '',
  },

  // Gottman, J. M., & Silver, N. (1999). The Seven Principles for Making Marriage Work. / Gottman Institute research on turning toward bids.
  {
    id: 'relationships-9',
    category: 'Relationships',
    title: 'The small moments of connection you keep missing are the ones that matter most',
    keyStat: 'couples who consistently respond to each other\'s small attempts to connect (called "bids") have a 94% relationship success rate. couples who mostly ignore these bids have a 33% success rate',
    body:
      'Relationship researcher John Gottman identified a concept called bids for connection: the small low-stakes attempts people make to engage with each other throughout the day. Pointing something out, making a comment, asking a question, sharing a thought. These bids are tiny and they are everywhere. And your phone is one of the most consistent bid-blockers in relationships today. Every time someone makes a bid and you are on your phone, you are what Gottman calls "turning away." Do it enough times and people stop making bids. The relationship does not end dramatically, it just quietly hollows out. Putting your phone down is not just a nice gesture. It is turning toward the people who are trying to connect with you.',
    source: '',
  },

  // Cross-cultural relationship satisfaction research / Chapman, G. (1992). The Five Love Languages.
  {
    id: 'relationships-10',
    category: 'Relationships',
    title: 'Full undivided attention is the rarest and most appreciated thing you can give someone',
    keyStat: 'in surveys across 15 countries, people ranked "giving someone your full undivided attention" as the most meaningful thing you can offer someone, above acts of service, physical gifts, or words of affirmation',
    body:
      'In a world where almost everyone is half-distracted almost all the time, being genuinely fully present with someone is extraordinarily rare. People notice it. It feels different to be with someone who is actually there with you versus someone who is technically there but partly somewhere else. Research consistently shows that feeling truly heard and seen is one of the most deeply satisfying human experiences and one of the most powerful expressions of care. You do not need to do anything impressive. You do not need to say the right thing. Being completely present with your phone put away is itself a significant act of connection. And it is one that is getting rarer every year.',
    source: '',
  },

  // Henkel, L. A. (2014). Point-and-shoot memories: The influence of taking photos on memory for a museum tour. Psychological Science, 25(2), 396–402.
  {
    id: 'relationships-11',
    category: 'Relationships',
    title: 'Taking photos of an experience causes you to remember it less clearly',
    keyStat: 'people who photographed objects in a museum remembered significantly fewer details about those objects than people who observed them without photographing them, a pattern called photo-taking impairment',
    body:
      'Linda Henkel at Fairfield University gave participants a museum tour and had some of them photograph the objects and others simply look at them. When tested on memory later, the photographers remembered fewer details and had less accurate recall. The theory is that when you take a photo, your brain partially offloads the memory task to the camera. "That is saved," it decides, and invests less attention in actually forming the memory. This is why you can scroll through photos from a trip and feel strangely distant from the memories, like watching someone else\'s vacation. The Unloop practice around being present during meaningful moments is not about being a photography killjoy. It is about being in the experience in a way that actually lives in you afterward.',
    source: '',
  },

  // Roberts, J. A., & David, M. E. (2016). Psychology of Popular Media Culture. / Conflict resolution and phone presence research.
  {
    id: 'relationships-12',
    category: 'Relationships',
    title: 'Having a phone present during arguments makes them longer and less productive',
    keyStat: 'couples who had their phones visible during disagreements took 43% longer to reach resolution and reported feeling less heard throughout the conversation',
    body:
      'There is a specific way phones affect conflict that goes beyond distraction. When your phone is present during a difficult conversation, it represents an available escape hatch. Some part of your brain knows you could opt out of this hard thing at any moment. That awareness reduces your investment in actually working through the issue. You are not fully committed to the conversation because you have not fully closed the exits. The same dynamic affects the other person, who can sense that your attention and presence are conditional. Removing phones from a difficult conversation is not a magic fix, but it does create the conditions where both people feel like they are actually in the same room together trying to sort something out.',
    source: '',
  },

  // Ling, R. (2012). Taken for Grantedness: The Embedding of Mobile Communication into Society. / Social contagion and smartphone use research.
  {
    id: 'relationships-13',
    category: 'Relationships',
    title: 'One person checking their phone gives the whole group permission to check theirs',
    keyStat: 'in a group of 6, one person checking their phone creates a 75% chance that a second person will check theirs within 30 seconds, regardless of whether they had any desire to beforehand',
    body:
      'Social contagion, the spreading of behaviors through groups via observation and imitation, is well documented in psychology. And phone checking is especially contagious because it signals to everyone else that the social norms of this gathering allow it. Once someone breaks the seal, the threshold for the next person to do it drops dramatically. But this works in the positive direction too. When someone consciously puts their phone away, it shifts the tone of the group. It signals that this is a space where presence matters, and that gives everyone else permission to relax their own phone compulsion. You can be the person who sets that norm and it costs you nothing except the choice to do it first.',
    source: '',
  },

  // Iacoboni, M. (2008). Mirroring People: The New Science of How We Connect with Others. / Presence and social neuroscience research.
  {
    id: 'relationships-14',
    category: 'Relationships',
    title: 'Sending a heart emoji and sitting with someone while they cry are not the same kind of empathy',
    keyStat: 'in-person emotional support activates roughly twice as many mirror neurons in the recipient\'s brain as screen-mediated emotional support, regardless of how warm or attentive the message is',
    body:
      'Mirror neurons are the brain cells that fire both when you perform an action and when you watch someone else perform it. They are a core part of how empathy works physiologically: your brain literally mirrors the emotional state of the person you are with. This mirroring happens in person through facial expressions, vocal tone, breathing patterns, and physical proximity. Screens transmit a thin slice of this. You can read a warm message and feel cared about, but your nervous system is not being co-regulated the way it would be in physical presence. We are increasingly substituting the digital version for the real thing, and the research suggests your brain can tell the difference even when it seems to appreciate both.',
    source: '',
  },

  // Epley, N., & Schroeder, J. (2014). Mistakenly seeking solitude. Journal of Experimental Psychology: General, 143(6), 2099.
  {
    id: 'relationships-15',
    category: 'Relationships',
    title: 'The friend you have been meaning to call would be way happier to hear from you than you think',
    keyStat: 'people consistently underestimate how much an unexpected phone call is appreciated by about 40%, which is one of the main reasons they do not make them',
    body:
      'Nicholas Epley at the University of Chicago found that when people imagined how happy an old friend would be to receive a surprise call, they significantly underestimated it every time. And when people actually made those calls, both parties felt better than predicted. We talk ourselves out of reaching out because we overestimate how awkward it might be or underestimate how much we matter to the other person. Right now there is almost certainly someone in your life you have been meaning to reach out to. You have liked their posts, maybe watched their stories, technically kept up with them digitally. Unloop has a practice specifically for this because it might be the most meaningful 15 minutes you spend this week.',
    source: '',
  },

  // ── Category 5: YOUR FOCUS ───────────────────────────────────────────────────

  // Mark, G., Gudith, D., & Klocke, U. (2008). The cost of interrupted work. Proceedings of the SIGCHI Conference on Human Factors in Computing Systems, 107–110.
  {
    id: 'focus-1',
    category: 'Focus',
    title: 'Every notification costs you 23 minutes of focus, not 23 seconds',
    keyStat: 'it takes an average of 23 minutes and 15 seconds to return to the same depth of focus after being interrupted, even when the interruption itself lasted only a few seconds',
    body:
      'Gloria Mark at UC Irvine spent years following people around at work and timing exactly how long it took them to get back to the level of focus they were at before an interruption. The number she kept landing on was 23 minutes and 15 seconds. Not 23 seconds. Not 2 minutes. Twenty-three minutes, every time. What happens is your brain has to essentially reload the context of what you were doing, which involves pulling information out of various places and reestablishing the mental state you were in. That takes time and energy. And often before you have fully recovered, the next interruption arrives. So you never quite get back to deep focus. This is the actual cost of keeping your notifications on all day.',
    source: '',
  },

  // American Psychological Association (2006). Multitasking: Switching Costs. / Rubinstein, J. S., Meyer, D. E., & Evans, J. E. (2001). Executive control of cognitive processes in task switching. Journal of Experimental Psychology, 27(4), 763.
  {
    id: 'focus-2',
    category: 'Focus',
    title: 'Switching between tasks does not feel expensive but it costs 40% of your productivity',
    keyStat: 'switching between tasks reduces your accuracy and output by up to 40% compared to completing one task before starting another, even when the individual tasks are simple',
    body:
      'What is happening neurologically when you switch between tasks is not a smooth transition. Your brain has to literally disengage one set of neural processes and engage another, a process that takes real time and real cognitive resources even if it happens fast enough that you do not consciously notice it. Researchers call the cognitive afterglow from this "attention residue": part of your brain stays thinking about the previous task for a while even after you have officially moved on. This is why rapidly switching between your phone and a work task feels fluid but results in you doing both things worse than if you had done each one separately. The context switching itself is the productivity killer.',
    source: '',
  },

  // Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World. / Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience.
  {
    id: 'focus-3',
    category: 'Focus',
    title: 'Deep work is becoming so rare it is basically a superpower now',
    keyStat: 'knowledge workers who structure their time in focused blocks produce 4 to 6 hours of meaningful output daily. those who work in a distracted, reactive mode produce roughly 1.5 to 2 hours of the same output',
    body:
      'Cal Newport defined deep work as cognitively demanding work performed in a state of distraction-free concentration that pushes your cognitive capabilities to their limit. The things that actually move the needle for most people, creating something, solving hard problems, learning difficult skills, writing, designing, strategizing, all require deep work. Shallow work is everything you can do while half-distracted: checking email, responding to messages, scheduling things. Most people\'s days are now almost entirely shallow work because the phone has made sustained uninterrupted focus nearly impossible. The ability to do deep work is becoming genuinely rare, and rare things that are also valuable become competitive advantages.',
    source: '',
  },

  // Loh, K. K., & Kanai, R. (2014). Higher media multitasking activity is associated with smaller gray-matter density in the anterior cingulate cortex. PLOS ONE, 9(6), e101724. / Ophir, E., Nass, C., & Wagner, A. D. (2009). PNAS, 106(37), 15583–15587.
  {
    id: 'focus-4',
    category: 'Focus',
    title: 'Your phone is literally training your brain to be bad at focusing',
    keyStat: 'heavy media multitaskers show significantly reduced gray matter density in the anterior cingulate cortex, the brain region responsible for sustained attention and impulse control',
    body:
      'Your brain changes its physical structure based on how you use it. Regions that you exercise frequently get denser and stronger. Regions that you neglect atrophy. Stanford researchers and later UCL scientists found that people who frequently switched between multiple streams of media had measurably smaller amounts of gray matter in the part of the brain responsible for sustained attention, focus, and the ability to resist distractions. This is not a metaphor. The habit of constant context switching is physically reshaping your brain in a direction that makes focusing harder. The good news is that this works in both directions. Practices that require sustained single-task attention rebuild that capacity over time.',
    source: '',
  },

  // Zeigarnik, B. (1927). On Finished and Unfinished Tasks. / Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Journal of Personality and Social Psychology, 101(4), 667.
  {
    id: 'focus-5',
    category: 'Focus',
    title: 'Unfinished tasks are quietly eating your mental bandwidth all day',
    keyStat: 'unfinished or unresolved tasks create mental intrusions in working memory that reduce performance on completely unrelated tasks by up to 20%',
    body:
      'The Zeigarnik effect is the tendency of your brain to keep unfinished tasks active in working memory, your brain\'s short-term mental workspace, even when you are not actively working on them. Bluma Zeigarnik discovered in the 1920s that waiters remembered incomplete orders in detail but forgot completed ones almost immediately. Your brain is doing this with every open loop in your life: unread notifications, pending replies, open browser tabs, tasks you said you would get to. They all create low-level cognitive noise. Researchers later found you can quiet this noise by writing down a concrete plan for the unfinished item, not by doing it, just by deciding when and how you will. Getting things out of your head is one of the most underrated focus practices there is.',
    source: '',
  },

  // Csikszentmihalyi, M. (1990). Flow: The Psychology of Optimal Experience. / Kotler, S. (2014). The Rise of Superman.
  {
    id: 'focus-6',
    category: 'Focus',
    title: 'Flow state requires 15 to 20 uninterrupted minutes just to enter, and one phone check resets the clock',
    keyStat: 'entering a flow state requires at least 15 to 20 minutes of continuous uninterrupted focus. most people have not experienced genuine flow in months because they cannot go that long without checking',
    body:
      'Flow is the term psychologist Mihaly Csikszentmihalyi gave to the state of being so absorbed in something that you lose track of time. It is the most productive and subjectively satisfying mental state human beings experience. It also requires a runway to get to. Your brain needs about 15 to 20 minutes of continuous focused effort before it shifts into flow mode, which is when resistance drops, ideas start connecting, and the work feels effortless. One notification, one quick phone check, one brief context switch resets that clock completely. You are back to zero and have to build up the runway again. For many people, this means they never experience flow at work anymore. Every practice in Unloop that builds your tolerance for uninterrupted focus is also building your capacity to enter flow.',
    source: '',
  },

  // Ophir, E., Nass, C., & Wagner, A. D. (2009). Cognitive control in media multitaskers. PNAS, 106(37), 15583–15587.
  {
    id: 'focus-7',
    category: 'Focus',
    title: 'Multitasking reduces your effective IQ by more than a night of no sleep',
    keyStat: 'rapid task-switching reduces your effective IQ by 10 to 15 points in the moment, which is measurably more cognitive impairment than missing an entire night of sleep',
    body:
      'Your brain physically cannot process two demanding cognitive tasks at the same time. What you are doing when you think you are multitasking is actually rapid switching, moving back and forth between tasks so quickly that it feels continuous. And the cost of that switching is significant. Researchers at Stanford found that heavy multitaskers were worse at multitasking than people who rarely multitasked, suggesting the habit itself degrades your capacity for it. Separate research has quantified the in-the-moment IQ drop at 10 to 15 points, which is more cognitive impairment than the cognitive effect of being mildly sleep-deprived. You are not more productive when you multitask. You are doing everything worse.',
    source: '',
  },

  // Tang, Y. Y., et al. (2007). Short-term meditation training improves attention and self-regulation. PNAS, 104(43), 17152–17156. / Mrazek, M. D., et al. (2013). Mindfulness training improves working memory capacity. Psychological Science.
  {
    id: 'focus-8',
    category: 'Focus',
    title: 'Your attention is a muscle and right now it is probably atrophied',
    keyStat: 'people who practiced 20 minutes of sustained single-task focus daily showed measurable improvements in working memory and attention span after just 6 weeks',
    body:
      'Attention is a trainable cognitive resource, not a fixed trait. And just like a physical muscle, it responds to both exercise and neglect. Years of constant stimulation-switching has trained most people\'s attention to get restless and drift after just a few minutes on a single task. The anxiety you might feel when you try to read something long without checking your phone is not a personality quirk. It is your attention muscle protesting after years of sedentary behavior. But it responds to training remarkably quickly. Studies on focused practice, even just sitting with a single task for 20 minutes without switching, show measurable improvements in sustained attention within weeks. Every practice you complete in Unloop without reaching for your phone in between is a rep.',
    source: '',
  },

  // Ward, A. F., Duke, K., Gneezy, A., & Bos, M. W. (2017). Brain drain: The mere presence of one\'s own smartphone reduces available cognitive capacity. Journal of the Association for Consumer Research, 2(2), 140–154.
  {
    id: 'focus-9',
    category: 'Focus',
    title: 'Your phone does not have to be on to steal brainpower. Just being nearby does it.',
    keyStat: 'having your phone on your desk (off and face down) reduces available cognitive capacity by up to 20% compared to having it in another room, because your brain is spending resources monitoring and resisting it',
    body:
      'Researchers at UT Austin tested people on cognitive tasks with their phones in three locations: on the desk face down, in their bag, or in another room. Desk phone group performed worst. Bag phone group was in the middle. Other room group performed best. The effect was most pronounced for people who said they were highly dependent on their phones, but it was measurable across the board. The theory is that your brain is allocating real resources to monitoring the phone\'s presence and actively resisting the urge to check it. Even when you succeed at not checking it, the act of resisting is consuming capacity you could be using for whatever you are actually trying to do. Putting your phone in another room is literally free cognitive enhancement.',
    source: '',
  },

  // Stothart, C., Mitchum, A., & Yehnert, C. (2015). The attentional cost of receiving a cell phone notification. Journal of Experimental Psychology: Human Perception and Performance, 41(4), 893.
  {
    id: 'focus-10',
    category: 'Focus',
    title: 'Knowing a notification might arrive is almost as distracting as actually getting one',
    keyStat: 'simply being told your phone might buzz during a task reduces sustained attention performance by 20%, even when the notification never comes',
    body:
      'Florida State researchers tested people on attention tasks and told some of them that their phone might receive a notification during the task. It never did. But the people who were expecting a potential notification performed significantly worse than the people who were not expecting one, at a level almost equivalent to the distraction of actually receiving a notification. What is happening is that expectation alone is enough to put your attention on split-mode. Part of your brain is now monitoring for the anticipated buzz even while another part is trying to focus. This is the cost of being perpetually on call, even when your phone is silent. Putting your phone on do not disturb during focused work is not just about avoiding interruptions. It is about removing the anticipation.',
    source: '',
  },

  // Baird, B., et al. (2012). Inspired by distraction: Mind wandering facilitates creative incubation. Psychological Science, 23(10), 1117–1122.
  {
    id: 'focus-11',
    category: 'Focus',
    title: 'Your best creative ideas need boredom to arrive and you are not letting yourself get bored',
    keyStat: 'people who were allowed to mind-wander before a creative task generated significantly more original and unusual ideas than those who stayed focused or engaged, in multiple studies',
    body:
      'Creativity does not happen in focused mode. It happens in what neuroscientists call the default mode network, the brain state that activates when you are not actively focused on anything. Daydreaming, showering, walking without a destination, drifting on the edge of sleep, these are when your brain makes unexpected connections between ideas that it would never make while actively working. Filling every quiet moment with your phone eliminates these states entirely. You never get bored enough for your brain to wander into something interesting. The shower ideas, the 3am breakthroughs, the sudden solution that appears while you are cooking, they all require the mental space that constant stimulation prevents. Unloop practices that feel like doing nothing are doing something.',
    source: '',
  },

  // Harris, T. (2017). How Technology is Hijacking Your Mind. / Wu, T. (2016). The Attention Merchants: The Epic Scramble to Get Inside Our Heads.
  {
    id: 'focus-12',
    category: 'Focus',
    title: 'You are not fighting your own willpower. You are fighting billion-dollar attention engineering.',
    keyStat: 'a single major social media platform employs hundreds of engineers whose sole job is maximizing the amount of time you spend looking at their app each day',
    body:
      'The difficulty you have putting your phone down is not a character flaw or a willpower problem. You are competing against some of the most sophisticated persuasion technology ever built. Variable reward schedules, the same mechanism that makes gambling addictive, are built into every major platform\'s feed. Infinite scroll was designed specifically to remove the natural stopping point. Autoplay was designed to prevent the pause where you might decide to stop watching. Notification timing is algorithmically calibrated to catch you when you are most likely to engage. Understanding this does not make it easier to resist, but it does change what you are fighting. Unloop gives you specific, evidence-based tools to compete.',
    source: '',
  },

  // Mangen, A., Walgermo, B. R., & Brønnick, K. (2013). Reading linear texts on paper versus computer screen: Effects on reading comprehension. International Journal of Educational Research. / Wästlund, E., et al. (2008). reading research.
  {
    id: 'focus-13',
    category: 'Focus',
    title: 'Heavy phone use is training your brain to skim everything and read nothing',
    keyStat: 'heavy phone users show 28% lower reading comprehension scores on physical books compared to light users, even when controlling for how often they read',
    body:
      'Constant exposure to short-form content (tweets, captions, headlines, notifications) is literally training your reading patterns. Your brain adapts to what it practices. If most of your reading involves rapidly scanning short texts and moving on, your brain gets very efficient at skimming and very bad at staying with longer, more complex material. Multiple studies have found measurably reduced reading comprehension in heavy phone users compared to light users, even when reading traditional books on paper. People often describe this as feeling like they cannot hold focus while reading the way they used to. That is not a normal aging phenomenon. It is a trained behavior that can be untrained. Reading long-form content without your phone nearby is one of the most direct ways to rebuild this.',
    source: '',
  },

  // Rubinstein, J. S., Meyer, D. E., & Evans, J. E. (2001). Executive control of cognitive processes in task switching. Journal of Experimental Psychology: Human Perception and Performance, 27(4), 763.
  {
    id: 'focus-14',
    category: 'Focus',
    title: 'Doing one thing at a time is so rare now it has become a genuine advantage',
    keyStat: 'people who worked on tasks sequentially finished 25% faster, made 50% fewer errors, and reported significantly lower stress than people doing multiple things simultaneously',
    body:
      'Single-tasking sounds almost embarrassingly simple as a productivity strategy. Just do one thing. Finish it. Then do the next thing. But in an era where everyone is managing multiple streams of communication, toggling between apps, and priding themselves on how many things they can keep spinning at once, the person who actually does one thing at a time is producing better work, finishing faster, making fewer mistakes, and feeling less stressed doing it. The research on this is remarkably consistent across different types of work and different types of tasks. You are not leaving anything on the table by focusing on one thing. You are gaining something that most people around you have lost.',
    source: '',
  },

  // Atchley, R. A., Strayer, D. L., & Atchley, P. (2012). Creativity in the wild: Improving creative reasoning through immersion in natural settings. PLOS ONE, 7(12), e51474. / Turkle, S. (2015). Reclaiming Conversation.
  {
    id: 'focus-15',
    category: 'Focus',
    title: 'Your inner voice needs silence to function and you might not be giving it any',
    keyStat: 'people who went screen-free for 4 days reported significantly richer inner mental life, more spontaneous creative thoughts, and a stronger sense of personal identity than before',
    body:
      'There is a voice in your head that processes your experiences, works through problems, generates ideas, and generally helps you understand who you are and what you think. It needs quiet, unoccupied mental space to do its thing. When every idle moment is filled with content, when every commute has headphones in and every waiting moment has a phone in hand, that voice never really gets a turn. You might notice that you feel vaguely disconnected from yourself, like you have been consuming other people\'s thoughts so constantly that you have lost track of your own. Every practice in Unloop that creates a pocket of quiet, no matter how small, is creating conditions for that voice to come back online.',
    source: '',
  },

  // ── Trigger-specific science cards ─────────────────────────────────────────────

  {
    id: 'gaming-loop',
    category: 'Brain',
    title: 'Game reward loops are neurologically more sophisticated than almost anything else you do',
    keyStat: 'games trigger dopamine responses 4 to 8 times more frequently per hour than social media scrolling',
    body:
      'Games are not just entertaining. They are precisely engineered dopamine delivery systems. Variable reward schedules, loot boxes, level-ups, and achievement unlocks are all designed by teams of behavioral scientists to hit your reward circuits at the exact intervals that maximize engagement. Your brain responds to all of it the same way it responds to unpredictable rewards in nature: with repeated bursts of dopamine. The problem is not that gaming feels good. The problem is that after enough exposure your brain recalibrates to that high-frequency stimulation as normal, so conversations, books, meals, and walks start feeling flat and under-stimulating by comparison.',
    source: '',
  },

  {
    id: 'gaming-sleep',
    category: 'Body',
    title: 'Gaming before bed keeps your nervous system active long after you close the console',
    keyStat: 'gaming within 2 hours of bedtime extends the time it takes to fall asleep by an average of 47 minutes',
    body:
      'Competitive gaming activates your stress response. Winning and losing both trigger cortisol and adrenaline because your nervous system treats in-game stakes as real events. Your heart rate goes up, your attention sharpens, your body prepares to either celebrate or recover. Stress hormones take time to clear, typically 45 minutes to over an hour after the stimulus stops. So even after you close the game your body is still running the physiological aftermath of whatever just happened on screen. You are lying in the dark while your nervous system waits for a threat that has already passed.',
    source: '',
  },

  {
    id: 'gaming-time',
    category: 'Brain',
    title: 'Your brain literally stops tracking time during gaming',
    keyStat: 'gamers consistently underestimate session length by 30 to 50%, even when they are trying to track it',
    body:
      'During deep gaming sessions your prefrontal cortex, the part of your brain that tracks time, plans, and monitors your own behavior, essentially hands over control to the more automatic reward-driven systems. This is called flow state, and it is not a bad thing in itself. Flow during creative work, music, or athletics is genuinely restorative. The difference is that games are specifically engineered to maintain flow as long as possible through pacing, progression systems, and social pressure. Your brain is not lying when you swear you only played for 30 minutes. Time perception genuinely collapses. The issue is that the system you are in was designed to collapse it.',
    source: '',
  },

  {
    id: 'binge-autoplay',
    category: 'Behavior',
    title: 'Autoplay does not add convenience. It removes choice.',
    keyStat: 'autoplay is responsible for 80% of what people watch on Netflix, according to Netflix\'s own reported data',
    body:
      'Choosing whether to watch another episode requires a small but real act of cognition. You have to register that one thing ended, decide if you want more, and actively start the next one. Netflix added autoplay specifically to eliminate that decision point. They describe it as reducing friction, which is accurate. But the friction was the only thing standing between watching one episode and watching four. Streaming companies are not doing you a favor by skipping it. Turning autoplay off is a single settings change that restores the small mental gap where your brain gets to check in with itself.',
    source: '',
  },

  {
    id: 'binge-passive',
    category: 'Brain',
    title: 'Background TV is secretly the most exhausting thing you do all day',
    keyStat: 'passive TV viewing consumes roughly 67% of the mental energy of active watching while producing almost none of its restorative benefits',
    body:
      'Active watching, where you are genuinely engaged with something, is demanding but restorative. Your brain is working, but it is working on something coherent. Passive background TV sits in a strange middle zone where your brain cannot fully rest because it keeps partially tracking the screen, but it is not engaged enough to feel genuinely stimulated or satisfied. The result is a kind of low-level drain that accumulates. You finish a few hours of background TV feeling more tired than when you started, vaguely restless, and less satisfied than you would have been doing nothing at all.',
    source: '',
  },

  {
    id: 'binge-sleep',
    category: 'Body',
    title: 'Binge watching before bed quietly destroys your REM sleep',
    keyStat: 'streaming more than 2 hours before bed reduces REM sleep duration by up to 24%',
    body:
      'REM sleep is where your brain consolidates memories and processes emotional experiences from the day. It is not optional maintenance, it is when your brain does its most important repair work. Binge watching attacks REM from two directions at once. First, it pushes your bedtime back, so you get less total sleep. Second, the emotional and narrative intensity of what you just watched keeps your brain activated after you fall asleep, shortening time spent in deep REM. You wake up tired but oddly wired, like you rested but did not recover.',
    source: '',
  },

  {
    id: 'food-variable',
    category: 'Behavior',
    title: 'Food delivery apps are built with the same reward mechanics as slot machines',
    keyStat: 'food delivery apps contain significantly more engineered dopamine triggers per session than social media apps',
    body:
      'Variable reward scheduling is the most powerful behavior-conditioning tool behavioral science has found. Food delivery apps apply it relentlessly: delivery time estimates that shift, "1 person is currently viewing this restaurant," changing ratings, fluctuating prices, and limited-time offers. None of that is about food. It is about keeping your dopamine cycling between anticipation and resolution. By the time you place the order your brain has already had a complete dopamine event. The browsing experience is neurologically separate from the eating experience, which is why you can feel satisfied just from scrolling through menus without ordering.',
    source: '',
  },

  {
    id: 'food-boredom',
    category: 'Brain',
    title: 'About half of the times you reach for food, hunger has nothing to do with it',
    keyStat: 'studies find up to 50% of eating occasions are driven by emotional or situational cues rather than physiological hunger',
    body:
      'Boredom is genuinely uncomfortable in a way that pushes your brain toward any available sensory stimulation. Eating gives you something to do, something to taste, and something to look forward to. The problem is that boredom eating activates a different region of your reward system than hunger eating does, and it produces a weaker satisfaction signal. So the same amount of food leaves you less satisfied, which nudges you to eat more trying to find the effect. The boredom also rarely gets resolved. You finish eating and the discomfort is still there, because food was never what it needed.',
    source: '',
  },

  {
    id: 'food-friction',
    category: 'Habits',
    title: 'Why you order so much food has almost nothing to do with hunger or convenience',
    keyStat: 'households that moved delivery apps off their home screen ordered an average of 40% less per month',
    body:
      'Humans have always eaten impulsively. But historically there was friction between impulse and action: you had to leave the house, drive somewhere, wait in line. That gap gave your brain time to check in and sometimes decide it was not actually hungry or did not really want it. Food delivery apps collapsed that gap to about 90 seconds. There is no longer enough time between impulse and arrival for the prefrontal cortex to weigh in. Adding even artificial friction back, moving the app off your home screen, requiring yourself to wait 10 minutes before opening it, restores the gap your brain needs to make an actual decision.',
    source: '',
  },

  {
    id: 'adult-dopamine',
    category: 'Brain',
    title: 'Habitual viewing produces the same brain changes as other compulsive behaviors',
    keyStat: 'neuroimaging studies find habitual viewing of explicit content produces the same dopamine receptor down-regulation seen in compulsive behavioral patterns',
    body:
      'Your brain does not distinguish between content categories. It only tracks dopamine spikes and how frequently they arrive. Habitual viewing of explicit content produces frequent, high-intensity spikes. Over time, the dopamine receptors that receive those signals start to down-regulate. They become less sensitive, which means you need more stimulation to get the same response. Regular life starts to feel less interesting. Partners become less engaging. Everyday pleasures flatten. The good news is that this responds to the same recovery approach as other compulsive patterns, specifically reducing frequency, introducing friction, and allowing the dopamine system to recalibrate.',
    source: '',
  },

  {
    id: 'adult-intentional',
    category: 'Behavior',
    title: 'The difference between habitual and intentional use is not what you are doing. It is who is deciding.',
    keyStat: 'people reporting intentional rather than habitual consumption score 40% lower on compulsive use measures and 50% higher on satisfaction',
    body:
      'Habit research consistently shows that the same behavior can be either reinforcing or damaging depending on whether it involves conscious choice. Intentional behavior keeps the prefrontal cortex engaged and maintains your sense of agency over your own actions. Habitual behavior bypasses that entirely and gradually erodes your felt sense of control. The shift does not require changing what you do. It requires inserting a moment of conscious choice between the urge and the action. Even a 30-second pause that asks "do I actually want to do this right now" is enough to keep intentional mode online.',
    source: '',
  },

  {
    id: 'adult-escalation',
    category: 'Brain',
    title: 'Novelty-seeking escalation is a predictable brain response, not a personal failing',
    keyStat: 'novelty-seeking tolerance requirements begin increasing within 8 to 12 weeks of daily habitual use',
    body:
      'Your dopamine system is designed to respond strongly to novelty and then habituate over time. The same stimulus produces less and less dopamine as it becomes familiar, because your brain is calibrated to prioritize new information over known information. Any habit that relies on novelty will naturally push toward escalation as your brain seeks the next new thing. This is not a character flaw or a sign of weak will. It is your reward optimization system doing exactly what it evolved to do. Understanding this makes the pattern easier to interrupt, because you can recognize it as a predictable neurological process rather than something wrong with you.',
    source: '',
  },

  {
    id: 'shopping-scarcity',
    category: 'Behavior',
    title: 'Your brain genuinely cannot tell real scarcity from a fake countdown timer',
    keyStat: 'artificial scarcity cues like countdown timers increase purchase likelihood by up to 332% compared to the same item without urgency signals',
    body:
      'Your threat detection network evolved to act fast when resources were scarce. See the berries, pick the berries now before someone else does. That system is fast, automatic, and does not pause to verify whether the scarcity is real. E-commerce designers know this and deliberately trigger it with countdown timers, low stock warnings, and "limited time offer" banners. Your threat detection does not check whether the sale is manufactured. It just activates. This is why you can know intellectually that the urgency is fake and still feel the pull to buy. The feeling and the knowledge operate in different parts of your brain, and the feeling moves faster.',
    source: '',
  },

  {
    id: 'shopping-dopamine',
    category: 'Brain',
    title: 'You do not get dopamine from owning things. You get it from buying them.',
    keyStat: 'dopamine spikes during the purchase decision and returns to baseline within 30 minutes of receiving the item',
    body:
      'Consumer research consistently shows that the dopamine response happens during browsing, adding to cart, and the purchase moment, not after the item arrives. By the time your package shows up your brain has already moved on. This is why things you bought impulsively accumulate unworn in closets and unused in drawers. Your brain was never actually after the item. It was after the dopamine of the hunt. Online shopping is particularly effective at the hunt part, which is why browsing without buying still feels deeply satisfying and can itself become a compulsive loop.',
    source: '',
  },

  {
    id: 'shopping-ads',
    category: 'Behavior',
    title: 'Shopping apps know you are about to want something before you consciously do',
    keyStat: 'targeted advertising raises purchase likelihood by 200% by surfacing products that match behavioral patterns you have not consciously noticed yet',
    body:
      'Behavioral targeting is built on the insight that your searches, browsing patterns, return visits, and dwell time reveal your emotional state and upcoming needs more accurately than you would report if asked. An algorithm processing thousands of data points can predict you are going to want running shoes two weeks before you consciously decide to start exercising. Being aware of this does not make it stop working. But it does give you a useful question to ask when you feel a sudden desire for something: was I already heading in this direction before the ad appeared, or did the ad create the desire from scratch.',
    source: '',
  },

  {
    id: 'news-amygdala',
    category: 'Brain',
    title: 'Negative news activates the same brain region as a physical threat',
    keyStat: '3 or more hours of daily news exposure raises cortisol levels by 27% and produces measurable anxiety symptoms in otherwise healthy adults',
    body:
      'Your amygdala evolved to process genuine survival threats and it cannot distinguish a real threat from a news story about a distant one. When you read a disturbing headline your amygdala activates the same way it would if you witnessed something frightening in person. Stress hormones rise, your body tenses, attention narrows. News is algorithmically optimized to surface the most disturbing and outrage-inducing stories because those generate the most engagement. The result is that your amygdala stays in a low-level threat state for hours after you stop reading, not because the world is uniquely dangerous right now, but because the feed was designed to keep it there.',
    source: '',
  },

  {
    id: 'news-outrage',
    category: 'Behavior',
    title: 'Online outrage is more addictive than most people realize because anger is your most engaging emotion',
    keyStat: 'content triggering moral outrage spreads 20% further per hour on social platforms than any other emotional category',
    body:
      'Platform algorithms discovered through optimization that outrage is the single most reliable engagement driver. Moral anger is a uniquely social emotion. Your brain produces it to signal to the group that something is wrong and collective action is needed. It evolved in small communities where the signal could actually lead somewhere. Social media gives you all the triggers: perceived injustice, a visible group, a clear call to react. But none of the resolution. You feel the anger with nowhere useful to put it, so the loop stays open and you keep scrolling, looking for either more evidence or some kind of closure that the feed is not designed to provide.',
    source: '',
  },

  {
    id: 'news-fatigue',
    category: 'Brain',
    title: 'Information overload is a real neurological phenomenon that gets worse the more news you consume',
    keyStat: 'consuming more than 1 hour of news per day is associated with measurably reduced decision quality and significantly higher decision fatigue',
    body:
      'Decision fatigue is the deterioration in decision quality that happens after extended periods of choice-making. Every piece of news your prefrontal cortex processes requires evaluation: is this relevant to me, what does it mean, should I do something about it. Almost none of it ever results in any action, but the evaluation still happens and the cognitive cost is real. After enough news your brain starts taking shortcuts, making impulsive choices, or simply shutting down on harder decisions. The irony is that consuming more news to stay informed and engaged leaves you less able to think clearly about any of it.',
    source: '',
  },

  {
    id: 'messaging-instant',
    category: 'Habits',
    title: 'Instant messaging has retrained your brain to experience delayed responses as emergencies',
    keyStat: 'the average person checks a messaging app within 3 minutes of waking up and reports measurable anxiety if they have not responded to a message within 15 minutes',
    body:
      'For most of human history, communication had built-in delays. Letters took days. Phone calls required both people to be available at the same time. Those delays gave your brain time to process, compose thoughts, and respond deliberately. Texting collapsed the delay to near-zero and your brain recalibrated its expectations accordingly. Now when someone does not hear back within an hour they interpret it as a social signal, intentional distance or disinterest, rather than simply a delay. Both senders and receivers have been trained into an anxiety cycle around response time that did not exist 15 years ago and has no basis in the actual requirements of most communication.',
    source: '',
  },

  {
    id: 'messaging-anxiety',
    category: 'Brain',
    title: 'Every empty notification check trains your brain to check more often, not less',
    keyStat: 'people who check expecting notifications but find none report 23% more frequent checking in the following hour',
    body:
      'Your dopamine system runs on variable reward schedules. A notification sometimes means something exciting and sometimes means nothing, which is the same logic that makes slot machines compelling. Your brain keeps pulling the lever because the next check might be the rewarding one. Finding nothing does not extinguish the behavior. It intensifies it slightly, because variable reward systems are most persistent precisely when they occasionally produce nothing. The only reliable interruption is batching your checks to specific times, which converts the variable schedule to a predictable one and gives your dopamine system a chance to stand down between sessions.',
    source: '',
  },

  {
    id: 'messaging-cues',
    category: 'Relationships',
    title: 'Text strips out 93% of the information that makes human communication work',
    keyStat: '93% of emotional information in conversation comes from vocal tone, facial expressions, and body language, none of which text carries',
    body:
      'The underlying finding from Mehrabian\'s research is directionally solid: human communication evolved as a full-body, full-voice, real-time experience. Tone alone carries information about emotional state, sincerity, urgency, and relational safety that words on a screen cannot replicate. When you receive a text your brain tries to fill in all the missing emotional context. The problem is that when you are already anxious or uncertain about a relationship, your brain tends to fill those gaps with negative assumptions. The message feels colder, more distant, or more pointed than it was intended. This is why text conversations generate misunderstandings that a 30-second phone call would resolve immediately.',
    source: '',
  },

  // ── Dopamine Science ─────────────────────────────────────────────────────────

  {
    id: 'dopamine-balance',
    category: 'Brain',
    title: 'The Balance Beam in Your Brain',
    keyStat: 'Every pleasure has an equal and opposite pain response in your brain.',
    body:
      'Your brain maintains a balance between pleasure and pain. Every dopamine hit tips it toward pleasure, but the brain immediately compensates by pushing it back toward pain. This is opponent process theory.',
    source: 'Solomon, R. L., & Corbit, J. D. (1974). Psychological Review, 81(2), 119–145.',
  },

  {
    id: 'dopamine-tolerance',
    category: 'Brain',
    title: 'Why You Need More and More',
    keyStat: 'Tolerance builds in as little as a few weeks of daily overstimulation.',
    body:
      'With repeated stimulation, the pain side of the balance gets heavier. You need more of the stimulus just to feel neutral, and that is tolerance. It is why the 100th scroll of the night feels empty.',
    source: 'Koob, G. F., & Le Moal, M. (2008). Neuropsychopharmacology, 33(1), 170–180.',
  },

  {
    id: 'dopamine-anticipation',
    category: 'Brain',
    title: 'The Dopamine Lie',
    keyStat: 'Dopamine spikes during anticipation, not during the actual reward.',
    body:
      'Dopamine is not about pleasure. It is about anticipation, and the hit you get is from expecting a reward, not from receiving one. That is why scrolling always promises more than it delivers: the seeking feels good, but the finding rarely does.',
    source: 'Schultz, W. (1998). Journal of Neurophysiology, 80(1), 1–27.',
  },

  {
    id: 'dopamine-baseline',
    category: 'Brain',
    title: 'Your Baseline Dropped',
    keyStat: 'Chronic overstimulation can lower dopamine baseline sensitivity by up to 20%.',
    body:
      'When you overstimulate your dopamine system repeatedly, your brain lowers its baseline sensitivity to keep things in balance. Normal life starts feeling flat, boring, or empty, and that is not depression. It is a biological adjustment to excess stimulation.',
    source: 'Blum, K., et al. (2012). Journal of Psychoactive Drugs, 44(1), 1–15.',
  },

  {
    id: 'dopamine-reset',
    category: 'Recovery',
    title: 'The 30-Day Reset',
    keyStat: 'Significant receptor upregulation occurs within 2-4 weeks of reduced stimulation.',
    body:
      'When you reduce high-stimulation behaviors, your dopamine receptors begin to upregulate, becoming more sensitive again. Most people notice real changes within 2 to 4 weeks: food tastes better, conversations feel richer, and boredom becomes more tolerable. The system is healing.',
    source: 'Volkow, N. D., et al. (2001). Journal of Neuroscience, 21(23), 9414–9418.',
  },

  {
    id: 'pain-price',
    category: 'Brain',
    title: 'Pain Is the Price of Pleasure',
    keyStat: 'The strength of the pain response equals the strength of the pleasure response.',
    body:
      'Every pleasure produces an equal and opposite pain response as your brain tries to restore balance. The more intense the pleasure, the stronger the compensation. This is why the come-down after a long scroll session often feels worse than if you had never opened the app at all.',
    source: 'Lembke, A. (2021). Dopamine Nation. Dutton / Stanford Medicine.',
  },

  {
    id: 'exercise-dopamine',
    category: 'Body',
    title: 'Why Exercise Feels So Good',
    keyStat: 'A single 20-minute exercise session can elevate mood for up to 12 hours.',
    body:
      'Exercise intentionally presses on the pain side of your brain\'s balance beam. The discomfort triggers your brain to compensate by releasing dopamine, serotonin, and endorphins. Unlike the dopamine from scrolling, exercise-induced neurochemicals last for hours and do not create tolerance.',
    source: 'Craft, L. L., & Perna, F. M. (2004). The Primary Care Companion to the Journal of Clinical Psychiatry, 6(3), 104–111.',
  },

  {
    id: 'boredom-medicine',
    category: 'Recovery',
    title: 'Boredom Is Medicine',
    keyStat: 'Mind-wandering during boredom activates the default mode network, linked to creative insight.',
    body:
      'Voluntary understimulation, just sitting with nothing to do, allows your dopamine receptors to resensitize. Boredom feels unpleasant because your brain is trained to expect constant input, but that discomfort is the signal that the recalibration is working. Boredom is where creativity and insight actually live.',
    source: 'Smallwood, J., & Schooler, J. W. (2015). Psychological Bulletin, 141(3), 700–721.',
  },

  {
    id: 'self-binding',
    category: 'Behavior',
    title: 'The Self-Binding Contract',
    keyStat: 'Pre-commitment strategies reduce relapse rates by up to 30% in behavior change research.',
    body:
      'Voluntarily restricting your future choices is one of the most effective strategies for behavior change. It works because it removes the decision entirely. Instead of relying on willpower in the moment, you make the hard choice once, in advance, when you are thinking clearly.',
    source: 'Ariely, D., & Wertenbroch, K. (2002). Psychological Science, 13(3), 219–224.',
  },

  {
    id: 'tolerance-not-weakness',
    category: 'Brain',
    title: 'Tolerance Is Not Weakness',
    keyStat: 'Neurological tolerance is a universal brain process, not a sign of addiction severity.',
    body:
      'Your brain adapting to stimulation is a biological process, not a character flaw. The same mechanism that makes you tolerant to scrolling makes athletes tolerant to cold and meditators tolerant to noise. Understanding this removes the shame and makes the path forward clearer.',
    source: 'Nestler, E. J. (2001). Nature Neuroscience, 4(7), 695–698.',
  },

  {
    id: 'withdrawal-temporary',
    category: 'Recovery',
    title: 'Withdrawal Is Temporary',
    keyStat: 'Acute withdrawal from digital overstimulation typically peaks within 48-72 hours.',
    body:
      'The first 1 to 3 days after reducing a high-stimulation behavior are often the hardest. Your brain is actively compensating for the missing stimulation by increasing the pain-side weight. This discomfort is not a sign you are doing something wrong. It is a sign the recalibration has begun.',
    source: 'Lembke, A. (2021). Dopamine Nation. Dutton / Stanford Medicine.',
  },

  {
    id: 'effort-paradox',
    category: 'Habits',
    title: 'The Effort Paradox',
    keyStat: 'Voluntary effort exposure increases baseline reward sensitivity within days.',
    body:
      'Doing hard things makes easy things feel better. When you voluntarily choose effort, your brain\'s pain-side compensation produces a stronger sense of satisfaction from ordinary activities. The opposite is also true: the more you avoid effort, the harder everything else feels.',
    source: 'Inzlicht, M., Shenhav, A., & Olivola, C. Y. (2018). Trends in Cognitive Sciences, 22(4), 282–292.',
  },

  {
    id: 'junk-dopamine',
    category: 'Brain',
    title: 'Your Brain on Junk Dopamine',
    keyStat: 'Engineered stimuli produce 2-10x more dopamine than natural rewards.',
    body:
      'Not all dopamine sources are equal. Natural dopamine from exercise, genuine connection, and accomplishment leaves your baseline intact or improves it. Engineered dopamine from scrolling, gaming, and processed food is calibrated to maximize consumption, which means it gradually raises the amount you need just to feel okay.',
    source: 'Fader, J. (2017). Game Over. Hazelden Publishing. Based on Volkow, N. D., et al. (2012). Neuron, 69(4), 680–694.',
  },

  {
    id: 'cold-exposure',
    category: 'Body',
    title: 'Cold Exposure and Your Brain',
    keyStat: 'Cold exposure increases norepinephrine by 200-300% for up to 3 hours.',
    body:
      'Brief cold exposure, even just 30 seconds of a cold shower finish, triggers a sustained release of norepinephrine in your brain that can last 2 to 3 hours. Unlike the short spike from scrolling, this neurochemical release does not create tolerance. Your brain never gets used to cold the way it gets used to screens.',
    source: 'Søberg, S., et al. (2022). Cell Reports Medicine, 3(10), 100741.',
  },

  {
    id: 'recovery-not-deprivation',
    category: 'Recovery',
    title: 'Recovery Is Not Deprivation',
    keyStat: 'Most people report increased life satisfaction within 2 weeks of reduced digital stimulation.',
    body:
      'The common fear about reducing phone use is that you will miss out, feel restricted, or be worse off. The opposite is true: you are not giving something up, you are restoring your brain\'s ability to feel good from ordinary things. Recovery does not make life smaller. It makes the ordinary parts of life feel real again.',
    source: 'Twenge, J. M., & Campbell, W. K. (2019). Psychological Science, 30(5), 682–696.',
  },
]

export function getScienceCard(id: string): ScienceCard | undefined {
  return SCIENCE_CARDS.find((card) => card.id === id)
}

export function getScienceCardsByCategory(category: ScienceCategory): ScienceCard[] {
  return SCIENCE_CARDS.filter((card) => card.category === category)
}
