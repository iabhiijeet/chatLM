"use client";

import * as React from "react";
import { ArrowUpIcon, SquareIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

type ChatComposerProps = {
  onSend: (content: string) => Promise<void> | void;
  isSending?: boolean;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onStop?: () => void;
};

export function ChatComposer({
  onSend,
  isSending = false,
  placeholder = "Ask a question. Follow a thought…",
  className,
  autoFocus = false,
  onStop,
}: ChatComposerProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (autoFocus) {
      textareaRef.current?.focus();
    }
  }, [autoFocus]);

  async function handleSubmit(event?: React.FormEvent) {
    event?.preventDefault();
    const content = value.trim();
    if (!content || isSending) return;

    setValue("");
    await onSend(content);
    textareaRef.current?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  const canSend = value.trim().length > 0 && !isSending;

  return (
    <form
      onSubmit={(event) => void handleSubmit(event)}
      className={cn("mx-auto w-full max-w-3xl px-4 pb-4 md:px-6", className)}
    >
      <InputGroup className="wisp-composer h-auto min-h-20 rounded-2xl border-border bg-card shadow-sm">
        <InputGroupTextarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label="Message Wisp"
          disabled={isSending}
          rows={1}
          className="max-h-48 min-h-20 py-5 pl-5 text-[15px] leading-relaxed"
        />
        <InputGroupAddon align="inline-end" className="pr-2 pb-2 self-end">
          <InputGroupButton
            type={isSending ? "button" : "submit"}
            onClick={isSending ? onStop : undefined}
            size="icon-sm"
            variant="default"
            disabled={isSending ? !onStop : !canSend}
            className="size-9 rounded-full"
            aria-label={isSending ? "Stop response" : "Send message"}
          >
            {isSending ? <SquareIcon className="size-3 fill-current" /> : <ArrowUpIcon />}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
      <p className="mt-3 text-center text-[11px] text-muted-foreground">
        Wisp can make mistakes. A second look is always a good idea.
      </p>
    </form>
  );
}
