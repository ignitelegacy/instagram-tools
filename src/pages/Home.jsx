import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Pin, User, Sparkles, Lock, BookOpen } from "lucide-react";

export default function Home() {
  const tools = [
    {
      title: "Bio Generator",
      description: "Five Instagram bio variations, each in a different style. Pick the one that lands.",
      path: "/bio-generator",
      icon: User,
      status: "live",
    },
    {
      title: "Pinned Posts Generator",
      description: "Three Instagram pinned posts in your voice, generated from a Loom transcript.",
      path: "/pinned-posts",
      icon: Pin,
      status: "live",
    },
    {
      title: "Stories Studio",
      description: "Five fresh story prompts every day, balanced across the 4 Selling on Stories pillars.",
      path: "/stories-studio",
      icon: Sparkles,
      status: "live",
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--cream)" }}>
      <style>{`
        .tool-card {
          background: var(--cream-light);
          border: 1px solid var(--line);
          transition: all 0.3s ease;
        }
        .tool-card:hover {
          border-color: var(--gold);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(44, 36, 24, 0.08);
        }
        .tool-card.locked { opacity: 0.6; cursor: not-allowed; }
        .tool-card.locked:hover { transform: none; box-shadow: none; border-color: var(--line); }
        .hero-card {
          background: var(--ink);
          color: var(--cream);
          border-radius: 4px;
          padding: 56px 48px;
          margin-bottom: 48px;
          position: relative;
          overflow: hidden;
          text-decoration: none;
          display: block;
          transition: all 0.3s ease;
        }
        .hero-card:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(44, 36, 24, 0.18); }
        .hero-card::after {
          content: '';
          position: absolute;
          top: -50%; right: -50%;
          width: 100%; height: 200%;
          background: radial-gradient(ellipse, rgba(184, 149, 106, 0.18), transparent 70%);
          pointer-events: none;
        }
      `}</style>

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-12 text-center fade-in">
        <div className="sans text-xs tracking-[0.3em] mb-6" style={{ color: "var(--gold)" }}>
          IGNITE LEGACY
        </div>
        <h1 className="title text-6xl md:text-7xl mb-6" style={{ color: "var(--ink)" }}>
          the toolbox
        </h1>
        <div className="gold-line w-32 mx-auto mb-6"></div>
        <p className="sans text-base max-w-2xl mx-auto" style={{ color: "var(--muted)", lineHeight: 1.7 }}>
          A growing suite of trainings and tools to help you build a beautiful, magnetic Instagram — designed for the Ignite Legacy community.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-6 pb-24">
        <Link to="/boutique" className="hero-card">
          <div className="flex items-start justify-between mb-6 relative" style={{ zIndex: 1 }}>
            <BookOpen className="w-7 h-7" strokeWidth={1.5} style={{ color: "var(--gold-light)" }} />
            <div className="sans text-xs tracking-[0.3em] uppercase" style={{ color: "var(--gold-light)" }}>
              start here
            </div>
          </div>
          <div className="relative" style={{ zIndex: 1 }}>
            <div className="sans text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--gold-light)" }}>
              the training
            </div>
            <h2 className="title text-5xl md:text-6xl mb-4" style={{ color: "var(--cream)" }}>
              the boutique.
            </h2>
            <p className="sans text-base mb-6 max-w-2xl" style={{ color: "rgba(245, 239, 230, 0.85)", lineHeight: 1.7 }}>
              Your Instagram is a boutique on a quiet luxury street, not a fluorescent warehouse. The full training on building a magnetic IG — your bio, your pinned posts, your stories. With tools embedded throughout so you can build as you learn.
            </p>
            <div className="flex items-center gap-2 sans text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold-light)" }}>
              enter the training <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        <div className="mb-6 mt-16 text-center">
          <div className="sans text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "var(--gold)" }}>
            quick access
          </div>
          <h3 className="title text-3xl" style={{ color: "var(--ink)" }}>
            individual tools
          </h3>
          <p className="sans text-sm mt-2" style={{ color: "var(--muted)" }}>
            Already done the training? Jump straight to the tool you need.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            const isLocked = tool.status === "coming-soon";
            const cardContent = (
              <div className={`tool-card rounded-sm p-8 h-full ${isLocked ? "locked" : ""}`}>
                <div className="flex items-start justify-between mb-6">
                  <Icon className="w-6 h-6" strokeWidth={1.5} style={{ color: "var(--gold)" }} />
                  {isLocked ? (
                    <div className="flex items-center gap-2 sans text-xs tracking-[0.2em] uppercase" style={{ color: "var(--gold-light)" }}>
                      <Lock className="w-3 h-3" /> soon
                    </div>
                  ) : (
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} style={{ color: "var(--gold)" }} />
                  )}
                </div>
                <h3 className="title text-2xl mb-2" style={{ color: "var(--ink)" }}>{tool.title}</h3>
                <p className="sans text-sm" style={{ color: "var(--muted)", lineHeight: 1.6 }}>{tool.description}</p>
              </div>
            );
            return isLocked ? (
              <div key={idx}>{cardContent}</div>
            ) : (
              <Link key={idx} to={tool.path} style={{ textDecoration: "none" }}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-20 pt-12" style={{ borderTop: "1px solid var(--line)" }}>
          <p className="serif text-lg" style={{ color: "var(--gold)" }}>
            "Your story is the bridge."
          </p>
        </div>
      </div>
    </div>
  );
}
