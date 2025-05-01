'use client'

import { useUserStore } from "@/store/useUserStore";
import { CurrentUser } from "@/types/user";
import { Bell, Search } from "lucide-react";

const notificationsCount = 3;

const UserHeader = () => {
    const currentUser: CurrentUser | null = useUserStore((state) => state.currentUser);

    return (
        <div className="w-full h-auto min-h-[60px] border-b border-gray-200 dark:border-[#242734] shadow-sm bg-white dark:bg-[#0E1020]">
            <div className="h-full px-4 py-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <div className="text-lg font-medium text-black dark:fill-[#DFE7FF] dark:text-[#a2b5eb]">
                    Welcome back,{" "}
                    <span
                        className="text-xl font-medium text-black dark:fill-[#DFE7FF] dark:text-[#a2b5eb]"
                        style={{ WebkitBackgroundClip: "text" }}
                    >
                        {currentUser?.username || 'User'}
                    </span>
                </div>
                <div className="flex items-center justify-between gap-2 w-full sm:ml-auto sm:w-auto">
                    <div className="relative flex-1 sm:flex-none">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <Search size={18} className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search…"
                            className="pl-10 pr-3 py-1.5 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition text-sm bg-gray-50 w-full sm:w-64"
                        />
                    </div>
                    <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
                        <Bell size={20} className="text-gray-600" />
                        {notificationsCount > 0 && (
                            <span className="absolute -top-[-4px] -right-[-4px] w-[10px] h-[10px] bg-red-500 text-white text-[8px] leading-[10px] font-semibold rounded-full text-center px-1">
                                <span className="relative left-[-2px]">{notificationsCount}</span>
                            </span>
                        )}
                    </button>
                    <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#9B87F5] text-white text-indigo-700 font-bold text-xl select-none">
                        {currentUser?.username?.[0]?.toUpperCase() || "U"}
                    </div>
                </div>
            </div>
        </div>
    );

};

export default UserHeader;
