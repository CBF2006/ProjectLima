import { redirect } from "next/navigation";

import { getTopUsers, getUserProgress, getUserSubscription, getUserStreak, getLongestStreak, getStreakFreezes } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import Link from "next/link";

const LeaderboardPage = async () => {
    const userProgressData = getUserProgress();
    const userSubscriptionData = getUserSubscription();
    const leaderboardData = getTopUsers();
    const userStreak = getUserStreak();
    const longestStreak = getLongestStreak();
    const freezesAvailable = getStreakFreezes();

    const [
        userProgress,
        userSubsciption,
        leaderboard,
        streak,
        longest,
        freezes,
    ] = await Promise.all([
        userProgressData,
        userSubscriptionData,
        leaderboardData,
        userStreak,
        longestStreak,
        freezesAvailable,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    const isPro = !!userSubsciption?.isActive; // We have to boolean-ify it twice because it could return null which would be bad
    
    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={isPro}
                    currentStreak={streak?.currentStreak ?? 0}
                    longestStreak={longest ?? 0}
                    freezesAvailable={freezes ?? 0}
                />
                {!isPro && (
                    <Promo />
                )}
                <Quests points={userProgress.points} />
            </StickyWrapper>
            <FeedWrapper>
                <div className="w-full flex flex-col items-center">
                    <Image 
                        src="/leaderboard.svg"
                        alt="Leaderboard"
                        height={90}
                        width={90}
                    />
                    <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                        Leaderboard
                    </h1>
                    <p className="text-muted-foreground text-center text-lg mb-6">
                        See where you stand among other learners in the community.
                    </p>
                    <Separator className="mb-4 h-0.5 rounded-full" />
                    {leaderboard.map((userProgress, index) => ( // => ( is an IMMEDIATE RETURN
                        <Link
                            key={userProgress.userId}
                            href={`/profile/${userProgress.userId}`}
                            className="w-full group"
                        >
                            <div 
                                key={userProgress.userId}
                                className="flex items-center w-full p-2 px-4 rounded-xl transition-all duration-200 group-hover:bg-muted/50 group-hover:scale-[1.01]"
                            >
                                <p className="font-bold text-line-700 mr-4">{index + 1}</p>
                                <Avatar
                                    className="border bg-green-500 h-12 w-12 ml-3 mr-6"
                                >
                                    <AvatarImage 
                                        className="object-cover"
                                        src={userProgress.userImageSrc}
                                    />
                                </Avatar>
                                <p className="font-bold text-neutral-800 flex-1">
                                    {userProgress.userName}
                                </p>
                                <p className="text-muted-foreground">
                                    {userProgress.points} XP
                                </p>
                            </div>
                        </Link>   
                    ))}
                </div>
            </FeedWrapper>
        </div>
    );
};

export default LeaderboardPage;