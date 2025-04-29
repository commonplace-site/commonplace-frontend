'use client'

import ProgressChart from "@/components/progress-chart/ProgressChart";
import { useProgressStore } from "@/store/useProgressStore";

export default function I1Media() {
  const progress = useProgressStore((state) => state.progressList);
  return (
    <div className="container">
      <h1 className="title">i+1 Media</h1>
      <p className="subtitle">Your language learning journey</p>
      <ProgressChart progress={progress} />
    </div>
  );
}
