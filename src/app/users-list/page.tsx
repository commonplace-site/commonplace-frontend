'use client'

import PageTitle from "@/components/page-title/PageTitle"
import { useUserStore } from "@/store/useUserStore";
import { MoreVertical, Trash2, Shield, Ban, UserCog } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import * as Switch from "@radix-ui/react-switch";
import { Input } from '@/components/ui/input';
import { UserRoles } from "@/types/user";


const roleOptions = ["Student", "Teacher", "Admin", "Developer"] as const;

const UsersList = () => {
    const usersList = useUserStore((store) => store.usersList);
    const setUsersList = useUserStore((store) => store.setUsersList);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
    const [confirmAction, setConfirmAction] = useState<{ type: 'delete' | 'block' | 'role'; index: number } | null>(null);
    const [newRole, setNewRole] = useState<string>('Student');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRoles>('all');
    const [blockedFilter, setBlockedFilter] = useState<'all' | 'blocked' | 'unblocked'>('all');


    const menuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpenMenuIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const capitalizeFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

    const applyAction = () => {
        if (!confirmAction) return;
        const { index, type } = confirmAction;
        const updated = [...usersList];
        const user = updated[index];
        if (type === 'delete') {
            updated.splice(index, 1);
        } else if (type === 'block') {
            user.blocked = !user.blocked;
        } else if (type === 'role') {
            user.role = newRole as typeof user.role;
        }
        setUsersList(updated);
        setConfirmAction(null);
    };

    return (
        <div className="page">
            <PageTitle title="Users List" returnPage="Dashboard" returnPageHref="/" icon={<UserCog size={22} />} subtitle="Admin panel for managing users" />
            <section className="mb-4">
                <div className="flex items-center gap-2">
                    <Input
                        placeholder="Search user..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
                        className="bg-[#1c1b22] text-white hover:bg-white/10 border-0 rounded-md px-3 py-1.5 text-sm"
                    >
                        <option value="all">All Roles</option>
                        {roleOptions.map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
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
            </section>
            <section className="space-y-4">
                {usersList
                    .filter(user => user.username.toLowerCase().includes(searchTerm.toLowerCase()))
                    .filter(user => roleFilter === 'all' || user.role === roleFilter)
                    .filter(user =>
                        blockedFilter === 'all' ||
                        (blockedFilter === 'blocked' && user.blocked) ||
                        (blockedFilter === 'unblocked' && !user.blocked)
                    )
                    .map((user, index) => (
                        <div key={user.username} className="container relative flex flex-col sm:flex-row sm:items-center justify-between gap-2 py-3 px-4">
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
                                                setOpenMenuIndex(null);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm hover:bg-[#38373f] text-white flex items-center gap-2"
                                        >
                                            <Ban size={14} /> {user.blocked ? "Unblock User" : "Block User"}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setConfirmAction({ type: 'delete', index });
                                                setOpenMenuIndex(null);
                                            }}
                                            className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-[#38373f] flex items-center gap-2"
                                        >
                                            <Trash2 size={14} /> Delete User
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
            </section>

            {confirmAction !== null && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                    <div className="container max-w-sm text-center">
                        <h2 className="text-title mb-4">
                            {confirmAction.type === "block" && usersList[confirmAction.index].blocked ? "Unblock" : capitalizeFirst(confirmAction.type)} user
                        </h2>

                        {confirmAction.type === 'role' ? (
                            <>
                                <p className="text-subtitle mb-4">Select new role for <span className="text-title">{usersList[confirmAction.index].username}</span></p>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value)}
                                    className="w-full bg-[#2a2930] text-white border border-[#555] rounded-md px-3 py-2 mb-4"
                                >
                                    {roleOptions.map(role => <option key={role} value={role}>{role}</option>)}
                                </select>
                            </>
                        ) : (
                            <p className="text-subtitle mb-4">
                                Are you sure you want to {confirmAction.type === "block" && usersList[confirmAction.index].blocked ? "unblock" : confirmAction.type}{" "}
                                <span className="text-title">{usersList[confirmAction.index].username}</span>?
                            </p>
                        )}
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-6 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-700"
                                onClick={() => setConfirmAction(null)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
                                onClick={applyAction}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;
