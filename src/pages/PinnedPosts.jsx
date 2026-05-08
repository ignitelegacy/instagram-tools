import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight, ArrowLeft, Sparkles, Heart, Star, Zap, ExternalLink, Loader2, RefreshCw } from "lucide-react";

export default function PinnedPosts() {
  const [step, setStep] = useState(1);
  const [transcript, setTranscript] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [posts, setPosts] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");

  const questions = [
    {
      pin: "Pin 1 — Connect (Your Story)",
      icon: Heart,
      items: [
        "Who do you serve and what does your dream Ignite Legacy member look like? (the mom in MLM burnout, the wellness pro, the corporate escape artist, etc.)",
        "What was your life like BEFORE Enagic / Kangen / Ignite Legacy? Be specific — the frustration, the stuckness, the desire.",
        "What was the moment Kangen water (or the Enagic opportunity) entered your world? Walk us through it.",
        "What does your life look like NOW because of this path? Freedom, lifestyle, family, location — paint the picture.",
        "Why should someone follow YOU specifically? What's your lens, your vibe, your content style?",
      ],
    },
    {
      pin: "Pin 2 — Compel (Social Proof)",
      icon: Star,
      items: [
        "What results have YOU personally created? (income, lifestyle shifts, time freedom, health, etc.) Or — be honest — are you newer and don't have your own results yet?",
        "Which community members' stories light you up most? Whose transformation would you love to share? (Louise, Maddi, Shinarah, Kelly, etc. — anyone from our wider Ignite Legacy world)",
      ],
    },
    {
      pin: "Pin 3 — Convert (The Invitation)",
      icon: Zap,
      items: [
        "How do you talk about Ignite Legacy in your own words? What's it FOR in your eyes? (The $99 entry, the community, the Enagic backend, the freedom path.)",
        "What's your DM keyword + what do they get when they send it? What's your link in bio strategy?",
        "Biggest objection someone has before saying yes — and how do you handle it from your story / experience?",
      ],
    },
  ];

  const generatePosts = async () => {
    if (!transcript.trim()) {
      setError("Paste your Loom transcript first 💛");
      return;
    }
    if (transcript.trim().length < 200) {
      setError("Transcript looks short — the more you give Claude, the better the posts. Aim for at least a few paragraphs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-pinned-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transcript, name }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const parsed = await response.json();
      setPosts(parsed);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went sideways generating your posts. Try again, or refresh and re-paste your transcript.");
    } finally {
      setLoading(false);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  const startOver = () => {
    setStep(1);
    setTranscript("");
    setName("");
    setPosts(null);
    setError("");
  };

  const formatPinForCopy = (pin) => {
    let text = `${pin.title.toUpperCase()}\n\n`;
    text += `HOOK: ${pin.hook}\n\n`;
    text += `CAPTION:\n${pin.caption}\n\n`;
    text += `CAROUSEL SLIDES:\n`;
    pin.carousel.forEach((s) => {
      text += `Slide ${s.slide}: ${s.headline}\n  → ${s.body}\n`;
    });
    text += `\nCTA: ${pin.cta}\n\n`;
    text += `VISUAL DIRECTION: ${pin.visualDirection}\n`;
    if (pin.testimonialVaultGuidance) {
      text += `\nTESTIMONIAL VAULT GUIDANCE: ${pin.testimonialVaultGuidance}\n`;
    }
    return text;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <style>{`
        @font-face {
          font-family: 'Promenade';
          src: url('https://assets.cdn.filesafe.space/wcJWrJ0LKUsg51VQbi8P/media/69e51fd38696a78b8d2895e7.ttf') format('truetype');
          font-display: swap;
        }
        .title { font-family: 'Promenade', Georgia, serif; font-weight: 400; font-style: normal; }
        .serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'Inter', sans-serif; }
        .gold-line { background: linear-gradient(90deg, transparent, #B8956A, transparent); height: 1px; }
        .gold-text { color: #8B6F3F; }
        .cream-card { background: #FAF6EE; border: 1px solid #E8DCC8; }
        .gold-button { background: #2C2418; color: #F5EFE6; transition: all 0.3s ease; }
        .gold-button:hover { background: #8B6F3F; }
        .gold-button:disabled { opacity: 0.4; cursor: not-allowed; }
        .step-active { background: #2C2418; color: #F5EFE6; }
        .step-inactive { background: transparent; color: #8B6F3F; border: 1px solid #B8956A; }
        textarea, input { font-family: 'Inter', sans-serif; }
        textarea:focus, input:focus { outline: none; border-color: #8B6F3F; }
        .pin-card { background: #FAF6EE; border: 1px solid #E8DCC8; }
        .slide-card { background: #F5EFE6; border-left: 2px solid #B8956A; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.6s ease-out; }
      `}</style>

      {/* Back to toolbox nav */}
      <div className="max-w-5xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="sans text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
          style={{ color: "#8B6F3F", textDecoration: "none" }}
        >
          <ArrowLeft className="w-3 h-3" /> back to the toolbox
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-center mb-12 fade-in">
          <div className="sans text-xs tracking-[0.3em] gold-text mb-4">IGNITE LEGACY</div>
          <h1 className="title text-5xl md:text-6xl mb-4" style={{ color: "#2C2418" }}>
            your three pinned posts
          </h1>
          <div className="gold-line w-32 mx-auto my-6"></div>
          <p className="sans text-sm md:text-base max-w-xl mx-auto" style={{ color: "#5C4F3D" }}>
            Connect. Compel. Convert. The three pinned posts that turn your Instagram into a quiet, beautiful sales machine.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center items-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center serif text-lg ${step >= s ? "step-active" : "step-inactive"}`}
              >
                {s}
              </div>
              {s < 3 && <div className="w-12 h-px" style={{ backgroundColor: step > s ? "#2C2418" : "#B8956A" }}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1: Questions */}
        {step === 1 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 01</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                record your story
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Talk through 10 questions like you're telling a friend over coffee. The longer and messier, the better — Claude will pull the gold.
              </p>
            </div>

            {/* What is Loom + why */}
            <div className="cream-card rounded-sm p-8 mb-6">
              <div className="sans text-xs tracking-[0.3em] gold-text uppercase mb-4">What is Loom and why are we using it?</div>
              <p className="sans text-sm mb-4" style={{ color: "#3D3328", lineHeight: 1.7 }}>
                Loom is a free video recording tool — but that's not actually why we're using it. The reason we use Loom is that it <span style={{ color: "#8B6F3F" }}>automatically transcribes everything you say</span>. Word for word. That transcript is what you'll paste in Step 2 for Claude to work from.
              </p>
              <p className="sans text-sm mb-6" style={{ color: "#3D3328", lineHeight: 1.7 }}>
                Instead of filling out a form trying to describe yourself in writing, you just talk. Tell your story out loud, naturally — the way you'd explain it to a friend. Claude takes your actual words and turns them into your three pinned posts. That's why the content sounds like you, not like a template.
              </p>
              <div className="sans text-xs tracking-[0.3em] gold-text uppercase mb-3">How to get started with Loom</div>
              <ol style={{ paddingLeft: 0, listStyle: "none" }}>
                {[
                  { n: "01", text: "Go to loom.com and create a free account (takes 30 seconds)." },
                  { n: "02", text: 'Click "New Recording" in the top right.' },
                  { n: "03", text: 'Choose "Camera only" — you don\'t need to share your screen.' },
                  { n: "04", text: "Hit record, talk through the questions below, then stop the recording." },
                  { n: "05", text: "Loom will process the video and generate a transcript automatically. Then you go to Step 2." },
                ].map(({ n, text }) => (
                  <li key={n} className="flex gap-4 mb-3">
                    <span className="serif text-xl gold-text leading-none" style={{ marginTop: "1px", flexShrink: 0 }}>{n}</span>
                    <span className="sans text-sm leading-relaxed" style={{ color: "#3D3328" }}>{text}</span>
                  </li>
                ))}
              </ol>
              <div className="sans text-xs mt-4 pt-4" style={{ borderTop: "1px solid #E8DCC8", color: "#5C4F3D" }}>
                No Loom account yet?{" "}
                <a href="https://www.loom.com/signup" target="_blank" rel="noopener noreferrer" style={{ color: "#8B6F3F", textDecoration: "underline" }}>
                  Create your free account here →
                </a>
              </div>
            </div>

            <div className="text-center mb-6">
              <div className="sans text-xs tracking-[0.3em] gold-text uppercase">The 10 questions to answer on your recording</div>
            </div>

            {questions.map((section, idx) => {
              const Icon = section.icon;
              return (
                <div key={idx} className="cream-card rounded-sm p-8 mb-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Icon className="w-5 h-5 gold-text" strokeWidth={1.5} />
                    <h3 className="title text-2xl" style={{ color: "#2C2418" }}>
                      {section.pin}
                    </h3>
                  </div>
                  <ol className="space-y-4">
                    {section.items.map((q, i) => {
                      const num = idx === 0 ? i + 1 : idx === 1 ? i + 6 : i + 8;
                      return (
                        <li key={i} className="flex gap-4">
                          <span className="serif text-2xl gold-text leading-none mt-1">{num.toString().padStart(2, "0")}</span>
                          <span className="sans text-sm leading-relaxed" style={{ color: "#3D3328" }}>
                            {q}
                          </span>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              );
            })}

            <div className="cream-card rounded-sm p-6 mb-8" style={{ borderLeft: "3px solid #8B6F3F" }}>
              <p className="sans text-sm" style={{ color: "#5C4F3D" }}>
                <span className="gold-text">Pro tip:</span> Don't have your own client results yet? That's fine. Pin 2 will pull from the wider Ignite Legacy community — that's the power of community marketing. You'll grab assets from{" "}
                <a href="https://thetestimonialvault.com" target="_blank" rel="noopener noreferrer" className="underline gold-text">
                  thetestimonialvault.com
                </a>{" "}
                in step 3.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-3"
              >
                I've recorded my loom <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Transcript paste */}
        {step === 2 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 02</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                paste your transcript
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Don't clean it up. Filler words, "ums," tangents — leave them in. They reveal your voice.
              </p>
            </div>

            {/* How to pull transcript from Loom */}
            <div className="cream-card rounded-sm p-8 mb-6">
              <div className="sans text-xs tracking-[0.3em] gold-text uppercase mb-4">How to get your transcript from Loom</div>
              <ol style={{ paddingLeft: 0, listStyle: "none" }}>
                {[
                  { n: "01", text: "Go to loom.com and open your library. Click on the video you just recorded." },
                  { n: "02", text: 'On the video page, look for the "Transcript" tab — it\'s usually in the panel on the right side of the video.' },
                  { n: "03", text: 'Click inside the transcript area, then select all (Cmd+A on Mac, Ctrl+A on Windows) and copy (Cmd+C / Ctrl+C).' },
                  { n: "04", text: "Paste everything into the box below. That's it." },
                ].map(({ n, text }) => (
                  <li key={n} className="flex gap-4 mb-4">
                    <span className="serif text-xl gold-text leading-none" style={{ marginTop: "1px", flexShrink: 0 }}>{n}</span>
                    <span className="sans text-sm leading-relaxed" style={{ color: "#3D3328" }}>{text}</span>
                  </li>
                ))}
              </ol>
              <div className="sans text-xs mt-2 p-3 rounded-sm" style={{ backgroundColor: "#F5EFE6", color: "#5C4F3D", lineHeight: 1.6 }}>
                Can't find the transcript tab? Loom sometimes takes a minute or two to finish processing after you stop recording. Refresh the page if it hasn't appeared yet.
              </div>
            </div>

            <div className="cream-card rounded-sm p-8 mb-6">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-3">Your first name (optional)</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="So Claude can speak to you directly"
                className="w-full p-3 sans text-sm rounded-sm mb-6"
                style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
              />

              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-3">Your full Loom transcript</label>
              <textarea
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your full transcript here. The longer the better — Claude will extract the best pieces for each post."
                className="w-full p-4 sans text-sm rounded-sm leading-relaxed"
                style={{
                  backgroundColor: "#F5EFE6",
                  border: "1px solid #E8DCC8",
                  color: "#2C2418",
                  minHeight: "350px",
                  resize: "vertical",
                }}
              />
              <div className="sans text-xs gold-text mt-2 text-right">
                {transcript.length.toLocaleString()} characters
              </div>
            </div>

            {error && (
              <div className="cream-card rounded-sm p-4 mb-6" style={{ borderLeft: "3px solid #B85C3F" }}>
                <p className="sans text-sm" style={{ color: "#8B4530" }}>
                  {error}
                </p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={() => setStep(1)}
                className="sans px-6 py-3 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-2"
                style={{ color: "#8B6F3F" }}
              >
                <ArrowLeft className="w-4 h-4" /> back
              </button>
              <button
                onClick={generatePosts}
                disabled={loading}
                className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> crafting your posts...
                  </>
                ) : (
                  <>
                    generate my pinned posts <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Generated posts */}
        {step === 3 && posts && (
          <div className="fade-in">
            <div className="text-center mb-10">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 03</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                your three pinned posts
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Tweak the language to sound even more like you. These are starting points — your voice makes them magnetic.
              </p>
            </div>

            {[
              { key: "pin1", icon: Heart, accent: "#8B6F3F" },
              { key: "pin2", icon: Star, accent: "#A67C4E" },
              { key: "pin3", icon: Zap, accent: "#6B5530" },
            ].map(({ key, icon: Icon, accent }, idx) => {
              const pin = posts[key];
              if (!pin) return null;
              return (
                <div key={key} className="pin-card rounded-sm p-8 mb-8">
                  {/* Pin Header */}
                  <div className="flex items-start justify-between mb-6 pb-6" style={{ borderBottom: `1px solid ${accent}40` }}>
                    <div>
                      <div className="sans text-xs tracking-[0.3em] gold-text mb-2">PIN 0{idx + 1}</div>
                      <h3 className="title text-3xl flex items-center gap-3" style={{ color: "#2C2418" }}>
                        <Icon className="w-5 h-5" strokeWidth={1.5} style={{ color: accent }} />
                        {pin.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => copy(formatPinForCopy(pin), `${key}-all`)}
                      className="sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 px-4 py-2 rounded-sm"
                      style={{ border: `1px solid ${accent}`, color: accent }}
                    >
                      {copiedKey === `${key}-all` ? (
                        <>
                          <Check className="w-3 h-3" /> copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" /> copy all
                        </>
                      )}
                    </button>
                  </div>

                  {/* Hook */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="sans text-xs tracking-[0.2em] gold-text uppercase">The hook</div>
                      <button
                        onClick={() => copy(pin.hook, `${key}-hook`)}
                        className="sans text-xs gold-text flex items-center gap-1"
                      >
                        {copiedKey === `${key}-hook` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                    <p className="serif text-2xl" style={{ color: "#2C2418" }}>
                      "{pin.hook}"
                    </p>
                  </div>

                  {/* Caption */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="sans text-xs tracking-[0.2em] gold-text uppercase">The caption</div>
                      <button
                        onClick={() => copy(pin.caption, `${key}-cap`)}
                        className="sans text-xs gold-text flex items-center gap-1"
                      >
                        {copiedKey === `${key}-cap` ? (
                          <>
                            <Check className="w-3 h-3" /> copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> copy
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="sans text-sm leading-relaxed whitespace-pre-wrap p-5 rounded-sm"
                      style={{ backgroundColor: "#F5EFE6", color: "#2C2418" }}
                    >
                      {pin.caption}
                    </div>
                  </div>

                  {/* Carousel */}
                  <div className="mb-6">
                    <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-3">Carousel slides</div>
                    <div className="space-y-3">
                      {pin.carousel.map((slide, i) => (
                        <div key={i} className="slide-card p-4 rounded-sm">
                          <div className="flex items-baseline gap-3 mb-2">
                            <span className="serif text-xl gold-text">{String(slide.slide).padStart(2, "0")}</span>
                            <span className="serif text-lg" style={{ color: "#2C2418" }}>
                              {slide.headline}
                            </span>
                          </div>
                          <p className="sans text-xs leading-relaxed pl-9" style={{ color: "#5C4F3D" }}>
                            {slide.body}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mb-6">
                    <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">The CTA</div>
                    <p className="sans text-sm" style={{ color: "#3D3328" }}>
                      → {pin.cta}
                    </p>
                  </div>

                  {/* Visual Direction */}
                  <div className="mb-2">
                    <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">Visual direction</div>
                    <p className="sans text-sm leading-relaxed" style={{ color: "#3D3328" }}>
                      {pin.visualDirection}
                    </p>
                  </div>

                  {/* Testimonial Vault Guidance — only on Pin 2 */}
                  {pin.testimonialVaultGuidance && (
                    <div
                      className="mt-6 p-5 rounded-sm"
                      style={{ backgroundColor: "#F0E6D2", borderLeft: `3px solid ${accent}` }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="sans text-xs tracking-[0.2em] uppercase" style={{ color: accent }}>
                          ✨ pull from the testimonial vault
                        </div>
                        <a
                          href="https://thetestimonialvault.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="sans text-xs flex items-center gap-1 px-3 py-1 rounded-sm"
                          style={{ backgroundColor: accent, color: "#F5EFE6" }}
                        >
                          open vault <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <p className="sans text-sm leading-relaxed" style={{ color: "#3D3328" }}>
                        {pin.testimonialVaultGuidance}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setStep(2)}
                className="sans px-6 py-3 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-2"
                style={{ color: "#8B6F3F", border: "1px solid #B8956A" }}
              >
                <RefreshCw className="w-3 h-3" /> regenerate from transcript
              </button>
              <button
                onClick={startOver}
                className="gold-button sans px-8 py-3 rounded-sm tracking-[0.2em] text-xs uppercase"
              >
                start over
              </button>
            </div>

            <div className="text-center mt-12 pt-8" style={{ borderTop: "1px solid #E8DCC8" }}>
              <p className="serif text-lg" style={{ color: "#8B6F3F" }}>
                "Your story is the bridge."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
