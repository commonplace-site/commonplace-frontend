'use client'

import { useTheme } from "@/app/ThemeContext";
import { ProgressItem } from "@/types/progress";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    LabelList,
    ResponsiveContainer,
} from "recharts";

export default function ProgressChart({ progress }: { progress: ProgressItem[] }) {
    const { theme } = useTheme();
    return (
        <div>
            <ResponsiveContainer width="100%" height={280}>
                <BarChart
                    layout="vertical"
                    data={progress}
                    margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
                    barCategoryGap={24}
                >
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        width={140}
                        tick={({ x, y, payload }) => (
                            <text
                                x={x - 130}
                                y={y + 5}
                                textAnchor="start"
                                fontSize={14}
                                fill="#334155"
                                fontWeight={600}
                                className="dark:fill-[#DFE7FF] dark:text-[#a2b5eb]"
                            >
                                {payload.value}
                            </text>
                        )}
                    />

                    <Tooltip
                        cursor={{ fill: "rgba(80,167,232,0.08)" }}
                        formatter={(value: number) => `${value}%`}
                    />
                    <Bar
                        dataKey="progress"
                        fill="#51A7E8"
                        radius={[8, 8, 8, 8]}
                        background={{ fill: theme === 'dark' ? '#161634' : "#F3F4F6" }}
                        maxBarSize={10}
                        isAnimationActive={false}
                    >
                        <LabelList
                            dataKey="progress"
                            position="right"
                            formatter={(v: number) => `${v}%`}
                            style={{
                                fill: theme === 'dark' ? '#DEE7FF' : "#334155",
                                fontWeight: 700,
                                fontSize: 16,
                                marginLeft: 8,
                            }}
                        />
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}