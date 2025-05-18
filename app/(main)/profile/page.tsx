import Profile from "@/components/profile";
import { redirect } from "next/navigation";
import { getUserProgress, getUserStreak, getUserSubscription } from "@/db/queries";
import { FeedWrapper } from "@/components/feed-wrapper";
import { UserProgress } from "@/components/user-progress";
import { StickyWrapper } from "@/components/sticky-wrapper";
import { Promo } from "@/components/promo";
import { Quests } from "@/components/quests";
import Image from "next/image";



const ProfilePage = async () => {
  const userProgress = await getUserProgress();
  const userSubscription = await getUserSubscription();
  const userStreak = getUserStreak();

  const [streak] = await Promise.all([userStreak]);

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
          currentStreak={streak?.currentStreak ?? 0}
        />
        {!isPro && <Promo />}
        <Quests points={userProgress.points} />
      </StickyWrapper>
      <FeedWrapper>
        <Profile/>
      </FeedWrapper>
    </div>
  );
};

export default ProfilePage;
