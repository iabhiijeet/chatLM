"use server";
import {prisma} from "@/lib/db";
import {requireUser} from "@/feature/auth/action/require-user";
import { revalidatePath } from "next/cache";


export type ConversationListItem = {
    id: string;
    title: string;
    isPinned: boolean;
    isArchived: boolean;
    lastMessageAt: Date;
    createdAt: Date;
    updatedAt: Date;
};


async function assertOwnConversation(conversationId:string, userId:string){
    const conversation = await prisma.conversation.findUnique({
        where:{
            id: conversationId,
            userId
        }   
    })
    if(!conversation){
        throw new Error("Conversation not found or you do not have permission to access it.")
    }

    return conversation;
}

export async function getConversation(conversationId:string){
    const user = await requireUser();
    return await assertOwnConversation(conversationId, user.id);
}

export async function listConversations(){
    const user = await requireUser();
    return await prisma.conversation.findMany({
        where:{
            userId:user.id, isArchived:false 
        },
        orderBy:[
            {isPinned:"desc"},
            {lastMessageAt:"desc"}
        ],
        select:{
            id:true,
            title:true,
            isPinned:true,
            isArchived:true,
            lastMessageAt:true,
            createdAt:true,
            updatedAt:true
        }
    })
}

export async function createConversation(title="New Chat"){
    const user = await requireUser();

    return prisma.conversation.create({
        data:{
            userId:user.id,
            title: title.trim()||"New Chat",
        }
    })
}


export async function updateConversation(conversationId:string,
    data:{title?:string, isPinned?:boolean, isArchived?:boolean}
)
{
    const user = await requireUser();
    await assertOwnConversation(conversationId, user.id);

    const conversation = prisma.conversation.update({
        where:{
            id: conversationId
        },
        data:{
            ...(data.title!==undefined?{title:data.title.trim()||"New Chat"}:{}),
            ...(data.isPinned!==undefined?{isPinned:data.isPinned}:{}),
            ...(data.isArchived!==undefined?{isArchived:data.isArchived}:{})

        }
    })
    revalidatePath("/");
    revalidatePath(`/c/${conversationId}`);
    return conversation;
}

export async function deleteConversation(conversationId:string){
    const user = await requireUser();
    await assertOwnConversation(conversationId, user.id);

    await prisma.conversation.delete({
        where:{id:conversationId}
    })
    revalidatePath("/");
    return {id:conversationId}

}
