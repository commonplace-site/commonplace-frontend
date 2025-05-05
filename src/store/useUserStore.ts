import { create } from "zustand";
import type { CurrentUser, UserState } from "@/types/user";

const defaultCurrentUser: CurrentUser = {
    username: 'Alex',
    role: 'Student'
}

export const useUserStore = create<UserState>((set) => ({
    currentUser: defaultCurrentUser,
    setCurrentUser: (user) => set({ currentUser: user }),
    clearCurrentUser: () => set({ currentUser: null }),
}));
