import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding Database...");

        await db.delete(schema.challengeOptions);
        await db.delete(schema.challenges);
        await db.delete(schema.lessons);
        await db.delete(schema.units);
        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        await db.insert(schema.courses).values([
            { id: 1, title: "Korean", imageSrc: "/kr.svg" },
            { id: 2, title: "Japanese", imageSrc: "/jp.svg" },
        ]);

        await db.insert(schema.units).values([
            // Korean
            { id: 1, courseId: 1, title: "Unit 1", description: "Learn Basic Hangeul", order: 1 },
            { id: 2, courseId: 1, title: "Unit 2", description: "Learn Complex Hangeul", order: 2 },
            { id: 3, courseId: 1, title: "Unit 3", description: "Learn Basic Grammar and Phrases", order: 3 },
            // Japanese
            { id: 4, courseId: 2, title: "Unit 1", description: "Learn Hiragana", order: 1 },
        ]);

        await db.insert(schema.lessons).values([
            // Korean - Unit 1
            { id: 1, unitId: 1, order: 1, title: "Basic Vowels 1" },
            { id: 2, unitId: 1, order: 2, title: "Basic Consonants 1" },
            { id: 3, unitId: 1, order: 3, title: "Basic Vowels 2" },
            { id: 4, unitId: 1, order: 4, title: "Basic Consonants 2" },
            { id: 5, unitId: 1, order: 5, title: "Basic Hangeul" },
            // Korean - Unit 2
            { id: 6, unitId: 2, order: 1, title: "Vowel Combinations 1" },
            { id: 7, unitId: 2, order: 2, title: "Double Consonants" },
            { id: 8, unitId: 2, order: 3, title: "Basic Vowels 2" },
            { id: 9, unitId: 2, order: 4, title: "Final Consonant 1" },
            { id: 10, unitId: 2, order: 5, title: "Final Consonant 2" },
            // Korean - Unit 3
            { id: 11, unitId: 3, order: 1, title: "Greetings" },
            { id: 12, unitId: 3, order: 2, title: "Pronouns" },
            { id: 13, unitId: 3, order: 3, title: "Verbs 1" },
            { id: 14, unitId: 3, order: 4, title: "Nouns 1" },
            { id: 15, unitId: 3, order: 5, title: "Adverbs 1" },
            // Japanese - Unit 1
            { id: 16, unitId: 4, order: 1, title: "Hiragana 1" },
            { id: 17, unitId: 4, order: 2, title: "Hiragana 2" },
            { id: 18, unitId: 4, order: 3, title: "Hiragana 3" },
            { id: 19, unitId: 4, order: 4, title: "Hiragana 4" },
            { id: 20, unitId: 4, order: 5, title: "Hiragana 5" },
        ]);

        await db.insert(schema.challenges).values([ // KR - Lesson 1
            { id: 1, lessonId: 1, type: "SELECT", order: 1, question: 'Which one of these is "아"?' },
            { id: 2, lessonId: 1, type: "SELECT", order: 2, question: 'Which one of these is "이"?' },
            { id: 3, lessonId: 1, type: "SELECT", order: 3, question: 'Which one of these is "우"?' },
            { id: 4, lessonId: 1, type: "SELECT", order: 4, question: 'Which one of these is "오"?' },
            { id: 5, lessonId: 1, type: "SELECT", order: 5, question: 'Which one of these is "어"?' },
            { id: 6, lessonId: 1, type: "SELECT", order: 6, question: 'Which one of these is "the child"?' },
        ]);

        await db.insert(schema.challenges).values([ // JP - Lesson 1
            { id: 11, lessonId: 16, type: "SELECT", order: 1, question: 'Which one of these is "あ"?' },
            { id: 12, lessonId: 16, type: "SELECT", order: 2, question: 'Which one of these is "う"?' },
            { id: 13, lessonId: 16, type: "SELECT", order: 3, question: 'Which one of these is "え"?' },
            { id: 14, lessonId: 16, type: "SELECT", order: 4, question: 'Which one of these is "お"?' },
            { id: 15, lessonId: 16, type: "SELECT", order: 5, question: 'Which one of these is "い"?' },
            { id: 16, lessonId: 16, type: "SELECT", order: 6, question: 'Which one of these is "the home"?' },
        ]);

        await db.insert(schema.challengeOptions).values([ // KR - Lesson 1
            { challengeId: 1, imageSrc: "/kr_a.svg", correct: true, text: "", audioSrc: "/kr_a.mp3" },
            { challengeId: 1, imageSrc: "/kr_i.svg", correct: false, text: "", audioSrc: "/kr_i.mp3" },
            { challengeId: 1, imageSrc: "/kr_o.svg", correct: false, text: "", audioSrc: "/kr_o.mp3" },
            { challengeId: 1, imageSrc: "/kr_u.svg", correct: false, text: "", audioSrc: "/kr_u.mp3" },

            { challengeId: 2, imageSrc: "/kr_eo.svg", correct: false, text: "", audioSrc: "/kr_eo.mp3" },
            { challengeId: 2, imageSrc: "/kr_u.svg", correct: false, text: "", audioSrc: "/kr_u.mp3" },
            { challengeId: 2, imageSrc: "/kr_i.svg", correct: true, text: "", audioSrc: "/kr_i.mp3" },
            { challengeId: 2, imageSrc: "/kr_a.svg", correct: false, text: "", audioSrc: "/kr_a.mp3" },

            { challengeId: 3, imageSrc: "/kr_eo.svg", correct: false, text: "", audioSrc: "/kr_eo.mp3" },
            { challengeId: 3, imageSrc: "/kr_i.svg", correct: false, text: "", audioSrc: "/kr_i.mp3" },
            { challengeId: 3, imageSrc: "/kr_u.svg", correct: true, text: "", audioSrc: "/kr_u.mp3" },
            { challengeId: 3, imageSrc: "/kr_o.svg", correct: false, text: "", audioSrc: "/kr_o.mp3" },

            { challengeId: 4, imageSrc: "/kr_eo.svg", correct: false, text: "", audioSrc: "/kr_eo.mp3" },
            { challengeId: 4, imageSrc: "/kr_u.svg", correct: false, text: "", audioSrc: "/kr_u.mp3" },
            { challengeId: 4, imageSrc: "/kr_o.svg", correct: true, text: "", audioSrc: "/kr_o.mp3" },
            { challengeId: 4, imageSrc: "/kr_a.svg", correct: false, text: "", audioSrc: "/kr_a.mp3" },

            { challengeId: 5, imageSrc: "/kr_a.svg", correct: false, text: "", audioSrc: "/kr_a.mp3" },
            { challengeId: 5, imageSrc: "/kr_o.svg", correct: false, text: "", audioSrc: "/kr_o.mp3" },
            { challengeId: 5, imageSrc: "/kr_eo.svg", correct: true, text: "", audioSrc: "/kr_eo.mp3" },
            { challengeId: 5, imageSrc: "/kr_i.svg", correct: false, text: "", audioSrc: "/kr_i.mp3" },

            { challengeId: 6, imageSrc: "/baby.svg", correct: false, text: "아기", audioSrc: "/kr_baby.mp3" },
            { challengeId: 6, imageSrc: "/milk.svg", correct: false, text: "우유", audioSrc: "/kr_milk.mp3" },
            { challengeId: 6, imageSrc: "/child.svg", correct: true, text: "아이", audioSrc: "/kr_child.mp3" },
        ]);

        await db.insert(schema.challengeOptions).values([ // JP - Lesson 1
            { challengeId: 11, imageSrc: "/jp_a.svg", correct: true, text: "", audioSrc: "/jp_a.mp3" },
            { challengeId: 11, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 11, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 11, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },

            { challengeId: 12, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 12, imageSrc: "/jp_u.svg", correct: true, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 12, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 12, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },

            { challengeId: 13, imageSrc: "/jp_e.svg", correct: true, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 13, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 13, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 13, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },

            { challengeId: 14, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 14, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 14, imageSrc: "/jp_o.svg", correct: true, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 14, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },

            { challengeId: 15, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },
            { challengeId: 15, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 15, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 15, imageSrc: "/jp_i.svg", correct: true, text: "", audioSrc: "/jp_i.mp3" },

            { challengeId: 16, imageSrc: "/house.svg", correct: true, text: "家", audioSrc: "/jp_house.mp3" },
            { challengeId: 16, imageSrc: "/book.svg", correct: false, text: "本", audioSrc: "/jp_book.mp3" },
            { challengeId: 16, imageSrc: "/car.svg", correct: false, text: "車", audioSrc: "/jp_car.mp3" },
        ]);

        await db.insert(schema.challenges).values([ // KR - Lesson 2
            { id: 7, lessonId: 2, type: "SELECT", order: 1, question: 'Which one of these is "아"?' },
            { id: 8, lessonId: 2, type: "ASSIST", order: 2, question: '"이"' },
            { id: 9, lessonId: 2, type: "SELECT", order: 3, question: 'Which one of these is "우"?' },
            { id: 10, lessonId: 2, type: "ASSIST", order: 4, question: '"오"' },
        ]);

        console.log("Seeding Finished!");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();

// MAKE SURE TO INCLUDE A / WITH ANY SOURCE. When you don't, it will only work with the initial lesson, not the practice