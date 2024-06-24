import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { challengeOptions } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 }); // 403: Forbidden https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses | Only admins can fetch data because of this clause
    }

    const data = await db.query.challengeOptions.findMany();

    return NextResponse.json(data);
};

export const POST = async (req: Request) => {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 }); // 403: Forbidden https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses | Only admins can fetch data because of this clause
    }

    const body = await req.json();

    const data = await db.insert(challengeOptions).values({
        ...body,
    }).returning();

    return NextResponse.json(data[0]);
};