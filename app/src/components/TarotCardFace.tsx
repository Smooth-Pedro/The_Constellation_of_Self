import type { MajorArcana } from '@/lib/tarot'
import type { MinorSuit } from '@/lib/minorArcana'
import { getSuitInfo } from '@/lib/minorArcana'
import { getCardArt, getMinorCardArt } from '@/lib/cardArt'

/** Simple glyphs for each Major Arcana — used as card centre art */
const GLYPHS: Record<number, string> = {
  0: '✈', // The Fool — a small white flower / cliff edge; use a light glyph
  1: '∞', // The Magician — lemniscate above his head
  2: '☽', // The High Priestess — the moon
  3: '♀', // The Empress — Venus
  4: '♈', // The Emperor — Aries
  5: '✠', // The Hierophant — the keys / triple crown
  6: '💑', // The Lovers
  7: '♋', // The Chariot — the city walls / Cancer
  8: '♌', // Strength — Leo
  9: '✧', // The Hermit — the lantern star
  10: '✺', // Wheel of Fortune — the wheel
  11: '⚖', // Justice — the scales
  12: '✚', // The Hanged Man — the tau cross
  13: '🦋', // Death — the white rose / scorpion: butterfly of transformation
  14: '⚗', // Temperance — the alchemical vessel
  15: '♑', // The Devil — Capricorn / the inverted pentagram
  16: '⚡', // The Tower — the lightning bolt
  17: '✶', // The Star — the eight-pointed star
  18: '🌙', // The Moon
  19: '☀', // The Sun
  20: '📯', // Judgement — the trumpet
  21: '🌍', // The World — the dancing figure in the wreath
}

type AnyCardFace = MajorArcana | { suit: MinorSuit; num: number; rank: string; name: string; keywords: string[] }

interface Props {
  card: AnyCardFace
  size?: 'sm' | 'md' | 'lg'
  flipped?: boolean
}

export default function TarotCardFace({ card, size = 'md' }: Props) {
  const sizeClasses = {
    sm: 'w-28 sm:w-32',
    md: 'w-36 sm:w-44',
    lg: 'w-44 sm:w-56',
  }[size]

  const isMinor = 'suit' in card
  const art = isMinor
    ? getMinorCardArt(card.suit, card.num)
    : getCardArt(card.num)

  // Real deck artwork; stylised fallback face if the image is missing
  if (art) {
    return (
      <div
        className={`tarot-card group relative ${sizeClasses} select-none transition-transform duration-500 hover:-translate-y-2 hover:rotate-1`}
      >
        <img
          src={art}
          alt={card.name}
          className="w-full h-auto rounded-2xl border border-amber-200/40 shadow-[0_10px_40px_-10px_rgba(120,80,220,0.55)]"
          draggable={false}
        />
      </div>
    )
  }

  const glyph = isMinor ? getSuitInfo(card.suit).glyph : GLYPHS[card.num]
  const topLabel = isMinor ? card.rank : (card as MajorArcana).roman

  return (
    <div
      className={`tarot-card group relative ${sizeClasses} aspect-[2/3.4] select-none transition-transform duration-500 hover:-translate-y-2 hover:rotate-1`}
    >
      {/* Card body */}
      <div className="absolute inset-0 rounded-2xl border-2 border-amber-200/60 bg-gradient-to-b from-indigo-950 via-[#1a1033] to-[#120a24] shadow-[0_10px_40px_-10px_rgba(120,80,220,0.45)] overflow-hidden">
        {/* Inner frame */}
        <div className="absolute inset-2 rounded-xl border border-amber-200/25 pointer-events-none" />
        {/* Corner flourishes */}
        <div className="absolute top-3 left-3 text-amber-200/50 text-xs">✦</div>
        <div className="absolute top-3 right-3 text-amber-200/50 text-xs">✦</div>
        <div className="absolute bottom-3 left-3 text-amber-200/50 text-xs">✦</div>
        <div className="absolute bottom-3 right-3 text-amber-200/50 text-xs">✦</div>

        <div className="h-full flex flex-col items-center justify-between py-5 px-3 text-center">
          <span className="font-cinzel text-amber-200/90 text-sm tracking-[0.3em]">
            {topLabel}
          </span>

          <div className="flex-1 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-amber-200/30 bg-amber-200/5 flex items-center justify-center shadow-[inset_0_0_20px_rgba(251,191,36,0.12)]">
              <span className="text-3xl sm:text-4xl text-amber-100 drop-shadow-[0_0_12px_rgba(251,191,36,0.5)]">
                {glyph}
              </span>
            </div>
            <h3 className="font-cinzel text-amber-100 text-base sm:text-lg leading-tight px-1">
              {card.name}
            </h3>
          </div>

          <div className="flex flex-wrap justify-center gap-1 px-1">
            {card.keywords.slice(0, 3).map((k) => (
              <span
                key={k}
                className="text-[9px] sm:text-[10px] uppercase tracking-wider text-indigo-200/70 border border-indigo-300/20 rounded-full px-1.5 py-0.5"
              >
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
