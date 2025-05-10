'use client'

import TalkingHead from "@/components/common/head/TalkingHead";
import PageTitle from "@/components/common/page-title/PageTitle";
//import Questions from "@/components/features/questions/Questions";
//import { useQuestionsStore } from "@/store/useQuestionsStore";
import { Mic } from "lucide-react";
//import { useState } from "react";

export default function SpeakingPractice() {
    //const [page, setPage] = useState(1);
    //const questions = useQuestionsStore((store) => store.questions);

    return (
        <div className="page">
            <PageTitle title="Speaking Practice" returnPage="Dashboard" returnPageHref="/" icon={<Mic size={22} />} subtitle="A journey through the shadows of language and self" />
            <section>
                <TalkingHead audioUrl="/files/voice.wav" />

                {/* <Questions page={page} setPage={setPage} questions={questions} /> */}
            </section>
        </div>
    );
}