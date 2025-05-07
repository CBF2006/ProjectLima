import { Button } from "@/components/ui/button";
import { NotebookText } from "lucide-react";
import Link from "next/link";

type Props = {
    title: string;
    description: string;
    color?: string | null;
};

export const UnitBanner = ({
    title,
    description,
    color,
}: Props) => {
    const colorClass = color === "brand" ? "bg-brandFlat" : (color ?? "bg-brandFlat");

    return (
        <div 
            className={`w-full rounded-xl p-5 text-white flex items-center justify-between ${colorClass}`}
        >

            <div className="space-y-2.5">
                <h3 className="text-2xl font-bold">
                    {title}
                </h3>
                <p className="text-lg">
                    {description}
                </p>
            </div>
            <Link href="/lesson">
                <Button
                size="lg"
                variant="secondary"
                className="hidden xl:flex border-2 border-b-4 active:border-b-2"
                >
                    <NotebookText className="mr-2" />
                    Continue
                </Button>
            </Link>
        </div>
    );
}