"use server"
import { revalidatePath } from "next/cache";
import { requireUser } from "@/feature/auth/action/require-user";
import { prisma } from "@/lib/db";
import type { MessageRole } from "@/lib/generated/prisma/client";

export type MessageItem = {
    id:string;
    conversationId: string;
    role:MessageRole;
    status:"PENDING"|"COMPLETE"|"ERROR";
    content:string;
    createdAt: Date;
    updatedAt: Date;
}

async function assertOwnsConversation(conversationId: string, userId: string) {
    const conversation = await prisma.conversation.findFirst({
        where: { id: conversationId, userId },
    });

    if (!conversation) {
        throw new Error("Conversation not found");
    }

    return conversation;
}

async function getConversation(conversationId:string){
    const user = requireUser();
    
}

