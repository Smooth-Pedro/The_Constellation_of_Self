// One-off generator: rebuilds public/api/card-data.json from the card libraries
// (tarot.ts + minorArcana.ts) so the serverless daily-reading functions draw
// from the full 78-card deck. Run from app/:
//   node scripts/gen-card-data.mjs
import { createRequire } from 'node:module'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const require = createRequire(import.meta.url)
const esbuild = require('esbuild')

const here = dirname(fileURLToPath(import.meta.url))
const appRoot = join(here, '..')

const virtualEntry = `
import { MAJOR_ARCANA } from './src/lib/tarot'
import { MINOR_ARCANA } from './src/lib/minorArcana'
const majors = MAJOR_ARCANA.map((c) => ({
  id: String(c.num), num: c.num, name: c.name, keywords: c.keywords,
  meaning: c.meaning, shadow: c.shadow, guidance: c.guidance,
}))
const minors = MINOR_ARCANA.map((c) => ({
  id: c.id, num: c.num, suit: c.suit, name: c.name, keywords: c.keywords,
  meaning: c.meaning, shadow: c.shadow, guidance: c.guidance,
}))
console.log(JSON.stringify([...majors, ...minors]))
`

const result = esbuild.buildSync({
  stdin: { contents: virtualEntry, loader: 'ts', resolveDir: appRoot },
  bundle: true,
  format: 'cjs',
  write: false,
  logLevel: 'silent',
})

let deckJson = ''
const sandbox = {
  console: { log: (s) => (deckJson = s) },
  module: {},
  exports: {},
}
new Function('console', 'module', 'exports', result.outputFiles[0].text)(
  sandbox.console, sandbox.module, sandbox.exports,
)

const deck = JSON.parse(deckJson)
if (deck.length !== 78) throw new Error(`Expected 78 cards, got ${deck.length}`)

const out = join(appRoot, 'public', 'api', 'card-data.json')
writeFileSync(out, JSON.stringify(deck, null, 1))
const suits = deck.filter((c) => c.suit).length
console.log(`wrote ${out} — ${deck.length} cards (${deck.length - suits} majors, ${suits} minors)`)
