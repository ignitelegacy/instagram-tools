// Vercel Serverless Function — runs on the server, NOT in the browser.
// Your ANTHROPIC_API_KEY lives here as an environment variable, never exposed to users.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { transcript, name } = req.body || {};

  if (!transcript || transcript.trim().length < 200) {
    return res.status(400).json({ error: "Transcript too short" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured. Missing API key." });
  }

  const prompt = `You are a copywriter for the IGNITE LEGACY community — a network of people building location-independent businesses through Enagic / Kangen Water and the Ignite Legacy entry-point platform.

You are creating THREE Instagram pinned posts for one of the community members based on their Loom transcript.

THEIR NAME: ${name || "the member"}

THEIR LOOM TRANSCRIPT:
"""
${transcript}
"""

CRITICAL CONTEXT — READ CAREFULLY:
- Every Ignite Legacy member is selling the SAME offer ($99 Ignite Legacy entry → Enagic Kangen water machine backend). The differentiator is THEIR voice, story, niche, and angle. Do NOT generate generic Ignite Legacy copy. Mirror THEIR words, phrases, and energy from the transcript.
- The brand voice is: freedom-based, elevated, calm-luxury, anti-hustle, lifestyle-first. NOT bro-marketer, NOT MLM-cringe, NOT chasing-the-bag energy.
- Pin 2 is SOCIAL PROOF. If they have their own results, use them. If they don't, lean into COMMUNITY proof — "Meet Louise" style posts pulling from the wider Ignite Legacy / Enagic community. This is the power of community marketing. Coach them on which community story to feature based on the transcript.
- Use sentence case, not title case. Use line breaks for rhythm. Use emojis SPARINGLY (1-3 per caption max), and only if it matches their voice from the transcript.
- Hooks must STOP the scroll. Specific, contrarian, curiosity-gap, or pattern-interrupt — never generic.

Return ONLY valid JSON in exactly this structure (no markdown, no preamble, no code fences):

{
  "pin1": {
    "title": "Connect — Your Story",
    "hook": "The opening line/scroll-stopper for the first slide or caption opener (1 sentence, max ~12 words)",
    "caption": "Full Instagram caption, 150-300 words, in their voice, telling their before → turning point → after story. End with a soft CTA to engage (comment, save, share). Use line breaks.",
    "carousel": [
      {"slide": 1, "headline": "Big text on slide 1", "body": "Supporting copy or instruction for visual direction"},
      {"slide": 2, "headline": "...", "body": "..."},
      {"slide": 3, "headline": "...", "body": "..."},
      {"slide": 4, "headline": "...", "body": "..."},
      {"slide": 5, "headline": "...", "body": "..."}
    ],
    "cta": "The specific call-to-action at the end of the caption",
    "visualDirection": "2-3 sentences on what this carousel should LOOK like — photo style, color palette, vibe, what to pull from. If they should use their own photos, say so. If they should pull lifestyle/aesthetic imagery, say so."
  },
  "pin2": {
    "title": "Compel — Social Proof",
    "hook": "...",
    "caption": "Full caption 150-300 words. If they have their own results, lead with theirs. If not, this should be a 'Meet [Community Member]' style post pulling community proof. Make it feel specific and real, not generic 'success stories'.",
    "carousel": [{"slide": 1, "headline": "...", "body": "..."}],
    "cta": "...",
    "visualDirection": "...",
    "testimonialVaultGuidance": "2-4 sentences specifically coaching ${name || "this member"} on what to pull from thetestimonialvault.com — which type of testimonial (income story / lifestyle shift / health transformation / time freedom / mom-life / etc.) would resonate most with their audience based on the transcript. Be specific."
  },
  "pin3": {
    "title": "Convert — The Invitation",
    "hook": "...",
    "caption": "Full caption 150-300 words inviting people into Ignite Legacy in their words. Address the objection they named in their transcript. End with their DM keyword + link in bio CTA.",
    "carousel": [{"slide": 1, "headline": "...", "body": "..."}],
    "cta": "...",
    "visualDirection": "..."
  }
}

Each carousel must have exactly 5 slides.`;

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
