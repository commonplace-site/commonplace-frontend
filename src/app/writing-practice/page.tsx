'use client'

import Chonger from "@/components/features/chonger/Chonger";
import PageTitle from "@/components/common/page-title/PageTitle";
import VocabularyList from "@/components/features/vocabulary-list/VocabularyList";
import { useVocabularyStore } from "@/store/useVocabularyStore";
import { PencilLine } from "lucide-react";

export default function WritingPractice() {
    const vocabularies = useVocabularyStore((state) => state.vocabularies);

    return (
        <div className="page">
            <PageTitle title="Writing Practice" returnPage="Dashboard" returnPageHref="/" icon={<PencilLine size={22} />} subtitle="Interactive space for deep language experiments" />
            <section>
                <Chonger />
            </section>
            <section>
                <h4 className="subtitle">Vocabulary</h4>
                <div className="flex flex-wrap justify-center gap-4">
                    {vocabularies.map((dict) => (
                        <VocabularyList
                            key={dict.name}
                            vocabularyName={dict.name}
                            progress={dict.progress}
                            words={dict.words}
                            type='list'
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}