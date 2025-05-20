"use client";

import { toast } from "sonner";
import Image from "next/image";
import { useTransition } from "react";

import { Button } from "@/components/ui/button";
import { POINTS_TO_REFILL } from "@/constants";
import { refillHearts } from "@/actions/user-progress";
import { createStripeUrl } from "@/actions/user-subscription";
import { buyStreakFreeze } from "@/actions/streak";

const STREAK_FREEZE_COST = 300;

type Props = {
    hearts: number;
    points: number;
    hasActiveSubscription: boolean;
};

export const Items = ({ hearts, points, hasActiveSubscription }: Props) => {
    const [pending, startTransition] = useTransition();

    const onRefillHearts = () => {
        if (pending || hearts === 5 || points < POINTS_TO_REFILL) return;

        startTransition(() => {
            refillHearts().catch(() => toast.error("Something went wrong"));
        });
    };

    const onUpgrade = () => {
        startTransition(() => {
            createStripeUrl()
                .then((response) => {
                    if (response.data) {
                        window.location.href = response.data;
                    }
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    const onBuyStreakFreeze = () => {
        if (pending || points < STREAK_FREEZE_COST) return;

        startTransition(() => {
            buyStreakFreeze()
                .then(() => toast.success("Streak freeze added!"))
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <ul className="w-full">
            {/* Refill Hearts */}
            <div className="flex items-center w-full p-4 gap-x-4 border-t-2">
                <Image src="/heart.svg" alt="Heart" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Refill Hearts
                    </p>
                </div>
                <Button
                    onClick={onRefillHearts}
                    disabled={pending || hearts === 5 || points < POINTS_TO_REFILL}
                >
                    {hearts === 5 ? "full" : (
                        <div className="flex items-center">
                            <Image src="/points.svg" alt="Points" height={20} width={20} />
                            <p>{POINTS_TO_REFILL}</p>
                        </div>
                    )}
                </Button>
            </div>

            {/* Streak Freeze */}
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src="/freeze.svg" alt="Freeze" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Streak Freeze
                    </p>
                </div>
                <Button
                    onClick={onBuyStreakFreeze}
                    disabled={pending || points < STREAK_FREEZE_COST}
                >
                    <div className="flex items-center">
                        <Image src="/points.svg" alt="Points" height={20} width={20} />
                        <p>{STREAK_FREEZE_COST}</p>
                    </div>
                </Button>
            </div>

            {/* Subscription) */}
            <div className="flex items-center w-full p-4 pt-8 gap-x-4 border-t-2">
                <Image src="/unlimited.svg" alt="Unlimited" height={60} width={60} />
                <div className="flex-1">
                    <p className="text-neutral-700 text-base lg:text-xl font-bold">
                        Unlimited Hearts
                    </p>
                </div>
                <Button onClick={onUpgrade} disabled={pending}>
                    {hasActiveSubscription ? "settings" : "upgrade"}
                </Button>
            </div>
        </ul>
    );
};
