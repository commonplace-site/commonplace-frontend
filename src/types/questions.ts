export type Question = {
    id: string,
    question: string,
    type: string,
    variants?: string[]
}

export type QuestionsState = {
    questions: Question[],
    languageTestQuestions: Question[],
    setQuestions: (questions: Question[]) => void,
    setLanguageTestQuestions: (languageTestQuestions: Question[]) => void,
    clearQuestions: () => void,
    clearLanguageTestQuestions: () => void
}