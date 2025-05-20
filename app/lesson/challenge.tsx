
import { useState, useMemo, useEffect } from "react";
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
  onMatchComplete,
}: Props) => {
  if (type === "MATCH") {
    const [selectedPromptId, setSelectedPromptId] = useState<number | null>(null);
    const [matches, setMatches] = useState<Record<string, boolean>>({});
    const [wrongIds, setWrongIds] = useState<{ promptId: number | null; responseId: number | null }>({
      promptId: null,
      responseId: null,
    });
    const [hadIncorrectAttempt, setHadIncorrectAttempt] = useState(false);

    const [cardsDisabled, setCardsDisabled] = useState(false);

    useEffect(() => {
      if (status === "none") {
        setWrongIds({ promptId: null, responseId: null });
        setCardsDisabled(false);
        setHadIncorrectAttempt(false);
        setSelectedPromptId(null);
      }
    }, [status]);

    const prompts = options.filter((opt) => opt.isPrompt);
    const responses = useMemo(
      () => options.filter((opt) => !opt.isPrompt).sort(() => Math.random() - 0.5),
      [options]
    );

    const getMatchId = (id: number) => options.find((opt) => opt.id === id)?.matchId;

    const handleResponseClick = (responseId: number) => {
      if (selectedPromptId === null) return;

      const prompt = options.find((opt) => opt.id === selectedPromptId);
      const response = options.find((opt) => opt.id === responseId);

      const promptMatchId = prompt?.matchId;
      const responseMatchId = response?.matchId;

      const isCorrect = promptMatchId && responseMatchId && promptMatchId === responseMatchId;

      if (isCorrect && !matches[promptMatchId]) {
        const updated = { ...matches, [promptMatchId]: true };
        setMatches(updated);
        setWrongIds({ promptId: null, responseId: null });

        const allMatched = prompts.every((p) => updated[p.matchId ?? ""]);
        if (allMatched) {
          onSelect(hadIncorrectAttempt ? -2 : -1);
        }
      } else {
        setHadIncorrectAttempt(true);
        setWrongIds({ promptId: selectedPromptId, responseId });
        setCardsDisabled(true);
        onSelect(-2);
      };
    };


    return (
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          {prompts.map((item) => {
            const isMatched = !!matches[item.matchId ?? ""];
            const isIncorrect = wrongIds.promptId === item.id;
            return (
              <MatchCard
                key={item.id}
                id={item.id}
                text={item.text ?? ""}
                audioSrc={item.audioSrc}
                selected={selectedPromptId === item.id}
                matched={isMatched}
                incorrect={isIncorrect}
                onClick={() => {
                  if (!isMatched && !cardsDisabled) {
                    setSelectedPromptId((prev) => (prev === item.id ? null : item.id));
                  }
                }}
              />
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {responses.map((item) => {
            const isMatched = !!matches[item.matchId ?? ""];
            const isIncorrect = wrongIds.responseId === item.id;
            return (
              <MatchCard
                key={item.id}
                id={item.id}
                text={item.text ?? ""}
                audioSrc={item.audioSrc}
                matched={isMatched}
                incorrect={isIncorrect}
                onClick={() => {
                  if (!isMatched && !cardsDisabled) handleResponseClick(item.id);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }

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
}