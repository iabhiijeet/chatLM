"use client";

import { ArrowUpRight, Code2, Feather, Lightbulb } from "lucide-react";
import { WispMark } from "@/components/wisp-mark";

const starters = [
  { icon: Feather, title: "Find the words", text: "Help me write a thoughtful message to someone I appreciate." },
  { icon: Lightbulb, title: "Explore an idea", text: "Give me a surprising idea to learn about, and explain it simply." },
  { icon: Code2, title: "Make something", text: "Help me brainstorm a small coding project I can build this weekend." },
];

export function ChatEmpty({ onSuggestion }: { onSuggestion: (text: string) => void }) {
  return (
    <div className="chat-empty wisp-enter">
      <div className="empty-mark"><WispMark className="size-12" /></div>
      <p className="eyebrow">A LITTLE SPACE TO THINK</p>
      <h2>What’s on your mind?</h2>
      <p>A big question, a small idea, or something in between.<br className="hidden sm:block" /> Let’s work it out together.</p>
      <div className="starter-grid">
        {starters.map(({ icon: Icon, title, text }) => <button type="button" key={title} onClick={() => onSuggestion(text)} className="starter-card"><Icon className="size-4 text-primary" /><span>{title}</span><ArrowUpRight className="size-3.5 text-muted-foreground" /></button>)}
      </div>
    </div>
  );
}
