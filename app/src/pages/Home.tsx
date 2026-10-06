import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import ResultsPanel, { type ReadingScope } from '@/components/ResultsPanel'
import FoolsJourney from '@/components/FoolsJourney'
import DailyReading from '@/components/DailyReading'
import ThreeCardReading from '@/components/ThreeCardReading'
import JourneyMeetings, { type JourneyEntry } from '@/components/JourneyMeetings'
import { SiteNav, LibLink, PairLink } from '@/components/SmartRef'
import { computeBirthCards } from '@/lib/tarot'
import { computeLifePath, getNumberProfile } from '@/lib/numerology'
import { computeNameNumbers } from '@/lib/nameNumerology'

type ScopeOption = {
  value: ReadingScope
  icon: string
  label: string
  hint: string
}

const SCOPE_OPTIONS: ScopeOption[] = [
  { value: 'date', icon: '📅', label: 'Date of birth', hint: 'Tarot birth cards & life path' },
  { value: 'name', icon: '🔤', label: 'Name', hint: 'Destiny, soul urge & personality' },
  { value: 'all', icon: '✦', label: 'Everything', hint: 'The complete chart' },
]

function dateWorkings(date: string): string {
  const digits = date.replace(/\D/g, '')
  const total = digits.split('').reduce((acc, d) => acc + Number(d), 0)
  return digits.split('').join(' + ') + ' = ' + total
}

export default function Home() {
  const [date, setDate] = useState('')
  const [name, setName] = useState('')
  const [scope, setScope] = useState<ReadingScope>('all')
  const [error, setError] = useState('')
  const [result, setResult] = useState<{
    date: string
    name: string
    scope: ReadingScope
    birth: NonNullable<ReturnType<typeof computeBirthCards>> | null
    lifePath: NonNullable<ReturnType<typeof computeLifePath>> | null
    workings: string
  } | null>(null)

  const needsDate = scope === 'date' || scope === 'all'
  const needsName = scope === 'name' || scope === 'all'

  /** The user's cards, shown as "The Fool Meets Your Cards" after the results */
  const journeyEntries = useMemo<JourneyEntry[]>(() => {
    if (!result) return []
    const out: JourneyEntry[] = []
    if (result.birth) {
      out.push({ num: result.birth.primary, label: 'Birth Card' })
      if (result.birth.secondary !== result.birth.primary) {
        out.push({ num: result.birth.secondary, label: 'Soul Card' })
      }
    }
    if (result.lifePath) {
      const card = getNumberProfile(result.lifePath.number).card
      if (card) out.push({ num: card.num, label: 'Life Path Card' })
    }
    if (result.name) {
      const nn = computeNameNumbers(result.name)
      const card = nn ? getNumberProfile(nn.expression).card : null
      if (card) out.push({ num: card.num, label: 'Name Card' })
    }
    return out
  }, [result])

  const handleCalculate = () => {
    if (needsDate && !date) {
      setError(
        scope === 'date'
          ? 'Please choose your birth date first.'
          : 'Please choose your birth date first — or switch to the name-only reading.',
      )
      return
    }
    if (needsName && !name.trim()) {
      setError(
        scope === 'name'
          ? 'Please enter your name for a name reading.'
          : 'Please enter your name for the name numerology layer.',
      )
      return
    }
    if (name.trim() && !/[A-Za-z]/.test(name)) {
      setError('Your name needs at least one letter for name numerology.')
      return
    }

    const birth = needsDate ? computeBirthCards(date) : null
    const lifePath = needsDate ? computeLifePath(date) : null
    if (needsDate && (!birth || !lifePath)) {
      setError('That date does not look right — please try again.')
      return
    }
    setError('')
    setResult({
      date,
      name: name.trim(),
      scope,
      birth,
      lifePath,
      workings: needsDate && date ? dateWorkings(date) : '',
    })
    setTimeout(
      () => document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' }),
      100,
    )
  }

  return (
    <div className="starfield min-h-screen">
      {/* ── The Fool's Journey: the meeting of the hour, behind everything ── */}
      <FoolsJourney />
      <SiteNav />

      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="relative px-6 pt-20 pb-14 text-center max-w-4xl mx-auto">
        <div className="text-amber-200/70 text-5xl mb-6 animate-float">☾ ✦ ☀</div>
        <h1 className="font-cinzel text-4xl sm:text-6xl text-amber-100 leading-tight drop-shadow-[0_0_25px_rgba(251,191,36,0.25)]">
          Tarot Birth Cards
          <span className="block text-2xl sm:text-3xl mt-3 text-indigo-200/90">
            &amp; Numerology Life Path
          </span>
        </h1>
        <p className="mt-6 text-indigo-200/70 max-w-2xl mx-auto leading-relaxed">
          Your birth date is a key. Turn it once through the Major Arcana to reveal your{' '}
          <span className="text-amber-200">Tarot Birth Cards</span> — then through the numbers to
          find your <span className="text-amber-200">Life Path</span>. Add your name and the
          Pythagorean chart reveals your <span className="text-amber-200">Destiny, Soul Urge and
          Personality numbers</span> — one complete portrait of who you are and why you are here.
        </p>

        {/* ── Calculator form ────────────────────────────── */}
        <Card className="mt-10 max-w-md mx-auto bg-white/[0.04] border-indigo-400/25 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(99,80,220,0.5)]">
          <CardContent className="pt-6 pb-6 space-y-5">
            <div className="space-y-2">
              <Label className="text-indigo-200/90 tracking-wide">What would you like to read?</Label>
              <div className="grid grid-cols-3 gap-2">
                {SCOPE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setScope(opt.value)
                      setError('')
                    }}
                    className={`rounded-xl border px-2 py-3 text-center transition-all ${
                      scope === opt.value
                        ? 'border-amber-300/60 bg-amber-200/10 shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]'
                        : 'border-indigo-400/20 bg-indigo-950/30 hover:border-indigo-300/40'
                    }`}
                  >
                    <span className="block text-xl mb-1">{opt.icon}</span>
                    <span
                      className={`block text-xs font-cinzel tracking-wide ${
                        scope === opt.value ? 'text-amber-200' : 'text-indigo-200/80'
                      }`}
                    >
                      {opt.label}
                    </span>
                    <span className="block text-[10px] text-indigo-300/50 mt-0.5 leading-tight">
                      {opt.hint}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {needsDate && (
              <div className="space-y-2 text-left">
                <Label htmlFor="birthdate" className="text-indigo-200/90 tracking-wide">
                  Your birth date
                </Label>
                <Input
                  id="birthdate"
                  type="date"
                  value={date}
                  min="1900-01-01"
                  max="2099-12-31"
                  onChange={(e) => {
                    setDate(e.target.value)
                    setError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCalculate()
                  }}
                  className="bg-indigo-950/50 border-indigo-400/30 text-indigo-100 focus-visible:ring-amber-300/60 [color-scheme:dark]"
                />
              </div>
            )}
            {needsName && (
              <div className="space-y-2 text-left">
                <Label htmlFor="fullname" className="text-indigo-200/90 tracking-wide">
                  Your full name
                  {scope === 'all' && (
                    <span className="text-indigo-300/50"> (for name numerology)</span>
                  )}
                </Label>
                <Input
                  id="fullname"
                  type="text"
                  value={name}
                  placeholder="e.g. Mary Jane Smith"
                  onChange={(e) => {
                    setName(e.target.value)
                    setError('')
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleCalculate()
                  }}
                  className="bg-indigo-950/50 border-indigo-400/30 text-indigo-100 placeholder:text-indigo-300/30 focus-visible:ring-amber-300/60"
                />
              </div>
            )}
            {error && <p className="text-rose-300 text-sm text-left">{error}</p>}
            <Button
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-300 text-indigo-950 font-semibold hover:from-amber-400 hover:to-amber-200 shadow-[0_0_25px_-5px_rgba(251,191,36,0.6)]"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Reveal My Reading
            </Button>
          </CardContent>
        </Card>
      </header>

      {/* ── Results ──────────────────────────────────────── */}
      {result && (
        <main id="results" className="px-4 sm:px-6 pb-10 scroll-mt-8">
          <ResultsPanel
            date={result.date}
            name={result.name}
            birth={result.birth ?? undefined}
            lifePath={result.lifePath ?? undefined}
            workings={result.workings}
            scope={result.scope}
          />
          <div className="max-w-5xl mx-auto">
            <JourneyMeetings entries={journeyEntries} />
          </div>
        </main>
      )}

      {/* ── AI daily reading ─────────────────────────────── */}
      <DailyReading />

      {/* ── Three-card readings ──────────────────────────── */}
      <ThreeCardReading />

      {/* ── How it works ─────────────────────────────────── */}
      <section className="max-w-3xl mx-auto px-6 pb-20">
        <h2 className="font-cinzel text-2xl text-amber-100 text-center mb-6">
          How the calculation works
        </h2>
        <Accordion type="single" collapsible className="space-y-3">
          <AccordionItem
            value="tarot"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              🃏 Tarot Birth Cards
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed">
              Add every digit of your birth date together and reduce until you reach a number of{' '}
              <span className="text-amber-200">21 or less</span> — that number is a Major Arcana
              card, your <em>personality card</em>. Then add the two digits of that number
              together for your <em>soul card</em>. For example,{' '}
              <span className="font-mono text-amber-200/90">19 → The Sun</span>,{' '}
              <span className="font-mono text-amber-200/90">1 + 9 = 10 → Wheel of Fortune</span>,
              and <span className="font-mono text-amber-200/90">1 + 0 = 1 → The Magician</span>{' '}
              — a rare triple birth card.
              <span className="block mt-3 text-xs">
                Explore:{' '}
                <LibLink hash="library-arcanas">all 22 Major Arcana</LibLink>
                {' · '}
                <PairLink hash="library-pairs">what each pair means together</PairLink>
                {' · '}
                e.g.{' '}
                <LibLink hash="arcana-19">The Sun</LibLink>,{' '}
                <LibLink hash="arcana-10">Wheel of Fortune</LibLink>,{' '}
                <LibLink hash="arcana-1">The Magician</LibLink>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="numerology"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              🔢 Life Path Number
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed">
              Numerology adds the same digits but keeps reducing to a{' '}
              <span className="text-amber-200">single digit</span> — unless it lands on a{' '}
              <span className="text-amber-200">master number</span>: 11, 22 or 33, which are kept
              whole. Your life path number describes your life’s theme and direction, and each
              number corresponds to its own Major Arcana card — the two systems share one deck.
              <span className="block mt-3 text-xs">
                Explore:{' '}
                <LibLink hash="library-numbers">every life path number in depth</LibLink>
                {' · '}
                e.g.{' '}
                <LibLink hash="number-7">the 7</LibLink>,{' '}
                <LibLink hash="arcana-7">its card, The Chariot</LibLink>,{' '}
                <LibLink hash="number-11">master number 11</LibLink>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="name"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              🔤 Name Numerology (Pythagorean)
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed">
              Every letter maps to a number (A=1, B=2 … I=9, then the alphabet wraps so J=1).{' '}
              <span className="text-amber-200">Each name is summed and reduced by itself</span> —
              first name, middle name, last name — and only then are the results combined into
              your <em>Destiny (Expression) number</em>. The vowels alone give your{' '}
              <em>Soul Urge</em> — what your heart privately wants — and the consonants alone give
              your <em>Personality</em> — how you appear to others on first meeting.
              <span className="block mt-3 text-xs">
                Explore:{' '}
                <LibLink hash="number-3">the numbers</LibLink>
                {' · '}
                <PairLink hash="library-pairs">the pairs</PairLink>
                {' · '}
                <LibLink hash="library-arcanas">the arcanas behind them</LibLink>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="extended"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              🌗 The Complete Chart — every other layer
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed space-y-2">
              <p>
                <span className="text-amber-200">Attitude number</span> (month + day): your
                instinctive first response, with its own card.
              </p>
              <p>
                <span className="text-amber-200">Year card</span> (month + day + current year): the
                theme of each year of your life.
              </p>
              <p>
                <span className="text-amber-200">Maturity number</span> (life path + destiny): the
                person you fully become from mid-life onward.
              </p>
              <p>
                <span className="text-amber-200">Balance number</span> (first letters of each name):
                how you restore yourself under stress.
              </p>
              <p>
                <span className="text-amber-200">Karmic debt scan</span>: checks your birth day,
                life path and name for 13/4, 14/5, 16/7 and 19/1 before they reduce — debts from
                past cycles, each with its paying card.
              </p>
              <span className="block mt-3 text-xs">
                Explore:{' '}
                <LibLink hash="library-numbers">every number, in depth</LibLink>
                {' · '}
                <LibLink hash="arcana-16">The Tower</LibLink>,{' '}
                <LibLink hash="arcana-7">The Chariot</LibLink>
                {' · '}
                <PairLink hash="pair-16-7">the 16/7 pair</PairLink>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="masters"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              ✦ Master numbers &amp; karmic debts — why they show up
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed space-y-2">
              <p>
                <span className="text-amber-200">Master numbers</span> (11, 22, 33) appear when
                the digits of your date or name refuse to finish reducing — the arithmetic itself
                flags a higher voltage, so the number is kept whole instead of being folded into a
                single digit. Each master number is a base digit (2, 4, 6) raised to a harder
                octave: more gift, more demand.
              </p>
              <p>
                <span className="text-amber-200">Karmic debts</span> (13, 14, 16, 19) are the
                opposite signature: numbers that appear <em>mid-reduction</em> and mark lessons
                carried over from a previous cycle. They never cancel the gift — a 16/7 is still a
                7 — but the theme repeats with interest until it is lived consciously. Every debt
                names its paying card.
              </p>
              <span className="block mt-3 text-xs">
                Explore:{' '}
                <LibLink hash="number-11">11 · the Illuminator</LibLink>,{' '}
                <LibLink hash="number-22">22 · the Master Builder</LibLink>,{' '}
                <LibLink hash="number-33">33 · the Master Teacher</LibLink>
                {' · '}
                <PairLink hash="pair-16-7">16/7 · Tower into Chariot</PairLink>,{' '}
                <PairLink hash="pair-19-10">19/1 · Sun into Wheel</PairLink>
              </span>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem
            value="together"
            className="border border-indigo-400/20 rounded-2xl bg-white/[0.03] px-5"
          >
            <AccordionTrigger className="text-amber-100 hover:no-underline font-cinzel">
              ✦ Used together
            </AccordionTrigger>
            <AccordionContent className="text-indigo-200/75 leading-relaxed">
              The tarot shows <em>what energy you embody</em>; numerology shows{' '}
              <em>the road that energy travels on</em>. Your birth card is the face you wear, your
              soul card is the lesson underneath, your life path number is the journey, and your
              name adds the current you bring to it all. This site calculates every layer from one
              date and one name, then weaves them into a single reading.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      <footer className="text-center pb-10 text-indigo-300/40 text-xs tracking-[0.3em] uppercase">
        ☾ For reflection &amp; entertainment ✦
      </footer>
    </div>
  )
}
