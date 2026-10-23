"use client";

import { isTextUIPart, type UIMessage } from "ai";
import type { ChatStatus } from "ai";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import { Loader } from "@/components/ai-elements/loader";
import { WispMark } from "@/components/wisp-mark";

function getMessageText(message: UIMessage) {
  return message.parts
    .filter(isTextUIPart)
    .map((part) => part.text)
    .join("");
}

type ChatMessagesProps = {
  messages: UIMessage[];
  status: ChatStatus;
};

export function ChatMessages({ messages, status }: ChatMessagesProps) {
  const isWaiting =
    status === "submitted" && messages.at(-1)?.role === "user";

  return (
    <Conversation>
      <ConversationContent className="mx-auto w-full max-w-3xl px-5 py-8 md:px-6">
        {messages.map((message) => (
          <Message key={message.id} from={message.role} className="wisp-enter">
            {message.role === "assistant" && <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"><WispMark className="size-6 text-primary" /> Wisp</div>}
            <MessageContent>
              <MessageResponse isAnimating={message.role === "assistant" && status === "streaming" && message.id === messages.at(-1)?.id}>{getMessageText(message)}</MessageResponse>
            </MessageContent>
          </Message>
        ))}

        {isWaiting ? (
          <Message from="assistant">
            <MessageContent>
              <Loader />
            </MessageContent>
          </Message>
        ) : null}
      </ConversationContent>
      <ConversationScrollButton aria-label="Scroll to latest message" />
    </Conversation>
  );
}
