export type CurrentUser = {
    username: string
}

export type UserState = {
    currentUser: CurrentUser | null;
    setCurrentUser: (user: CurrentUser) => void;
    clearCurrentUser: () => void;
    setActiveTab: (tab: string) => void;
    activeTab: string
};