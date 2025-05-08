'use client'

import PageTitle from "@/components/common/page-title/PageTitle";
import PaginationControls from "@/components/common/pagination-controls/PaginationControls";
import FileSearch from "@/components/common/search/Search";
import File from "@/components/features/uploaded-files/File";
import { useUploadedFilesStore } from "@/store/useUploadedFilesStore";
import { FolderSearch } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function FileOversight() {
    const files = useUploadedFilesStore((store) => store.files);
    const deleteFile = useUploadedFilesStore((store) => store.deleteFile);

    const [filteredFiles, setFilteredFiles] = useState(files);
    const [currentPage, setCurrentPage] = useState(1);

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
                    <div className="h-[90%] overflow-y-auto">
                        <div className="grid gap-4 grid-cols-3 pr-4">
                            {paginatedFiles.map((file) => (
                                <File key={file.id} file={file} deleteFile={() => deleteFile(file.id)} />
                            ))}
                        </div>
                    </div>
                    <div className="h-[10%] mt-2 pr-4">
                        <PaginationControls
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                </div>
                <div className="w-[30%] h-full container">
                    <FileSearch data={files} onFilter={setFilteredFiles} />
                </div>
            </div>
        </div>
    );
}
