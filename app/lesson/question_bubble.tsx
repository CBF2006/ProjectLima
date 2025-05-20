import Image from "next/image";

type Props = {
  question: string;
  fillText?: string | null;
};

export const QuestionBubble = ({ question, fillText }: Props) => {
  const rendered = question.replace(
    "{blank}",
    fillText
      ? `<span class="underline font-semibold">${fillText}</span>`
      : `<span class="inline-block min-w-[3rem] border-b-2 border-neutral-500 align-baseline">&nbsp;</span>`
  );

  return (
    <div className="flex items-center gap-x-4 mb-6">
      <Image
        src="/mascot.svg"
        alt="Mascot"
        width={60}
        height={60}
        className="hidden lg:block"
      />
      <Image
        src="/mascot.svg"
        alt="Mascot"
        width={40}
        height={40}
        className="block lg:hidden"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-base font-semibold text-neutral-800 border-neutral-500 max-w-[300px]">
  <span className="whitespace-pre-wrap">
    {question.split("{blank}").map((part, i, arr) => (
      <span key={i}>
        {part}
        {i < arr.length - 1 && (
          <span
  className={`inline-block align-baseline transition-all duration-300 ease-out ${
    fillText
      ? "text-green-600 animate-fade-in" // ✅ no underline when correct
      : "min-w-[3rem] border-b-2 border-neutral-500"
  }`}
>
  {fillText || "\u00A0\u00A0\u00A0"}
</span>

        )}
      </span>
    ))}
  </span>
</div>

    </div>
  );
};