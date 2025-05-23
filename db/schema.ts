import { relations } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";
import { boolean, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
    userProgress: many(userProgress),
    units: many(units),
}));

export const units = pgTable("units", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), // Unit 1
    description: text("description").notNull(), // Learn Hangeul and Pronounciation
    courseId: integer("course_id").references(() => courses.id, { 
    onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
    bg: text("bg"), // Background image for the unit
    color: text("color").default("brand") // Color for the unit
});

export const unitRelations = relations(units, ({ many, one })=> ({
    course: one(courses, {
        fields: [units.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { 
    onDelete: "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => 
    ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
    challenges: many(challenges),
}));

export const challengesEnum = pgEnum("type", ["SELECT", "ASSIST", "LISTEN_SELECT", "LISTEN_ASSIST", "MATCH", "TRANSLATE", "FILL"]); // Add Voice/Listen here

export const challenges = pgTable("challenges", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id, { 
    onDelete: "cascade" }).notNull(),
    type: challengesEnum("type").notNull(),
    question: text("question").notNull(),
    order: integer("order").notNull(), // Sort by hardest or sum other arbitrary value
    audioSrc: text("audioSrc"),
});

export const challengesRelations = relations(challenges, ({ one, many }) =>
    ({
        lesson: one(lessons, {
            fields: [challenges.lessonId],
            references: [lessons.id],
    }),
    challengeOptions: many(challengeOptions),
    challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable("challenge_options", {
    id: serial("id").primaryKey(),
    challengeId: integer("challenge_id").references(() => challenges.id, { 
    onDelete: "cascade" }).notNull(),
    text: text("text"),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"), // notNull() would require this field and break if not present
    isPrompt: boolean("is_prompt").notNull().default(false),
    matchId: text("match_id"),
});

export const challengeOptionsRelations = relations(challengeOptions, ({ one }) =>
    ({
        challenge: one(challenges, {
            fields: [challengeOptions.challengeId],
            references: [challenges.id],
    }),
}));

export const challengeProgress = pgTable("challenge_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(),
    challengeId: integer("challenge_id").references(() => challenges.id, { 
    onDelete: "cascade" }).notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const challengeProgressRelations = relations(challengeProgress, ({ one }) =>
    ({
        challenge: one(challenges, {
            fields: [challengeProgress.challengeId],
            references: [challenges.id],
    }),
}));

export const userProgress = pgTable("user_progress", {
     userId: text("user_id").primaryKey(),
     userName: text("user_name").notNull().default("User"),
     userImageSrc: text("user_image_src").notNull().default("/sana.svg"),
     activeCourseId: integer("active_course_id").references(() => courses.
     id, { onDelete: "cascade" }),
     hearts: integer("hearts").notNull().default(5),
     points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => 
    ({
    activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
   }),
}));

export const userSubscription = pgTable("user_subscription", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().unique(),
    stripeCustomerId: text("stripe_customer_id").notNull().unique(),
    stripeSubscriptionId: text("stripe_subscription_id").notNull().unique(),
    stripePriceId: text("stripe_price_id").notNull(),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end").notNull(),
});

export const userStreaks = pgTable("user_streaks", {
    userId: text("user_id").primaryKey().references(() => userProgress.userId, {
        onDelete: "cascade",
    }),
    currentStreak: integer("current_streak").notNull().default(0),
    longestStreak: integer("longest_streak").notNull().default(0),
    lastUpdated: timestamp("last_updated", { withTimezone: false }).notNull(),
    freezesAvailable: integer("freezes_available").notNull().default(0),
});

export const DailyActivity = pgTable("daily_activity", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull().references(() => userProgress.userId, {
        onDelete: "cascade",
    }),
    date: timestamp("date", { withTimezone: false }).notNull(),
    lessonCompleted: boolean("lesson_completed").notNull().default(false),
    practiceCompleted: boolean("practice_completed").notNull().default(false),
});

export const userStreaksRelations = relations(userStreaks, ({ one }) => ({
    user: one(userProgress, {
        fields: [userStreaks.userId],
        references: [userProgress.userId],
    }),
}));

export const dailyActivityRelations = relations(DailyActivity, ({ one }) => ({
    user: one(userProgress, {
        fields: [DailyActivity.userId],
        references: [userProgress.userId],
    }),
}));


// npm run db:push --> Updates schema.ts
// npm run db:seed --> Updates seed.ts