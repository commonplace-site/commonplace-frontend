'use client'

import PageTitle from "@/components/page-title/PageTitle";
import Questions from "@/components/questions/Questions";
import { useQuestionsStore } from "@/store/useQuestionsStore";
import { BookOpen } from "lucide-react";
import { useState } from "react";

export default function SpeakingPractice() {
    const [page, setPage] = useState(1);
    const questions = useQuestionsStore((store) => store.questions);

    return (
        <div className="page">
            <PageTitle title="Speaking Practice" returnPage="Dashboard" returnPageHref="/" icon={<BookOpen size={22} />} subtitle="A journey through the shadows of language and self" />
            <section>
                <Questions page={page} setPage={setPage} questions={questions} />
            </section>
        </div>
    );
}