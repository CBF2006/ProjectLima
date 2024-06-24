import { NextResponse } from "next/server";

import db from "@/db/drizzle";
import { courses } from "@/db/schema";
import { getIsAdmin } from "@/lib/admin";

export const GET = async () => {
    try {
        const isAdmin = getIsAdmin();

        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const data = await db.query.courses.findMany();

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching courses:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};

export const POST = async (req: Request) => {
    try {
        const isAdmin = getIsAdmin();

        if (!isAdmin) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const body = await req.json();

        const data = await db.insert(courses).values({
            ...body,
        }).returning();

        return NextResponse.json(data[0]);
    } catch (error) {
        console.error("Error creating course:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
