"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Props {
    label: string;
    items: string[];
    onSelect: (value: string) => void;
}

export default function DropdownButton({ label, items, onSelect }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <div className="relative">
            <Button
                variant="outline"
                className="text-subtitle text-[12px] commonplace-button border-0 w-[100%]"
                onClick={() => setOpen(!open)}
            >
                {label}
            </Button>

            {open && (
                <div className="absolute right-0 mt-1 bg-[#2a2930] border border-[#444] rounded-md shadow-lg z-10 w-44">
                    {items.map((val) => (
                        <button
                            key={val}
                            onClick={() => {
                                onSelect(val);
                                setOpen(false);
                            }}
                            className={`w-full px-4 py-2 text-left text-sm text-white hover:bg-white/10 ${label === val ? "bg-white/10" : ""
                                }`}
                        >
                            {val.charAt(0).toUpperCase() + val.slice(1)}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
