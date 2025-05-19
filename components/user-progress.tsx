import Link from "next/link";
import Image from "next/image";
import { InfinityIcon } from "lucide-react";

import { courses } from "@/db/schema";
import { Button } from "./ui/button";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
    activeCourse: typeof courses.$inferSelect; // TODO: Replace with DB types
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
    currentStreak: number;
    longestStreak: number;
    freezesAvailable: number;
};

export const UserProgress = ({
    activeCourse, 
    points, 
    hearts, 
    hasActiveSubscription,
    currentStreak,
    longestStreak,
    freezesAvailable,
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
            <Popover>
                <PopoverTrigger asChild>
                    <Button 
                        variant="ghost" 
                        className={cn(
                            currentStreak > 0 ? "text-orange-500" : "text-neutral-500"
                        )}
                    >
                        <Image 
                            src={
                                currentStreak > 0
                                    ? "streak.svg"
                                    : "no-streak.svg"
                            }
                            alt="Streak"
                            className="mr-2"
                            width={18}
                            height={18}
                        />
                        {currentStreak}
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="w-64">
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image src={currentStreak > 0 ? "/streak.svg" : "/no-streak.svg"} alt="Current Streak" width={24} height={24} />
                            <span className="text-sm font-semibold">Current Streak</span>
                        </div>
                        <span className={cn(
                            "font-bold",
                            currentStreak > 0 ? "text-orange-500" : "text-neutral-500"
                        )}>
                            {currentStreak}
                        </span>
                        </div>

                        <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image src={longestStreak > 0 ? "/streak.svg" : "/no-streak.svg"} alt="Longest Streak" width={24} height={24} />
                            <span className="text-sm text-muted-foreground font-semibold">Longest Streak</span>
                        </div>
                        <span className={cn(
                            "font-bold",
                            longestStreak > 0 ? "text-orange-500" : "text-neutral-500"
                        )}>
                            {longestStreak}
                        </span>
                        </div>

                        <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image src="/freeze.svg" alt="Streak Freezes" width={24} height={24} />
                            <span className="text-sm text-muted-foreground font-semibold">Freezes Available</span>
                        </div>
                        <span className="font-bold text-blue-500">{freezesAvailable}</span>
                        </div>
                        <div className="w-full">
                            <Link href={"/shop"}>
                                <Button variant={"ghost"}>
                                    Get More Freezes
                                </Button>
                            </Link>
                        </div>
                    </div>
                </PopoverContent>

            </Popover>
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