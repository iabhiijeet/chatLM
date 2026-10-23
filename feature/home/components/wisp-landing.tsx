"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowDown, ArrowRight, ArrowUp, Check, Code2, Feather, Lightbulb, Plus, Wind } from "lucide-react";
import { WispMark } from "@/components/wisp-mark";

const examples = [
  { label: "Find the words", icon: Feather, prompt: "Help me turn a little idea into something worth reading.", heading: "Every good story starts with a small spark.", reply: "Let's find yours. Tell me the idea that's been on your mind, even if it's just a few words. We can shape the first sentence together, then see where it takes us.", note: "A rough thought is a perfectly good place to start." },
  { label: "Untangle an idea", icon: Lightbulb, prompt: "Explain a complicated idea in a way that finally clicks.", heading: "Let's make room for that aha moment.", reply: "Pick a concept you've been circling around. I'll break it into smaller pieces, connect it to something familiar, and work through an example with you.", note: "No question is too small. No jargon required." },
  { label: "Build something", icon: Code2, prompt: "I have an idea for a side project. Where do I start?", heading: "Start small. Make something that works.", reply: "What's the one thing you want your project to do? Let's sketch the simplest version, choose the right tools, and turn that blank file into a first step.", note: "A little momentum goes a long way." },
];

export function WispLanding() {
  const [active, setActive] = useState(0);
  const example = examples[active];
  return (
    <div className="wisp-landing">
      <header className="landing-nav">
        <Link href="/" aria-label="Wisp home" className="wordmark"><WispMark /><span>wisp</span></Link>
        <nav aria-label="Main navigation" className="flex items-center gap-6 sm:gap-9">
          <a href="#possibilities" className="nav-text hidden sm:block">A little inspiration</a>
          <Link href="/sign-in" className="nav-text">Log in <ArrowRight className="size-3.5" /></Link>
        </nav>
      </header>
      <main>
        <section className="landing-hero">
          <div className="hero-copy wisp-enter">
            <p className="eyebrow"><span className="status-dot" /> A little clarity. A lot of possibility.</p>
            <h1>Big ideas.<br />Small sparks.<br /><em>A little Wisp.</em></h1>
            <p className="hero-description">A quiet space for your busy mind. Write, wonder, and work things out with an AI that keeps the conversation going.</p>
            <Link href="/sign-in" className="wisp-cta">Let’s see where it goes <ArrowRight className="size-4" /></Link>
            <p className="hero-footnote">Bring your curiosity. We’ll take it from there.</p>
          </div>
          <div className="hero-art wisp-enter" style={{ animationDelay: "120ms" }}>
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <span className="art-caption"><Wind className="size-4" /> room to think</span>
            <div className="demo-window">
              <div className="demo-top"><span className="flex items-center gap-1.5"><WispMark className="size-6" /><strong>wisp</strong></span><span className="demo-tag">A glimpse inside</span></div>
              <div key={active} className="demo-conversation wisp-enter" aria-live="polite">
                <div className="demo-user">{example.prompt}</div>
                <div className="demo-answer"><WispMark className="size-7 shrink-0 text-primary" /><div><h2>{example.heading}</h2><p>{example.reply}</p><p className="demo-note">{example.note}</p></div></div>
              </div>
              <Link href="/sign-in" className="demo-input"><Plus className="size-4" /><span>What’s on your mind?</span><span className="demo-send"><ArrowUp className="size-4" /></span></Link>
            </div>
            <div className="handwritten">a thought, with somewhere to go <span>↗</span></div>
          </div>
        </section>
        <section id="possibilities" className="possibilities">
          <div className="possibility-heading"><p className="eyebrow">THERE’S NO WRONG PLACE TO START</p><h2>Follow a little curiosity.</h2><p>Try a thought below. See where Wisp can take it.</p></div>
          <div className="example-options" aria-label="Explore conversation examples">
            {examples.map(({ label, icon: Icon }, index) => <button key={label} type="button" aria-pressed={active === index} className={`example-option ${active === index ? "is-selected" : ""}`} onClick={() => setActive(index)}><Icon className="size-4" /><span>{label}</span>{active === index ? <Check className="size-4 ml-auto" /> : <ArrowRight className="size-4 ml-auto" />}</button>)}
          </div>
          <div className="landing-details"><span><Check /> Replies that flow in real time</span><span><Check /> Conversations you can come back to</span><span><Check /> A space of your own</span></div>
        </section>
      </main>
      <footer className="landing-footer"><Link href="/" className="wordmark"><WispMark className="size-6" /><span>wisp</span></Link><span>A little more space for your mind.</span><a href="#possibilities" aria-label="Explore Wisp"><ArrowDown className="size-4" /></a></footer>
    </div>
  );
}
