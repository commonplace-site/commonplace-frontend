'use client'

import PageTitle from "@/components/page-title/PageTitle";
import VocabularyList from "@/components/vocabulary-list/VocabularyList";
import { useVocabularyStore } from "@/store/useVocabularyStore";
import { BookText } from "lucide-react";

export default function I1Radio() {
    const vocabularies = useVocabularyStore((state) => state.vocabularies);
    return (
        <div className="page">
            <PageTitle title="i+1 Radio" returnPage="Dashboard" returnPageHref="/" icon={<BookText size={22} />} subtitle="Words you’ve been learning" />
            <section className="flex flex-wrap justify-center gap-4">
                {vocabularies.map((dict) => (
                    <VocabularyList
                        key={dict.name}
                        vocabularyName={dict.name}
                        progress={dict.progress}
                        words={dict.words}
                        type='list'
                    />
                ))}
            </section>
        </div>
    );
}