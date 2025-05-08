import { Input } from "@/components/ui/input";
import { UserRoles } from "@/types/user";

interface Props {
    searchTerm: string;
    roleFilter: string;
    blockedFilter: string;
    setSearchTerm: (val: string) => void;
    setRoleFilter: (val: UserRoles | 'all') => void;
    setBlockedFilter: (val: 'all' | 'blocked' | 'unblocked') => void;
    roleOptions: readonly string[];
}

export const UserFilters = ({ searchTerm, roleFilter, blockedFilter, setSearchTerm, setRoleFilter, setBlockedFilter, roleOptions }: Props) => (
    <div className="flex items-center gap-2">
        <Input
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
        />
        <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as UserRoles | 'all')}
            className="bg-[#1c1b22] text-white hover:bg-white/10 border-0 rounded-md px-3 py-1.5 text-sm"
        >
            <option value="all">All Roles</option>
            {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
        </select>
        <select
            value={blockedFilter}
            onChange={(e) => setBlockedFilter(e.target.value as 'all' | 'blocked' | 'unblocked')}
            className="bg-[#1c1b22] text-white hover:bg-white/10 border-0 rounded-md px-3 py-1.5 text-sm"
        >
            <option value="all">All</option>
            <option value="blocked">Only Blocked</option>
            <option value="unblocked">Only Unblocked</option>
        </select>
    </div>
);
