import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { SiteNav } from '@/components/SmartRef'
import FoolsJourney from '@/components/FoolsJourney'
import {
  computeSynastry,
  LAYER_META,
  scoreLabel,
  type LayerKey,
  type PersonInput,
  type SynastryResult,
} from '@/lib/synastry'
import { CITIES, findCity, type City } from '@/lib/astrology'

const ALL_LAYERS: LayerKey[] = ['signs', 'cards', 'numbers', 'stars']

interface PersonForm {
  name: string
  date: string
  time: string
  cityText: string
}

const EMPTY_PERSON: PersonForm = { name: '', date: '', time: '', cityText: '' }

function PersonFields({
  id,
  title,
  value,
  onChange,
}: {
  id: string
  title: string
  value: PersonForm
  onChange: (next: PersonForm) => void
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-cinzel text-lg text-amber-100 text-center">{title}</h3>
      <div className="space-y-2 text-left">
        <Label htmlFor={`${id}-name`} className="text-indigo-200/90 tracking-wide">
          Name <span className="text-indigo-300/50">— optional</span>
        </Label>
        <Input
          id={`${id}-name`}
          value={value.name}
          placeholder="How shall we call you?"
          onChange={(e) => onChange({ ...value, name: e.target.value })}
          className="bg-indigo-950/40 border-indigo-400/30 text-indigo-100"
        />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor={`${id}-date`} className="text-indigo-200/90 tracking-wide">
          Birth date <span className="text-amber-300/80">✦ required</span>
        </Label>
        <Input
          id={`${id}-date`}
          type="date"
          value={value.date}
          min="1900-01-01"
          max="2099-12-31"
          onChange={(e) => onChange({ ...value, date: e.target.value })}
          className="bg-indigo-950/40 border-indigo-400/30 text-indigo-100"
        />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor={`${id}-time`} className="text-indigo-200/90 tracking-wide">
          Birth time <span className="text-indigo-300/50">— optional</span>
        </Label>
        <Input
          id={`${id}-time`}
          type="time"
          value={value.time}
          onChange={(e) => onChange({ ...value, time: e.target.value })}
          className="bg-indigo-950/40 border-indigo-400/30 text-indigo-100"
        />
      </div>
      <div className="space-y-2 text-left">
        <Label htmlFor={`${id}-city`} className="text-indigo-200/90 tracking-wide">
          Birth city <span className="text-indigo-300/50">— optional</span>
        </Label>
        <Input
          id={`${id}-city`}
          list={`${id}-cities`}
          placeholder="Start typing a major city…"
          value={value.cityText}
          onChange={(e) => onChange({ ...value, cityText: e.target.value })}
          className="bg-indigo-950/40 border-indigo-400/30 text-indigo-100"
        />
        <datalist id={`${id}-cities`}>
          {CITIES.map((c) => (
            <option key={`${c.name}-${c.country}`} value={`${c.name}, ${c.country}`} />
          ))}
        </datalist>
      </div>
    </div>
  )
}

/** Circular score gauge for the combined synastry result */
function ScoreRing({ score }: { score: number }) {
  const r = 52
  const c = 2 * Math.PI * r
  return (
    <div className="relative w-44 h-44 mx-auto">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id="syn-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f4b942" />
          </linearGradient>
        </defs>
        <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(99,80,220,0.28)" strokeWidth="7" />
        <circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#syn-ring-grad)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - score / 100)}
          className="transition-all duration-1000 ease-out"
          style={{ filter: 'drop-shadow(0 0 6px rgba(244,185,66,0.5))' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-cinzel text-4xl text-amber-100">
          {score}
          <span className="text-lg text-amber-200/70">%</span>
        </span>
      </div>
    </div>
  )
}

/** A two-sentence human read of the bond, keyed to the score ranges of scoreLabel */
function bondVerdict(score: number, bestTitle: string, watchTitle: string): string {
  const best = bestTitle.charAt(0).toLowerCase() + bestTitle.slice(1)
  const watch = watchTitle.charAt(0).toLowerCase() + watchTitle.slice(1)
  if (score >= 85)
    return `A rare alignment — the kind of chart that makes strangers assume you have known each other for years. ${best.charAt(0).toUpperCase() + best.slice(1)} is the engine of the bond, effortless and bright; even ${watch}, your most demanding layer, reads here as texture rather than obstacle. Guard it the way you would anything rare: with honesty and maintenance, not fear.`
  if (score >= 70)
    return `A strong bond with real weather in it. ${bestTitle} carries you — trust it and build on it. ${watch} is where the work lives: not a flaw in the match, but the curriculum it offers — and couples who tend that layer deliberately rarely feel it again.`
  if (score >= 58)
    return `Workable chemistry — the kind that grows on purpose rather than arriving finished. ${bestTitle} gives you solid common ground from the first day; ${watch} will ask for translation, patience and the occasional agree-to-disagree. What you make of the space between them is the relationship.`
  if (score >= 45)
    return `A growth partnership. This pairing is less about ease and more about what two people become in each other's company. ${bestTitle} still points to genuine, bankable connection — start there. Treat ${watch} not as a verdict but as the homework: named, it softens.`
  return `A transformative dynamic — intense, and not for the faint of heart. Scores like this often mark the bonds that change people most. ${bestTitle} is your bridge; cross it often. ${watch} will test the bond's honesty — and what survives that test tends to be unbreakable.`
}

/** /synastry — compatibility across signs, cards, numbers and the full sky */
export default function SynastryPage() {
  const [a, setA] = useState<PersonForm>(EMPTY_PERSON)
  const [b, setB] = useState<PersonForm>(EMPTY_PERSON)
  const [layers, setLayers] = useState<LayerKey[]>(ALL_LAYERS)
  const [error, setError] = useState('')
  const [result, setResult] = useState<{
    result: SynastryResult
    nameA: string
    nameB: string
  } | null>(null)

  const toggleLayer = (key: LayerKey) => {
    setLayers((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    )
  }

  const resolveCity = (text: string): { city: City | null; error?: string } => {
    if (!text.trim()) return { city: null }
    const city = findCity(text)
    if (!city) {
      return {
        city: null,
        error: 'City not found — please pick the nearest major city from the suggestions (or leave it empty).',
      }
    }
    return { city }
  }

  const handleCalculate = () => {
    if (!a.date || !b.date) {
      setError('Both birth dates are needed — everything else is optional.')
      return
    }
    if (layers.length === 0) {
      setError('Choose at least one layer to compare.')
      return
    }
    const ca = resolveCity(a.cityText)
    const cb = resolveCity(b.cityText)
    if (ca.error) {
      setError(`Person 1: ${ca.error}`)
      return
    }
    if (cb.error) {
      setError(`Person 2: ${cb.error}`)
      return
    }
    const personA: PersonInput = { name: a.name, date: a.date, time: a.time || undefined, city: ca.city }
    const personB: PersonInput = { name: b.name, date: b.date, time: b.time || undefined, city: cb.city }
    const r = computeSynastry(personA, personB, layers)
    if (!r) {
      setError('One of those dates does not look right — please try again.')
      return
    }
    setError('')
    setResult({ result: r, nameA: a.name.trim() || 'Person 1', nameB: b.name.trim() || 'Person 2' })
    setTimeout(() => document.getElementById('synastry-results')?.scrollIntoView({ behavior: 'smooth' }), 100)
  }

  return (
    <div className="starfield min-h-screen relative">
      <FoolsJourney />
      <SiteNav />

      <header className="relative px-6 pt-20 pb-10 text-center max-w-4xl mx-auto">
        <div className="text-amber-200/70 text-5xl mb-6 animate-float">☉ ✦ ☽</div>
        <h1 className="font-cinzel text-4xl sm:text-6xl text-amber-100 leading-tight drop-shadow-[0_0_25px_rgba(251,191,36,0.25)]">
          Synastry
        </h1>
        <p className="mt-6 text-indigo-200/70 max-w-2xl mx-auto leading-relaxed">
          Two charts, one bond. Compare the signs, the tarot birth cards, the life path numbers
          and the full planetary sky — together as a single reading, or layer by layer, exactly
          as much as you want to know. Only the two birth dates are required.
        </p>

        <Card className="mt-10 max-w-3xl mx-auto bg-white/[0.04] border-indigo-400/25 backdrop-blur-md shadow-[0_0_60px_-15px_rgba(99,80,220,0.5)]">
          <CardContent className="pt-6 pb-6 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <PersonFields id="p1" title="☉ The First" value={a} onChange={setA} />
              <PersonFields id="p2" title="☽ The Second" value={b} onChange={setB} />
            </div>
            <div className="flex justify-center -mt-2">
              <button
                type="button"
                onClick={() => {
                  setA(b)
                  setB(a)
                }}
                className="rounded-full border border-indigo-400/25 bg-indigo-950/40 px-4 py-1.5 text-xs text-indigo-300/70 transition-colors hover:border-amber-300/50 hover:text-amber-200"
              >
                ⇄ Swap the two
              </button>
            </div>

            <div className="space-y-2">
              <Label className="text-indigo-200/90 tracking-wide">What shall we compare?</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {ALL_LAYERS.map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleLayer(key)}
                    className={`rounded-xl border px-2 py-3 text-center transition-all ${
                      layers.includes(key)
                        ? 'border-amber-300/60 bg-amber-200/10 shadow-[0_0_20px_-5px_rgba(251,191,36,0.5)]'
                        : 'border-indigo-400/20 bg-indigo-950/30 hover:border-indigo-300/40'
                    }`}
                  >
                    <span
                      className={`block text-xs font-cinzel tracking-wide ${
                        layers.includes(key) ? 'text-amber-200' : 'text-indigo-200/80'
                      }`}
                    >
                      {LAYER_META[key].title}
                    </span>
                    <span className="block text-[10px] text-indigo-300/50 mt-1 leading-tight">
                      {key === 'signs' ? 'Sun · Moon · Rising' : key === 'cards' ? 'Birth cards' : key === 'numbers' ? 'Life paths' : 'All aspects'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {error && <p className="text-rose-300/90 text-sm text-center">{error}</p>}
            <Button
              onClick={handleCalculate}
              className="w-full bg-amber-200 text-indigo-950 font-cinzel tracking-[0.2em] uppercase hover:bg-amber-100"
            >
              ✦ Compare Us
            </Button>
          </CardContent>
        </Card>
      </header>

      {result && (
        <main id="synastry-results" className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 scroll-mt-10 animate-fade-in">
          {(() => {
            const layers = result.result.layers
            const best = layers.reduce((m, l) => (l.score > m.score ? l : m), layers[0])
            const watch = layers.reduce((m, l) => (l.score < m.score ? l : m), layers[0])
            return (
              <div className="rounded-3xl border border-amber-200/30 bg-amber-200/[0.05] backdrop-blur-sm p-8 text-center">
                <p className="font-cinzel text-sm tracking-[0.3em] uppercase text-indigo-300/70">
                  {result.nameA} ✦ {result.nameB}
                </p>
                <div className="mt-5">
                  <ScoreRing score={result.result.combined} />
                </div>
                <p className="text-amber-200/90 font-cinzel text-lg mt-2">{scoreLabel(result.result.combined)}</p>
                <p className="text-indigo-100/80 text-sm leading-relaxed max-w-2xl mx-auto mt-4">
                  {bondVerdict(result.result.combined, best.title, watch.title)}
                </p>
                <p className="text-indigo-300/60 text-xs mt-3">
                  The simple average of the {layers.length} layer{layers.length === 1 ? '' : 's'} you
                  selected — each tells its own truth below.
                </p>
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {layers.map((l) => (
                    <a
                      key={l.key}
                      href={`#syn-layer-${l.key}`}
                      className="rounded-xl border border-indigo-400/20 bg-indigo-950/30 p-3 text-left transition-colors hover:border-amber-300/50"
                    >
                      <p className="font-cinzel text-[11px] tracking-wider text-amber-200/90 uppercase">
                        {l.title}
                      </p>
                      <p className="font-cinzel text-xl text-amber-100">{l.score}%</p>
                      <div className="mt-1 h-1 rounded-full bg-indigo-950/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-300/70 to-amber-200"
                          style={{ width: `${l.score}%` }}
                        />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )
          })()}

          <div className="space-y-6 mt-10">
            {result.result.layers.map((layer) => {
              const harmonious = layer.details.filter((d) => d.tone === 'harmonious').length
              const friction = layer.details.filter((d) => d.tone === 'friction').length
              const neutral = layer.details.length - harmonious - friction
              return (
              <section
                key={layer.key}
                id={`syn-layer-${layer.key}`}
                className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 scroll-mt-24"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-cinzel text-2xl text-amber-100">{layer.title}</h2>
                  <span className="font-cinzel text-xl text-amber-200/90">
                    {layer.score}% <span className="text-xs text-indigo-300/60">· {scoreLabel(layer.score)}</span>
                  </span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-indigo-950/60 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300/70 to-amber-200"
                    style={{ width: `${layer.score}%` }}
                  />
                </div>
                <p className="text-indigo-300/70 text-sm mt-3 italic">{layer.summary}</p>
                <p className="text-[11px] text-indigo-300/50 mt-2 tracking-wide">
                  {harmonious > 0 && <span className="text-emerald-200/80">✦ {harmonious} harmon{harmonious === 1 ? 'y' : 'ies'} </span>}
                  {friction > 0 && <span className="text-rose-200/80">☾ {friction} friction{friction === 1 ? '' : 's'} </span>}
                  {neutral > 0 && <span>○ {neutral} neutral</span>}
                </p>
                <div className="space-y-3 mt-4">
                  {layer.details.map((d, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl border p-4 ${
                        d.tone === 'harmonious'
                          ? 'border-emerald-300/25 bg-emerald-400/5'
                          : d.tone === 'friction'
                            ? 'border-rose-300/25 bg-rose-400/5'
                            : 'border-indigo-400/15 bg-indigo-950/40'
                      }`}
                    >
                      <p className="font-cinzel text-sm tracking-wide text-amber-200/90">{d.title}</p>
                      <p className="text-indigo-100/80 text-sm leading-relaxed mt-1">{d.text}</p>
                    </div>
                  ))}
                </div>
              </section>
              )
            })}
          </div>

          <p className="text-center text-indigo-300/40 text-xs italic mt-8">
            A score is a mirror for reflection, not a verdict — the people in the bond grade the
            bond, not the arithmetic.
          </p>
        </main>
      )}

      <footer className="text-center pb-10 text-indigo-300/40 text-xs tracking-[0.3em] uppercase">
        ☾ For reflection &amp; entertainment ✦
      </footer>
    </div>
  )
}
