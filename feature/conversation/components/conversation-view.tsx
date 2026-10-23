"use client";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useQueryClient } from "@tanstack/react-query";
import { DefaultChatTransport, type UIMessage } from "ai";
import { useChat } from "@ai-sdk/react";
import React, { useMemo } from "react";
import { useConversations } from "../hooks/use-conversation";
import { queryKeys } from "../utils/query-keys";
import { toast } from "sonner";
import { ChatEmpty } from "./chat-empty";
import { ChatMessages } from "./chat-messages";
import { ChatComposer } from "./chat-composer";
import { WispMark } from "@/components/wisp-mark";

type ConversationViewProps = {
  conversationId: string;
  initialMessages: UIMessage[];
};

export const ConversationView = ({
  conversationId,
  initialMessages,
}: ConversationViewProps) => {
  const queryClient = useQueryClient();
  const { data: conversations } = useConversations();

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        prepareSendMessagesRequest: ({ id, messages }) => ({
          body: {
            id,
            message: messages.at(-1),
          },
        }),
      }),
    []
  );

  const { messages, sendMessage, status, stop } = useChat({
    id: conversationId,
    messages: initialMessages,
    transport,
    onFinish: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.conversations.all,
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const title =
    conversations?.find((item) => item.id === conversationId)?.title ?? "Chat";

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b border-border/60 px-4 md:px-6">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <h1 className="truncate text-sm font-medium">{title}</h1>
        <span className="ml-auto flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground"><WispMark className="size-5 text-primary" /> Wisp <span className="hidden sm:inline">/ Mistral</span></span>
      </header>

      {messages.length === 0 ? (
        <ChatEmpty onSuggestion={(text) => { void sendMessage({ text }); }} />
      ) : (
        <ChatMessages messages={messages} status={status} />
      )}

      <ChatComposer
        onSend={(text) => {
          void sendMessage({ text });
        }}
        isSending={status === "submitted" || status === "streaming"}
        onStop={() => { void stop(); }}
        autoFocus
      />
    </div>
  );
};
