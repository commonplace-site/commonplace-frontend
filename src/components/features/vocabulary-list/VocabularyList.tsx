import { VocabWord } from "@/types/vocabulary";
import VerticalProgressBar from "../vertical-progress-bar/VerticalProgressBar";

export type VocabularyListProps = {
  vocabularyName: string;
  progress: number;
  words: VocabWord[];
  maxVisibleWords?: number;
  type: string;
};

export default function VocabularyList({
  vocabularyName,
  progress,
  words,
  maxVisibleWords = 7,
  type = 'widget'
}: VocabularyListProps) {
  const hasMore = words.length > maxVisibleWords;
  const visibleWords = hasMore ? words.slice(0, maxVisibleWords) : words;

  return (
    <div className={`
      w-full sm:w-[345px] max-w-2xl flex flex-row justify-center gap-4 container
      ${type === "list" ? "sm:h-[355px]" : "sm:h-[270px]"}
    `}>
      <div className="w-full">
        {type === "list" && (
          <h3 className="subtitle">
            {vocabularyName}
          </h3>
        )}
        <ul className="mb-2 max-h-72 overflow-hidden">
          {visibleWords.map((w) => (
            <li
              key={w.word}
              className="h-[33px] w-[255px] flex items-center justify-between px-2 border-b last:border-none hover:bg-[#18183B] rounded transition"
            >
              <span className="text-subtitle">{w.word}</span>
              <span className="underline cursor-pointer text-[#51A7E8] text-subtitle">{w.translation}</span>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            className="hyperlink cursor-pointer text-[#0000EE] underline text-description ml-2 mt-2"
          >
            Show more
          </button>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center justify-center h-full">
        <VerticalProgressBar progress={progress} />
      </div>
    </div>
  );
}
