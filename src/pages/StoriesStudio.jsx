import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Copy, Check, ArrowRight, ArrowLeft, Sparkles, Loader2, RefreshCw, Settings, Heart, Shield, BookOpen, Briefcase } from "lucide-react";

const STORAGE_KEY = "stories_studio_profile_v1";

const PILLARS = [
  {
    id: "know",
    name: "Get to Know Me",
    subtitle: "Relatability, likability",
    description: "This is who I am, here's how it's relevant to you",
    icon: Heart,
    color: "#A6789A",
  },
  {
    id: "trust",
    name: "Get to Trust Me",
    subtitle: "Credibility, follow-through",
    description: "I do what I say I do",
    icon: Shield,
    color: "#8B6F3F",
  },
  {
    id: "learn",
    name: "Get to Learn From Me",
    subtitle: "Authority, leadership",
    description: "I am someone to look up to",
    icon: BookOpen,
    color: "#6B7B8B",
  },
  {
    id: "work",
    name: "Get to Work With Me",
    subtitle: "The selling, the invitation",
    description: "I am someone you can work with",
    icon: Briefcase,
    color: "#A67C4E",
  },
];

export default function StoriesStudio() {
  const [profile, setProfile] = useState(null);
  const [showSetup, setShowSetup] = useState(false);
  const [setupForm, setSetupForm] = useState({
    firstName: "",
    whoYouServe: "",
    undeniableParts: "",
    currentOffer: "",
    dmKeyword: "FREEDOM",
    voiceWords: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [brief, setBrief] = useState(null);
  const [completedIds, setCompletedIds] = useState([]);
  const [copiedKey, setCopiedKey] = useState("");

  // Load profile on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setProfile(parsed);
        setSetupForm(parsed);
      } else {
        setShowSetup(true);
      }
    } catch (e) {
      setShowSetup(true);
    }
  }, []);

  const updateSetup = (key, value) => setSetupForm({ ...setupForm, [key]: value });

  const saveProfile = () => {
    if (!setupForm.whoYouServe.trim() || !setupForm.undeniableParts.trim()) {
      setError("Fill in at least who you serve and the undeniable parts of your life 💛");
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(setupForm));
    setProfile(setupForm);
    setShowSetup(false);
    setError("");
  };

  const generateBrief = async () => {
    if (!profile) return;
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate-stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.error || `Server error: ${response.status}`);
      }

      const parsed = await response.json();
      setBrief(parsed);
      setCompletedIds([]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went sideways. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleComplete = (idx) => {
    if (completedIds.includes(idx)) {
      setCompletedIds(completedIds.filter((i) => i !== idx));
    } else {
      setCompletedIds([...completedIds, idx]);
    }
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
  };

  // SETUP SCREEN
  if (showSetup) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6" }}>
        <Style />
        <div className="max-w-3xl mx-auto px-6 pt-8">
          <Link
            to="/"
            className="sans text-xs tracking-[0.2em] uppercase inline-flex items-center gap-2"
            style={{ color: "#8B6F3F", textDecoration: "none" }}
          >
            <ArrowLeft className="w-3 h-3" /> back to the toolbox
          </Link>
        </div>
        <div className="max-w-3xl mx-auto px-6 py-12">
          <div className="text-center mb-10">
            <div className="sans text-xs tracking-[0.3em] gold-text mb-4">IGNITE LEGACY</div>
            <h1 className="title text-5xl md:text-6xl mb-4" style={{ color: "#2C2418" }}>
              stories studio
            </h1>
            <div className="gold-line w-32 mx-auto my-6"></div>
            <p className="sans text-sm md:text-base max-w-xl mx-auto" style={{ color: "#5C4F3D" }}>
              First, tell me about you. Just once. Then every time you open this, I'll have 5 fresh story ideas waiting for you — built from your actual life, not a content calendar.
            </p>
          </div>

          <div className="cream-card rounded-sm p-8 mb-6">
            <div className="mb-7">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                01 — Your first name
              </label>
              <input
                type="text"
                value={setupForm.firstName}
                onChange={(e) => updateSetup("firstName", e.target.value)}
                placeholder="So I can talk to you, not at you"
                className="w-full p-3 sans text-sm rounded-sm input-field"
              />
            </div>

            <div className="mb-7">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                02 — Who do you serve?
              </label>
              <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                Be specific. Who is this Instagram <em>for</em>?
              </p>
              <input
                type="text"
                value={setupForm.whoYouServe}
                onChange={(e) => updateSetup("whoYouServe", e.target.value)}
                placeholder="e.g. solo moms wanting to leave their W-2"
                className="w-full p-3 sans text-sm rounded-sm input-field"
              />
            </div>

            <div className="mb-7">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                03 — The undeniable parts of your life
              </label>
              <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                Pick 3-5 things that show up in your life every day — kids, dog, fight class, favorite coffee shop, your villa, your morning ritual. These are what your audience will see in your "Get to Know Me" stories.
              </p>
              <textarea
                value={setupForm.undeniableParts}
                onChange={(e) => updateSetup("undeniableParts", e.target.value)}
                placeholder="e.g. my kid Charlie, fight class at Soma, our villa in Bali, morning matcha ritual, scooter rides, our community of women"
                className="w-full p-3 sans text-sm rounded-sm input-field"
                style={{ minHeight: "80px", resize: "vertical" }}
              />
            </div>

            <div className="mb-7">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                04 — What you're inviting people into right now
              </label>
              <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                Your current offer or community — what your "Get to Work With Me" stories will softly point toward.
              </p>
              <input
                type="text"
                value={setupForm.currentOffer}
                onChange={(e) => updateSetup("currentOffer", e.target.value)}
                placeholder="e.g. Ignite Legacy ($99 entry into Enagic)"
                className="w-full p-3 sans text-sm rounded-sm input-field"
              />
            </div>

            <div className="mb-7">
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                05 — Your DM keyword
              </label>
              <input
                type="text"
                value={setupForm.dmKeyword}
                onChange={(e) => updateSetup("dmKeyword", e.target.value.toUpperCase())}
                placeholder="FREEDOM"
                className="w-full p-3 sans text-sm rounded-sm input-field"
              />
            </div>

            <div>
              <label className="sans text-xs tracking-[0.2em] gold-text uppercase block mb-2">
                Bonus — words that sound like you
              </label>
              <p className="sans text-xs mb-2" style={{ color: "#5C4F3D" }}>
                Phrases you actually say. Quirks. Vibes. Optional but the more I have, the more these prompts will feel like you.
              </p>
              <textarea
                value={setupForm.voiceWords}
                onChange={(e) => updateSetup("voiceWords", e.target.value)}
                placeholder="e.g. soft launch, slow build, wildly aligned, honestly, lowkey, drop in"
                className="w-full p-3 sans text-sm rounded-sm input-field"
                style={{ minHeight: "60px", resize: "vertical" }}
              />
            </div>
          </div>

          {error && (
            <div className="cream-card rounded-sm p-4 mb-6" style={{ borderLeft: "3px solid #B85C3F" }}>
              <p className="sans text-sm" style={{ color: "#8B4530" }}>{error}</p>
            </div>
          )}

          <div className="flex justify-between items-center">
            {profile && (
              <button
                onClick={() => setShowSetup(false)}
                className="sans px-6 py-3 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-2"
                style={{ color: "#8B6F3F" }}
              >
                <ArrowLeft className="w-4 h-4" /> cancel
              </button>
            )}
            <button
              onClick={saveProfile}
              className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-3 ml-auto"
            >
              save & start <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MAIN SCREEN
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE6" }}>
      <Style />

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
        <div className="flex items-start justify-between mb-12">
          <div>
            <div className="sans text-xs tracking-[0.3em] gold-text mb-2">IGNITE LEGACY</div>
            <h1 className="title text-5xl md:text-6xl" style={{ color: "#2C2418" }}>
              today's brief
            </h1>
            {profile?.firstName && (
              <p className="serif text-lg mt-2" style={{ color: "#5C4F3D" }}>
                hi {profile.firstName.toLowerCase()}.
              </p>
            )}
          </div>
          <button
            onClick={() => setShowSetup(true)}
            className="sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 px-3 py-2 rounded-sm"
            style={{ color: "#8B6F3F", border: "1px solid #B8956A" }}
            title="Edit your profile"
          >
            <Settings className="w-3 h-3" /> edit profile
          </button>
        </div>

        {/* The 4 pillars overview (always visible at top, small) */}
        <div className="cream-card rounded-sm p-6 mb-8">
          <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-4">
            The 4 Selling on Stories pillars
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PILLARS.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.id} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${p.color}20`, color: p.color }}
                  >
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="sans text-xs font-medium" style={{ color: "#2C2418" }}>
                      {p.name}
                    </div>
                    <div className="sans text-xs" style={{ color: "#8B6F3F", fontStyle: "italic" }}>
                      {p.subtitle}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generate button — only shown when no brief yet */}
        {!brief && !loading && (
          <div className="text-center py-12">
            <p className="serif text-2xl mb-6" style={{ color: "#5C4F3D" }}>
              ready when you are.
            </p>
            <p className="sans text-sm max-w-md mx-auto mb-8" style={{ color: "#5C4F3D" }}>
              I'll pull 5 prompts for you, balanced across the 4 pillars. Each one is a starting point — voice-note it, don't write it. Keep it raw.
            </p>
            <button
              onClick={generateBrief}
              className="gold-button sans px-10 py-4 rounded-sm tracking-[0.2em] text-xs uppercase inline-flex items-center gap-3"
            >
              generate today's 5 prompts <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" style={{ color: "#8B6F3F" }} />
            <p className="serif text-lg italic" style={{ color: "#5C4F3D" }}>
              pulling ideas from your life...
            </p>
          </div>
        )}

        {error && !loading && (
          <div className="cream-card rounded-sm p-4 mb-6" style={{ borderLeft: "3px solid #B85C3F" }}>
            <p className="sans text-sm" style={{ color: "#8B4530" }}>{error}</p>
          </div>
        )}

        {/* Brief — the 5 prompts */}
        {brief && !loading && (
          <div>
            {/* Greeting note */}
            {brief.greeting && (
              <div className="text-center mb-10">
                <p className="serif text-xl italic" style={{ color: "#5C4F3D", maxWidth: "540px", margin: "0 auto" }}>
                  "{brief.greeting}"
                </p>
              </div>
            )}

            {/* Prompts */}
            <div className="space-y-5 mb-10">
              {brief.prompts.map((prompt, idx) => {
                const pillar = PILLARS.find((p) => p.id === prompt.pillarId) || PILLARS[0];
                const Icon = pillar.icon;
                const isCompleted = completedIds.includes(idx);
                return (
                  <div
                    key={idx}
                    className="prompt-card rounded-sm p-6 md:p-8 transition-all"
                    style={{
                      background: isCompleted ? "#F0E6D2" : "#FAF6EE",
                      border: `1px solid ${isCompleted ? pillar.color : "#E8DCC8"}`,
                      opacity: isCompleted ? 0.7 : 1,
                    }}
                  >
                    {/* Pillar tag */}
                    <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: `${pillar.color}20`, color: pillar.color }}
                        >
                          <Icon className="w-5 h-5" strokeWidth={1.5} />
                        </div>
                        <div>
                          <div
                            className="sans text-xs tracking-[0.2em] uppercase font-medium"
                            style={{ color: pillar.color }}
                          >
                            Story {idx + 1} · {pillar.name}
                          </div>
                          {prompt.timeOfDay && (
                            <div className="sans text-xs" style={{ color: "#8B6F3F", fontStyle: "italic" }}>
                              {prompt.timeOfDay}
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => toggleComplete(idx)}
                        className="sans text-xs tracking-[0.2em] uppercase flex items-center gap-2 px-3 py-1.5 rounded-sm"
                        style={{
                          backgroundColor: isCompleted ? pillar.color : "transparent",
                          color: isCompleted ? "#F5EFE6" : pillar.color,
                          border: `1px solid ${pillar.color}`,
                        }}
                      >
                        {isCompleted ? (
                          <>
                            <Check className="w-3 h-3" /> done
                          </>
                        ) : (
                          <>mark done</>
                        )}
                      </button>
                    </div>

                    {/* The prompt */}
                    <h3
                      className="serif text-2xl md:text-3xl mb-4"
                      style={{ color: "#2C2418", lineHeight: 1.3 }}
                    >
                      {prompt.prompt}
                    </h3>

                    {/* Why this prompt */}
                    {prompt.why && (
                      <p className="sans text-sm mb-5 italic" style={{ color: "#5C4F3D" }}>
                        {prompt.why}
                      </p>
                    )}

                    {/* The angles */}
                    <div className="mt-5 pt-5" style={{ borderTop: `1px solid ${pillar.color}30` }}>
                      <div className="sans text-xs tracking-[0.2em] gold-text uppercase mb-3">
                        a couple of ways to do it
                      </div>
                      <div className="space-y-3">
                        {prompt.angles.map((angle, ai) => (
                          <div key={ai} className="flex gap-3">
                            <span
                              className="serif text-lg flex-shrink-0"
                              style={{ color: pillar.color, lineHeight: 1 }}
                            >
                              ·
                            </span>
                            <p className="sans text-sm" style={{ color: "#3D3328", lineHeight: 1.6 }}>
                              {angle}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Copy button */}
                    <div className="mt-5 flex justify-end">
                      <button
                        onClick={() =>
                          copy(
                            `${pillar.name} — ${prompt.prompt}\n\nWays to do it:\n${prompt.angles.map((a) => `• ${a}`).join("\n")}`,
                            `prompt-${idx}`
                          )
                        }
                        className="sans text-xs flex items-center gap-1"
                        style={{ color: "#8B6F3F" }}
                      >
                        {copiedKey === `prompt-${idx}` ? (
                          <>
                            <Check className="w-3 h-3" /> copied
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" /> copy this prompt
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer actions */}
            <div className="flex flex-col items-center gap-4 pt-6">
              {completedIds.length > 0 && (
                <p className="serif text-lg italic" style={{ color: "#8B6F3F" }}>
                  {completedIds.length} of 5 done
                  {completedIds.length === 5 && " — go enjoy your day."}
                </p>
              )}
              <button
                onClick={generateBrief}
                className="sans px-6 py-3 rounded-sm tracking-[0.2em] text-xs uppercase flex items-center gap-2"
                style={{ color: "#8B6F3F", border: "1px solid #B8956A" }}
              >
                <RefreshCw className="w-3 h-3" /> generate fresh prompts
              </button>
            </div>
          </div>
        )}

        <div className="text-center mt-16 pt-8" style={{ borderTop: "1px solid #E8DCC8" }}>
          <p className="serif text-lg" style={{ color: "#8B6F3F" }}>
            "show up, don't perform."
          </p>
        </div>
      </div>
    </div>
  );
}

// ----- Inline Style Component -----
function Style() {
  return (
    <style>{`
      @font-face {
        font-family: 'Promenade';
        src: url('https://assets.cdn.filesafe.space/wcJWrJ0LKUsg51VQbi8P/media/69e51fd38696a78b8d2895e7.ttf') format('truetype');
        font-display: swap;
      }
      .title { font-family: 'Promenade', Georgia, serif; font-weight: 400; font-style: normal; }
      .serif { font-family: 'Cormorant Garamond', Georgia, serif; font-weight: 400; }
      .sans { font-family: 'Inter', sans-serif; }
      .gold-line { background: linear-gradient(90deg, transparent, #B8956A, transparent); height: 1px; }
      .gold-text { color: #8B6F3F; }
      .cream-card { background: #FAF6EE; border: 1px solid #E8DCC8; }
      .gold-button { background: #2C2418; color: #F5EFE6; transition: all 0.3s ease; }
      .gold-button:hover { background: #8B6F3F; }
      .gold-button:disabled { opacity: 0.4; cursor: not-allowed; }
      textarea, input { font-family: 'Inter', sans-serif; }
      .input-field { background: #F5EFE6; border: 1px solid #E8DCC8; color: #2C2418; }
      .input-field:focus { outline: none; border-color: #8B6F3F; }
      @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      .prompt-card { animation: fadeIn 0.5s ease-out; }
    `}</style>
  );
}
