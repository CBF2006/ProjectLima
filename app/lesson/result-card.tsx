import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
    value: number;
    variant: "points" | "hearts" | "streak";
};

export const ResultCard = ({ value, variant }: Props) => {
    const imageSrc =
        variant === "points"
            ? "/points.svg"
            : variant === "hearts"
            ? "/heart.svg"
            : "/streak.svg"; // Add your streak icon here

    return (
        <div
            className={cn(
                "rounded-2xl border-2 w-full",
                variant === "points" && "bg-indigo-500 border-indigo-500",
                variant === "hearts" && "bg-brand-accent border-brand-accent",
                variant === "streak" && "bg-orange-400 border-orange-500"
            )}
        >
            <div
                className={cn(
                    "p-1.5 text-white rounded-t-xl font-bold text-center uppercase text-xs",
                    variant === "points" && "bg-indigo-500",
                    variant === "hearts" && "bg-brand-accent",
                    variant === "streak" && "bg-orange-500"
                )}
            >
                {variant === "hearts"
                    ? "Gems Left"
                    : variant === "points"
                    ? "Total Jellies"
                    : "Streak"}
            </div>
            <div
                className={cn(
                    "rounded-2xl bg-white items-center flex justify-center p-6 font-bold text-lg",
                    variant === "hearts" && "text-brand-accent",
                    variant === "points" && "text-indigo-500",
                    variant === "streak" && "text-orange-500"
                )}
            >
                <Image
                    alt="Icon"
                    src={imageSrc}
                    height={30}
                    width={30}
                    className="mr-1.5"
                />
                {value}
            </div>
        </div>
    );
};