export type CurrentUser = {
    username: string,
    role: 'Student' | 'Teacher' | 'Admin',
    module_label: 'English' | 'Chinese',
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
    setCurrentUser: (user: CurrentUser) => void;
    updateCurrentUser: (partial: Partial<CurrentUser>) => void;
};