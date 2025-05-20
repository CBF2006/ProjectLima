import { redirect } from "next/navigation";

import { Promo } from "@/components/promo";
import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { lessons, units as unitsSchema} from "@/db/schema";
import { 
    getCourseProgress, 
    getLessonPercentage, 
    getUnits, 
    getUserProgress, 
    getUserSubscription,
    getUserStreak,
    getLongestStreak,
    getStreakFreezes
} from "@/db/queries";

import { Header } from "./header";
import { Unit } from "./unit";
import { Quests } from "@/components/quests";
import { get } from "http";

// Sidebar Icon Hex: #22d3ee

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const unitsData = getUnits();
    const userSubscriptionData = getUserSubscription();
    const userStreak = getUserStreak();
    const longestStreak = getLongestStreak();
    const freezesAvailable = getStreakFreezes();

    const [
        userProgress,
        units,
        courseProgress,
        lessonPercentage,
        userSubscription,
        streak,
        longest,
        freezes,
    ] = await Promise.all([
        userProgressData,
        unitsData,
        courseProgressData,
        lessonPercentageData,
        userSubscriptionData,
        userStreak,
        longestStreak,
        freezesAvailable,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress) {
        redirect("/courses");
    }

    const isPro = !!userSubscription?.isActive;

    return ( // Try and remove flex-row-reverse and flip sticky and feed wrapper's postion in the code
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
                <Header title={userProgress.activeCourse.title} />
                {units.map((unit) => (
                    <div key={unit.id} className="mb-10">
                        <Unit 
                            id={unit.id}
                            order={unit.order}
                            description={unit.description}
                            title={unit.title}
                            lessons={unit.lessons}
                            activeLesson={courseProgress.activeLesson}
                            activeLessonPercentage={lessonPercentage}
                            color={unit.color}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;