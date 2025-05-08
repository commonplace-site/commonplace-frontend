import { useState, useMemo } from "react";
import { SystemLogEntry, SystemLogType } from "@/types/logs";
import LogRow from "./LogRow";
import { Input } from "@/components/ui/input";
import PaginationControls from "@/components/common/pagination-controls/PaginationControls";
import DropdownButton from "@/components/common/filter-button/DropdownButton";

type Props = {
    logs: SystemLogEntry[];
};

const PAGE_SIZE = 20;

export default function LogList({ logs }: Props) {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState<SystemLogType | "all">("all");
    const [filterDate, setFilterDate] = useState("");

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
            <div className="flex h-[560px]">
                <div className="w-[70%] p-2">
                    <div className="h-[90%] overflow-y-auto">
                        <div className="pr-4 overflow-y-auto overflow-x-hidden flex flex-col gap-1 scrollbar-always">
                            {paginatedLogs.map((log) => (
                                <LogRow key={log.id} log={log} />
                            ))}
                        </div>
                    </div>
                    <div className="h-[10%] mt-2 pr-4">
                        <PaginationControls
                            currentPage={page}
                            totalPages={totalPages}
                            onPageChange={setPage}
                        />
                    </div>
                </div>
                <div className="w-[30%] h-full container">
                    <div className="flex flex-col gap-4 h-full">
                        <div>
                            <Input
                                placeholder="Search by username"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="flex-1 bg-[#1A1533] text-white border border-[#322945] placeholder:text-[#8E82A1]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={filterDate}
                                onChange={(e) => setFilterDate(e.target.value)}
                                className="px-3 py-2 border rounded-xl bg-[#402F62] text-white text-sm border-[#2D2E6E] min-w-[140px]"
                            />

                            <div className="relative w-[100%]">
                                <DropdownButton
                                    label={filterType === "all" ? "All Types" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                                    items={["all", "auth", "upload", "system", "deployment", "module", "info", "flag", "aalam"]}
                                    onSelect={(val) => setFilterType(val as SystemLogType | "all")}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
