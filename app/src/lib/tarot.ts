export interface MajorArcana {
  num: number
  roman: string
  name: string
  keywords: string[]
  meaning: string
  /** Results-voice, surface-level reading shown on the main page; the library keeps the deep layers */
  surface: string
  shadow: string
  /** Deeper layer: symbolism and how the energy tends to show up in a life */
  detail: string
  /** The shadow side, fully explained */
  shadowDetail: string
  /** Practical guidance for working with this card's energy */
  guidance: string
}

export const MAJOR_ARCANA: MajorArcana[] = [
  {
    num: 0,
    roman: '0',
    name: 'The Fool',
    keywords: ['Beginnings', 'Spontaneity', 'Faith', 'Leap of faith'],
    meaning:
      'The Fool marks the start of a journey. You are being called to step into the unknown with an open heart, trusting that the universe will catch you. Innocence, wonder and raw potential define this energy.',
    surface:
      'You are someone who begins. New places, new projects, new versions of yourself — you step toward what you cannot yet see and trust the ground to appear. People may call it recklessness. Mostly it is an instinct the rest of the deck quietly envies — though beginnings, as you know, are easier than stayings.',
    shadow: 'Recklessness, naivety, fear of the unknown',
    detail:
      'The Fool is numbered zero because it sits outside the whole system of the Major Arcana — it is pure potential before anything has been defined. In a birth chart it describes someone who keeps finding new beginnings: careers started from scratch, moves to unknown places, leaps that make no sense on paper and yet land. The dog at the Fool’s heels is both warning and companion — instinct nipping at you when the cliff edge is near, but loyalty keeping you company as you step off it anyway. People strongly marked by the Fool often feel most alive at the start of things and most restless at the end of them.',
    shadowDetail:
      'Its shadow is the leap taken with no landing planned — impulsiveness mistaken for courage, promises made that the wind has no intention of keeping. When the Fool turns dark it becomes the eternal beginner who starts a hundred roads and finishes none, or the naivety that trusts where verification was required.',
    guidance:
      'Work with the Fool by honouring beginnings: give yourself permission to be a novice and to begin badly. Pair every leap with one small practical anchor — a savings buffer, a return ticket, a deadline — so that faith has something solid to stand on. Ask regularly: is this a true calling or just the thrill of the edge?',
  },
  {
    num: 1,
    roman: 'I',
    name: 'The Magician',
    keywords: ['Manifestation', 'Willpower', 'Resourcefulness', 'Skill'],
    meaning:
      'The Magician holds all the tools of the four suits and knows how to use them. This is the card of pure creative will — you already have everything you need to turn ideas into reality.',
    surface:
      'You are the person who makes things happen. Tell you an idea is impossible and you are already holding the tools to prove otherwise, because you rarely wait for permission or perfect conditions. Your gift is focus: when you truly decide, reality tends to adjust. The open question is what — and whom — you choose to point that will at.',
    shadow: 'Manipulation, trickery, untapped potential',
    detail:
      'The Magician stands with one hand raised to the sky and one pointing to the earth — “as above, so below” — the eternal translator between vision and matter. On the table before him lie the wand, cup, sword and pentacle: will, feeling, thought and the material world. In a birth chart this is the person who makes things happen simply by deciding they will; who learns quickly, adapts fast, and can turn a handful of unrelated skills into a livelihood. The Magician’s gift is focus: energy directed, not scattered.',
    shadowDetail:
      'Its shadow is the con artist and the dabbler. Manipulated, the Magician becomes someone who uses insight into others as a lever rather than a bridge — charm deployed to get, not to give. In its milder form it is the curse of scattered talent: many tools on the table, none ever picked up.',
    guidance:
      'Work with the Magician by naming one intention at a time and giving it your full current. Inventory your actual tools — skills, contacts, time — before believing you lack anything. And set yourself an integrity test for every influence you wield: would I still do this if the other person could see my full hand?',
  },
  {
    num: 2,
    roman: 'II',
    name: 'The High Priestess',
    keywords: ['Intuition', 'Sacred knowledge', 'Inner voice', 'Mystery'],
    meaning:
      'The High Priestess guards the veil between worlds. She invites you to trust your intuition and the quiet knowing beneath the surface of things. Not everything can be learned from books — some truths are felt.',
    surface:
      'You know things before you can explain how. Rooms speak to you, silences most of all, and your first read of people is almost always the right one. You do not need everything said out loud — in fact, you trust the unsaid more. The world calls it intuition; you call it Tuesday.',
    shadow: 'Secrets, withdrawal, ignoring your inner voice',
    detail:
      'She sits between the black pillar of severity and the white pillar of mercy, behind a veil decorated with pomegranates and palms — the seen and the unseen held in perfect balance. The scroll in her lap, Torah partly covered, reminds us that some knowledge must remain half-hidden to stay true. In a birth chart the High Priestess marks someone who reads rooms, silences and subtexts faster than words; who dreams vividly and often knows things before they happen; who needs solitude the way others need company. Her wisdom arrives quietly and rarely announces itself as wisdom.',
    shadowDetail:
      'Its shadow is the keeper of secrets who forgets how to be known — withdrawal that hardens into isolation, intuition suppressed until it turns into anxiety, or knowledge used as quiet leverage. It can also appear as endless receptivity: feeling everything, deciding nothing.',
    guidance:
      'Work with the High Priestess by treating intuition as data, not noise: write down what you sense before events confirm or deny it, and review the record. Protect a private inner life deliberately — a practice, a journal, a door that closes — and remember that the veil parts for the balanced, not the busy.',
  },
  {
    num: 3,
    roman: 'III',
    name: 'The Empress',
    keywords: ['Abundance', 'Nurturing', 'Creativity', 'Sensuality'],
    meaning:
      'The Empress is the archetype of creation and care. She rules fertility of all kinds — projects, relationships, ideas — and reminds you that beauty and comfort are forms of wisdom too.',
    surface:
      'Things grow around you. People, projects, gardens, ideas — put something in your care and it thrives, often beyond what anyone, including you, planned. You understand that comfort and beauty are not luxuries but intelligence. Your lesson lives in the difference between tending and carrying.',
    shadow: 'Smothering, dependence, creative blocks',
    detail:
      'She reclines in a living room of wheat and forest, her crown of stars borrowed from the sky, the Venus symbol etched on her shield — love as the fundamental technology of growth. In a birth chart the Empress describes the person through whom things flourish: gardens, teams, children, businesses, ideas placed in their care grow faster than they should. She governs the senses as intelligence — taste, touch, appetite — and treats pleasure not as indulgence but as information about what is healthy.',
    shadowDetail:
      'Its shadow is the smother — care that becomes control, abundance that becomes hoarding or dependence, creativity stalled by perfectionism or by needing to be needed. It can also show as neglect of self: the garden watered for everyone except the gardener.',
    guidance:
      'Work with the Empress by creating conditions rather than forcing outcomes: feed the soil, then let the plant do its work. Schedule beauty the way you schedule obligations — it is maintenance, not luxury. And keep one corner of your life that is yours alone to tend, where you receive rather than give.',
  },
  {
    num: 4,
    roman: 'IV',
    name: 'The Emperor',
    keywords: ['Authority', 'Structure', 'Stability', 'Fatherhood'],
    meaning:
      'The Emperor builds kingdoms from stone and law. He represents order, discipline and the protective use of power — the ability to create stability for yourself and for others.',
    surface:
      'You are the anchor. When everything sways, people look to you — and you are already holding the plan, the budget and the door. Order is not a cage for you; it is how you love. The growth edge is letting life improvise once in a while, and letting others see you be wrong.',
    shadow: 'Tyranny, rigidity, control issues',
    detail:
      'He sits on a throne carved with rams’ heads — Aries, the first spark of the zodiac — holding orb and ankh, the world and the life that sustains it, dressed in iron armour beneath his robes: even at rest, he is armoured for duty. In a birth chart the Emperor marks the natural anchor of any group — the one who makes the plan, keeps the ledger, holds the door. His gift is structure: he turns chaos into systems that outlast moods, and he understands that real authority is rented daily through service, not owned once through title.',
    shadowDetail:
      'Its shadow is the tyrant — control mistaken for safety, rules kept long after their reason has died, authority used to silence rather than shelter. In softer form it becomes rigidity: the inability to improvise, the fear beneath every inflexible plan, the father who cannot say he was wrong.',
    guidance:
      'Work with the Emperor by building one structure that serves life rather than cages it — a budget, a routine, a constitution for your household — and reviewing it on schedule. Practise saying “I was wrong” out loud; it is the cheapest proof that your authority is real. And remember: the throne exists to hold the kingdom, not the other way around.',
  },
  {
    num: 5,
    roman: 'V',
    name: 'The Hierophant',
    keywords: ['Tradition', 'Spiritual wisdom', 'Teaching', 'Belief'],
    meaning:
      'The Hierophant is the bridge between the divine and the everyday. He honours lineage, ritual and shared wisdom — asking you to find the sacred in established paths, or to consciously forge your own.',
    surface:
      'You carry the wisdom of the path — the traditions, methods and rituals that actually work — and people seek you out precisely because you know how things are done. You honour what has been handed down, and you know exactly which rules deserve keeping. Somewhere in you also lives the question of which sacred things you were meant to remake.',
    shadow: 'Dogma, conformity, rebellion against structure',
    detail:
      'Between two pillars he raises the triple cross of blessing, two acolytes kneeling before him — the chain of transmission from mystery to student. His is the wisdom of institutions: religions, schools, crafts, traditions that carry distilled experience across centuries. In a birth chart the Hierophant marks the teacher, the mentor, the keeper of methods; someone who finds meaning in lineage and transmits what they have learned almost by reflex. He also governs the middle path between blind conformity and empty rebellion: honouring the form until the spirit inside it is strong enough to walk alone.',
    shadowDetail:
      'Its shadow is dogma — the letter worshipped while the spirit suffocates, tradition kept as a cage rather than a bridge, or its mirror image: reflexive rejection of all structure, which leaves the rebel with nothing solid to build on.',
    guidance:
      'Work with the Hierophant by apprenticing yourself to something older than you — a tradition, a craft, a lineage of thought — long enough to absorb its depth before editing it. Teach what you know; transmission completes the circuit. And when you inherit a rule, ask what problem it was built to solve before you keep or break it.',
  },
  {
    num: 6,
    roman: 'VI',
    name: 'The Lovers',
    keywords: ['Love', 'Harmony', 'Choices', 'Alignment'],
    meaning:
      'The Lovers speak of union — with another, with yourself, with your values. Every deep connection is a mirror, and every choice made from love shapes the architecture of your life.',
    surface:
      'You are built for connection, and you know it — your relationships are never background; they are the main text. Every deep bond teaches you something about who you actually are, and every big choice you make is really a question of what you love. Alignment is your compass word.',
    shadow: 'Imbalance, disharmony, misaligned values',
    detail:
      'A man and woman stand beneath the Tree of Knowledge and the Tree of Life, an angel of air blessing the space between them while a mountain rises in the distance — the road every honest relationship must eventually climb. Crucially, this is not only the card of romance: it is the card of choice, of values made visible. In a birth chart the Lovers describe someone who grows through relationship — who becomes themselves most clearly in the mirror of another — and for whom every significant choice is really a question of alignment: does this match what I actually love?',
    shadowDetail:
      'Its shadow is the wrong union — relationships kept from fear of emptiness, choices made to please the mirror instead of honour it, or the constant splitting of the self: one life shown to others, another lived in secret. Its imbalance is always a values problem wearing a costume of a love problem.',
    guidance:
      'Work with the Lovers by writing your actual values down and testing your big choices against the list, not against the moment’s weather. Treat relationships as curriculum: what is this bond teaching, and am I learning or repeating? And when torn between two paths, ask which one you would defend even if no one ever applauded it.',
  },
  {
    num: 7,
    roman: 'VII',
    name: 'The Chariot',
    keywords: ['Determination', 'Willpower', 'Triumph', 'Direction'],
    meaning:
      'The Chariot is victory through focused will. Two sphinxes pull in opposite directions — only your mastery of opposing forces moves you forward. Discipline turns ambition into arrival.',
    surface:
      'You win by direction, not by talent. Give you two opposing forces — two jobs, two loyalties, two versions of the future — and you will harness them into motion while others are still debating. Your will is real horsepower. The craft is choosing fewer destinations so you can actually arrive.',
    shadow: 'Aggression, scattered energy, loss of control',
    detail:
      'A warrior stands in a square chariot hung with stars, no reins in his hands — he drives by will alone. The black and white sphinxes are the twin engines of every human life: instinct and reason, fear and appetite, what pulls toward and what pulls away. In a birth chart the Chariot marks the person who wins not by talent but by vector — who picks a direction and out-endures everyone. Life keeps handing them opposing forces to unify: two careers, two homes, two loyalties. Their gift is that conflict, held firmly, becomes horsepower.',
    shadowDetail:
      'Its shadow is the runaway — willpower curdled into aggression, control held so tightly that everything it touches resents it, or its opposite: scattered energy firing in six directions and arriving nowhere. The crashed chariot is always a story about unowned inner conflict projected onto the road.',
    guidance:
      'Work with the Chariot by choosing fewer battles and winning them completely; define the destination in one sentence before you harness the horses. Notice which sphinx you have been starving — the disciplined one or the instinctive one — and feed it deliberately. And remember: the warrior’s real armour is certainty of purpose, not hardness.',
  },
  {
    num: 8,
    roman: 'VIII',
    name: 'Strength',
    keywords: ['Courage', 'Inner strength', 'Patience', 'Compassion'],
    meaning:
      'Strength is the quiet power of the soul. The woman does not kill the lion — she befriends it. This card asks you to meet your wildness with gentleness and your obstacles with steady, patient courage.',
    surface:
      'Your power is the quiet kind, and it is underrated by everyone except the people who have tested it. You do not overpower your obstacles — you outlast them, gently. You have made peace with the wild part of yourself, which is exactly why it obeys you.',
    shadow: 'Self-doubt, raw emotion, weakness under pressure',
    detail:
      'A woman in white calmly closes the jaws of a lion, the infinity sign floating above her head — not the brief explosion of force but the endless one. In a birth chart Strength marks someone whose real power is softness held steady: the parent who never raises their voice and is never disobeyed, the negotiator who wins by refusing to flinch, the person who has made peace with their own appetite and is therefore no longer ruled by it. This is mastery of the inner animal — desire, temper, fear — achieved not by chains but by relationship.',
    shadowDetail:
      'Its shadow is the two failures of courage: force — domination, shouting, the tantrum dressed as strength — and collapse — self-doubt so chronic that every challenge is met with apology. Both are the same wound: the inner animal feared instead of befriended.',
    guidance:
      'Work with Strength by practising the long exhale in the exact moment you want to strike — the pause between impulse and action is where this card lives. Make peace with one appetite consciously (rest, food, anger, comfort) rather than warring with it forever. And measure your power not by what you can break but by what you can hold gently without tiring.',
  },
  {
    num: 9,
    roman: 'IX',
    name: 'The Hermit',
    keywords: ['Introspection', 'Soul-searching', 'Guidance', 'Inner light'],
    meaning:
      'The Hermit walks alone by choice, lantern in hand. He is the seeker who understands that withdrawal is not loneliness but a laboratory — a sacred space where truth can surface.',
    surface:
      'You do your real growing in private. Depth calls you louder than company, and your best thinking happens away from the noise. People experience you as calm because you are not performing for them. Your light is small and steady — but it is yours, and it shows the next step, which is all any of us get.',
    shadow: 'Isolation, loneliness, refusal of help',
    detail:
      'On a peak above the world he raises a lantern whose star is the six-pointed seal of wisdom — he does not illuminate the whole path, only the next step, which is all anyone is ever actually given. In a birth chart the Hermit marks the soul on the long solo road: drawn to depth over company, to study over chatter, to the one true question rather than the hundred passing ones. These are the people who do their real growing in private and emerge changed. Their presence calms rooms precisely because they are not performing for them.',
    shadowDetail:
      'Its shadow is isolation chosen from fear and renamed as wisdom — the refusal of every outstretched hand, the door locked so long that the Hermit forgets he has the key. It can also appear as aimless drifting: wandering without the lantern, busyness substituting for the search.',
    guidance:
      'Work with the Hermit by scheduling real solitude — hours, not minutes — and protecting it from the world’s static. Carry the lantern for others occasionally: share what your solitude has taught, or it curdles into superiority. And when you notice the difference between “I need to be alone” and “I am afraid to be seen”, honour whichever is true.',
  },
  {
    num: 10,
    roman: 'X',
    name: 'Wheel of Fortune',
    keywords: ['Luck', 'Karma', 'Cycles', 'Turning point'],
    meaning:
      'The Wheel turns for everyone. This card signals a shift in fate — what was down begins to rise. It teaches you to ride the cycles of life rather than cling to any single moment of them.',
    surface:
      'Your life moves in cycles, and you have learned to feel the turning before it comes. What falls for you rises again — often dramatically. While others cling to moments, you ride them. Your gift is timing; your wisdom is never building for the quarter you happen to be in.',
    shadow: 'Bad luck, resistance to change, stuck cycles',
    detail:
      'The wheel carries the letters T-A-R-O and the signs of the fixed zodiac; sphinx above, wolf and serpent riding the rim, Anubis rising as Typhon falls — nothing on the wheel is static except the hub. In a birth chart this card marks a life of visible cycles: seasons of rise and fall that arrive on their own schedule, often dramatically. These people learn young that fortune is a wheel and not a wall — that holding on at the top is as pointless as giving up at the bottom. Their gift is timing: they sense when the wheel is about to turn.',
    shadowDetail:
      'Its shadow is the gambler’s error — believing the wheel owes you a win because you lost before, or clinging to a summit as if the wheel could be stopped by grip. It also appears as the victim story: “luck” used as the permanent explanation, which quietly deletes all agency.',
    guidance:
      'Work with the Wheel by investing in what survives a full rotation — skills, relationships, health — rather than only what pays this quarter. Learn to read your own cycles: when did effort last pay off, and when did patience? And when at the bottom, act like someone who has read the card: prepare, because the turn is coming.',
  },
  {
    num: 11,
    roman: 'XI',
    name: 'Justice',
    keywords: ['Truth', 'Fairness', 'Cause and effect', 'Clarity'],
    meaning:
      'Justice weighs all things with an even hand. She stands for accountability, honest judgement and the law of consequence — you reap precisely what you sow, in this life or the next.',
    surface:
      'Fairness is your nervous system. You notice every imbalance in a room, every debt unpaid, every promise bent — including your own. People trust your judgement because it is honest, not because it is kind. Your refinement is mercy: learning that the scales weigh hearts as well as facts.',
    shadow: 'Dishonesty, unfairness, avoidance of accountability',
    detail:
      'She holds sword and scales between twin pillars — the sword of discernment, point up, ready; the scales held level, not by effort but by honesty. In a birth chart Justice marks the person for whom fairness is a nervous system: they notice every imbalance in a room, every unpaid debt, every contract broken in spirit if not in letter. They are natural judges, mediators, auditors of the truth. Their lives tend to turn on moments of clear-eyed decision, and they are at their best when they remember that justice without mercy is only arithmetic.',
    shadowDetail:
      'Its shadow is the two corruptions of the scales: harsh judgement — self or others measured against impossible standards, fairness weaponised into coldness — and its opposite, the accountant of excuses, who can justify anything and therefore answers for nothing.',
    guidance:
      'Work with Justice by keeping your own ledger honestly: what you gave, what you took, what you owe. Before judging, gather the missing facts — the scales demand evidence, not vibes. And practise restorative over punitive justice wherever you have the power: the goal is a mended balance, not a broken opponent.',
  },
  {
    num: 12,
    roman: 'XII',
    name: 'The Hanged Man',
    keywords: ['Sacrifice', 'Letting go', 'New perspective', 'Surrender'],
    meaning:
      'The Hanged Man suspends the world as he knows it. By surrendering control and looking at life upside down, he gains the illumination that action alone could never provide.',
    surface:
      'Your breakthroughs arrive when you stop pushing. You have learned — sometimes the hard way — that willing a thing is not the only way to move it, and your strangest, stillest periods tend to be the ones that change you most. You can look at a situation upside down and mean it.',
    shadow: 'Stalling, martyrdom, needless sacrifice',
    detail:
      'He hangs by one foot from a T-shaped tau cross, the other leg folded into the number four, a halo around a face that is not suffering — he has chosen the suspension, and the choice is the whole secret. In a birth chart the Hanged Man marks someone whose path runs through surrender: their biggest breakthroughs arrive only after they stop pushing. They learn early that willing something is not the only way of moving it. Periods of apparent stuckness in their lives are usually initiations — the old self dissolving before a truer one can stand.',
    shadowDetail:
      'Its shadow is sacrifice without purpose — martyrdom performed for an audience, endless stalling renamed as patience, or the victim who has grown fond of the cross. Its opposite failure is the refusal to ever hang: control held so long that life must eventually force the suspension.',
    guidance:
      'Work with the Hanged Man by choosing your suspensions deliberately: when something refuses to move, stop pushing and change your angle instead. Ask “what is this pause teaching?” before asking “how do I end it?”. And retire the word sacrifice whenever martyrdom is what is actually being offered — the card accepts only willing surrender.',
  },
  {
    num: 13,
    roman: 'XIII',
    name: 'Death',
    keywords: ['Endings', 'Transformation', 'Transition', 'Rebirth'],
    meaning:
      'Death is the great transformer. Nothing truly ends — everything is compost for what comes next. This card marks a profound metamorphosis: the shedding of an old skin you have outgrown.',
    surface:
      'You live many lives in one. When something is over — a job, a city, a self — you are able to close the door all the way, and this unsettles people who would rather linger. Around you, things that are done finally get to be over. Your gift is the honest ending; your art is the rebirth after.',
    shadow: 'Fear of change, stagnation, clinging to the past',
    detail:
      'A skeleton knight rides through every rank of society — king, child, maiden — because death levels all, while the sun sets and rises between two towers in the distance, promising that this ending is also a dawn. In a birth chart Death marks the person who lives many lives in one: careers, cities, identities shed and renewed with a completeness that unsettles everyone who stays the same. Their gift is the honest ending — they can close a door all the way. Around them, things that are done finally get to be over.',
    shadowDetail:
      'Its shadow is the refusal to let the dead thing die — relationships, projects and identities kept on life support long after their season, stagnation defended as loyalty. It can also invert into compulsive destruction: burning bridges not because they were crossed but because the fire feels like aliveness.',
    guidance:
      'Work with Death by holding a personal ritual of endings: finish, bury, and bless what is over before seeding what is next. When the card appears, ask “what is trying to end here?” rather than “what is going wrong?”. And grieve honestly — transformation that skips mourning returns as haunting.',
  },
  {
    num: 14,
    roman: 'XIV',
    name: 'Temperance',
    keywords: ['Balance', 'Moderation', 'Patience', 'Alchemy'],
    meaning:
      'Temperance pours water between cups without spilling a drop. She is the art of blending opposites into harmony — the middle path where healing, timing and measured action create lasting results.',
    surface:
      'You are the mixer of opposites. Fire and water, dream and spreadsheet, patience and drive — you blend what should not blend and produce something new. Your life improves steadily rather than dramatically, and given time, you quietly beat the brilliant. Moderation, in your hands, is an active art.',
    shadow: 'Imbalance, excess, lack of long-term vision',
    detail:
      'One foot on land, one in the stream, wings folded calmly, the angel pours from cup to cup in an endless loop that never wastes a drop — moderation practised as an active art, not a passive lack. In a birth chart Temperance marks the alchemist of the family and the workplace: the one who mixes opposites until something new appears — the dreamer with a spreadsheet, the fighter with patience, fire and water in one person. Their lives improve steadily rather than dramatically; given time, they beat the brilliant.',
    shadowDetail:
      'Its shadow is the failure of measure in both directions: excess — appetite, work, speed — or the pale, joyless “balance” that is really fear of ever fully committing. Both spill the water; one from greed, one from trembling.',
    guidance:
      'Work with Temperance by diluting intensity on purpose: when life runs hot, add routine; when it runs cold, add ritual. Practise one daily moderation deliberately — it trains the pouring hand for the bigger mixes. And in conflict, refuse both war and surrender: keep pouring until a third thing appears.',
  },
  {
    num: 15,
    roman: 'XV',
    name: 'The Devil',
    keywords: ['Addiction', 'Materialism', 'Bondage', 'Shadow self'],
    meaning:
      'The Devil reveals the chains we forge ourselves. What binds you — habit, desire, fear — only has power because you have agreed to wear it. Naming your shadow is the first step to freedom.',
    surface:
      'Your appetites are stronger than most, and so is your will — and your whole curriculum is the relationship between the two. You are drawn to intensity: money, pleasure, power, the deal that is too good. The same current that can bind you, redirected, becomes your charisma and your creative voltage.',
    shadow: 'Detachment, freedom reclaimed, escapism',
    detail:
      'The horned figure presides over two figures loosely chained at the neck — loose enough to lift off, and that is the entire accusation: the bondage is consensual, maintained by appetite and fear rather than iron. In a birth chart the Devil marks the person whose greatest battles are with their own magnetisms: money, pleasure, power, drama, the deal that is too good. These are also the people of immense vitality — the same current that binds them, redirected, becomes charisma and sheer creative voltage. The card does not ask you to kill the beast; it asks who is holding the chain.',
    shadowDetail:
      'Its shadow is bondage mistaken for identity: “I am just like this” said about the habit, the relationship, the grind. It is also the projection of the beast onto others — everyone else is corrupt, obsessed, addicted — while one’s own chains are renamed as virtue.',
    guidance:
      'Work with the Devil by naming one chain honestly and testing how loose it is: skip it once and watch the panic — that measurement is the reading. Replace suppression with redirection, since the current will not stop flowing. And remember the card’s final secret: the moment the bondage is truly seen, it is already half unbuckled.',
  },
  {
    num: 16,
    roman: 'XVI',
    name: 'The Tower',
    keywords: ['Sudden change', 'Upheaval', 'Revelation', 'Awakening'],
    meaning:
      'The Tower is struck by lightning and the false crown falls. Built on shaky foundations, it must crumble so something truer can rise. Sudden, shocking — but ultimately liberating.',
    surface:
      'Lightning finds you. Structures in your life — jobs, beliefs, identities — have a way of collapsing suddenly and revealing what was hollow inside. You build differently afterwards: faster, truer, with fewer illusions. You have learned what most people avoid knowing: the fall is not the enemy of the tower; the lie is.',
    shadow: 'Disaster avoided, clinging to false structures',
    detail:
      'A bolt from a clear black sky strikes the tower’s crown — the one placed there by ambition rather than truth — and the two figures fall not into annihilation but into open air. In a birth chart the Tower marks a life with lightning in it: sudden collapses of structures that were hollow — jobs, beliefs, identities — often arriving exactly when the person inside was pretending not to hear the cracks. These people learn to build differently afterwards: on bedrock, with fewer pretensions, and faster than most at evacuating what is already burning.',
    shadowDetail:
      'Its shadow is the tower maintained — staying in the cracking structure because the fall frightens more than the rot, or softer: the person who spends their whole life fireproofing illusions. Its rare opposite is manufactured drama: blowing things up because quiet growth feels like stagnation.',
    guidance:
      'Work with the Tower by auditing your structures before the sky does: which of your towers would you defend with a lie? When the lightning comes, do not rebuild the same floor plan — the blueprint was the problem. And keep this card’s dignity: it never destroys what is true; it only finishes what was false.',
  },
  {
    num: 17,
    roman: 'XVII',
    name: 'The Star',
    keywords: ['Hope', 'Renewal', 'Inspiration', 'Healing'],
    meaning:
      'After the storm, the Star. She pours water onto land and stream, promising renewal. This is the card of restored faith — a reminder that you are made of the same light as the stars you wish on.',
    surface:
      'You are the person who shows up after the storm. Your faith in people is contagious and, strangely, accurate — you can always find the one reason to keep going, and you hand it to others freely. Hope is not naive in your hands; it is a practice, and you are proof that it works.',
    shadow: 'Hopelessness, self-doubt, lost faith',
    detail:
      'A figure kneels naked and unashamed by a living pool, pouring water back into the water and onto the land — giving to the source and the soil at once — while one great star and seven smaller ones burn steadily above. In a birth chart the Star marks the person who heals simply by being believed in: their faith in others is contagious and oddly accurate. They tend to arrive in people’s lives right after the Tower — the friend who shows up with the rebuild. Their gift is orientation: they can always find the one star that proves the storm has an edge.',
    shadowDetail:
      'Its shadow is the eclipse of faith — hopelessness worn as realism, the refusal to wish because wishes once failed, self-doubt so total that even poured water feels wasted. Inverted, it becomes escapism: permanent optimism that refuses to look at the wreckage it is supposedly rising from.',
    guidance:
      'Work with the Star by healing in both directions like the pouring figure — restore something in yourself and something in the world, every week. Protect your hope as an instrument: calibrated, honest, but never surrendered. And when faith is gone, borrow someone else’s; the stars are communal property.',
  },
  {
    num: 18,
    roman: 'XVIII',
    name: 'The Moon',
    keywords: ['Illusion', 'Anxiety', 'Subconscious', 'Dreams'],
    meaning:
      'The Moon lights a path that is not what it seems. It rules dreams, instincts and the shadowy territory of the subconscious — asking you to feel your way forward when clarity is impossible.',
    surface:
      'You live with deep tides. Your instincts are powerful, your dreams are loud, and you sense the truth of people beneath their presentation long before evidence arrives. Others misread your phases as inconsistency; they are just weather. You can navigate in the dark — which is rarer than it sounds.',
    shadow: 'Confusion, deception, fear dissolving',
    detail:
      'A crayfish climbs from the deep pool — the primitive self surfacing — while dog and wolf, tame and wild, both howl at the moon; the road ahead forks through fields and mountains, but nothing on it is exactly what it appears. In a birth chart the Moon marks the person with deep tides: powerful instincts and imagination, porous boundaries, a psyche that dreams in symbols and remembers them. Their lives include phases — waxing and waning that others misread as inconsistency. Their gift is the night vision: they can navigate what cannot yet be explained, and they sense the truth of people beneath the presentation.',
    shadowDetail:
      'Its shadow is the fog mistaken for the world: anxiety fed by undefined fears, deception accepted or practised, projection — the wolf seen in everyone because it has not been met in oneself. Its opposite failure is worse: pretending there is no night at all.',
    guidance:
      'Work with the Moon by honouring the irrational on schedule: dreams written down, instinct consulted before big moves, fear named precisely so it can be sized. Never sign contracts in the fog — wait for daylight on anything that can be waited on. And keep one practice, art or person through which the subconscious is allowed to speak in its own language.',
  },
  {
    num: 19,
    roman: 'XIX',
    name: 'The Sun',
    keywords: ['Joy', 'Success', 'Vitality', 'Radiance'],
    meaning:
      'The Sun is the most welcome card in the deck — pure warmth, vitality and triumph. It speaks of a life lived out loud, of success that is shared, and of the simple radiance of being.',
    surface:
      'Warmth is your default setting. You succeed most when you are most yourself, and you tend to be loved at a scale that embarrasses you. Joy is not a prize you defend; it is a climate you share, and rooms change temperature when you enter. Your reminder to everyone: happiness needs no fine print.',
    shadow: 'Temporary cloudiness, egotism, delayed joy',
    detail:
      'A great-faced sun pours straight and wavy rays over a child on a white horse, red banner raised, sunflowers crowding a low wall — joy with no fine print, success that needs no apology. In a birth chart the Sun marks the person whose default setting is vitality: they warm rooms by entering them, succeed most when they are most themselves, and tend to be loved at a scale they find embarrassing. Their gift is legitimacy — the child rides bare, nothing hidden — and their lives remind everyone around them that happiness is not a prize to be defended but a climate to be shared.',
    shadowDetail:
      'Its shadow is the clouded sun: joy postponed until conditions are perfect, success that curdles into egotism — the radiance demanding orbit rather than offering warmth — or the grey habit of expecting the cloud, which teaches the sky to comply.',
    guidance:
      'Work with the Sun by treating joy as a duty to your chart: celebrate loudly and early, before the cautious part of you files its objections. Share your wins on purpose — this card’s luck multiplies in public. And when clouds cross, remember they are weather, not identity: the sun in this card never actually goes out.',
  },
  {
    num: 20,
    roman: 'XX',
    name: 'Judgement',
    keywords: ['Reflection', 'Reckoning', 'Rebirth', 'Inner calling'],
    meaning:
      'Judgement is the trumpet that wakes the soul. It asks you to review your life honestly, forgive what needs forgiving, and answer the call toward your higher purpose.',
    surface:
      'You are always mid-reckoning. Few people audit their lives as honestly as you do — what you did, what you avoided, whom you still need to forgive. At some point you heard a call you could no longer ignore, and you answered it. Your life has a before and an after, and you know exactly where the trumpet sounded.',
    shadow: 'Self-criticism, ignoring the call, stagnation',
    detail:
      'From the clouds the last angel sounds the trumpet; the flag rises on the cross of the four directions, and below, grey figures climb from open graves, arms raised — not the dead but the asleep, finally answering. In a birth chart Judgement marks the person with a permanent inner court of appeal: they re-evaluate constantly, forgive slowly but completely, and are prone to the great summing-up — the decision, at some point, to become who they were actually meant to be. Their lives often contain a clear “before and after” moment when they answered a call they could no longer ignore.',
    shadowDetail:
      'Its shadow is the trumpet heard and refused — the calling filed away as impractical, the verdict turned inward until it becomes self-criticism so harsh it paralyses. Its softer failure is nostalgia: living permanently in the review, summoned but never rising.',
    guidance:
      'Work with Judgement by holding an honest annual audit of your life: what did I do, what did I avoid, whom do I still need to forgive? Treat the call as data — when something will not stop summoning you, it is usually because it is yours. And deliver your verdicts with mercy: the card’s purpose is resurrection, not punishment.',
  },
  {
    num: 21,
    roman: 'XXI',
    name: 'The World',
    keywords: ['Completion', 'Accomplishment', 'Wholeness', 'Journey'],
    meaning:
      'The World is the final card — the dance of completion. A cycle has closed successfully, and you stand whole, integrated, ready for the next turn of the spiral. Celebration is earned.',
    surface:
      'You finish. Where others trail loose ends, you close circles — chapters, degrees, whole eras of your life completed and honoured. Your contradictions integrate earlier than most, and wholeness is your gift to everyone near you: proof that the pieces can, in fact, all fit.',
    shadow: 'Incompletion, shortcuts, loose ends',
    detail:
      'A figure dances inside a living laurel wreath, wrapped in the purple of attainment, batons crossed — the squared circle of the completed self, with the four fixed creatures watching from the corners: all of life’s elements present and accounted for. In a birth chart the World marks the completer: the person who finishes what they start, integrates their contradictions earlier than most, and collects whole chapters — languages mastered, degrees finished, businesses sold, circles closed. Their gift is wholeness; they make the people around them feel that life’s pieces can, in fact, all fit.',
    shadowDetail:
      'Its shadow is the almost-finished: the thesis never submitted, the reconciliation never spoken, the last mile refused — endless loose ends that keep the wreath unwoven. Its opposite is false completion: declaring victory at 80% and spending the rest of life defending the declaration.',
    guidance:
      'Work with the World by honouring completions ritually: finished things must be marked, or the psyche learns that endings do not count. Resist the shortcut on the final stretch; this card is precisely about the last mile. And when a cycle closes, celebrate before beginning again — the dance at the centre of the wreath is the point of the entire journey.',
  },
]

export function getCard(num: number): MajorArcana {
  const card = MAJOR_ARCANA.find((c) => c.num === num)
  if (!card) throw new Error(`Unknown Major Arcana number: ${num}`)
  return card
}

function digitSum(n: number): number {
  return String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0)
}

export interface BirthCards {
  /** Date sum reduced to 21 or less — the primary birth card */
  primary: number
  /** Digit sum of the primary card */
  secondary: number
  /** Digit sum of the secondary card (present only for triples like 19 → 10 → 1) */
  tertiary: number | null
  /** The full reduction chain shown to the user, e.g. [19, 10, 1] */
  chain: number[]
}

/**
 * Tarot birth card calculation (Tarot School method):
 * sum every digit of the birth date (MMDDYYYY) and reduce until <= 21.
 * The primary card's digits are then summed for the secondary card,
 * and once more for the tertiary card when the chain continues.
 */
export function computeBirthCards(dateStr: string): BirthCards | null {
  const digits = dateStr.replace(/\D/g, '')
  if (digits.length < 8) return null
  let sum = digits.split('').reduce((acc, d) => acc + Number(d), 0)
  while (sum > 21) sum = digitSum(sum)
  const primary = sum
  const secondary = digitSum(primary)
  const tertiary = secondary > 9 ? digitSum(secondary) : null

  const chain = [primary, secondary]
  if (tertiary !== null) chain.push(tertiary)

  return { primary, secondary, tertiary, chain }
}
