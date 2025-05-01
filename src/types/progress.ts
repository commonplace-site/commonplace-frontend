export type ProgressSkill = "Vocabulary Range" | "Rhetorical Structure" | "Emotional Resonance" | "Cultural Context";

export type ProgressItem = {
    name: ProgressSkill;
    progress: number;
};

export type ProgressState = {
    progressList: ProgressItem[];
    toneMap: number[];
    growthData: GrowthItem[];
    setProgressList: (list: ProgressItem[]) => void;
    setToneMap: (list: number[]) => void;
    setGrowthData: (list: GrowthItem[]) => void;
    updateSkillProgress: (name: ProgressSkill, value: number) => void;
};

export type GrowthItem = {
    title: string;
    description: string;
    colorDark: string;
    colorLight: string;
}