// Vercel Serverless Function for Bio Generator
// Your ANTHROPIC_API_KEY lives here as an environment variable, never exposed to users.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const form = req.body || {};

  if (!form.whoYouServe || !form.transformation) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured. Missing API key." });
  }

  const ctaLine =
    form.cta === "dm"
      ? `DM keyword: "${form.dmKeyword || "FREEDOM"}"`
      : form.cta === "link"
      ? `Link in bio leading to: ${form.linkDestination || "Ignite Legacy"}`
      : `Both DM keyword "${form.dmKeyword || "FREEDOM"}" and link to ${form.linkDestination || "Ignite Legacy"}`;

  const prompt = `You are a copywriter for the IGNITE LEGACY community — a network of people building location-independent businesses through Enagic / Kangen Water and the Ignite Legacy entry-point platform.

You are writing 5 different Instagram bio variations for one of the community members, each in a different STYLE but all in THEIR voice using THEIR information.

THEIR INFO:
- First name: ${form.firstName || "(no name given)"}
- Who they serve: ${form.whoYouServe}
- The transformation they help create: ${form.transformation}
- Credibility / proof / specificity they have: ${form.credibility || "(none yet — lean on community proof)"}
- CTA preference: ${ctaLine}
- Words/phrases that sound like THEM: ${form.voiceWords || "(none specified)"}

CRITICAL RULES — READ CAREFULLY:
- Every Ignite Legacy member is selling the SAME offer ($99 Ignite Legacy → Enagic Kangen water backend). The differentiator is THEIR voice, story, niche, and angle. Do NOT generate generic Ignite Legacy copy. Use THEIR information directly.
- Brand voice: freedom-based, elevated, calm-luxury, anti-hustle, lifestyle-first. NOT bro-marketer, NOT MLM-cringe, NOT chasing-the-bag energy.
- Each bio must follow the BOUTIQUE FRAMEWORK:
  • SIGNAGE (name field) — searchable keywords + their name
  • WINDOW LINE (line 1) — the hook that stops the scroll
  • PRICE TAG WHISPER (line 2) — quiet credibility / specificity / content tease (lean on COMMUNITY PROOF if they have no personal results yet, e.g. "Part of a 1000+ person freedom collective")
  • INVITATION CARD (line 3 or last line) — clear single CTA
- Use sentence case, NOT title case. Use line breaks (\\n) between bio lines.
- Use emojis SPARINGLY (0-2 per bio max). Never start a bio with an emoji.
- Each bio must be UNDER 150 characters TOTAL (Instagram limit).
- The 5 STYLES must each feel meaningfully different — not just word swaps.

THE 5 STYLES TO GENERATE:

1. TRANSFORMATION-LED — leads with the outcome they help create. Example energy: "Helping high-performers ditch the 9-5 with one elegant exit plan"

2. CONTRARIAN — calls out what they're NOT (the MLM cringe, the hustle, the bro-marketing). Pattern-interrupt energy. Example: "Building wealth without the hustle (or the MLM cringe)"

3. LIFESTYLE PROMISE — paints the life. Example: "Designing a freedom-based life you don't need a vacation from"

4. CREDIBILITY-FIRST — leads with their proof or community proof. Example: "Generated $200K+ as a solo mom · helping you do the same"

5. CONTENT-TEASE — promises what they'll find on the page. Example: "Daily breakdowns of how I built passive income from my phone"

Return ONLY valid JSON in EXACTLY this format (no markdown, no preamble, no code fences):

{
  "bios": [
    {
      "style": "Transformation-Led",
      "styleDescription": "1-sentence why this style works for their audience",
      "name": "The full name field text (their name + searchable keywords)",
      "line1": "Line 1 — the window line",
      "line2": "Line 2 — the price tag whisper",
      "line3": "Line 3 — additional context if needed (optional, can be empty string)",
      "cta": "The CTA line",
      "fullBio": "The complete bio formatted with \\n between lines, ready to paste into Instagram",
      "characterCount": 142
    },
    { "style": "Contrarian", ... },
    { "style": "Lifestyle Promise", ... },
    { "style": "Credibility-First", ... },
    { "style": "Content-Tease", ... }
  ]
}`;

  try {
    const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error("Anthropic API error:", errText);
      return res.status(500).json({ error: "AI generation failed. Try again in a moment." });
    }

    const data = await anthropicRes.json();
    const text = data.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("");

    const cleaned = text.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error("JSON parse failed. Raw text:", cleaned);
      return res.status(500).json({ error: "Couldn't parse the response. Try regenerating." });
    }

    return res.status(200).json(parsed);
  } catch (err) {
    console.error("Handler error:", err);
    return res.status(500).json({ error: "Something went wrong on our end." });
  }
}
