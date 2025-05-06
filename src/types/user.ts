export type CurrentUser = {
    id: string,
    username: string,
    blocked: boolean,
    role: 'Student' | 'Teacher' | 'Admin',
    module_label: 'English' | 'Chinese',
    isAnonymous: boolean,
    sidebar_items: Record<
        'Student' | 'Teacher' | 'Admin',
        {
            href: string;
            label: string;
            icon: string;
            disabled: boolean;
            visible: boolean;
            group: string;
            status: string;
        }[]
    >;
}

export type UserState = {
    currentUser: CurrentUser | null;
    usersList: CurrentUser[] | [];
    setCurrentUser: (user: CurrentUser) => void;
    setUsersList: (users: CurrentUser[]) => void;
    updateCurrentUser: (partial: Partial<CurrentUser>) => void;
};