"use client";

import TopicSection from "./topic-section";

const japaneseVideos = [
  { videoId: "dQw4w9WgXcQ", title: "Japanese Alphabet" },
  { videoId: "ScMzIvxBSi4", title: "Japanese Greetings" },
];

const koreanVideos = [
  { videoId: "tgbNymZ7vqY", title: "Learn Hangul" },
  { videoId: "2Z4m4lnjxkY", title: "Korean Phrases" },
];

export const VideoList = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <TopicSection title="Japanese" videos={japaneseVideos} />
      <TopicSection title="Korean" videos={koreanVideos} />
    </div>
  );
};