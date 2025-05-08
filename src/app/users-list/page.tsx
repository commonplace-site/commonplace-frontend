'use client'

import PageTitle from "@/components/common/page-title/PageTitle"
import { useUserStore } from "@/store/useUserStore";
import { useEffect, useRef, useState } from "react";
import { UserCog } from "lucide-react";
import { UserRoles } from "@/types/user";
import { ModalConfirm } from "@/components/common/modal-confirm/ModalConfirm";
import { UserFilters } from "@/components/features/users/UserFilters";
import { UserCard } from "@/components/features/users/UserCard";

const roleOptions = ["Student", "Teacher", "Admin", "Developer"] as const;

const UsersList = () => {
    const usersList = useUserStore((store) => store.usersList);
    const setUsersList = useUserStore((store) => store.setUsersList);
    const [confirmAction, setConfirmAction] = useState<{ type: 'delete' | 'block' | 'role'; index: number } | null>(null);
    const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

    const [newRole, setNewRole] = useState<string>('Student');
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState<'all' | UserRoles>('all');
    const [blockedFilter, setBlockedFilter] = useState<'all' | 'blocked' | 'unblocked'>('all');
    const [open, setOpen] = useState(false);

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
            <PageTitle
                title="Users List"
                returnPage="Dashboard"
                returnPageHref="/"
                icon={<UserCog size={22} />}
                subtitle="Admin panel for managing users"
            />

            <section className="mb-4">
                <UserFilters
                    searchTerm={searchTerm}
                    roleFilter={roleFilter}
                    blockedFilter={blockedFilter}
                    setSearchTerm={setSearchTerm}
                    setRoleFilter={setRoleFilter}
                    setBlockedFilter={setBlockedFilter}
                    roleOptions={roleOptions}
                />
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
                        <UserCard
                            key={user.username}
                            user={user}
                            index={index}
                            openMenuIndex={openMenuIndex}
                            menuRef={menuRef}
                            setOpenMenuIndex={setOpenMenuIndex}
                            setConfirmAction={setConfirmAction}
                            setNewRole={setNewRole}
                            usersList={usersList}
                            setOpen={setOpen}
                            setUsersList={setUsersList}
                        />
                    ))}
            </section>

            {confirmAction !== null && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                    <div className="container max-w-sm text-center">
                        {confirmAction.type === 'role' && (
                            <ModalConfirm
                                open={true}
                                onConfirm={applyAction}
                                onClose={() => setConfirmAction(null)}
                                title={`Change role for ${usersList[confirmAction.index].username}`}
                                confirmLabel="Confirm"
                            >
                                <div className="space-y-3">
                                    <p className="text-subtitle">
                                        Select new role for <span className="text-title">{usersList[confirmAction.index].username}</span>
                                    </p>
                                    <div className="w-full">
                                        <div className="rounded-md border border-[#444] bg-[#1c1b22]">
                                            <select
                                                id="role-select"
                                                value={newRole}
                                                onChange={(e) => setNewRole(e.target.value)}
                                                className="w-full px-3 py-2 bg-transparent text-white text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
                                            >
                                                {roleOptions.map(role => (
                                                    <option key={role} value={role} className="bg-[#1c1b22] text-white">
                                                        {role}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </ModalConfirm>
                        )}

                        {confirmAction.type === 'block' && (
                            <ModalConfirm
                                open={open}
                                onConfirm={applyAction}
                                onClose={() => {
                                    setOpen(false);
                                    setConfirmAction(null);
                                }}
                                description={`You can ${usersList[confirmAction.index].blocked ? 'block' : 'unblock'} this user at any time later from the user management panel`}
                                title={`Are you sure you want to ${usersList[confirmAction.index].blocked ? "unblock" : "block"} ${usersList[confirmAction.index].username}?`}
                            />)}

                        {confirmAction.type === 'delete' && (
                            <ModalConfirm
                                open={open}
                                onConfirm={applyAction}
                                onClose={() => {
                                    setOpen(false);
                                    setConfirmAction(null);
                                }}
                                description="This action cannot be undone."
                                title={`Are you sure you want to delete account ${usersList[confirmAction.index].username}?`}
                            />)}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersList;