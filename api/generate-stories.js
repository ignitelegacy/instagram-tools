// Vercel Serverless Function for Stories Studio
// Your ANTHROPIC_API_KEY lives here as an environment variable, never exposed to users.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { profile } = req.body || {};

  if (!profile || !profile.whoYouServe || !profile.undeniableParts) {
    return res.status(400).json({ error: "Missing profile info. Please complete the setup." });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server is not configured. Missing API key." });
  }

  const prompt = `You are generating today's STORIES BRIEF for an Ignite Legacy community member — someone building a freedom-based business through Enagic / Kangen Water + the Ignite Legacy entry-point platform.

THEIR PROFILE:
- First name: ${profile.firstName || "(not given)"}
- Who they serve: ${profile.whoYouServe}
- Undeniable parts of their life (use these to anchor prompts in their REAL world): ${profile.undeniableParts}
- What they're currently inviting people into: ${profile.currentOffer || "Ignite Legacy"}
- DM keyword: ${profile.dmKeyword || "FREEDOM"}
- Voice phrases that sound like them: ${profile.voiceWords || "(none specified)"}

YOUR JOB:
Generate exactly 5 Instagram story PROMPTS for them to post today, balanced across the 4 SELLING ON STORIES PILLARS (from Aubrey V Lynn's framework):

1. "GET TO KNOW ME" (pillarId: "know") — Relatability, likability. "This is who I am, here's how it's relevant to you." Take audience into their life. Anchored in their undeniable life parts.

2. "GET TO TRUST ME" (pillarId: "trust") — Credibility, follow-through. "I do what I say I do." Documentation content, BTS, work-hard-play-hard moments.

3. "GET TO LEARN FROM ME" (pillarId: "learn") — Authority, leadership. "I am someone to look up to." Inspirational, educational, transformational content.

4. "GET TO WORK WITH ME" (pillarId: "work") — The selling. "I am someone you can work with." Pain points, desires, launches, CTAs, community wins, soft invitations.

DISTRIBUTION FOR TODAY'S 5 PROMPTS:
- 2 from "Get to Know Me" (most of their stories should feel personal)
- 1 from "Get to Trust Me"
- 1 from "Get to Learn From Me"
- 1 from "Get to Work With Me"

CRITICAL RULES — ABSOLUTELY DO NOT VIOLATE:
- These are PROMPTS, not stories. Don't write the story for them. Write the prompt that helps them PULL the story out of themselves.
- Stories should feel RAW, AUTHENTIC, IN-THE-MOMENT — not curated, not polished, not aspirational-influencer voice.
- Anchor prompts in their REAL undeniable life parts wherever possible (their kid, their dog, their fight class, their villa, their morning matcha — whatever they listed).
- Voice you write the prompts in: friend texting friend mid-day. Lowercase. Casual. NOT coach-voice. NOT marketer-voice.
- Each prompt should be answerable in a 15-second voice note or a single screenshot + caption.
- Each "angle" is a SHORT suggestion (under 25 words) for HOW to actually capture this — voice note, photo, screen recording, mirror selfie, polaroid-style, etc. Not "what to say." HOW to capture.
- The "Work With Me" prompt should be SOFT. Never "BUY NOW" energy. More like "if you've been curious, DM me ${profile.dmKeyword || "FREEDOM"}" energy. Specific to their actual offer.
- The "Learn From Me" prompt should pull a real lesson from their life — not a generic motivational quote.
- The "Trust Me" prompt should show them actually doing what they say they do (BTS work, follow-through, work-hard-play-hard).
- Vary the FORMATS: at least one should be photo-anchored, one voice-note, one text-on-image, one engagement-based (poll/question box).

Return ONLY valid JSON in EXACTLY this format. NO markdown. NO code fences. NO preamble:

{
  "greeting": "A short, warm one-line greeting in their voice. Max 15 words. Like a friend texting them. Reference today specifically. e.g. 'okay here's today — keep it quick and human.'",
  "prompts": [
    {
      "pillarId": "know",
      "timeOfDay": "morning / midday / afternoon / evening — pick one based on what fits",
      "prompt": "The actual prompt question or invitation. Should be one sentence, ideally answerable in 15 sec voice note.",
      "why": "One short sentence on why this works. Friend voice, not marketer voice.",
      "angles": [
        "Short angle 1 — under 25 words, focused on HOW to capture, not what to say",
        "Short angle 2 — alternative way to do the same prompt"
      ]
    }
  ]
}

There must be exactly 5 prompts. Each prompt must have at least 2 angles. Distribution must match the 2/1/1/1 split above.`;

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
        max_tokens: 3500,
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
