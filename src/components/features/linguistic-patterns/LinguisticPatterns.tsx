'use client'

import { useProgressStore } from "@/store/useProgressStore";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function LinguisticPatterns() {
    const progressList = useProgressStore((state) => state.progressList);
    const toneMap = useProgressStore((state) => state.toneMap);

    return (
        <div>
            <div className="subtitle">Linguistic Patterns</div>
            <div className="container">
                <div className="space-y-4">
                    {progressList.map(({ name, progress }) => {
                        const tag =
                            progress > 80
                                ? "Expanding"
                                : progress > 60
                                    ? "Developing"
                                    : progress > 40
                                        ? "Deepening"
                                        : "Emerging";

                        return (
                            <div key={name} className="space-y-1">
                                <div className="flex items-center justify-between">
                                    <span className="text-subtitle">{name}</span>
                                    <span className="text-subtitle">{tag}</span>
                                </div>
                                <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
                                    <div
                                        className="h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="pt-4">
                    <h3 className="text-title">Emotional Tone Map</h3>
                    <div className="h-32 bg-white/5 rounded-md p-2">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={toneMap.map((v, i) => ({ name: i, value: v }))}>
                                <XAxis dataKey="name" hide />
                                <YAxis hide domain={[0, 8]} />
                                <Tooltip cursor={false} />
                                <Bar dataKey="value" fill="url(#toneGradient)" barSize={48} />
                                <defs>
                                    <linearGradient id="toneGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#a78bfa" />
                                        <stop offset="100%" stopColor="#6366f1" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div>
                    <p className="text-description">Tonal variation across recent language sessions</p>
                </div>
            </div>
        </div>
    );
}