import { ConfirmAction, CurrentUser } from "@/types/user";
import * as Switch from "@radix-ui/react-switch";
import { MoreVertical, Shield, Ban, Trash2 } from "lucide-react";

interface Props {
    user: CurrentUser;
    index: number;
    openMenuIndex: number | null;
    menuRef: React.RefObject<HTMLDivElement | null>;
    setOpenMenuIndex: (index: number | null) => void;
    setConfirmAction: (action: ConfirmAction | null) => void;
    setNewRole: (role: string) => void;
    usersList: CurrentUser[];
    setOpen: (b: boolean) => void;
    setUsersList: (list: CurrentUser[]) => void;
}

export const UserCard = ({
    user, index, openMenuIndex, menuRef,
    setOpenMenuIndex, setConfirmAction, setNewRole,
    usersList, setOpen, setUsersList,
}: Props) => (
    <div className="container relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 px-4">
        <div className="flex-1 space-y-1">
            <div className="flex items-center gap-3">
                <div className="text-title">{user.username}</div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.blocked ? "bg-red-600" : "bg-green-600"} text-white`}>
                    {user.blocked ? "Blocked" : "Active"}
                </span>
            </div>
            <div className="text-subtitle">
                {user.role}
                {user.role !== "Admin" && ` — ${user.module_label}`}
            </div>
            <div className="flex items-center gap-2 text-description">
                <span>Anonymous:</span>
                <Switch.Root
                    checked={user.isAnonymous}
                    onCheckedChange={(value) => {
                        const updated = [...usersList];
                        updated[index].isAnonymous = value;
                        setUsersList(updated);
                    }}
                    className="w-10 h-6 bg-gray-600 rounded-full data-[state=checked]:bg-green-600 relative outline-none"
                >
                    <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform translate-x-1 data-[state=checked]:translate-x-5" />
                </Switch.Root>
            </div>
        </div>

        <div className="relative self-start sm:self-auto">
            <button onClick={() => setOpenMenuIndex(openMenuIndex === index ? null : index)} className="text-gray-400 hover:text-white">
                <MoreVertical size={18} />
            </button>
            {openMenuIndex === index && (
                <div ref={menuRef} className="absolute right-0 top-6 w-48 bg-[#2a2930] border border-[#444] rounded-md shadow-md z-10">
                    <button
                        onClick={() => {
                            setConfirmAction({ type: 'role', index });
                            setNewRole(usersList[index].role);
                            setOpenMenuIndex(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[#38373f] text-white flex items-center gap-2"
                    >
                        <Shield size={14} /> Change Role
                    </button>
                    <button
                        onClick={() => {
                            setConfirmAction({ type: 'block', index });
                            setOpen(true);
                        }}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-[#38373f] text-white flex items-center gap-2"
                    >
                        <Ban size={14} /> {user.blocked ? "Unblock User" : "Block User"}
                    </button>
                    <button
                        onClick={() => {
                            setConfirmAction({ type: 'delete', index });
                            setOpen(true);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#38373f] flex items-center gap-2"
                    >
                        <Trash2 size={14} /> Delete User
                    </button>
                </div>
            )}
        </div>
    </div>
);
