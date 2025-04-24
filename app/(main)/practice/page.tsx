import { VideoList } from "@/components/video-list";
import { redirect } from "next/navigation";
import { getUserProgress, getUserSubscription } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import Image from "next/image";

const PracticePage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();

  if (!userProgress || !userProgress.activeCourse) {
    redirect("/courses");
  }

  const isPro = !!userSubscription?.isActive;

  return (
    <div className="flex flex-row-reverse gap-[48px] px-6">
      <StickyWrapper>
        <UserProgress
          activeCourse={userProgress.activeCourse}
          hearts={userProgress.hearts}
          points={userProgress.points}
          hasActiveSubscription={isPro}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <div className="w-full flex flex-col items-center">
            <Image 
                src="/practice.svg"
                alt="Practice"
                height={90}
                width={90}
            />
            <h1 className="text-center font-bold text-neutral-800 text-2xl my-6">
                Practice
            </h1>
            <p className="text-muted-foreground text-center text-lg mb-6">
                Learn more with content tailored to your interests and level.
            </p>
            
            <VideoList />
        </div>
      </FeedWrapper>
    </div>
  );
};

export default PracticePage;
