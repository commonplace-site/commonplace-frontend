'use client'

import Chonger from "@/components/chonger/Chonger";
// import ProgressChart from "@/components/progress-chart/ProgressChart";
// import VocabularyList from "@/components/vocabulary-list/VocabularyList";
import { useChongerStore } from "@/store/useChongerStore";
// import { useProgressStore } from "@/store/useProgressStore";
// import { useVocabularyStore } from "@/store/useVocabularyStore";

export default function Dashboard() {
  const sentences = useChongerStore((state) => state.sentences);
  const ignoredChars = useChongerStore((state) => state.ignoredChars);
  // const progress = useProgressStore((state) => state.progressList);
  // const vocabulary = useVocabularyStore((state) => state.vocabulary);

  return (
    <div className="container">
      {/* <h1 className="title">Dashboard</h1> */}
      {/* <section className="flex gap-4 p-4">
        <div className="w-[33%] container">
          <h1 className="title">Recent Vocabulary</h1>
          <p className="subtitle">Words you’ve been learning</p>
          {vocabulary && (
            <VocabularyList
              key={vocabulary.name}
              vocabularyName={vocabulary.name}
              progress={vocabulary.progress}
              words={vocabulary.words}
              type='widget'
            />
          )}
        </div>
        <div className="min-w-[64%] container">
          <h1 className="title">Learning Progress</h1>
          <p className="subtitle">Your language learning journey</p>
          <ProgressChart progress={progress} />
        </div>
      </section> */}
      <section>
        <h1 className="title">Chonger</h1>
        <p className="subtitle">
          Practice and analyze sentences. Hover over each character for quick info and explore i+1 examples to level up your skills.
        </p>
        <Chonger sentences={sentences} ignoredChars={ignoredChars} />
      </section>
    </div>
  );
}
