import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import TarotCardFace from '@/components/TarotCardFace'
import { getNumberProfile } from '@/lib/numerology'
import {
  PYTHAGOREAN_ROWS,
  computeNameNumbers,
  expressionWorkings,
  formatPartWorking,
  SOUL_URGE_DETAILS,
  PERSONALITY_DETAILS,
  DESTINY_DETAILS,
} from '@/lib/nameNumerology'

/** Destiny-number meanings (name-based, complements the life-path profiles) */
const DESTINY_MEANINGS: Record<number, string> = {
  1: 'Your name carries the signature of a natural initiator. You are remembered as someone who starts things — projects, ideas, movements — and who would rather lead than follow.',
  2: 'Your name carries the signature of a peacemaker. People experience you as gentle, intuitive and connecting — the one who smooths friction and makes collaborations actually work.',
  3: 'Your name carries the signature of a communicator. You are perceived as expressive, charming and creative — someone whose words and presence lift the mood of any room.',
  4: 'Your name carries the signature of a builder. Others see you as dependable, organised and solid — the person whose promises hold weight and whose work stands the test of time.',
  5: 'Your name carries the signature of a free spirit. People experience you as adaptable, magnetic and alive — change does not frighten you, it feeds you.',
  6: 'Your name carries the signature of a caretaker. You are seen as warm, responsible and beauty-appreciating — the one people trust with what matters most to them.',
  7: 'Your name carries the signature of a seeker. Others sense depth behind your reserve — you come across as thoughtful, perceptive and quietly wise beyond your years.',
  8: 'Your name carries the signature of a powerhouse. People read you as capable, ambitious and authoritative — someone built to handle big responsibility and bigger visions.',
  9: 'Your name carries the signature of a humanitarian. You are perceived as compassionate, artistic and worldly — the old soul others turn to when they need perspective.',
  11: 'Your name carries the rare signature of an illuminator. You come across as inspiring, intuitive and almost electrically perceptive — a natural guide for others.',
  22: 'Your name carries the rarest signature of all: the master builder. People sense you can turn grand visions into real, lasting structures — if you dare to believe in your own scale.',
  33: 'Your name carries the signature of a master teacher. You are felt as pure devotion in human form — someone whose compassion heals simply by being near.',
}

/** One-liners for Soul Urge (vowels) — what your heart privately wants */
const SOUL_URGE_LINES: Record<number, string> = {
  1: 'to lead, to pioneer, to be first',
  2: 'to love, to belong, to harmonise',
  3: 'to express, to create, to delight',
  4: 'to build, to stabilise, to be trusted',
  5: 'to roam, to experience, to be free',
  6: 'to care, to nurture, to be needed',
  7: 'to understand, to reflect, to be left in peace',
  8: 'to achieve, to command, to be respected',
  9: 'to give, to forgive, to serve something greater',
}

/** One-liners for Personality (consonants) — how you first appear to others */
const PERSONALITY_LINES: Record<number, string> = {
  1: 'comes across as confident, direct and self-assured',
  2: 'comes across as warm, gentle and easy to be around',
  3: 'comes across as fun, witty and socially bright',
  4: 'comes across as serious, capable and trustworthy',
  5: 'comes across as lively, restless and adventurous',
  6: 'comes across as kind, responsible and reassuring',
  7: 'comes across as reserved, thoughtful and a little mysterious',
  8: 'comes across as strong, polished and in control',
  9: 'comes across as open, wise and quietly charismatic',
}

function baseOf(n: number): number {
  // for master numbers, fall back to base digit for the one-liners
  return n > 9 ? Number(String(n).split('').reduce((a, d) => a + Number(d), 0)) || n : n
}

function RefLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      to={`/library${href}`}
      className="text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-200/70 transition-colors"
    >
      {children}
    </Link>
  )
}

interface Props {
  name: string
}

export default function NameNumerologyPanel({ name }: Props) {
  const numbers = computeNameNumbers(name)
  if (!numbers) return null

  const profile = getNumberProfile(numbers.expression)
  const destinyMeaning =
    DESTINY_MEANINGS[numbers.expression] ?? DESTINY_MEANINGS[baseOf(numbers.expression)]
  const soulProfile = getNumberProfile(baseOf(numbers.soulUrge))
  const persProfile = getNumberProfile(baseOf(numbers.personality))

  return (
    <section className="rounded-3xl border border-indigo-400/20 bg-white/[0.03] backdrop-blur-sm p-6 sm:p-10">
      <div className="text-center mb-8">
        <Badge
          variant="outline"
          className="border-amber-200/40 text-amber-200 mb-3 tracking-[0.2em] uppercase"
        >
          Numerology · Your Name
        </Badge>
        <h3 className="font-cinzel text-2xl text-amber-100">
          “{numbers.cleanedName}” adds up to {numbers.expression}
          {numbers.expressionIsMaster && (
            <span className="ml-2 text-amber-300/90 text-base align-middle">✦ Master Number</span>
          )}
        </h3>
        <p className="text-indigo-200/70 text-sm mt-1 italic">{profile.title} — by name</p>
      </div>

      {/* Workings: each name summed by itself */}
      <div className="max-w-2xl mx-auto mb-10">
        <div className="rounded-2xl border border-indigo-400/15 bg-indigo-950/40 p-5 space-y-2">
          {numbers.parts.map((p) => (
            <p key={p.name} className="font-mono text-sm text-indigo-200/80">
              {formatPartWorking(p)}
            </p>
          ))}
          <Separator className="bg-indigo-400/15" />
          <p className="font-mono text-sm text-amber-200/90">
            {expressionWorkings(numbers.parts)} → {numbers.expression}
          </p>
        </div>
        <p className="text-indigo-300/50 text-xs text-center mt-3 italic">
          Each name is reduced on its own, then the results are combined — the classic
          Pythagorean method.
        </p>
      </div>

      {/* ── Layer 3: Destiny / Expression ───────────────────── */}
      <div id="layer-destiny" className="grid md:grid-cols-[auto_1fr] gap-8 items-start scroll-mt-24">
        <div className="flex flex-col items-center gap-5 mx-auto">
          <div className="relative w-36 h-36 rounded-full border-2 border-amber-200/50 bg-amber-200/5 flex items-center justify-center shadow-[0_0_60px_-10px_rgba(251,191,36,0.35)]">
            <div className="absolute inset-2 rounded-full border border-amber-200/20" />
            <span className="font-cinzel text-6xl text-amber-100 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]">
              {numbers.expression}
            </span>
          </div>
          {profile.card && (
            <div className="flex flex-col items-center gap-2">
              <TarotCardFace card={profile.card} size="sm" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60">
                Your Destiny Card
              </span>
            </div>
          )}
        </div>

        <div className="space-y-5">
          <p className="text-indigo-100/90 text-base leading-relaxed">{destinyMeaning}</p>
          <div className="rounded-2xl border border-indigo-400/15 bg-indigo-950/40 p-4">
            <h5 className="font-cinzel text-indigo-200 text-xs tracking-[0.25em] uppercase mb-2">
              ⚡ The energy of {numbers.expression}
            </h5>
            <p className="text-indigo-200/75 text-sm leading-relaxed">{profile.surface}</p>
          </div>
          <p className="text-indigo-200/70 text-sm leading-relaxed">
            {DESTINY_DETAILS[numbers.expression] ?? DESTINY_DETAILS[baseOf(numbers.expression)]}
          </p>
          {numbers.expressionIsMaster && profile.masterNote && (
            <div className="rounded-2xl border border-amber-200/30 bg-amber-200/[0.06] p-4">
              <h5 className="font-cinzel text-amber-200 text-xs tracking-[0.25em] uppercase mb-2">
                ✦ A master number runs through this name
              </h5>
              <p className="text-amber-50/85 text-sm leading-relaxed">
                Master numbers carry higher voltage — and higher demand. Why it appeared, and what
                it asks of you, is its own reading:{' '}
                <RefLink href={`#number-${numbers.expression}`}>
                  the full entry on {numbers.expression} in the library ↓
                </RefLink>
              </p>
            </div>
          )}
          <p className="text-indigo-300/60 text-xs">
            Dive deeper:{' '}
            <RefLink href={`#number-${numbers.expression}`}>
              the number {numbers.expression}
            </RefLink>
            {profile.card && (
              <>
                {' · '}
                <RefLink href={`#arcana-${profile.card.num}`}>{profile.card.name}</RefLink>
              </>
            )}
          </p>
        </div>
      </div>

      <Separator className="my-8 bg-indigo-400/10" />

      {/* ── Layer 4: Soul Urge ──────────────────────────────── */}
      <div id="layer-soul-urge" className="scroll-mt-24">
        <div className="rounded-2xl border border-amber-200/25 bg-amber-200/[0.05] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex flex-col items-center gap-2 shrink-0 mx-auto sm:mx-0">
              <div className="w-16 h-16 rounded-full border border-amber-300/50 bg-amber-200/10 flex items-center justify-center">
                <span className="font-cinzel text-3xl text-amber-100">{numbers.soulUrge}</span>
              </div>
              {soulProfile.card && (
                <>
                  <TarotCardFace card={soulProfile.card} size="sm" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60">
                    Soul Urge Card
                  </span>
                </>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-cinzel text-amber-100">
                ♥ Soul Urge {numbers.soulUrge}
                {numbers.soulUrgeIsMaster && (
                  <span className="ml-2 text-amber-300/80 text-xs">✦ Master</span>
                )}
              </h4>
              <p className="text-indigo-300/60 text-xs mt-1 italic">
                From the vowels of your name — what your heart privately wants, before any strategy
                or appearance. This is the engine of the chart: every other number works to feed
                this hunger.
              </p>
              <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">
                Your heart privately wants {SOUL_URGE_LINES[baseOf(numbers.soulUrge)]}.
              </p>
              <div className="rounded-2xl border border-indigo-400/15 bg-indigo-950/40 p-4 mt-3">
                <h5 className="font-cinzel text-indigo-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ⚡ The energy it asks for
                </h5>
                <p className="text-indigo-200/75 text-sm leading-relaxed">{soulProfile.surface}</p>
              </div>
              <p className="text-indigo-200/70 text-sm leading-relaxed mt-3">
                {SOUL_URGE_DETAILS[baseOf(numbers.soulUrge)]}
              </p>
              <p className="text-indigo-300/60 text-xs mt-3">
                Dive deeper:{' '}
                <RefLink href={`#number-${baseOf(numbers.soulUrge)}`}>
                  the number {baseOf(numbers.soulUrge)}
                </RefLink>
                {soulProfile.card && (
                  <>
                    {' · '}
                    <RefLink href={`#arcana-${soulProfile.card.num}`}>
                      {soulProfile.card.name}
                    </RefLink>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Layer 5: Personality ────────────────────────────── */}
      <div id="layer-personality" className="mt-6 scroll-mt-24">
        <div className="rounded-2xl border border-indigo-300/25 bg-indigo-400/[0.05] p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start">
            <div className="flex flex-col items-center gap-2 shrink-0 mx-auto sm:mx-0">
              <div className="w-16 h-16 rounded-full border border-indigo-300/50 bg-indigo-400/10 flex items-center justify-center">
                <span className="font-cinzel text-3xl text-indigo-100">{numbers.personality}</span>
              </div>
              {persProfile.card && (
                <>
                  <TarotCardFace card={persProfile.card} size="sm" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-indigo-300/60">
                    Personality Card
                  </span>
                </>
              )}
            </div>
            <div className="flex-1">
              <h4 className="font-cinzel text-indigo-100">
                ◈ Personality {numbers.personality}
                {numbers.personalityIsMaster && (
                  <span className="ml-2 text-amber-300/80 text-xs">✦ Master</span>
                )}
              </h4>
              <p className="text-indigo-300/60 text-xs mt-1 italic">
                From the consonants of your name — the wrapper the world meets first. It filters
                how your Soul Urge and Destiny actually land on people before they know you.
              </p>
              <p className="text-indigo-100/85 text-sm leading-relaxed mt-3">
                You {PERSONALITY_LINES[baseOf(numbers.personality)]} on first meeting.
              </p>
              <div className="rounded-2xl border border-indigo-400/15 bg-indigo-950/40 p-4 mt-3">
                <h5 className="font-cinzel text-indigo-200 text-xs tracking-[0.25em] uppercase mb-2">
                  ⚡ The energy it projects
                </h5>
                <p className="text-indigo-200/75 text-sm leading-relaxed">{persProfile.surface}</p>
              </div>
              <p className="text-indigo-200/70 text-sm leading-relaxed mt-3">
                {PERSONALITY_DETAILS[baseOf(numbers.personality)]}
              </p>
              <p className="text-indigo-300/60 text-xs mt-3">
                Dive deeper:{' '}
                <RefLink href={`#number-${baseOf(numbers.personality)}`}>
                  the number {baseOf(numbers.personality)}
                </RefLink>
                {persProfile.card && (
                  <>
                    {' · '}
                    <RefLink href={`#arcana-${persProfile.card.num}`}>
                      {persProfile.card.name}
                    </RefLink>
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8 bg-indigo-400/10" />

      {/* Pythagorean chart reference */}
      <div>
        <h4 className="font-cinzel text-amber-100 text-center text-sm tracking-[0.2em] uppercase mb-4">
          The Pythagorean Letter Chart
        </h4>
        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2 max-w-3xl mx-auto">
          {PYTHAGOREAN_ROWS.map((row) => (
            <div
              key={row.number}
              className="rounded-xl border border-indigo-400/20 bg-indigo-950/40 px-2 py-3 text-center"
            >
              <div className="font-cinzel text-amber-200 text-lg">{row.number}</div>
              <div className="text-indigo-200/70 text-xs tracking-widest mt-1">{row.letters}</div>
            </div>
          ))}
        </div>
        <p className="text-indigo-300/50 text-xs text-center mt-4 italic">
          The alphabet repeats through 1–9: A=1, B=2 … I=9, then J=1 again. Vowels reveal the
          Soul Urge; consonants reveal the outer Personality.
        </p>
      </div>
    </section>
  )
}
