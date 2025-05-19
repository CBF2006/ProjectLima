import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { challengeOptions, challenges } from "@/db/schema";

import { Card } from "./card";
import MatchCard from "./match-card";

type Props = {
  options: typeof challengeOptions.$inferSelect[];
  onSelect: (id: number) => void;
  status: "correct" | "wrong" | "none";
  selectedOption?: number;
  disabled?: boolean;
  type: typeof challenges.$inferSelect["type"];
  onMatchComplete?: () => void;
};

const layoutByType: Record<string, string> = {
  ASSIST: "grid-cols-1",
  LISTEN_ASSIST: "grid-cols-1",
  SELECT: "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
  LISTEN_SELECT: "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]",
  MATCH: "grid-cols-2", // handled manually below
};

export const Challenge = ({
  options,
  onSelect,
  status,
  selectedOption,
  disabled,
  type,
  onMatchComplete
}: Props) => {
  if (type === "MATCH") {
  const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
  const [matches, setMatches] = useState<Record<string, boolean>>({});

  const prompts = options.filter((opt) => opt.isPrompt);
  
  const responses = useMemo(() => {
    return options
      .filter((opt) => opt.isPrompt === false)
      .sort(() => Math.random() - 0.5);
  }, []);

  const getMatchId = (id: number) => options.find((opt) => opt.id === id)?.matchId;

  const handleResponseClick = (responseId: number) => {
    if (selectedPromptId === null) return;

    const promptMatchId = getMatchId(selectedPromptId);
    const responseMatchId = getMatchId(responseId);

    if (
      promptMatchId &&
      responseMatchId &&
      promptMatchId === responseMatchId &&
      !matches[promptMatchId] // make sure it's not already matched
    ) {
      setMatches((prev) => {
        const updated = { ...prev, [promptMatchId]: true };

        const allMatched = prompts.every((p) => updated[p.matchId ?? ""]);
        if (allMatched) {
          onMatchComplete?.();
        }

        return updated;
      });
    }

    setSelectedPromptId(null);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="flex flex-col gap-2">
        {prompts.map((item) => {
          const isMatched = !!matches[item.matchId ?? ""];
          return (
            <MatchCard
              key={item.id}
              id={item.id}
              text={item.text ?? ""}
              audioSrc={item.audioSrc}
              selected={selectedPromptId === item.id}
              matched={isMatched}
              onClick={() => {
                if (!isMatched) setSelectedPromptId(item.id);
              }}
            />
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        {responses.map((item) => {
          const isMatched = !!matches[item.matchId ?? ""];
          return (
            <MatchCard
              key={item.id}
              id={item.id}
              text={item.text ?? ""}
              audioSrc={item.audioSrc}
              matched={isMatched}
              onClick={() => {
                if (!isMatched) handleResponseClick(item.id);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}


  // Fallback for other challenge types
  return (
    <div className={cn("grid gap-2", layoutByType[type])}>
      {options.map((option, i) => (
        <Card
          key={option.id}
          id={option.id}
          text={option.text}
          imageSrc={option.imageSrc}
          shortcut={`${i + 1}`}
          selected={selectedOption === option.id}
          onClick={() => onSelect(option.id)}
          status={status}
          audioSrc={option.audioSrc}
          disabled={disabled}
          type={type}
        />
      ))}
    </div>
  );
};