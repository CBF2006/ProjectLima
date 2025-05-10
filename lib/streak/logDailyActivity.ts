import db from "@/db/drizzle";
import { and, eq, InferSelectModel } from "drizzle-orm";
import { DailyActivity } from "@/db/schema";
import { updateStreak } from "./updateStreak";

type DailyActivityType = InferSelectModel<typeof DailyActivity>;

export const logDailyActivity = async (
  userId: string,
  type: "lesson" | "practice",
) => {
  const today = new Date(new Date().toDateString()); // YYYY-MM-DD

  // Check if there's already an entry for today
  const [existing]: DailyActivityType[] = await db
    .select()
    .from(DailyActivity)
    .where(
      and(
        eq(DailyActivity.userId, userId),
        eq(DailyActivity.date, today),
      ),
    );

  // If no entry exists, insert a new one
  if (!existing) {
    await db.insert(DailyActivity).values({
      userId,
      date: today,
      lessonCompleted: type === "lesson",
      practiceCompleted: type === "practice",
    });
  } else {
    // If entry exists, update it (preserving any already-completed status)
    await db
      .update(DailyActivity)
      .set({
        lessonCompleted: existing.lessonCompleted || type === "lesson",
        practiceCompleted: existing.practiceCompleted || type === "practice",
      })
      .where(eq(DailyActivity.id, existing.id));
  }

  // Trigger streak update based on the type
  await updateStreak(userId, type);
};