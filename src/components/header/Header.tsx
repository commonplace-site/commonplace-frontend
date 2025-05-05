"use client";

//import { useTheme } from "@/app/ThemeContext";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";

const navItems = [
    { label: "Student", value: "student" },
    { label: "Teacher", value: "teacher" },
    { label: "Admin", value: "admin" },
];

export default function Header() {
    //const { theme, toggleTheme } = useTheme();
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
                            key={item.value}
                            href="#"
                            onClick={() => useUserStore.getState().updateCurrentUser({ role: item.label as "Student" | "Teacher" | "Admin" })}
                            className={`text-base font-medium transition-colors px-3 py-1 rounded-md ${currentUser?.role === item.label
                                ? "bg-white dark:text-black text-[#51A7E8]"
                                : "text-white hover:bg-white/20"
                                }`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                {/* <div className="w-full md:w-auto flex justify-center md:justify-end mt-1 md:mt-0">
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg shadow-sm transition-colors font-semibold ${theme === "light" ? "bg-white text-black hover:bg-gray-100" : "bg-[#121428] text-white hover:bg-gray-800"}`}>
                        {theme !== "light" ? (
                            <>
                                <span role="img" aria-label="Night">🌙</span>
                                Black Theme
                            </>
                        ) : (
                            <>
                                <span role="img" aria-label="Day">☀️</span>
                                Light Theme
                            </>
                        )}
                    </button>
                </div> */}
            </div>
        </header>

    );
}
