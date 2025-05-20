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
        const hoverShade = Math.min(+shade + 100, 900);
      
        return {
          base: `bg-${color}-${shade}`,
          hover: `hover:bg-${color}-${hoverShade}`,
          border: `border-${color}-600`,
        };
      };
      
    const { base, hover, border } = generateColorClasses(colorClass);
      

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
                variant="lesson"
                className={"hidden xl:flex border-2 border-b-4 active:border-b-2 ${base} ${hover} ${border}"} // Hover not working
                >
                    <NotebookText className="mr-2" />
                    Continue
                </Button>
            </Link>
        </div>
    );
}