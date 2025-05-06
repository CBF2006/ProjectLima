import Image from "next/image";
import { useCallback } from "react";
import { useAudio, useKey } from "react-use";

import { cn } from "@/lib/utils";
import { challenges } from "@/db/schema";

type Props = {
    id: number;
    imageSrc: string | null;
    audioSrc: string | null;
    text: string | null;
    shortcut: string;
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
    status?: "correct" | "wrong" | "none";
    type: typeof challenges.$inferSelect["type"];
}

export const Card = ({
    id,
    imageSrc,
    audioSrc,
    text,
    shortcut,
    selected,
    onClick,
    status,
    disabled,
    type,
}: Props) => {
    const [audio, _, controls] = useAudio({ src: audioSrc || "" });

    const isAssistLike = type === "ASSIST" || type === "LISTEN_ASSIST";
    const isListenLike = type === "LISTEN_SELECT" || type === "LISTEN_ASSIST";

    const handleClick = useCallback(() => {
        if (disabled) return;

        controls.play();
    
        onClick();
    }, [disabled, onClick, controls, isListenLike]);

    useKey(shortcut, handleClick, {}, [handleClick]); // HANDLES PRESSING 1,2,3,4 OMGGGG YESSSSS

    return (
        <div
            onClick={handleClick}
            className={cn(
                "h-full border-2 rounded-xl border-b-4 border-neutral-500 hover:bg-black/5 p-4 lg:p-6 cursor-pointer active:border-b-2",
                selected && "border-sky-300 bg-sky-100 hover:bg-sky-100",
                selected && status === "correct" && "border-green-300 bg-green-100 hover:bg-green-100",
                selected && status === "wrong" && "border-rose-300 bg-rose-100 hover:bg-rose-100",
                disabled && "pointer-events-none hover:bg-white",
                type === "ASSIST" && "lg:p-3 w-full"
            )}
        >
            {audio}

            {imageSrc && (
                <div
                    className={cn(
                        "relative aspect-square mb-4 max-h-[80px] lg:max-h-[150px] w-full",
                        !text && "flex justify-center items-center"
                    )}
                >
                    <Image src={imageSrc} fill alt={imageSrc} />
                </div>
            )}
            {text ? (
                <div className={cn(
                    "flex items-center justify-between",
                    isAssistLike && "flex-row-reverse",
                )}>
                    {isAssistLike && <div />}
                    <p className={cn(
                        "text-neutral-800 text-sm lg:text-base font-semibold",
                        selected && "text-sky-500",
                        selected && status === "correct" && "text-green-500",
                        selected && status === "wrong" && "text-rose-500",
                    )}>
                        {text}
                    </p>
                    <div>
                        {shortcut}
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <div className={cn (
                        "lg:w-[30px] lg:h-[30px] w-[20px] h-[20px] border-2 border-neutral-500 flex items-center justify-center rounded-lg text-neutral-800 lg:text-[15px] text-xs font-semibold",
                        selected && "border-sky-300 text-sky-500",
                        selected && status === "correct" && "border-green-500 text-green-500",
                        selected && status === "wrong" && "border-rose-500 text-rose-500",
                    )}>
                        {shortcut}
                    </div>
                </div>
            )}
        </div>
    );
};
