import { create } from "zustand";
import type { CurrentUser, UserState } from "@/types/user";

const defaultCurrentUser: CurrentUser = {
    id: 'user-1',
    username: 'Alex',
    blocked: false,
    role: 'Developer' as const,
    module_label: 'English' as const,
    isAnonymous: false,
    sidebar_items: {
        Student: [
            { href: "/", label: "Dashboard", icon: "LayoutDashboard", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/aalam", label: "Aalam", icon: "Brain", disabled: false, visible: true, status: 'active', group: "General" },
            { href: "/modules", label: "Modules", icon: "Library", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/diagnostic", label: "Diagnostic Module", icon: "Stethoscope", disabled: true, visible: true, status: 'upcoming', group: 'Core Modules' },
            { href: "/language-test", label: "Language Test", icon: "FileText", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/i1-radio", label: "i+1 Radio", icon: "Radio", disabled: true, visible: true, status: 'upcoming', group: 'Core Modules' },
            { href: "/i1-media", label: "i+1 Media", icon: "Video", disabled: true, visible: true, status: 'upcoming', group: 'Core Modules' },
            { href: "/writing-practice", label: "Writing Practice (dev)", icon: "PencilLine", disabled: false, visible: true, status: 'upcoming', group: 'Core Modules' },
            { href: "/speaking-practice", label: "Speaking Practice", icon: "Mic", disabled: false, visible: true, status: 'active', group: 'Core Modules' },
            { href: "/notebook", label: "Notebook", icon: "Notebook", disabled: true, visible: true, status: 'upcoming', group: 'User Tools' },
            { href: "/workspace", label: "Workspace", icon: "LayoutGrid", disabled: true, visible: true, status: 'upcoming', group: 'User Tools' },
            { href: "/groups", label: "Groups", icon: "Users", disabled: true, visible: true, status: 'upcoming', group: 'User Tools' },
            { href: "/comments", label: "Comments", icon: "MessageSquareText", disabled: true, visible: true, status: 'upcoming', group: 'Utilities' },
            { href: "/uptake", label: "Uptake", icon: "UploadCloud", disabled: true, visible: true, status: 'upcoming', group: 'Utilities' },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: 'Utilities' },
            { href: "/about", label: "About", icon: "Info", disabled: true, visible: true, status: 'upcoming', group: 'Utilities' },
        ],
        Teacher: [
            { href: "/", label: "Dashboard", icon: "LayoutDashboard", disabled: true, visible: true, status: 'upcoming', group: "Core Navigation" },
            { href: "/aalam", label: "Aalam", icon: "Brain", disabled: false, visible: true, status: 'active', group: "Core Navigation" },
            { href: "/users-list", label: "Student List View", icon: "ListOrdered", disabled: true, visible: true, status: 'upcoming', group: "Core Navigation" },
            { href: "/module-engagement", label: "Module Engagement", icon: "Activity", disabled: true, visible: true, status: 'upcoming', group: "Core Navigation" },
            { href: "/language-test", label: "Language Test", icon: "FileText", disabled: true, visible: true, status: 'upcoming', group: "Teaching Modules" },
            { href: "/i1-radio", label: "i+1 Radio", icon: "Radio", disabled: true, visible: true, status: 'upcoming', group: 'Teaching Modules' },
            { href: "/i1-media", label: "i+1 Media", icon: "Video", disabled: true, visible: true, status: 'upcoming', group: 'Teaching Modules' },
            { href: "/writing-practice", label: "Writing Practice", icon: "PencilLine", disabled: true, visible: true, status: 'upcoming', group: 'Teaching Modules' },
            { href: "/speaking-practice", label: "Speaking Practice", icon: "Mic", disabled: true, visible: true, status: 'upcoming', group: 'Teaching Modules' },
            { href: "/notebook", label: "Notebook", icon: "Notebook", disabled: true, visible: true, status: 'upcoming', group: 'Teacher Tools' },
            { href: "/workspace", label: "Workspace", icon: "LayoutGrid", disabled: true, visible: true, status: 'upcoming', group: 'Teacher Tools' },
            { href: "/groups", label: "Groups", icon: "Users", disabled: true, visible: true, status: 'upcoming', group: 'Teacher Tools' },
            { href: "/explorers", label: "Explorers", icon: "Compass", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/realms", label: "Realms", icon: "Map", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/resonance", label: "Resonance", icon: "Waveform", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/teacher-settings", label: "Settings & Permissions", icon: "Settings2", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: 'Utilities' },
            { href: "/about", label: "About", icon: "Info", disabled: true, visible: true, status: 'upcoming', group: 'Utilities' },
        ],
        Admin: [
            { href: "/", label: "Dashboard", icon: "LayoutDashboard", disabled: true, visible: true, status: 'upcoming', group: "Core Navigation" },
            { href: "/aalam", label: "Aalam", icon: "Brain", disabled: false, visible: true, status: 'active', group: "Core Navigation" },
            { href: '/room127', label: 'Room 127', icon: "DoorOpen", disabled: true, visible: true, status: 'upcoming', group: 'Core Navigation' },
            { href: '/codex', label: 'Codex', icon: "BookOpen", disabled: true, visible: true, status: 'upcoming', group: 'Core Navigation' },
            { href: '/users-list', label: "Users Management", icon: "UserCog", disabled: false, visible: true, status: 'active', group: 'Admin Console' },
            { href: '/group-tracking', label: 'Group Tracking', icon: "Users2", disabled: false, visible: true, status: 'active', group: 'Admin Console' },
            { href: '/metrics', label: 'Metrics & Usage Stats', icon: "BarChart4", disabled: true, visible: true, status: 'upcoming', group: 'Admin Console' },
            { href: '/flag-controls', label: 'Feature Flag Controls', icon: "Flag", disabled: true, visible: true, status: 'upcoming', group: 'Admin Console' },
            { href: '/system-logs', label: 'System Logs Viewer', icon: "TerminalSquare", disabled: false, visible: true, status: 'active', group: 'Admin Console' },
            { href: '/file-oversight', label: 'File oversight', icon: "FolderSearch", disabled: false, visible: true, status: 'upcoming', group: 'Admin Console' },
            { href: "/entities", label: "Entities", icon: "Layers", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/narratives", label: "Narratives", icon: "BookMarked", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/connections", label: "Connections", icon: "Link2", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/patterns", label: "Patterns", icon: "LayoutGrid", disabled: true, visible: true, status: 'upcoming', group: "Utilities" },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: 'Utilities' },
        ],
        Developer: [
            { href: "/", label: "Dashboard", icon: "LayoutDashboard", disabled: true, visible: true, status: "active", group: "Core Navigation" },
            { href: "/aalam", label: "Aalam", icon: "Brain", disabled: false, visible: true, status: 'active', group: "Core Navigation" },
            { href: '/system-logs', label: 'System Logs Viewer', icon: "TerminalSquare", disabled: false, visible: true, status: 'active', group: 'Dev Tools' },
            { href: '/file-oversight', label: 'File oversight', icon: "FolderSearch", disabled: false, visible: true, status: 'upcoming', group: 'Dev Tools' },
            { href: '/flag-controls', label: 'Feature Flag Controls', icon: "Flag", disabled: true, visible: true, status: 'upcoming', group: 'Dev Tools' },
            { href: '/room127', label: 'Room 127', icon: "DoorOpen", disabled: true, visible: true, status: 'upcoming', group: 'Dev Tools' },
            { href: '/codex', label: 'Codex', icon: "BookOpen", disabled: true, visible: true, status: 'upcoming', group: 'Dev Tools' },
            { href: "/account-settings", label: "Account Settings", icon: "Settings", disabled: false, visible: true, status: 'active', group: 'Utilities' },
        ]
    }
}

export const defaultUsersList = [
    {
        id: 'user-1',
        username: 'Alex',
        blocked: false,
        role: 'Developer' as const,
        module_label: 'English' as const,
        isAnonymous: false,
        sidebar_items: {
            Student: [],
            Teacher: [],
            Admin: [],
            Developer: []
        }
    },
    {
        id: 'user-2',
        username: "alice",
        blocked: false,
        role: "Student" as const,
        module_label: "English" as const,
        isAnonymous: false,
        sidebar_items: {
            Student: [],
            Teacher: [],
            Admin: [],
            Developer: []
        }
    },
    {
        id: 'user-3',
        username: "bob",
        blocked: true,
        role: "Teacher" as const,
        module_label: "Chinese" as const,
        isAnonymous: false,
        sidebar_items: {
            Student: [],
            Teacher: [],
            Admin: [],
            Developer: []
        }
    },
    {
        id: 'user-4',
        username: "carol",
        blocked: false,
        role: "Admin" as const,
        module_label: "English" as const,
        isAnonymous: true,
        sidebar_items: {
            Student: [],
            Teacher: [],
            Admin: [],
            Developer: []
        }
    }
];

export const useUserStore = create<UserState>((set) => ({
    currentUser: defaultCurrentUser,
    usersList: defaultUsersList,
    setCurrentUser: (user) => set({ currentUser: user }),
    setUsersList: (users) => set({ usersList: users }),
    updateCurrentUser: (partial) =>
        set((state) => ({
            currentUser: {
                ...(state.currentUser ?? defaultCurrentUser),
                ...partial,
            },
        })),
}));
