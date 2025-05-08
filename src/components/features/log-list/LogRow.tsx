import { SystemLogEntry } from "@/types/logs";

type Props = {
    log: SystemLogEntry;
};

export default function LogRow({ log }: Props) {
    return (
        <div className="container px-3 py-1 flex items-center justify-between gap-4">
            <div className="flex flex-col justify-center overflow-hidden">
                <span className="text-description text-[11px]">
                    {log.message}
                </span>
                <div className="flex items-center gap-2 text-[10px] text-[#888] mt-0.5 truncate">
                    <span
                        className={`text-[10px] leading-none text-description px-2 pt-[1px] rounded bg-opacity-80 text-white
    ${log.type === "auth" ? "bg-blue-600" :
                                log.type === "deployment" ? "bg-green-600" :
                                    log.type === "module" ? "bg-purple-600" :
                                        log.type === "upload" ? "bg-yellow-500 text-black" :
                                            log.type === "info" ? "bg-gray-500" :
                                                log.type === "system" ? "bg-red-600" :
                                                    log.type === "flag" ? "bg-pink-600" :
                                                        "bg-gray-700"
                            }`}
                    >
                        {log.type.toUpperCase()}
                    </span>

                    {log.source && <span>Module: <span className="text-white">{log.source}</span></span>}
                    {log.username && <span>Username: <span className="text-white">@{log.username}</span></span>}
                </div>
            </div>

            <span className="text-[10px] text-[#888] whitespace-nowrap shrink-0">
                {new Date(log.timestamp).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                })}
            </span>
        </div>
    );
}
