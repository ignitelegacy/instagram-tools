import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function BoutiqueStyle() {
  return (
    <style>{`
      .boutique-hero {
        min-height: 90vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 80px 24px;
        text-align: center;
        background: radial-gradient(ellipse at top, rgba(184, 149, 106, 0.12), transparent 60%), var(--cream);
      }
      .boutique-hero h1 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: clamp(56px, 11vw, 120px);
        line-height: 0.95;
        color: var(--ink);
        margin-bottom: 8px;
      }
      .hero-subhead {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: clamp(20px, 2.5vw, 28px);
        color: var(--muted);
        margin-top: 16px;
        max-width: 600px;
      }
      .hero-intro {
        max-width: 540px;
        font-size: 15px;
        color: var(--muted);
        line-height: 1.8;
        font-family: 'Inter', sans-serif;
      }
      .hero-cta-row {
        display: flex;
        gap: 12px;
        margin-top: 40px;
        flex-wrap: wrap;
        justify-content: center;
      }
      .bou-btn-primary {
        background: var(--ink);
        color: var(--cream);
        padding: 14px 28px;
        border-radius: 100px;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 500;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: none;
        cursor: pointer;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
      }
      .bou-btn-primary:hover { background: var(--gold); transform: translateY(-1px); color: var(--cream); }
      .bou-btn-secondary {
        background: transparent;
        color: var(--ink);
        border: 1px solid var(--gold-light);
        padding: 14px 28px;
        border-radius: 100px;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 500;
        transition: all 0.3s ease;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        text-decoration: none;
        font-family: 'Inter', sans-serif;
      }
      .bou-btn-secondary:hover { border-color: var(--ink); }

      .bou-skip-banner {
        background: var(--ink);
        color: var(--cream);
        padding: 16px 24px;
        text-align: center;
      }
      .bou-skip-banner a {
        color: var(--cream);
        text-decoration: none;
        font-size: 12px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-bottom: 1px solid var(--gold-light);
        padding-bottom: 2px;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      .bou-skip-banner a:hover { color: var(--gold-light); }

      .bou-nav-bar {
        position: sticky;
        top: 16px;
        z-index: 100;
        display: flex;
        justify-content: center;
        margin: 0 auto;
        padding: 0 24px;
        pointer-events: none;
      }
      .bou-nav-pill {
        background: var(--ink);
        color: var(--cream);
        border-radius: 100px;
        padding: 8px;
        display: flex;
        gap: 4px;
        box-shadow: 0 8px 32px rgba(44, 36, 24, 0.15);
        pointer-events: auto;
        flex-wrap: wrap;
        justify-content: center;
      }
      .bou-nav-pill a {
        color: var(--cream);
        text-decoration: none;
        padding: 10px 20px;
        border-radius: 100px;
        font-size: 11px;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        font-weight: 500;
        transition: all 0.3s ease;
        white-space: nowrap;
        font-family: 'Inter', sans-serif;
      }
      .bou-nav-pill a:hover { background: var(--gold); }

      .bou-section { padding: 100px 24px; max-width: 980px; margin: 0 auto; }
      .bou-section-header { text-align: center; margin-bottom: 60px; }
      .bou-section-header h2 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: clamp(44px, 7vw, 80px);
        line-height: 1;
        color: var(--ink);
        margin: 16px 0;
      }
      .bou-sec-subhead {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 22px;
        color: var(--muted);
        margin-top: 12px;
      }

      .bou-metaphor-card {
        background: var(--cream-light);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 40px;
        margin-bottom: 60px;
        position: relative;
      }
      .bou-metaphor-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0;
        width: 4px; height: 100%;
        background: linear-gradient(180deg, var(--gold), var(--gold-light));
      }
      .bou-quote-text {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 24px;
        line-height: 1.5;
        color: var(--ink);
      }
      .bou-quote-accent { color: var(--gold); }

      .bou-pillars { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin: 24px 0; }
      .bou-pillar {
        background: var(--cream);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 24px;
        text-align: center;
      }
      .bou-pillar-label {
        display: block;
        font-size: 11px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--gold);
        font-weight: 500;
        margin-bottom: 8px;
        font-family: 'Inter', sans-serif;
      }
      .bou-pillar h5 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: 26px;
        color: var(--ink);
        margin-bottom: 8px;
      }
      .bou-pillar p { font-size: 13px; color: var(--muted); font-family: 'Inter', sans-serif; }
      @media (max-width: 720px) { .bou-pillars { grid-template-columns: 1fr; } }

      .bou-pull-quote { text-align: center; padding: 60px 24px; margin: 40px 0; }
      .bou-pull-quote p {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: clamp(24px, 4vw, 36px);
        line-height: 1.4;
        color: var(--ink);
        max-width: 720px;
        margin: 0 auto;
      }
      .bou-pull-quote p::before { content: '"'; color: var(--gold); }
      .bou-pull-quote p::after { content: '"'; color: var(--gold); }

      .bou-step {
        margin-bottom: 48px;
        background: var(--cream-light);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 40px;
      }
      .bou-step-header {
        display: flex;
        align-items: baseline;
        gap: 20px;
        margin-bottom: 24px;
        padding-bottom: 20px;
        border-bottom: 1px solid var(--line);
      }
      .bou-step-number {
        font-family: 'Promenade', Georgia, serif;
        font-size: 56px;
        font-weight: 400;
        color: var(--gold);
        line-height: 1;
        flex-shrink: 0;
      }
      .bou-step-title {
        font-family: 'Promenade', Georgia, serif;
        font-size: 38px;
        font-weight: 400;
        color: var(--ink);
        line-height: 1.1;
      }
      .bou-step-subtitle { font-size: 13px; color: var(--muted); margin-top: 4px; font-family: 'Inter', sans-serif; }
      .bou-step h4 {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 400;
        font-size: 22px;
        color: var(--ink);
        margin: 24px 0 12px;
      }
      .bou-step p { color: var(--ink-soft); margin-bottom: 14px; font-size: 15px; font-family: 'Inter', sans-serif; }
      .bou-step ul { padding-left: 0; list-style: none; }
      .bou-step li {
        padding: 8px 0 8px 28px;
        position: relative;
        color: var(--ink-soft);
        font-size: 15px;
        font-family: 'Inter', sans-serif;
      }
      .bou-step li::before {
        content: '→';
        position: absolute;
        left: 0;
        color: var(--gold);
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 18px;
      }

      .bou-aubreys-take {
        background: linear-gradient(135deg, var(--cream-warm) 0%, var(--cream-light) 100%);
        border-radius: 4px;
        padding: 28px 32px;
        margin: 24px 0;
        border-left: 4px solid var(--gold);
        position: relative;
      }
      .bou-aubreys-take::before {
        content: '✦';
        position: absolute;
        top: 24px; right: 28px;
        color: var(--gold);
        font-size: 20px;
      }
      .bou-take-label {
        font-size: 10px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--gold);
        font-weight: 600;
        margin-bottom: 10px;
        font-family: 'Inter', sans-serif;
      }
      .bou-take-text {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 18px;
        line-height: 1.6;
        color: var(--ink);
      }

      .bou-example-box {
        background: var(--cream);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 24px;
        margin: 16px 0;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        line-height: 1.7;
        color: var(--ink-soft);
      }
      .bou-example-label {
        font-size: 10px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--gold);
        margin-bottom: 12px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
      }

      .bou-good-bad { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 20px 0; }
      .bou-bad {
        padding: 20px; border-radius: 4px; font-size: 14px; line-height: 1.6;
        background: rgba(184, 92, 63, 0.06); border-left: 3px solid #B85C3F; color: #6B3D2F;
        font-family: 'Inter', sans-serif;
      }
      .bou-good {
        padding: 20px; border-radius: 4px; font-size: 14px; line-height: 1.6;
        background: rgba(139, 111, 63, 0.06); border-left: 3px solid var(--gold); color: var(--ink-soft);
        font-family: 'Inter', sans-serif;
      }
      .bou-bad-label {
        font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
        margin-bottom: 8px; font-weight: 600; color: #B85C3F; font-family: 'Inter', sans-serif;
      }
      .bou-good-label {
        font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase;
        margin-bottom: 8px; font-weight: 600; color: var(--gold); font-family: 'Inter', sans-serif;
      }
      @media (max-width: 640px) { .bou-good-bad { grid-template-columns: 1fr; } }

      .bou-proof-highlight {
        background: var(--cream-warm);
        padding: 16px 20px;
        border-left: 3px solid var(--gold);
        border-radius: 4px;
        margin-top: 16px;
        font-size: 15px;
        color: var(--ink-soft);
        font-family: 'Inter', sans-serif;
        line-height: 1.7;
      }

      .bou-story-types { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin: 20px 0; }
      .bou-story-type {
        background: var(--cream);
        border: 1px solid var(--line);
        border-left: 3px solid var(--gold);
        padding: 16px 20px;
        border-radius: 4px;
      }
      .bou-story-type-title {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-weight: 500;
        font-size: 18px;
        color: var(--gold);
        display: block;
        margin-bottom: 4px;
      }
      .bou-story-type span { font-size: 13px; color: var(--muted); font-family: 'Inter', sans-serif; }
      @media (max-width: 640px) { .bou-story-types { grid-template-columns: 1fr; } }

      .bou-tool-cta {
        margin: 48px 0;
        background: linear-gradient(135deg, var(--ink) 0%, #1A140B 100%);
        color: var(--cream);
        border-radius: 8px;
        overflow: hidden;
        position: relative;
        box-shadow: 0 20px 60px rgba(44, 36, 24, 0.25);
      }
      .bou-tool-cta::before {
        content: '';
        position: absolute;
        top: -50%; right: -20%;
        width: 600px; height: 600px;
        background: radial-gradient(circle, rgba(184, 149, 106, 0.15) 0%, transparent 60%);
        pointer-events: none;
      }
      .bou-tool-cta-inner { padding: 48px 40px; position: relative; z-index: 1; }
      .bou-tool-cta-tag {
        display: inline-block;
        background: var(--gold);
        color: var(--cream);
        padding: 6px 14px;
        border-radius: 100px;
        font-size: 10px;
        letter-spacing: 0.25em;
        text-transform: uppercase;
        font-weight: 600;
        margin-bottom: 20px;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-cta h3 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: clamp(32px, 5vw, 48px);
        line-height: 1.1;
        color: var(--cream);
        margin-bottom: 16px;
      }
      .bou-tool-desc {
        font-size: 15px;
        line-height: 1.7;
        color: rgba(245, 239, 230, 0.85);
        margin-bottom: 28px;
        max-width: 580px;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-features { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 28px; }
      .bou-tool-features span {
        background: rgba(184, 149, 106, 0.15);
        border: 1px solid rgba(184, 149, 106, 0.3);
        color: var(--gold-light);
        padding: 6px 12px;
        border-radius: 100px;
        font-size: 12px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-button {
        display: inline-flex;
        align-items: center;
        gap: 12px;
        background: var(--cream);
        color: var(--ink);
        padding: 16px 32px;
        border-radius: 100px;
        text-decoration: none;
        font-size: 12px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 600;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-button:hover { transform: translateY(-2px); background: var(--gold-light); color: var(--ink); }

      .bou-tool-chip {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        background: var(--cream-warm);
        border: 1px solid var(--gold-light);
        padding: 8px 14px;
        border-radius: 100px;
        text-decoration: none;
        color: var(--gold-dark);
        font-size: 12px;
        font-weight: 500;
        letter-spacing: 0.05em;
        margin: 6px 4px 6px 0;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-chip:hover { background: var(--gold); color: var(--cream); border-color: var(--gold); }

      .bou-action-card {
        background: var(--ink);
        color: var(--cream);
        padding: 32px;
        border-radius: 4px;
        margin: 32px 0;
        text-align: center;
      }
      .bou-action-label {
        font-size: 11px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--gold-light);
        margin-bottom: 16px;
        font-family: 'Inter', sans-serif;
      }
      .bou-action-card h3 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: 38px;
        margin-bottom: 12px;
      }
      .bou-action-card p { color: rgba(245, 239, 230, 0.8); font-size: 15px; font-family: 'Inter', sans-serif; }

      .bou-hub-section {
        background: linear-gradient(180deg, var(--cream) 0%, var(--cream-warm) 100%);
        padding: 100px 24px;
      }
      .bou-hub-inner { max-width: 1100px; margin: 0 auto; }
      .bou-tool-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 24px;
        margin-top: 48px;
      }
      .bou-tool-card {
        background: var(--cream-light);
        border: 1px solid var(--line);
        border-radius: 4px;
        padding: 32px;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
      }
      .bou-tool-card:hover {
        border-color: var(--gold);
        transform: translateY(-4px);
        box-shadow: 0 12px 32px rgba(44, 36, 24, 0.1);
      }
      .bou-tool-card-status {
        position: absolute;
        top: 24px; right: 24px;
        font-size: 10px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--gold);
        font-weight: 600;
        font-family: 'Inter', sans-serif;
      }
      .bou-tool-icon {
        width: 48px; height: 48px;
        border-radius: 4px;
        background: var(--cream-warm);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--gold);
        font-size: 24px;
        margin-bottom: 4px;
      }
      .bou-tool-card h4 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: 28px;
        color: var(--ink);
        margin: 16px 0 12px;
      }
      .bou-tool-card p { font-size: 14px; color: var(--muted); margin-bottom: 20px; line-height: 1.6; font-family: 'Inter', sans-serif; }
      .bou-card-link {
        color: var(--gold);
        text-decoration: none;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 600;
        border-bottom: 1px solid var(--gold);
        padding-bottom: 2px;
        font-family: 'Inter', sans-serif;
      }

      .bou-floating {
        position: fixed;
        bottom: 24px; right: 24px;
        z-index: 200;
        background: var(--ink);
        color: var(--cream);
        padding: 14px 22px;
        border-radius: 100px;
        text-decoration: none;
        font-size: 11px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        font-weight: 600;
        box-shadow: 0 8px 32px rgba(44, 36, 24, 0.3);
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.3s ease;
        font-family: 'Inter', sans-serif;
      }
      .bou-floating:hover { background: var(--gold); transform: translateY(-2px); color: var(--cream); }

      .bou-closing { text-align: center; padding: 120px 24px 80px; }
      .bou-closing h2 {
        font-family: 'Promenade', Georgia, serif;
        font-weight: 400;
        font-size: clamp(44px, 7vw, 68px);
        line-height: 1.1;
        color: var(--ink);
        margin-bottom: 24px;
      }
      .bou-closing p {
        font-family: 'Cormorant Garamond', Georgia, serif;
        font-size: 22px;
        color: var(--muted);
        max-width: 540px;
        margin: 0 auto 16px;
      }
    `}</style>
  );
}

const LABEL_STYLE = {
  fontSize: "11px",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: "var(--gold)",
  fontWeight: 500,
  fontFamily: "'Inter', sans-serif",
};

export default function Boutique() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--cream)", WebkitFontSmoothing: "antialiased" }}>
      <BoutiqueStyle />

      {/* Back to toolbox */}
      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "24px 24px 0" }}>
        <Link
          to="/"
          style={{
            color: "var(--gold)",
            textDecoration: "none",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          <ArrowLeft style={{ width: "12px", height: "12px" }} /> back to the toolbox
        </Link>
      </div>

      {/* Skip banner */}
      <div className="bou-skip-banner" style={{ marginTop: "24px" }}>
        <a href="#tools">✦ Skip the reading — open the toolbox <span style={{ marginLeft: "4px" }}>→</span></a>
      </div>

      {/* Hero */}
      <header className="boutique-hero">
        <div style={LABEL_STYLE}>IGNITE LEGACY</div>
        <h1>the boutique.</h1>
        <div className="hero-subhead">
          your instagram, curated like the only shop on the street worth stopping for.
        </div>
        <div className="hairline" style={{ width: "120px", margin: "32px auto" }}></div>
        <p className="hero-intro">
          Your Instagram is a boutique on a quiet luxury street. Most people are running a fluorescent-lit warehouse — loud, cluttered, screaming "SALE." We're going to do the opposite. We're going to build the kind of boutique your dream client stops walking for, walks into, lingers in — and remembers.
        </p>
        <div className="hero-cta-row">
          <a href="#metaphor" className="bou-btn-primary">walk through it →</a>
          <a href="#tools" className="bou-btn-secondary">✦ jump to the tools</a>
        </div>
      </header>

      {/* Sticky nav */}
      <div className="bou-nav-bar">
        <nav className="bou-nav-pill">
          <a href="#metaphor">The boutique</a>
          <a href="#bio">The window</a>
          <a href="#pinned">The mannequins</a>
          <a href="#stories">The counter</a>
          <a href="#tools" style={{ background: "var(--gold)" }}>✦ Tools</a>
        </nav>
      </div>

      {/* ─── METAPHOR ─── */}
      <section id="metaphor" className="bou-section">
        <div className="bou-section-header">
          <div style={LABEL_STYLE}>First, the metaphor</div>
          <h2>your instagram is a boutique.</h2>
          <div className="hairline" style={{ width: "80px", margin: "28px auto 0" }}></div>
        </div>

        <div className="bou-metaphor-card">
          <div style={{ ...LABEL_STYLE, marginBottom: "12px" }}>Why this metaphor matters</div>
          <p className="bou-quote-text">
            Most distributors are running a <span className="bou-quote-accent">warehouse</span> — loud, cluttered, fluorescent, "EVERYTHING MUST GO." We're building a <span className="bou-quote-accent">boutique</span> — curated, intentional, considered. The kind of place where someone walks in, runs their fingers along the rack, and quietly knows: <span className="bou-quote-accent">this is for me.</span>
          </p>
        </div>

        <div className="bou-pillars">
          <div className="bou-pillar">
            <span className="bou-pillar-label">Part one</span>
            <h5>The window</h5>
            <p>Your bio. The display that stops them on the sidewalk.</p>
          </div>
          <div className="bou-pillar">
            <span className="bou-pillar-label">Part two</span>
            <h5>The mannequins</h5>
            <p>Your pinned posts. The three pieces on the front display.</p>
          </div>
          <div className="bou-pillar">
            <span className="bou-pillar-label">Part three</span>
            <h5>The counter</h5>
            <p>Your stories. The conversation that closes the sale.</p>
          </div>
        </div>

        <div className="bou-pull-quote">
          <p>If your window doesn't stop them, they never even come inside.</p>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: "200px", margin: "0 auto" }}></div>

      {/* ─── BIO ─── */}
      <section id="bio" className="bou-section">
        <div className="bou-section-header">
          <div style={LABEL_STYLE}>Part one</div>
          <h2>the window display.</h2>
          <div className="bou-sec-subhead">your instagram bio</div>
          <div className="hairline" style={{ width: "80px", margin: "28px auto 0" }}></div>
        </div>

        <div className="bou-metaphor-card">
          <div style={{ ...LABEL_STYLE, marginBottom: "12px" }}>The 7-second test</div>
          <p className="bou-quote-text">
            Someone walks past your boutique window. They have <span className="bou-quote-accent">seven seconds</span>. In those seven seconds, your window has to answer three questions: <span className="bou-quote-accent">what is this place</span>, <span className="bou-quote-accent">is it for me</span>, and <span className="bou-quote-accent">what's inside worth coming in for</span>. If the window doesn't answer those, they keep walking. Forever.
          </p>
        </div>

        <div className="bou-tool-cta">
          <div className="bou-tool-cta-inner">
            <div className="bou-tool-cta-tag">✦ This Section Has A Tool</div>
            <h3>Stop writing your bio from scratch.</h3>
            <p className="bou-tool-desc">
              The Bio Generator turns 6 quick questions into 5 different Instagram bio variations — each in a different style, all in YOUR voice. Pick the one that lands. Tweak it. Paste it.
            </p>
            <div className="bou-tool-features">
              <span>5 styles</span>
              <span>Under 150 chars</span>
              <span>In your voice</span>
              <span>~60 seconds</span>
            </div>
            <Link to="/bio-generator" className="bou-tool-button">Open Bio Generator →</Link>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">01</div>
            <div>
              <div className="bou-step-title">The signage</div>
              <div className="bou-step-subtitle">Your name field — the boutique's name above the door.</div>
            </div>
          </div>
          <p>The name field (right under your handle) is the signage above your door. It's the most underused real estate on Instagram — and it's <span style={{ color: "var(--gold)" }}>searchable</span>. When someone types "freedom-based business" or "passive income mom" or "calm wealth" into Instagram's search bar, IG matches their query against the name field — not your bio text.</p>
          <h4>The formula:</h4>
          <p>Your Name | What You Do or Who You Help</p>
          <div className="bou-good-bad">
            <div className="bou-bad">
              <div className="bou-bad-label">don't</div>
              Aubrey ✨🌴💛<br />(pretty, but searchable for nothing)
            </div>
            <div className="bou-good">
              <div className="bou-good-label">do</div>
              Aubrey | Freedom-Based Business Coach<br />(searchable, clear, magnetic)
            </div>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">02</div>
            <div>
              <div className="bou-step-title">The window line</div>
              <div className="bou-step-subtitle">Line one of your bio. The piece on the front mannequin.</div>
            </div>
          </div>
          <p>Line 1 is the piece in the window — the one that stops someone from walking past. Most people waste this line on adjectives ("partner · parent · entrepreneur"). That's not a window display. That's a name tag.</p>
          <h4>Three window lines that stop the scroll:</h4>
          <ul>
            <li>The transformation: "Helping high-performers ditch the 9–5 with one elegant exit plan"</li>
            <li>The contrarian: "Building wealth without the hustle (or the MLM cringe)"</li>
            <li>The lifestyle promise: "Designing a freedom-based life you don't need a vacation from"</li>
          </ul>
          <div className="bou-aubreys-take">
            <div className="bou-take-label">My personal take</div>
            <div className="bou-take-text">
              Unless you're posting super heavily about Kangen water, I probably wouldn't put "Kangen" in your bio. Lead with <span style={{ color: "var(--gold)" }}>who you are</span>, not what you sell. For me personally, I might do something like "Daily breakdowns of how I built a six-figure income as a solo mom" — because that's what's actually going to speak to my audience. People land on your page and think "oh, I want to know how SHE did it." That's the hook. Not the product.
            </div>
          </div>
          <div className="bou-good-bad">
            <div className="bou-bad">
              <div className="bou-bad-label">leads with what you sell</div>
              Kangen Water Distributor 💧<br />Building a Kangen team<br />DM me to learn more
            </div>
            <div className="bou-good">
              <div className="bou-good-label">leads with who you are</div>
              Solo mom · 6-figure income from my phone<br />Showing you how I built it<br />DM "FREEDOM" for the breakdown
            </div>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">03</div>
            <div>
              <div className="bou-step-title">The price tag whisper</div>
              <div className="bou-step-subtitle">Line two — proof or specificity.</div>
            </div>
          </div>
          <p>In a luxury boutique, you don't shout the price — you let the quality speak. Line 2 is your quiet credibility. Either proof, specificity, or a teaser of what's inside.</p>
          <ul>
            <li>Credibility: "7 yrs building online · Top 1% in my niche"</li>
            <li>Specificity: "For wellness-minded people ready to leave the W2"</li>
            <li>Content tease: "Daily breakdowns of how I did it from my phone"</li>
          </ul>
          <p style={{ color: "var(--muted)", marginTop: "16px" }}>
            If you don't have personal results yet, lean into community proof: "Part of a 1000+ person freedom collective."
          </p>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">04</div>
            <div>
              <div className="bou-step-title">The invitation card</div>
              <div className="bou-step-subtitle">Your CTA — one clear ask, not three.</div>
            </div>
          </div>
          <p>Last line. One clear invitation. Not three. Not a dropdown. The DM keyword strategy is what's working in 2026 because Instagram's algorithm rewards engagement over outbound clicks.</p>
          <h4>The DM keyword formula:</h4>
          <div className="bou-example-box">
            <div className="bou-example-label">Example</div>
            ↓ DM me "FREEDOM" for the free guide
          </div>
          <div className="bou-aubreys-take">
            <div className="bou-take-label">A note on DM keywords</div>
            <div className="bou-take-text">
              You don't even have to say what they're going to get from the DM keyword. If you say "DM me FREEDOM," that's enough. Instagram sees the engagement — they're reaching out, you're connecting. And it keeps you flexible — you can change what you send them later. The algorithm doesn't reward outbound clicks the way it used to. It rewards <span style={{ color: "var(--gold)" }}>conversation</span>.
            </div>
          </div>
          <h4>What about multi-passionate folks?</h4>
          <div className="bou-aubreys-take">
            <div className="bou-take-label">For Kelly (and anyone with multiple offers)</div>
            <div className="bou-take-text">
              Multiple offers? Beautiful. The answer isn't to <span style={{ color: "var(--gold)" }}>broaden</span> your CTAs — it's to get <span style={{ color: "var(--gold)" }}>more specific per post</span>. One day you're selling Offer A, that day's CTA is for Offer A. Next day you're selling Ignite Legacy, that day's CTA is for Ignite Legacy. Don't try to make one bio CTA cover everything. Pick the offer that's primary right now and lead with that.
            </div>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">05</div>
            <div>
              <div className="bou-step-title">The doorway</div>
              <div className="bou-step-subtitle">Your link in bio — where the door actually leads.</div>
            </div>
          </div>
          <p>The door has to lead somewhere worth walking through. Your link in bio should mirror the journey: Ignite Legacy as the entry point — not your personal Enagic checkout. The $99 entry is the warm hello. Give them the warm hello first.</p>
          <ul>
            <li>Top of your link page: Ignite Legacy ($99 entry)</li>
            <li>Below: Free resource that matches your DM keyword</li>
            <li>Below: Calendar / DM link if they want to talk</li>
            <li>Below: Your community / freebies / nurture content</li>
          </ul>
        </div>

        <div className="bou-action-card">
          <div className="bou-action-label">Your action step</div>
          <h3>Rewrite your window display in the next 24 hours.</h3>
          <p style={{ marginBottom: "24px" }}>Use the formulas above. Don't aim for perfect. Aim for clear.</p>
          <Link
            to="/bio-generator"
            className="bou-btn-primary"
            style={{ background: "var(--gold-light)", color: "var(--ink)" }}
          >
            ✦ Use the Bio Generator →
          </Link>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: "200px", margin: "0 auto" }}></div>

      {/* ─── PINNED POSTS ─── */}
      <section id="pinned" className="bou-section">
        <div className="bou-section-header">
          <div style={LABEL_STYLE}>Part two</div>
          <h2>the three mannequins.</h2>
          <div className="bou-sec-subhead">your pinned posts</div>
          <div className="hairline" style={{ width: "80px", margin: "28px auto 0" }}></div>
        </div>

        <div className="bou-metaphor-card">
          <div style={{ ...LABEL_STYLE, marginBottom: "12px" }}>Why three mannequins</div>
          <p className="bou-quote-text">
            They walked through your door. Now they're looking at the three pieces on the front display. They have to do three jobs in order: <span className="bou-quote-accent">Connect</span> (so they trust the brand), <span className="bou-quote-accent">Compel</span> (so they see themselves in it), and <span className="bou-quote-accent">Convert</span> (so they walk to the counter). Every great boutique merchandises the front display the same way — and yours should too.
          </p>
        </div>

        <div className="bou-tool-cta">
          <div className="bou-tool-cta-inner">
            <div className="bou-tool-cta-tag">✦ This Section Has A Tool</div>
            <h3>Don't write three pinned posts from a blank page.</h3>
            <p className="bou-tool-desc">
              Record a Loom answering 10 questions. Paste the transcript. Get all three pinned posts — captions, hooks, carousel slides, CTAs, and visual direction — written in YOUR voice. Including community-proof guidance for Pin 2 if you don't have your own results yet.
            </p>
            <div className="bou-tool-features">
              <span>3 full post packages</span>
              <span>Hooks + captions</span>
              <span>5 carousel slides each</span>
              <span>Vault-pull guidance</span>
            </div>
            <Link to="/pinned-posts" className="bou-tool-button">Open Pinned Posts Generator →</Link>
          </div>
        </div>

        <div className="bou-pillars">
          <div className="bou-pillar">
            <span className="bou-pillar-label">Mannequin 01</span>
            <h5>Connect</h5>
            <p>Your story. Why you. The before, the turning point, the after.</p>
          </div>
          <div className="bou-pillar">
            <span className="bou-pillar-label">Mannequin 02</span>
            <h5>Compel</h5>
            <p>Social proof. Yours, or your community's. Show what's possible.</p>
          </div>
          <div className="bou-pillar">
            <span className="bou-pillar-label">Mannequin 03</span>
            <h5>Convert</h5>
            <p>The invitation. Ignite Legacy. Your DM keyword. The next step.</p>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">01</div>
            <div>
              <div className="bou-step-title">Mannequin 1 — Connect</div>
              <div className="bou-step-subtitle">Your story. The piece that says "I'm one of you."</div>
            </div>
          </div>
          <p>Mannequin 1 answers: "Why should I trust this brand?" The fastest way to build trust isn't credentials — it's resonance. They have to see themselves in your before-story. Then they have to want what's in your after-story.</p>
          <h4>The before → turning point → after structure:</h4>
          <ul>
            <li>Before: Specific frustration. The 5am alarm. The corporate burnout. The MLM that didn't work. Be detailed enough they see themselves.</li>
            <li>Turning point: The moment something shifted. The friend who handed you a glass of Kangen. The 3am scroll where you found your mentor.</li>
            <li>After: Your life now. Specific. Not "freedom" — but "I work from Bali while my kid naps."</li>
          </ul>
          <div className="bou-example-box">
            <div className="bou-example-label">Hook formulas for Mannequin 1</div>
            "I left my $90k job to sell water. Here's the part nobody tells you."<br />
            "Three years ago I was waiting tables 6 nights a week. Today I work from a beach in Bali."<br />
            "If I have to send one more 'hey friend' DM I will combust."
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">02</div>
            <div>
              <div className="bou-step-title">Mannequin 2 — Compel</div>
              <div className="bou-step-subtitle">Social proof. The piece that says "real people are wearing this."</div>
            </div>
          </div>
          <p>Mannequin 2 answers: "Is this actually possible for me?" They need to see results. Real ones. Specific ones. Numbers, time freedom, lifestyle shifts, health transformations, daily-life wins. Think of this as the lookbook on the front mannequin — proof of how the piece looks on real people.</p>
          <h4>If you have your own results:</h4>
          <ul>
            <li>Lead with the most relatable one (income, time, health, lifestyle)</li>
            <li>Use specific numbers, dates, before-and-afters</li>
            <li>Tell the story behind the result, not just the result</li>
          </ul>
          <h4>If you don't have your own results yet:</h4>
          <div className="bou-proof-highlight">
            <span style={{ color: "var(--gold)" }}>This is the power of community marketing.</span> Every great boutique features pieces worn by other people — that's how a customer pictures themselves in them. Pull from the wider Ignite Legacy community. "Meet Louise." "Maddi's first $10K month." "How Shinarah replaced their income in 90 days." Your audience doesn't care if it's your client — they care that it's real.
          </div>
          <p style={{ marginTop: "16px" }}>
            → Grab assets from{" "}
            <a
              href="https://thetestimonialvault.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bou-tool-chip"
            >
              ✦ The Testimonial Vault →
            </a>
            {" "}— organized by transformation type, with photos and videos you can pull.
          </p>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">03</div>
            <div>
              <div className="bou-step-title">Mannequin 3 — Convert</div>
              <div className="bou-step-subtitle">The invitation. The piece that says "here's how to take it home."</div>
            </div>
          </div>
          <p>Mannequin 3 answers: "What do I do next?" This is where most people either get pushy or get vague. The Ignite Legacy way is neither — it's an invitation. You're not selling a machine. You're inviting them into a community.</p>
          <h4>What Mannequin 3 includes:</h4>
          <ul>
            <li>What Ignite Legacy IS (the $99 entry, the community, the path)</li>
            <li>Who it's FOR (your dream member — be specific)</li>
            <li>The biggest objection — addressed honestly ("MLMs don't work" / "I don't have time" / "I'm not salesy")</li>
            <li>The exact next step — DM keyword, link in bio, or both</li>
          </ul>
          <div className="bou-example-box">
            <div className="bou-example-label">Hook formulas for Mannequin 3</div>
            "If you've been watching me for months and wondering 'how do I actually start' — read this."<br />
            "$99 to start. No quotas. No bro-marketing. Just a beautiful, quiet income stream."<br />
            "Here's exactly what's inside Ignite Legacy — and who it's not for."
          </div>
        </div>

        <div className="bou-action-card">
          <div className="bou-action-label">Your action step</div>
          <h3>Merchandise your three mannequins this week.</h3>
          <p style={{ marginBottom: "24px" }}>Record a 15-min Loom. Use the tool. Get all three pinned posts in your voice. Tweak. Pin.</p>
          <Link
            to="/pinned-posts"
            className="bou-btn-primary"
            style={{ background: "var(--gold-light)", color: "var(--ink)" }}
          >
            ✦ Open the Pinned Posts Generator →
          </Link>
        </div>
      </section>

      <div className="hairline" style={{ maxWidth: "200px", margin: "0 auto" }}></div>

      {/* ─── STORIES ─── */}
      <section id="stories" className="bou-section">
        <div className="bou-section-header">
          <div style={LABEL_STYLE}>Part three</div>
          <h2>the counter.</h2>
          <div className="bou-sec-subhead">stories — where the real selling happens</div>
          <div className="hairline" style={{ width: "80px", margin: "28px auto 0" }}></div>
        </div>

        <div className="bou-metaphor-card">
          <div style={{ ...LABEL_STYLE, marginBottom: "12px" }}>Why the counter matters most</div>
          <p className="bou-quote-text">
            The window stops them. The mannequins make them browse. But the <span className="bou-quote-accent">counter</span> — your stories — is where they actually decide. It's where you make eye contact. Where they see you're real. Where they ask the small question that turns into the sale. <span className="bou-quote-accent">Most sales happen at the counter, not on the rack.</span>
          </p>
        </div>

        <div className="bou-tool-cta">
          <div className="bou-tool-cta-inner">
            <div className="bou-tool-cta-tag">✦ This Section Has A Tool</div>
            <h3>Never wonder "what do I post today" again.</h3>
            <p className="bou-tool-desc">
              The Stories Studio gives you 5 fresh story prompts every day, balanced across the 4 Selling on Stories pillars — Know, Trust, Learn, Work With. Anchored in YOUR real life. Voice-note ready. Authentic, not curated.
            </p>
            <div className="bou-tool-features">
              <span>5 prompts daily</span>
              <span>The 4 pillars</span>
              <span>Anchored in your life</span>
              <span>Raw, not polished</span>
            </div>
            <Link to="/stories-studio" className="bou-tool-button">Open Stories Studio →</Link>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">01</div>
            <div>
              <div className="bou-step-title">Open the boutique daily</div>
              <div className="bou-step-subtitle">Stories are the doors being unlocked. Every day.</div>
            </div>
          </div>
          <p>You don't need 20 stories a day. You need a <span style={{ color: "var(--gold)" }}>rhythm</span>. The boutique that wins isn't the loudest — it's the most consistent. The one whose doors are open at the same hours every day, with someone real behind the counter.</p>
          <h4>The 5-story daily arc:</h4>
          <ul>
            <li>Open the doors: A warm hello, where you are, what you're doing (lifestyle anchor)</li>
            <li>Connect: A thought, a feeling, a real moment from your morning</li>
            <li>Show a piece: One useful thing, one mindset shift, or one win</li>
            <li>Soft sell: A subtle invitation — testimonial, behind-the-scenes, "DM me FREEDOM"</li>
            <li>Engage at the counter: A poll, a question box, a "this or that" — invite them to talk</li>
          </ul>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">02</div>
            <div>
              <div className="bou-step-title">The 4 Selling on Stories pillars</div>
              <div className="bou-step-subtitle">Stop wondering "what do I post." Pull from the framework.</div>
            </div>
          </div>
          <p>Every story you post should fit into one of <span style={{ color: "var(--gold)" }}>four buckets</span>. Not eight. Not twelve. Four. These are the four jobs your stories have to do — and they map cleanly to the buyer journey: know me → trust me → learn from me → work with me.</p>
          <p>Most people get this wrong by living in only one or two of these. They're all "Get to Know Me" lifestyle posts but never invite anyone in. Or they're all "Get to Work With Me" CTAs but no one trusts them yet. You need all four. Daily.</p>
          <div className="bou-story-types">
            <div className="bou-story-type" style={{ borderLeftColor: "#A6789A" }}>
              <span className="bou-story-type-title" style={{ color: "#A6789A" }}>Get to Know Me</span>
              <span>Relatability, likability. "This is who I am, here's how it's relevant to you." Take your audience into your life. Pick 3-5 undeniable parts of your life that reflect your values.</span>
            </div>
            <div className="bou-story-type">
              <span className="bou-story-type-title">Get to Trust Me</span>
              <span>Credibility, follow-through. "I do what I say I do." Documentation content, BTS, work-hard-play-hard. Show them you walk your talk.</span>
            </div>
            <div className="bou-story-type" style={{ borderLeftColor: "#6B7B8B" }}>
              <span className="bou-story-type-title" style={{ color: "#6B7B8B" }}>Get to Learn From Me</span>
              <span>Authority, leadership. "I am someone to look up to." Inspirational, educational, transformational content. Pull a real lesson from your life.</span>
            </div>
            <div className="bou-story-type" style={{ borderLeftColor: "#A67C4E" }}>
              <span className="bou-story-type-title" style={{ color: "#A67C4E" }}>Get to Work With Me</span>
              <span>The selling. "I am someone you can work with." Pain points, desires, launches, CTAs, community wins. Soft invitations, not hard pitches.</span>
            </div>
          </div>
          <div className="bou-aubreys-take">
            <div className="bou-take-label">The pillar most people skip</div>
            <div className="bou-take-text">
              Most Ignite Legacy members get stuck on <span style={{ color: "var(--gold)" }}>Get to Trust Me</span>. They're great at sharing their life (Know Me) and great at teaching (Learn From Me) but they never document themselves actually doing the thing. The work. The follow-through. The "I told you I was going to do this and look — I'm doing it." That's the pillar that turns watchers into buyers.
            </div>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">03</div>
            <div>
              <div className="bou-step-title">Selling at the counter — without being pushy</div>
              <div className="bou-step-subtitle">The 80/20 rule, the soft sell, and the invitation.</div>
            </div>
          </div>
          <p>The hardest part for most Ignite Legacy members is selling without sounding like every other MLM rep. Here's the rule: <span style={{ color: "var(--gold)" }}>80% connection, 20% invitation</span>. Think of the best boutique experience you've ever had — the salesperson didn't pitch you. They made you feel seen. Then, only when it felt right, they said: "would you like to try this on?"</p>
          <h4>The soft-sell formula:</h4>
          <ul>
            <li>Anchor in a real moment: "I'm sitting in my villa in Bali, my kid just woke up, and I'm thinking about..."</li>
            <li>Bridge to the offer: "...the people in my community who are building this exact life right now."</li>
            <li>Make the ask soft: "If you've been curious — DM me FREEDOM and I'll send you the breakdown."</li>
          </ul>
          <div className="bou-good-bad">
            <div className="bou-bad">
              <div className="bou-bad-label">warehouse energy</div>
              "OBSESSED with my Kangen machine!! Best investment ever 🔥💧 DM me to learn more!!! 💕✨🌈"
            </div>
            <div className="bou-good">
              <div className="bou-good-label">boutique energy</div>
              "Three years ago I was scared to even post about this. Today there are 47 people in my community building businesses around it. If you've been quietly watching — there's room for you too. DM me 'FREEDOM.'"
            </div>
          </div>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">04</div>
            <div>
              <div className="bou-step-title">The display cases</div>
              <div className="bou-step-subtitle">Highlights — your permanent merchandise.</div>
            </div>
          </div>
          <p>Stories disappear in 24 hours — but <span style={{ color: "var(--gold)" }}>story highlights</span> are forever. They sit right under your bio. They are the display cases at the front of your boutique — the curated edits someone sees the moment they walk in. Most people treat them like a junk drawer. We're going to treat them like the display cases they are.</p>
          <h4>The 6 display cases every Ignite Legacy member should have:</h4>
          <ul>
            <li>Start Here — your story, your offer, the basics</li>
            <li>Why Kangen — the science, the why, the curiosity</li>
            <li>Wins — testimonials and community proof (rotate weekly)</li>
            <li>Lifestyle — your life, your travel, your freedom</li>
            <li>Q&A — answered questions you've gotten in DMs</li>
            <li>Join Us — Ignite Legacy invitation, link, what's inside</li>
          </ul>
        </div>

        <div className="bou-step">
          <div className="bou-step-header">
            <div className="bou-step-number">05</div>
            <div>
              <div className="bou-step-title">The conversation that closes</div>
              <div className="bou-step-subtitle">The DM follow-up flow — where stories actually convert.</div>
            </div>
          </div>
          <p>Every story is a chance to start a conversation at the counter. Every conversation is a chance to build a real relationship. <span style={{ color: "var(--gold)" }}>Sales happen in the DMs.</span> Not in the comments. Not in the captions. In the DMs — the equivalent of leaning across the counter and asking, "what brought you in today?"</p>
          <h4>The 4-step DM flow when someone replies "FREEDOM":</h4>
          <ul>
            <li>Voice note hello. Warm. Personal. Use their name. 30 seconds max.</li>
            <li>Send the resource. Whatever you promised — guide, link, video.</li>
            <li>Ask one curiosity question. "What made you curious about this?"</li>
            <li>Listen and invite. Based on their answer, invite them to the next step (Ignite Legacy, a call, a deeper resource).</li>
          </ul>
          <p style={{ color: "var(--muted)", marginTop: "16px" }}>
            Never copy-paste. Never pitch on the first message. The relationship is the asset.
          </p>
        </div>

        <div className="bou-action-card">
          <div className="bou-action-label">Your action step</div>
          <h3>Open the boutique every day this week.</h3>
          <p style={{ marginBottom: "24px" }}>Five stories a day, one across each pillar plus a personal one. Don't curate. Voice-note it. Show up real.</p>
          <Link
            to="/stories-studio"
            className="bou-btn-primary"
            style={{ background: "var(--gold-light)", color: "var(--ink)" }}
          >
            ✦ Open Stories Studio →
          </Link>
        </div>
      </section>

      {/* ─── TOOLS HUB ─── */}
      <section id="tools" className="bou-hub-section">
        <div className="bou-hub-inner">
          <div className="bou-section-header">
            <div style={LABEL_STYLE}>✦ The Toolbox</div>
            <h2>tools to actually do this.</h2>
            <div className="bou-sec-subhead">stop reading about it. start building it.</div>
            <div className="hairline" style={{ width: "80px", margin: "28px auto 0" }}></div>
          </div>
          <p style={{ textAlign: "center", maxWidth: "640px", margin: "0 auto 12px", color: "var(--muted)", fontSize: "16px", lineHeight: 1.7, fontFamily: "'Inter', sans-serif" }}>
            Reading is one thing. Building is another. The toolbox turns this entire training into something you can actually use — interactive tools that take your inputs and give you ready-to-use Instagram content in your voice.
          </p>

          <div className="bou-tool-grid">
            <div className="bou-tool-card">
              <div className="bou-tool-card-status">Live now</div>
              <div className="bou-tool-icon">✦</div>
              <h4>Bio Generator</h4>
              <p>Five Instagram bio variations, each in a different style — transformation-led, contrarian, lifestyle, credibility, content-tease. Pick the one that lands for your audience.</p>
              <Link to="/bio-generator" className="bou-card-link">Open Tool →</Link>
            </div>

            <div className="bou-tool-card">
              <div className="bou-tool-card-status">Live now</div>
              <div className="bou-tool-icon">✦</div>
              <h4>Pinned Posts Generator</h4>
              <p>Three Instagram pinned posts in your voice. Connect, Compel, Convert. Generated from a Loom transcript. Includes carousel slides, hooks, and Vault-pull guidance.</p>
              <Link to="/pinned-posts" className="bou-card-link">Open Tool →</Link>
            </div>

            <div className="bou-tool-card">
              <div className="bou-tool-card-status">Live now</div>
              <div className="bou-tool-icon">✦</div>
              <h4>Stories Studio</h4>
              <p>Five fresh story prompts every day — balanced across the 4 Selling on Stories pillars (Know, Trust, Learn, Work With). Anchored in your real life. Voice-note ready.</p>
              <Link to="/stories-studio" className="bou-card-link">Open Tool →</Link>
            </div>

            <div className="bou-tool-card">
              <div className="bou-tool-card-status">Live now</div>
              <div className="bou-tool-icon">✦</div>
              <h4>The Testimonial Vault</h4>
              <p>Community proof you can pull from. Photos, videos, written testimonials — organized by transformation type. The power of community marketing made easy.</p>
              <a
                href="https://thetestimonialvault.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bou-card-link"
              >
                Open Vault →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLOSING ─── */}
      <div className="bou-closing">
        <h2>your instagram is a boutique,<br />not a warehouse.</h2>
        <p>The window. The mannequins. The counter.</p>
        <p>Three elements. Build them beautifully and watch what happens.</p>
        <p>You have the training. You have the tools. The only thing left is to open the boutique.</p>
      </div>

      {/* Floating tools button */}
      <a href="#tools" className="bou-floating">✦ Open the Tools</a>
    </div>
  );
}
