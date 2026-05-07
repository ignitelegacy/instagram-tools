import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight, ArrowLeft, Sparkles, Loader2, RefreshCw } from "lucide-react";

export default function BioGenerator() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bios, setBios] = useState(null);
  const [copiedKey, setCopiedKey] = useState("");

  const [form, setForm] = useState({
    firstName: "",
    whoYouServe: "",
    transformation: "",
    credibility: "",
    cta: "dm",
    dmKeyword: "FREEDOM",
    linkDestination: "Ignite Legacy",
    voiceWords: "",
  });

  const update = (key, value) => setForm({ ...form, [key]: value });

  const generateBios = async () => {
    if (!form.whoYouServe.trim() || !form.transformation.trim()) {
      setError("Please fill in at least who you serve and the transformation 💛");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-bios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const parsed = await response.json();
      setBios(parsed.bios);
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went sideways. Try again, or refresh and re-enter your info.");
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
    setBios(null);
    setError("");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6" }}>
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
        textarea, input, select { font-family: 'Inter', sans-serif; }
        textarea:focus, input:focus, select:focus { outline: none; border-color: #8B6F3F; }
        .bio-card { background: #FAF6EE; border: 1px solid #E8DCC8; }
        .radio-pill {
          padding: 10px 16px;
          border: 1px solid #B8956A;
          background: transparent;
          color: #5C4F3D;
          font-size: 13px;
          letter-spacing: 0.05em;
          border-radius: 100px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .radio-pill.selected {
          background: #2C2418;
          color: #F5EFE6;
          border-color: #2C2418;
        }
        .bio-preview {
          background: #F5EFE6;
          border: 1px solid #E8DCC8;
          padding: 18px 20px;
          border-radius: 4px;
          white-space: pre-wrap;
          font-size: 14px;
          line-height: 1.55;
          color: #2C2418;
          font-family: 'Inter', sans-serif;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.6s ease-out; }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div className="max-w-4xl mx-auto px-6 pt-8">
        <Link
          to="/"
          className="sans text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
          style={{ color: "#8B6F3F", textDecoration: "none" }}
        >
          <ArrowLeft className="w-3 h-3" /> back to the toolbox
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 fade-in">
          <div className="sans text-xs tracking-[0.3em] gold-text mb-4">IGNITE LEGACY</div>
          <h1 className="title text-5xl md:text-6xl mb-4" style={{ color: "#2C2418" }}>
            your window display
          </h1>
          <div className="gold-line w-32 mx-auto my-6"></div>
          <p className="sans text-sm md:text-base max-w-xl mx-auto" style={{ color: "#5C4F3D" }}>
            Five Instagram bio options in your voice — each in a different style, so you can choose the one that stops the right people on the sidewalk.
          </p>
        </div>

        {/* Step indicator */}
        <div className="flex justify-center items-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center title text-lg ${step >= s ? "step-active" : "step-inactive"}`}
              >
                {s}
              </div>
              {s < 3 && <div className="w-12 h-px" style={{ backgroundColor: step > s ? "#2C2418" : "#B8956A" }}></div>}
            </React.Fragment>
          ))}
        </div>

        {/* STEP 1 — INTRO */}
        {step === 1 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 01</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                the seven-second test
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Someone walks past your boutique window. They have seven seconds. In those seven seconds, your bio has to answer three questions.
              </p>
            </div>

            <div className="cream-card rounded-sm p-8 mb-6">
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <div className="title text-3xl gold-text mb-2">01</div>
                  <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">What is this place?</div>
                  <p className="sans text-sm" style={{ color: "#3D3328" }}>
                    Your name field tells them. Searchable keywords + your name = the signage above the door.
                  </p>
                </div>
                <div>
                  <div className="title text-3xl gold-text mb-2">02</div>
                  <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">Is it for me?</div>
                  <p className="sans text-sm" style={{ color: "#3D3328" }}>
                    Your window line answers it. Who you serve, what transformation you create, why they should stop walking.
                  </p>
                </div>
                <div>
                  <div className="title text-3xl gold-text mb-2">03</div>
                  <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">What's inside?</div>
                  <p className="sans text-sm" style={{ color: "#3D3328" }}>
                    Your credibility + clear CTA. Why you, and what to do next — DM or click.
                  </p>
                </div>
              </div>
            </div>

            <div className="cream-card rounded-sm p-6 mb-8" style={{ borderLeft: "3px solid #8B6F3F" }}>
              <p className="sans text-sm" style={{ color: "#5C4F3D" }}>
                <span className="gold-text">Heads up:</span> This isn't a rigid template. It's structure to riff on. Use it like a starting point and tweak until it sounds like you, not a brochure.
              </p>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setStep(2)}
                className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-3"
              >
                let's build mine <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 — INTAKE FORM */}
        {step === 2 && (
          <div className="fade-in">
            <div className="text-center mb-8">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 02</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                tell me about you
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Five quick questions. The more specific you are, the better your bios will feel like you.
              </p>
            </div>

            <div className="cream-card rounded-sm p-8 mb-6">
              {/* Q1 - First name */}
              <div className="mb-8">
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                  01 — Your first name
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  placeholder="e.g. Aubrey"
                  className="w-full p-3 sans text-sm rounded-sm"
                  style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
                />
              </div>

              {/* Q2 - Who you serve */}
              <div className="mb-8">
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                  02 — Who do you serve?
                </label>
                <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                  Get specific. "High-performers ditching the 9-5" beats "everyone." Multi-passionate? Pick the audience this bio is FOR.
                </p>
                <input
                  type="text"
                  value={form.whoYouServe}
                  onChange={(e) => update("whoYouServe", e.target.value)}
                  placeholder="e.g. solo moms ready to leave their W-2"
                  className="w-full p-3 sans text-sm rounded-sm"
                  style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
                />
              </div>

              {/* Q3 - The transformation */}
              <div className="mb-8">
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                  03 — The transformation you create
                </label>
                <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                  Not "freedom" — what does freedom look like specifically? "Build passive income from your phone" / "Design a life you don't need a vacation from" / "Walk away from corporate without a paycut."
                </p>
                <textarea
                  value={form.transformation}
                  onChange={(e) => update("transformation", e.target.value)}
                  placeholder="e.g. building a quiet income stream so they can travel with their kids without asking permission"
                  className="w-full p-3 sans text-sm rounded-sm"
                  style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418", minHeight: "80px", resize: "vertical" }}
                />
              </div>

              {/* Q4 - Credibility */}
              <div className="mb-8">
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                  04 — Your credibility (optional)
                </label>
                <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                  Income generated, years in the space, top % builder, transformations created — anything. <span className="gold-text">If you're newer, leave this blank</span> and we'll lean on community proof ("Part of a 1000+ person freedom collective").
                </p>
                <input
                  type="text"
                  value={form.credibility}
                  onChange={(e) => update("credibility", e.target.value)}
                  placeholder="e.g. 7 yrs in Enagic / Generated $200K+ / Walked away from a 6-figure corporate role"
                  className="w-full p-3 sans text-sm rounded-sm"
                  style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
                />
              </div>

              {/* Q5 - CTA preference */}
              <div className="mb-8">
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-3">
                  05 — Your CTA preference
                </label>
                <p className="sans text-xs mb-3" style={{ color: "#5C4F3D" }}>
                  No right or wrong here. DM keyword = better for connection. Link = better for hands-off funnel. Both = covers all bases.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <button
                    onClick={() => update("cta", "dm")}
                    className={`radio-pill ${form.cta === "dm" ? "selected" : ""}`}
                  >
                    DM keyword
                  </button>
                  <button
                    onClick={() => update("cta", "link")}
                    className={`radio-pill ${form.cta === "link" ? "selected" : ""}`}
                  >
                    Link in bio
                  </button>
                  <button
                    onClick={() => update("cta", "both")}
                    className={`radio-pill ${form.cta === "both" ? "selected" : ""}`}
                  >
                    Both
                  </button>
                </div>

                {(form.cta === "dm" || form.cta === "both") && (
                  <div className="mb-3">
                    <label className="sans text-xs gold-text block mb-1">DM keyword</label>
                    <input
                      type="text"
                      value={form.dmKeyword}
                      onChange={(e) => update("dmKeyword", e.target.value.toUpperCase())}
                      placeholder="FREEDOM"
                      className="w-full p-3 sans text-sm rounded-sm"
                      style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
                    />
                  </div>
                )}

                {(form.cta === "link" || form.cta === "both") && (
                  <div>
                    <label className="sans text-xs gold-text block mb-1">Link destination (what they'll find)</label>
                    <input
                      type="text"
                      value={form.linkDestination}
                      onChange={(e) => update("linkDestination", e.target.value)}
                      placeholder="e.g. Ignite Legacy / my masterclass / my Stan store"
                      className="w-full p-3 sans text-sm rounded-sm"
                      style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418" }}
                    />
                  </div>
                )}
              </div>

              {/* Q6 - Voice words */}
              <div>
                <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                  Bonus — words that sound like YOU (optional)
                </label>
                <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                  Phrases you actually say. Quirks, vibes, signature words. The more we have, the more they'll sound like you.
                </p>
                <textarea
                  value={form.voiceWords}
                  onChange={(e) => update("voiceWords", e.target.value)}
                  placeholder="e.g. soft launch, quiet luxury, anti-hustle, calm wealth, slow build, elegant exit"
                  className="w-full p-3 sans text-sm rounded-sm"
                  style={{ backgroundColor: "#F5EFE6", border: "1px solid #E8DCC8", color: "#2C2418", minHeight: "60px", resize: "vertical" }}
                />
              </div>
            </div>

            {error && (
              <div className="cream-card rounded-sm p-4 mb-6" style={{ borderLeft: "3px solid #B85C3F" }}>
                <p className="sans text-sm" style={{ color: "#8B4530" }}>{error}</p>
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
                onClick={generateBios}
                disabled={loading}
                className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-3"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> crafting your bios...
                  </>
                ) : (
                  <>
                    generate my 5 bios <Sparkles className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — RESULTS */}
        {step === 3 && bios && (
          <div className="fade-in">
            <div className="text-center mb-10">
              <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STEP 03</div>
              <h2 className="title text-3xl md:text-4xl" style={{ color: "#2C2418" }}>
                your five bios
              </h2>
              <p className="sans text-sm mt-3 max-w-lg mx-auto" style={{ color: "#5C4F3D" }}>
                Each one in a different style. Pick the one that lands. Tweak until it sounds even more like you.
              </p>
            </div>

            {bios.map((bio, idx) => (
              <div key={idx} className="bio-card rounded-sm p-8 mb-6">
                {/* Style header */}
                <div className="flex items-start justify-between mb-4 pb-4" style={{ borderBottom: "1px solid #E8DCC8" }}>
                  <div>
                    <div className="sans text-xs tracking-[0.3em] gold-text mb-2">STYLE 0{idx + 1}</div>
                    <h3 className="title text-2xl" style={{ color: "#2C2418" }}>
                      {bio.style}
                    </h3>
                    <p className="sans text-xs mt-2" style={{ color: "#5C4F3D" }}>
                      {bio.styleDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => copy(bio.fullBio, `bio-${idx}`)}
                    className="sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 px-4 py-2 rounded-sm"
                    style={{ border: "1px solid #8B6F3F", color: "#8B6F3F" }}
                  >
                    {copiedKey === `bio-${idx}` ? (
                      <><Check className="w-3 h-3" /> copied</>
                    ) : (
                      <><Copy className="w-3 h-3" /> copy bio</>
                    )}
                  </button>
                </div>

                {/* Name field separately */}
                <div className="mb-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="sans text-xs tracking-[0.2em] gold-text uppercase">Name field (the signage)</div>
                    <button
                      onClick={() => copy(bio.name, `name-${idx}`)}
                      className="sans text-xs gold-text"
                    >
                      {copiedKey === `name-${idx}` ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>
                  <div className="bio-preview">{bio.name}</div>
                </div>

                {/* Full bio preview */}
                <div className="mb-3">
                  <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-2">Bio (paste this)</div>
                  <div className="bio-preview">{bio.fullBio}</div>
                </div>

                {bio.characterCount && (
                  <div className="sans text-xs gold-text text-right">
                    {bio.characterCount} / 150 characters
                  </div>
                )}
              </div>
            ))}

            <div className="flex justify-center gap-4 mt-12">
              <button
                onClick={() => setStep(2)}
                className="sans px-6 py-3 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-2"
                style={{ color: "#8B6F3F", border: "1px solid #B8956A" }}
              >
                <RefreshCw className="w-3 h-3" /> tweak my answers
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
                "Your bio is the window."
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
