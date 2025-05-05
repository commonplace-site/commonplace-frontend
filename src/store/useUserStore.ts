import { create } from "zustand";
import type { CurrentUser, UserState } from "@/types/user";

const defaultCurrentUser: CurrentUser = {
    username: 'Alex',
    role: 'Student',
    module_label: 'English',
    sidebar_items: {
        Student: [
            { href: "/", label: "Home Page", icon: "LayoutDashboard", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/garden", label: "Garden", icon: "TreePine", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/modules", label: "Modules", icon: "Package", disabled: true, visible: false, status: 'upcoming', group: 'Core Modules' },
            { href: "/i1-radio", label: "i+1 Radio", icon: "BookText", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/i1-media", label: "i+1 Media", icon: "TrendingUp", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/language-test", label: "Language Test", icon: "BookOpen", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/shadowbank", label: "Shadowbank", icon: "Users", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/notebook", label: "Notebook", icon: "Notebook", disabled: true, visible: false, status: 'upcoming', group: 'User Tools' },
            { href: "/workspace", label: "Workspace", icon: "Workflow", disabled: true, visible: false, status: 'upcoming', group: 'User Tools' },
            { href: "/groups", label: "Groups", icon: "Group", disabled: true, visible: false, status: 'upcoming', group: 'User Tools' },
            { href: "/comments", label: "Comments", icon: "Text", disabled: true, visible: false, status: 'upcoming', group: 'Utilities' },
            { href: "/uptake", label: "Uptake", icon: "FilePlus", disabled: true, visible: false, status: 'upcoming', group: 'Utilities' },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: 'Utilities' },
            { href: "/about", label: "About", icon: "Info", disabled: true, visible: false, status: 'upcoming', group: 'Utilities' },
        ],
        Teacher: [
            { href: "/garden", label: "Presence", icon: "TreePine", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/explorers", label: "Explorers", icon: "Compass", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/realms", label: "Realms", icon: "LandPlot", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/resonance", label: "Resonance", icon: "Activity", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: "General" },
        ],
        Admin: [
            { href: "/garden", label: "Realm View", icon: "TreePine", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/enitities", label: "Enitities", icon: "Layers", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/narratives", label: "Narratives", icon: "BookOpenText", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/connections", label: "Connections", icon: "Link2", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/patterns", label: "Patterns", icon: "LayoutGrid", disabled: true, visible: false, status: 'upcoming', group: "General" },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: "General" },
        ]
    }
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: defaultCurrentUser,
    setCurrentUser: (user) => set({ currentUser: user }),
    updateCurrentUser: (partial) =>
        set((state) => ({
            currentUser: {
                ...(state.currentUser ?? defaultCurrentUser),
                ...partial,
            },
        })),
}));
