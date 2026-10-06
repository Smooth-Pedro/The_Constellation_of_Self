import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import TarotCardFace from '@/components/TarotCardFace'
import { ALL_TAROT_CARDS, getSuitInfo, isMinor, type AnyCard, type MinorSuit } from '@/lib/minorArcana'

type Spread = {
  id: string
  title: string
  hint: string
  positions: { label: string; lens: string }[]
}

const SPREADS: Spread[] = [
  {
    id: 'time',
    title: 'Past · Present · Future',
    hint: 'The road behind, the ground you stand on, and the door ahead.',
    positions: [
      { label: 'Past', lens: 'What has shaped this moment — the root of the question.' },
      { label: 'Present', lens: 'Where you actually stand right now, like it or not.' },
      { label: 'Future', lens: 'Where the current road leads if you keep walking it.' },
    ],
  },
  {
    id: 'path',
    title: 'Situation · Obstacle · Advice',
    hint: 'For a concrete question: what is, what blocks, what to do.',
    positions: [
      { label: 'Situation', lens: 'The heart of the matter as it truly is.' },
      { label: 'Obstacle', lens: 'What stands in the way — inside you or outside.' },
      { label: 'Advice', lens: 'The stance the cards recommend you take.' },
    ],
  },
  {
    id: 'being',
    title: 'Mind · Body · Spirit',
    hint: 'A check-in with the whole self, not just the question.',
    positions: [
      { label: 'Mind', lens: 'What your thinking is doing — clear, sharp or tangled.' },
      { label: 'Body', lens: 'What your body and daily life are carrying.' },
      { label: 'Spirit', lens: 'What your deeper self is asking for.' },
    ],
  },
]

type DrawnCard = { card: AnyCard; position: string; lens: string }

function drawThree(spread: Spread): DrawnCard[] {
  const pool = [...ALL_TAROT_CARDS]
  const drawn: AnyCard[] = []
  while (drawn.length < 3) {
    const idx = crypto.getRandomValues(new Uint32Array(1))[0] % pool.length
    drawn.push(pool.splice(idx, 1)[0])
  }
  return spread.positions.map((pos, i) => ({ card: drawn[i], position: pos.label, lens: pos.lens }))
}

/** Short "reading together" line built from the three drawn cards. */
function synthesize(drawn: DrawnCard[]): string {
  const names = drawn.map((d) => d.card.keywords[0]?.toLowerCase() ?? '').filter(Boolean)
  const suits = drawn
    .map((d) => (isMinor(d.card) ? d.card.suit : null))
    .filter((s): s is MinorSuit => s !== null)
  const uniqueSuits = [...new Set(suits)]
  let suitLine = ''
  if (uniqueSuits.length === 3) {
    suitLine = ` Three different currents meet here — ${uniqueSuits
      .map((s) => getSuitInfo(s).element)
      .join(', ')} all asking to be heard.`
  } else if (uniqueSuits.length === 2 && suits.length === 3) {
    const doubled = uniqueSuits.find((s) => suits.filter((x) => x === s).length === 2)
    const single = uniqueSuits.find((s) => s !== doubled)
    suitLine = ` The ${doubled} current runs twice as strong — ${getSuitInfo(
      doubled!,
    ).element.toLowerCase()} leads this reading, with ${getSuitInfo(single!).element.toLowerCase()} answering it.`
  } else if (uniqueSuits.length === 1 && suits.length === 3) {
    suitLine = ` All three cards speak the language of ${uniqueSuits[0]} — one element running through every position; this question is ${getSuitInfo(
      uniqueSuits[0],
    ).element.toLowerCase()}'s to answer.`
  } else if (suits.length > 0) {
    suitLine = ' Major Arcana sit among the suits — the archetypal currents are mixing into the everyday weather.'
  } else {
    suitLine = ' Three Major Arcana: this is no small matter — the reading speaks in archetypes, not events.'
  }
  return `The thread that connects them: ${names.join(' → ')}.${suitLine}`
}

export default function ThreeCardReading() {
  const [spreadId, setSpreadId] = useState(SPREADS[0].id)
  const [drawn, setDrawn] = useState<DrawnCard[] | null>(null)
  const spread = SPREADS.find((s) => s.id === spreadId) ?? SPREADS[0]

  return (
    <section className="max-w-5xl mx-auto px-6 pb-16" id="three-card-reading">
      <h2 className="font-cinzel text-2xl text-amber-100 text-center mb-2">
        ✦ Three-Card Reading
      </h2>
      <p className="text-center text-indigo-200/70 mb-8 leading-relaxed max-w-2xl mx-auto text-sm">
        Choose a spread, hold your question, and draw three cards from the full 78-card deck — the
        two that frame your question and the thread that ties them together.
      </p>

      {/* Spread picker */}
      <div className="grid sm:grid-cols-3 gap-3 mb-6">
        {SPREADS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSpreadId(s.id)
              setDrawn(null)
            }}
            className={`rounded-2xl border px-4 py-4 text-center transition-all ${
              spreadId === s.id
                ? 'border-amber-300/60 bg-amber-200/10 shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]'
                : 'border-indigo-400/20 bg-white/[0.03] hover:border-indigo-300/40'
            }`}
          >
            <span
              className={`block font-cinzel text-sm tracking-wide ${
                spreadId === s.id ? 'text-amber-200' : 'text-indigo-200/80'
              }`}
            >
              {s.title}
            </span>
            <span className="block text-[11px] text-indigo-300/50 mt-1 leading-snug">{s.hint}</span>
          </button>
        ))}
      </div>

      <Card className="bg-white/[0.04] border-indigo-400/25 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(99,80,220,0.5)]">
        <CardContent className="pt-6 pb-6 space-y-6">
          {!drawn && (
            <Button
              onClick={() => setDrawn(drawThree(spread))}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-300 text-indigo-950 font-semibold hover:from-amber-400 hover:to-amber-200 shadow-[0_0_25px_-5px_rgba(251,191,36,0.6)]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Shuffle the Deck &amp; Draw Three
            </Button>
          )}

          {drawn && (
            <>
              <div className="grid sm:grid-cols-3 gap-6">
                {drawn.map((d) => (
                  <div key={d.position} className="flex flex-col items-center gap-3 text-center">
                    <div>
                      <p className="font-cinzel text-amber-200 text-sm tracking-[0.25em] uppercase">
                        {d.position}
                      </p>
                      <p className="text-[11px] text-indigo-300/50 italic mt-1 leading-snug max-w-56">
                        {d.lens}
                      </p>
                    </div>
                    <TarotCardFace card={d.card} size="md" />
                    <div>
                      <p className="font-cinzel text-amber-100 text-base leading-tight">
                        {d.card.name}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-indigo-300/60 mt-1">
                        {d.card.keywords.join(' · ')}
                      </p>
                      <p className="text-indigo-200/80 text-sm leading-relaxed mt-2">
                        {d.card.meaning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-amber-200/25 bg-amber-200/[0.04] p-4">
                <h3 className="font-cinzel text-amber-200 text-xs tracking-[0.25em] uppercase mb-2 text-center">
                  ✦ Read together
                </h3>
                <p className="text-indigo-100/85 text-sm leading-relaxed text-center">
                  {synthesize(drawn)}
                </p>
              </div>

              <div className="flex justify-center gap-6">
                <button
                  type="button"
                  onClick={() => setDrawn(drawThree(spread))}
                  className="text-xs text-indigo-300/50 hover:text-amber-200/80 transition-colors underline underline-offset-4"
                >
                  Draw this spread again
                </button>
                <button
                  type="button"
                  onClick={() => setDrawn(null)}
                  className="text-xs text-indigo-300/50 hover:text-amber-200/80 transition-colors underline underline-offset-4"
                >
                  Choose another spread
                </button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </section>
  )
}
