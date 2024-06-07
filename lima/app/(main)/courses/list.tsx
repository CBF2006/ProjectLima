"use client"

import { courses } from "@/db/schema"
import { Card } from "./card";

type Props = {
    courses: typeof courses.$inferSelect[];
    activeCourseID: number;
};

export const List = ({ courses, activeCourseID }: Props) => {
    return (
        <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(210px,1fr))]">
            {courses.map((course) => (
                <Card
                key={course.id}
                id={course.id}
                title={course.title}
                imageSrc={course.imageSrc}
                onClick={() => {}}
                disabled={false}
                active={course.id === activeCourseID}
                />
            ))}
        </div>
    );
};