import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Seeding Database...");

        await db.delete(schema.courses);
        await db.delete(schema.userProgress);
        await db.delete(schema.units);
        await db.delete(schema.lessons);
        await db.delete(schema.challenges);
        await db.delete(schema.challengeOptions);
        await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
        {
            id: 1,
            title: "Korean",
            imageSrc: "/kr.svg",
        },
        {
            id: 2,
            title: "Japanese",
            imageSrc: "/jp.svg",
        },
    ]);

    await db.insert(schema.units).values([
        {
            id: 1,
            courseId: 1, // Korean
            title: "Unit 1",
            description: "Learn Basic Hangeul",
            order: 1,
        },
    ]);

    await db.insert(schema.lessons).values([
        {
            id: 1,
            unitId: 1, // Unit 1: Learn Hangeul...
            order: 1,
            title: "Basic Vowels 1",
        }, 
        {
            id: 2,
            unitId: 1, // Unit 1: Learn Hangeul...
            order: 2,
            title: "Basic Consonants 1",
        }, 
        {
            id: 3,
            unitId: 1, // Unit 1: Learn Hangeul...
            order: 3,
            title: "Basic Vowels 2",
        }, 
        {
            id: 4,
            unitId: 1, // Unit 1: Learn Hangeul...
            order: 4,
            title: "Basic Consonants 2",
        }, 
        {
            id: 5,
            unitId: 1, // Unit 1: Learn Hangeul...
            order: 5,
            title: "Basic Hanguel",
        }, 
    ]);

    await db.insert(schema.challenges).values([
        {
            id: 1,
            lessonId: 1, // Basic Vowels 1
            type: "SELECT",
            order: 1,
            question: 'Which one of these is "아"?',
        },
    ]);

    await db.insert(schema.challengeOptions).values([
        {
            id: 1,
            challengeId: 1, // Which one of these is "아"?
            imageSrc: "kr_a.svg",
            correct: true,
            text: "",
            audioSrc: "kr_a.mp3",
        },
        {
            id: 2,
            challengeId: 1, // Which one of these is "아"?
            imageSrc: "kr_i.svg",
            correct: false,
            text: "",
            audioSrc: "kr_i.mp3",
        },
        {
            id: 3,
            challengeId: 1, // Which one of these is "아"?
            imageSrc: "kr_o.svg",
            correct: false,
            text: "",
            audioSrc: "kr_o.mp3",
        },
        {
            id: 4,
            challengeId: 1, // Which one of these is "아"?
            imageSrc: "kr_u.svg",
            correct: false,
            text: "",
            audioSrc: "kr_u.mp3",
        },
    ]);

            console.log("Seeding Finished!");
        } catch (error) {
            console.error(error);
            throw new Error("Failed to seed the database");
        }
    };

main();