import { redirect } from "next/navigation";

import { FeedWrapper } from "@/components/feed-wrapper";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { UserProgress } from "@/components/user-progress";
import { getUserProgress } from "@/db/queries";

import { Header } from "./header";

// Sidebar Icon Hex: #22d3ee

const LearnPage = async () => {
    const userProgressData = getUserProgress();

    const [
        userProgress
    ] = await Promise.all([
        userProgressData
    ]);

    if (!userProgress || userProgress.activeCourse) {
        redirect("/courses");
    }

    return ( // Try and remove flex-row-reverse and flip sticky and feed wrapper's postion in the code
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress 
                    activeCourse={{ title: "Korean", imageSrc: "kr.svg" }}
                    hearts={5}
                    points={100}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title="Korean" />
            </FeedWrapper>
        </div>
    );
};

export default LearnPage;