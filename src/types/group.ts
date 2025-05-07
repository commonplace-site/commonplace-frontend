export type Group = {
    id: string;
    name: string;
    createdAt: string;
    archived: boolean;
    users_id: string[];
};

export type GroupState = {
    groups: Group[] | [];
    setGroups: (groups: Group[]) => void;
};