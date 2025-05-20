import db from "@/db/drizzle";
import { eq, and, InferSelectModel } from "drizzle-orm";
import { DailyActivity, userStreaks } from "@/db/schema";

// Infer types from schema
type DailyActivityType = InferSelectModel<typeof DailyActivity>;
type UserStreakType = InferSelectModel<typeof userStreaks>;

function toUTCDate(date: Date) {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

export const updateStreak = async (userId: string, type: "lesson" | "practice") => {
  const today = toUTCDate(new Date());
  const yesterday = toUTCDate(new Date(Date.now() - 86400000));

  const [activity]: DailyActivityType[] = await db
    .select()
    .from(DailyActivity)
    .where(and(eq(DailyActivity.userId, userId), eq(DailyActivity.date, today)));

  if (!activity) {
    await db.insert(DailyActivity).values({
      userId,
      date: today,
      lessonCompleted: type === "lesson",
      practiceCompleted: type === "practice",
    });
  } else {
    await db.update(DailyActivity).set({
      lessonCompleted: activity.lessonCompleted || type === "lesson",
      practiceCompleted: activity.practiceCompleted || type === "practice",
    }).where(eq(DailyActivity.id, activity.id));
  }

  const [updatedActivity]: DailyActivityType[] = await db
    .select()
    .from(DailyActivity)
    .where(and(eq(DailyActivity.userId, userId), eq(DailyActivity.date, today)));

  if (!updatedActivity?.lessonCompleted && !updatedActivity?.practiceCompleted) {
    console.log("[STREAK] No activity today, skipping update.");
    return;
  }

  const [streak]: UserStreakType[] = await db
    .select()
    .from(userStreaks)
    .where(eq(userStreaks.userId, userId));

  if (!streak) {
    console.log("[STREAK] No streak record found.");
    return;
  }

  const lastUpdated = toUTCDate(new Date(streak.lastUpdated));
  if (lastUpdated.getTime() === today.getTime()) {
    console.log("[STREAK] Already updated today.");
    return;
  }

  let currentStreak = streak.currentStreak;
  let longestStreak = streak.longestStreak;

  if (streak.currentStreak === 0) {
    currentStreak = 1;
  } else if (lastUpdated.getTime() === yesterday.getTime()) {
    currentStreak = streak.currentStreak + 1;
  } else if (streak.freezesAvailable > 0) {
    currentStreak = streak.currentStreak;

    await db.update(userStreaks).set({
      freezesAvailable: streak.freezesAvailable - 1,
    }).where(eq(userStreaks.userId, userId));
  } else {
    currentStreak = 1;
  }

  longestStreak = Math.max(currentStreak, longestStreak);

  await db.update(userStreaks).set({
    currentStreak,
    longestStreak,
    lastUpdated: today,
  }).where(eq(userStreaks.userId, userId));

  console.log(`[STREAK] Updated streak: ${currentStreak}, longest: ${longestStreak}`);
};