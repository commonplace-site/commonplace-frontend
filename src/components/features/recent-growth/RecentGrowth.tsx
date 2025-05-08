import { useProgressStore } from "@/store/useProgressStore";
import { Sparkles } from "lucide-react"
import { JSX } from "react";

const RecentGrowth = (): JSX.Element => {
    const growthData = useProgressStore((state) => state.growthData);

    return <div>
        <h2 className="subtitle">Recent Growth</h2>
        <div className="container space-y-4">
            {growthData.map((item, index) => (
                <div
                    key={index}
                    className={`flex items-start gap-3 rounded-lg px-4 py-3 bg-gradient-to-r ${item.colorDark} bg-opacity-40`}
                >
                    <Sparkles className="text-white mt-1" size={20} />
                    <div>
                        <div className="text-title">
                            {item.title}
                        </div>
                        <div className="text-description">
                            {item.description}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
}

export default RecentGrowth;