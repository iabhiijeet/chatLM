import { onBoard } from "@/feature/auth/action/onboard";
import ChatShell from "@/feature/conversation/components/chat-shell";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const RootGrouplayout = async ({ children }: { children: React.ReactNode }) => {
  let isSignedIn = false;

  try {
    const session = await auth();
    isSignedIn = !!session.userId;
    if (isSignedIn) {
      await onBoard();
    }
  } catch {
    isSignedIn = false;
  }

  if (!isSignedIn) {
    return <>{children}</>;
  }

  return <ChatShell>{children}</ChatShell>;
};

export default RootGrouplayout;
