import { Group, GroupState } from "@/types/group";
import { create } from "zustand";

const defaultGroups: Group[] = [
    {
        id: "group-001",
        name: "Taipei Spring 2025",
        createdAt: "2025-01-15T10:00:00.000Z",
        archived: false,
        users_id: ["user-3"],
    },
    {
        id: "group-002",
        name: "Berlin Winter 2024",
        createdAt: "2024-11-01T09:30:00.000Z",
        archived: true,
        users_id: ["user-1"],
    },
    {
        id: "group-003",
        name: "Online Intensive May 2025",
        createdAt: "2025-05-01T08:00:00.000Z",
        archived: false,
        users_id: ["user-1", "user-3"],
    },
]

export const useGroupStore = create<GroupState>((set) => ({
    groups: defaultGroups,
    setGroups: (groups) => set({ groups: groups }),
}))