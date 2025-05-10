'use client'

import DropdownButton from "@/components/common/filter-button/DropdownButton";
import { ModalConfirm } from "@/components/common/modal-confirm/ModalConfirm";
import PageTitle from "@/components/common/page-title/PageTitle";
import PaginationControls from "@/components/common/pagination-controls/PaginationControls";
import SelectedControls from "@/components/common/pagination-controls/SelectedControls";
import FileSearch from "@/components/common/search/Search";
import File from "@/components/features/uploaded-files/File";
import { Button } from "@/components/ui/button";
import { useUploadedFilesStore } from "@/store/useUploadedFilesStore";
import { FolderSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function FileOversight() {
    const files = useUploadedFilesStore((store) => store.files);
    const deleteFile = useUploadedFilesStore((store) => store.deleteFile);
    const setFiles = useUploadedFilesStore((store) => store.setFiles);

    const [filteredFiles, setFilteredFiles] = useState(files);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [filterType, setFilterType] = useState("all");

    const [allDeleteIsOpen, setAllDeleteIsOpen] = useState(false);

    function getFileTypeLabel(url: string): string {
        const ext = url.split('.').pop()?.toLowerCase();

        switch (ext) {
            case 'txt':
            case 'md':
            case 'csv':
            case 'log':
                return 'TEXT';
            case 'pdf':
            case 'doc':
            case 'docx':
            case 'odt':
            case 'rtf':
                return 'DOCUMENT';
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
            case 'bmp':
            case 'webp':
            case 'svg':
                return 'IMAGE';
            case 'mp4':
            case 'mov':
            case 'avi':
            case 'mkv':
            case 'webm':
                return 'VIDEO';
            case 'mp3':
            case 'wav':
            case 'aac':
            case 'ogg':
            case 'flac':
                return 'AUDIO';
            default:
                return 'FILE';
        }
    }

    const toggleSelect = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
        );
    };

    useEffect(() => {
        setFilteredFiles(files);
        setCurrentPage(1);
    }, [files]);

    const filesPerPage = 15;
    const totalPages = Math.ceil(filteredFiles.length / filesPerPage);

    const paginatedFiles = useMemo(() => {
        const start = (currentPage - 1) * filesPerPage;
        return filteredFiles.slice(start, start + filesPerPage);
    }, [filteredFiles, currentPage]);

    return (
        <div className="page">
            <PageTitle
                title="File Oversight"
                icon={<FolderSearch size={22} />}
                returnPage="Dashboard"
                returnPageHref="/"
                subtitle="Central hub for file visibility"
            />
            <div className="flex h-[560px]">
                <div className="w-[70%] p-2">
                    <div>
                        <SelectedControls
                            selectedIds={selectedIds}
                            setSelectedIds={setSelectedIds}
                            files={files}
                            deleteFile={deleteFile}
                        />
                    </div>
                    <div className="h-[82%] overflow-y-auto">
                        <div className="grid gap-4 grid-cols-3 mr-4">
                            {paginatedFiles.map((file) => (
                                <File
                                    getFileTypeLabel={getFileTypeLabel}
                                    key={file.id}
                                    file={file}
                                    deleteFile={() => deleteFile(file.id)}
                                    selected={selectedIds.includes(file.id)}
                                    toggleSelect={toggleSelect} />
                            ))}
                        </div>
                    </div>
                    <div className="h-[10%] mt-2">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
                <div className="w-[30%] h-full flex flex-col justify-between container">
                    <div className="flex flex-col gap-4">
                        <FileSearch data={files} onFilter={setFilteredFiles} />
                        <DropdownButton
                            label={filterType === "all" ? "All Types" : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                            items={["all", "text", "image", "document", "video", "audio"]}
                            onSelect={(type) => {
                                setFilterType(type);
                                const upper = type.toUpperCase();
                                setFilteredFiles(
                                    type === "all"
                                        ? files
                                        : files.filter((f) => getFileTypeLabel(f.url) === upper)
                                );
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                    <div>
                        <Button
                            variant="destructive"
                            disabled={!files.length}
                            className="commonplace-button h-[30px] text-[12px]"
                            onClick={() => setAllDeleteIsOpen(true)}
                        >
                            Delete All
                        </Button>
                        <ModalConfirm
                            open={allDeleteIsOpen}
                            onClose={() => setAllDeleteIsOpen(false)}
                            onConfirm={() => setFiles([])}
                            title={`Are you sure you want to delete all files?`}
                            description="This action cannot be undone."
                            confirmLabel="Delete All"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
