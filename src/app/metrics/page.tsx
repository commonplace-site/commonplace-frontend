import PageTitle from "@/components/page-title/PageTitle";
import { BarChart4 } from "lucide-react";

export default function Metrics() {
    return (
        <div className="page">
            <PageTitle title="Metrics & Usage Stats" returnPage="Dashboard" returnPageHref="/" icon={<BarChart4 size={22} />} subtitle="Track platform activity and module engagement" />
        </div>
    );
}