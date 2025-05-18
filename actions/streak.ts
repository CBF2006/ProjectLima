"use server";

import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

import db from "@/db/drizzle";
import { userProgress, userStreaks } from "@/db/schema";
import { logDailyActivity } from "@/lib/streak/logDailyActivity";

const STREAK_FREEZE_COST = 300;

export const updateLessonStreak = async (userId: string) => {
  try {
    await logDailyActivity(userId, "lesson");
  } catch (error) {
    console.error("Failed to update streak:", error);
  }
};

export const buyStreakFreeze = async () => {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const [progress] = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  if (!progress || progress.points < STREAK_FREEZE_COST) {
    throw new Error("Not enough points");
  }

  const [streak] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId));

  if (!streak) {
    throw new Error("Streak record not found");
  }

  await db
    .update(userProgress)
    .set({
      points: progress.points - STREAK_FREEZE_COST,
    })
    .where(eq(userProgress.userId, userId));

  await db
    .update(userStreaks)
    .set({
      freezesAvailable: streak.freezesAvailable + 1,
    })
    .where(eq(userStreaks.userId, userId));
};