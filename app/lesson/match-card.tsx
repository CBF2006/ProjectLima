import { cn } from "@/lib/utils";
import { useAudio } from "react-use";

type MatchCardProps = {
    id: number;
    text: string;
    audioSrc?: string | null;
    selected?: boolean;
    matched?: boolean;
    incorrect?: boolean;
    onClick: () => void;
};

const MatchCard = ({
    text,
    audioSrc,
    selected,
    matched,
    incorrect,
    onClick,
}: MatchCardProps) => {
    const [audio, , controls] = useAudio({ src: audioSrc || "" });
    const handleClick = () => {
        if (audioSrc) controls.play();
        onClick();
    };

    return (
        <div
            onClick={handleClick}
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === "Enter") handleClick();
            }}
            className={cn(
                "cursor-pointer rounded-xl border-2 border-b-4 p-4 lg:p-6 text-base font-semibold text-center transition-all",
                "hover:bg-white/40",
                matched
                    ? "bg-green-300/30 text-green-800 border-green-300"
                    : incorrect
                    ? "bg-rose-300/30 text-rose-800 border-rose-300"
                    : selected
                    ? "bg-sky-300/30 text-sky-800 border-sky-300"
                    : "bg-white/30 text-neutral-800 border-neutral-300"
            )}
        >
            {audio}
            {text}
        </div>
    );
};

export default MatchCard;