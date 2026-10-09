import { useMemo, type ReactNode } from 'react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getCard, type BirthCards } from '@/lib/tarot'
import { getNumberProfile, type LifePathResult } from '@/lib/numerology'
import { computeYearCard } from '@/lib/extendedNumerology'
import {
  computeConstellation,
  findEchoes,
  getDomainNotes,
  NUMBER_LOVE_NOTES,
  type Constellation,
  type DomainNotes,
  type LoveShade,
} from '@/lib/constellation'

interface Props {
  date: string
  birth: BirthCards
  lifePath: LifePathResult
}

const SHADE_STYLES: Record<LoveShade, { chip: string; label: string }> = {
  devotion: { chip: 'border-emerald-300/40 text-emerald-200', label: '✦ Devotion' },
  steady: { chip: 'border-amber-200/40 text-amber-200', label: '☾ Steady' },
  storm: { chip: 'border-rose-300/40 text-rose-200', label: '⚡ Storm' },
}

function ArcLink({ num, children }: { num: number; children: ReactNode }) {
  // 22 is The Fool in the sky's 1–22 range; the library indexes it as 0.
  const anchor = num === 22 ? 0 : num
  return (
    <Link
      to={`/library#arcana-${anchor}`}
      className="text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-200/70 transition-colors"
    >
      {children}
    </Link>
  )
}

/** Compact constellation node used inside the sky map */
function NodeTile({ num, size = 'md' }: { num: number; size?: 'sm' | 'md' }) {
  const card = getCard(num)
  const dims = size === 'md' ? 'w-16 h-16' : 'w-12 h-12'
  return (
    <div
      className={`${dims} rounded-xl border border-amber-200/50 bg-indigo-950/80 shadow-[0_0_18px_-4px_rgba(251,191,36,0.45)] flex flex-col items-center justify-center gap-0.5`}
    >
      <span className="font-cinzel text-amber-200 text-[10px] tracking-widest">{card.roman}</span>
      {size === 'md' && (
        <span className="text-[7px] uppercase tracking-wider text-indigo-200/80 text-center leading-none px-0.5">
          {card.name}
        </span>
      )}
    </div>
  )
}

/** The radial sky map: core at the centre, every card of the sky in orbit */
function SkyMap({
  core,
  nodes,
}: {
  core: number
  nodes: { num: number; label: string; angle: number; x: number; y: number }[]
}) {
  const coreCard = getCard(core)
  return (
    <div className="relative w-full max-w-[520px] aspect-square mx-auto select-none">
      {/* connection lines */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
        <circle
          cx="50"
          cy="50"
          r="36"
          fill="none"
          stroke="rgba(251,191,36,0.18)"
          strokeWidth="0.3"
          strokeDasharray="1.5 1.5"
        />
        {nodes.map((n) => (
          <line
            key={n.num + n.label}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="rgba(251,191,36,0.22)"
            strokeWidth="0.35"
          />
        ))}
        {nodes.map((n) => (
          <circle key={'dot-' + n.num + n.label} cx={n.x} cy={n.y} r="0.9" fill="rgba(253,230,138,0.8)" />
        ))}
      </svg>

      {/* orbiting nodes */}
      {nodes.map((n) => (
        <div
          key={n.num + n.label}
          className="absolute flex flex-col items-center gap-1"
          style={{
            left: `${n.x}%`,
            top: `${n.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <NodeTile num={n.num} />
          <span className="text-[8px] sm:text-[9px] uppercase tracking-[0.15em] text-indigo-200/70 whitespace-nowrap">
            {n.label}
          </span>
        </div>
      ))}

      {/* the core */}
      <div
        className="absolute flex flex-col items-center gap-1"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl border border-amber-200/30 shadow-[0_0_40px_-5px_rgba(251,191,36,0.5)]" />
          <div className="w-24 h-24 rounded-2xl border-2 border-amber-200/70 bg-indigo-950/90 flex flex-col items-center justify-center gap-1">
            <span className="font-cinzel text-amber-200 text-sm tracking-widest">
              {coreCard.roman}
            </span>
            <span className="font-cinzel text-amber-100 text-xs text-center leading-tight px-1">
              {coreCard.name}
            </span>
          </div>
        </div>
        <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200/80">Core</span>
      </div>
    </div>
  )
}

export default function ConstellationPanel({ date, birth, lifePath }: Props) {
  const sky = useMemo<Constellation | null>(() => computeConstellation(date), [date])
  const yearCard = useMemo(() => computeYearCard(date, new Date().getFullYear())?.card, [date])

  const lpCard = getNumberProfile(lifePath.number).card
  const bdCard = getNumberProfile(lifePath.birthdayNumber).card

  if (!sky) return null

  const [loveLine, moneyLine, talentLine] = sky.lines

  /** All sky nodes (deduped by card, labels merged), evenly spaced around the core */
  const nodes = useMemo(() => {
    const raw: { num: number; label: string }[] = [
      { num: birth.primary, label: 'Birth Card' },
      ...(birth.secondary !== birth.primary
        ? [{ num: birth.secondary, label: 'Soul Card' }]
        : []),
      ...(lpCard ? [{ num: lpCard.num, label: 'Life Path' }] : []),
      ...(bdCard && bdCard.num !== lpCard?.num
        ? [{ num: bdCard.num, label: 'Birthday' }]
        : []),
      { num: loveLine.positions[1].num, label: 'Love' },
      { num: moneyLine.positions[1].num, label: 'Money' },
      { num: talentLine.positions[1].num, label: 'Talent' },
      ...(yearCard ? [{ num: yearCard.num, label: 'This Year' }] : []),
    ]
    const merged = new Map<number, string[]>()
    for (const n of raw) merged.set(n.num, [...(merged.get(n.num) ?? []), n.label])
    const list = Array.from(merged.entries()).map(([num, labels]) => ({
      num,
      label: labels.join(' · '),
    }))
    return list.map((n, i) => {
      const angle = (2 * Math.PI * i) / list.length - Math.PI / 2
      return {
        ...n,
        angle,
        x: 50 + 36 * Math.cos(angle),
        y: 50 + 36 * Math.sin(angle),
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [birth.primary, birth.secondary, date])

  /** Echoes: arcana appearing in more than one place are the loudest themes */
  const echoes = findEchoes([
    { num: birth.primary, where: 'Birth Card' },
    ...(birth.secondary !== birth.primary
      ? [{ num: birth.secondary, where: 'Soul Card' }]
      : []),
    ...(lpCard ? [{ num: lpCard.num, where: 'Life Path' }] : []),
    { num: sky.core, where: 'Core' },
    { num: loveLine.positions[1].num, where: 'Love Line' },
    { num: moneyLine.positions[1].num, where: 'Money Line' },
    { num: talentLine.positions[1].num, where: 'Talent Line' },
  ])

  /** The love reading: birth pair + love line, classified by shade */
  const loveNums = Array.from(
    new Set([birth.primary, birth.secondary, ...loveLine.positions.map((p) => p.num)]),
  )
  const loveCards = loveNums
    .map((num) => ({ num, notes: getDomainNotes(num) }))
    .filter((c): c is { num: number; notes: DomainNotes } => c.notes !== undefined)
  const devotion = loveCards.filter((c) => c.notes.shade === 'devotion')
  const storm = loveCards.filter((c) => c.notes.shade === 'storm')
  const desireCard = getCard(loveLine.positions[1].num)

  const loveNumbers = Array.from(
    new Set([lifePath.number, lifePath.birthdayNumber].filter((n) => NUMBER_LOVE_NOTES[n])),
  )

  return (
    <section
      id="layer-constellation"
      className="rounded-3xl border border-amber-200/25 bg-gradient-to-b from-amber-200/[0.05] to-transparent p-6 sm:p-10 scroll-mt-24"
    >
      <div className="text-center mb-8">
        <Badge
          variant="outline"
          className="border-amber-200/40 text-amber-200 mb-3 tracking-[0.2em] uppercase"
        >
          The Constellation · Beyond the Two Cards
        </Badge>
        <h3 className="font-cinzel text-2xl text-amber-100">Your Life Constellation</h3>
        <p className="text-indigo-200/70 text-sm mt-2 max-w-2xl mx-auto">
          Your birth date hides an entire sky. The day, the month and the year each reduce to a
          Major Arcana; combined, they draw a personal constellation — a core energy at the centre
          and three life lines running through{' '}
          <span className="text-amber-200/90">love, money and talent</span>. This is the same date
          your birth cards came from, read as one connected map instead of two cards.
        </p>
      </div>

      {/* ── The sky map ─────────────────────────────────────── */}
      <div className="mb-12">
        <div className="hidden sm:block">
          <SkyMap core={sky.core} nodes={nodes} />
        </div>
        {/* Mobile: the same sky as a compact grid */}
        <div className="sm:hidden grid grid-cols-3 gap-3 max-w-sm mx-auto">
          <div className="col-span-3 flex flex-col items-center gap-1 mb-1">
            <div className="w-20 h-20 rounded-2xl border-2 border-amber-200/70 bg-indigo-950/90 flex flex-col items-center justify-center gap-0.5 shadow-[0_0_30px_-5px_rgba(251,191,36,0.5)]">
              <span className="font-cinzel text-amber-200 text-xs tracking-widest">
                {getCard(sky.core).roman}
              </span>
              <span className="font-cinzel text-amber-100 text-[10px] text-center px-1 leading-tight">
                {getCard(sky.core).name}
              </span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-amber-200/80">
              Core · <span className="font-mono normal-case">{sky.coreWorkings}</span>
            </span>
          </div>
          {nodes.map((n) => (
            <div key={n.num + n.label} className="flex flex-col items-center gap-1">
              <NodeTile num={n.num} size="sm" />
              <span className="text-[8px] uppercase tracking-wider text-indigo-200/70 text-center leading-tight">
                {getCard(n.num).name} · {n.label}
              </span>
            </div>
          ))}
        </div>
        <p className="text-center text-indigo-300/60 text-xs mt-4 font-mono">
          {sky.anchors.dayWorkings} · month {sky.anchors.month} · {sky.anchors.yearWorkings} · core{' '}
          {sky.coreWorkings}
        </p>
        <p className="text-center text-indigo-200/70 text-sm mt-2 max-w-2xl mx-auto">
          <span className="text-amber-200/90">{getCard(sky.core).name}</span> holds the centre of
          your sky — {getCard(sky.core).keywords.slice(0, 2).join(' and ').toLowerCase()} as the
          quiet theme everything else orbits.{' '}
          <ArcLink num={sky.core}>Full entry for {getCard(sky.core).name} ↓</ArcLink>
        </p>
      </div>

      {/* ── Echoes: the loudest themes ──────────────────────── */}
      {echoes.length > 0 && (
        <div className="mb-12 text-center">
          <h4 className="font-cinzel text-amber-100 text-lg mb-2">Echoes in Your Sky</h4>
          <p className="text-indigo-300/60 text-xs mb-4 max-w-xl mx-auto italic">
            A card that appears in more than one place is not a coincidence — it is the loudest
            theme in the chart, asking to be understood once and applied everywhere.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {echoes.map((e) => (
              <div
                key={e.num}
                className="rounded-2xl border border-amber-200/25 bg-white/[0.03] px-4 py-3"
              >
                <p className="font-cinzel text-amber-200 text-sm">
                  {getCard(e.num).name} <span className="text-amber-300/70">× {e.count}</span>
                </p>
                <p className="text-indigo-300/70 text-xs mt-0.5">{e.where.join(' · ')}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator className="mb-10 bg-indigo-400/10" />

      {/* ── The three life lines ────────────────────────────── */}
      <div className="space-y-10">
        {sky.lines.map((line) => (
          <div key={line.key}>
            <h4 className="font-cinzel text-xl text-amber-100 text-center mb-1">{line.title}</h4>
            <p className="text-indigo-300/60 text-xs italic text-center mb-6 max-w-2xl mx-auto">
              {line.intro}
            </p>
            <div className="grid md:grid-cols-3 gap-5">
              {line.positions.map((pos, i) => {
                const card = getCard(pos.num)
                const notes = getDomainNotes(pos.num)
                return (
                  <div
                    key={pos.label}
                    className={`rounded-2xl p-5 flex flex-col items-center text-center gap-2 ${
                      i === 1
                        ? 'border-2 border-amber-200/40 bg-amber-200/[0.05] shadow-[0_0_35px_-10px_rgba(251,191,36,0.4)]'
                        : 'border border-indigo-400/15 bg-indigo-950/40'
                    }`}
                  >
                    <p className="font-cinzel text-amber-200 text-sm tracking-wide">{pos.label}</p>
                    <p className="text-indigo-300/60 text-[11px] italic leading-snug min-h-[2.2em]">
                      {pos.role}
                    </p>
                    <NodeTile num={pos.num} />
                    <p className="font-cinzel text-amber-100 text-sm">
                      <ArcLink num={pos.num}>{card.name}</ArcLink>
                    </p>
                    <p className="font-mono text-[10px] text-indigo-300/50">{pos.workings}</p>
                    <p className="text-indigo-200/75 text-sm leading-relaxed">
                      {notes ? (line.key === 'love' ? notes.love : notes.work) : ''}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-10 bg-indigo-400/10" />

      {/* ── In love and partnership ─────────────────────────── */}
      <div className="text-center mb-6">
        <Badge
          variant="outline"
          className="border-rose-300/40 text-rose-200 mb-3 tracking-[0.2em] uppercase"
        >
          The Same Sky, Read Through the Heart
        </Badge>
        <h4 className="font-cinzel text-xl text-amber-100">Which Cards Bless Your Love — and Which Test It</h4>
      </div>
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {loveCards.map(({ num, notes }) => {
          const card = getCard(num)
          const shade = SHADE_STYLES[notes.shade]
          return (
            <div
              key={num}
              className={`rounded-2xl border p-5 text-left ${
                notes.shade === 'storm'
                  ? 'border-rose-300/30 bg-rose-400/[0.05]'
                  : 'border-indigo-400/15 bg-indigo-950/40'
              }`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <p className="font-cinzel text-amber-100 text-sm">
                  <ArcLink num={num}>{card.name}</ArcLink>
                </p>
                <Badge variant="outline" className={shade.chip}>
                  {shade.label}
                </Badge>
              </div>
              <p className="text-indigo-200/75 text-sm leading-relaxed">{notes.love}</p>
            </div>
          )
        })}
      </div>
      <p className="text-indigo-100/85 text-sm leading-relaxed max-w-3xl mx-auto text-center mb-8">
        Read together:{' '}
        {devotion.length > 0 && (
          <>
            <span className="text-amber-200">{devotion.map((c) => getCard(c.num).name).join(' and ')}</span>{' '}
            are the cards that bless your bonds — they build, heal and stay.{' '}
          </>
        )}
        {storm.length > 0 && (
          <>
            <span className="text-amber-200">{storm.map((c) => getCard(c.num).name).join(' and ')}</span>{' '}
            are the ones that test them — not to break your love, but to keep it honest and awake.{' '}
          </>
        )}
        The heart of your love line is{' '}
        <span className="text-amber-200">{desireCard.name}</span>: what you privately need is{' '}
        {desireCard.keywords.slice(0, 2).join(' and ').toLowerCase()}. The full pair readings live
        in the{' '}
        <Link
          to="/pairs#library-pairs"
          className="text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200"
        >
          pairs library ↓
        </Link>
        .
      </p>

      {/* ── The numbers in love ─────────────────────────────── */}
      <div className="rounded-2xl border border-rose-300/20 bg-rose-400/[0.04] p-5 sm:p-7 mb-10">
        <h5 className="font-cinzel text-rose-200 text-sm tracking-[0.2em] uppercase mb-4 text-center">
          ♡ The Numbers in Your Chart, in Love
        </h5>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 max-w-4xl mx-auto">
          {loveNumbers.map((n) => (
            <p key={n} className="text-indigo-200/75 text-sm leading-relaxed">
              <span className="text-amber-200 font-cinzel">
                {n === lifePath.number && n === lifePath.birthdayNumber
                  ? `Life Path & Birthday ${n}`
                  : n === lifePath.number
                    ? `Life Path ${n}`
                    : `Birthday Number ${n}`}
                :{' '}
              </span>
              {NUMBER_LOVE_NOTES[n]}
            </p>
          ))}
        </div>
      </div>

      {/* ── How it is calculated ────────────────────────────── */}
      <Accordion type="single" collapsible className="max-w-3xl mx-auto space-y-3">
        <AccordionItem
          value="how"
          className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
        >
          <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
            ✦ How the constellation is calculated
          </AccordionTrigger>
          <AccordionContent className="text-indigo-200/75 leading-relaxed space-y-2">
            <p>
              The <span className="text-amber-200">day</span>,{' '}
              <span className="text-amber-200">month</span> and{' '}
              <span className="text-amber-200">year</span> of your birth are each reduced into the
              1–22 range of the Major Arcana (numbers above 22 are summed digit by digit). Their
              sum reduces to the <span className="text-amber-200">core</span> — the centre of the
              sky.
            </p>
            <p>
              Each life line then joins an anchor to the core: the love line pairs your{' '}
              <em>day</em> with the core, the money line pairs your <em>month</em>, and the talent
              line pairs your <em>year</em> — the same transparent formulas used by modern Destiny
              Matrix calculators. Every calculation is shown in mono text above, nothing is hidden.
            </p>
            <p>
              The orbiting cards are the rest of your chart — birth card, soul card, life path
              card, birthday card and this year&apos;s card — so the constellation includes
              everything the date already told you, in one picture.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="tradition"
          className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
        >
          <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
            ☾ The traditions behind it
          </AccordionTrigger>
          <AccordionContent className="text-indigo-200/75 leading-relaxed space-y-2">
            <p>
              The idea of a personal <em>tarot constellation</em> comes from Angeles Arrien and
              Mary K. Greer: a birth date vibrates to a root number, and every card reducing to
              that root — The Chariot and The Tower both answer to 7, for instance — forms one
              family of lessons called a constellation.
            </p>
            <p>
              Mapping that sky across the areas of life — love, money, talent, the cards that
              support a marriage and the ones that test it — follows the Destiny Matrix of Natalia
              Ladini (2006), which places 22 arcana on an eight-pointed star derived from the birth
              date alone. Both are modern self-reflection systems, best read as questions about
              your patterns, never as verdicts.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </section>
  )
}
