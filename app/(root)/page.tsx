import Link from "next/link";
import Image from "next/image";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { MessageSquare, Sparkles, Zap, Shield } from "lucide-react";
import { startNewChat } from "@/feature/home/actions/start-new-chat";

const page = async () => {
  const session = await auth();

  if (session.userId) {
    const conversationId = await startNewChat();
    redirect(`/c/${conversationId}`);
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <header className="flex items-center justify-between border-b px-6 py-4">
        <div className="flex items-center gap-2">
          <Image
            src="/favicon.svg"
            alt="Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-lg font-semibold">ChatLM</span>
        </div>
        <Link
          href="/sign-in"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login to Try
        </Link>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24 pt-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="size-3.5" />
            Powered by Mistral AI
          </div>

          <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Your AI Assistant,
            <br />
            <span className="text-primary">Reimagined</span>
          </h1>

          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Chat with an intelligent AI that remembers your conversations.
            Ask questions, get creative, brainstorm ideas — all in real time.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
            >
              <MessageSquare className="size-5" />
              Login to Try
            </Link>
            <Link
              href="/sign-in"
              className="inline-flex items-center gap-2 rounded-full border px-8 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              Create Account
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-24 grid max-w-4xl gap-6 sm:grid-cols-3">
          <FeatureCard
            icon={<Zap className="size-5" />}
            title="Instant Responses"
            description="Get streaming AI replies in real time — no waiting around."
          />
          <FeatureCard
            icon={<MessageSquare className="size-5" />}
            title="Persistent Chats"
            description="Your conversations are saved and accessible from anywhere."
          />
          <FeatureCard
            icon={<Shield className="size-5" />}
            title="Private & Secure"
            description="Each account has its own isolated chat history."
          />
        </div>
      </main>

      <footer className="border-t px-6 py-4 text-center text-xs text-muted-foreground">
        Built with Next.js, Vercel AI SDK &amp; Mistral
      </footer>
    </div>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border bg-card p-6 text-left shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
        {icon}
      </div>
      <h3 className="mb-1.5 font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

export default page;
