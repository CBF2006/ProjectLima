import Image from "next/image";
import { InfinityIcon, X } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { useExitModal } from "@/store/use-exit-modal"

import { useEffect, useState, useRef } from "react";
import { clear } from "console";

type Props = {
    hearts: number;
    percentage: number;
    hasActiveSubscription: boolean;
};

export const Header = ({
    hearts,
    percentage,
    hasActiveSubscription,
}: Props) => {
    const { open } = useExitModal();
    const [glow, setGlow] = useState(false);
    const prevPercentageRef = useRef(percentage);

    useEffect(() => {
        const prev = prevPercentageRef.current;
    
        if (percentage > prev) {
          setGlow(true);
          const timeout = setTimeout(() => setGlow(false), 700);
          return () => clearTimeout(timeout);
        }
    
        prevPercentageRef.current = percentage;
      }, [percentage]);

    return (
        <header className="lg:pt-[50px] pt-[20px] px-10 flex gap-x-7 items-center justify-between max-w-[1140px] mx-auto w-full">
            <X 
                onClick={open} // TODO: Add onClick exit
                className="text-slate-500 hover:opacity-75 transition cursor-pointer"
            />
            <Progress value={percentage} glow={glow} />
            <div className="text-brand-accent flex items-center font-bold">
                <Image 
                    src="/heart.svg"
                    height={28}
                    width={28}
                    alt="Heart"
                    className="mr-2"
                />
                {hasActiveSubscription
                    ? <InfinityIcon className="h-6 w-6 stroke-[3] shrink-0" />
                    : hearts
                }
            </div>
        </header>
    );
};

// Color for the Progress bar is in /components/ui/progress.tsx