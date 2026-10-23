import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { startNewChat } from "@/feature/home/actions/start-new-chat";
import { WispLanding } from "@/feature/home/components/wisp-landing";

export default async function Page() {
  const session = await auth();
  if (session.userId) {
    const conversationId = await startNewChat();
    redirect(`/c/${conversationId}`);
  }
  return <WispLanding />;
}
