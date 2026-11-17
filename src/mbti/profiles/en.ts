import type { TypeProfiles } from './schema';

/**
 * English profiles for all 16 types.
 *
 * Each profile is written from the specific combination of preferences — the
 * order in which someone tends to use them — so that types sharing three
 * letters (ISTP and INTP, say) still read as genuinely different people.
 */
export const PROFILES_EN: TypeProfiles = {
  ISTJ: {
    nickname: 'The Steady Keeper',
    tagline: 'Quietly dependable, and precise about the things that matter.',
    overview:
      'ISTJ tendencies combine a private, detail-accurate memory for how things have actually worked with a preference for getting the outer world organised and decided. People with this pattern often become the person everyone trusts to remember the real procedure and to finish what was promised.',
    strengths: [
      'Thorough and accurate with detail, especially where accuracy genuinely matters',
      'Follows through on commitments without needing to be chased',
      'Builds and maintains reliable systems, records and routines',
      'Calm and steady when others are reacting to pressure',
    ],
    weaknesses: [
      'May dismiss an untested idea too quickly because it has no track record',
      'Can read as rigid when circumstances have genuinely changed',
      'Sometimes carries far too much alone rather than delegating',
      'May assume appreciation is understood and leave it unsaid',
    ],
    communication:
      'Direct, specific and economical — tends to state the facts and the commitment rather than think out loud.',
    decisions:
      'Weighs what has reliably worked before against clear criteria, then decides and stays with it.',
    social:
      'Prefers a small circle of long-standing relationships to wide networks, and shows care through dependability rather than display.',
    work: 'Works best with clear expectations, enough time to do it properly, and learning that moves step by step from concrete examples.',
    growth: [
      'Ask what an unfamiliar idea might make possible before judging whether it is proven',
      'Say the appreciation you assume people already know',
      'Treat delegation as a way to build others rather than a loss of control',
    ],
  },

  ISTP: {
    nickname: 'The Hands-On Troubleshooter',
    tagline: 'Understands how it works by taking it apart.',
    overview:
      'ISTP tendencies pair private analytical precision with sharp awareness of the physical situation right now. People with this pattern often learn by doing, stay notably calm in a real emergency, and find the most economical fix rather than the most elaborate one.',
    strengths: [
      'Diagnoses practical problems quickly and accurately under real conditions',
      'Stays composed and effective in a crisis or hands-on emergency',
      'Learns tools, machines and physical skills with unusual speed',
      'Cuts through unnecessary complication to the simplest workable solution',
    ],
    weaknesses: [
      'May disengage from long-term planning and commitments that feel abstract',
      'Can seem detached when others want an emotional response rather than a fix',
      'Tends to postpone conversations about feelings instead of having them',
      'May take a physical or practical risk because it is interesting rather than necessary',
    ],
    communication:
      'Spare and literal — says what is needed when it is needed, and tends to demonstrate rather than explain.',
    decisions:
      'Analyses the mechanics of the actual situation and acts once the useful move is clear, adjusting as it unfolds.',
    social:
      'Comfortable with people around a shared activity, and values a lot of personal freedom within close relationships.',
    work: 'Works best with hands-on autonomy, real tools and immediate feedback; learns by trying rather than by being told.',
    growth: [
      'Name a feeling to someone close before it becomes a problem to be solved',
      'Commit to one longer-term goal and keep a visible marker of progress',
      'Ask whether a risk is worth it, not just whether it is manageable',
    ],
  },

  ISFJ: {
    nickname: 'The Quiet Guardian',
    tagline: 'Remembers what you needed, and quietly makes sure you have it.',
    overview:
      'ISFJ tendencies combine a detailed memory for people and circumstances with a warm, practical concern for others’ well-being. People with this pattern often notice the specific thing that would help and simply do it, without announcing that they did.',
    strengths: [
      'Notices what individual people actually need, not what they are expected to need',
      'Follows through on practical care consistently over long periods',
      'Holds the detailed history of a group, family or team',
      'Creates calm, orderly environments where others feel looked after',
    ],
    weaknesses: [
      'Takes on more than is sustainable rather than refusing a request',
      'Keeps hurt feelings private until resentment has built up',
      'May resist a change that is genuinely needed because the old way felt safe',
      'Undersells their own contribution and lets credit go elsewhere',
    ],
    communication:
      'Warm, considerate and concrete — attends closely to how something will land before saying it.',
    decisions:
      'Weighs the practical realities against the effect on the specific people involved, giving real weight to precedent.',
    social:
      'Invests deeply in a few close relationships and prefers small familiar gatherings to large or loud ones.',
    work: 'Works best in stable, cooperative settings with clear expectations and visible appreciation; learns steadily from concrete, well-structured material.',
    growth: [
      'Practise saying no to one request a week without justifying it at length',
      'Raise a small hurt early, while it is still small',
      'Say out loud what you contributed instead of waiting to be noticed',
    ],
  },

  ISFP: {
    nickname: 'The Gentle Maker',
    tagline: 'Lives by quiet personal values and shows them in what they make and do.',
    overview:
      'ISFP tendencies pair deeply held private values with close attention to the texture of the present moment. People with this pattern often express themselves through action, craft or care rather than words, and need their daily life to be consistent with what they actually believe.',
    strengths: [
      'Strong, grounded sense of personal values that holds under pressure',
      'Acute aesthetic and sensory awareness; notices what makes something feel right',
      'Tactful and accepting with people, without wanting to control them',
      'Adapts gracefully and stays practical when plans shift',
    ],
    weaknesses: [
      'Avoids conflict until a situation has become harder to repair',
      'May take criticism of work as criticism of self',
      'Finds long-range planning and self-promotion genuinely draining',
      'Can withdraw rather than state a need directly',
    ],
    communication:
      'Understated and personal — more likely to show warmth through a considerate act than to describe it.',
    decisions:
      'Checks a choice against inner values and how right it feels in practice, rather than against an abstract rule.',
    social:
      'Warm one to one, selective about closeness, and uncomfortable being the centre of a large group’s attention.',
    work: 'Works best with freedom, a concrete craft or cause to care about, and little bureaucracy; learns by doing something real.',
    growth: [
      'Say the difficult thing while it is still a small thing',
      'Separate feedback on the work from a judgement of you',
      'Set one modest long-term goal and break it into visible steps',
    ],
  },

  INFJ: {
    nickname: 'The Quiet Visionary',
    tagline: 'Sees where people and situations are heading, long before it is obvious.',
    overview:
      'INFJ tendencies combine a private, pattern-seeking read on where things are going with a genuine warmth toward people. People with this pattern often hold a long-range picture of how something could be better for others, and work toward it with more private intensity than they show.',
    strengths: [
      'Perceptive about people’s underlying motives and unspoken needs',
      'Holds a clear long-term sense of purpose and works toward it persistently',
      'Writes and speaks about complex human situations with unusual clarity',
      'Creates deep, genuinely supportive one-to-one relationships',
    ],
    weaknesses: [
      'Expects others to pick up on hints that were never said plainly',
      'Pushes past their own limits until they are depleted',
      'Can be perfectionistic and slow to release unfinished work',
      'May withdraw sharply from a relationship rather than address a breach',
    ],
    communication:
      'Thoughtful, layered and warm — prefers meaningful conversation to small talk, and often writes more easily than speaks.',
    decisions:
      'Lets an impression form over time, checks it against deeply held values, then commits firmly once it has settled.',
    social:
      'Needs substantial solitude, forms few but very deep attachments, and tires quickly in crowds.',
    work: 'Works best with autonomy, a purpose worth believing in, and quiet space to think; learns by connecting ideas into a larger meaning.',
    growth: [
      'State what you need explicitly instead of expecting it to be sensed',
      'Protect rest before exhaustion forces it',
      'Release work at good rather than perfect, and let feedback finish it',
    ],
  },

  INFP: {
    nickname: 'The Inner Idealist',
    tagline: 'Measures the world against what it could be, and tries to live accordingly.',
    overview:
      'INFP tendencies pair a strong private moral compass with an imagination that keeps generating possibilities for people. People with this pattern often care intensely about authenticity — in themselves, their work and their relationships — and feel the gap between the actual and the ideal keenly.',
    strengths: [
      'Deeply held values that give direction and resilience to the work they choose',
      'Imaginative and original, especially about human possibilities',
      'Genuinely empathetic without needing to take charge of others',
      'Open-minded about how different people can be',
    ],
    weaknesses: [
      'Self-critical in ways that stall the work before it is finished',
      'Starts more projects than are realistically completed',
      'Takes impersonal criticism personally',
      'Can retreat into the ideal version rather than engage with the practical one',
    ],
    communication:
      'Gentle, expressive and metaphor-rich — opens up slowly, and conveys most in writing or with trusted people.',
    decisions:
      'Tests options against personal values and authenticity first, which can make a purely pragmatic trade-off hard to accept.',
    social:
      'Values a few authentic connections, dislikes superficiality, and needs regular solitude to recover.',
    work: 'Works best on something personally meaningful with flexibility and little rigid supervision; learns through imagination, story and personal connection to the material.',
    growth: [
      'Finish one imperfect thing fully before starting the next',
      'Treat a critique of the work as information, not a verdict on you',
      'Translate one ideal into a concrete step you can take this week',
    ],
  },

  INTJ: {
    nickname: 'The Long-Range Strategist',
    tagline: 'Designs the system, then builds toward it deliberately.',
    overview:
      'INTJ tendencies combine a private, future-oriented sense of how things will develop with a drive to organise the outer world efficiently toward that end. People with this pattern often work from an independent model of how something should function, and are willing to restructure what exists to get there.',
    strengths: [
      'Thinks several steps ahead and plans backwards from a long-range goal',
      'Independent judgement that does not need consensus to proceed',
      'Strips away what does not contribute to the objective',
      'Masters complex systems and holds them as a coherent whole',
    ],
    weaknesses: [
      'Can dismiss the human and emotional cost of an efficient plan',
      'Impatient with people who work at a different pace or need more explanation',
      'Overconfident in their own model and slow to credit competing views',
      'Reluctant to commit before the plan is fully formed',
    ],
    communication:
      'Concise, structured and blunt about substance — explains the conclusion more readily than the reasoning behind it.',
    decisions:
      'Builds a model of the whole situation, tests it against the long-term objective, and decides independently.',
    social:
      'Keeps a small, chosen circle, prefers substantive conversation, and treats most socialising as optional.',
    work: 'Works best with autonomy, competent colleagues and a genuinely difficult problem; learns fastest by building a framework and testing it.',
    growth: [
      'Ask how a plan will land on the people who must live with it',
      'Show your reasoning so others can follow and contribute',
      'Let a good plan start before it is perfect, and adjust in motion',
    ],
  },

  INTP: {
    nickname: 'The Theory Builder',
    tagline: 'Pulls ideas apart to find the principle underneath.',
    overview:
      'INTP tendencies pair precise private analysis with an imagination that keeps generating theoretical possibilities. People with this pattern are often driven by the pleasure of understanding something properly, and will happily revise a long-held position the moment the logic demands it.',
    strengths: [
      'Rigorous, precise thinking that exposes hidden assumptions',
      'Generates genuinely original theoretical connections across fields',
      'Intellectually honest — changes position when the argument requires it',
      'Comfortable with ambiguity and unanswered questions',
    ],
    weaknesses: [
      'Refines the analysis long past the point where action was needed',
      'Loses interest once a problem is solved in principle but not in practice',
      'Can correct small inaccuracies in ways that feel dismissive to others',
      'Neglects routine practical and administrative demands',
    ],
    communication:
      'Precise, qualified and exploratory — defines terms carefully and may seem to argue when they are simply testing an idea.',
    decisions:
      'Keeps options open while examining the logical structure, which can delay a decision that was already adequately supported.',
    social:
      'Enjoys a few people who like ideas, finds obligatory socialising tiring, and is private about feelings.',
    work: 'Works best with intellectual freedom, few meetings and hard conceptual problems; learns by questioning the framework rather than memorising it.',
    growth: [
      'Set a deadline for the analysis and act on the best current answer',
      'Finish the unglamorous last ten percent of one project',
      'Ask whether a correction is useful here before making it',
    ],
  },

  ESTP: {
    nickname: 'The Quick Responder',
    tagline: 'Reads the room, reads the risk, and moves.',
    overview:
      'ESTP tendencies combine sharp real-time awareness of what is actually happening with quick practical analysis. People with this pattern tend to be at their best when a situation is live and unscripted, and often resolve things while others are still planning.',
    strengths: [
      'Exceptional situational awareness and fast, practical response',
      'Negotiates and improvises well under real pressure',
      'Energises a group and gets a stalled thing moving',
      'Pragmatic — focuses on what will actually work right now',
    ],
    weaknesses: [
      'May act before the longer-term consequences have been considered',
      'Bored by routine maintenance and follow-through',
      'Can be blunt in a way that lands harder than intended',
      'Underestimates risk because past improvisation has worked',
    ],
    communication:
      'Direct, vivid and informal — gets to the point quickly and is comfortable with open disagreement.',
    decisions:
      'Reads the concrete situation and acts quickly, trusting that course can be corrected on the move.',
    social:
      'Sociable and easy with new people, enjoys activity-based company, and prefers doing to discussing.',
    work: 'Works best with variety, visible results and freedom from rigid process; learns by hands-on practice and immediate feedback.',
    growth: [
      'Before acting, name one consequence that would appear a month from now',
      'Build one dull routine you maintain regardless of interest',
      'Check how your directness landed, rather than assuming it was fine',
    ],
  },

  ESTJ: {
    nickname: 'The Practical Organiser',
    tagline: 'Sets the standard, assigns the work, delivers the result.',
    overview:
      'ESTJ tendencies combine a drive to organise the outer world efficiently with a detailed respect for what has been proven to work. People with this pattern often step naturally into coordinating roles and are relied on to turn an intention into a finished, measurable outcome.',
    strengths: [
      'Turns vague intentions into clear plans, roles and deadlines',
      'Decisive and willing to take responsibility for the call',
      'Consistent and fair in applying standards to everyone',
      'Delivers reliably on logistics and operations others find tedious',
    ],
    weaknesses: [
      'Can decide quickly enough to miss a better option still being formed',
      'May value procedure over a legitimate exception',
      'Sometimes overlooks how a decision feels to the people carrying it out',
      'Impatient with ambiguity and with ideas that are not yet practical',
    ],
    communication:
      'Clear, directive and specific — states expectations plainly and expects the same in return.',
    decisions:
      'Applies established criteria and proven precedent, then decides promptly and moves to implementation.',
    social:
      'Comfortably social and community-minded, often organising the gathering rather than merely attending it.',
    work: 'Works best with clear authority, measurable objectives and orderly process; learns best from structured, practically applicable material.',
    growth: [
      'Ask one more question before closing a decision',
      'Treat an exception as information about the rule, not a threat to it',
      'Ask how a change feels to the people implementing it',
    ],
  },

  ESFP: {
    nickname: 'The Lively Improviser',
    tagline: 'Brings people into the moment and makes it enjoyable.',
    overview:
      'ESFP tendencies pair vivid engagement with what is happening now with warm, personal values. People with this pattern often lift the mood of a room naturally, notice who is being left out, and prefer experiencing something together to talking about it in the abstract.',
    strengths: [
      'Creates warmth and enjoyment that makes groups work better',
      'Highly observant of how people are actually doing right now',
      'Practical and resourceful when something needs sorting immediately',
      'Adapts easily and recovers quickly from setbacks',
    ],
    weaknesses: [
      'Avoids or defers difficult conversations and long-term planning',
      'Can be pulled off track by whatever is most immediately engaging',
      'Takes criticism personally, especially from people they like',
      'May overcommit socially and leave less visible work unfinished',
    ],
    communication:
      'Warm, expressive and story-led — reads the emotional temperature of a room quickly and responds to it.',
    decisions:
      'Goes with what feels right for the people involved in the present situation, sometimes at the expense of longer-range consequences.',
    social:
      'Genuinely enjoys people and new company, and gives generous attention to whoever is in front of them.',
    work: 'Works best in people-facing, varied, hands-on roles with immediate results; learns through doing, discussion and real examples.',
    growth: [
      'Have the awkward conversation this week rather than next',
      'Put one future commitment in writing and protect the time for it',
      'Hear criticism of the work as separate from affection for you',
    ],
  },

  ESFJ: {
    nickname: 'The Attentive Host',
    tagline: 'Looks after the people and the practical details at the same time.',
    overview:
      'ESFJ tendencies combine an outward focus on others’ needs and group harmony with a detailed, practical memory. People with this pattern often become the organising centre of a family, team or community, and take real responsibility for making sure nobody is overlooked.',
    strengths: [
      'Builds warmth, cohesion and a sense of belonging in a group',
      'Reliable with the practical details that keep people supported',
      'Reads and responds to social dynamics quickly and tactfully',
      'Follows through dependably on commitments to others',
    ],
    weaknesses: [
      'Takes disagreement personally and may smooth it over too early',
      'Depends on others’ approval more than is comfortable to admit',
      'Can assume their way of helping is the help that is wanted',
      'Neglects their own needs while attending to everyone else’s',
    ],
    communication:
      'Warm, encouraging and tactful — attends closely to tone and tends to soften the difficult parts.',
    decisions:
      'Weighs the effect on people and on group harmony, guided strongly by established values and precedent.',
    social:
      'Genuinely enjoys being among people, maintains relationships actively, and often does the work of keeping a group together.',
    work: 'Works best in cooperative, structured, people-centred roles with clear expectations and appreciation; learns well in organised, sociable settings.',
    growth: [
      'Let a disagreement stay open long enough to be resolved properly',
      'Ask what help someone wants instead of providing what you would want',
      'Schedule something purely for yourself and keep it',
    ],
  },

  ENFP: {
    nickname: 'The Possibility Spark',
    tagline: 'Sees what a person or an idea could become, and lights it up.',
    overview:
      'ENFP tendencies pair an outward-reaching imagination with warm personal values. People with this pattern often generate possibilities quickly, connect people and ideas that had no obvious link, and care most about work that stays true to what they believe.',
    strengths: [
      'Generates original ideas and possibilities rapidly',
      'Enthusiasm that genuinely mobilises other people',
      'Sees and draws out potential in individuals',
      'Connects ideas, fields and people across boundaries',
    ],
    weaknesses: [
      'Starts far more than is ever finished',
      'Loses energy for a project once the exciting beginning is over',
      'Finds detail, routine and admin genuinely difficult to sustain',
      'Can overcommit from enthusiasm and then feel trapped',
    ],
    communication:
      'Animated, warm and tangential — thinks out loud, follows interesting side paths, and makes people feel seen.',
    decisions:
      'Explores widely and checks options against personal values, which can leave a decision open longer than is useful.',
    social:
      'Makes friends easily across very different groups, and needs some solitude to recover from constant engagement.',
    work: 'Works best with variety, autonomy, people contact and a cause that matters; learns through exploration, conversation and connection-making.',
    growth: [
      'Choose one project and carry it through the boring middle',
      'Set up external structure for the admin you will not do unaided',
      'Pause before agreeing, and check the commitment against your current load',
    ],
  },

  ENFJ: {
    nickname: 'The People Developer',
    tagline: 'Sees who someone could become, and helps them get there.',
    overview:
      'ENFJ tendencies combine an outward focus on people with a forward-looking read on where things are heading. People with this pattern often take real responsibility for others’ growth, and are able to articulate a shared purpose in a way that moves a group toward it.',
    strengths: [
      'Articulates a shared vision that genuinely motivates people',
      'Perceptive mentor who develops others deliberately',
      'Builds cooperation and resolves friction between people',
      'Organises collective effort toward a meaningful goal',
    ],
    weaknesses: [
      'Takes on responsibility for others’ problems past the point of usefulness',
      'Can over-manage people’s growth rather than let them find their own way',
      'Avoids conflict that threatens group harmony until it is overdue',
      'Neglects their own needs and hides their own struggles',
    ],
    communication:
      'Warm, articulate and persuasive — speaks to what matters to the listener and is skilled at encouragement.',
    decisions:
      'Weighs the human consequences against a longer-term sense of purpose, and prefers decisions the group can own.',
    social:
      'Energised by people and deeply invested in relationships, though needing quiet time more than others realise.',
    work: 'Works best in collaborative, purpose-driven roles with scope to develop people; learns well through discussion and teaching others.',
    growth: [
      'Let someone solve their own problem without stepping in',
      'Name a conflict early rather than preserving surface harmony',
      'Tell someone close what you are actually struggling with',
    ],
  },

  ENTP: {
    nickname: 'The Idea Challenger',
    tagline: 'Turns an assumption over to see what it looks like from the other side.',
    overview:
      'ENTP tendencies pair outward-reaching idea generation with precise private analysis. People with this pattern enjoy testing a position by arguing with it, reframe problems in unexpected ways, and are often the person who spots the option nobody had considered.',
    strengths: [
      'Reframes problems so that new options become visible',
      'Quick, flexible thinking in debate and live problem-solving',
      'Challenges assumptions that everyone else had accepted',
      'Generates and prototypes ideas rapidly',
    ],
    weaknesses: [
      'Argues a point past the moment it stopped being useful',
      'Leaves the implementation to someone else once it is interesting no longer',
      'Can be careless about the effect a challenge has on the person receiving it',
      'Resists routine, structure and follow-through',
    ],
    communication:
      'Quick, playful and provocative — enjoys debate for its own sake and may argue a position they do not actually hold.',
    decisions:
      'Generates alternatives and stress-tests them logically, sometimes reopening a decision that was already sound.',
    social:
      'Sociable and widely connected, drawn to people who will argue back, and easily bored by repetition.',
    work: 'Works best with novelty, intellectual challenge and minimal bureaucracy; learns by questioning, debating and building quick prototypes.',
    growth: [
      'Ask whether a debate is serving the problem or only your interest in it',
      'Carry one idea all the way into delivery',
      'Check how a challenge landed on the person, not just whether it was correct',
    ],
  },

  ENTJ: {
    nickname: 'The Driving Strategist',
    tagline: 'Sets the objective, builds the structure, and drives it to completion.',
    overview:
      'ENTJ tendencies combine a drive to organise the outer world efficiently with a long-range read on where things are going. People with this pattern tend to take charge when direction is missing, and are willing to make unpopular calls in service of a goal they believe in.',
    strengths: [
      'Sets clear direction and mobilises people and resources behind it',
      'Decisive under uncertainty and accountable for the outcome',
      'Thinks strategically about long-range consequences and structure',
      'Confronts problems directly rather than letting them persist',
    ],
    weaknesses: [
      'Can steamroll quieter input and mistake compliance for agreement',
      'Impatient with process, emotion and people who need longer',
      'May treat an unfinished idea as a position to be defeated',
      'Overloads themselves and others in pursuit of the objective',
    ],
    communication:
      'Forceful, structured and candid — argues directly, expects to be challenged back, and dislikes vagueness.',
    decisions:
      'Decides quickly against clear objective criteria and long-term strategy, sometimes before slower evidence has arrived.',
    social:
      'Comfortable leading and networking, values competence in company, and keeps closeness for a small circle.',
    work: 'Works best with authority, ambitious goals and competent colleagues; learns rapidly through challenge, debate and real stakes.',
    growth: [
      'Ask the quietest person in the room before you close the discussion',
      'Distinguish someone needing time from someone resisting you',
      'Define what "enough" looks like, for yourself and for your team',
    ],
  },
};
