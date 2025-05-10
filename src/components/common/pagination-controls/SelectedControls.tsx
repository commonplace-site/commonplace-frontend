import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "@/types/file";
import { ModalConfirm } from "../modal-confirm/ModalConfirm";

export default function SelectedControls({
    selectedIds,
    setSelectedIds,
    files,
    deleteFile,
}: {
    selectedIds: string[];
    setSelectedIds: (ids: string[]) => void;
    files: UploadedFile[];
    deleteFile: (id: string) => void;
}) {
    const [showConfirm, setShowConfirm] = useState(false);

    const handleDownload = () => {
        selectedIds.forEach((id) => {
            const file = files.find((f) => f.id === id);
            if (file) {
                const a = document.createElement("a");
                a.href = file.url;
                a.download = file.url.split("/").pop() || "file";
                a.click();
            }
        });
    };

    const handleDelete = () => {
        selectedIds.forEach((id) => deleteFile(id));
        setSelectedIds([]);
    };

    return (
        <div className="h-[7%] flex flex-row gap-2 items-center justify-end mb-2">
            <span className="text-description">Selected {selectedIds.length} files:</span>
            <Button
                disabled={!selectedIds.length}
                className="commonplace-button font-normal text-[12px] h-[30px] bg-opacity-50"
                onClick={handleDownload}
            >
                Download Selected
            </Button>
            <Button
                disabled={!selectedIds.length}
                className="commonplace-button font-normal text-[12px] h-[30px] bg-opacity-50"
                onClick={() => setShowConfirm(true)}
            >
                Delete Selected
            </Button>

            <ModalConfirm
                open={showConfirm}
                onClose={() => setShowConfirm(false)}
                onConfirm={handleDelete}
                title={`Delete ${selectedIds.length} files?`}
                description="Are you sure you want to delete all selected files? This action cannot be undone."
                confirmLabel="Delete All"
            />
        </div>
    );
}
