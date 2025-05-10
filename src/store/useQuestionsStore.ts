import { create } from "zustand";
import { Question, QuestionsState } from "@/types/questions";

const defaultQuestions: Question[] = [
    {
        id: '11',
        question: "Words cast shadows as much as light. What shadows do your words cast today?",
        type: 'none',
    },
    {
        id: '22',
        question: "Language is not just about being understood, but about understanding yourself.",
        type: 'none',
    },
    {
        id: '33',
        question: "In this space, we explore the quiet corners where meaning hides between words.",
        type: 'textareaGroup',
        variants: [
            "What phrase have you struggled to express in your target language?",
            "When have words failed you most profoundly?",
            "If your accent were a landscape, what would it look like?"
        ]
    }
]

const defaultLanguageTestQuestions: Question[] = [
    {
        id: '1',
        question: "Which word is a noun?",
        type: 'singleChoice',
        variants: [
            "Run",
            "Beautiful",
            "Book",
            "Quickly",
            "Swim"
        ]
    },
    {
        id: '2',
        question: "Translate the word 'dog' into English:",
        type: 'input'
    },
    {
        id: '3',
        question: "Select all verbs from the list:",
        type: 'multipleChoice',
        variants: [
            "Run",
            "Blue",
            "Jump",
            "Quick",
            "Swim"
        ]
    },
    {
        id: '4',
        question: "Describe your daily routine using present simple tense:",
        type: 'textarea'
    },
    {
        id: '5',
        question: "Write a short answer for each of the following prompts:",
        type: "textareaGroup",
        variants: [
            "What is your favorite English word?",
            "What do you usually do on weekends?",
            "Why are you learning English?"
        ]
    },
    {
        id: '6',
        question: "This section is just a header or instruction. Bye-bye!",
        type: 'none'
    }
]

export const useQuestionsStore = create<QuestionsState>((set) => ({
    questions: defaultQuestions,
    languageTestQuestions: defaultLanguageTestQuestions,
    setQuestions: (questions: Question[]) => set({ questions: questions }),
    setLanguageTestQuestions: (languageTestQuestions: Question[]) => set({ languageTestQuestions: languageTestQuestions }),
    clearQuestions: () => set({ questions: [] }),
    clearLanguageTestQuestions: () => set({ languageTestQuestions: [] })
}));

