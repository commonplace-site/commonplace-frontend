"use client";

import { useUserStore } from "@/store/useUserStore";
import { UserRoles } from "@/types/user";
import Link from "next/link";

const navItems = [
    { label: "Student" },
    { label: "Teacher" },
    { label: "Admin" },
    { label: 'Developer' }
];

export default function Header() {
    const currentUser = useUserStore((state) => state.currentUser);

    return (
        <header className="w-full shadow-sm bg-[#50A7E7] dark:bg-[#351C60]">
            <div className="flex flex-col md:flex-row items-center px-4 py-2 gap-2 md:gap-0">
                <div className="w-full md:w-60 flex-shrink-0 text-center md:text-left">
                    <span className="text-2xl font-bold text-white tracking-tight select-none">
                        DemoMode
                    </span>
                </div>
                <nav className="flex flex-wrap justify-center md:flex-1 items-center gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label + 'header-role'}
                            href="#"
                            onClick={() => useUserStore.getState().updateCurrentUser({ role: item.label as UserRoles})}
                            className={`text-base font-medium transition-colors px-3 py-1 rounded-md ${currentUser?.role === item.label
                                ? "bg-white dark:text-black text-[#51A7E8]"
                                : "text-white hover:bg-white/20"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>

    );
}
