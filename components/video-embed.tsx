"use client";

type VideoEmbedProps = {
    title: string;
    videoId: string;
};

const VideoEmbed = ({ title, videoId }: VideoEmbedProps) => {
    return (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-md">
            <iframe
                className="top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </div>
    );
};

export default VideoEmbed;
