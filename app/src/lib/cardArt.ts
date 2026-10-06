/**
 * Card artwork, globbed from src/assets/cards at build time. Shared by
 * TarotCardFace and the Fool's Journey background scene.
 *
 * Major Arcana: NN_Name_EN.jpg at the top level, keyed by number (00–21).
 * Minor Arcana: SuitNN.jpg under minor/ (e.g. Cups01, Pents14), keyed by
 * their file prefix.
 */
const CARD_ART = Object.fromEntries(
  Object.entries(
    import.meta.glob('../assets/cards/*.jpg', { eager: true, import: 'default' }),
  ).map(([path, url]) => {
    const num = Number(/(\d{2})_.*\.jpg$/.exec(path)?.[1])
    return [num, url as string]
  }),
) as Record<number, string>

const MINOR_ART = Object.fromEntries(
  Object.entries(
    import.meta.glob('../assets/cards/minor/*.jpg', { eager: true, import: 'default' }),
  ).map(([path, url]) => {
    const prefix = /minor\/([A-Za-z]+\d{2})\.jpg$/.exec(path)?.[1]
    return [prefix, url as string]
  }),
) as Record<string, string>

export function getCardArt(num: number): string | undefined {
  return CARD_ART[num]
}

/** Artwork for a Minor Arcana card, e.g. ('Cups', 1) or ('Pentacles', 14). */
export function getMinorCardArt(suit: 'Cups' | 'Pentacles' | 'Swords' | 'Wands', num: number): string | undefined {
  const suitPrefix = { Cups: 'Cups', Pentacles: 'Pents', Swords: 'Swords', Wands: 'Wands' }[suit]
  return MINOR_ART[`${suitPrefix}${String(num).padStart(2, '0')}`]
}
