import { clerkClient } from "@clerk/nextjs/server";

export async function getUser(userId: string) {
    try {
        const user = await clerkClient.users.getUser(userId);
        return user;
    } catch (error) {
        return null;
    }
}