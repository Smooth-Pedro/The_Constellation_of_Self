import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.tsx'

// Google Translate compatibility ──────────────────────────────────────
// Machine translators (Chrome/Edge built-in, translate.goog) rewrite text
// nodes into <font>-wrapped nodes. React's reconciler still holds references
// to the original nodes, so a later removal throws NotFoundError and
// white-screens the page in a translated session. Guarding the two DOM APIs
// React uses for removal/moves turns a stale translated node into a harmless
// no-op instead of a crash. (Established shim; safe for untranslated pages:
// the guard only changes behavior when a node is NOT where React expects it.)
if (typeof Node === 'function' && Node.prototype) {
  const originalRemoveChild = Node.prototype.removeChild
  Node.prototype.removeChild = function <T extends Node>(this: Node, child: T): T {
    if (child.parentNode !== this) {
      return child
    }
    return originalRemoveChild.call(this, child) as T
  }
  const originalInsertBefore = Node.prototype.insertBefore
  Node.prototype.insertBefore = function <T extends Node>(
    this: Node,
    newNode: T,
    referenceNode: Node | null,
  ): T {
    if (referenceNode && referenceNode.parentNode !== this) {
      return originalInsertBefore.call(this, newNode, null) as T
    }
    return originalInsertBefore.call(this, newNode, referenceNode) as T
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

// Signal a successful mount to the boot watchdog in index.html.
// setTimeout, not requestAnimationFrame: rAF never fires in occluded or
// battery-saver tabs, which made the watchdog think the boot failed even
// though the app was running fine.
setTimeout(() => {
  ;(window as unknown as { __tarotBooted?: boolean }).__tarotBooted = true
}, 0)
