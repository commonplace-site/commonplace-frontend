import { useVocabularyStore } from "@/store/useVocabularyStore";
import { JSX } from "react";

const MemoryOrbs = (): JSX.Element => {
    const orbs = useVocabularyStore((store) => store.orbs);
    return <div>
        <h2 className="subtitle">Memory Orbs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 container">
            {orbs.map((orb, index) => (
                <div
                    key={index}
                    className={`flex items-start gap-4 container cursor-pointer border-0`}
                    style={orb.style}

                >
                    <div className="mt-1">{orb.icon}</div>
                    <div>
                        <div className="text-white font-semibold leading-tight">
                            {orb.title}
                        </div>
                        <div className="text-sm text-white/70 leading-snug">{orb.date}</div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default MemoryOrbs;