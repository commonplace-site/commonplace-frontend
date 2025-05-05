'use client'

import PageTitle from "@/components/page-title/PageTitle";
import { Settings } from "lucide-react";
import { JSX } from "react";
import { useTheme } from "../ThemeContext";
import * as Switch from "@radix-ui/react-switch";

const ThemeMode = (): JSX.Element => {
    const { theme, toggleTheme } = useTheme();

    return <section>
        <div className="subtitle">Day/Night Mode</div>
        <div className="container flex justify-between">
            <p className="text-subtitle mr-2">Select a theme: </p>
            <Switch.Root
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
                className="w-10 h-6 mt-0.5 bg-gray-300 rounded-full relative transition-colors"
            >
                <Switch.Thumb
                    className="block w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 translate-x-1 data-[state=checked]:translate-x-5"
                />
            </Switch.Root>
        </div>
    </section>
}

export default function AccountSettings() {
    return (
        <div className="page">
            <PageTitle title="Account Settings" returnPageHref="/" returnPage="Dashboard" icon={<Settings size={18} />} />
            <ThemeMode />
        </div>
    );
}