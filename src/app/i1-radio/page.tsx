'use client'

import PageTitle from "@/components/page-title/PageTitle";
import { BookText } from "lucide-react";

export default function I1Radio() {
    return (
        <div className="page">
            <PageTitle title="i+1 Radio" returnPage="Dashboard" returnPageHref="/" icon={<BookText size={22} />} subtitle="Fluency through evolving audio patterns" />
        </div>
    );
}