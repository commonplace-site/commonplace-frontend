'use client'

import { useGroupStore } from '@/store/useGroupStore';
import { useUserStore } from '@/store/useUserStore';
import { useState } from 'react';
import { Download, Plus, Archive, Pencil, Group } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PageTitle from '@/components/page-title/PageTitle';

const GroupTracking = () => {
    const { groups, setGroups } = useGroupStore();
    const users = useUserStore((s) => s.usersList);
    const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
    const [editGroupName, setEditGroupName] = useState('');
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [editUserIds, setEditUserIds] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [archiveFilter, setArchiveFilter] = useState<'all' | 'archived' | 'active'>('all');
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);


    const filteredGroups = groups.filter(group =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (archiveFilter === 'all' ||
            (archiveFilter === 'archived' && group.archived) ||
            (archiveFilter === 'active' && !group.archived))
    );

    const toggleArchive = (id: string) => {
        setGroups(groups.map((g) =>
            g.id === id ? { ...g, archived: !g.archived } : g
        ));
    };

    const exportLogs = (groupId: string) => {
        const group = groups.find((g) => g.id === groupId);
        if (!group) return;

        const groupUsers = users
            .filter((u) => group.users_id.includes(u.id))
            .map((u) => ({ id: u.id, username: u.username }));

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { users_id, ...groupData } = group;

        const data = {
            ...groupData,
            users: groupUsers
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
        const link = document.createElement('a');
        link.href = dataStr;
        link.download = `${groupId}_logs.json`;
        link.click();
    };


    const saveGroupChanges = () => {
        if (!editingGroupId) return;
        setGroups(groups.map((g) =>
            g.id === editingGroupId ? { ...g, name: editGroupName.trim(), users_id: editUserIds } : g
        ));
        setEditingGroupId(null);
        setEditGroupName('');
        setSelectedUserIds([]);
    };

    const editingGroup = groups.find((g) => g.id === editingGroupId);

    return (
        <div className="page">
            <PageTitle title="Group Tracking" icon={<Group />} returnPage='Dashboard' returnPageHref='/' subtitle='Cohort and Group Tracking' />
            <section>
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        placeholder="Search group..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1"
                    />
                    <div className="relative">
                        <Button
                            variant="outline"
                            className="text-subtitle border-0"
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                        >
                            {archiveFilter === 'all'
                                ? 'Show All'
                                : archiveFilter === 'active'
                                    ? 'Only Active'
                                    : 'Only Archived'}
                        </Button>
                        {filterDropdownOpen && (
                            <div className="absolute right-0 mt-1 bg-[#2a2930] border border-[#444] rounded-md shadow-lg z-10 w-44">
                                {['all', 'active', 'archived'].map((val) => (
                                    <button
                                        key={val}
                                        onClick={() => {
                                            setArchiveFilter(val as typeof archiveFilter);
                                            setFilterDropdownOpen(false);
                                        }}
                                        className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 ${archiveFilter === val ? 'bg-white/10' : ''
                                            }`}
                                    >
                                        {val === 'all' ? 'Show All' : val === 'active' ? 'Only Active' : 'Only Archived'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="subtitle mb-0">Existing Groups</h2>
                    <Button onClick={() => setEditingGroupId("new")}>
                        <Plus className="mr-2 h-4 w-4" /> Create New Group
                    </Button>
                </div>
                <div className="space-y-4">
                    {filteredGroups.map((group) => (
                        <div key={group.id} className="container">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-title">{group.name}</div>
                                    <div className="text-description">
                                        {group.users_id.length} users · Created {new Date(group.createdAt).toLocaleDateString()}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm flex items-center gap-1"
                                        onClick={() => exportLogs(group.id)}
                                    >
                                        <Download className="w-4 h-4" />
                                        Export JSON
                                    </Button>
                                    <Button
                                        className="px-3 w-[100px] py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm flex items-center gap-1"
                                        onClick={() => toggleArchive(group.id)}
                                    >
                                        <Archive className="w-4 h-4" />
                                        {group.archived ? 'Unarchive' : 'Archive'}
                                    </Button>
                                    <Button size="icon" variant="ghost" onClick={() => {
                                        setEditingGroupId(group.id);
                                        setEditGroupName(group.name);
                                        setEditUserIds(group.users_id);
                                    }}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {editingGroupId === "new" && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#1c1b22] border border-[#444] rounded-xl shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-title mb-4">Create New Group</h2>

                        <Input
                            placeholder="Group name"
                            value={editGroupName}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            className="mb-4"
                        />

                        <div className="mb-4">
                            <h3 className="text-subtitle">Add Users</h3>
                            <div className="max-h-48 overflow-y-auto space-y-2">
                                {users.map((u) => (
                                    <label key={u.id} className="flex items-center gap-2 text-description">
                                        <input
                                            type="checkbox"
                                            checked={selectedUserIds.includes(u.id)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    setSelectedUserIds([...selectedUserIds, u.id]);
                                                } else {
                                                    setSelectedUserIds(selectedUserIds.filter(id => id !== u.id));
                                                }
                                            }}
                                            className="accent-indigo-500"
                                        />
                                        {u.username}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" className='text-subtitle' onClick={() => {
                                setEditingGroupId(null);
                                setEditGroupName('');
                                setSelectedUserIds([]);
                            }}>Cancel</Button>
                            <Button variant="ghost" className='text-subtitle' onClick={() => {
                                const trimmed = editGroupName.trim();
                                if (!trimmed) return;
                                setGroups([
                                    ...groups,
                                    {
                                        id: `group-${Date.now()}`,
                                        name: trimmed,
                                        createdAt: new Date().toISOString(),
                                        archived: false,
                                        users_id: selectedUserIds,
                                    }
                                ]);
                                setEditingGroupId(null);
                                setEditGroupName('');
                                setSelectedUserIds([]);
                            }}>Create</Button>
                        </div>
                    </div>
                </div>
            )}

            {editingGroupId && editingGroup && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#1c1b22] border border-[#444] rounded-xl shadow-lg p-6 w-[90%] max-w-md">
                        <h2 className="text-title mb-4">Edit Group</h2>

                        <Input
                            placeholder="Group name"
                            value={editGroupName}
                            onChange={(e) => setEditGroupName(e.target.value)}
                            className="mb-4"
                        />

                        <div className="mb-4">
                            <h3 className="text-subtitle">Manage Users</h3>
                            <div className="max-h-48 overflow-y-auto space-y-2">
                                {users.map((u) => (
                                    <label key={u.id} className="flex items-center gap-2 text-description">
                                        <input
                                            type="checkbox"
                                            checked={editUserIds.includes(u.id)}
                                            onChange={(e) => {
                                                setEditUserIds((prev) =>
                                                    e.target.checked
                                                        ? [...prev, u.id]
                                                        : prev.filter((id) => id !== u.id)
                                                );
                                            }}
                                            className="accent-indigo-500"
                                        />
                                        {u.username}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <Button variant="ghost" className='text-subtitle' onClick={() => setEditingGroupId(null)}>Cancel</Button>
                            <Button variant="ghost" className='text-subtitle' onClick={saveGroupChanges}>Save</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GroupTracking;
