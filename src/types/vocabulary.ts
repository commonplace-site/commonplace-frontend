import { CSSProperties, ReactNode } from "react";

export type VocabularyState = {
    vocabulary: Vocabulary | null;
    vocabularies: Vocabulary[];
    vocabulariesGarden: VocabularyItem[];
    feedbackList: string[];
    orbs: OrbItem[];
    setVocabulary: (v: Vocabulary) => void;
    setVocabularies: (v: Vocabulary[]) => void;
    setVocabulariesGarden: (v: VocabularyItem[]) => void;
    setFeedbackList: (v: string[]) => void;
    setOrbs: (v: OrbItem[]) => void;
    clearVocabulary: () => void;
    clearVocabularies: () => void;
};

export type Vocabulary = {
    name: string;
    progress: number;
    words: VocabWord[];
};

export type VocabWord = {
    word: string;
    translation: string;
};

export type VocabularyItem = {
    word: string;
    translation: string;
    lastPracticed: string;
    resonance: number;
}

export type OrbItem = {
    icon: ReactNode;
    title: string;
    date: string;
    style: CSSProperties;
};