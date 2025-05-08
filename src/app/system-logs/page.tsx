'use client'

import LogList from "@/components/features/log-list/LogList";
import PageTitle from "@/components/common/page-title/PageTitle";
import { useSystemLogsStore } from "@/store/useSystemLogsStore";
import { TerminalSquare } from "lucide-react";

export default function SystemLogs() {
    const logs = useSystemLogsStore((store) => store.logs);
    return (
        <div className="page">
            <PageTitle title="System Logs" icon={<TerminalSquare size={22} />} returnPage="Dashboard" returnPageHref="/" subtitle="View and track system-wide actions and developer events" />
            <LogList logs={logs} />
        </div>
    );
}