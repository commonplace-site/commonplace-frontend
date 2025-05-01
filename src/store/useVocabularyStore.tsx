import { create } from "zustand";
import type { VocabularyState, Vocabulary, VocabularyItem, OrbItem } from "@/types/vocabulary";
import { MessageSquare, Sparkles, Volume2 } from "lucide-react";

const defaultVocabulary: Vocabulary = {
    name: "Dictionary",
    progress: 50,
    words: [
        { word: "Perseverance", translation: "Beharrlichkeit" },
        { word: "Curiosity", translation: "Neugier" },
        { word: "Ambition", translation: "Ehrgeiz" },
        { word: "Diligence", translation: "Fleiß" },
        { word: "Integrity", translation: "Integrität" },
        { word: "Respect", translation: "Respekt" },
        { word: "Kindness", translation: "Freundlichkeit" },
        { word: "Ticket", translation: "Fahrkarte" },
        { word: "Luggage", translation: "Gepäck" },
        { word: "Airport", translation: "Flughafen" },
        { word: "Train", translation: "Zug" },
        { word: "Negotiation", translation: "Verhandlung" },
        { word: "Invoice", translation: "Rechnung" },
        { word: "Profit", translation: "Gewinn" },
        { word: "Strategy", translation: "Strategie" },
        { word: "Contract", translation: "Vertrag" },
        { word: "Client", translation: "Kunde" },
        { word: "Presentation", translation: "Präsentation" },
        { word: "Budget", translation: "Haushalt" },
        { word: "Deadline", translation: "Frist" },
        { word: "Hello", translation: "Hallo" },
        { word: "Thank you", translation: "Danke" },
        { word: "Sorry", translation: "Entschuldigung" },
        { word: "Bread", translation: "Brot" },
        { word: "Water", translation: "Wasser" },
        { word: "Apple", translation: "Apfel" },
        { word: "Cheese", translation: "Käse" },
        { word: "Coffee", translation: "Kaffee" },
        { word: "Juice", translation: "Saft" },
        { word: "Salt", translation: "Salz" },
        { word: "Butter", translation: "Butter" },
        { word: "Egg", translation: "Ei" },
        { word: "Fish", translation: "Fisch" },
    ],
};

const defaultVocabularies: Vocabulary[] = [
    {
        name: "My Main Dictionary",
        progress: 50,
        words: [
            { word: "Perseverance", translation: "Beharrlichkeit" },
            { word: "Curiosity", translation: "Neugier" },
            { word: "Ambition", translation: "Ehrgeiz" },
            { word: "Diligence", translation: "Fleiß" },
            { word: "Integrity", translation: "Integrität" },
            { word: "Respect", translation: "Respekt" },
            { word: "Kindness", translation: "Freundlichkeit" },
        ],
    },
    {
        name: "Travel Vocabulary",
        progress: 0,
        words: [
            { word: "Ticket", translation: "Fahrkarte" },
            { word: "Luggage", translation: "Gepäck" },
            { word: "Airport", translation: "Flughafen" },
            { word: "Train", translation: "Zug" },
        ],
    },
    {
        name: "Business Terms",
        progress: 100,
        words: [
            { word: "Negotiation", translation: "Verhandlung" },
            { word: "Invoice", translation: "Rechnung" },
            { word: "Profit", translation: "Gewinn" },
            { word: "Strategy", translation: "Strategie" },
            { word: "Contract", translation: "Vertrag" },
            { word: "Client", translation: "Kunde" },
            { word: "Presentation", translation: "Präsentation" },
            { word: "Budget", translation: "Haushalt" },
            { word: "Deadline", translation: "Frist" },
        ],
    },
    {
        name: "Daily Expressions",
        progress: 25,
        words: [
            { word: "Hello", translation: "Hallo" },
            { word: "Thank you", translation: "Danke" },
            { word: "Sorry", translation: "Entschuldigung" },
        ],
    },
    {
        name: "Food & Drink",
        progress: 75,
        words: [
            { word: "Bread", translation: "Brot" },
            { word: "Water", translation: "Wasser" },
            { word: "Apple", translation: "Apfel" },
            { word: "Cheese", translation: "Käse" },
            { word: "Coffee", translation: "Kaffee" },
            { word: "Juice", translation: "Saft" },
            { word: "Salt", translation: "Salz" },
            { word: "Butter", translation: "Butter" },
            { word: "Egg", translation: "Ei" },
            { word: "Fish", translation: "Fisch" },
        ],
    },
];

const defaultVocabularyGarden: VocabularyItem[] = [
    { word: "Perseverance", translation: "Beharrlichkeit", lastPracticed: "3 days ago", resonance: 78 },
    { word: "Reflection", translation: "Reflexion", lastPracticed: "1 day ago", resonance: 92 },
    { word: "Ambiguity", translation: "Zweideutigkeit", lastPracticed: "5 days ago", resonance: 65 },
    { word: "Wonder", translation: "Wunder", lastPracticed: "Yesterday", resonance: 88 },
    { word: "Transformation", translation: "Verwandlung", lastPracticed: "4 days ago", resonance: 72 },
];

const defaultFeedbackList: string[] = [
    "Your vocabulary choices reflect a growing emotional range, especially in how you describe abstract concepts.",
    "The rhythm in your speech has developed a more natural cadence, particularly when asking questions.",
    "Notice how your word choice shifts when discussing personal versus theoretical topics. This is a fascinating pattern."
];

const defaultOrbs: OrbItem[] = [
    {
        icon: <Volume2 className="text-white" size={20} />,
        title: "First conversation practice",
        date: "Last week",
        style: {
            background: "linear-gradient(to right, rgba(31,46,85,0.4), rgba(43,62,109,0.4))"
        }
    },
    {
        icon: <Sparkles className="text-white" size={20} />,
        title: "Reflection on cultural nuance",
        date: "3 days ago",
        style: {
            background: "linear-gradient(to right, rgba(95,44,103,0.4), rgba(139,61,116,0.4))"
        }
    },
    {
        icon: <MessageSquare className="text-white" size={20} />,
        title: "Written practice with Aalam",
        date: "Yesterday",
        style: {
            background: "linear-gradient(to right, rgba(51,38,85,0.4), rgba(78,52,116,0.4))"
        }
    }
];

export const useVocabularyStore = create<VocabularyState>((set) => ({
    vocabulary: defaultVocabulary,
    vocabularies: defaultVocabularies,
    vocabulariesGarden: defaultVocabularyGarden,
    feedbackList: defaultFeedbackList,
    orbs: defaultOrbs,
    setVocabulary: (vocabulary) => set({ vocabulary }),
    setVocabularies: (vocabularies) => set({ vocabularies }),
    setVocabulariesGarden: (vocabulariesGarden) => set({ vocabulariesGarden }),
    setFeedbackList: (feedbackList) => set({ feedbackList }),
    setOrbs: (orbs) => set({ orbs }),
    clearVocabulary: () => set({ vocabulary: null }),
    clearVocabularies: () => set({ vocabularies: [] }),
}));
