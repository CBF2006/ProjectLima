"use client";

import VideoEmbed from "./video-embed";

type TopicSectionProps = {
    title: string;
    videos: { videoId: string; title: string }[];
};

const TopicSection = ({ title, videos }: TopicSectionProps) => {
    return (
        <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">
                {title}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                    <VideoEmbed key={index} title={video.title} videoId={video.videoId} />
                ))}
            </div>
        </section>
    );
};

export default TopicSection;