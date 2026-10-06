import { getCard, type MajorArcana } from './tarot'

export interface LifePathResult {
  /** Single digit, or a master number (11 / 22 / 33) */
  number: number
  /** True when the number is a master number and was not reduced further */
  isMaster: boolean
  /** The birth day reduced to a single digit (master numbers preserved) */
  birthdayNumber: number
  birthdayIsMaster: boolean
}

export interface NumberProfile {
  number: number
  title: string
  meaning: string
  strengths: string[]
  challenges: string[]
  card: MajorArcana | null
  /** Results-voice, surface-level sketch shown on the main page; the library keeps the deep layers */
  surface: string
  /** Deeper layer: how this number tends to live out over a lifetime */
  detail: string
  /** Practical guidance for this number */
  advice: string
  /** The expected energy this number brings into any chart position it appears in */
  energy: string
  /** Master numbers only: why this number appears and what its higher voltage demands */
  masterNote?: string
}

export const NUMBER_PROFILES: Record<
  number,
  Omit<NumberProfile, 'number' | 'card' | 'energy' | 'masterNote'>
> = {
  1: {
    title: 'The Leader',
    meaning:
      'Ones are pioneers. Independent, driven and original, you are here to learn self-reliance and to lead by example. Your path is about initiating — ideas, projects, movements — and trusting your own vision even when no one else sees it yet.',
    surface:
      'You are built to go first. Waiting for permission, consensus or perfect conditions costs you more than failure ever does — when you trust your own vision, things start moving, for you and usually for everyone behind you. The growth edge: letting others walk with you, and finishing what your fire starts.',
    strengths: ['Independence', 'Initiative', 'Originality', 'Courage'],
    challenges: ['Stubbornness', 'Impatience', 'Loneliness'],
    detail:
      'The 1 is the number of the seed — everything in existence began as a one that refused to stay a zero. In practice, ones build lives that look self-invented: they are rarely satisfied inheriting someone else’s map, and they tend to become the first person in their family or circle to do a thing. Their core lesson is initiation without isolation — learning that leading means going first, not going alone. Under pressure they default to “I’ll do it myself”, which is both their superpower and their slowest trap.',
    advice:
      'Choose projects where being first matters more than being safe. Practise finishing before starting — the 1’s growth edge is completion, not ignition. And when the loneliness of the front arrives, remember it is the tuition of leadership, not proof of failure.',
  },
  2: {
    title: 'The Diplomat',
    meaning:
      'Twos are the weavers of connection. Sensitive, intuitive and cooperative, your path is about partnership, patience and the quiet power of harmony. You succeed not by forcing outcomes but by reading the undercurrents and bringing people together.',
    surface:
      'You read people the way others read headlines — quickly, and mostly accurately. Harmony is your habitat; you mend rooms, translate between warring sides and sense tension before it speaks. Your gift is making cooperation feel like music. The growth edge: saying the disagreeable thing out loud, early.',
    strengths: ['Diplomacy', 'Intuition', 'Cooperation', 'Sensitivity'],
    challenges: ['Over-dependence', 'Conflict avoidance', 'Self-doubt'],
    detail:
      'The 2 is the number of the mirror — it learns what it is by reflecting. Twos are the emotional antennas of any group: they register tension before it is spoken and often carry the unspoken mood of a room without realising it. Their path runs through partnership of every kind — romantic, professional, creative — because it is in the space between self and other that they come into focus. Their great work is learning that harmony maintained by self-erasure is not harmony; it is a postponed conflict with interest.',
    advice:
      'Name your needs early and plainly — the people worth keeping will adjust. Treat sensitivity as an instrument that needs calibration, not a flaw needing apology. And practise one disagreement a month, spoken out loud: the 2’s peace is only real after it survives a little friction.',
  },
  3: {
    title: 'The Creator',
    meaning:
      'Threes are born to express. Joyful, artistic and socially magnetic, your path runs through creativity, communication and inspiration. Your gift is turning feeling into form — words, art, laughter — and reminding others that life is meant to be enjoyed.',
    surface:
      'You turn feeling into form — the joke that saves the meeting, the story that carries the truth, the thing you make that people did not know they needed. Expression is not your hobby; it is your maintenance. The growth edge: choosing one masterpiece over ten beginnings.',
    strengths: ['Creativity', 'Expression', 'Optimism', 'Charm'],
    challenges: ['Scattered energy', 'Superficiality', 'Emotional highs and lows'],
    detail:
      'The 3 is the number of the first complete story — beginning, middle, end — and it lives through narrative: the joke told perfectly, the room lifted, the feeling given a shape others can hold. Threes learn by speaking; even their thinking is audible. Their charm is not decoration but function — people forgive them, follow them and fund them because they make the air lighter. Their shadow pattern is dispersion: a dozen brilliant openings, few closings, and a deep private fear that underneath the sparkle there is no “there” there.',
    advice:
      'Give one creative project a deadline and a witness — the 3 finishes best in company. Write or speak daily; expression is your maintenance, not your hobby. And when the low after the high arrives, do not panic: your tide is real but so is your shore.',
  },
  4: {
    title: 'The Builder',
    meaning:
      'Fours are the architects of the material world. Practical, disciplined and fiercely loyal, your path is about creating structures that last — careers, families, institutions. You turn dreams into foundations, and your word is your bond.',
    surface:
      'You build what lasts. Systems, schedules, savings, structures — the floor everyone else dances on tends to have your fingerprints on it. People trust your word because it has never once been casual. The growth edge: letting the plan bend without calling it failure.',
    strengths: ['Discipline', 'Reliability', 'Practicality', 'Loyalty'],
    challenges: ['Rigidity', 'Workaholism', 'Resistance to change'],
    detail:
      'The 4 is the square — the first shape that holds weight. Fours build the floors everyone else dances on: the systems, the schedules, the savings, the structures that make civilised life possible. They are at their best with a tangible problem and a fair timeframe, and at their worst when asked to improvise on demand or trust what cannot be measured. Their loyalty is legendary and their stubbornness is loyalty’s invoice. The mature 4 learns that a structure exists to serve life, and never the reverse.',
    advice:
      'Build sabbaticals and softness into your structures on purpose — schedule them like meetings. Practise one unplanned hour a week; flexibility is a muscle the 4 must train before life forces it. And remember: the most admired building you will ever raise is a life whose inhabitants — including you — are happy inside it.',
  },
  5: {
    title: 'The Freedom Seeker',
    meaning:
      'Fives are the travellers of the number line. Adventurous, adaptable and endlessly curious, your path is about freedom, experience and versatility. Routine is your enemy; growth lives at the edge of your comfort zone, and change is your true home.',
    surface:
      'You are the favourite child of change. Drop you anywhere — new city, new job, new crisis — and you land talking, adapting, collecting the experience like a souvenir. Freedom is your oxygen. The growth edge: one anchor, chosen freely, that you do not lift the moment it gets heavy.',
    strengths: ['Adaptability', 'Curiosity', 'Versatility', 'Persuasion'],
    challenges: ['Restlessness', 'Indulgence', 'Lack of follow-through'],
    detail:
      'The 5 is the number at the exact centre of 1 to 9 — the pivot, the hinge, the perpetual motion of the system. Fives collect experiences the way others collect possessions: jobs, cities, skills, stories. Their adaptability is genuine magic — drop them anywhere and they land talking — but it comes with a tax: the unfinished, the uncommitted, the thousand doors opened. Their deepest lesson is that freedom is not the absence of anchors; it is the art of choosing anchors you can also lift.',
    advice:
      'Commit to one long game — five years minimum — and let it anchor your wandering. Build finishing into your freedom: every new thing started retires an old thing. And when restlessness whispers that the grass is elsewhere, check first whether you have watered this grass at all.',
  },
  6: {
    title: 'The Nurturer',
    meaning:
      'Sixes carry the heart of the community. Responsible, compassionate and beauty-loving, your path is about service, family and healing. You are the person others lean on — and your lesson is to give without losing yourself.',
    surface:
      'You are the person everyone calls. Birthdays remembered, feuds mediated, broken things quietly fixed — your love is active and practical, and your people know it. The growth edge: letting someone carry you once in a while, and learning that receiving is not debt.',
    strengths: ['Compassion', 'Responsibility', 'Healing', 'Aesthetic sense'],
    challenges: ['Perfectionism', 'Self-sacrifice', 'Taking on too much'],
    detail:
      'The 6 is the first of the “responsible” numbers — the parent of the numerology family. Sixes are the ones who remember birthdays, mediate feuds, fix the broken thing no one else noticed and apologise for weather they did not make. Their love is active and practical: meals, repairs, presence. The shadow is equally practical — self-erasure in the name of duty, perfectionism aimed at the self while mercy is given freely to everyone else, and the slow resentment of the person who never asked for help.',
    advice:
      'Put your own oxygen mask on first, literally and on calendars — self-care is maintenance of the service, not betrayal of it. Let one person help you every week; receiving is the 6’s unfinished education. And replace perfect with done-for-love: the people you serve would choose your presence over your polish every single time.',
  },
  7: {
    title: 'The Seeker',
    meaning:
      'Sevens walk the inner road. Analytical, spiritual and deeply private, your path is about knowledge, reflection and the search for truth. You need solitude the way others need company, and your insight comes from asking the questions most people skip.',
    surface:
      'You ask the questions other people skip. Depth over chatter, evidence over noise, solitude over small talk — you would rather master one true thing than sample ten loud ones. Your insight is sharp and slow-cooked. The growth edge: deciding at eighty percent certainty and rejoining the world sooner.',
    strengths: ['Analytical mind', 'Spirituality', 'Depth', 'Perception'],
    challenges: ['Isolation', 'Skepticism', 'Overthinking'],
    detail:
      'The 7 is the number of the quest — every myth’s seeker, the one who leaves the village to find what cannot be bought there. Sevens are the specialists of the numbers: they would rather master one true thing than sample ten. Their minds run on evidence and their souls run on mystery, and the tension between the two is their engine. They process privately, decide slowly and are almost never wrong twice. Their trap is the ivory tower: analysis that delays life, solitude that forgets it was chosen.',
    advice:
      'Set decision deadlines — the 7 who decides at 80% certainty beats the one waiting for 100%. Share your thinking out loud with one trusted person; your insight completes itself in dialogue. And leave the tower regularly: truth you cannot live among people is not yet finished truth.',
  },
  8: {
    title: 'The Powerhouse',
    meaning:
      'Eights are built for the material world. Ambitious, efficient and commanding, your path is about mastery of power — money, authority, influence — and learning to wield it with integrity. Big vision plus big follow-through defines you.',
    surface:
      'You are built for scale. Big vision, bigger follow-through — you see systems whole and move resources without flinching, and you recover from blows that would retire others. Power is your instrument; integrity is how you tune it. The growth edge: the invisible ledgers — health, friendship, meaning — where ambition cannot measure what matters.',
    strengths: ['Ambition', 'Organisation', 'Resilience', 'Executive ability'],
    challenges: ['Control issues', 'Materialism', 'Work-life imbalance'],
    detail:
      'The 8 is the number of infinity stood upright — power flowing between the material and the spiritual, wealth and wisdom trading places. Eights are the natural executives: they see systems whole, move resources without flinching and recover from blows that would retire others. Their relationship with money and authority is the curriculum — not because these are evil, but because the 8 amplifies whatever it touches, including themselves. The mature 8 learns that the point of power is what it can carry for others.',
    advice:
      'Audit your power yearly: what did it build, whom did it serve, what did it cost? Delegate one thing you love controlling — empire builders die of grip, not failure. And invest in the invisible ledgers — health, friendship, meaning — where the 8’s arithmetic cannot follow but the heart keeps perfect books.',
  },
  9: {
    title: 'The Humanitarian',
    meaning:
      'Nines are the old souls. Compassionate, wise and universal in outlook, your path is about completion, forgiveness and giving back. You feel the world’s pain as your own, and your calling is to turn that empathy into service.',
    surface:
      'You feel the world at full volume and answer it with compassion. Old beyond your years, allergic to petty tribalism, drawn to the big picture and the underdog — you end things well and give back as naturally as breathing. The growth edge: releasing what is finished, including your expectations of people.',
    strengths: ['Compassion', 'Wisdom', 'Artistic depth', 'Tolerance'],
    challenges: ['Martyrdom', 'Letting go', 'Disappointment in others'],
    detail:
      'The 9 is the last single digit — it contains the memory of all the others, which is why nines often feel older than their years. They are the artists of the heart and the advocates of the underdog, wired for the big picture and allergic to petty tribalism. Their lives run in completion cycles: they are the ones who end things well — the era, the family feud, the career chapter — and who must learn the hardest numerological lesson: releasing what is finished, including their own expectations of people.',
    advice:
      'Practise releasing one thing per season — an object, a grudge, a plan — as a spiritual exercise. Protect your empathy with boundaries: you cannot pour from a cup you have handed away. And let others be flawed at their own pace; the 9’s disappointment is usually just grief that the world is not finished yet.',
  },
  11: {
    title: 'The Illuminator (Master Number)',
    meaning:
      'Eleven is intuition raised to an art form. Highly sensitive and spiritually charged, you are here to inspire and to channel insight that seems to come from beyond you. Your path demands you ground your visions, or the voltage will burn you out.',
    surface:
      'You run at a higher voltage than most. Insight arrives in you uninvited, rooms light up when you enter, and people are inspired by you before you have said a word. Sensitivity is your instrument, not your flaw. The growth edge: grounding — body, routine, rest — so the current has somewhere honest to go.',
    strengths: ['Intuition', 'Inspiration', 'Charisma', 'Spiritual insight'],
    challenges: ['Nervous tension', 'Overwhelm', 'Living up to your own light'],
    detail:
      'The 11 is the 2 with the volume of the infinite turned up — a master number carrying 1’s initiative and 2’s sensitivity simultaneously, which is exactly as demanding as it sounds. Elevens are the conduits: they receive insight as if by antenna, light up rooms without effort and inspire by existing. The cost is physiological as much as spiritual — this number runs hot. Many 11s spend years living as a plain 2 (cooperative, quiet, safe) until the pressure of the unlived voltage forces the channel open. Their destiny is not to be special but to be truthful at a frequency most people can only visit.',
    advice:
      'Ground daily — body work, nature, routine — because the 11 without grounding is a struck bell with no frame. Treat sensitivity as the instrument it is: tuned, protected, rested. And stop waiting to feel ready for your own light; the dimming of an 11 helps no one, least of all you.',
  },
  22: {
    title: 'The Master Builder (Master Number)',
    meaning:
      'Twenty-two combines the vision of 11 with the practicality of 4 — the most powerful of all numbers. You are here to build things that outlast you: movements, institutions, legacies. Your challenge is believing your own blueprint is worth building.',
    surface:
      'You are the dreamer who can pour concrete. Vision at the scale of legacy, plus the practicality to actually build it — you are not here for small plans, even when you pretend otherwise. The growth edge: starting the cathedral before you feel like a cathedral-builder; your competence arrives through the building.',
    strengths: ['Vision', 'Practical genius', 'Manifestation', 'Leadership'],
    challenges: ['Grandiosity', 'Pressure', 'Fear of your own scale'],
    detail:
      'The 22 is the architect of the impossible — the dreamer who can also pour concrete. Where 11 receives vision, 22 is expected to give it foundations, walls and a working door. Many 22s spend long stretches living as a 4 (safe, practical, small) because the full scale of the number frightens even them. Their lives tend to contain at least one enormous build — a company, a body of work, a community — whose true size they only admit afterwards. The number’s curse and gift are the same: it cannot sincerely think small.',
    advice:
      'Start the big thing before you feel big enough — the 22’s competence arrives through the building, not before it. Break the cathedral into weekly bricks; your genius is patience applied to scale. And beware the seduction of planning forever: your number is graded on what stands, not on what was sketched.',
  },
  33: {
    title: 'The Master Teacher (Master Number)',
    meaning:
      'Thirty-three is unconditional love made active. Rarer than rare, this path is about selfless service, healing and raising the consciousness of those around you — often by simply embodying compassion so fully that others remember their own.',
    surface:
      'You teach by being. Unconditional love, active and unglamorous — your presence lowers the temperature of a crisis and reminds people what they are capable of. Service is your nature. The growth edge: including yourself in the circle of people you care for. The temple needs walls, and you are the temple.',
    strengths: ['Selfless love', 'Healing', 'Teaching by example', 'Devotion'],
    challenges: ['Self-neglect', 'Emotional overload', 'Setting boundaries'],
    detail:
      'The 33 is the 6 raised to the master octave — nurturing without limit, healing without invoice. Where other numbers teach through words or works, the 33 teaches through being: their presence lowers the temperature of a crisis and raises the honesty of a room. The danger is equally total: a number built on selfless service can quietly delete the self. The 33 who never learns boundaries becomes the martyr whose light is spent on everyone except its source.',
    advice:
      'Your boundaries are the walls of the temple — without them there is no temple, only weather. Serve from overflow, never from debt; rest is part of the service. And remember that your most powerful teaching is a life that visibly includes you in its own circle of care.',
  },
}

/** Tarot correspondence for a life path / birthday number (Rider–Waite majors) */
const LIFE_PATH_CARD: Record<number, number> = {
  1: 1, // The Magician
  2: 2, // The High Priestess
  3: 3, // The Empress
  4: 4, // The Emperor
  5: 5, // The Hierophant
  6: 6, // The Lovers
  7: 7, // The Chariot
  8: 8, // Strength
  9: 9, // The Hermit
  11: 11, // Justice
  22: 0, // The Fool
  33: 21, // The World
}

function digitSum(n: number): number {
  return String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0)
}

function reduceToSingle(n: number, keepMasters = true): { value: number; isMaster: boolean } {
  let value = n
  while (value > 9) {
    if (keepMasters && (value === 11 || value === 22 || value === 33)) {
      return { value, isMaster: true }
    }
    value = digitSum(value)
  }
  return { value, isMaster: false }
}

/**
 * Life Path number: sum every digit of the full birth date,
 * reduce to a single digit while preserving master numbers 11, 22, 33.
 */
export function computeLifePath(dateStr: string): LifePathResult | null {
  const digits = dateStr.replace(/\D/g, '')
  if (digits.length < 8) return null

  const total = digits.split('').reduce((acc, d) => acc + Number(d), 0)
  const lp = reduceToSingle(total)

  const day = Number(digits.replace(/^(\d{4})(\d{2})(\d{2}).*$/, '$3'))
  const bd = reduceToSingle(day || total)

  return {
    number: lp.value,
    isMaster: lp.isMaster,
    birthdayNumber: bd.value,
    birthdayIsMaster: bd.isMaster,
  }
}

export function getNumberProfile(n: number): NumberProfile {
  const base = NUMBER_PROFILES[n] ?? NUMBER_PROFILES[reduceToSingle(n, false).value]
  const cardNum = LIFE_PATH_CARD[n] ?? null
  return {
    number: n,
    ...base,
    card: cardNum !== null ? getCard(cardNum) : null,
    energy: NUMBER_ENERGIES[n] ?? NUMBER_ENERGIES[reduceToSingle(n, false).value] ?? '',
    masterNote: MASTER_NOTES[n],
  }
}

/** Friendly string for the reduction, e.g. "3 + 4 + 1 + 9 + 9 + 5 = 31 → 4" */
export function lifePathWorkings(dateStr: string): string {
  const digits = dateStr.replace(/\D/g, '')
  if (digits.length < 8) return ''
  const parts = digits.split('').join(' + ')
  const total = digits.split('').reduce((acc, d) => acc + Number(d), 0)
  const lp = reduceToSingle(total)
  return `${parts} = ${total} → ${lp.value}`
}

/**
 * The expected energy each number carries into ANY chart position it lands in —
 * life path, expression, soul urge, personality, birthday, attitude, maturity or
 * balance. This is the “what it brings” layer that applies everywhere the number
 * appears, on top of the position-specific meanings.
 */
export const NUMBER_ENERGIES: Record<number, string> = {
  1: 'The 1 brings the energy of beginnings. Wherever it lands, that area of life demands initiative, self-reliance and the courage to go first. It adds drive, originality and an allergy to coasting — and it always asks the same question: who is leading here?',
  2: 'The 2 carries the energy of union. Wherever it appears, life routes that area through partnership, patience and emotional intelligence. It senses undercurrents before they surface, softens conflict, and quietly asks: can two be stronger than one here?',
  3: 'The 3 radiates the energy of expression. Wherever it lands, that area of life wants to be spoken, painted, performed or celebrated. It brings charm, creativity and emotional weather — and it asks: why keep this beauty inside?',
  4: 'The 4 grounds everything it touches with the energy of structure. Wherever it appears, that area of life demands foundations, schedules and kept promises. It brings discipline and staying power — and asks: what are we building that will still stand in ten years?',
  5: 'The 5 brings the energy of movement. Wherever it lands, that area of life resists cages and rewards range — travel, variety, reinvention. It brings magnetism and appetite for experience — and asks: when did you last let this part of your life breathe?',
  6: 'The 6 carries the energy of care. Wherever it appears, that area of life turns toward responsibility, beauty and the wellbeing of others. It brings devotion and an eye for what is broken — and asks: who is looking after the caretaker?',
  7: 'The 7 holds the energy of depth. Wherever it lands, that area of life wants to be understood, not just experienced. It brings analysis, intuition and a taste for solitude — and asks: what is underneath this?',
  8: 'The 8 carries the energy of power and manifestation. Wherever it appears, that area of life operates at scale — money, authority, ambition, consequence. It brings executive force — and asks: what are you doing with the leverage you have?',
  9: 'The 9 brings the energy of completion and compassion. Wherever it lands, that area of life is about endings done well, forgiveness, and the bigger picture. It brings wisdom and an old-soul patience — and asks: what is ready to be released here?',
  11: 'The 11 amplifies the 2’s energy to master voltage: intuition, inspiration and spiritual insight wherever it lands. It brings charisma and a signal-like sensitivity to the unseen — and asks: are you grounding the antenna, or just absorbing static?',
  22: 'The 22 amplifies the 4’s energy to master voltage: the ability to turn grand vision into standing reality. Wherever it lands, that area of life thinks in legacy-sized units — and asks: is this big enough to be worth your one build?',
  33: 'The 33 amplifies the 6’s energy to master voltage: unconditional love in active service. Wherever it lands, that area of life heals simply by being near it — and asks: does your care include its source?',
}

/**
 * Why master numbers appear at all: when the digits of a date or name refuse to
 * reduce past 11, 22 or 33, the math itself flags a higher voltage that is kept
 * whole on purpose. These notes explain what each master number is and why it
 * shows up in a chart.
 */
export const MASTER_NOTES: Record<number, string> = {
  11: 'Master numbers appear when the arithmetic of your chart refuses to finish reducing — the digits land on 11, 22 or 33 and tradition says: stop, this one is different. The 11 is the 2’s sensitivity raised to an octave of inspiration. It shows up in charts that are wired to channel insight, not merely process it — which is why it brings nervous tension and overwhelm along with the charisma. It stays unreduced because its lessons cannot be learned at the gentler 2-frequency: living as an antenna requires grounding, rest and the nerve to stop dimming your own light.',
  22: 'The 22 is the rarest of the working numbers: the 11’s vision fused with the 4’s hands. It appears when a chart must learn to build at the scale of the impossible — movements, institutions, legacies. Many 22s spend years living as a safe, practical 4 because the full voltage frightens even them; the number keeps reappearing until they attempt the cathedral. It stays unreduced because its test is scale itself: this number is graded on what stands, not on what was sketched.',
  33: 'The 33 is the rarest master of all — the 6’s nurturing raised to pure, active devotion. It appears in charts oriented toward healing, teaching and selfless service, often without the person ever choosing it: rooms calm down around a 33. It stays unreduced because its lesson is the hardest in numerology: compassion without self-erasure. The 33’s entire curriculum is boundaries — learning that a light which never rests eventually helps no one.',
}
