import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, { schema });

const main = async () => {
    try {
        console.log("Wiping User Data...");

        await db.delete(schema.userProgress);
        await db.delete(schema.challengeProgress);
        await db.delete(schema.userSubscription);

        console.log("Wiping User Data Finished!");
    } catch (error) {
        console.error(error);
        throw new Error("Failed to wipe user data");
    }
};

main();

// MAKE SURE TO INCLUDE A / WITH ANY SOURCE. When you don't, it will only work with the initial lesson, not the practice