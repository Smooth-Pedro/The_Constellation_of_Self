import { lazy, Suspense, useEffect, type ComponentType } from 'react'
import { Routes, Route, useLocation } from 'react-router'
import Home from './pages/Home'

/**
 * lazy with deploy resilience: a user whose tab outlives a deployment holds
 * references to chunk files that no longer exist. A failed chunk fetch then
 * white-screens the app; reloading once picks up the fresh index.html and
 * the new chunk map. sessionStorage prevents a reload loop if the reload
 * itself fails.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function lazyReload<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
) {
  return lazy(() =>
    factory().catch((err: unknown) => {
      try {
        if (!sessionStorage.getItem('chunk-reload-once')) {
          sessionStorage.setItem('chunk-reload-once', String(Date.now()))
          location.reload()
        }
      } catch {
        /* private mode: fall through to the normal error */
      }
      throw err
    }),
  )
}

// Everything below the home page is code-split: a visitor who never leaves
// the front page never downloads the library, astrology engine or synastry
// data. This is the biggest win for the "black screen on slow devices" report.
const LibraryPage = lazyReload(() => import('./pages/LibraryPage'))
const PairsPage = lazyReload(() => import('./pages/PairsPage'))
const AstrologyPage = lazyReload(() => import('./pages/AstrologyPage'))
const SynastryPage = lazyReload(() => import('./pages/SynastryPage'))
const AstroLibraryPage = lazyReload(() => import('./pages/AstroLibraryPage'))
const NumerologyLibraryPage = lazyReload(() => import('./pages/NumerologyLibraryPage'))

/** Lightweight full-screen fallback while a route chunk streams in. */
function RouteFallback() {
  return (
    <div className="min-h-screen starfield flex items-center justify-center px-6">
      <p className="font-cinzel text-amber-100/80 tracking-[0.25em] animate-pulse">
        ✦ turning the cards ✦
      </p>
    </div>
  )
}

/** Smooth-scroll to the hash target after a route change; top otherwise */
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => {
        document
          .getElementById(decodeURIComponent(hash.slice(1)))
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
      return () => clearTimeout(t)
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
  return null
}

/**
 * Arrow keys scroll the page (skipped while typing in inputs).
 * Single press = half a screen, smooth. Holding = continuous fast scroll
 * driven by a timer. Ticks use behavior 'instant' to override the global
 * scroll-behavior: smooth CSS — otherwise each 16 ms tick restarts a smooth
 * animation and holding feels stuck in slow motion.
 */
function ArrowScroll() {
  useEffect(() => {
    let interval: number | null = null
    let holdTimer: number | null = null
    let heldKey: string | null = null

    const stop = () => {
      if (interval !== null) {
        clearInterval(interval)
        interval = null
      }
      if (holdTimer !== null) {
        clearTimeout(holdTimer)
        holdTimer = null
      }
      heldKey = null
    }

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return
      const dir =
        e.key === 'ArrowDown' || e.key === 'ArrowRight'
          ? 1
          : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
            ? -1
            : 0
      if (!dir) return
      e.preventDefault()
      if (e.repeat) return // the hold-interval keeps scrolling while the key stays down
      if (heldKey === e.key) return
      stop()
      heldKey = e.key

      // tap: one smooth half-screen jump
      window.scrollBy({ top: dir * window.innerHeight * 0.5, behavior: 'smooth' })

      // hold: after a short delay, scroll fast until keyup / window blur
      holdTimer = window.setTimeout(() => {
        const tick = () => window.scrollBy({ top: dir * 60, behavior: 'instant' as ScrollBehavior })
        tick()
        interval = window.setInterval(tick, 16)
      }, 250)
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === heldKey) stop()
    }

    window.addEventListener('keydown', onKey)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('blur', stop)
    return () => {
      stop()
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('blur', stop)
    }
  }, [])
  return null
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <ArrowScroll />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<LibraryPage />} />
          <Route path="/pairs" element={<PairsPage />} />
          <Route path="/astrology" element={<AstrologyPage />} />
          <Route path="/synastry" element={<SynastryPage />} />
          <Route path="/astrology-library" element={<AstroLibraryPage />} />
          <Route path="/numerology-library" element={<NumerologyLibraryPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  )
}
