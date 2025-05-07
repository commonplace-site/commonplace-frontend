'use client'

import PageTitle from "@/components/page-title/PageTitle";
import { Video } from "lucide-react";

export default function I1Media() {
  return (
    <div className="page">
      <PageTitle title="i+1 Media" returnPage="Dashboard" returnPageHref="/" icon={<Video size={22} />} subtitle="Visual input for fluent output" />
    </div>
  );
}
