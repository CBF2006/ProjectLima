"use server";

import { logDailyActivity } from "@/lib/streak/logDailyActivity";

export const updateLessonStreak = async (userId: string) => {
    try {
        await logDailyActivity(userId, "lesson")
    } catch (error) {
        console.error("Failed to update streak:", error);
    }
};