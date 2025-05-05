'use client'

import { JSX, useState } from "react";
import { Activity, BookOpen, BookOpenText, BookText, ChevronLeft, ChevronRight, Compass, Component, FilePlus, Group, Info, LandPlot, Layers, LayoutDashboard, LayoutGrid, Link2, Notebook, Package, Settings, Text, TreePine, TrendingUp, Users, Workflow } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const menuItems: Record<'Student' | 'Teacher' | 'Admin', { href: string; label: string; icon: JSX.Element | null; disabled: boolean }[]> = {
    Student: [
        { href: "/", label: "Home Page", icon: <LayoutDashboard size={18} />, disabled: false },
        { href: "/modules", label: "Modules", icon: <Package size={18} />, disabled: true },
        { href: "/garden", label: "Garden", icon: <TreePine size={18} />, disabled: false },
        // { href: "/aalam", label: "Aalam", icon: <Globe size={18} />, disabled: true },
        // { href: "/journey-map", label: "Journey Map", icon: <Map size={18} />, disabled: true },
        { href: "/i1-radio", label: "i+1 Radio", icon: <BookText size={18} />, disabled: false },
        { href: "/i1-media", label: "i+1 Media", icon: <TrendingUp size={18} />, disabled: false },
        { href: "/language-test", label: "Language Test", icon: <BookOpen size={18} />, disabled: false },
        { href: "/shadowbank", label: "Shadowbank", icon: <Users size={18} />, disabled: false },
        { href: "/notebook", label: "Notebook", icon: <Notebook size={18} />, disabled: true },
        { href: "/workspace", label: "Workspace", icon: <Workflow size={18} />, disabled: true },
        { href: "/groups", label: "Groups", icon: <Group size={18} />, disabled: true },
        { href: "/comments", label: "Comments", icon: <Text size={18} />, disabled: true },
        { href: "/uptake", label: "Uptake", icon: <FilePlus size={18} />, disabled: true },
        { href: "/account-settings", label: "Account Settings", icon: <Settings size={18} />, disabled: false },
        { href: "/about", label: "About", icon: <Info size={18} />, disabled: true },
    ],
    Teacher: [
        { href: "/garden", label: "Presence", icon: <TreePine size={18} />, disabled: true },
        { href: "/explorers", label: "Explorers", icon: <Compass size={18} />, disabled: true },
        { href: "/realms", label: "Realms", icon: <LandPlot size={18} />, disabled: true },
        { href: "/resonance", label: "Resonance", icon: <Activity size={18} />, disabled: true },
        { href: "/account-settings", label: "Account Settings", icon: <Settings size={18} />, disabled: true },
    ],
    Admin: [
        { href: "/garden", label: "Realm View", icon: <TreePine size={18} />, disabled: true },
        { href: "/enitities", label: "Enitities", icon: <Layers size={18} />, disabled: true },
        { href: "/narratives", label: "Narratives", icon: <BookOpenText size={18} />, disabled: true },
        { href: "/connections", label: "Connections", icon: <Link2 size={18} />, disabled: true },
        { href: "/patterns", label: "Patterns", icon: <LayoutGrid size={18} />, disabled: true },
        { href: "/account-settings", label: "Account Settings", icon: <Settings size={18} />, disabled: true },
    ]
}

export default function Sidebar() {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const currentUser = useUserStore((state) => state.currentUser);

    return (
        <div className={`transition-all duration-200 bg-white dark:bg-[#0D0E1C] dark:border-[color:#070713] border-r border-gray-200 shadow-sm ${collapsed ? "w-16" : "w-64 absolute"} flex flex-col sm:relative z-50`}>
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

            <nav className="flex flex-col gap-2 mt-4 px-2 overflow-y-auto">
                {currentUser?.role && menuItems[currentUser.role].map(({ href, label, icon, disabled }) => (
                    <Link
                        key={href}
                        href={disabled ? "#" : href}
                        aria-disabled={disabled}
                        className={`flex dark:text-[#C7D2FE] items-center gap-2 px-3 sm:px-4 py-2 font-medium transition-colors rounded-md
                  ${disabled && "cursor-not-allowed opacity-50"}
                  ${pathname === href
                                ? "bg-[#50A7E7] text-white dark:bg-[#18183B] dark:text-[#FFFFFF]"
                                : "hover:bg-[#0BA5E9] hover:text-white dark:hover:bg-[#18183B] dark:hover:text-[#FFFFFF]"}`}
                    >
                        <span className="w-6 flex justify-center">{icon}</span>
                        {!collapsed && label}
                    </Link>
                ))}
            </nav>
        </div>
    );

}
