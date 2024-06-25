import { auth } from "@clerk/nextjs/server";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

// Parse admin IDs from environment variable
const adminIds = process.env.ADMIN_IDS?.split(',') || [];

export const getIsAdmin = async () => {
    const { userId } = await auth();

    if (!userId) {
        return false;
    }

    return adminIds.includes(userId);
};


// Add a comma with no space between every subsequent admin in .env