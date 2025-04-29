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
    <section className={`
      w-full sm:w-[355px] max-w-2xl flex flex-row justify-center gap-4
      ${type === "list" ? "border dark:border-[#323378] rounded-xl shadow p-4 sm:p-6 h-auto sm:h-[355px]" : "h-auto sm:h-[270px]"}
    `}>
      <div className="flex-1 w-full">
        {type === "list" && (
          <h3 className="text-base sm:text-lg font-semibold text-[#51A7E8] mb-2 px-2">
            {vocabularyName}
          </h3>
        )}
        <ul className="mb-2 max-h-72 overflow-hidden">
          {visibleWords.map((w) => (
            <li
              key={w.word}
              className="h-[33px] w-[240px] flex items-center justify-between px-2 border-b last:border-none hover:bg-[#F6FAFD] dark:hover:bg-[#18183B] rounded transition"
            >
              <span className="text-sm dark:fill-[#DFE7FF] dark:text-[#a2b5eb] font-semibold text-[#1A3365]">{w.word}</span>
              <span className="text-sm underline cursor-pointer text-[#51A7E8] tracking-wide">{w.translation}</span>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            className="px-2 block hyperlink cursor-pointer text-[#0000EE] underline text-sm font-medium"
          >
            Show more
          </button>
        )}
      </div>
      <div className="flex-shrink-0 flex items-center justify-center h-full">
        <VerticalProgressBar progress={progress} />
      </div>
    </section>
  );
}
