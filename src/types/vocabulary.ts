export type VocabWord = {
    word: string;
    translation: string;
};

export type Vocabulary = {
    name: string;
    progress: number;
    words: VocabWord[];
};

export type VocabularyState = {
    vocabulary: Vocabulary | null;
    vocabularies: Vocabulary[];
    setVocabulary: (v: Vocabulary) => void;
    setVocabularies: (v: Vocabulary[]) => void;
    clearVocabulary: () => void;
    clearVocabularies: () => void;
};