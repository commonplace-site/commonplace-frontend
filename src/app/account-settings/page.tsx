'use client'

import PageTitle from "@/components/common/page-title/PageTitle";
import { Settings, GripVertical, Eye, EyeOff } from "lucide-react";
import { JSX, useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import * as Switch from "@radix-ui/react-switch";
import { useUserStore } from "@/store/useUserStore";
import {
    DndContext,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from "@dnd-kit/core";
import {
    SortableContext,
    verticalListSortingStrategy,
    arrayMove,
    useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { iconMap, IconName } from "@/constants/iconMap";
import { UserRoles } from "@/types/user";

const SidebarItemManagement = () => {
    const currentUser = useUserStore((store) => store.currentUser);
    const updateCurrentUser = useUserStore((store) => store.updateCurrentUser);
    const role = currentUser?.role as UserRoles;

    const [sortableItems, setSortableItems] = useState(
        currentUser?.sidebar_items?.[role] ?? []
    );

    const sensors = useSensors(useSensor(PointerSensor));

    useEffect(() => {
        if (currentUser && role) {
            setSortableItems(currentUser.sidebar_items[role] ?? []);
        }
    }, [currentUser, role]);

    if (!currentUser || !role) return null;

    const groupedItems = sortableItems.reduce((acc, item) => {
        const group = item.group || 'Ungrouped';
        if (!acc[group]) acc[group] = [];
        acc[group].push(item);
        return acc;
    }, {} as Record<string, typeof sortableItems>);

    const SortableItem = ({
        id,
        label,
        icon,
        visible,
        disabled,
        onToggleVisible,
    }: {
        id: string;
        label: string;
        icon: keyof typeof iconMap;
        visible: boolean;
        disabled: boolean;
        onToggleVisible: () => void;
    }) => {
        const {
            attributes,
            listeners,
            setNodeRef,
            transform,
            transition,
            isDragging,
        } = useSortable({ id });

        const style = {
            transform: CSS.Transform.toString(transform),
            transition,
            opacity: isDragging ? 0.6 : 1,
        };

        return (
            <div
                ref={setNodeRef}
                style={style}
                className="flex items-center justify-between px-4 py-2 bg-[#1c1b22] border border-[#333] rounded-xl shadow-sm select-none"
            >
                <div className="flex items-center gap-3">
                    <GripVertical
                        className="text-gray-400 shrink-0 cursor-grab"
                        {...attributes}
                        {...listeners}
                    />
                    <span className="w-5 shrink-0">{iconMap[icon]}</span>
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {label}
                    </span>
                </div>
                <div className="flex items-center gap-1">
                    {disabled && (
                        <div className="flex items-center gap-1 mr-4">
                            <span className="text-description text-white/20">Coming soon</span>
                            <span className="w-1.5 h-1.5 ml-2 bg-red-500 rounded-full inline-block" />
                        </div>
                    )}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onToggleVisible();
                        }}
                        className={`cursor-pointer ${visible ? 'text-white' : 'text-gray-500'} transition-colors`}
                    >
                        {visible ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                </div>
            </div>
        );
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!active || !over || active.id === over.id) return;

        const [activeGroupKey] = Object.entries(groupedItems).find(
            ([, items]) => items.some((i) => i.label === active.id)
        ) || [];

        const [overGroupKey] = Object.entries(groupedItems).find(
            ([, items]) => items.some((i) => i.label === over.id)
        ) || [];

        if (!activeGroupKey || activeGroupKey !== overGroupKey) return;

        const groupItems = [...groupedItems[activeGroupKey]];
        const oldIndex = groupItems.findIndex((i) => i.label === active.id);
        const newIndex = groupItems.findIndex((i) => i.label === over.id);
        const newGroupItems = arrayMove(groupItems, oldIndex, newIndex);

        const newAllItems: typeof sortableItems = [];
        for (const [group, items] of Object.entries(groupedItems)) {
            if (group === activeGroupKey) {
                newAllItems.push(...newGroupItems);
            } else {
                newAllItems.push(...items);
            }
        }

        setSortableItems(newAllItems);
        updateCurrentUser({
            sidebar_items: {
                ...currentUser.sidebar_items,
                [role]: newAllItems,
            },
        });
    };

    return (
        <section>
            <div className="subtitle">Sidebar Item Management</div>
            <div className="container mt-4 space-y-4">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    {Object.entries(groupedItems).map(([group, items]) => (
                        <div key={group} className="space-y-2">
                            <div className="text-xs text-white/60 uppercase tracking-wide px-1">
                                {group}
                            </div>
                            <SortableContext
                                items={items.map((item) => item.label)}
                                strategy={verticalListSortingStrategy}
                            >
                                {items.map((item) => (
                                    <SortableItem
                                        key={item.label}
                                        id={item.label}
                                        label={item.label}
                                        icon={item.icon as IconName}
                                        visible={item.visible}
                                        disabled={item.disabled}
                                        onToggleVisible={() => {
                                            const updatedItems = [...sortableItems];
                                            const globalIndex = updatedItems.findIndex(
                                                (i) => i.label === item.label
                                            );
                                            updatedItems[globalIndex].visible =
                                                !updatedItems[globalIndex].visible;
                                            setSortableItems(updatedItems);

                                            updateCurrentUser({
                                                sidebar_items: {
                                                    ...currentUser.sidebar_items,
                                                    [role]: updatedItems,
                                                },
                                            });
                                        }}
                                    />
                                ))}
                            </SortableContext>
                        </div>
                    ))}
                </DndContext>
            </div>
        </section>
    );
};

function LabeledSwitch({
    title,
    labelLeft,
    labelRight,
    description,
    checked,
    onChange,
}: {
    title: string;
    labelLeft: string;
    labelRight: string;
    description: string;
    checked: boolean;
    onChange: () => void;
}): JSX.Element {
    return (
        <section>
            <div className="subtitle">{title}</div>
            <div className="container flex items-center justify-between">
                <p className="text-subtitle mr-4">{description}</p>
                <div className="flex items-center gap-2">
                    <div className="w-[50px] text-center text-sm font-medium text-gray-700 dark:text-gray-300">{labelLeft}</div>
                    <Switch.Root
                        checked={checked}
                        onCheckedChange={onChange}
                        className="relative w-12 h-6 bg-gray-300 dark:bg-[#444] rounded-full transition-colors duration-300 data-[state=checked]:bg-[#6F6892]"
                    >
                        <Switch.Thumb className="block w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 translate-x-1 data-[state=checked]:translate-x-6" />
                    </Switch.Root>
                    <div className="w-[50px] text-center text-sm font-medium text-gray-700 dark:text-gray-300">{labelRight}</div>
                </div>
            </div>
        </section>
    );
}

export default function AccountSettings() {
    const { theme, toggleTheme } = useTheme();
    const currentUser = useUserStore((store) => store.currentUser);
    

    return (
        <div className="page">
            <PageTitle title="Account Settings" returnPageHref="/" returnPage="Dashboard" icon={<Settings size={22} />} subtitle="Update details and configurations" />
            <LabeledSwitch
                title="Day/Night Mode"
                labelLeft="Light"
                labelRight="Dark"
                description="Select a theme: "
                checked={theme === "dark"}
                onChange={toggleTheme}
            />
            <LabeledSwitch
                title="Module Label"
                labelLeft="English"
                labelRight="Chinese"
                description="Select module language: "
                checked={currentUser?.module_label === "Chinese"}
                onChange={() => {
                    const nextLabel = currentUser?.module_label === "Chinese" ? "English" : "Chinese";
                    useUserStore.getState().updateCurrentUser({ module_label: nextLabel });
                }}
            />
            <SidebarItemManagement />
        </div>
    );
}