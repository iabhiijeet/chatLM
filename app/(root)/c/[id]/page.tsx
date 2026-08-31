import { loadChatMessages } from "@/features/ai/actions/chat-store";
import { getConversation } from "@/feature/conversation/action/converstion-action";
import { ConversationView } from "@/feature/conversation/components/conversation-view";
import { notFound } from "next/navigation";
import React from "react";

type ConversationPageProps = {
  params: Promise<{ id: string }>;
};

const page = async ({ params }: ConversationPageProps) => {
  const { id } = await params;

  try {
    await getConversation(id);
  } catch {
    notFound();
  }

  const initialMessages = await loadChatMessages(id);

  return (
    <ConversationView key={id} conversationId={id} initialMessages={initialMessages} />
  );
};

export default page;