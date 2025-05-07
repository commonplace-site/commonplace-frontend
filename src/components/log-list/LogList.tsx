import { useState, useMemo } from "react";
import { SystemLogEntry, SystemLogType } from "@/types/logs";
import LogRow from "./LogRow";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
    logs: SystemLogEntry[];
};

const PAGE_SIZE = 20;

export default function LogList({ logs }: Props) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<SystemLogType | "all">("all");
    const [filterDate, setFilterDate] = useState("");
    const [filterTypeDropdownOpen, setFilterTypeDropdownOpen] = useState(false);

    const filteredLogs = useMemo(() => {
        return logs.filter((log) => {
            const matchesUser = search === "" || log.username?.toLowerCase().includes(search.toLowerCase());
            const matchesType = filterType === "all" || log.type === filterType;
            const matchesDate = !filterDate || log.timestamp.startsWith(filterDate);
            return matchesUser && matchesType && matchesDate;
        });
    }, [logs, search, filterType, filterDate]);

    const paginatedLogs = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return filteredLogs.slice(start, start + PAGE_SIZE);
    }, [filteredLogs, page]);

    const totalPages = Math.ceil(filteredLogs.length / PAGE_SIZE);

    return (
        <div className="flex flex-col gap-2">
            <div>
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search by username"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="flex-1"
                    />

                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        className="px-3 py-2 border rounded-xl bg-[#402F62] text-white text-sm border-[#2D2E6E] min-w-[140px]"
                    />

                    <div className="relative">
                        <Button
                            variant="outline"
                            className="text-subtitle border-0"
                            onClick={() => setFilterTypeDropdownOpen(!filterTypeDropdownOpen)}
                        >
                            {filterType === 'all' ? 'All Types' : filterType}
                        </Button>
                        {filterTypeDropdownOpen && (
                            <div className="absolute right-0 mt-1 bg-[#2a2930] border border-[#444] rounded-md shadow-lg z-10 w-44">
                                {['all', 'auth', 'deployment', 'module', 'upload', 'info', 'system', 'flag', 'aalam'].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => {
                                            setFilterType(val as SystemLogType | "all");
                                            setFilterTypeDropdownOpen(false);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 ${filterType === val ? 'bg-white/10' : ''}`}
                                    >
                                        {val === 'all' ? 'All Types' : val.charAt(0).toUpperCase() + val.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="h-[400px] overflow-y-auto overflow-x-hidden flex flex-col gap-1 scrollbar-always">
                {paginatedLogs.map((log) => (
                    <LogRow key={log.id} log={log} />
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-6 gap-4">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className="commonplace-button disabled:opacity-40"
                    >
                        ← Prev
                    </button>
                    <span className="text-subtitle">
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className="commonplace-button disabled:opacity-40"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
