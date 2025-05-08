'use client'

import PageTitle from "@/components/common/page-title/PageTitle";
import Questions from "@/components/features/questions/Questions";
import { useQuestionsStore } from "@/store/useQuestionsStore";
import { FileText } from "lucide-react";
import { useState } from "react";

export default function LanguageTest() {
    const languageTestQuestions = useQuestionsStore((store) => store.languageTestQuestions);
    const [page, setPage] = useState(1);
    return (
        <div className="page">
            <PageTitle title="Language Test" returnPage="Dashboard" returnPageHref="/" icon={<FileText size={22} />} subtitle="Challenge your fluency, unlock new paths"/>
            <section>
                <Questions page={page} setPage={setPage} questions={languageTestQuestions} />
            </section>
        </div>
    );
}