'use client'

import PageTitle from "@/components/page-title/PageTitle";
import { Home } from "lucide-react";
import LinguisticPatterns from "@/components/linguistic-patterns/LinguisticPatterns";

export default function I1Media() {
  return (
    <div className="page">
      <PageTitle title="i+1 Media" returnPage="Dashboard" returnPageHref="/" icon={<Home size={22} />} subtitle="Your language learning journey" />
      <section>
        <LinguisticPatterns />
      </section>
    </div>
  );
}
