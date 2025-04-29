import { create } from "zustand";
import type { ProgressState, ProgressItem } from "@/types/progress";
// import type { ProgressSkill } from "@/types/progress";
const defaultProgress: ProgressItem[] = [
    { name: "Vocabulary", progress: 82 },
    { name: "Grammar", progress: 65 },
    { name: "Pronunciation", progress: 73 },
    { name: "Comprehension", progress: 33 },
];

export const useProgressStore = create<ProgressState>((set) => ({
    progressList: defaultProgress,
    setProgressList: (list) => set({ progressList: list }),
    updateSkillProgress: (name, value) =>
        set((state) => ({
            progressList: state.progressList.map((item) =>
                item.name === name ? { ...item, progress: value } : item
            ),
        })),
}));
