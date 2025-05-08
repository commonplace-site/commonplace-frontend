import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { UploadedFile } from "@/types/file";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type SearchField = "file" | "username";

export default function FileSearch({
    data,
    onFilter,
}: {
    data: UploadedFile[];
    onFilter: (filtered: UploadedFile[]) => void;
}) {
    const [query, setQuery] = useState("");
    const [field, setField] = useState<SearchField>("file");

    const placeholder =
        field === "file" ? "by filename..." : "by uploader...";

    useEffect(() => {
        const lowerQuery = query.toLowerCase();

        const filtered = data.filter((file) => {
            if (field === "file") {
                const name = file.url.split("/").pop()?.toLowerCase() || "";
                return name.includes(lowerQuery);
            }

            return file.uploaderUsername?.toLowerCase().includes(lowerQuery);
        });

        onFilter(filtered);
    }, [query, data, onFilter, field]);

    return (
        <div>
            <div className="flex items-center gap-2">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    className="flex-1 bg-[#1A1533] text-white border border-[#322945] placeholder:text-[#8E82A1] focus:outline-none focus:ring-2 focus:ring-white/10"
                />
                <ToggleGroup
                    type="single"
                    value={field}
                    onValueChange={(val) => {
                        if (val) setField(val as SearchField);
                    }}
                    className="bg-[#1A1533] border border-[#322945] rounded-md"
                >
                    <ToggleGroupItem value="file" className="px-4 text-xs">
                        File
                    </ToggleGroupItem>
                    <ToggleGroupItem value="username" className="px-4 text-xs">
                        User
                    </ToggleGroupItem>
                </ToggleGroup>
            </div>
        </div>
    );
}