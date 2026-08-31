# ChatLM 🤖

An AI-powered chat application built with **Next.js**, **Vercel AI SDK**, and **Mistral AI**. Chat with a smart assistant that streams responses in real time, remembers your conversations, and keeps everything private per-account.

---

## ✨ Features

- **💬 Streaming AI chat** — real-time responses powered by Mistral (via Vercel AI SDK)
- **🔐 Authentication** — secure sign-in/sign-out with Clerk
- **🗂️ Persistent conversations** — chats saved to PostgreSQL (Prisma), reload anytime
- **📝 Rich markdown rendering** — code syntax highlighting, LaTeX math, Mermaid diagrams, CJK text
- **📌 Conversation management** — create, rename, pin, delete chats from the sidebar
- **🪟 Collapsible sidebar** — icon-mode, dark/light/system theme toggle, logout button
- **🎨 Modern landing page** — hero section with "Login to Try" CTA
- **📤 Export conversations** — download any chat as a Markdown file
- **📱 Responsive UI** — shadcn/ui design system, works on mobile

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **AI** | Vercel AI SDK (`ai`), Mistral (`@ai-sdk/mistral`) |
| **Markdown** | Streamdown (+ code, math, mermaid, CJK plugins) |
| **Auth** | Clerk (`@clerk/nextjs`) |
| **Database** | PostgreSQL via Prisma (`@prisma/client`, `@prisma/adapter-pg`) |
| **State** | TanStack React Query |
| **Styling** | Tailwind CSS v4, shadcn/ui |
| **Icons** | Lucide React |
| **Toasts** | Sonner |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- A [Clerk](https://clerk.com) account
- A [Mistral AI](https://console.mistral.ai) API key
- A PostgreSQL database (e.g. [Neon](https://neon.tech))

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (or edit the existing one):

```env
DATABASE_URL="postgresql://<user>:<password>@<host>/<db>?sslmode=require"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/

MISTRAL_API_KEY=your-mistral-api-key
```

> Replace the `...` with your actual Clerk and Mistral keys.

### 3. Set up the database

```bash
npx prisma migrate dev
```

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🛠️ Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

---

## 🗂️ Project Structure

```
app/
  (auth)/sign-in/        → Clerk sign-in page
  (root)/page.tsx        → Landing page / new-chat redirect
  (root)/c/[id]/page.tsx → Conversation view
  api/chat/route.ts      → AI streaming endpoint
feature/
  ai/                    → AI model config + chat store (load/save)
  auth/                  → Clerk onboarding + require-user helpers
  conversation/          → sidebar, chat view, composer, actions, hooks
  home/                  → new-chat action
  message/               → message CRUD actions + hooks
components/
  ai-elements/           → chat container, message bubbles, loader, markdown
  providers/             → Query, Theme providers
  ui/                    → shadcn/ui components
lib/
  db.ts                  → Prisma client singleton
  generated/prisma/      → Generated Prisma client
prisma/
  schema.prisma          → User, Conversation, Message models
```

---

## 🗄️ Database Models

- **User** — Clerk-linked account (UUID, clerkId, email, name, image)
- **Conversation** — belongs to a User (title, model override, system prompt, pinned/archived, lastMessageAt)
- **Message** — belongs to a Conversation (role: USER/ASSISTANT/SYSTEM/TOOL, status, content, JSON parts)

---

## 🤝 Ownership & Security

- All routes except landing page & sign-in are protected by Clerk middleware.
- Every conversation/message operation verifies the requesting user **owns** the resource.
- `requireUser()` ensures the authenticated user exists in the local DB before any query.
- Each account's chat history is fully isolated.

---

## 📄 License

This project is for learning/demo purposes.
