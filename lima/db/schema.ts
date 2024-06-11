import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

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
    couseId: integer("course_id").references(() => courses.id, { onDelete:
        "cascade" }).notNull(),
        order: integer("order").notNull(),
});

export const unitRelations = relations(units, ({ many, one })=> ({
    course: one(courses, {
        fields: [units.couseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    unitId: integer("unit_id").references(() => units.id, { onDelete:
        "cascade" }).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
    unit: one(units, {
        fields: [lessons.unitId],
        references: [units.id]
    }),
}));

export const userProgress = pgTable("userProgress", {
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