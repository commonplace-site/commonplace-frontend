export type ProgressSkill = "Vocabulary" | "Grammar" | "Pronunciation" | "Comprehension";

export type ProgressItem = {
    name: ProgressSkill;
    progress: number;
};

export type ProgressState = {
    progressList: ProgressItem[];
    setProgressList: (list: ProgressItem[]) => void;
    updateSkillProgress: (name: ProgressSkill, value: number) => void;
};