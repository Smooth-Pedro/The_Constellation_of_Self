import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import TarotCardFace from '@/components/TarotCardFace'
import { getCard, type BirthCards, type MajorArcana } from '@/lib/tarot'
import {
  getNumberProfile,
  lifePathWorkings,
  type LifePathResult,
} from '@/lib/numerology'
import { computeNameNumbers } from '@/lib/nameNumerology'
import { pairPath, PAIR_DETAILS } from '@/lib/extendedNumerology'
import NameNumerologyPanel from './NameNumerologyPanel'
import ExtendedChartPanel from './ExtendedChartPanel'
import ConstellationPanel from './ConstellationPanel'
import NameExtrasPanel from './NameExtrasPanel'

export type ReadingScope = 'date' | 'name' | 'all'

interface Props {
  date?: string // YYYY-MM-DD
  birth?: BirthCards
  lifePath?: LifePathResult
  workings?: string // e.g. "0+3+1+9+9+5 = 27 → 9"
  name?: string
  scope: ReadingScope
}

function formatDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

/** Surface-level reading block for one Major Arcana card — the library keeps the deep layers */
function CardSurface({ card }: { card: MajorArcana }) {
  return (
    <div className="space-y-4 text-left w-full">
      <div className="flex flex-wrap justify-center gap-1.5">
        {card.keywords.map((k) => (
          <span
            key={k}
            className="rounded-full border border-amber-200/25 bg-amber-200/[0.06] px-2.5 py-0.5 text-[11px] uppercase tracking-wider text-amber-200/80"
          >
            {k}
          </span>
        ))}
      </div>
      <p className="text-indigo-100/90 text-base leading-relaxed">{card.meaning}</p>
      <p className="text-indigo-100/90 text-base leading-relaxed border-l-2 border-amber-300/40 pl-4 font-serif">
        {card.surface}
      </p>
      <div className="rounded-2xl border border-rose-300/25 bg-rose-400/[0.07] p-4">
        <h5 className="font-cinzel text-rose-200 text-xs tracking-[0.25em] uppercase mb-2">
          ☾ Shadow side
        </h5>
        <p className="text-rose-100/90 text-sm leading-relaxed">
          {card.shadow}
          <span className="text-rose-200/60"> — the full story of this shadow lives in the library.</span>
        </p>
      </div>
      <p className="text-indigo-300/60 text-xs leading-relaxed text-center">
        Beneath this card: its symbols and imagery, the shadow in full, and the practice for
        working with it —{' '}
        <RefLink hash={`arcana-${card.num}`}>read the complete entry in the library ↓</RefLink>
      </p>
    </div>
  )
}

/** Inline link into the reference pages (/library or /pairs) */
function RefLink({
  hash,
  to = '/library',
  children,
}: {
  hash: string
  to?: '/library' | '/pairs'
  children: ReactNode
}) {
  return (
    <Link
      to={`${to}#${hash}`}
      className="text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-200/70 transition-colors"
    >
      {children}
    </Link>
  )
}

/** The reading's table of contents — every layer in order of importance */
function ChartIndex({ scope, hasName }: { scope: ReadingScope; hasName: boolean }) {
  const dateScope = scope === 'date' || scope === 'all'
  const nameScope = scope === 'name' || scope === 'all'
  const layers: { n: number; label: string; href: string }[] = []
  let n = 0
  if (dateScope) {
    layers.push({ n: ++n, label: 'Tarot Birth Cards — your archetype pair', href: '#layer-birth-cards' })
    layers.push({ n: ++n, label: 'Life Path — the spine of the whole chart', href: '#layer-life-path' })
  }
  if (nameScope) {
    layers.push({ n: ++n, label: 'Destiny — what your name makes of you', href: '#layer-destiny' })
    layers.push({ n: ++n, label: 'Soul Urge — what your heart privately wants', href: '#layer-soul-urge' })
    layers.push({ n: ++n, label: 'Personality — how you appear at first meeting', href: '#layer-personality' })
  }
  if (dateScope) {
    layers.push({ n: ++n, label: 'Birthday Number — the sub-influence of your day', href: '#layer-birthday' })
    layers.push({ n: ++n, label: 'Karmic Debt — lessons carried from before', href: '#layer-karmic' })
    layers.push({ n: ++n, label: 'Attitude Number — your instinctive first response', href: '#layer-attitude' })
    if (nameScope) {
      layers.push({ n: ++n, label: 'Maturity Number — who you fully grow into', href: '#layer-maturity' })
      layers.push({ n: ++n, label: 'Balance Number — how you restore yourself', href: '#layer-balance' })
    }
    layers.push({ n: ++n, label: 'Year Cards — the theme of this year and next', href: '#layer-year-cards' })
    layers.push({ n: ++n, label: 'Your Life Constellation — the whole sky at once', href: '#layer-constellation' })
  } else if (hasName) {
    layers.push({ n: ++n, label: 'Balance Number — how you restore yourself', href: '#layer-balance' })
    layers.push({ n: ++n, label: 'Karmic Debt — lessons carried in your name', href: '#layer-karmic' })
  }

  return (
    <nav className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8">
      <h3 className="font-cinzel text-xl text-amber-100 text-center mb-1">
        Your Chart, Layer by Layer
      </h3>
      <p className="text-indigo-300/60 text-xs italic text-center mb-5 max-w-xl mx-auto">
        In order of weight — the top layers describe the core of who you are; the lower layers add
        nuance, timing, and the lessons you carried in.
      </p>
      <ol className="grid sm:grid-cols-2 gap-x-8 gap-y-2 max-w-3xl mx-auto">
        {layers.map((l) => (
          <li key={`${l.n}-${l.href}`} className="flex items-baseline gap-3 text-sm">
            <span className="font-cinzel text-amber-300/80 text-xs w-6 shrink-0">
              {String(l.n).padStart(2, '0')}
            </span>
            <a
              href={l.href}
              className="text-indigo-200/80 hover:text-amber-200 underline decoration-indigo-400/20 underline-offset-4 hover:decoration-amber-300/50 transition-colors"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ol>
      <p className="text-center text-indigo-300/50 text-xs mt-5">
        Browse the full reference:{' '}
        <Link to="/library#library-numbers" className="text-amber-300/80 hover:text-amber-200">all numbers</Link>
        {' · '}
        <Link to="/library#library-arcanas" className="text-amber-300/80 hover:text-amber-200">all 22 Major Arcana</Link>
        {' · '}
        <Link to="/pairs#library-pairs" className="text-amber-300/80 hover:text-amber-200">all birth card pairs</Link>
      </p>
    </nav>
  )
}

export default function ResultsPanel({ date, birth, lifePath, workings, name, scope }: Props) {
  const showDate = scope === 'date' || scope === 'all'
  const showName = scope === 'name' || scope === 'all'

  // birth / lifePath are guaranteed present whenever showDate is true;
  // safe dummies keep name-only scope from crashing (their sections don't render)
  const b: BirthCards = birth ?? { primary: 0, secondary: 0, tertiary: null, chain: [] }
  const lp: LifePathResult = lifePath ?? {
    number: 1,
    isMaster: false,
    birthdayNumber: 1,
    birthdayIsMaster: false,
  }

  const primary = getCard(b.primary)
  const secondary = getCard(b.secondary)
  const tertiary = b.tertiary !== null ? getCard(b.tertiary) : null

  // Dedupe: if primary and secondary are the same card (e.g. 9 → 9), show it once
  const pairCards =
    b.primary === b.secondary ? [primary] : [primary, secondary]

  const lpProfile = getNumberProfile(lp.number)
  const bdProfile = getNumberProfile(lp.birthdayNumber)
  const chainLabel = b.chain.join(' → ')
  const nameNumbers = name ? computeNameNumbers(name) : null
  const nameProfile = nameNumbers ? getNumberProfile(nameNumbers.expression) : null
  const pathName = pairPath(b.primary, b.secondary)
  const pairDetail = PAIR_DETAILS[`${b.primary}-${b.secondary}`] ?? null

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-fade-in">
      {/* Summary header */}
      <div className="text-center space-y-3">
        <p className="text-indigo-300/80 text-sm tracking-[0.25em] uppercase">
          {showDate ? (
            <span>Reading for {formatDate(date!)}</span>
          ) : (
            <span>Name reading</span>
          )}
          {showName && name && nameNumbers && (
            <span className="block mt-1 normal-case tracking-normal font-serif">
              {`✦ ${nameNumbers.cleanedName} — Destiny ${nameNumbers.expression}${nameNumbers.expressionIsMaster ? ' ✦' : ''}`}
            </span>
          )}
        </p>
        <h2 className="font-cinzel text-3xl sm:text-4xl text-amber-100">
          {showDate ? `${primary.name} · Life Path ${lp.number}` : `${nameNumbers?.cleanedName} · Destiny ${nameNumbers?.expression}`}
        </h2>
        {showDate && (
          <p className="text-indigo-200/70 text-sm font-mono">
            {workings} → {chainLabel}
          </p>
        )}
      </div>

      {/* ── Chart index: layers in order of importance ────── */}
      <ChartIndex scope={scope} hasName={!!name} />

      {/* ── Layer 2: Tarot Birth Cards (date scope / everything) ── */}
      {showDate && (
      <section id="layer-birth-cards" className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10 scroll-mt-24">
        <div className="text-center mb-8">
          <Badge
            variant="outline"
            className="border-amber-200/40 text-amber-200 mb-3 tracking-[0.2em] uppercase"
          >
            Layer 1 · Tarot Birth Cards
          </Badge>
          <h3 className="font-cinzel text-2xl text-amber-100">
            {pairCards.length === 1 ? 'Your Birth Card' : 'Your Birth Card Pair'}
          </h3>
          {pathName && (
            <p className="font-cinzel text-amber-300/90 tracking-[0.2em] uppercase text-sm mt-1">
              ✦ {pathName} ✦
            </p>
          )}
          <p className="text-indigo-200/70 text-sm mt-2 max-w-2xl mx-auto">
            The date digits reduce through the Major Arcana chain{' '}
            <span className="text-amber-200/90 font-mono">{chainLabel}</span>. The first card is
            your outer personality — how you meet the world. The second is your soul card, the
            hidden lesson beneath.
          </p>
          {pairDetail && (
            <p className="text-indigo-100/80 text-sm mt-3 max-w-2xl mx-auto leading-relaxed">
              {pairDetail.together}{' '}
              <RefLink hash={`pair-${b.primary}-${b.secondary}`} to="/pairs">Full pair entry ↓</RefLink>
            </p>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-12">
          {pairCards.map((card, i) => (
            <div key={card.num} className="flex flex-col items-center gap-4 w-full max-w-md">
              <TarotCardFace card={card} size="lg" />
              <Badge
                variant="secondary"
                className="bg-indigo-500/15 text-indigo-200 border-indigo-300/20"
              >
                {i === 0 ? 'Personality Card' : pairCards.length === 3 ? 'Middle Card' : 'Soul Card'}
              </Badge>
              <CardSurface card={card} />
            </div>
          ))}
        </div>

        {/* Hidden Justice card — now a compact note; full story lives on /pairs */}
        {b.primary === 17 && (
          <div className="mt-10 pt-8 border-t border-indigo-400/10">
            <p className="text-center text-indigo-200/75 text-sm max-w-2xl mx-auto leading-relaxed">
              A hidden third card walks behind this pair: in the oldest decks{' '}
              <span className="text-amber-200">VIII is Justice</span> and XI is Strength — and
              strength without justice does not exist.{' '}
              <RefLink hash="justice-curiosity" to="/pairs">
                Read the full story, with Justice added to this pair ↓
              </RefLink>
            </p>
          </div>
        )}

        {tertiary && b.tertiary !== null && b.secondary !== b.tertiary && (
          <div className="mt-10 pt-8 border-t border-indigo-400/10">
            <div className="text-center mb-6">
              <Badge
                variant="outline"
                className="border-amber-200/40 text-amber-200 mb-2 tracking-[0.2em] uppercase"
              >
                Triple Birth Cards · Rare
              </Badge>
              <p className="text-indigo-200/70 text-sm max-w-xl mx-auto">
                Your chain keeps reducing to a third card — a life of layered lessons and rare
                depth.
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-8">
              <div className="flex flex-col items-center gap-4 w-full max-w-md">
                <TarotCardFace card={tertiary} size="md" />
                <CardSurface card={tertiary} />
              </div>
            </div>
          </div>
        )}
      </section>
      )}

      {/* ── Layer 1: Life Path (date scope / everything) ───── */}
      {showDate && (
      <section id="layer-life-path" className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10 scroll-mt-24">
        <div className="text-center mb-8">
          <Badge
            variant="outline"
            className="border-amber-200/40 text-amber-200 mb-3 tracking-[0.2em] uppercase"
          >
            Layer 2 · The Spine of Your Chart
          </Badge>
          <h3 className="font-cinzel text-2xl text-amber-100">
            Life Path {lp.number}
            {lp.isMaster && (
              <span className="ml-2 text-amber-300/90 text-base align-middle">✦ Master Number</span>
            )}
          </h3>
          <p className="text-indigo-200/70 text-sm mt-1 italic">{lpProfile.title}</p>
          <p className="text-indigo-300/60 text-xs mt-3 font-mono">
            {lifePathWorkings(date!)}
          </p>
          <p className="text-indigo-300/60 text-xs mt-2">
            Dive deeper: <RefLink hash={`number-${lp.number}`}>the number {lp.number}</RefLink>
            {lpProfile.card && (
              <>
                {' · '}
                <RefLink hash={`arcana-${lpProfile.card.num}`}>{lpProfile.card.name}</RefLink>
              </>
            )}
          </p>
        </div>

        <div className="grid md:grid-cols-[auto_1fr] gap-8 items-start">
          {/* Life path medallion + corresponding tarot card */}
          <div className="flex flex-col items-center gap-5 mx-auto">
            <div className="relative w-36 h-36 rounded-full border-2 border-amber-200/50 bg-amber-200/5 flex items-center justify-center shadow-[0_0_60px_-10px_rgba(251,191,36,0.35)]">
              <div className="absolute inset-2 rounded-full border border-amber-200/20" />
              <span className="font-cinzel text-6xl text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
                {lp.number}
              </span>
            </div>
            {lpProfile.card && (
              <div className="flex flex-col items-center gap-2">
                <TarotCardFace card={lpProfile.card} size="sm" />
                <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60">
                  Your Life Path Card
                </span>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <p className="text-indigo-100/90 text-base leading-relaxed">{lpProfile.meaning}</p>
            <p className="text-indigo-100/90 text-base leading-relaxed border-l-2 border-amber-300/40 pl-4 font-serif">
              {lpProfile.surface}
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-4">
                <h4 className="text-emerald-200 font-cinzel text-sm tracking-widest uppercase mb-2">
                  Strengths
                </h4>
                <ul className="text-indigo-100/80 text-sm space-y-1">
                  {lpProfile.strengths.map((s) => (
                    <li key={s}>✦ {s}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-rose-300/20 bg-rose-400/5 p-4">
                <h4 className="text-rose-200 font-cinzel text-sm tracking-widest uppercase mb-2">
                  Challenges
                </h4>
                <ul className="text-indigo-100/80 text-sm space-y-1">
                  {lpProfile.challenges.map((c) => (
                    <li key={c}>☾ {c}</li>
                  ))}
                </ul>
              </div>
            </div>
            {lp.isMaster && (
              <div className="rounded-2xl border border-amber-200/30 bg-amber-200/[0.06] p-4">
                <h4 className="font-cinzel text-amber-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ✦ A master number runs through this chart
                </h4>
                <p className="text-amber-50/85 text-sm leading-relaxed">
                  Master numbers carry higher voltage — and higher demand. Why it appeared in your
                  chart, and what it asks of you, is its own reading:{' '}
                  <RefLink hash={`number-${lp.number}`}>
                    the full entry on {lp.number} in the library ↓
                  </RefLink>
                </p>
              </div>
            )}
            <p className="text-indigo-300/60 text-xs leading-relaxed">
              How this path tends to live out over a lifetime, and the practice for walking it well,
              lives in the library: <RefLink hash={`number-${lp.number}`}>the number {lp.number} ↓</RefLink>
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-indigo-400/10" />

        {/* Birthday number */}
        <div id="layer-birthday" className="flex flex-col sm:flex-row items-center gap-5 justify-center text-center sm:text-left scroll-mt-24">
          <div className="w-16 h-16 shrink-0 rounded-full border border-indigo-300/40 bg-indigo-500/10 flex items-center justify-center">
            <span className="font-cinzel text-2xl text-indigo-100">{lp.birthdayNumber}</span>
          </div>
          <div>
            <h4 className="font-cinzel text-amber-100">
              Birthday Number {lp.birthdayNumber}
              {lp.birthdayIsMaster && (
                <span className="ml-2 text-amber-300/80 text-xs">✦ Master</span>
              )}
            </h4>
            <p className="text-indigo-200/70 text-sm max-w-2xl">
              The day you were born adds a sub-influence of “{bdProfile.title}” —{' '}
              {bdProfile.strengths.slice(0, 3).join(', ').toLowerCase()} colour your natural
              temperament.
            </p>
            <p className="text-indigo-300/60 text-sm max-w-2xl mt-1">{bdProfile.surface}</p>
            <p className="text-indigo-300/60 text-xs max-w-2xl mt-1">
              <RefLink hash={`number-${lp.birthdayNumber}`}>
                the number {lp.birthdayNumber} ↓
              </RefLink>
            </p>
          </div>
        </div>
      </section>
      )}

      {/* ── Layers 3–5: Name numerology (name scope / everything) ── */}
      {showName && name && <NameNumerologyPanel name={name} />}
      {scope === 'name' && name && <NameExtrasPanel name={name} />}

      {/* ── Extended chart (date scope / everything) ──────── */}
      {showDate && (
        <ExtendedChartPanel
          date={date!}
          name={showName ? name : undefined}
          lifePathNumber={lp.number}
          expressionNumber={nameNumbers?.expression}
        />
      )}

      {/* ── Life Constellation (date scope) ───────────────── */}
      {showDate && (
        <ConstellationPanel date={date!} birth={b} lifePath={lp} />
      )}

      {/* ── Combined Reading ──────────────────────────────── */}
      <section className="rounded-3xl border border-amber-200/30 bg-gradient-to-b from-amber-200/[0.06] to-transparent p-6 sm:p-10 text-center">
        <Badge
          variant="outline"
          className="border-amber-200/40 text-amber-200 mb-4 tracking-[0.2em] uppercase"
        >
          The Complete Picture
        </Badge>
        {scope === 'name' ? (
          <p className="text-indigo-100/85 leading-relaxed max-w-3xl mx-auto">
            Your name — <span className="text-amber-200">{nameNumbers?.cleanedName}</span> —
            carries the destiny number {nameNumbers?.expression}
            {nameNumbers?.expressionIsMaster && ' ✦'} ({nameProfile?.title.toLowerCase()}): the
            current you add to everything you touch. The vowels whisper what your heart wants (
            {nameNumbers && <span>{`soul urge ${nameNumbers.soulUrge}`}</span>}); the consonants
            shape the first impression you leave (
            {nameNumbers && <span>{`personality ${nameNumbers.personality}`}</span>}).
            A name reading shows the instrument; the birth date shows the road — run both together
            for the full chart.
          </p>
        ) : (
          <p className="text-indigo-100/85 leading-relaxed max-w-3xl mx-auto">
            Born under <span className="text-amber-200">{primary.name}</span>, you carry its
            signature — {primary.keywords.slice(0, 2).join(' and ').toLowerCase()} — into every
            room you enter.
            {pairCards.length > 1 && (
              <span>
                {' '}
                Beneath the surface, <span className="text-amber-200">{secondary.name}</span> works
                as your soul lesson, quietly pulling you toward {secondary.keywords[0].toLowerCase()}.
              </span>
            )}{' '}
            Your Life Path {lp.number} ({lpProfile.title.toLowerCase()}) describes the road
            itself: {lpProfile.strengths[0].toLowerCase()} is the gift,{' '}
            {lpProfile.challenges[0].toLowerCase()} is the test.
            {nameNumbers && nameProfile && (
              <span>
                {' '}
                And your name — <span className="text-amber-200">{nameNumbers.cleanedName}</span> —
                carries the destiny number {nameNumbers.expression}
                {nameNumbers.expressionIsMaster && ' ✦'} ({nameProfile.title.toLowerCase()}), the
                current you add to everything you touch. When birth card, life path and destiny
                number point the same way, the whole chart lights up at once.
              </span>
            )}
            {!nameNumbers && (
              <span>
                {' '}
                When the outer card and the inner number agree — when you live your{' '}
                {primary.keywords[0].toLowerCase()} in the service of your path — the whole chart
                lights up at once.
              </span>
            )}
          </p>
        )}
      </section>
    </div>
  )
}
