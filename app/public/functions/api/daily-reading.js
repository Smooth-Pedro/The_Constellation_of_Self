// ─── Daily AI Tarot Reading — Cloudflare Pages Function ───
// Same logic as netlify/functions/daily-reading.mjs, adapted to the
// Cloudflare Workers runtime (env vars arrive via `context.env`).
//
// Required env var: GEMINI_API_KEY — set via:
//   Dashboard → Pages → your project → Settings → Environment variables, or
//   npx wrangler pages secret put GEMINI_API_KEY --project-name=<project>

const MODELS = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-3.5-flash']

const MAX_QUESTION = 300

const SYSTEM_PROMPT = `You are the voice of a tarot and numerology site called "Tarot Birth Cards & Numerology". You speak for the tarot card drawn for the day.

Voice rules:
- Mystical but grounded: warm, wise, unhurried; second person ("you").
- Never generic horoscope filler — use the specific card material given to you.
- Weave in the card's keywords naturally, and touch both its light and its shadow.
- Close with one short, practical line of guidance the reader can act on today.
- Reflection and entertainment only: if the question touches health, law or money, answer reflectively and gently decline to give professional advice.
- 3 short paragraphs, plain text, no headings, no bullet points, no disclaimers.`

function drawCardOfTheDay(cards) {
  const seed = Number(new Date().toISOString().slice(0, 10).replace(/-/g, ''))
  return cards[seed % cards.length]
}

const hits = new Map()
function rateLimited(ip) {
  const now = Date.now()
  const list = (hits.get(ip) ?? []).filter((t) => now - t < 60_000)
  if (list.length >= 10) return true
  list.push(now)
  hits.set(ip, list)
  return false
}

function json(body, status = 200) {
  return Response.json(body, { status })
}

export async function onRequestPost(context) {
  const { request, env } = context

  const apiKey = env.GEMINI_API_KEY
  if (!apiKey) return json({ configured: false })

  const ip = request.headers.get('cf-connecting-ip') ?? 'unknown'
  if (rateLimited(ip)) return json({ error: 'Slow down — the cards need a moment.' }, 429)

  let question = ''
  try {
    const body = await request.json()
    question = String(body?.question ?? '').trim().slice(0, MAX_QUESTION)
  } catch {
    /* empty body is fine — a question is optional */
  }

  const origin = new URL(request.url).origin
  const cardsRes = await fetch(`${origin}/api/card-data.json`)
  if (!cardsRes.ok) return json({ error: 'Card deck not found.' }, 502)
  const CARDS = await cardsRes.json()
  const card = drawCardOfTheDay(CARDS)

  const prompt = `Card of the day: ${card.name} (${card.num}).
Keywords: ${card.keywords.join(', ')}
Meaning: ${card.meaning}
Shadow: ${card.shadow}
Guidance: ${card.guidance}

${question ? `The reader's question: "${question}"` : 'The reader asked no question — read the card as general guidance for their day.'}`

  for (const model of MODELS) {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.85, maxOutputTokens: 700 },
        }),
      },
    )
    if (res.status === 404 || res.status === 403) continue
    if (!res.ok) return json({ error: 'The oracle stumbled — try again in a moment.' }, 502)
    const data = await res.json()
    const reading = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('').trim()
    if (!reading) return json({ error: 'The cards came back blank — try again.' }, 502)
    return json({ configured: true, id: card.id, num: card.num, suit: card.suit, name: card.name, keywords: card.keywords, reading })
  }
  return json({ error: 'No Gemini model available — check GEMINI_MODEL.' }, 502)
}

export async function onRequest() {
  return json({ error: 'POST only' }, 405)
}
