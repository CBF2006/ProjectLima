import db from "@/db/drizzle";
import { eq, and, InferSelectModel } from "drizzle-orm";
import { DailyActivity, userStreaks } from "@/db/schema";

// Infer types from schema
type DailyActivityType = InferSelectModel<typeof DailyActivity>;
type UserStreakType = InferSelectModel<typeof userStreaks>;

export const updateStreak = async (userId: string, type: "lesson" | "practice") => {
  const today = new Date();
  const todayStr = new Date(today.toDateString()); // YYYY-MM-DD

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = new Date(yesterday.toDateString()); // YYYY-MM-DD

  // Fetch user's activity for today
  const [activity]: DailyActivityType[] = await db
    .select()
    .from(DailyActivity)
    .where(
      and(eq(DailyActivity.userId, userId), eq(DailyActivity.date, todayStr)),  
    );

  // If no activity exists yet, insert one
  if (!activity) {
    await db.insert(DailyActivity).values({
      userId,
      date: todayStr,
      lessonCompleted: type === "lesson",
      practiceCompleted: type === "practice",
    });
  } else {
    // Otherwise, update existing record, preserving any previously completed status
    await db
      .update(DailyActivity)
      .set({
        lessonCompleted: activity.lessonCompleted || type === "lesson",
        practiceCompleted: activity.practiceCompleted || type === "practice",
      })
      .where(eq(DailyActivity.id, activity.id));
  }

  // Get current streak info
  const [streak]: UserStreakType[] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId));

  if (!streak) return;

  const lastUpdatedStr = new Date(streak.lastUpdated.toDateString()); // YYYY-MM-DD
  if (lastUpdatedStr.getTime() === todayStr.getTime()) return; // Already updated today

  let currentStreak = 1;
  let longestStreak = Math.max(streak.currentStreak, streak.longestStreak);

  if (lastUpdatedStr.getTime() === yesterdayStr.getTime()) {
    // If last update was yesterday, increment streak
    currentStreak = streak.currentStreak + 1;
    longestStreak = Math.max(currentStreak, longestStreak);
  } else if (streak.freezesAvailable > 0) {
    // Use a freeze to preserve the streak
    currentStreak = streak.currentStreak;

    await db
      .update(userStreaks)
      .set({
        freezesAvailable: streak.freezesAvailable - 1,
      })
      .where(eq(userStreaks.userId, userId));
  }

  // Update streak values
  await db
    .update(userStreaks)
    .set({
      currentStreak,
      longestStreak,
      lastUpdated: today,
    })
    .where(eq(userStreaks.userId, userId));
};