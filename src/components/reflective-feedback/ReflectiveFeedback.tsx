import { useVocabularyStore } from "@/store/useVocabularyStore";
import { JSX } from "react";

const ReflectiveFeedback = (): JSX.Element => {
    const feedbackList = useVocabularyStore((state) => state.feedbackList);
    return <div>
        <h2 className="subtitle">Reflective Feedback</h2>
        <div className="container space-y-4">
            {feedbackList.map((text, index) => (
                <div
                    key={index}
                    className="text-subtitle px-4 py-4 bg-gradient-to-r rounded-md border border-[#322945] text-white/80 from-[#2B1346] to-[#281952]"
                >
                    {text}
                </div>
            ))}
        </div>
    </div>
}

export default ReflectiveFeedback;