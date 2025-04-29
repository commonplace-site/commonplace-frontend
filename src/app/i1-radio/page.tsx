'use client'

import VocabularyList from "@/components/vocabulary-list/VocabularyList";
import { useVocabularyStore } from "@/store/useVocabularyStore";

export default function I1Radio() {
    const vocabularies = useVocabularyStore((state) => state.vocabularies);
    return (
        <div className="container">
            <h1 className="title">i+1 Radio</h1>
            <p className="subtitle">Words you’ve been learning</p>
            <div className="flex flex-wrap justify-center gap-6">
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
        </div>
    );
}