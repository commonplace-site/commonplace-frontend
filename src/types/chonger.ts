export type ChongerSentence = {
    sentence: string;
    note: string;
    tags: string[];
    grammar: string;
    iPlusOne: string;
    iPlusOneGrammar: string;
};

export type ChongerState = {
    sentences: ChongerSentence[];
    ignoredChars: string[];
    setSentences: (s: ChongerSentence[]) => void;
    setIgnoredChars: (c: string[]) => void;
};
