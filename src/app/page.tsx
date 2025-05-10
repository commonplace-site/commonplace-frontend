'use client'

import PageTitle from "@/components/common/page-title/PageTitle";
import { BookOpen, Brain, MessageSquare, Sparkles, Volume2 } from "lucide-react";
import { useState } from "react";
import LinguisticPatterns from "@/components/features/linguistic-patterns/LinguisticPatterns";
import RecentGrowth from "@/components/features/recent-growth/RecentGrowth";
import VocabularyGarden from "@/components/features/vocabulary-garden/VocabularyGarden";
import ReflectiveFeedback from "@/components/features/reflective-feedback/ReflectiveFeedback";
import MemoryOrbs from "@/components/features/memory-orbs/MemoryOrbs";
import AalamChat from "@/components/features/aalam/AalamChat";

const tabs = [
  { id: "patterns", label: "Patterns", icon: Sparkles },
  { id: "aalam", label: "Aalam", icon: Brain },
  { id: "vocabulary", label: "Vocabulary", icon: BookOpen },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "memory", label: "Memory", icon: Volume2 },
];

type DashboardBarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardBar = ({ activeTab, setActiveTab }: DashboardBarProps) => {
  return <div className="h-full flex items-center justify-center mb-2">
    <div className={`inline-flex rounded-full border bg-[#1D1234] border-[#322945] px-1 py-1 backdrop-blur-md gap-1`}>
      {tabs.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex hover:bg-[#ffffff1a] cursor-pointer items-center gap-2 text-sm font-medium px-4 py-1.5 rounded-full transition
          ${activeTab === id
              ? "bg-white/10 text-white"
              : "text-white hover:text-white"}`}
        >
          <Icon size={16} className={`stroke-current 'text-white/80'`} />
          <span className={`font-[600] text-white/80`}>{label}</span>
        </button>
      ))}
    </div>
  </div>
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("patterns");
  return (
    <div className="page">
      <PageTitle title="Dashboard" subtitle="Overview of progress and active modules" />
      <DashboardBar activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === 'aalam' && <div>
        <section><AalamChat /></section>
      </div>}
      {activeTab === 'patterns' && <div>
        <section><LinguisticPatterns /></section>
        <section><RecentGrowth /></section>
      </div>}
      {activeTab === 'vocabulary' &&
        <section><VocabularyGarden /></section>}
      {activeTab === 'feedback' &&
        <section><ReflectiveFeedback /></section>}
      {activeTab === 'memory' &&
        <section><MemoryOrbs /></section>}
    </div >
  );
}

