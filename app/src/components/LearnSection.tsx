import type { ReactNode } from 'react'
import { Separator } from '@/components/ui/separator'
import TarotCardFace from '@/components/TarotCardFace'
import { MAJOR_ARCANA, getCard } from '@/lib/tarot'
import { SUITS, MINOR_ARCANA } from '@/lib/minorArcana'
import { getJourneyMeeting } from '@/lib/journeyMeeting'
import { getNumberProfile, MASTER_NOTES } from '@/lib/numerology'
import { PAIR_PATHS, PAIR_DETAILS } from '@/lib/extendedNumerology'

const NUMBER_ORDER = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 22, 33]
const PAIR_ORDER = Object.keys(PAIR_PATHS)

function LibraryLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      className="text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-200/70 transition-colors"
    >
      {children}
    </a>
  )
}

/** ── The Numbers 1–9 & the Master Numbers (page section, id anchors number-N) ── */
export function NumbersLibrary() {
  return (
    <div id="library-numbers" className="scroll-mt-10">
      <h3 className="font-cinzel text-2xl text-amber-100 text-center mb-2">
        The Numbers 1–9 & the Master Numbers
      </h3>
      <p className="text-indigo-300/60 text-xs italic text-center mb-8 max-w-2xl mx-auto">
        The same nine currents run through every position of your chart — life path, expression,
        soul urge, personality, birthday, attitude, maturity and balance — each bringing its own
        energy to wherever it lands.
      </p>
      <div className="space-y-6">
        {NUMBER_ORDER.map((n) => {
          const p = getNumberProfile(n)
          const isMaster = n > 9
          return (
            <article
              key={n}
              id={`number-${n}`}
              className={`rounded-3xl border p-6 sm:p-8 scroll-mt-24 ${
                isMaster
                  ? 'border-amber-200/35 bg-amber-200/[0.04]'
                  : 'border-indigo-400/20 bg-white/[0.03]'
              } backdrop-blur-sm`}
            >
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div
                  className={`relative w-24 h-24 shrink-0 rounded-full border-2 flex items-center justify-center ${
                    isMaster
                      ? 'border-amber-300/60 bg-amber-200/10 shadow-[0_0_40px_-8px_rgba(251,191,36,0.5)]'
                      : 'border-indigo-300/40 bg-indigo-500/10'
                  }`}
                >
                  <span
                    className={`font-cinzel text-4xl ${
                      isMaster ? 'text-amber-100' : 'text-indigo-100'
                    }`}
                  >
                    {n}
                  </span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-cinzel text-xl text-amber-100">
                    {n} — {p.title}
                    {isMaster && (
                      <span className="ml-2 text-amber-300/90 text-sm align-middle">
                        ✦ Master Number
                      </span>
                    )}
                  </h4>
                  <p className="text-indigo-300/70 text-xs mt-1 tracking-wide">
                    {p.strengths.join(' · ')}
                  </p>
                  <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">{p.meaning}</p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-indigo-400/15 bg-indigo-950/40 p-4">
                <h5 className="font-cinzel text-indigo-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ⚡ The energy it brings
                </h5>
                <p className="text-indigo-200/75 text-sm leading-relaxed">{p.energy}</p>
              </div>

              <p className="text-indigo-200/70 text-sm leading-relaxed mt-4">{p.detail}</p>

              {isMaster && MASTER_NOTES[n] && (
                <div className="mt-4 rounded-2xl border border-amber-200/30 bg-amber-200/[0.06] p-4">
                  <h5 className="font-cinzel text-amber-200 text-xs tracking-[0.25em] uppercase mb-2">
                    ✦ Why the master numbers show up
                  </h5>
                  <p className="text-amber-50/85 text-sm leading-relaxed">{MASTER_NOTES[n]}</p>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-4">
                  <h5 className="text-emerald-200 font-cinzel text-xs tracking-widest uppercase mb-2">
                    Strengths
                  </h5>
                  <ul className="text-indigo-100/80 text-sm space-y-1">
                    {p.strengths.map((s) => (
                      <li key={s}>✦ {s}</li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-2xl border border-rose-300/20 bg-rose-400/5 p-4">
                  <h5 className="text-rose-200 font-cinzel text-xs tracking-widest uppercase mb-2">
                    Challenges
                  </h5>
                  <ul className="text-indigo-100/80 text-sm space-y-1">
                    {p.challenges.map((c) => (
                      <li key={c}>☾ {c}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row items-center gap-5">
                <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.06] p-4 flex-1">
                  <h5 className="font-cinzel text-emerald-200 text-xs tracking-[0.25em] uppercase mb-2">
                    ✦ Working with this number
                  </h5>
                  <p className="text-emerald-50/85 text-sm leading-relaxed">{p.advice}</p>
                </div>
                {p.card && (
                  <a
                    href={`#arcana-${p.card.num}`}
                    className="flex flex-col items-center gap-2 shrink-0 group"
                  >
                    <TarotCardFace card={p.card} size="sm" />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60 group-hover:text-amber-300/80 transition-colors">
                      Its arcana · {p.card.name} ↓
                    </span>
                  </a>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}

/** ── The 22 Major Arcana (page section, id anchors arcana-N) ── */
export function ArcanasLibrary() {
  return (
    <div id="library-arcanas" className="scroll-mt-10">
      <h3 className="font-cinzel text-2xl text-amber-100 text-center mb-2">The 22 Major Arcana</h3>
      <p className="text-indigo-300/60 text-xs italic text-center mb-8 max-w-2xl mx-auto">
        The tarot and the numbers share one deck: every numerology number corresponds to a Major
        Arcana card, and every birth date walks down a chain of them.
      </p>
      <div className="space-y-6">
        {MAJOR_ARCANA.map((card) => (
          <article
            key={card.num}
            id={`arcana-${card.num}`}
            className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a href={`#arcana-${card.num}`} className="shrink-0">
                <TarotCardFace card={card} size="sm" />
              </a>
              <div className="text-center sm:text-left">
                <h4 className="font-cinzel text-xl text-amber-100">
                  {card.roman} — {card.name}
                </h4>
                <p className="text-indigo-300/70 text-xs mt-1 tracking-wide">
                  {card.keywords.join(' · ')}
                </p>
                <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">{card.meaning}</p>
              </div>
            </div>
            <p className="text-indigo-200/70 text-sm leading-relaxed mt-4">{card.detail}</p>

            {getJourneyMeeting(card.num) && (() => {
              const m = getJourneyMeeting(card.num)!
              return (
                <div className="mt-5 rounded-2xl border border-amber-200/20 bg-amber-200/[0.03] overflow-hidden">
                  <img
                    src={m.image}
                    alt={m.title}
                    className="block w-full h-auto object-contain bg-[#0d081c]"
                    loading="lazy"
                  />
                  <div className="p-4 sm:p-5">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h5 className="font-cinzel text-amber-100 text-sm tracking-wide">
                        {m.title}
                      </h5>
                      <span className="rounded-full border border-amber-300/40 bg-amber-400/10 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.2em] text-amber-200">
                        {m.role}
                      </span>
                    </div>
                    <p className="text-indigo-300/50 text-[11px] italic mb-2">{m.place}</p>
                    <p className="text-indigo-100/80 text-sm leading-relaxed">{m.text}</p>
                  </div>
                </div>
              )
            })()}
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <div className="rounded-2xl border border-rose-300/25 bg-rose-400/[0.07] p-4">
                <h5 className="font-cinzel text-rose-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ☾ Shadow side
                </h5>
                <p className="text-rose-100/90 text-sm leading-relaxed">{card.shadowDetail}</p>
              </div>
              <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.06] p-4">
                <h5 className="font-cinzel text-emerald-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ✦ Working with this card
                </h5>
                <p className="text-emerald-50/85 text-sm leading-relaxed">{card.guidance}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

/** ── What each birth card pair means together (id anchors pair-K) ── */
export function PairsLibrary() {
  return (
    <div id="library-pairs" className="scroll-mt-10">
      <h3 className="font-cinzel text-2xl text-amber-100 text-center mb-2">
        What Each Birth Card Pair Means Together
      </h3>
      <p className="text-indigo-300/60 text-xs italic text-center mb-8 max-w-2xl mx-auto">
        A birth card is a portrait; a pair is a path. Here is what each personality + soul card
        combination means as a combination.
      </p>
      <div className="space-y-6">
        {PAIR_ORDER.map((key) => {
          const path = PAIR_PATHS[key]
          const detail = PAIR_DETAILS[key]
          const [primary, secondary] = key.split('-').map(Number)
          const High = getCard(primary)
          const Low = getCard(secondary)
          if (!path || !detail) return null
          return (
            <article
              key={key}
              id={`pair-${key}`}
              className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-8 scroll-mt-24"
            >
              <div className="text-center mb-5">
                <h4 className="font-cinzel text-xl text-amber-100">✦ {path} ✦</h4>
                <p className="text-indigo-300/70 text-xs mt-1 tracking-wide italic">
                  {detail.essence}
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-6 mb-5">
                <a href={`#arcana-${High.num}`} className="flex flex-col items-center gap-2 group">
                  <TarotCardFace card={High} size="sm" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60 group-hover:text-amber-300/80 transition-colors">
                    Personality · {High.name}
                  </span>
                </a>
                <a href={`#arcana-${Low.num}`} className="flex flex-col items-center gap-2 group">
                  <TarotCardFace card={Low} size="sm" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60 group-hover:text-amber-300/80 transition-colors">
                    Soul · {Low.name}
                  </span>
                </a>
              </div>
              <p className="text-indigo-100/85 text-sm leading-relaxed max-w-3xl mx-auto text-center sm:text-left">
                {detail.together}
              </p>
              {key === '17-8' && (
                <p className="text-center mt-4">
                  <LibraryLink href="#justice-curiosity">
                    …and a hidden third card walks behind this pair ↓
                  </LibraryLink>
                </p>
              )}
            </article>
          )
        })}
      </div>
    </div>
  )
}

/** ── The 56 Minor Arcana: four suits & every card (id anchors minor-cups-01 etc.) ── */
export function MinorArcanaLibrary() {
  return (
    <div id="library-minor" className="scroll-mt-10">
      <h3 className="font-cinzel text-2xl text-amber-100 text-center mb-2">The 56 Minor Arcana</h3>
      <p className="text-indigo-300/60 text-xs italic text-center mb-8 max-w-2xl mx-auto">
        Where the Majors are the great currents of a life, the Minors are the everyday weather —
        four suits of fourteen cards each. Each suit is a full story from the Ace to the King;
        each card below carries its meaning, its shadow and its practice.
      </p>

      <div className="space-y-14">
        {SUITS.map((suit) => (
          <div key={suit.suit} id={`minor-suit-${suit.suit.toLowerCase()}`} className="scroll-mt-16">
            {/* Suit overview */}
            <article className="rounded-3xl border border-amber-200/25 bg-amber-200/[0.04] backdrop-blur-sm p-6 sm:p-8 mb-6">
              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="relative w-20 h-20 shrink-0 rounded-full border-2 border-amber-300/60 bg-amber-200/10 flex items-center justify-center shadow-[0_0_40px_-8px_rgba(251,191,36,0.5)]">
                  <span className="text-3xl text-amber-100">{suit.glyph}</span>
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h4 className="font-cinzel text-xl text-amber-100">
                    Suit of {suit.suit}
                    <span className="ml-2 text-amber-300/90 text-sm align-middle">
                      ✦ {suit.element}
                    </span>
                  </h4>
                  <p className="text-indigo-300/70 text-xs mt-1 tracking-wide">
                    {suit.domain} · {suit.keywords.join(' · ')}
                  </p>
                  <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">{suit.overview}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mt-5">
                <div className="rounded-2xl border border-emerald-300/20 bg-emerald-400/5 p-4">
                  <h5 className="text-emerald-200 font-cinzel text-xs tracking-widest uppercase mb-2">
                    ✦ When the suit flows
                  </h5>
                  <p className="text-indigo-100/80 text-sm leading-relaxed">{suit.light}</p>
                </div>
                <div className="rounded-2xl border border-rose-300/20 bg-rose-400/5 p-4">
                  <h5 className="text-rose-200 font-cinzel text-xs tracking-widest uppercase mb-2">
                    ☾ When it floods or freezes
                  </h5>
                  <p className="text-indigo-100/80 text-sm leading-relaxed">{suit.shadow}</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.06] p-4">
                <h5 className="font-cinzel text-emerald-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ✦ Working with this suit
                </h5>
                <p className="text-emerald-50/85 text-sm leading-relaxed">{suit.guidance}</p>
              </div>
            </article>

            {/* The fourteen cards of the suit */}
            <div className="grid gap-6 md:grid-cols-2">
              {MINOR_ARCANA.filter((c) => c.suit === suit.suit).map((card) => (
                <article
                  key={card.id}
                  id={`minor-${card.id}`}
                  className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-5 sm:p-6 scroll-mt-24"
                >
                  <div className="flex items-start gap-4">
                    <a href={`#minor-${card.id}`} className="shrink-0 pt-1">
                      <TarotCardFace card={card} size="sm" />
                    </a>
                    <div className="text-center sm:text-left min-w-0">
                      <h4 className="font-cinzel text-lg text-amber-100 leading-tight">
                        {card.name}
                      </h4>
                      <p className="text-indigo-300/70 text-xs mt-1 tracking-wide">
                        {card.keywords.join(' · ')}
                      </p>
                      <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">
                        {card.meaning}
                      </p>
                    </div>
                  </div>
                  <p className="text-indigo-200/70 text-sm leading-relaxed mt-4">{card.detail}</p>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div className="rounded-2xl border border-rose-300/25 bg-rose-400/[0.07] p-4">
                      <h5 className="font-cinzel text-rose-200 text-xs tracking-[0.25em] uppercase mb-2">
                        ☾ Shadow side
                      </h5>
                      <p className="text-rose-100/90 text-sm leading-relaxed">{card.shadowDetail}</p>
                    </div>
                    <div className="rounded-2xl border border-emerald-300/25 bg-emerald-400/[0.06] p-4">
                      <h5 className="font-cinzel text-emerald-200 text-xs tracking-[0.25em] uppercase mb-2">
                        ✦ Working with this card
                      </h5>
                      <p className="text-emerald-50/85 text-sm leading-relaxed">{card.guidance}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Kept for reference: separator used between library sections */
export function LibrarySeparator() {
  return <Separator className="my-12 bg-indigo-400/10" />
}
