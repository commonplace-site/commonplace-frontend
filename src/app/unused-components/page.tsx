'use client'

import Chonger from "@/components/chonger/Chonger";
import PageTitle from "@/components/page-title/PageTitle";
import VocabularyList from "@/components/vocabulary-list/VocabularyList";
import { useVocabularyStore } from "@/store/useVocabularyStore";

const UnusedComponents = () => {
    const vocabularies = useVocabularyStore((state) => state.vocabularies);
    return <div className="page">

        <PageTitle title="Chonger" />
        <section className="mb-8">
            <Chonger />
        </section>

        <PageTitle title="Vocabulary List" />
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
}

export default UnusedComponents;