"use client";

import Link from "next/link";
import { Check, Crown, Star } from "lucide-react";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import "react-circular-progressbar/dist/styles.css";

type Props = {
    id: number;
    index: number;
    totalCount: number;
    locked?: boolean;
    current?: boolean;
    percentage: number;
    color?: string | null;
};

export const LessonButton = ({
    id,
    index,
    totalCount,
    locked,
    current,
    percentage,
    color,
}: Props) => {
    const cycleLength = 8;
    const cycleIndex = index % cycleLength;

    let indentationLevel;

    if (cycleIndex <= 2) {
        indentationLevel = cycleIndex;
    }   else if (cycleIndex <= 4) {
        indentationLevel = 4 - cycleIndex;
    }   else if (cycleIndex <= 6) {
        indentationLevel = 4 - cycleIndex;
    }   else {
        indentationLevel = cycleIndex - 8;
    }

    const rightPosition = indentationLevel * 40; // Can change 40 if you want

    const isFirst = index === 0;
    const isLast = index === totalCount;
    const isCompleted = !current && !locked;

    const Icon = isCompleted ? Check : isLast ? Crown : Star;

    const href = isCompleted ? `/lesson/${id}` : "/lesson";

    const colorMap: Record<string, string> = {
        "bg-red-500": "#EF4444",
        "bg-green-500": "#22C55E",
        "bg-yellow-500": "#FBBF24",
        "bg-brandFlat": "#7DD8E2",
        "bg-brand": "#7DD8E2",
      };

    const colorClass = color === "brand" ? "bg-brandFlat" : (color ?? "bg-brandFlat");
    const strokeColor = colorMap[color ?? "bg-brandFlat"] ?? "#7DD8E2";

    const generateColorClasses = (bgClass: string) => {
        const match = bgClass.match(/^bg-([a-z]+)-(\d{3})$/);
        if (!match) {
          return {
            base: bgClass,
            hover: "",
            border: "",
          };
        }
      
        const [, color, shade] = match;
        return {
          base: `bg-${color}-${shade}`,
          hover: `hover:bg-${color}-${+shade + 100}/90`,
          border: `border-${color}-600`,
        };
      };

    const { base, hover, border } = generateColorClasses(colorClass);

    console.log({ base, hover, border });

    return (
        <Link 
        href={href} 
        aria-disabled={locked} 
        style={{ pointerEvents: locked ? "none" : "auto" }}
        >
            <div
                className="relative"
                style={{
                    right: `${rightPosition}px`,
                    marginTop: isFirst && !isCompleted ? 60 : 24,
                }}
            >
                {current ? (
                    <div className="h-[102px] w-[102px] relative">
                        <div 
                            className="absolute -top-6 left-2.5 px-3 py-2.5 border-2 font-bold uppercase bg-white rounded-xl animate-bounce tracking-wide z-10"
                            style={{color: strokeColor}}
                            >
                            Start
                            <div style={{color: color ?? "brand"}}
                                className="absolute left-1/2 -bottom-2 w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -translate-x-1/2"
                            />
                        </div>
                        <CircularProgressbarWithChildren
                            value={Number.isNaN(percentage) ? 0 : percentage}
                            styles={{
                                path: {
                                    stroke: strokeColor,
                                },
                                trail: {
                                    stroke: "#e5e7eb",
                                },
                            }}
                        >
                            <Button
                                size="rounded"
                                variant={locked ? "locked" : "lesson"}
                                className={cn(
                                    "h-[70px] w-[70px] border-b-8",
                                    !locked && base,
                                    !locked && hover,
                                    !locked && border
                                )}
                            >

                                <Icon 
                                    className={cn (
                                        "h-10 w-10",
                                        locked? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                        : "fill-primary-foreground text-primary-foreground",
                                        isCompleted && "fill-none stroke-[4]"
                                    )}
                                />
                            </Button>
                        </CircularProgressbarWithChildren>
                    </div>  
                ) : (
                    <Button
                            size="rounded"
                            variant={locked ? "locked" : "secondary"}
                            className="h-[70px] w-[70px] border-b-8"
                        >
                            <Icon 
                                className={cn (
                                    "h-10 w-10",
                                    locked? "fill-neutral-400 text-neutral-400 stroke-neutral-400"
                                     : "fill-primary-foreground text-primary-foreground",
                                    isCompleted && "fill-none stroke-[4]"
                                )}
                            />
                        </Button>
                )}
            </div>
        </Link>
    )
}