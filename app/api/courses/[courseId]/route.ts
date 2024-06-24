import db from "@/db/drizzle"
import { courses } from "@/db/schema"
import { getIsAdmin } from "@/lib/admin";
import { eq } from "drizzle-orm"
import { NextResponse } from "next/server";

export const GET = async (
    req: Request,
    { params }: { params: { courseId: number } },
) => {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    const data = await db.update(courses).set({
        ...body
    }).where(eq(courses.id, params.courseId)).returning();

    return NextResponse.json(data);
};

export const DELETE = async (
    req: Request,
    { params }: { params: { courseId: number } },
) => {
    const isAdmin = getIsAdmin();

    if (!isAdmin) {
        return new NextResponse("Unauthorized", { status: 403 });
    }

    const data = await db.delete(courses)
        .where(eq(courses.id, params.courseId)).returning();

    return NextResponse.json(data);
};

// You should do a authorization check in everywhere you access it just to make sure security is tight