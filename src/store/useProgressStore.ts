import { create } from "zustand";
import type { ProgressState, ProgressItem, GrowthItem } from "@/types/progress";

const defaultProgress: ProgressItem[] = [
    { name: "Vocabulary Range", progress: 82 },
    { name: "Rhetorical Structure", progress: 65 },
    { name: "Emotional Resonance", progress: 73 },
    { name: "Cultural Context", progress: 33 },
];

const defaultGrowthData: GrowthItem[] = [
    {
        title: "Metaphorical Expression",
        description:
            "Your use of figurative language has evolved to include more nuanced emotional states",
        colorDark: "from-[#351455] to-[#2D1D5C]",
        colorLight: "from-[#A678F2] to-[#603A98]"
    },
    {
        title: "Conversational Flow",
        description:
            "Your pauses and transitions have become more intentional, creating natural rhythm",
        colorDark: "from-[#212158] to-[#301D60]",
        colorLight: 'from-[#6CB4F8] to-[#3B5998]'
    },
];

const defaultToneMap: number[] = [3, 5, 4, 6, 5, 3, 2, 2, 4, 5, 5, 5, 4, 3, 2, 3];

export const useProgressStore = create<ProgressState>((set) => ({
    progressList: defaultProgress,
    toneMap: defaultToneMap,
    growthData: defaultGrowthData,
    setProgressList: (list) => set({ progressList: list }),
    setToneMap: (map) => set({ toneMap: map }),
    setGrowthData: (growth) => set({ growthData: growth }),
    updateSkillProgress: (name, value) =>
        set((state) => ({
            progressList: state.progressList.map((item) =>
                item.name === name ? { ...item, progress: value } : item
            ),
        })),
}));
