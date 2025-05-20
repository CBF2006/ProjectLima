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
        await db.delete(schema.userStreaks);

        await db.insert(schema.courses).values([
            { id: 1, title: "Korean", imageSrc: "/kr.svg" },
            { id: 2, title: "Japanese", imageSrc: "/jp.svg" },
            { id: 3, title: "Spanish", imageSrc: "/mx.svg" },
        ]);

        await db.insert(schema.units).values([
            // Korean
            { id: 1, courseId: 1, title: "Unit 1", description: "Learn Basic Hangeul", order: 1, bg: "/hangul.png", color: "bg-red-500" },
            { id: 2, courseId: 1, title: "Unit 2", description: "Learn Complex Hangeul", order: 2, bg: "/hangul.png", color: "bg-blue-500" },
            { id: 3, courseId: 1, title: "Unit 3", description: "Learn Basic Grammar and Phrases", order: 3, bg: "/hangul.png", color: "bg-pink-500" },
            // Japanese
            { id: 4, courseId: 2, title: "Unit 1", description: "Learn Hiragana", order: 1, bg: "temple.svg", color: "bg-red-500" },
            { id: 5, courseId: 2, title: "Unit 2", description: "Learn Basic Greetings and Phrases", order: 2, bg: "town.svg", color: "bg-pink-500" },
        ]);

        await db.insert(schema.lessons).values([
            // Korean - Unit 1
            { id: 1, unitId: 1, order: 1, title: "KR - Basic Vowels 1" },
            { id: 2, unitId: 1, order: 2, title: "KR - Basic Consonants 1" },
            { id: 3, unitId: 1, order: 3, title: "KR - Basic Vowels 2" },
            { id: 4, unitId: 1, order: 4, title: "KR - Basic Consonants 2" },
            { id: 5, unitId: 1, order: 5, title: "KR - Basic Hangeul" },
            // Korean - Unit 2
            { id: 6, unitId: 2, order: 1, title: "KR - Vowel Combinations 1" },
            { id: 7, unitId: 2, order: 2, title: "KR - Double Consonants" },
            { id: 8, unitId: 2, order: 3, title: "KR - Basic Vowels 2" },
            { id: 9, unitId: 2, order: 4, title: "KR - Final Consonant 1" },
            { id: 10, unitId: 2, order: 5, title: "KR - Final Consonant 2" },
            // Korean - Unit 3
            { id: 11, unitId: 3, order: 1, title: "KR - Greetings" },
            { id: 12, unitId: 3, order: 2, title: "KR - Pronouns" },
            { id: 13, unitId: 3, order: 3, title: "KR - Verbs 1" },
            { id: 14, unitId: 3, order: 4, title: "KR - Nouns 1" },
            { id: 15, unitId: 3, order: 5, title: "KR - Adverbs 1" },
            // Japanese - Unit 1
            { id: 16, unitId: 4, order: 1, title: "JP - Hiragana 1" },
            { id: 17, unitId: 4, order: 2, title: "JP - Hiragana 2" },
            { id: 18, unitId: 4, order: 3, title: "JP - Hiragana 3" },
            { id: 19, unitId: 4, order: 4, title: "JP - Hiragana 4" },
            { id: 20, unitId: 4, order: 5, title: "JP - Hiragana Test" },
        ]);

        await db.insert(schema.challenges).values([ // KR - Lesson 1
            { id: 1, lessonId: 1, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/kr_a.mp3" },
            { id: 2, lessonId: 1, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/kr_i.mp3" },
            { id: 3, lessonId: 1, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/kr_u.mp3" },
            { id: 4, lessonId: 1, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/kr_o.mp3" },
            { id: 5, lessonId: 1, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/kr_eo.mp3" },
            { id: 6, lessonId: 1, type: "SELECT", order: 6, question: 'Which one of these is "the child"?', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // KR - Lesson 2
            { id: 58, lessonId: 2, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/kr_ga.mp3" },
            { id: 59, lessonId: 2, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/kr_na.mp3" },
            { id: 60, lessonId: 2, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/kr_da.mp3" },
            { id: 61, lessonId: 2, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/kr_ra.mp3" },
            { id: 62, lessonId: 2, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/kr_ma.mp3" },
            { id: 63, lessonId: 2, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/kr_ba.mp3" },
            { id: 64, lessonId: 2, type: "LISTEN_SELECT", order: 7, question: '', audioSrc: "/kr_sa.mp3" },
            { id: 65, lessonId: 2, type: "LISTEN_ASSIST", order: 8, question: '', audioSrc: "/kr_sada.mp3" },
        ]);

        await db.insert(schema.challenges).values([ // KR - Lesson 3
            { id: 66, lessonId: 3, type: "MATCH", order: 1, question: '', audioSrc: "" },
            { id: 67, lessonId: 3, type: "TRANSLATE", order: 2, question: '이름이 뭐에요?', audioSrc: "" },
            { id: 68, lessonId: 3, type: "TRANSLATE", order: 3, question: '{blank} 배고파요', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // JP - Unit 1 Lesson 1
            { id: 7, lessonId: 16, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/jp_a.mp3" },
            { id: 8, lessonId: 16, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/jp_u.mp3" },
            { id: 9, lessonId: 16, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/jp_e.mp3" },
            { id: 10, lessonId: 16, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/jp_o.mp3"} ,
            { id: 11, lessonId: 16, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/jp_i.mp3" },
            { id: 12, lessonId: 16, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/jp_ka.mp3" },
            { id: 13, lessonId: 16, type: "LISTEN_SELECT", order: 7, question: '', audioSrc: "/jp_ki.mp3" },
            { id: 14, lessonId: 16, type: "LISTEN_SELECT", order: 8, question: '', audioSrc: "/jp_ko.mp3" },
            { id: 15, lessonId: 16, type: "LISTEN_SELECT", order: 9, question: '', audioSrc: "/jp_ke.mp3" },
            { id: 16, lessonId: 16, type: "LISTEN_SELECT", order: 10, question: '', audioSrc: "/jp_ku.mp3" },
            { id: 17, lessonId: 16, type: "SELECT", order: 11, question: 'Which one of these is "the home"?', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // JP - Unit 1 Lesson 2
            { id: 18, lessonId: 17, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/jp_su.mp3" },
            { id: 19, lessonId: 17, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/jp_se.mp3" },
            { id: 20, lessonId: 17, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/jp_sa.mp3" },
            { id: 21, lessonId: 17, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/jp_so.mp3" },
            { id: 22, lessonId: 17, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/jp_shi.mp3" },
            { id: 23, lessonId: 17, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/jp_ta.mp3" },
            { id: 24, lessonId: 17, type: "LISTEN_SELECT", order: 7, question: '', audioSrc: "/jp_tsu.mp3" },
            { id: 25, lessonId: 17, type: "LISTEN_SELECT", order: 8, question: '', audioSrc: "/jp_chi.mp3" },
            { id: 26, lessonId: 17, type: "LISTEN_SELECT", order: 9, question: '', audioSrc: "/jp_to.mp3" },
            { id: 27, lessonId: 17, type: "LISTEN_SELECT", order: 10, question: '', audioSrc: "/jp_te.mp3" },
            { id: 28, lessonId: 17, type: "SELECT", order: 11, question: 'Which one of these is "the home"?', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // JP - Unit 1 Lesson 3
            { id: 29, lessonId: 18, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/jp_nu.mp3" },
            { id: 30, lessonId: 18, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/jp_ne.mp3" },
            { id: 31, lessonId: 18, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/jp_na.mp3" },
            { id: 32, lessonId: 18, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/jp_no.mp3"} ,
            { id: 33, lessonId: 18, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/jp_ni.mp3"} ,
            { id: 34, lessonId: 18, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/jp_fu.mp3" },
            { id: 35, lessonId: 18, type: "LISTEN_SELECT", order: 7, question: '', audioSrc: "/jp_he.mp3" },
            { id: 36, lessonId: 18, type: "LISTEN_SELECT", order: 8, question: '', audioSrc: "/jp_ha.mp3" },
            { id: 37, lessonId: 18, type: "LISTEN_SELECT", order: 9, question: '', audioSrc: "/jp_ho.mp3" },
            { id: 38, lessonId: 18, type: "LISTEN_SELECT", order: 10, question: '', audioSrc: "/jp_hi.mp3" },
            { id: 39, lessonId: 18, type: "SELECT", order: 11, question: 'Which one of these is "the home"?', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // JP - Unit 1 Lesson 4
            { id: 40, lessonId: 19, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/jp_re.mp3" },
            { id: 41, lessonId: 19, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/jp_ri.mp3" },
            { id: 42, lessonId: 19, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/jp_ra.mp3" },
            { id: 43, lessonId: 19, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/jp_ru.mp3"} ,
            { id: 44, lessonId: 19, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/jp_ro.mp3" },
            { id: 45, lessonId: 19, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/jp_mi.mp3" },
            { id: 46, lessonId: 19, type: "LISTEN_SELECT", order: 7, question: '', audioSrc: "/jp_me.mp3" },
            { id: 47, lessonId: 19, type: "LISTEN_SELECT", order: 8, question: '', audioSrc: "/jp_ma.mp3" },
            { id: 48, lessonId: 19, type: "LISTEN_SELECT", order: 9, question: '', audioSrc: "/jp_mu.mp3" },
            { id: 49, lessonId: 19, type: "LISTEN_SELECT", order: 10, question: '', audioSrc: "/jp_mo.mp3" },
            { id: 50, lessonId: 19, type: "SELECT", order: 11, question: 'Which one of these is "the home"?', audioSrc: "" },
        ]);

        await db.insert(schema.challenges).values([ // JP - Unit 1 Lesson 5
            { id: 51, lessonId: 20, type: "LISTEN_SELECT", order: 1, question: '', audioSrc: "/jp_ya.mp3" },
            { id: 52, lessonId: 20, type: "LISTEN_SELECT", order: 2, question: '', audioSrc: "/jp_wa.mp3" },
            { id: 53, lessonId: 20, type: "LISTEN_SELECT", order: 3, question: '', audioSrc: "/jp_n.mp3" },
            { id: 54, lessonId: 20, type: "LISTEN_SELECT", order: 4, question: '', audioSrc: "/jp_yu.mp3"} ,
            { id: 55, lessonId: 20, type: "LISTEN_SELECT", order: 5, question: '', audioSrc: "/jp_wo.mp3" },
            { id: 56, lessonId: 20, type: "LISTEN_SELECT", order: 6, question: '', audioSrc: "/jp_yo.mp3" },
            { id: 57, lessonId: 20, type: "SELECT", order: 7, question: 'Which one of these is "the home"?', audioSrc: "" },
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

        await db.insert(schema.challengeOptions).values([
            // KR - Lesson 2
            { challengeId: 58, imageSrc: "/kr_na.svg", correct: false, text: "", audioSrc: "/kr_na.mp3" },
            { challengeId: 58, imageSrc: "/kr_ra.svg", correct: false, text: "", audioSrc: "/kr_ra.mp3" },
            { challengeId: 58, imageSrc: "/kr_da.svg", correct: false, text: "", audioSrc: "/kr_da.mp3" },
            { challengeId: 58, imageSrc: "/kr_ga.svg", correct: true, text: "", audioSrc: "/kr_ga.mp3" },
          
            { challengeId: 59, imageSrc: "/kr_sa.svg", correct: false, text: "", audioSrc: "/kr_sa.mp3" },
            { challengeId: 59, imageSrc: "/kr_na.svg", correct: true, text: "", audioSrc: "/kr_na.mp3" },
            { challengeId: 59, imageSrc: "/kr_ma.svg", correct: false, text: "", audioSrc: "/kr_ma.mp3" },
            { challengeId: 59, imageSrc: "/kr_ba.svg", correct: false, text: "", audioSrc: "/kr_ba.mp3" },
          
            { challengeId: 60, imageSrc: "/kr_ra.svg", correct: false, text: "", audioSrc: "/kr_ra.mp3" },
            { challengeId: 60, imageSrc: "/kr_da.svg", correct: true, text: "", audioSrc: "/kr_da.mp3" },
            { challengeId: 60, imageSrc: "/kr_ga.svg", correct: false, text: "", audioSrc: "/kr_ga.mp3" },
            { challengeId: 60, imageSrc: "/kr_na.svg", correct: false, text: "", audioSrc: "/kr_na.mp3" },
          
            { challengeId: 61, imageSrc: "/kr_ma.svg", correct: false, text: "", audioSrc: "/kr_ma.mp3" },
            { challengeId: 61, imageSrc: "/kr_ra.svg", correct: true, text: "", audioSrc: "/kr_ra.mp3" },
            { challengeId: 61, imageSrc: "/kr_da.svg", correct: false, text: "", audioSrc: "/kr_da.mp3" },
            { challengeId: 61, imageSrc: "/kr_sa.svg", correct: false, text: "", audioSrc: "/kr_sa.mp3" },
          
            { challengeId: 62, imageSrc: "/kr_ba.svg", correct: false, text: "", audioSrc: "/kr_ba.mp3" },
            { challengeId: 62, imageSrc: "/kr_na.svg", correct: false, text: "", audioSrc: "/kr_na.mp3" },
            { challengeId: 62, imageSrc: "/kr_ma.svg", correct: true, text: "", audioSrc: "/kr_ma.mp3" },
            { challengeId: 62, imageSrc: "/kr_sa.svg", correct: false, text: "", audioSrc: "/kr_sa.mp3" },
          
            { challengeId: 63, imageSrc: "/kr_sa.svg", correct: false, text: "", audioSrc: "/kr_sa.mp3" },
            { challengeId: 63, imageSrc: "/kr_ga.svg", correct: false, text: "", audioSrc: "/kr_ga.mp3" },
            { challengeId: 63, imageSrc: "/kr_ma.svg", correct: false, text: "", audioSrc: "/kr_ma.mp3" },
            { challengeId: 63, imageSrc: "/kr_ba.svg", correct: true, text: "", audioSrc: "/kr_ba.mp3" },
          
            { challengeId: 64, imageSrc: "/kr_sa.svg", correct: true, text: "", audioSrc: "/kr_sa.mp3" },
            { challengeId: 64, imageSrc: "/kr_na.svg", correct: false, text: "", audioSrc: "/kr_na.mp3" },
            { challengeId: 64, imageSrc: "/kr_da.svg", correct: false, text: "", audioSrc: "/kr_da.mp3" },
            { challengeId: 64, imageSrc: "/kr_ma.svg", correct: false, text: "", audioSrc: "/kr_ma.mp3" },
            
            { challengeId: 65, imageSrc: "", correct: false, text: "이다", audioSrc: "/kr_ida.mp3" },
            { challengeId: 65, imageSrc: "", correct: true, text: "사다", audioSrc: "/kr_sada.mp3" },
            { challengeId: 65, imageSrc: "", correct: false, text: "가다", audioSrc: "/kr_gada.mp3" },
          ]);

        await db.insert(schema.challengeOptions).values([
            // Korean Lesson 3 - MATCH (id: 66)
            { challengeId: 66, text: "사과", isPrompt: true, matchId: "apple", correct: true, audioSrc: "/kr_apple.mp3" },
            { challengeId: 66, text: "Apple", isPrompt: false, matchId: "apple", correct: true, audioSrc: "/apple.mp3" },

            { challengeId: 66, text: "우유", isPrompt: true, matchId: "milk", correct: true, audioSrc: "/kr_milk.mp3" },
            { challengeId: 66, text: "Milk", isPrompt: false, matchId: "milk", correct: true, audioSrc: "/milk.mp3" },

            { challengeId: 67, imageSrc: "", correct: false, text: "How are you?", audioSrc: "" },
            { challengeId: 67, imageSrc: "", correct: false, text: "Where are you from?", audioSrc: "" },
            { challengeId: 67, imageSrc: "", correct: true, text: "What's your name?", audioSrc: "" },

            { challengeId: 68, imageSrc: "", correct: false, text: "나는", audioSrc: "" },
            { challengeId: 68, imageSrc: "", correct: true, text: "제가", audioSrc: "" },
            { challengeId: 68, imageSrc: "", correct: false, text: "너를", audioSrc: "" },
        ]);


          

        await db.insert(schema.challengeOptions).values([ // JP - Unit 1 Lesson 1
            { challengeId: 7, imageSrc: "/jp_a.svg", correct: true, text: "", audioSrc: "/jp_a.mp3" },
            { challengeId: 7, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 7, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 7, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },
        
            { challengeId: 8, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 8, imageSrc: "/jp_u.svg", correct: true, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 8, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 8, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },
        
            { challengeId: 9, imageSrc: "/jp_e.svg", correct: true, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 9, imageSrc: "/jp_i.svg", correct: false, text: "", audioSrc: "/jp_i.mp3" },
            { challengeId: 9, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 9, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },
        
            { challengeId: 10, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 10, imageSrc: "/jp_u.svg", correct: false, text: "", audioSrc: "/jp_u.mp3" },
            { challengeId: 10, imageSrc: "/jp_o.svg", correct: true, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 10, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },
        
            { challengeId: 11, imageSrc: "/jp_a.svg", correct: false, text: "", audioSrc: "/jp_a.mp3" },
            { challengeId: 11, imageSrc: "/jp_o.svg", correct: false, text: "", audioSrc: "/jp_o.mp3" },
            { challengeId: 11, imageSrc: "/jp_e.svg", correct: false, text: "", audioSrc: "/jp_e.mp3" },
            { challengeId: 11, imageSrc: "/jp_i.svg", correct: true, text: "", audioSrc: "/jp_i.mp3" },
        
            { challengeId: 12, imageSrc: "/jp_ka.svg", correct: true, text: "", audioSrc: "/jp_ka.mp3" },
            { challengeId: 12, imageSrc: "/jp_ki.svg", correct: false, text: "", audioSrc: "/jp_ki.mp3" },
            { challengeId: 12, imageSrc: "/jp_ko.svg", correct: false, text: "", audioSrc: "/jp_ko.mp3" },
            { challengeId: 12, imageSrc: "/jp_ku.svg", correct: false, text: "", audioSrc: "/jp_ku.mp3" },
        
            { challengeId: 13, imageSrc: "/jp_ke.svg", correct: false, text: "", audioSrc: "/jp_ke.mp3" },
            { challengeId: 13, imageSrc: "/jp_ku.svg", correct: false, text: "", audioSrc: "/jp_ku.mp3" },
            { challengeId: 13, imageSrc: "/jp_ki.svg", correct: true, text: "", audioSrc: "/jp_ki.mp3" },
            { challengeId: 13, imageSrc: "/jp_ka.svg", correct: false, text: "", audioSrc: "/jp_ka.mp3" },
        
            { challengeId: 14, imageSrc: "/jp_ke.svg", correct: false, text: "", audioSrc: "/jp_ke.mp3" },
            { challengeId: 14, imageSrc: "/jp_ki.svg", correct: false, text: "", audioSrc: "/jp_ki.mp3" },
            { challengeId: 14, imageSrc: "/jp_ku.svg", correct: false, text: "", audioSrc: "/jp_ku.mp3" },
            { challengeId: 14, imageSrc: "/jp_ko.svg", correct: true, text: "", audioSrc: "/jp_ko.mp3" },
        
            { challengeId: 15, imageSrc: "/jp_ke.svg", correct: true, text: "", audioSrc: "/jp_ke.mp3" },
            { challengeId: 15, imageSrc: "/jp_ku.svg", correct: false, text: "", audioSrc: "/jp_ku.mp3" },
            { challengeId: 15, imageSrc: "/jp_ko.svg", correct: false, text: "", audioSrc: "/jp_ko.mp3" },
            { challengeId: 15, imageSrc: "/jp_ka.svg", correct: false, text: "", audioSrc: "/jp_ka.mp3" },
        
            { challengeId: 16, imageSrc: "/jp_ka.svg", correct: false, text: "", audioSrc: "/jp_ka.mp3" },
            { challengeId: 16, imageSrc: "/jp_ku.svg", correct: true, text: "", audioSrc: "/jp_ku.mp3" },
            { challengeId: 16, imageSrc: "/jp_ke.svg", correct: false, text: "", audioSrc: "/jp_ke.mp3" },
            { challengeId: 16, imageSrc: "/jp_ki.svg", correct: false, text: "", audioSrc: "/jp_ki.mp3" },
        
            { challengeId: 17, imageSrc: "/house.svg", correct: true, text: "家", audioSrc: "/jp_house.mp3" },
            { challengeId: 17, imageSrc: "/book.svg", correct: false, text: "本", audioSrc: "/jp_book.mp3" },
            { challengeId: 17, imageSrc: "/car.svg", correct: false, text: "車", audioSrc: "/jp_car.mp3" },
        ]);
        
        await db.insert(schema.challengeOptions).values([ // JP - Unit 1 Lesson 2
            { challengeId: 18, imageSrc: "/jp_sa.svg", correct: false, text: "", audioSrc: "/jp_sa.mp3" },
            { challengeId: 18, imageSrc: "/jp_su.svg", correct: true, text: "", audioSrc: "/jp_su.mp3" },
            { challengeId: 18, imageSrc: "/jp_so.svg", correct: false, text: "", audioSrc: "/jp_so.mp3" },
            { challengeId: 18, imageSrc: "/jp_shi.svg", correct: false, text: "", audioSrc: "/jp_shi.mp3" },
        
            { challengeId: 19, imageSrc: "/jp_shi.svg", correct: false, text: "", audioSrc: "/jp_shi.mp3" },
            { challengeId: 19, imageSrc: "/jp_su.svg", correct: false, text: "", audioSrc: "/jp_su.mp3" },
            { challengeId: 19, imageSrc: "/jp_se.svg", correct: true, text: "", audioSrc: "/jp_se.mp3" },
            { challengeId: 19, imageSrc: "/jp_sa.svg", correct: false, text: "", audioSrc: "/jp_sa.mp3" },
        
            { challengeId: 20, imageSrc: "/jp_se.svg", correct: false, text: "", audioSrc: "/jp_se.mp3" },
            { challengeId: 20, imageSrc: "/jp_shi.svg", correct: false, text: "", audioSrc: "/jp_shi.mp3" },
            { challengeId: 20, imageSrc: "/jp_su.svg", correct: false, text: "", audioSrc: "/jp_su.mp3" },
            { challengeId: 20, imageSrc: "/jp_sa.svg", correct: true, text: "", audioSrc: "/jp_sa.mp3" },
        
            { challengeId: 21, imageSrc: "/jp_se.svg", correct: false, text: "", audioSrc: "/jp_se.mp3" },
            { challengeId: 21, imageSrc: "/jp_su.svg", correct: false, text: "", audioSrc: "/jp_su.mp3" },
            { challengeId: 21, imageSrc: "/jp_so.svg", correct: true, text: "", audioSrc: "/jp_so.mp3" },
            { challengeId: 21, imageSrc: "/jp_sa.svg", correct: false, text: "", audioSrc: "/jp_sa.mp3" },
        
            { challengeId: 22, imageSrc: "/jp_se.svg", correct: false, text: "", audioSrc: "/jp_se.mp3" },
            { challengeId: 22, imageSrc: "/jp_so.svg", correct: false, text: "", audioSrc: "/jp_so.mp3" },
            { challengeId: 22, imageSrc: "/jp_sa.svg", correct: false, text: "", audioSrc: "/jp_sa.mp3" },
            { challengeId: 22, imageSrc: "/jp_shi.svg", correct: true, text: "", audioSrc: "/jp_shi.mp3" },
        
            { challengeId: 23, imageSrc: "/jp_ta.svg", correct: true, text: "", audioSrc: "/jp_ta.mp3" },
            { challengeId: 23, imageSrc: "/jp_tsu.svg", correct: false, text: "", audioSrc: "/jp_tsu.mp3" },
            { challengeId: 23, imageSrc: "/jp_te.svg", correct: false, text: "", audioSrc: "/jp_te.mp3" },
            { challengeId: 23, imageSrc: "/jp_to.svg", correct: false, text: "", audioSrc: "/jp_to.mp3" },
        
            { challengeId: 24, imageSrc: "/jp_to.svg", correct: false, text: "", audioSrc: "/jp_to.mp3" },
            { challengeId: 24, imageSrc: "/jp_tsu.svg", correct: true, text: "", audioSrc: "/jp_tsu.mp3" },
            { challengeId: 24, imageSrc: "/jp_ta.svg", correct: false, text: "", audioSrc: "/jp_ta.mp3" },
            { challengeId: 24, imageSrc: "/jp_chi.svg", correct: false, text: "", audioSrc: "/jp_chi.mp3" },
        
            { challengeId: 25, imageSrc: "/jp_tsu.svg", correct: false, text: "", audioSrc: "/jp_tsu.mp3" },
            { challengeId: 25, imageSrc: "/jp_chi.svg", correct: true, text: "", audioSrc: "/jp_chi.mp3" },
            { challengeId: 25, imageSrc: "/jp_te.svg", correct: false, text: "", audioSrc: "/jp_te.mp3" },
            { challengeId: 25, imageSrc: "/jp_ta.svg", correct: false, text: "", audioSrc: "/jp_ta.mp3" },
        
            { challengeId: 26, imageSrc: "/jp_to.svg", correct: true, text: "", audioSrc: "/jp_to.mp3" },
            { challengeId: 26, imageSrc: "/jp_ta.svg", correct: false, text: "", audioSrc: "/jp_ta.mp3" },
            { challengeId: 26, imageSrc: "/jp_chi.svg", correct: false, text: "", audioSrc: "/jp_chi.mp3" },
            { challengeId: 26, imageSrc: "/jp_tsu.svg", correct: false, text: "", audioSrc: "/jp_tsu.mp3" },
        
            { challengeId: 27, imageSrc: "/jp_chi.svg", correct: false, text: "", audioSrc: "/jp_chi.mp3" },
            { challengeId: 27, imageSrc: "/jp_to.svg", correct: false, text: "", audioSrc: "/jp_to.mp3" },
            { challengeId: 27, imageSrc: "/jp_ta.svg", correct: false, text: "", audioSrc: "/jp_ta.mp3" },
            { challengeId: 27, imageSrc: "/jp_te.svg", correct: true, text: "", audioSrc: "/jp_te.mp3" },
        
            { challengeId: 28, imageSrc: "/bird.svg", correct: true, text: "鳥", audioSrc: "/jp_bird.mp3" },
            { challengeId: 28, imageSrc: "/dog.svg", correct: false, text: "犬", audioSrc: "/jp_dog.mp3" },
            { challengeId: 28, imageSrc: "/cat.svg", correct: false, text: "猫", audioSrc: "/jp_cat.mp3" },
        ]);

        await db.insert(schema.challengeOptions).values([ // JP - Unit 1 Lesson 3
            { challengeId: 29, imageSrc: "/jp_na.svg", correct: false, text: "", audioSrc: "/jp_na.mp3" },
            { challengeId: 29, imageSrc: "/jp_nu.svg", correct: true, text: "", audioSrc: "/jp_nu.mp3" },
            { challengeId: 29, imageSrc: "/jp_no.svg", correct: false, text: "", audioSrc: "/jp_no.mp3" },
            { challengeId: 29, imageSrc: "/jp_ni.svg", correct: false, text: "", audioSrc: "/jp_ni.mp3" },
        
            { challengeId: 30, imageSrc: "/jp_ni.svg", correct: false, text: "", audioSrc: "/jp_ni.mp3" },
            { challengeId: 30, imageSrc: "/jp_nu.svg", correct: false, text: "", audioSrc: "/jp_nu.mp3" },
            { challengeId: 30, imageSrc: "/jp_ne.svg", correct: true, text: "", audioSrc: "/jp_ne.mp3" },
            { challengeId: 30, imageSrc: "/jp_na.svg", correct: false, text: "", audioSrc: "/jp_na.mp3" },
        
            { challengeId: 31, imageSrc: "/jp_ne.svg", correct: false, text: "", audioSrc: "/jp_ne.mp3" },
            { challengeId: 31, imageSrc: "/jp_ni.svg", correct: false, text: "", audioSrc: "/jp_ni.mp3" },
            { challengeId: 31, imageSrc: "/jp_nu.svg", correct: false, text: "", audioSrc: "/jp_nu.mp3" },
            { challengeId: 31, imageSrc: "/jp_na.svg", correct: true, text: "", audioSrc: "/jp_na.mp3" },
        
            { challengeId: 32, imageSrc: "/jp_ne.svg", correct: false, text: "", audioSrc: "/jp_ne.mp3" },
            { challengeId: 32, imageSrc: "/jp_nu.svg", correct: false, text: "", audioSrc: "/jp_nu.mp3" },
            { challengeId: 32, imageSrc: "/jp_no.svg", correct: true, text: "", audioSrc: "/jp_no.mp3" },
            { challengeId: 32, imageSrc: "/jp_na.svg", correct: false, text: "", audioSrc: "/jp_na.mp3" },
        
            { challengeId: 33, imageSrc: "/jp_ni.svg", correct: true, text: "", audioSrc: "/jp_ni.mp3" },
            { challengeId: 33, imageSrc: "/jp_nu.svg", correct: false, text: "", audioSrc: "/jp_nu.mp3" },
            { challengeId: 33, imageSrc: "/jp_ne.svg", correct: false, text: "", audioSrc: "/jp_ne.mp3" },
            { challengeId: 33, imageSrc: "/jp_na.svg", correct: false, text: "", audioSrc: "/jp_na.mp3" },

            { challengeId: 34, imageSrc: "/jp_ha.svg", correct: false, text: "", audioSrc: "/jp_ha.mp3" },
            { challengeId: 34, imageSrc: "/jp_fu.svg", correct: true, text: "", audioSrc: "/jp_fu.mp3" },
            { challengeId: 34, imageSrc: "/jp_ho.svg", correct: false, text: "", audioSrc: "/jp_ho.mp3" },
            { challengeId: 34, imageSrc: "/jp_hi.svg", correct: false, text: "", audioSrc: "/jp_hi.mp3" },
        
            { challengeId: 35, imageSrc: "/jp_hi.svg", correct: false, text: "", audioSrc: "/jp_hi.mp3" },
            { challengeId: 35, imageSrc: "/jp_fu.svg", correct: false, text: "", audioSrc: "/jp_fu.mp3" },
            { challengeId: 35, imageSrc: "/jp_he.svg", correct: true, text: "", audioSrc: "/jp_he.mp3" },
            { challengeId: 35, imageSrc: "/jp_ha.svg", correct: false, text: "", audioSrc: "/jp_ha.mp3" },
        
            { challengeId: 36, imageSrc: "/jp_he.svg", correct: false, text: "", audioSrc: "/jp_he.mp3" },
            { challengeId: 36, imageSrc: "/jp_hi.svg", correct: false, text: "", audioSrc: "/jp_hi.mp3" },
            { challengeId: 36, imageSrc: "/jp_fu.svg", correct: false, text: "", audioSrc: "/jp_fu.mp3" },
            { challengeId: 36, imageSrc: "/jp_ha.svg", correct: true, text: "", audioSrc: "/jp_ha.mp3" },
        
            { challengeId: 37, imageSrc: "/jp_he.svg", correct: false, text: "", audioSrc: "/jp_he.mp3" },
            { challengeId: 37, imageSrc: "/jp_fu.svg", correct: false, text: "", audioSrc: "/jp_fu.mp3" },
            { challengeId: 37, imageSrc: "/jp_ho.svg", correct: true, text: "", audioSrc: "/jp_ho.mp3" },
            { challengeId: 37, imageSrc: "/jp_ha.svg", correct: false, text: "", audioSrc: "/jp_ha.mp3" },
        
            { challengeId: 38, imageSrc: "/jp_ha.svg", correct: false, text: "", audioSrc: "/jp_ha.mp3" },
            { challengeId: 38, imageSrc: "/jp_fu.svg", correct: false, text: "", audioSrc: "/jp_fu.mp3" },
            { challengeId: 38, imageSrc: "/jp_ho.svg", correct: false, text: "", audioSrc: "/jp_ho.mp3" },
            { challengeId: 38, imageSrc: "/jp_hi.svg", correct: true, text: "", audioSrc: "/jp_hi.mp3" },

            { challengeId: 39, imageSrc: "/bird.svg", correct: true, text: "鳥", audioSrc: "/jp_bird.mp3" },
            { challengeId: 39, imageSrc: "/dog.svg", correct: false, text: "犬", audioSrc: "/jp_dog.mp3" },
            { challengeId: 39, imageSrc: "/cat.svg", correct: false, text: "猫", audioSrc: "/jp_cat.mp3" },
        ]);
        
        await db.insert(schema.challengeOptions).values([ // JP - Unit 1 Lesson 4
            { challengeId: 40, imageSrc: "/jp_ru.svg", correct: false, text: "", audioSrc: "/jp_ru.mp3" },
            { challengeId: 40, imageSrc: "/jp_re.svg", correct: true, text: "", audioSrc: "/jp_re.mp3" },
            { challengeId: 40, imageSrc: "/jp_ro.svg", correct: false, text: "", audioSrc: "/jp_ro.mp3" },
            { challengeId: 40, imageSrc: "/jp_ri.svg", correct: false, text: "", audioSrc: "/jp_ri.mp3" },
        
            { challengeId: 41, imageSrc: "/jp_ri.svg", correct: true, text: "", audioSrc: "/jp_ri.mp3" },
            { challengeId: 41, imageSrc: "/jp_ra.svg", correct: false, text: "", audioSrc: "/jp_ra.mp3" },
            { challengeId: 41, imageSrc: "/jp_ru.svg", correct: false, text: "", audioSrc: "/jp_ru.mp3" },
            { challengeId: 41, imageSrc: "/jp_ro.svg", correct: false, text: "", audioSrc: "/jp_ro.mp3" },
        
            { challengeId: 42, imageSrc: "/jp_ro.svg", correct: false, text: "", audioSrc: "/jp_ro.mp3" },
            { challengeId: 42, imageSrc: "/jp_re.svg", correct: false, text: "", audioSrc: "/jp_re.mp3" },
            { challengeId: 42, imageSrc: "/jp_ra.svg", correct: true, text: "", audioSrc: "/jp_ra.mp3" },
            { challengeId: 42, imageSrc: "/jp_ru.svg", correct: false, text: "", audioSrc: "/jp_ru.mp3" },

            { challengeId: 43, imageSrc: "/jp_re.svg", correct: false, text: "", audioSrc: "/jp_re.mp3" },
            { challengeId: 43, imageSrc: "/jp_ri.svg", correct: false, text: "", audioSrc: "/jp_ri.mp3" },
            { challengeId: 43, imageSrc: "/jp_ra.svg", correct: false, text: "", audioSrc: "/jp_ra.mp3" },
            { challengeId: 43, imageSrc: "/jp_ru.svg", correct: true, text: "", audioSrc: "/jp_ru.mp3" },

            { challengeId: 44, imageSrc: "/jp_ri.svg", correct: false, text: "", audioSrc: "/jp_ri.mp3" },
            { challengeId: 44, imageSrc: "/jp_ro.svg", correct: true, text: "", audioSrc: "/jp_ro.mp3" },
            { challengeId: 44, imageSrc: "/jp_re.svg", correct: false, text: "", audioSrc: "/jp_re.mp3" },
            { challengeId: 44, imageSrc: "/jp_ra.svg", correct: false, text: "", audioSrc: "/jp_ra.mp3" },

            { challengeId: 45, imageSrc: "/jp_mu.svg", correct: false, text: "", audioSrc: "/jp_mu.mp3" },
            { challengeId: 45, imageSrc: "/jp_me.svg", correct: false, text: "", audioSrc: "/jp_me.mp3" },
            { challengeId: 45, imageSrc: "/jp_mo.svg", correct: false, text: "", audioSrc: "/jp_mo.mp3" },
            { challengeId: 45, imageSrc: "/jp_mi.svg", correct: true, text: "", audioSrc: "/jp_mi.mp3" },

            { challengeId: 46, imageSrc: "/jp_mo.svg", correct: false, text: "", audioSrc: "/jp_mo.mp3" },
            { challengeId: 46, imageSrc: "/jp_me.svg", correct: true, text: "", audioSrc: "/jp_me.mp3" },
            { challengeId: 46, imageSrc: "/jp_ma.svg", correct: false, text: "", audioSrc: "/jp_ma.mp3" },
            { challengeId: 46, imageSrc: "/jp_mu.svg", correct: false, text: "", audioSrc: "/jp_mu.mp3" },

            { challengeId: 47, imageSrc: "/jp_mi.svg", correct: false, text: "", audioSrc: "/jp_mi.mp3" },
            { challengeId: 47, imageSrc: "/jp_ma.svg", correct: true, text: "", audioSrc: "/jp_ma.mp3" },
            { challengeId: 47, imageSrc: "/jp_me.svg", correct: false, text: "", audioSrc: "/jp_me.mp3" },
            { challengeId: 47, imageSrc: "/jp_mu.svg", correct: false, text: "", audioSrc: "/jp_mu.mp3" },

            { challengeId: 48, imageSrc: "/jp_ma.svg", correct: false, text: "", audioSrc: "/jp_ma.mp3" },
            { challengeId: 48, imageSrc: "/jp_mo.svg", correct: false, text: "", audioSrc: "/jp_mo.mp3" },
            { challengeId: 48, imageSrc: "/jp_mi.svg", correct: false, text: "", audioSrc: "/jp_mi.mp3" },
            { challengeId: 48, imageSrc: "/jp_mu.svg", correct: true, text: "", audioSrc: "/jp_mu.mp3" },

            { challengeId: 49, imageSrc: "/jp_ma.svg", correct: false, text: "", audioSrc: "/jp_ma.mp3" },
            { challengeId: 49, imageSrc: "/jp_me.svg", correct: false, text: "", audioSrc: "/jp_me.mp3" },
            { challengeId: 49, imageSrc: "/jp_mi.svg", correct: false, text: "", audioSrc: "/jp_mi.mp3" },
            { challengeId: 49, imageSrc: "/jp_mo.svg", correct: true, text: "", audioSrc: "/jp_mo.mp3" },
        
            { challengeId: 50, imageSrc: "/house.svg", correct: true, text: "家", audioSrc: "/jp_house.mp3" },
            { challengeId: 50, imageSrc: "/book.svg", correct: false, text: "本", audioSrc: "/jp_book.mp3" },
            { challengeId: 50, imageSrc: "/car.svg", correct: false, text: "車", audioSrc: "/jp_car.mp3" },
            
        ]);

        await db.insert(schema.challengeOptions).values([ // JP - Unit 1 Lesson 5
            { challengeId: 51, imageSrc: "/jp_ya.svg", correct: true, text: "", audioSrc: "/jp_ya.mp3" },
            { challengeId: 51, imageSrc: "/jp_yo.svg", correct: false, text: "", audioSrc: "/jp_yo.mp3" },
            { challengeId: 51, imageSrc: "/jp_n.svg", correct: false, text: "", audioSrc: "/jp_n.mp3" },
            { challengeId: 51, imageSrc: "/jp_wa.svg", correct: false, text: "", audioSrc: "/jp_wa.mp3" },

            { challengeId: 52, imageSrc: "/jp_yu.svg", correct: false, text: "", audioSrc: "/jp_yu.mp3" },
            { challengeId: 52, imageSrc: "/jp_yo.svg", correct: false, text: "", audioSrc: "/jp_yo.mp3" },
            { challengeId: 52, imageSrc: "/jp_wa.svg", correct: true, text: "", audioSrc: "/jp_wa.mp3" },
            { challengeId: 52, imageSrc: "/jp_wo.svg", correct: false, text: "", audioSrc: "/jp_wo.mp3" },

            { challengeId: 53, imageSrc: "/jp_yu.svg", correct: false, text: "", audioSrc: "/jp_yu.mp3" },
            { challengeId: 53, imageSrc: "/jp_ya.svg", correct: false, text: "", audioSrc: "/jp_ya.mp3" },
            { challengeId: 53, imageSrc: "/jp_wo.svg", correct: false, text: "", audioSrc: "/jp_wo.mp3" },
            { challengeId: 53, imageSrc: "/jp_n.svg", correct: true, text: "", audioSrc: "/jp_n.mp3" },

            { challengeId: 54, imageSrc: "/jp_yo.svg", correct: false, text: "", audioSrc: "/jp_yo.mp3" },
            { challengeId: 54, imageSrc: "/jp_yu.svg", correct: true, text: "", audioSrc: "/jp_yu.mp3" },
            { challengeId: 54, imageSrc: "/jp_wa.svg", correct: false, text: "", audioSrc: "/jp_wa.mp3" },
            { challengeId: 54, imageSrc: "/jp_n.svg", correct: false, text: "", audioSrc: "/jp_n.mp3" },

            { challengeId: 55, imageSrc: "/jp_ya.svg", correct: false, text: "", audioSrc: "/jp_ya.mp3" },
            { challengeId: 55, imageSrc: "/jp_yo.svg", correct: false, text: "", audioSrc: "/jp_yo.mp3" },
            { challengeId: 55, imageSrc: "/jp_yu.svg", correct: false, text: "", audioSrc: "/jp_yu.mp3" },
            { challengeId: 55, imageSrc: "/jp_wo.svg", correct: true, text: "", audioSrc: "/jp_wo.mp3" },

            { challengeId: 56, imageSrc: "/jp_yo.svg", correct: true, text: "", audioSrc: "/jp_yo.mp3" },
            { challengeId: 56, imageSrc: "/jp_n.svg", correct: false, text: "", audioSrc: "/jp_n.mp3" },
            { challengeId: 56, imageSrc: "/jp_wo.svg", correct: false, text: "", audioSrc: "/jp_wo.mp3" },
            { challengeId: 56, imageSrc: "/jp_wa.svg", correct: false, text: "", audioSrc: "/jp_wa.mp3" },

            { challengeId: 57, imageSrc: "/house.svg", correct: true, text: "家", audioSrc: "/jp_house.mp3" },
            { challengeId: 57, imageSrc: "/book.svg", correct: false, text: "本", audioSrc: "/jp_book.mp3" },
            { challengeId: 57, imageSrc: "/car.svg", correct: false, text: "車", audioSrc: "/jp_car.mp3" },
        ]);

        console.log("Seeding Finished!");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to seed the database");
    }
};

main();

// MAKE SURE TO INCLUDE A / WITH ANY SOURCE. When you don't, it will only work with the initial lesson, not the practice

// Let's make the order random to spice it up each time someone retries a lesson. Maybe find a way to scramble the order in which the cards are placed