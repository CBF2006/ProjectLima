import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "./ui/button";

type Props = {
    activeCourse: typeof courses.$inferSelect; // TODO: Replace with DB types
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const UserProgress = ({
    activeCourse, 
    points, 
    hearts, 
    hasActiveSubscription
 }: Props) => {
    return (
        <div className="flex items-center justify-between gap-x-2 w-full">
            <Link href="/courses">
                <Button variant="ghost">
                    <Image 
                        src={activeCourse.imageSrc}
                        alt={activeCourse.title}
                        className="rounded-md border"
                        width={32}
                        height={32}
                    />
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-orange-500">
                    <Image 
                        src="streak.svg" // Add in conditional logic based on duration of streak
                        alt="Streak"
                        className="mr-2"
                        width={18}
                        height={18}
                    />
                    1
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-indigo-500">
                    <Image 
                        src="points.svg"
                        alt="Jellies"
                        className="mr-2"
                        width={28}
                        height={28}
                    />
                    {points}
                </Button>
            </Link>
            <Link href="/shop">
                <Button variant="ghost" className="text-brand-accent">
                    <Image 
                        src="heart.svg"
                        alt="Gems"
                        className="mr-2"
                        width={22}
                        height={22}
                    />
                    {hasActiveSubscription 
                        ? <InfinityIcon className="h-4 w-4 stroke-[3]" />
                        : hearts
                    }
                </Button>
            </Link>
        </div>
    );
};