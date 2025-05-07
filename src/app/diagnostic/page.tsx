import PageTitle from "@/components/page-title/PageTitle";
import { BookText } from "lucide-react";

export default function Diagnostic() {
    return (
        <div className="page">
            <PageTitle title="Diagnostic Module" returnPage="Dashboard" returnPageHref="/" icon={<BookText size={22} />} subtitle="Begin with insight, not assumptions" />
        </div>
    );
}