import { getCard, type MajorArcana } from './tarot'

/**
 * Life Constellation — one birth date read as a sky of connected arcana,
 * going beyond the classic "two cards" of the birth card pair.
 *
 * Two traditions are blended here, both derived from the birth date alone:
 * - Tarot Constellations (Angeles Arrien / Mary K. Greer): a birth date
 *   vibrates to a root number, and every card reducing to that root belongs
 *   to the same constellation — the Majors are read together with their
 *   minor-arcana echoes as one family of lessons.
 * - The Destiny Matrix (Natalia Ladini, 2006): day, month and year are
 *   reduced into the 1–22 range of the Major Arcana and combined into a
 *   central "core" energy plus love, money and talent channels — the
 *   transparent reduction formulas popularised by modern matrix calculators.
 */

function digitSum(n: number): number {
  return String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0)
}

/** Arcana reduction: keep summing digits until the value lands in 1–22. */
export function arcanaReduce(n: number): number {
  let v = Math.abs(Math.trunc(n))
  while (v > 22) v = digitSum(v)
  return v
}

/**
 * Root vibration of a card (Arrien constellation): the card number reduced
 * to a single digit. The Fool (0) vibrates to 22 → 4. Every Major sharing
 * the same root belongs to one constellation — VII The Chariot and
 * XVI The Tower both answer to 7.
 */
export function cardRoot(num: number): number {
  let v = num === 0 ? 22 : num
  while (v > 9) v = digitSum(v)
  return v
}

/** All Majors belonging to the same root-number constellation. */
export function constellationPeers(num: number): MajorArcana[] {
  const root = cardRoot(num)
  return Array.from({ length: 22 }, (_, i) => i)
    .map((n) => getCard(n))
    .filter((c) => cardRoot(c.num) === root)
    .sort((a, b) => a.num - b.num)
}

export type LoveShade = 'devotion' | 'steady' | 'storm'

export interface DomainNotes {
  /** How this energy loves, partners and marries — gift and trouble */
  love: string
  /** How this energy earns, works and handles money */
  work: string
  /**
   * devotion — naturally supportive in partnership;
   * steady — builds lasting bonds when its lesson is respected;
   * storm — intense; magnetises and tests relationships at once.
   */
  shade: LoveShade
}

/** Per-card domain notes: how each Major behaves in love and in work. */
export const CARD_DOMAINS: Record<number, DomainNotes> = {
  0: {
    love: 'Loves the way it lives — openly, entirely, today. The Fool is wonderful while the relationship feels like a road; the trouble starts when commitment is asked to be a house. Partners must give this heart room to wander, or watch it wander anyway.',
    work: 'Thrives at beginnings: launches, pivots, cold starts, the first terrifying draft. Long maintenance bores it — pair every Fool with a builder who enjoys the middle miles.',
    shade: 'steady',
  },
  1: {
    love: 'Courts deliberately and charms completely — The Magician notices everything and says exactly the right thing. The trouble is that intimacy wants the person, not the performance: let yourself be ordinary inside the relationship or the magic curdles into manipulation.',
    work: 'Earns by skill and will: sales, craft, strategy, anything where tools plus focus equal results. Money follows competence here — scattered across ten talents, it follows nothing.',
    shade: 'steady',
  },
  2: {
    love: 'The quiet keeper — The High Priestess loves in subtext: remembered preferences, wordless understanding, loyalty that never makes a noise. Partners sometimes mistake the silence for distance. The trouble is the unspoken need; the gift is being known without explaining.',
    work: 'Excels where judgement and discretion matter: research, counsel, medicine, anything requiring reading what is not said. Trusts intuition over spreadsheets — and is usually right, but should still check the numbers.',
    shade: 'devotion',
  },
  3: {
    love: 'The great nurturer of the deck — love with The Empress is fed, warmed, beautified and celebrated. Classic marriage material: homes flourish under this hand. The trouble is the smother — care that becomes control, or a partner kept as one more project to perfect.',
    work: 'Money grows where this energy can create and tend: design, hospitality, food, beauty, anything alive that gets better with care. Undervalues its own gifts — charge for the garden, not just the harvest.',
    shade: 'devotion',
  },
  4: {
    love: 'Loves by building: the roof, the plan, the retirement account, the family that never wonders where it stands. A devoted provider and protector. The trouble is the throne — rules kept past their reason, control mistaken for safety, affection scheduled between duties.',
    work: 'Built for structure: management, engineering, finance, operations, anything with load-bearing walls. Climbs steadily and pays its debts. Must learn that improvisation is a tool, not a threat.',
    shade: 'steady',
  },
  5: {
    love: 'The Hierophant is the marriage card itself — vows, tradition, shared belief, the union both families bless. Committed love is this card at its best. The trouble is dogma: staying inside a form whose spirit died, or forcing a partner to kneel at traditions that never asked their opinion.',
    work: 'Thrives in institutions with lineage: teaching, law, faith organisations, established firms, mentoring roles. Rises through reputation and transmission — and does well to question one rule per year.',
    shade: 'devotion',
  },
  6: {
    love: 'The Lovers is love as a life path — union that becomes the mirror in which the self is finally seen. Deeply romantic, genuinely growthful marriage material. The trouble is the choice: this card also marks the fork — love kept for comfort, or values abandoned to keep the peace.',
    work: 'Flourishes in partnership: co-founders, duets, client relationships, negotiation, matchmaking of any kind. Chooses best when choosing from stated values rather than the mood of the moment.',
    shade: 'devotion',
  },
  7: {
    love: 'Loves like a campaign — purposeful, protective, all-in once the direction is chosen. The Chariot will fight for a marriage and drive it through any storm. The trouble is the scoreboard: winning the argument instead of the relationship, steering a partner like one of the sphinxes.',
    work: 'Wins by vector, not talent: sets a direction and out-endures the field. Built for ambition, competition, logistics, sport. Should occasionally ask whether the destination still deserves the horses.',
    shade: 'steady',
  },
  8: {
    love: 'The great gentle power — Strength loves patiently, forgives loudly, and defuses conflict by refusing to flinch. One of the finest long-marriage cards: passion tamed into loyalty that lasts decades. The trouble is swallowed anger — softness that never once says no eventually becomes its own kind of roar.',
    work: 'Reliable, humane leadership: people management, healing professions, advocacy, anything requiring calm under pressure. Wins slowly and permanently. Must practise charging for gentleness — it is not free.',
    shade: 'devotion',
  },
  9: {
    love: 'The Hermit loves deeply but needs the cave — solitude that partners can misread as rejection. In the right bond this is the wise, steady presence that outlasts every storm. The trouble is the locked door: chosen isolation renamed as wisdom, a marriage starved of company.',
    work: 'Masters through depth: scholarship, writing, analysis, spiritual work, any craft with a long apprenticeship. Works best alone and finishes last what it starts first — which is everything it starts.',
    shade: 'steady',
  },
  10: {
    love: 'Wheel of Fortune love arrives on cycles — grand meetings, sudden turns, fortunes that rise and fall together. Exciting, fated, never dull. The trouble is betting on the spin: loving the luck instead of the person, or blaming the wheel when a season changes.',
    work: 'Money comes in tides — feast and lean years, sudden turns both ways. Thrives in markets, trading, cycles-aware businesses. Builds safety by saving at the top, never by clinging to it.',
    shade: 'steady',
  },
  11: {
    love: 'Justice loves honestly — contracts honoured in spirit, imbalances noticed and repaired, loyalty measured fairly. A partner who keeps the books balanced in the best way. The trouble is the ledger: love kept like a court record, every kindness entered as evidence, every fault tried without a defence.',
    work: 'Born for the scales: law, mediation, audit, compliance, journalism, any field where fairness is the product. Reputation is the currency — and it compounds.',
    shade: 'steady',
  },
  12: {
    love: 'The Hanged Man loves through surrender — the partner who lets the relationship change them, who finds in devotion a perspective the single self never could. The trouble is the cross: martyrdom performed for the relationship, stalled decisions renamed as patience, sacrifice nobody asked for.',
    work: 'Sees what others cannot because it hangs where others refuse to look: strategy, research, creative pivots, healing. Money often arrives sideways — through the pause, the angle, the waited-for opening.',
    shade: 'steady',
  },
  13: {
    love: 'Death loves in chapters — intensely, completely, and with endings that are real. Relationships with this card transform or conclude; nothing lingers half-alive. The trouble is the clung-to corpse: a bond kept on life support long after its season, out of loyalty to the person both used to be.',
    work: 'Excels at transformation: turnaround, crisis management, surgery of any kind — organisational, financial, personal. Earns by finishing things properly; the raise comes after the ending nobody else could make.',
    shade: 'steady',
  },
  14: {
    love: 'The supreme marriage alchemist — Temperance blends two lives into one without spilling either. Patient, measured, healing; the arguments it has are the kind that end in better understanding. The trouble is the flat middle: harmony defended so hard that neither partner ever fully commits to anything.',
    work: 'The great mixer: diplomacy, medicine, editing, blending roles and departments, long-game careers that beat the brilliant through consistency. Money grows drop by steady drop into something substantial.',
    shade: 'devotion',
  },
  15: {
    love: 'The Devil loves at full voltage — magnetic, consuming, unforgettable. This is the card of obsession: bonds that grip like chains that would lift off if either person reached up. The trouble is the chain: jealousy, attachment, appetite mistaken for love. Handled consciously, the same current becomes extraordinary passion.',
    work: 'A money magnet: sales, persuasion, entertainment, luxury, anything sold on desire. Commands high voltage and high prices. Must audit the deals — this card’s income and its debts both arrive oversized.',
    shade: 'storm',
  },
  16: {
    love: 'The Tower loves after the lightning — honestly, rebuilt on bedrock, with no pretences left standing. Its marriages are either the ones that survive everything or the ones that end like storms. The trouble is the false crown: a bond kept standing on denial until the sky does the demolition.',
    work: 'Called to the collapse and the rebuild: disruption, emergency response, innovation that breaks incumbents, demolition of broken systems. Wealth often comes after the fall — its own or the industry’s.',
    shade: 'storm',
  },
  17: {
    love: 'The Star is the healer of hearts — hope restored, faith in love renewed, a partner who believes in you accurately. After difficult chapters, this is the love that proves the storm had an edge. The trouble is the eclipse: believing the light must be earned, or optimism kept so bright it blinds the real work.',
    work: 'Inspires for a living: healing, teaching, media, art, vision-setting roles. Money follows reputation for renewal — people pay the one who reminds them what is possible.',
    shade: 'devotion',
  },
  18: {
    love: 'The Moon loves by tides — deeply feeling, romantic, psychically attuned to a partner’s unspoken weather. The bond can be the most soulful there is. The trouble is the fog: anxiety projected onto the beloved, suspicion born of old dreams, love affairs conducted with phantoms.',
    work: 'Powerful imagination for a living: art, film, psychology, night work, research into the hidden. Income can be as tidal as its moods — name the fear, and the fog lifts off the ledger too.',
    shade: 'steady',
  },
  19: {
    love: 'The Sun is the happiest love in the deck — warm, open, generous, celebrated in public and enjoyed in private. Marriage with this card is a climate, not a project. The trouble is the cloud: joy postponed until conditions are perfect, or the radiance that starts demanding orbit instead of giving warmth.',
    work: 'Shines where visibility pays: leadership, performance, sales, brand, any stage. Success multiplies in public here — share the wins and the wins grow. Watch only for the ego’s tax.',
    shade: 'devotion',
  },
  20: {
    love: 'Judgement loves with a trumpet — the call to rise, the second chance, the partner who refuses to let either of you stay asleep. Forgiving, summoning, devoted to the higher version of the bond. The trouble is the inner courtroom: a beloved tried against standards neither signed, or the calling filed away as impractical.',
    work: 'Called to vocation: anything with a summons — law, advocacy, education, crisis vocations, work with a clear before-and-after. The career turns on answering the call; postpone it and it only gets louder.',
    shade: 'devotion',
  },
  21: {
    love: 'The World loves wholly — the completed self offering a completed heart, a partner who finishes what they start, including the relationship. The finest kind of lasting union: whole people choosing each other. The trouble is the almost: love declared complete at ninety percent, or the last mile of honesty never walked.',
    work: 'The completer: projects, degrees, companies, entire careers brought to their finish line — and celebrated. Earns through integration and closure. Guard only against declaring victory before the wreath is woven.',
    shade: 'devotion',
  },
}

export function getDomainNotes(num: number): DomainNotes | undefined {
  // 22 in the 1–22 sky range is The Fool, stored under key 0.
  return CARD_DOMAINS[num === 22 ? 0 : num]
}

export interface LinePosition {
  /** Short label, e.g. "What you carry into love" */
  label: string
  /** The role this point plays, e.g. "past pattern → core need → where it heads" */
  role: string
  num: number
  /** The transparent calculation, e.g. "day 28 → 10 + core 4 = 14" */
  workings: string
}

export interface LifeLine {
  key: 'love' | 'money' | 'talent'
  title: string
  intro: string
  positions: [LinePosition, LinePosition, LinePosition]
}

export interface Constellation {
  /** The three raw anchors reduced into the 1–22 arcana range */
  anchors: { day: number; month: number; year: number; dayWorkings: string; yearWorkings: string }
  /** The central arcana of the whole sky: arcana(day + month + year) */
  core: number
  coreWorkings: string
  lines: LifeLine[]
}

function parseDate(dateStr: string): { day: number; month: number; yearDigits: string } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr)
  if (!m) return null
  return { day: Number(m[3]), month: Number(m[2]), yearDigits: m[1] }
}

/**
 * The Life Constellation: the birth date's day, month and year are each
 * reduced into the 1–22 arcana range (A, B, C). Their sum reduces to the
 * core — the centre of the sky. Each life line then combines an anchor
 * with the core, in the transparent style of modern Destiny Matrix
 * calculators: love pairs the day with the core, money pairs the month,
 * talent pairs the year.
 */
export function computeConstellation(dateStr: string): Constellation | null {
  const parsed = parseDate(dateStr)
  if (!parsed) return null
  const { day, month, yearDigits } = parsed

  const yearSum = yearDigits.split('').reduce((a, d) => a + Number(d), 0)
  const A = arcanaReduce(day)
  const B = month // months are 1–12, already inside the arcana range
  const C = arcanaReduce(yearSum)
  const core = arcanaReduce(A + B + C)

  const sumExpr = (a: number, b: number) => `${a} + ${b} = ${a + b} → ${arcanaReduce(a + b)}`

  return {
    anchors: {
      day: A,
      month: B,
      year: C,
      dayWorkings: `day ${day} → ${A}`,
      yearWorkings: `${yearDigits.split('').join(' + ')} = ${yearSum} → ${C}`,
    },
    core,
    coreWorkings: `${A} + ${B} + ${C} = ${A + B + C} → ${core}`,
    lines: [
      {
        key: 'love',
        title: 'The Love Line',
        intro:
          'Read the three points as one story: what you carry into intimacy, what your heart actually needs, and the kind of bond you are moving toward.',
        positions: [
          { label: 'What you carry', role: 'the day you were born — the pattern you bring into every bond', num: A, workings: `day ${day} → ${A}` },
          { label: 'What your heart wants', role: 'day joined to the core — the love that would truly fulfil you', num: arcanaReduce(A + core), workings: sumExpr(A, core) },
          { label: 'Where love is heading', role: 'day joined to month — the bond your life is growing toward', num: arcanaReduce(A + B), workings: sumExpr(A, B) },
        ],
      },
      {
        key: 'money',
        title: 'The Money Line',
        intro:
          'The material story in three beats: the climate you started from, the channel income actually flows through, and what your work grows into.',
        positions: [
          { label: 'The climate you started in', role: 'the year — the material weather of your beginnings', num: C, workings: `${yearDigits.split('').join(' + ')} = ${yearSum} → ${C}` },
          { label: 'Your earning channel', role: 'month joined to the core — how value moves when you work as yourself', num: arcanaReduce(B + core), workings: sumExpr(B, core) },
          { label: 'What your work grows into', role: 'month joined to year — the harvest of a working life', num: arcanaReduce(B + C), workings: sumExpr(B, C) },
        ],
      },
      {
        key: 'talent',
        title: 'The Talent Line',
        intro:
          'What you are naturally wired for: the raw spark, the craft that sharpens it, and the mastery it becomes if you stay with it.',
        positions: [
          { label: 'Your spark', role: 'the month — the instinctive gift you never had to learn', num: B, workings: `month ${month} → ${B}` },
          { label: 'Your craft', role: 'year joined to the core — the skill that turns spark into vocation', num: arcanaReduce(C + core), workings: sumExpr(C, core) },
          { label: 'Your mastery', role: 'day joined to year — what you become when you stay the course', num: arcanaReduce(A + C), workings: sumExpr(A, C) },
        ],
      },
    ],
  }
}

export interface Echo {
  num: number
  /** Where this arcana appears in the sky */
  where: string[]
  count: number
}

/**
 * How each number loves — the same chart read through the heart.
 * Used by the constellation's "the numbers in love" section.
 */
export const NUMBER_LOVE_NOTES: Record<number, string> = {
  1: 'The 1 loves as it leads — loyally and on its own terms. It needs a partner who is a comrade, not a subject, or its independence turns into loneliness inside the very bond it chose.',
  2: 'The 2 is the great partner of the number line — love is its native language. The lesson is to keep a self inside the we: harmony bought with self-erasure eventually bills the relationship.',
  3: 'The 3 loves joyfully and expressively — courtship never quite ends. The trouble is the weather: highs that promise forever and lows that doubt everything, often over nothing but a Tuesday.',
  4: 'The 4 loves by building — commitment is this number’s love language, and it shows up, pays on time and stays. The lesson is flexibility: a heart is not a load-bearing wall.',
  5: 'The 5 loves like it lives — vividly, freely, allergic to cages. It is intoxicating and hard to hold. The lesson every 5 must learn: chosen anchors, freely made, are not cages.',
  6: 'The 6 is the natural spouse and parent of the numbers — love as daily care, beauty and duty gladly carried. The lesson is the mirror: to receive as much as it gives, without invoicing.',
  7: 'The 7 loves from the tower — deeply, privately, after long study of the beloved. The lesson is disclosure: a partner cannot love a mind they are never allowed into.',
  8: 'The 8 loves with its whole empire — protection, provision, grand gestures. The lesson is softness: power impresses a partner; vulnerability keeps one.',
  9: 'The 9 loves the whole world and one person hardest. Old-soul, forgiving, large-hearted. The lesson is release — loving people as they are, not as the 9’s compassion insists they could be.',
  11: 'The 11 loves at a frequency most partners feel before they understand it — intuitive, inspiring, electric. The lesson is grounding: antennae this sensitive need routines, rest and plain talk.',
  22: 'The 22 loves in blueprints — it builds the marriage, the house, the legacy as one structure. The lesson is presence: a partner needs a spouse, not a construction foreman.',
  33: 'The 33 loves without condition and almost without boundary — healing simply by staying. The lesson is the hardest one: the heart of the healer must be inside the circle of the healed.',
}

/**
 * Numbers that appear more than once across the sky are the loudest themes —
 * the same energy echoing through different parts of the life.
 */
export function findEchoes(entries: { num: number; where: string }[]): Echo[] {
  const map = new Map<number, string[]>()
  for (const e of entries) {
    const list = map.get(e.num) ?? []
    list.push(e.where)
    map.set(e.num, list)
  }
  return Array.from(map.entries())
    .filter(([, where]) => where.length > 1)
    .map(([num, where]) => ({ num, where, count: where.length }))
    .sort((a, b) => b.count - a.count || a.num - b.num)
}
