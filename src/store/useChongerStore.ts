import { create } from "zustand";
import type { ChongerState, ChongerSentence } from "@/types/chonger";

const defaultSentences: ChongerSentence[] = [
    {
        sentence: "我今天去了学校",
        note: "used past tense",
        tags: ["grammar pattern", "common"],
        grammar: "The particle '了' indicates a completed action (past tense).",
        iPlusOne: "我今天和朋友一起去了新学",
        iPlusOneGrammar: "一起 (together) adds the sense of companionship; 新学校 (new school) introduces an adjective modifying the noun.",
    },
    {
        sentence: "今天我去学校了",
        note: "subject shift",
        tags: ["new structure", "common phrase"],
        grammar: "Time phrase '今天' (today) is moved to the beginning of the sentence.",
        iPlusOne: "今天我骑自行车去学校了",
        iPlusOneGrammar: "骑自行车 (ride a bicycle) is a verb-object structure that adds detail to how the subject went to school.",
    },
    {
        sentence: "我刚刚去了学校",
        note: "added adverb",
        tags: ["advanced", "native-like"],
        grammar: "'刚刚' is an adverb meaning 'just now', indicating a recent action.",
        iPlusOne: "我刚刚去了学校参加考试",
        iPlusOneGrammar: "参加考试 (to take an exam) is a verb-object phrase giving purpose to the action, making the sentence more advanced.",
    },
];

const defaultIgnoredChars: string[] = [" ", "。", "，", "."];

export const useChongerStore = create<ChongerState>((set) => ({
    sentences: defaultSentences,
    ignoredChars: defaultIgnoredChars,
    setSentences: (sentences: ChongerSentence[]) => set({ sentences }),
    setIgnoredChars: (ignoredChars: string[]) => set({ ignoredChars }),
}));
