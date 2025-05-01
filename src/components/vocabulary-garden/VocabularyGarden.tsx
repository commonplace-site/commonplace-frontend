import { useVocabularyStore } from "@/store/useVocabularyStore";
import { JSX } from "react";

const VocabularyGarden = (): JSX.Element => {
    const vocabulariesGarden = useVocabularyStore((state) => state.vocabulariesGarden);
    return <div>
        <h2 className="subtitle">Vocabulary Garden</h2>
        <div className="container">
            {vocabulariesGarden.map((item, index) => (
                <div key={index}>
                    <div className={`flex items-center justify-between ${index !== 0 && 'pt-2'} ${index !== vocabulariesGarden.length - 1 && "border-b border-[#322945] pb-2"}`}>
                        <div>
                            <div className="text-title">{item.word}</div>
                            <div className="text-subtitle">{item.translation}</div>
                            <div className="text-description">Last practiced: {item.lastPracticed}</div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="w-36 h-2 rounded-full bg-white/10 overflow-hidden">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                                    style={{ width: `${item.resonance}%` }}
                                />
                            </div>
                            <div className="text-description">Resonance: {item.resonance}%</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default VocabularyGarden;