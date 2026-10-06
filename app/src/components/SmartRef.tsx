import type { ReactNode } from 'react'
import { Link, NavLink } from 'react-router'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const LINK_STYLE =
  'text-amber-300/90 underline decoration-amber-300/30 underline-offset-4 hover:text-amber-200 hover:decoration-amber-200/70 transition-colors'

/** Link into the reference library (/library) — client-side, hash-aware */
export function LibLink({
  hash,
  children,
  className = LINK_STYLE,
}: {
  hash: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={`/library#${hash}`} className={className}>
      {children}
    </Link>
  )
}

/** Link into the pairs page (/pairs) — client-side, hash-aware */
export function PairLink({
  hash,
  children,
  className = LINK_STYLE,
}: {
  hash: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link to={`/pairs#${hash}`} className={className}>
      {children}
    </Link>
  )
}

/** Small site navigation shown on every page — collapsed into a three-dot menu */
export function SiteNav() {
  const destinations: { to: string; end?: boolean; label: string; hint: string }[] = [
    { to: '/', end: true, label: 'Reading', hint: 'birth cards & life path' },
    { to: '/synastry', label: 'Synastry', hint: 'two charts, one story' },
    { to: '/astrology', label: 'The Sky', hint: 'natal chart & transits' },
    { to: '/library', label: 'Cards', hint: 'the 22 Major Arcana' },
    { to: '/numerology-library', label: 'Numbers', hint: 'every number, in depth' },
    { to: '/astrology-library', label: 'Cosmos', hint: 'planets, signs & houses' },
    { to: '/pairs', label: 'Pairs', hint: 'birth card combinations' },
  ]
  return (
    <nav className="absolute top-4 right-5 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Open site menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-400/25 bg-[#1a1038]/70 text-amber-200/90 shadow-lg backdrop-blur-md transition-colors hover:border-amber-300/50 hover:text-amber-100"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-[210px] border-indigo-400/25 bg-[#150d33]/95 text-indigo-100 shadow-2xl backdrop-blur-xl"
        >
          <DropdownMenuLabel className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-amber-200/70">
            Where to?
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-indigo-400/15" />
          {destinations.map((d) => (
            <DropdownMenuItem key={d.to} asChild className="focus:bg-amber-300/10 focus:text-amber-100">
              <NavLink to={d.to} end={d.end} className="cursor-pointer">
                {({ isActive }: { isActive: boolean }) => (
                  <span className="flex w-full items-baseline justify-between gap-3">
                    <span className={isActive ? 'text-amber-300' : ''}>
                      {isActive ? '✦ ' : ''}
                      {d.label}
                    </span>
                    <span className="text-[10px] normal-case tracking-normal text-indigo-300/50">
                      {d.hint}
                    </span>
                  </span>
                )}
              </NavLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  )
}
