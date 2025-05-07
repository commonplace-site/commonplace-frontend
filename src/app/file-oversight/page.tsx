'use client'

import PageTitle from "@/components/page-title/PageTitle";
import File from "@/components/uploaded-files/File";
import { useUploadedFilesStore } from "@/store/useUploadedFilesStore";
import { FolderSearch } from "lucide-react";

export default function FileOversight() {
    const files = useUploadedFilesStore((store) => store.files);

    return (
        <div className="page">
            <PageTitle
                title="File Oversight"
                icon={<FolderSearch size={22} />}
                returnPage="Dashboard"
                returnPageHref="/"
                subtitle="Central hub for file visibility"
            />

            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {files.map((file) => (
                    <File key={file.id} file={file} />
                ))}
            </div>
        </div>
    );
}