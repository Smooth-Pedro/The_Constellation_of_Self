import { Badge } from '@/components/ui/badge'
import { NumbersLibrary, ArcanasLibrary, MinorArcanaLibrary, LibrarySeparator } from '@/components/LearnSection'
import { SiteNav, PairLink } from '@/components/SmartRef'
import FoolsJourney from '@/components/FoolsJourney'

/** /library — the full reference: every number, every Major Arcana */
export default function LibraryPage() {
  return (
    <div className="starfield min-h-screen relative">
      <FoolsJourney />
      <SiteNav />
      <header className="relative px-6 pt-20 pb-10 text-center max-w-4xl mx-auto">
        <Badge
          variant="outline"
          className="border-amber-200/40 text-amber-200 mb-3 tracking-[0.2em] uppercase"
        >
          The Library
        </Badge>
        <h1 className="font-cinzel text-3xl sm:text-5xl text-amber-100 leading-tight">
          Every Number, Every Arcana
        </h1>
        <p className="mt-4 text-indigo-200/70 max-w-2xl mx-auto leading-relaxed text-sm">
          The reference behind every reading on this site — what each number brings into any
          position of a chart, what each of the 22 Major Arcana means, shadow included, and the
          complete Minor Arcana: all four suits, all 56 cards, each with its meaning, shadow and
          practice. The <PairLink hash="library-pairs">birth card pairs</PairLink> live on their
          own page.
        </p>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-20">
        <NumbersLibrary />
        <LibrarySeparator />
        <ArcanasLibrary />
        <LibrarySeparator />
        <MinorArcanaLibrary />
      </main>

      <footer className="text-center pb-10 text-indigo-300/40 text-xs tracking-[0.3em] uppercase">
        ☾ For reflection &amp; entertainment ✦
      </footer>
    </div>
  )
}
