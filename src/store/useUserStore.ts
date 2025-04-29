import { create } from "zustand";
import type { CurrentUser, UserState } from "@/types/user";

const defaultCurrentUser: CurrentUser = {
    username: 'Alex'
}

const defaultActiveTab: string = 'explorer';

export const useUserStore = create<UserState>((set) => ({
    currentUser: defaultCurrentUser,
    setCurrentUser: (user) => set({ currentUser: user }),
    clearCurrentUser: () => set({ currentUser: null }),
    activeTab: defaultActiveTab,
    setActiveTab: (tab) => set({ activeTab: tab }),
}));
