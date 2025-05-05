'use client'

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { iconMap } from "@/constants/iconMap";

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const currentUser = useUserStore((state) => state.currentUser);

    const groupedItems = currentUser
        ? currentUser.sidebar_items[currentUser.role]
            .filter(item => item.visible)
            .reduce((acc, item) => {
                const group = item.group || "General";
                if (!acc[group]) acc[group] = [];
                acc[group].push(item);
                return acc;
            }, {} as Record<string, typeof currentUser.sidebar_items["Student"]>)
        : {};


    return (
        <div className={`transition-all pb-32 duration-200 bg-white dark:bg-[#0D0E1C] dark:border-[color:#070713] border-r border-gray-200 shadow-sm ${collapsed ? "w-16" : "w-64 absolute"} flex flex-col sm:relative z-50`}>
            <div className="flex h-[60px] sm:h-[70px] items-center p-4 shadow-sm border-b border-gray-200 dark:border-[#242734] w-full">
                {!collapsed && (
                    <span className="font-extrabold text-lg sm:text-xl bg-gradient-to-r from-blue-300 via-purple-300 via-pink-300 to-cyan-300 bg-clip-text text-transparent tracking-wide transition-all duration-200 mr-2">
                        Commonplace
                    </span>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed((c) => !c)}
                    className="ml-auto dark:text-white bg-transparent text-[#0BA5E9]"
                    aria-label="Toggle sidebar"
                >
                    {collapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
                </Button>
            </div>

            <nav className="flex flex-col gap-4 mt-4 px-2 overflow-y-auto">
                {Object.entries(groupedItems).map(([groupName, items]) => (
                    <div key={groupName}>
                        {!collapsed && (
                            <div className="text-description ml-2 text-white/40">{groupName.toUpperCase()}</div>
                        )}
                        {items.map(({ href, label, icon, disabled, status, group }) => (
                            <Link
                                key={href}
                                href={disabled ? "#" : href}
                                aria-disabled={disabled}
                                title={status.charAt(0).toUpperCase() + status.slice(1)}
                                className={`flex justify-between dark:text-[#C7D2FE] gap-2 px-3 sm:px-4 py-2 font-medium transition-colors rounded-md ${disabled && "cursor-not-allowed opacity-50"} ${pathname === href
                                    ? "bg-[#50A7E7] text-white dark:bg-[#18183B] dark:text-[#FFFFFF]"
                                    : "hover:bg-[#0BA5E9] hover:text-white dark:hover:bg-[#18183B] dark:hover:text-[#FFFFFF]"}`}
                            >
                                <div className="flex items-center">
                                    <span className="w-6 mr-2 flex justify-center">
                                        {iconMap[icon as keyof typeof iconMap] ?? null}
                                    </span>
                                    {!collapsed && label}
                                </div>
                                {group === 'Core Modules' && <div
                                    className={`w-1 h-1 rounded-full ${status === 'active' ? 'bg-green-500' : ''} ${status === 'upcoming' ? 'bg-yellow-500' : ''} ${status === 'guided' ? 'bg-blue-400' : ''}`}
                                />}
                            </Link>
                        ))}
                    </div>
                ))}
            </nav>
        </div>
    );

}
