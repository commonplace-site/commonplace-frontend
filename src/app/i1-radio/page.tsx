'use client'

import PageTitle from "@/components/page-title/PageTitle";
import { Radio } from "lucide-react";

export default function I1Radio() {
    return (
        <div className="page">
            <PageTitle title="i+1 Radio" returnPage="Dashboard" returnPageHref="/" icon={<Radio size={22} />} subtitle="Fluency through evolving audio patterns" />
        </div>
    );
}