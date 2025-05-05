export type CurrentUser = {
    username: string,
    role: 'Student' | 'Teacher' | 'Admin',
}

export type UserState = {
    currentUser: CurrentUser | null;
    setCurrentUser: (user: CurrentUser) => void;
    clearCurrentUser: () => void;
};