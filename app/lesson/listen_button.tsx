import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Volume1Icon, Volume2Icon } from "lucide-react";
import { useAudio } from "react-use";

type Props = {
    audioSrc: string | null;
}

export const ListenButton = ({
    audioSrc,
}: Props) => {
    const [audio, state, controls] = useAudio({ src: audioSrc || "" });
    const [isPlaying, setIsPlaying] = useState(false);

    // Function to handle play button click
    const handlePlayClick = () => {
        controls.play();
    };

    // Effect to update isPlaying state based on audio playback state
    useEffect(() => {
        if (state.playing) {
            setIsPlaying(true);
        } else {
            setIsPlaying(false);
        }
    }, [state.playing]);

    return (
        <div>
            {/* Render audio component if audioSrc is provided */}
            {audio}

            {/* Render the play button with conditional icon */}
            <Button
                variant="primary"
                size="listen_lg"
                onClick={handlePlayClick} // Pass function reference to onClick
            >
                {isPlaying ? <Volume2Icon size={80} /> : <Volume1Icon size={80} />}
            </Button>
        </div>
    );
};

// Will need a different size volume icon for small. The default size should be fine (don't need to add size attribute)