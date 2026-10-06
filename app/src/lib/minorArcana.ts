import { MAJOR_ARCANA, type MajorArcana } from './tarot'

/**
 * The 56 Minor Arcana: four suits of fourteen cards each.
 * Unlike the Majors — the great archetypal currents of a life — the Minors
 * describe the everyday weather: how energy, feeling, thought and matter
 * actually move through ordinary days. Each suit is a full story running
 * from the Ace (a pure gift of the element) through the court
 * (Page → Knight → Queen → King: learning, pursuing, mastering inwardly,
 * mastering outwardly).
 */

export type MinorSuit = 'Cups' | 'Pentacles' | 'Swords' | 'Wands'

export interface SuitInfo {
  suit: MinorSuit
  /** The alchemical glyph used as a fallback card face */
  glyph: string
  element: string
  domain: string
  keywords: string[]
  /** What this suit governs in a reading and in a life */
  overview: string
  /** How the suit serves when it is healthy */
  light: string
  /** The suit's characteristic imbalance */
  shadow: string
  guidance: string
}

export const SUITS: SuitInfo[] = [
  {
    suit: 'Wands',
    glyph: '🜂',
    element: 'Fire',
    domain: 'Passion, ambition, creativity and action',
    keywords: ['Fire', 'Action', 'Passion', 'Vision'],
    overview:
      'Wands are the suit of fire — the spark that starts things, the will that keeps them burning. They speak of ambition and creative hunger, of projects, adventures, careers and causes: anything you want badly enough to chase. In a reading they ask: where is your energy pointing, and is it fed or scattered? Wands move fast and hot; they are the suit of doing before feeling ready.',
    light:
      'Healthy Wands energy is initiative, courage, enthusiasm and vision. It gets out of bed excited, starts the business, climbs the mountain, and warms everyone in the room while doing it. It turns "someone should" into "I will".',
    shadow:
      'Out of balance, fire burns what it should warm: impulsiveness, burnout, arrogance, projects started in a blaze and abandoned in a week. The shadow of Wands is energy without direction — motion mistaken for progress.',
    guidance:
      'Work with Wands by giving the fire a hearth: one passion pursued deeply beats ten skimmed. Act while the heat is real, but build a small structure — a plan, a rhythm, a finish line — so the flame has something to cook. And rest before you burn, not after.',
  },
  {
    suit: 'Cups',
    glyph: '🜄',
    element: 'Water',
    domain: 'Emotions, love, relationships and intuition',
    keywords: ['Water', 'Feeling', 'Love', 'Intuition'],
    overview:
      'Cups are the suit of water — the tides of feeling that run under every human event. They speak of love and friendship, grief and joy, dreams, empathy and the inner life nobody sees from outside. In a reading they ask: what is the heart actually doing while the face performs calm? Cups move in waves; they are the suit of depth over speed.',
    light:
      'Healthy Cups energy is warmth, connection, compassion and emotional honesty. It loves without keeping score, forgives without forgetting the lesson, and creates the safety in which everyone nearby becomes more themselves.',
    shadow:
      'Out of balance, water floods or stagnates: moodiness, neediness, escapism, jealousy, feelings swallowed until they turn physical. The shadow of Cups is drowning in the heart\'s weather and calling it destiny.',
    guidance:
      'Work with Cups by treating feelings as information, not commands: name them, listen to them, then decide with the whole of you. Pour into relationships that pour back. And keep one dry place — a practice, a routine, a truth you hold — where the tides cannot rearrange everything.',
  },
  {
    suit: 'Swords',
    glyph: '🜁',
    element: 'Air',
    domain: 'Thought, truth, communication and conflict',
    keywords: ['Air', 'Mind', 'Truth', 'Clarity'],
    overview:
      'Swords are the suit of air — the mind at work: analysis, words, logic, decisions and the sharp truths no one wants to say first. They speak of clarity and communication, but also of worry, conflict and the cuts that thinking can make. In a reading they ask: what is true here, and is it being thought, spoken, or weaponised? Swords are the fastest and the coldest of the suits.',
    light:
      'Healthy Swords energy is clarity, honesty, discernment and brave communication. It cuts through fog, names the problem, tells the truth kindly, and makes the decision everyone else was circling. It protects the mind\'s integrity above its comfort.',
    shadow:
      'Out of balance, the blade turns: anxiety, harsh words, overthinking, cruelty dressed as honesty, conflict kept alive because winning feels like living. The shadow of Swords is a mind that attacks everything — including itself.',
    guidance:
      'Work with Swords by asking whether a thought is a fact or a fear before obeying it. Speak the true thing and keep the kind tone — clarity needs no cruelty to be sharp. And give the mind a Sabbath: not every problem is solved by more thinking; some are dissolved by rest.',
  },
  {
    suit: 'Pentacles',
    glyph: '🜃',
    element: 'Earth',
    domain: 'Money, work, health, home and the body',
    keywords: ['Earth', 'Material', 'Work', 'Stability'],
    overview:
      'Pentacles are the suit of earth — the slow, solid world of matter: money and work, health and home, the body and everything you can hold. They speak of what you build over years, what you tend daily, and what outlasts moods. In a reading they ask: what is the real, tangible situation — and is it being planted, tended, or neglected? Pentacles move slowly and last.',
    light:
      'Healthy Pentacles energy is patience, craft, reliability and stewardship. It shows up on time, saves before it spends, feeds the body that carries the dream, and builds things — savings, skills, homes, reputations — that still stand in twenty years.',
    shadow:
      'Out of balance, earth traps or starves: greed, hoarding, workaholism, materialism, or its mirror — neglect, debt, chaos, a body asked to carry what the life keeps refusing to. The shadow of Pentacles is forgetting that money and things are tools, not verdicts.',
    guidance:
      'Work with Pentacles by playing the long game: small consistent deposits — in the bank, the body, the skill — beat dramatic gestures. Tend what you already have before acquiring more. And keep the earth alive with meaning: wealth and health exist so that something worthy can be done with them.',
  },
]

export function getSuitInfo(suit: MinorSuit): SuitInfo {
  const info = SUITS.find((s) => s.suit === suit)
  if (!info) throw new Error(`Unknown suit: ${suit}`)
  return info
}

export interface MinorArcana {
  /** Stable unique id, e.g. 'cups-01' */
  id: string
  suit: MinorSuit
  /** 1–10 for the numbered cards, 11–14 for Page, Knight, Queen, King */
  num: number
  /** 'Ace' | 'Two' … 'Ten' | 'Page' | 'Knight' | 'Queen' | 'King' */
  rank: string
  /** e.g. 'Ace of Cups' */
  name: string
  /** Image basename inside src/assets/cards/minor, e.g. 'Cups01' */
  filePrefix: string
  keywords: string[]
  meaning: string
  shadow: string
  detail: string
  shadowDetail: string
  guidance: string
}

const RANKS = [
  'Ace',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Page',
  'Knight',
  'Queen',
  'King',
]

const FILE_PREFIX: Record<MinorSuit, string> = {
  Cups: 'Cups',
  Pentacles: 'Pents',
  Swords: 'Swords',
  Wands: 'Wands',
}

function mc(
  suit: MinorSuit,
  num: number,
  keywords: string[],
  meaning: string,
  shadow: string,
  detail: string,
  shadowDetail: string,
  guidance: string,
): MinorArcana {
  const rank = RANKS[num - 1]
  const two = String(num).padStart(2, '0')
  return {
    id: `${suit.toLowerCase()}-${two}`,
    suit,
    num,
    rank,
    name: `${rank} of ${suit}`,
    filePrefix: `${FILE_PREFIX[suit]}${two}`,
    keywords,
    meaning,
    shadow,
    detail,
    shadowDetail,
    guidance,
  }
}

export const MINOR_ARCANA: MinorArcana[] = [
  // ───────────────────────────── WANDS · Fire ─────────────────────────────
  mc(
    'Wands', 1,
    ['Spark', 'New venture', 'Creative urge', 'Inspiration'],
    'A hand offers a living wand, green and leafing. The Ace of Wands is the original spark — a surge of creative fire, a new ambition, an idea that wants to become a thing. Pure potential energy has arrived.',
    'Delays, hesitation, the spark unclaimed',
    'In the Rider–Waite image a cloud hand offers a branch already sprouting leaves: this fire is alive before you touch it, and it will not wait politely. In readings it is the job offer out of nowhere, the project that won\'t leave your mind, the attraction that rearranges your plans. The Ace of Wands asks for a fast yes — not a perfect plan, just a beginning.',
    'Its shadow is the spark ignored: the idea written in a notebook and never spoken, the fire that becomes restlessness, irritation and vague hunger when it finds no channel. It can also invert into haste — saying yes to everything and burning the match without lighting anything.',
    'Act within twenty-four hours while the heat is real: make the call, sketch the plan, say the yes. Give the spark one concrete action as fuel, and protect the early flame from critics — it is strong, but it is young.',
  ),
  mc(
    'Wands', 2,
    ['Planning', 'Future vision', 'First steps', 'Boldness'],
    'A figure stands between two wands, one hand on a globe, looking out over open land toward a distant sea. The Two of Wands is the moment after the spark: planning the conquest, seeing the bigger map, daring to want more than the safe courtyard.',
    'Fear of the unknown, hesitation, playing small',
    'This is the card of the strategic dreamer — the one holding home territory in one hand and the whole world in the other. It often appears when comfort and calling have started arguing: the apartment is fine, the job is fine, and something in you keeps looking at the horizon. The Two of Wands blesses ambition and asks for a real plan, not just a wistful stare.',
    'Its shadow is the paralysis of the comfortable: endless planning that never leaves the balcony, fear of the unknown disguised as "being realistic", or its opposite — a leap with no map at all, mistaking impatience for courage.',
    'Write the vision down in one sentence, then identify the first physical step toward it and take it this week. Keep one foot on your current ground while you scout the new — the card holds both wands for a reason.',
  ),
  mc(
    'Wands', 3,
    ['Expansion', 'Foresight', 'First results', 'Waiting for ships'],
    'A figure watches from a cliff as three ships cross the sea toward him. The Three of Wands says the ships are already sailing — the first results of your vision are on the water, and now the work is patience and preparation for their arrival.',
    'Delays, shortsightedness, frustration with slow progress',
    'After the plan (Two) comes the waiting that tests it (Three). This card appears when effort has been made and the outcome is out of your hands — launches pending, applications sent, seeds planted. The figure is not idle: he holds a wand like a staff, actively watching, ready to receive. It is a card of earned optimism.',
    'Its shadow is the failure of patience in both directions: nagging delays and half-hearted work that never lets the ships leave the harbour, or frustration so loud it scares the crew — demanding results before they have time to cross.',
    'Do the follow-up and then let go: one nudge, then trust the crossing. Use the waiting to build the dock — prepare your finances, your schedule, your skills — so that when the ships arrive you can actually receive them.',
  ),
  mc(
    'Wands', 4,
    ['Celebration', 'Homecoming', 'Stability', 'Community'],
    'Four wands crowned with a garland stand before a joyful scene — a harvest dance, a decorated canopy. The Four of Wands is the first true resting point of the suit: milestone reached, foundations laid, a reason to gather and celebrate.',
    'Instability, uncelebrated milestones, transition stress',
    'This is the card of weddings and housewarmings, launches and graduations — any moment where work becomes festivity. In a deeper sense it speaks of structural harmony: the four wands are a square, a stable architecture of life (home, work, love, health) briefly in balance. It often appears at the completion of a solid foundation, before the next ambition ignites.',
    'Its shadow is the milestone no one stopped to mark — the promotion absorbed by the next target in under an hour — or the celebration built on shaky ground, a happy canopy over unfinished foundations. It can also signal transition stress: the strange flatness after the party ends.',
    'Mark completions properly: ritualise them, however small. Ask whether your four corner posts — body, home, love, work — are all standing, and shore up the wobbly one. Celebration is not the reward of the work; it is part of the structure.',
  ),
  mc(
    'Wands', 5,
    ['Conflict', 'Competition', 'Creative tension', 'Sparring'],
    'Five figures brandish wands at one another — no one is wounded, no one is winning. The Five of Wands is productive friction: competition, debate, the clash of egos and ideas from which something better is eventually forged.',
    'Avoided conflict, mismatched energies, rivalry turning sour',
    'Unlike the battles of Swords, this skirmish is almost sport: crossed wands, not drawn blood. It appears in workplaces full of strong opinions, families of loud personalities, projects where five visions compete for one slot. The card asks whether the conflict is honest sparring — sharpening everyone — or ego warfare that costs more than it creates.',
    'Its shadow is conflict handled badly at either extreme: open warfare where cooperation was possible, or total avoidance, where the tension goes underground and poisons the well anyway. It also warns of pure noise — energy spent performing disagreement instead of resolving it.',
    'Step into the ring if the fight matters: state your position cleanly and let it be tested. If it doesn\'t matter, referee instead of competing — the Five resolves fastest when someone names the actual question underneath all the wands.',
  ),
  mc(
    'Wands', 6,
    ['Victory', 'Recognition', 'Triumph', 'Public success'],
    'A rider on horseback wears a laurel wreath as a crowd raises wands in salute. The Six of Wands is public victory — the project that lands, the effort that gets seen, the well-earned moment at the centre of the cheering crowd.',
    'Ego inflation, fall from grace, delays in recognition',
    'This card appears after the friction of the Five has been survived and resolved: someone\'s vision won the contest, fairly, and the community acknowledges it. It speaks of confidence earned externally — praise, promotion, applause — arriving exactly when doubt was loudest. The wreath is deserved; the card\'s only caution is what the rider does while wearing it.',
    'Its shadow is the crowd\'s poison: success that inflates into arrogance, recognition chased for its own sake, or the bitter flip side — the worthy work that no one applauds, and the crisis of meaning that follows. It can also warn of a fall built on a too-tall horse.',
    'Receive the praise fully — you earned it, and deflecting it wastes it. Then share the wreath: name the people who carried wands for you. And keep doing the work that won; the Six rewards substance, and only substance sustains the next round.',
  ),
  mc(
    'Wands', 7,
    ['Defense', 'Standing your ground', 'Conviction', 'Perseverance'],
    'A figure stands on a hilltop, wand raised, facing six wands rising against him from below. The Seven of Wands is the defence of what you have built — outnumbered, unassisted, but holding the high ground because your position is right.',
    'Being overwhelmed, giving up, paranoia about attacks',
    'This is the card of justified defiance: the founder defending the vision against the board, the parent defending the child against the crowd, the professional whose unpopular call turns out correct. The figure is not attacking — he holds the wand like a fence post, guarding territory already won. The card asks: is this battle worth your position, or only worth your pride?',
    'Its shadow is the siege that never ends: fighting every critic until defence becomes identity, paranoia that sees six wands in every bush, or the reverse — folding at the first raised wand because standing alone feels unbearable.',
    'Check the ground before the battle: is your position actually right, or merely yours? If right, defend it once, clearly, and stop re-arguing. Conserve energy — the Seven is won by endurance, not by winning every skirmish.',
  ),
  mc(
    'Wands', 8,
    ['Swift action', 'Movement', 'Rapid progress', 'Alignment'],
    'Eight wands fly through the air in one clean arc over open land. The Eight of Wands is sudden, aligned momentum — events moving faster than doubt, messages landing, the project that finally takes off all at once.',
    'Delays, misaligned efforts, haste and scattered fire',
    'After the static defence of the Seven, everything moves. This card often appears with news in transit, flights booked, decisions cascading — the moment the logjam breaks and events carry their own speed. Its lesson is that fast is not careless: the wands fly in one direction, fully aligned, which is exactly why they travel so far.',
    'Its shadow is speed without aim: doing everything quickly and nothing meaningfully, messages fired before thought, or its twin — delay dressed as caution, wands stuck in the air while life waits. Misalignment also belongs here: great energy aimed at the wrong target.',
    'Move while it moves: answer fast, decide fast, travel now. Before accelerating, name the one destination all eight wands serve — alignment is the engine of this card. And don\'t mistake the rush for a reason to skip the one detail that matters.',
  ),
  mc(
    'Wands', 9,
    ['Resilience', 'Last stand', 'Guarded strength', 'Wounded defender'],
    'A battered figure leans on a wand, eight more wands standing behind him like a palisade. The Nine of Wands is the survivor\'s card: hurt, tired, still standing — the final test arrives exactly when your strength is lowest, and you are still enough.',
    'Exhaustion, paranoia, giving up at the final hurdle',
    'This figure has been through the whole suit — the spark, the fight, the defence — and carries the scars. In readings it appears at the "almost there" moment: the last stretch of the degree, the final negotiation, the ninth month of the project. The wand he leans on is both wound and crutch: the effort that cost him is also what holds him up.',
    'Its shadow is the trench that never ends: hypervigilance that treats every passer-by as the next attack, exhaustion defended as duty, or the premature surrender — laying down the wand one challenge short of the summit the Ten promised.',
    'Count what is actually left to do, not what could go wrong — the palisade is stronger than it feels. Protect your remaining energy ruthlessly: rest is strategy now. And remember: this is the ninth wand, not the tenth; the end is closer than the fatigue suggests.',
  ),
  mc(
    'Wands', 10,
    ['Burden', 'Overload', 'Responsibility', 'Carrying too much'],
    'A figure bows under the weight of ten wands, carrying them toward a distant town. The Ten of Wands is success that has become a load — every opportunity accepted, every fire kept burning, until the very abundance of the suit bends your back.',
    'Delegation, release, setting boundaries, learning to drop wands',
    'At the end of the Wands journey the fire is safe but heavy: the business runs, the family thrives, the causes persist — and the person who lit them all carries everything personally. This card often appears for the reliable one, the founder, the eldest child, the one who "can handle it". The village is visible: the burden is almost delivered, which is also the warning — almost.',
    'Its shadow is martyrdom by capability: refusing every offer of help because no one else does it right, or its opposite — dropping every wand at once in a dramatic collapse. Both miss the card\'s simple question: which of these wands are actually yours?',
    'Audit the bundle wand by wand: carry what is truly yours, hand back what was never yours, and let die what has already burned out. Deliver the load, then rest before lighting anything new — the Ten completes the suit precisely so you don\'t have to.',
  ),
  mc(
    'Wands', 11,
    ['Free spirit', 'Exploration', 'Creative spark', 'Good news'],
    'A young figure holds a sprouting wand and gazes at the desert beyond the cliffs. The Page of Wands is the suit\'s messenger — a fresh burst of enthusiasm, a promising idea, an invitation to explore that arrives with youthful, unjaded energy.',
    'Impulsiveness, immaturity, scattered energy',
    'Pages bring beginnings, and this one brings the beginning of adventures: the job in a new country, the creative project without a business plan, the "what if we just…?" that starts journeys. The Page of Wands is pure appetite for experience — fearless, naive in the best sense, already dressed for the road. In readings it often signals good news about work, creativity or travel.',
    'Its shadow is enthusiasm without follow-through: a hundred started hobbies, grand announcements without substance, or the eternal "someday" traveller who never buys the ticket. It can also warn of naive overconfidence — exploring without water.',
    'Treat the Page\'s idea as a seed, not a forest: test it cheaply and quickly. Give the enthusiasm one structured outlet — a schedule, a budget, a first deliverable — so the spark becomes a flame instead of a flash. And say yes to the adventure, just read the map first.',
  ),
  mc(
    'Wands', 12,
    ['Adventure', 'Bold action', 'Passion', 'Charging ahead'],
    'A knight in armour rides a rearing horse across a desert, wand raised, flames on his tunic. The Knight of Wands is pure pursuit — the fire of the suit given legs, charging toward the goal with a courage that makes bystanders either cheer or duck.',
    'Impulsivity, arrogance, unfinished quests',
    'This is the classic entrepreneur\'s card: launch first, learn mid-flight, apologise never. The Knight of Wands has the charisma to rally a crowd and the restlessness to leave it the moment it sits still. In readings he often appears as a person — bold, hot-blooded, magnetic — or as a push to act decisively while the momentum is warm.',
    'Its shadow is the charge without a cause: leaping at every shiny target, confusing motion with mission, leaving a trail of half-finished conquests. It also warns of arrogance — the fire that scorches allies and mistakes their singeing for loyalty.',
    'Aim before you gallop: name the destination, check the horse has water, then commit fully. Finish one quest before accepting the next — the Knight\'s gift is follow-through, not just charge. And pair every bold move with one patient one; the desert is crossed by both.',
  ),
  mc(
    'Wands', 13,
    ['Confidence', 'Charisma', 'Warmth', 'Social mastery'],
    'A crowned queen sits before a desert of sunflowers, a black cat at her feet, a wand held like a sceptre and a sunflower in her other hand. The Queen of Wands has mastered fire inwardly: magnetic, warm, self-assured — the person the room reorganises itself around.',
    'Jealousy, attention-seeking, hidden insecurity',
    'The Queen of Wands rules the inner fire — she no longer needs to charge like the Knight because her flame is steady and self-feeding. She combines courage with warmth, ambition with generosity: the leader people follow gladly, the host whose party everyone remembers, the artist whose confidence carries the whole troupe. In a reading she often signals a season of stepping into visible, unapologetic self-possession.',
    'Her shadow is the flame performing for the mirror: confidence that needs constant audience, jealousy of anyone else\'s warmth, or the hidden insecurity that overcompensates with louder charisma. It can also burn as domination — the room reorganised by fear instead of love.',
    'Own the room without needing to fill it: let warmth, not volume, be your magnetism. Guard the inner fire with solitude — the Queen recharges alone. And use the charisma as a stage for others; the brightest thing about this queen is how she makes everyone near her glow.',
  ),
  mc(
    'Wands', 14,
    ['Visionary leadership', 'Entrepreneurship', 'Authority', 'Bold vision'],
    'A king on a throne of lions and salamanders holds a flowering wand; the desert blooms behind him. The King of Wands has mastered fire outwardly — the established visionary who turns bold ideas into empires and carries others on the heat of certainty.',
    'Tyranny, ego-driven vision, impulsive decisions',
    'This is the founder-CEO archetype, the general, the film director whose certainty organises hundreds of people. The King of Wands leads by vision: he sees the city before it exists and speaks it into being. Unlike the Queen\'s magnetic warmth, his power is directional — he points, and the world moves. In readings he can be a person in your life or the call to claim your own authority and lead.',
    'His shadow is the vision that brooks no dissent: tyranny in the name of the dream, charisma curdled into ego, decisions made on impulse and defended as instinct. The bloated version builds empires that serve only the throne; the shrunken version never dares to lead at all.',
    'Lead by painting the vision so clearly that people enlist themselves. Keep one truth-teller close — every King of Wands needs a court jester who can say "the dream has a hole in it". And check every big decision against the empire it serves, not the applause it earns.',
  ),

  // ───────────────────────────── CUPS · Water ─────────────────────────────
  mc(
    'Cups', 1,
    ['New love', 'Emotional renewal', 'Compassion', 'Open heart'],
    'An ornate cup overflows as a dove descends with a host, five streams pouring into a calm pool. The Ace of Cups is the heart\'s original gift — love beginning or renewing, compassion arriving, the inner life refilled from a source deeper than circumstance.',
    'Emotional blocks, emptiness, repressed feeling',
    'Where the other Aces gift fire, thought and matter, this one gifts feeling itself: forgiveness that finally comes, the baby on the way, the friendship that deepens overnight, the prayer answered with quiet certainty. In readings it often marks the opening of the heart after a long season of armour — an offer of genuine emotional connection, arriving full and free.',
    'Its shadow is the cup held shut: feelings swallowed until they ache, love offered with a closed hand, or the emptiness of a heart on reserve — present at every table, fed by none. It can also overflow destructively: emotion released without any channel, flooding whatever stands nearby.',
    'Receive before you analyse — this cup is a gift, not a problem to solve. Say the feeling out loud to someone safe; the Ace multiplies when shared. And give it a channel: love that moves through you into art, work or kindness stays fresh; love hoarded turns.',
  ),
  mc(
    'Cups', 2,
    ['Partnership', 'Mutual attraction', 'Union', 'Harmony'],
    'Two figures exchange cups beneath a caduceus crowned by a lion\'s head, a bridge to a house in the distance. The Two of Cups is the meeting of hearts: partnership in perfect balance, attraction answered, the sacred "I see you" between two people.',
    'Imbalance, broken connection, love withheld',
    'This is the card of couples and kindred spirits — not the fire of first pursuit (that is the Knight) but the moment of mutual recognition: the deal both parties want, the friendship that feels like coming home, the romance with a real bridge to a shared future. In a broader sense it speaks of any balanced exchange between two parties: business partners, therapist and client, two halves of oneself finally shaking hands.',
    'Its shadow is the uneven cup: one heart pouring, the other receiving by habit; connection kept alive by one person\'s maintenance; or the mirror image — harmony so defended that conflict is swallowed and the bridge never gets built. It can also mark a bond quietly ending: two cups, no longer exchanged.',
    'Check the exchange: are both cups moving? Say the thing that keeps the connection honest, even if it rocks the table. And protect the bond\'s rituals — the shared meals, the check-ins — because the Two of Cups is not a state but a practice.',
  ),
  mc(
    'Cups', 3,
    ['Celebration', 'Friendship', 'Community joy', 'Togetherness'],
    'Three figures raise cups in a dance, the harvest of fruit and pumpkin at their feet. The Three of Cups is collective happiness — the friend group, the reunion, the wedding table, the joy that exists only because it is shared.',
    'Overindulgence, gossip, feeling like the outsider',
    'Where the Two is the couple, the Three is the circle: friendship as a real form of wealth. This card appears at reunions and team wins, at baby showers and Friday nights — whenever life says "this is good, and it is better because you are all here". It also blesses creative collaboration: three hearts around one work create something none could alone.',
    'Its shadow is the party gone wrong: indulgence that costs the morning after, gossip wearing the costume of intimacy, or the loneliest position in the room — present at the celebration but not of it. It can also warn of cliques: the circle kept closed until it suffocates.',
    'Invest in the circle deliberately: friendships die of neglect, not conflict. Celebrate others\' wins with the same energy you want at yours. And if you are the outsider, pour for the group anyway — the Three always has room for one more cup.',
  ),
  mc(
    'Cups', 4,
    ['Apathy', 'Contemplation', 'Missed offers', 'Discontent'],
    'A figure sits beneath a tree, arms crossed, staring at three cups on the ground — unaware of a fourth cup being offered from a cloud behind. The Four of Cups is emotional stillness: the heart closed by boredom, grief or saturation while life offers anyway.',
    'Renewed interest, acceptance, motivation returning',
    'This card often arrives not in crisis but in flatness — the good-enough job, the fine relationship, the days that pass without registering. The crossed arms say "I have felt enough"; the offered cup says "have you, though?". It is the tarot\'s gentlest wake-up call: discontent can become a hiding place, and the way out is not more stimulation but more attention.',
    'Its shadow is the refusal hardened into identity: chronic dissatisfaction kept alive because wanting nothing is safer than risking disappointment. Its opposite is the compulsive yes — grabbing every offered cup to avoid ever feeling this stillness, which is the same fear inverted.',
    'Name the flatness without judging it: "I feel nothing much" is data, not failure. Look deliberately at what is being offered right now — from people, from the day itself — and try one small yes you would normally wave away. Stillness is sometimes rest; give it a week before calling it a rut.',
  ),
  mc(
    'Cups', 5,
    ['Grief', 'Loss', 'Disappointment', 'Mourning'],
    'A cloaked figure bows over three spilled cups, ignoring the two full ones behind — and the bridge to home beyond. The Five of Cups is the heart in mourning: loss is real, grief is right, and yet the cup of what remains stands unregarded at your back.',
    'Acceptance, moving forward, finding what remains',
    'This is one of the most honest cards in the deck. It does not say "don\'t cry" — the figure\'s grief is legitimate; three cups have spilled and pretending otherwise is its own wound. But the card\'s geometry is the message: two full cups remain, a bridge crosses the river, home waits. In readings it marks a season of loss — a relationship, a dream, a version of life — and asks only that mourning not become the whole address.',
    'Its shadow is the grief that will not lift its head: regret running a permanent audit, what was lost worshipped until what remains starves. Its opposite is worse — the denial that never spills a tear; unwept loss does not disappear, it ferments.',
    'Grieve fully and on purpose: name what spilled, honour it, and let it be spilled. Then turn around — literally changing posture can help — and inventory what still stands. The bridge is real: take one step toward the two full cups this week.',
  ),
  mc(
    'Cups', 6,
    ['Nostalgia', 'Childhood memories', 'Innocence', 'Gentle gifts'],
    'A child offers a cup of flowers to a smaller child in a village garden, six cups blooming between them. The Six of Cups is the past returned gently: nostalgia, old friends, the kindness that resurfaces, the memory that warms instead of wounds.',
    'Living in the past, naivety, unrealistic idealism',
    'Unlike the Five\'s raw loss, the Six is memory filtered by time — the old song that still works, the childhood friend who calls, the version of you that believed everything. In readings it often signals reconnection: people from earlier chapters returning with something to give. It also blesses simple generosity — small gifts, freely given, that expect nothing back.',
    'Its shadow is the golden past kept as a rival to the present: "it was better then" said until now has no room to be good. It can also mark naivety — the adult who still gives like a child in a marketplace that does not, or nostalgia weaponised to avoid the responsibilities of today.',
    'Visit the past as a guest, not a resident: reconnect, reminisce, take the warmth — then return to now with it. Give one small, free gift this week; the Six works through simple kindness. And if the past keeps calling, ask what it wants you to bring forward, not go back to.',
  ),
  mc(
    'Cups', 7,
    ['Choices', 'Fantasy', 'Wishful thinking', 'Many options'],
    'A figure contemplates seven cups floating in a cloud, each holding a different vision — treasure, fame, a monster, a snake, a wreath, a castle, a radiant figure. The Seven of Cups is the imagination at full power and zero resolution: dreams, options and illusions all mixed together.',
    'Clarity, commitment, anchoring dreams in reality',
    'This card is the suit of water at its most watery — everything shimmers, nothing is solid. It appears when options multiply: job offers, romantic possibilities, creative directions, each one glowing. Some cups hold real treasure; one holds a snake; one holds a monster that is only a shadow. The work is not choosing faster but seeing clearly.',
    'Its shadow is the permanent daydream: fantasy replacing action, "keeping options open" until all of them close, or escapism — the scroll, the series, the imagined life — filling the hours the real life needed. Its opposite failure is the refusal to dream at all.',
    'Reality-test each cup: what would this option cost, in hours and in truth? Pick one cup and take one physical step toward it — the fog clears at ground level, never in the cloud. And keep the imagination as an engine, not a residence: dream vividly, then build.',
  ),
  mc(
    'Cups', 8,
    ['Walking away', 'Seeking deeper meaning', 'Leaving the familiar', 'Disillusionment'],
    'A figure turns his back on eight stacked cups and walks toward distant mountains under an eclipse. The Eight of Cups is the bravest exit in the suit: leaving something good because it is no longer true — trading the full cups for a question worth more.',
    'Fear of change, stagnation, returning to what was left',
    'Nothing here is spilled or broken; the cups stand full and orderly. That is the point — this departure is not escape from disaster but refusal of mere adequacy. The card appears when the successful career hollows out, when the fine relationship completes its chapter, when the seeker hears a call that comfort cannot answer. The figure carries a staff and one cloak: travelling light toward meaning.',
    'Its shadow is the exit never taken: staying in the good-enough until it rots into resentment, or its mirror — restless leaving, abandoning every eight cups at the first eclipse, mistaking boredom for a calling. Both misuse the card\'s real asset: the courage to leave truthfully.',
    'Before leaving, be sure it is the cups that are empty and not your attention — rest and honesty can refill surprising things. If the leaving is true, go cleanly: no dramatic door-slam, no lingering at the threshold. And answer the mountains\' question with your feet; the path appears by walking.',
  ),
  mc(
    'Cups', 9,
    ['Contentment', 'Wish fulfilled', 'Emotional satisfaction', 'Gratitude'],
    'A satisfied figure sits before nine golden cups, arms crossed in quiet triumph. The Nine of Cups is the "wish card" — emotional fulfilment, desires met, the table of the heart fully set and the self finally at ease in its own chair.',
    'Smugness, dissatisfaction, wishes that miss the point',
    'This is one of the brightest cards in the deck: the wish fulfilled — not the fantasy of the Seven but the real thing, arrived. It speaks of gratitude that is earned, of enough-ness reached, of the private "yes" that needs no witness. In readings it often confirms that what you wanted is already here or arriving — the question it asks is only whether you can receive it.',
    'Its shadow is the wish granted and instantly discounted: the tenth cup already imagined before the ninth is tasted, or satisfaction performed so hard it becomes smugness. It also warns of wishes that answered the wrong question — getting what you asked for and finding it was never what you needed.',
    'Receive it: let yourself actually feel the wish fulfilled for one full minute before planning the next one. Say thank you — to people, to luck, to your own past effort. And when a new wish forms, test it against the heart\'s deep list, not the ego\'s loud one.',
  ),
  mc(
    'Cups', 10,
    ['Family harmony', 'Lasting happiness', 'Emotional fulfilment', 'The rainbow promise'],
    'A couple embraces beneath a rainbow of ten cups while children dance and a village thrives in the valley. The Ten of Cups is the suit\'s completion: not private contentment but shared joy — the family, community or partnership in which love has become a structure that shelters everyone.',
    'Disharmony, broken dreams, happiness performed for show',
    'The card\'s genius is its scale: happiness as infrastructure. This is the holiday table where everyone actually wants to be, the partnership that neighbours calibrate by, the "we did it" of a whole family. In readings it promises lasting emotional reward — the relationship that endures, the home that holds — and asks you to notice the rainbow rather than audit the weather.',
    'Its shadow is the picture versus the life: harmony performed for the audience while the house behind the rainbow argues; the family ideal weaponised against the family\'s reality; or the grief of believing this card exists only for other people.',
    'Build the rainbow deliberately: joy shared is the only kind that lasts, so invest in the rituals — meals, calls, traditions — that carry love across years. Repair one small crack in your closest circle before it widens. And when harmony arrives, do not audit it; just stand under it.',
  ),
  mc(
    'Cups', 11,
    ['Intuitive messages', 'Tender feelings', 'Artistic beginnings', 'Sensitivity'],
    'A young figure gazes at a fish rising from an offered cup, as if the cup itself were speaking. The Page of Cups is the heart\'s messenger: a feeling worth listening to, an artistic impulse, a moment of unexpected tenderness or intuitive insight arriving wrapped in innocence.',
    'Escapism, hypersensitivity, creative blocks',
    'Pages bring beginnings, and this one brings feelings before they have names: the crush not yet admitted, the song not yet written, the strange accurate hunch that arrives "for no reason". The fish in the cup is the unconscious surfacing to say hello. In readings this card blesses creative work, honest self-expression and the willingness to feel things without immediately explaining them.',
    'Its shadow is the feeling never grounded: sensitivity so total that every room wounds, artistic impulse spent on fantasies of the art rather than its making, or escapism — the fish admired endlessly, the cup never carried anywhere. It can also mark naivety: trusting every pretty feeling as if none of them could flatter.',
    'Treat feelings as mail, not as law: read them, thank them, then check the address. Give the tender impulse one concrete form — write the verse, send the message, paint the thing. And keep a boundary or two around the sensitivity; the Page thrives with a skin, not just a heart.',
  ),
  mc(
    'Cups', 12,
    ['Romantic pursuit', 'Following the heart', 'Offers of love', 'Creative devotion'],
    'A knight rides slowly, holding a cup as if it were a chalice, his horse pausing mid-journey. The Knight of Cups is the suit\'s suitor — the heart given direction: romance pursued sincerely, creative work made as an offering, the graceful gesture that says what words cannot.',
    'Moodiness, unrealistic promises, heart over head',
    'This is the classic romantic card — proposals, apologies, the poem left on the desk. But it is broader than courtship: it is any sincere offering made from feeling — the pitch written with love, the career chosen for meaning, the friendship maintained with deliberate grace. The Knight\'s pace matters: he does not charge; he approaches, cup held steady so nothing spills.',
    'Its shadow is the heart ruling everything: grand promises made in the feeling\'s name and broken in its absence, moodiness treated as weather nobody may question, or idealisation — loving the image of the person, not the person. It also warns of loving the offering more than the one it is offered to.',
    'Let the heart lead, but hand the map to the head: feel everything, verify something. Keep the promises small enough to keep them all. And notice the difference between devotion and performance — the Knight\'s cup is for the beloved, not the audience.',
  ),
  mc(
    'Cups', 13,
    ['Emotional mastery', 'Empathy', 'Intuition', 'Calm depth'],
    'A queen sits on a throne at the sea\'s edge, holding a lidded cup, her feet resting on the water. The Queen of Cups has mastered water inwardly: she feels everything and is ruled by nothing — empathy without drowning, intuition without superstition, depth that stays calm.',
    'Emotional overwhelm, martyrdom, porous boundaries',
    'She is the healer, the counsellor, the friend who hears what you actually said — and what you could not. The lidded cup is her secret: she opens her feeling deliberately, not automatically; her empathy is a gift she gives, not a leak she suffers. In readings she often signals the need to trust intuition, or the arrival of a genuinely compassionate person — or asks you to become one to yourself.',
    'Her shadow is the cup without a lid: absorbing every room\'s pain until she cannot find her own, martyrdom baptised as kindness, or intuition unchecked — every hunch obeyed as oracle. Its opposite is the shut cup: empathy rationed so strictly that love starves.',
    'Open the cup by choice: decide when to feel fully and when to guard the lid. Pour out as much as you take in — empathy needs an outflow or it stagnates. And treat your intuition as a wise advisor rather than a monarch: listen always, obey after checking.',
  ),
  mc(
    'Cups', 14,
    ['Emotional balance', 'Diplomacy', 'Calm authority', 'Mastery of feeling'],
    'A king sits on a throne amid waves that never wet him, holding a cup and sceptre, a fish on a chain around his neck. The King of Cups has mastered water outwardly: the diplomat of the deck — feeling deeply, deciding calmly, holding others\' storms without becoming one.',
    'Emotional manipulation, suppressed volatility, cold distance',
    'He is the negotiator who de-escalates the room, the leader who can deliver hard news without cruelty, the parent whose calm becomes the family\'s weather. The sea around his throne is rough and he is not — that is the entire teaching. In readings he signals mature emotional leadership: respond, do not react; lead with both truth and tact.',
    'His shadow is the two corruptions of calm: manipulation — feelings known so well they become levers — and suppression — the volcano so controlled it erupts in private or all at once. The distant version is also his shadow: calm mistaken for coldness until no one can reach him at all.',
    'Practise the pause between feeling and response — the King\'s whole craft lives in that gap. Speak the true thing with its kind wrapper intact. And keep one honest outlet for your own weather: a king who holds everyone\'s sea still needs a river of his own.',
  ),

  // ───────────────────────────── SWORDS · Air ─────────────────────────────
  mc(
    'Swords', 1,
    ['Clarity', 'Truth', 'Breakthrough', 'A new idea'],
    'A crowned sword stands upright through a wreath, mountains rising behind. The Ace of Swords is the mind\'s original gift — a blade of pure truth: the insight that cuts through fog, the words that finally say it, the decision that ends the circling.',
    'Confusion, harsh truth, words used as weapons',
    'The sword wears a crown of victory and cuts through its own wreath: truth crowned the moment it is spoken. This Ace appears with breakthroughs — the diagnosis finally named, the thesis finally clear, the sentence in the meeting that rearranges the room. It is the sharpest of the Aces: it gives not comfort but accuracy, and from accuracy, freedom.',
    'Its shadow is the blade misused: truth spoken with cruelty and filed under "honesty", clarity weaponised to win rather than to free, or the idea so sharp it cuts its own thinker — insight that destroys the peace it was meant to protect. Its opposite is the fog: the truth known and unsaid until it festers.',
    'Write the thought down before speaking it — the Ace rewards precision. Speak the true thing with the kindest true words you can find. And use it on your own self-deceptions first; the sword is safest in the hand that has cut its own fog.',
  ),
  mc(
    'Swords', 2,
    ['Stalemate', 'Difficult decision', 'Avoidance', 'Truce'],
    'A blindfolded figure sits with two crossed swords over her chest, the sea rough behind her. The Two of Swords is the mind in gridlock: a decision that must be made and is being not-made — eyes covered, arms crossed, heart quieted so it will not interfere.',
    'Indecision, information overload, detachment from feeling',
    'The blindfold is voluntary: nothing here prevents the choice but the chooser. This card appears in stalemates — two job offers, two homes, two versions of a future — where the person keeps gathering information to avoid the risk of wanting. The crossed swords hold the heart at bay; the cost of that is visible in the rough sea: pressure building while nothing moves.',
    'Its shadow is the permanent truce: indecision maintained so long it becomes a decision — the room not chosen, the letter not sent, the "keeping options open" that quietly closes them all. It can also tip into detachment: deciding everything with the mind while the blindfold stays on the heart, which is how clever people choose wrong.',
    'Remove the blindfold first: name what you actually want, before what you should want. Then decide with both organs — one clear thought and one honest feeling, taken together. And set a deadline; the Two of Swords dissolves the moment deciding becomes more comfortable than not-deciding.',
  ),
  mc(
    'Swords', 3,
    ['Heartbreak', 'Sorrow', 'Painful truth', 'Grief'],
    'Three swords pierce a stormy heart as rain falls. The Three of Swords is the mind wounding the heart — or the truth wounding both: heartbreak, betrayal, the sentence that cannot be unheard. It is the deck\'s purest image of sorrow, and it does not apologise.',
    'Recovery, release, suppressed grief finally felt',
    'Few cards are as feared and as necessary as this one. It appears when something true hurts: the affair discovered, the diagnosis spoken, the friendship ending in a sentence. The rain is part of the meaning — sorrow that falls, is felt, and passes, like weather. The card never says the pain was needless; it says it was real, and real things can be grieved and survived.',
    'Its shadow is the sword left in: grief refused — "I\'m fine" said over the heart until the wound closes around the blade — or its opposite, the identity of the wounded: wearing the three swords like medals, decades after the storm. Suppressed grief also lives here: the sorrow that leaks sideways into anger and illness.',
    'Let it rain: grieve on purpose, in a form that fits — tears, words, walking, ritual. Do not decide anything permanent from inside the storm; clarity returns with the weather. And when the rain slows, tell the story to someone safe; a heart pierced by truth heals faster in company than in silence.',
  ),
  mc(
    'Swords', 4,
    ['Rest', 'Recovery', 'Retreat', 'Truce'],
    'A knight lies in repose on a tomb in a church, three swords hanging above him, one beneath. The Four of Swords is the mind at rest — deliberate stillness after the storm of the Three: recovery, retreat, the strategic pause that saves the campaign.',
    'Burnout, restlessness, returning to battle too soon',
    'This card often appears to people who need it most and honour it least: the mind that believes rest is defeat. The knight is not dead — he rests on his own sarcophagus, which is the card\'s quiet joke: here lies the old campaign, let it. The three swords above are the troubles set aside; the one below is the one truth kept close. Rest here is not escape but repair.',
    'Its shadow is the truce violated: rising too soon because stillness feels like failure, returning to the fight at half strength and losing what rest would have won. Its opposite is the stall: retreat so prolonged it becomes hiding — the knight who will not rise because the tomb is warm.',
    'Schedule the rest before you need it, and treat it as part of the work — this card is strategy, not surrender. Guard the pause from guilt; the swords will keep. And rise when renewed, deliberately: the Four of Swords ends by ending.',
  ),
  mc(
    'Swords', 5,
    ['Defeat', 'Hollow victory', 'Betrayal', 'Pyrrhic win'],
    'A smirking figure gathers five swords as two defeated figures walk off into rough water. The Five of Swords is the mind at war: conflict won at a cost that empties the winning — the argument "settled" by destroying the relationship that held it.',
    'Reconciliation, making amends, learning from loss',
    'This is one of the hardest cards in the deck to receive and one of the most honest. It appears after conflicts where winning became the point: the lawsuit that cost the friendship, the office battle that cost the team, the needled remark that won the exchange and emptied the room. The victor\'s smirk is the tell — satisfaction that knows it went too far.',
    'Its shadow is the two paths of ruin: the scorched-earth victory, defended ever after ("they deserved it"), or the defeated posture worn forever — the person who lost the battle and then joined it, betraying others as they were betrayed. Both forget that the swords left behind on the ground can be returned.',
    'Count the true cost of the win: what did victory actually purchase? If the answer embarrasses you, make amends — returning one sword restores more than winning five. And next conflict, define victory before the fight: if it requires the other side destroyed, you have already lost.',
  ),
  mc(
    'Swords', 6,
    ['Transition', 'Moving on', 'Rite of passage', 'Leaving difficulty'],
    'A boatman ferries a veiled figure and a child across calm water toward a distant shore, six swords standing in the boat. The Six of Swords is the mind in passage: leaving the turbulence for quieter water — slow, necessary, and quieter than the storm it exits.',
    'Stagnation, unfinished business, resistance to change',
    'The water behind the boat is rough; ahead, it stills. This card appears in real transitions: the move after the divorce, the new city after the collapse, the calmer life after the storm — always carrying something of the old shore (the six swords) because leaving is not forgetting. The figures sit veiled and quiet: transition is mostly endured, not celebrated.',
    'Its shadow is the refusal to board: staying in the rough water because it is known, calling stagnation loyalty. Its opposite is the escape dressed as passage — fleeing so fast nothing is carried, so the same storm rebuilds on every new shore.',
    'Pack light but carry the lesson: what did the rough water teach? Let yourself travel quietly — this transition needs no announcement. And do not expect instant joy on the far shore; calm arrives before happiness does, and calm is already an enormous thing.',
  ),
  mc(
    'Swords', 7,
    ['Strategy', 'Deception', 'Getting away with something', 'Hidden motives'],
    'A figure slips away from a camp carrying five swords, two left standing behind, a patrol approaching in the distance. The Seven of Swords is the mind playing chess: strategy, secrecy, the clever route — sometimes justified resourcefulness, sometimes plain deception.',
    'Coming clean, exposed strategy, conscience calling',
    'Context is everything with this card. The same image reads as the tactician saving what can be saved from a losing battle — or as the thief sneaking off with what was never his. In readings it often points at a hidden agenda: yours, or someone\'s near you. It asks: is this strategy or deceit? And the difference is always in what the daylight would say.',
    'Its shadow is the habit of the shortcut: half-truths that compound, cleverness replacing character, or the paranoia of the sly — living as if everyone else is also stealing swords. Its opposite is self-deception: the person fooled is the one holding the stolen swords.',
    'Run the daylight test: would this plan survive being read aloud at the camp? If yes, proceed boldly — strategy is legitimate. If no, return the swords before the patrol arrives; coming clean costs far less now than exposure costs later. And keep cleverness in service of integrity — it makes a poor master and an excellent tool.',
  ),
  mc(
    'Swords', 8,
    ['Restriction', 'Self-imposed limits', 'Victim mentality', 'Feeling trapped'],
    'A bound figure stands among eight swords in muddy ground, a clear path and a distant castle free behind her. The Eight of Swords is the cage with the door open: restriction that is real-feeling and mostly self-administered — the mind convincing itself that the bindings are locked.',
    'Liberation, new perspective, taking power back',
    'Look closely at the card: her legs are free, the path is clear, the swords do not touch her. This is the geometry of learned helplessness — the job that "has no exit", the relationship that "cannot be left", the story "I could never". It appears most often for capable people in surmountable prisons, which is exactly why it is so painful: the warden and the prisoner share a face.',
    'Its shadow is the identity of the bound: victimhood so long rehearsed it becomes the person\'s address, or its opposite — the refusal to see real limits at all, charging at swords that genuinely stand. Both errors live in misreading the bindings.',
    'Test one binding: pull against the nearest one and discover it is cloth. Ask "what exactly stops me?" until the answer becomes specific — specific problems have doors. Take one small unbound step (the card\'s path is walked one pace at a time), and get one outside witness; every liberation story needs a friend who says "but you are free".',
  ),
  mc(
    'Swords', 9,
    ['Anxiety', 'Nightmares', 'Worry', '3 a.m. thoughts'],
    'A figure sits up in bed at night, head in hands, nine swords on the wall behind. The Nine of Swords is the mind at its worst hour — anxiety uncoiling at 3 a.m., dread rehearsing futures that have not happened, the cruel intelligence turned inward.',
    'Release, reaching out, help arriving, dawn',
    'This is the card of the racing mind: insomnia with a spreadsheet of everything that could go wrong. The swords on the wall are decorative — nothing has actually happened; the catastrophe is entirely internal and entirely experiential. In readings it often appears for people whose suffering is real but whose facts are few: the dread outrunning the evidence.',
    'Its shadow is the rumination loop: worry worn as vigilance — "if I fear it enough, it cannot surprise me" — or the silence of shame: suffering this private that no one is told, which keeps every night identical. Its rare opposite is the refusal to worry at all, which is not peace but another kind of escape.',
    'Do not solve your life at 3 a.m. — nothing true is decided in that hour; write the fear down and promise to examine it by daylight. Separate facts from forecasts: how many of the nine swords have actually cut? And tell someone. This card is the deck\'s strongest argument for saying "I have not been sleeping" out loud.',
  ),
  mc(
    'Swords', 10,
    ['Rock bottom', 'Painful ending', 'Betrayal', 'The worst is over'],
    'A figure lies pierced by ten swords on a barren plain — while a black storm lifts on the horizon and dawn waits behind it. The Ten of Swords is the suit\'s terminus: total collapse of a way of thinking, a betrayal complete, the ending so thorough it can only be survived.',
    'Recovery, inevitable dawn, rising from the ending',
    'It looks like the worst card in the deck, and in feeling it often is — but look at the sky: the storm is moving off; the sun is already returning. The Ten of Swords appears when something has ended completely: the partnership that cannot be rebuilt, the plan destroyed past patching. Its strange mercy is finality — the ten swords leave nothing half-dead; what is over is over, and that is what frees the hands.',
    'Its shadow is the death refused: trying to rise with all ten blades still in — defending, denying, rebuilding the same structure on the same betrayed ground. Its opposite is the premature resurrection: declaring "all fine" before the body of the thing has even been buried, which guarantees the sequel.',
    'Do not get up yet — first let the ending be an ending. Grieve the plan, name the betrayal, and extract the one lesson the ten swords came to teach (there is always exactly one). Then rise in daylight, with help; and build the next thing elsewhere, on different ground, with the lesson worn like armour.',
  ),
  mc(
    'Swords', 11,
    ['Curiosity', 'Vigilance', 'New ideas', 'Herald of truth'],
    'A young figure stands on windswept ground, sword up, clouds racing behind. The Page of Swords is the mind\'s messenger: a fresh idea, a message demanding honesty, the alert and watchful energy of someone learning to think — and to speak — for themselves.',
    'Gossip, all talk, defensiveness',
    'Pages bring beginnings, and this one brings beginnings of thought: the first honest analysis, the question no one dared ask, the new subject that has seized the mind. The Page of Swords is quick, observant and slightly jumpy — talent still learning its manners. In readings it signals news, new intellectual pursuits, or the need to watch a situation closely before judging it.',
    'Its shadow is the tongue outrunning the mind: gossip, hot takes, argument as sport — energy spent proving rather than understanding. It can also mark the defended Page: every question heard as an attack, vigilance so constant it exhausts everyone including its owner.',
    'Think before you speak, but do not stop speaking — the Page\'s gift is honest speech, still under construction. Fact-check your own hottest opinions first. And aim the sharpness at problems, never at people; the Page who learns that distinction becomes the Knight.',
  ),
  mc(
    'Swords', 12,
    ['Decisive action', 'Intellectual pursuit', 'Fast thinking', 'Charge of ideas'],
    'A knight charges headlong through a storm, sword raised, trees bent by wind behind him. The Knight of Swords is the mind in full gallop: decisive, brilliant, unstoppable — and sometimes unable to stop: the charge that wins the battle and ploughs through the war.',
    'Aggression, impatience, thoughtless words',
    'This is the card of the debater, the emergency surgeon, the crisis manager — anyone whose mind moves faster than the room. The Knight of Swords cuts through delay and dithering; he is at his best when speed is the virtue: deadlines, emergencies, decisions that rot if they wait. His danger is identical to his gift, one degree further: momentum without steering.',
    'His shadow is the charge as identity: winning every argument and losing every ally, speed worshipped until thoroughness becomes contempt, words fired at people who needed questions. The storm he rides also rages inside — impatience as a permanent internal weather.',
    'Keep the charge, add the compass: decide fast, but check direction first. Before the big strike, one breath — the card\'s whole lesson lives in that pause. And after the battle, circle back to the people trampled by the speed; the Knight\'s victories count only if anyone is still beside him at the end.',
  ),
  mc(
    'Swords', 13,
    ['Clear boundaries', 'Independence', 'Honest perception', 'Discernment'],
    'A stern queen sits on a bare throne, sword raised in one hand, the other extended — clouds part behind her. The Queen of Swords has mastered air inwardly: she sees clearly, thinks independently, and tells the truth without cruelty or apology. No one fools her twice.',
    'Coldness, bitterness, the unforgiving mind',
    'She is the judge of the court, the widow who rebuilt alone, the friend whose honesty you dread and need in equal measure. The Queen of Swords has usually paid full price for her clarity — the card often carries a backstory of loss survived through truth-telling. Her sword is raised for discernment, not attack; her extended hand offers help that does not humiliate. In readings she asks: are you seeing clearly, or comfortably?',
    'Her shadow is the heart locked in the armour of honesty: bitterness dressed as realism, every new person tried for the crimes of an old one, or coldness wielded as revenge — "I see through you" said like a sentence. Its opposite is the clarity rented: seeing the truth and choosing the comfortable story anyway.',
    'Honour the truth you already see — name it once, cleanly. Keep the hand extended: clarity without warmth is only a sharper loneliness. And let each new person be tried for themselves; the Queen\'s gift dies the moment the past gets to vote on the present.',
  ),
  mc(
    'Swords', 14,
    ['Intellectual authority', 'Truth', 'Ethics', 'Final judgement'],
    'A king on a stone throne raises a sword toward the sky, a butterfly crown above him, trees bent at his back. The King of Swords has mastered air outwardly: the authority of reason — judgement delivered with ethics, power governed by principle, truth spoken as law.',
    'Cold manipulation, cruel logic, rigidity',
    'He is the supreme court, the chief surgeon, the leader whose decisions are feared precisely because they are fair. The King of Swords rules with the mind as conscience: precedent, evidence, principle — not mood, not favour. The butterfly above him is the card\'s hope: even this hard king serves transformation. In readings he signals the need for objective judgement, ethical leadership, or counsel from someone incorruptible.',
    'His shadow is the crown without the conscience: logic weaponised — "the numbers say so" deployed as moral insulation — cruelty filed under consistency, or rigidity so total that mercy reads as error. The corrupted version is the manipulator who argues others into their own cages.',
    'Decide on principle, not on preference: write the rule you would want applied to you, then apply it. Pair every hard verdict with mercy\'s question — "what would the truth look like if I also cared?". And keep the butterfly close: the King\'s final test is whether his justice transforms people or merely sorts them.',
  ),

  // ─────────────────────────── PENTACLES · Earth ──────────────────────────
  mc(
    'Pentacles', 1,
    ['New opportunity', 'Seed of wealth', 'Tangible offer', 'Prosperity'],
    'A hand offers a golden pentacle above a garden path, lilies and roses in bloom, an archway leading to the mountains. The Ace of Pentacles is the material world\'s original gift — a real opportunity with roots: the job offer, the seed money, the healthy start, the door that opens onto a garden.',
    'Missed opportunity, poor planning, golden handcuffs',
    'Of the four Aces this one is the most concrete: it rarely points at a feeling or an idea — it points at a thing that exists. A contract, a property, a chance to invest in body or skill. The card\'s image insists on patience too: the garden grows slowly, and the archway leads somewhere, but only for walkers. In readings it blesses new financial, health and career beginnings.',
    'Its shadow is the seed never planted: opportunity admired, analysed, and expired — or its opposite, the seed grabbed and gulped: quick money, shortcut wealth, the offer signed without reading the garden\'s map. It can also warn of the golden cage: opportunity that prospers the wallet and imprisons the life.',
    'Say yes, then plant properly: read the offer, plan the garden, set the first month\'s routine. Invest part of the gift immediately — the Ace multiplies through stewardship. And check that this opportunity grows a life you actually want, not just a bigger pot.',
  ),
  mc(
    'Pentacles', 2,
    ['Balance', 'Adaptability', 'Juggling priorities', 'Flexibility'],
    'A figure dances while two pentacles loop in an endless ribbon, ships riding high waves behind. The Two of Pentacles is the material world in motion: balancing budget and time, work and life, the constant gentle juggling that keeps a modern life airborne.',
    'Overwhelm, dropping the ball, disorganisation',
    'Nothing here is static — the ships ride waves, the pentacles never stop moving, and the figure is dancing, not struggling. This card appears for the freelancer with three clients, the parent with two jobs, anyone keeping several plates spinning and mostly enjoying it. Its message: balance is not a state you reach but a rhythm you maintain — like riding the ship\'s wave, it only works in motion.',
    'Its shadow is the crash: one plate too many, everything wobbling, the ball dropped not from incapacity but from refusing to choose what matters. Its opposite is the rigidity that cannot jiggle: holding one inflexible schedule while the sea changes, until the sea wins.',
    'Audit the juggle: which two pentacles actually matter this season? Put one thing down honestly rather than dropping three silently. Build slack into the loop — the card\'s ships survive because they ride waves, not because the sea is flat. And check in weekly; balance maintained monthly is already wreckage.',
  ),
  mc(
    'Pentacles', 3,
    ['Teamwork', 'Craftsmanship', 'Skill recognised', 'Building together'],
    'A stonemason consults his plans in a cathedral while two figures hold the measuring line. The Three of Pentacles is the material world dignified: skilled work recognised, collaboration between craftsman, architect and patron — the blueprint finally meeting the hands.',
    'Lack of skill, poor planning, conflict in collaboration',
    'This card honours mastery in action: the surgeon whose team moves like one organism, the renovation where every trade respects the plan, the project where skill — not politics — gets the deciding vote. It often appears around work: promotions earned on craft, studies completing, collaborations that need each person\'s exact competence. The cathedral is the point: what is being built is bigger than any worker, and everyone knows it.',
    'Its shadow is the crew without the blueprint: enthusiasm replacing skill, meetings replacing masonry — or the reverse, the lone expert who cannot hand anything to anyone, and so builds porch after porch instead of the cathedral.',
    'Bring the plan to the people: show your work, name your standards, invite correction early — the Three favours those who check the measurements before the wall rises. Honour every role on the site, including the quiet ones. And when your skill is recognised, bank it: reputation is this card\'s real currency.',
  ),
  mc(
    'Pentacles', 4,
    ['Security', 'Saving', 'Control', 'Holding on'],
    'A crowned figure sits hugging a pentacle, one under foot, one on his head, one in his arms — the city beyond him. The Four of Pentacles is the material world held tight: security achieved, resources guarded, and the quiet question of what the guarding is costing.',
    'Greed, materialism, generosity blocked',
    'This figure has won the suit\'s first stability — money saved, position secured, walls thick — and responds by clutching everything: coin underfoot (the past), on the crown (ambition), in the arms (the present). The card never says saving is wrong; it asks whether the hands have forgotten how to open. In readings it appears with inheritances guarded, salaries never discussed, gifts that cannot be received, lives organised entirely around not losing.',
    'Its shadow is the hoard: wealth kept as identity until spending feels like bleeding, generosity treated as threat, or its opposite — the leak: resources scattered with no grip at all, spending as self-soothing, the opposite failure that also ends in the empty city.',
    'Run the open-hand audit: what would actually happen if you spent, gave or shared ten percent more? Separate security from fear — the first has a number, the second never does. And practise small loosenings: a gift, a treat, an investment in people; the Four\'s freedom lives at exactly the speed of its grip.',
  ),
  mc(
    'Pentacles', 5,
    ['Hardship', 'Poverty', 'Exclusion', 'Tough times'],
    'Two figures hobble through snow past a lit stained-glass window — warmth, help and sanctuary one knock away, and unclaimed. The Five of Pentacles is the material world\'s winter: financial loss, illness, exclusion, the season when the ground gives nothing back.',
    'Recovery, support accepted, the warmth nearby',
    'One of the most compassionate cards in the deck. The five coins are damaged — loss has genuinely happened; this is not hypochondria of the wallet. But the card\'s whole geometry is the window: help, community and shelter exist within reach, and the figures pass them by, eyes down. In readings it often appears to people who underestimate the support around them — or to those genuinely in winter, promising that the season, not the sentence, is what this is.',
    'Its shadow is the winter internalised: shame that refuses every door — "I cannot ask, I cannot be seen like this" — which lengthens the snow far past its weather. Its opposite is the chronic crisis: hardship so habitual it has become identity, the loss re-staged each season because it is the only story on file.',
    'Knock on the window: name the hardship to one person this week — the card\'s whole mercy is that the door is near. Take the smallest available help gratefully; winter ends through doors, not pride. And do the practical triage: one bill, one meal, one night\'s sleep — Five-of-Pentacles winters are survived in single steps.',
  ),
  mc(
    'Pentacles', 6,
    ['Generosity', 'Charity', 'Fair exchange', 'Giving and receiving'],
    'A merchant weighs his scales, giving to two kneeling figures — the scales level, the exchange dignified. The Six of Pentacles is the material world shared: generosity with judgement, help given freely, the healthy circulation of wealth, time and knowledge.',
    'Strings attached, debt, power imbalance',
    'This is giving done right: the giver stands, the gift flows, the scales stay level — the merchant gives what is needed, not what is convenient, and keeps no ledger of souls. In readings it appears with salary fairness, mentorship, philanthropy, loans between friends — any flow of resources. It speaks to both poles: if you have, give; if you lack, receive — the card dignifies each.',
    'Its shadow is the gift as leash: generosity deployed for loyalty, charity that purchases obedience, or its bitter twin — the chronic receiver whose need has become a profession. Both break the scales; the card\'s balance is the whole point.',
    'Give where it moves you, without purchase — and check, once, that it truly moves you and not your image. Receive without bankrupting yourself in shame; accepting help completes the circuit. And keep the scales level over time: if you always give, or always take, the relationship is quietly becoming the shadow.',
  ),
  mc(
    'Pentacles', 7,
    ['Patience', 'Long-term investment', 'Assessment', 'Slow growth'],
    'A farmer leans on his hoe, resting his chin on his hand, watching seven pentacles ripen on the vine. The Seven of Pentacles is the material world slowed down: the mid-point audit — growth is real, but slow, and the waiting itself is now the work.',
    'Impatience, poor returns, reaping the wrong crop',
    'This card is the antidote to the quarter-by-quarter world. Something has been planted — a career, a body of work, a pension of any kind — and it is growing, visibly, but not yet ripe. The farmer\'s pose is the message: assessment, not action. In readings it asks: is the crop worth the season it still needs? If yes, keep tending; if no, this is precisely the moment to change seeds, before more seasons are spent.',
    'Its shadow is the premature harvest: ripping up the plant to check the roots, abandoning the field one season early, or its opposite — the dead crop tended forever: years more poured into an investment — financial, emotional, professional — that everyone but the farmer can see will never ripen.',
    'Audit honestly: would I plant this again today? If yes, water and wait — schedule the next review, not the next panic. If no, pull it now; the seven pentacles already grown are yours to keep. And remember this card\'s pace: most ruin in the material world comes from impatience, not incompetence.',
  ),
  mc(
    'Pentacles', 8,
    ['Mastery', 'Apprenticeship', 'Diligence', 'Craft'],
    'A craftsman sits carving pentacle after pentacle, each coin more refined than the last, the finished ones nailed in a row. The Eight of Pentacles is the material world perfected through repetition: skill built coin by coin — the disciplined, unglamorous work that mastery is actually made of.',
    'Perfectionism, lack of focus, cutting corners',
    'This is the card of the ten thousand hours: language drills, scales on the piano, the portfolio built one careful piece at a time. No audience, no shortcut — just the artisan and the work. In readings it blesses study, training, and any season of doing the reps; it promises that the coin currently being carved is worth carving well, even if no one ever sees it.',
    'Its shadow is the craft curdled: perfectionism that never ships — the eighteenth draft of chapter one — or its opposite, the corner-cut version: work done at the minimum, skills sampled instead of built, the row of coins replaced by a drawer of sketches. Both abandon the craftsman\'s one asset: trust in slow accumulation.',
    'Do the reps: choose one skill and give it a daily hour — the Eight promises returns on exactly this currency. Finish the coin before judging it; perfectionism is allowed only after completion. And keep the finished ones visible — the row of nailed pentacles is how motivation survives winter.',
  ),
  mc(
    'Pentacles', 9,
    ['Self-sufficiency', 'Luxury', 'Harvest', 'Discipline rewarded'],
    'A well-dressed figure rests in a lush garden, a falcon on her gloved hand, nine pentacles ripe on the vine. The Nine of Pentacles is the material world enjoyed: the harvest of long discipline — financial independence, a beautiful and ordered life, competence as quiet luxury.',
    'Isolation, comfort-addiction, workaholism',
    'This is the card of earned ease: the garden did not bloom by accident — every vine was trained, and now the figure can rest inside abundance with a hawk on her wrist: control, leisure and skill in one frame. In readings it often confirms that the long work is paying — or invites you to actually receive its fruits instead of re-investing every reward forever.',
    'Its shadow is the garden walled too high: self-sufficiency so complete it becomes isolation, luxury curdling into mere insulation from life, or its shadow-twin — the harvest that never gets tasted: the workaholic whose ninth pentacle funds a garden they never enter.',
    'Receive on purpose: take one real pleasure from what you have built — a season, a room, a day off that is not disguised work. Keep the garden door open: abundance shared is abundance completed. And let the falcon hunt occasionally — skill kept sharp, comfort kept honest.',
  ),
  mc(
    'Pentacles', 10,
    ['Legacy', 'Inheritance', 'Family wealth', 'Long-term success'],
    'An elder in a rich archway surveys his family — child, dogs, generations — ten pentacles arrayed like a coat of arms. The Ten of Pentacles is the material world completed: not just wealth, but legacy — a structure (family, business, institution) that outlasts its founder.',
    'Family disputes, unstable foundations, wealth without warmth',
    'Where the Nine enjoys privately, the Ten institutionalises: estates, endowments, family businesses, the name above the door. This card asks about the long arc — what you are building that will stand when you no longer hold it. It includes the non-financial legacies: values, traditions, the unspoken rules of a household. In readings it blesses generational projects and asks what your great-grandchildren will inherit beyond the accounts.',
    'Its shadow is the legacy as cage: inheritance fought over, the family business as a prison, wealth that replaces warmth — the cold archway where everyone is provided for and no one is known. Its opposite is the squandered start: the tenth pentacle spent by the second generation, the foundation poured on sand.',
    'Ask the generational question: what am I building that does not need me to stand? Write the values into the will, not just the assets. Tend the family\'s warmth as carefully as its accounts — the Ten is complete only when the people under the archway love each other. And teach the heirs the craft, not just the password.',
  ),
  mc(
    'Pentacles', 11,
    ['Student of the material', 'New opportunity', 'Ambition', 'Learning'],
    'A young figure studies a golden pentacle in a flowering field, hills behind. The Page of Pentacles is the material world\'s student: a new offer to learn or earn — the scholarship, the first payslip, the apprenticeship, the body finally taken seriously.',
    'Procrastination, get-rich-quick, lack of follow-through',
    'Pages bring beginnings, and this one brings beginnings in earth: the course enrollment, the savings account opened, the business plan sketched in good faith. The Page of Pentacles has the suit\'s trademark patience in seed form: he looks at the coin the way a farmer looks at soil — as something that responds to care measured in seasons. In readings it is one of the best omens for study, money and new work.',
    'Its shadow is the student who never opens the book: plans admired and unplanted, courses bought and unwatched, or its twin — the get-rich-quick corruption: the coin pursued as shortcut, hustle culture, the garden expected by Friday. Both abandon the Page\'s real gift: patience at the start.',
    'Begin the apprenticeship: enrol, save the first amount, book the session — the Page\'s power is entirely in starting. Give the new thing a season before judging results; earth answers slowly and then all at once. And write down what you are learning as you go — the Page who keeps notes becomes the master.',
  ),
  mc(
    'Pentacles', 12,
    ['Methodical progress', 'Responsibility', 'Routine', 'Reliability'],
    'A knight sits motionless on a stationary horse, contemplating a pentacle in his hand. The Knight of Pentacles is the material world made steady: the slowest knight and the surest — progress through routine, duty without drama, the marathon runner of the court.',
    'Stubbornness, boredom, being stuck in routine',
    'While the other knights charge, this one has stopped — because his method works and he knows it. He is the card of the faithful employee of twenty years, the athlete\'s training calendar, the mortgage paid off on schedule. Nothing about him is exciting; everything about him is reliable. In readings he blesses slow-and-steady plans and sometimes asks whether the routine serves the goal, or has become the goal.',
    'His shadow is the routine as fortress: change refused because "we have always done it this way", reliability so prized that life becomes one grey circuit, or its opposite — the stalled horse: routine performed while the world changes around it, effort mistaken for progress.',
    'Keep the method — it is rare and valuable — but schedule its review: once a season, ask whether this routine still leads to the pentacle. Add one small variation to break the grey without breaking the method. And remember that his real gift is finish lines; point the steady horse at one worth reaching.',
  ),
  mc(
    'Pentacles', 13,
    ['Nurturing provider', 'Practical warmth', 'Abundance at home', 'Care'],
    'A queen gazes at a golden pentacle on her lap, a rabbit at her feet, roses climbing her throne. The Queen of Pentacles has mastered earth inwardly: she makes abundance grow — money, meals, gardens, people — and wraps material care in genuine warmth.',
    'Self-neglect, smothering, material focus over self',
    'She is the card of the provider in the best sense: the parent whose home runs on love and a spreadsheet, the host whose table heals, the manager whose team never burns out under her watch. The rabbit at her feet is the card\'s signature — life flourishes around her without force. In readings she asks you to care for body, home and resources the way you care for people you love.',
    'Her shadow is the care that forgets the carer: everyone fed, garden perfect, accounts balanced — and the queen herself running on fumes; or its opposite, the material world managed as a substitute for warmth: the perfect house that no one is comfortable in, provision standing in for presence.',
    'Put yourself on the care list: the Queen\'s first discipline is her own rest and body. Keep warmth in the system — a home is provision plus presence. And let the garden feed you too: receive the comfort you create, or the card\'s abundance becomes just another job.',
  ),
  mc(
    'Pentacles', 14,
    ['Material mastery', 'Provider', 'Empire builder', 'Steady success'],
    'A king in a vineyard throne holds a pentacle like a sceptre, castle and bulls behind him. The King of Pentacles has mastered earth outwardly: the established provider — wealth built slowly, generously shared, administered with the patience of orchards rather than the hunger of startups.',
    'Greed, workaholism, stubborn materialism',
    'He is the family patriarch, the owner whose business outlasts competitors by decades, the executive whose calm in a crisis comes from deep reserves. Unlike the entrepreneur\'s flash, his empire is grown like grapes: season by season, pruned honestly. In readings he signals financial mastery, dependable leadership, or the arrival of a genuinely solid mentor — and he asks what your resources are ultimately for.',
    'His shadow is the empire as identity: wealth accumulated past all use, generosity rationed by ledger, work consuming the family the wealth was meant to shelter; or the rigid version — "the way we have always done it" enforced like law, the vineyard defended long after the soil has changed.',
    'Administer like a steward, not an owner: resources grow when they are tended and shared in the right seasons. Decide what the wealth is for — family, freedom, beauty, legacy — and let that answer steer the empire. And leave the vineyard sometimes: the King\'s final mastery is knowing the money can sit without him.',
  ),
]

export function getMinorCard(id: string): MinorArcana {
  const card = MINOR_ARCANA.find((c) => c.id === id)
  if (!card) throw new Error(`Unknown Minor Arcana id: ${id}`)
  return card
}

/** Any card of the full 78-card deck: the 22 Majors or the 56 Minors. */
export type AnyCard = MajorArcana | MinorArcana

export function isMinor(card: AnyCard): card is MinorArcana {
  return 'suit' in card
}

/**
 * Resolve any card of the full deck by its stable id.
 * Major Arcana use their number as id ('0'–'21'); Minors use 'cups-01' etc.
 */
export function getAnyCard(id: string): AnyCard | undefined {
  if (/^\d+$/.test(id)) {
    const num = Number(id)
    if (num >= 0 && num <= 21) return MAJOR_ARCANA[num]
    return undefined
  }
  return MINOR_ARCANA.find((c) => c.id === id)
}

/** The full 78-card deck: 22 Majors followed by the 56 Minors. */
export const ALL_TAROT_CARDS: AnyCard[] = [...MAJOR_ARCANA, ...MINOR_ARCANA]
