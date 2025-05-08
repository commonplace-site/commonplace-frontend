import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "@/types/file";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import FilePreviewModal from "./FilePreviewModal";
import { ModalConfirm } from "../../common/modal-confirm/ModalConfirm";

const style = "bg-black/0 aspect-square w-full p-0 border-t border-t-[#332945] rounded-none hover:bg-white/10 transition-colors duration-150"
const typeBadgeMap: Record<string, string> = {
    TEXT: "bg-[#4B5563]/50 text-[#D1D5DB]",       // gray
    IMAGE: "bg-[#2563EB]/50 text-[#93C5FD]",      // blue
    DOCUMENT: "bg-[#10B981]/50 text-[#6EE7B7]",   // green
    VIDEO: "bg-[#8B5CF6]/50 text-[#C4B5FD]",      // violet
    AUDIO: "bg-[#F59E0B]/50 text-[#FCD34D]",      // amber
    default: "bg-white/10 text-white/70",
};


export default function File({ file, deleteFile }: { file: UploadedFile, deleteFile: () => void }) {
    const [open, setOpen] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const fileName = file.url.split('/').pop();
    const fileType = getFileTypeLabel(file.url);
    const badgeStyle = typeBadgeMap[fileType.toUpperCase()] || typeBadgeMap.default;

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

    return (
        <>
            <div className="container p-0 flex flex-col justify-between gap-1">
                <div className="p-2 pb-0 h-[80px] flex flex-col justify-between">
                    <div className="flex items-center justify-between text-sm">
                        <div className="text-title truncate max-w-[60%]">{fileName}</div>
                        <div className={`text-xs text-[10px] whitespace-nowrap px-2 py-0.5 rounded-md font-medium ${badgeStyle}`}>
                            {fileType}
                        </div>
                    </div>
                    <div className="flex justify-between items-center text-xs text-description">
                        <span className="truncate text-[12px]"><span className="text-[10px]">by</span> <span className="cursor-pointer hyperlink">@{file.uploaderUsername}</span></span>
                        <span className="text-[10px]">
                            {new Date(file.uploadedAt).toLocaleDateString("en-GB", {
                                year: "numeric",
                                month: "2-digit",
                                day: "2-digit",
                            })}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-0">
                    <a href={file.url} download className="w-full">
                        <Button size="sm" className={style}>
                            <Download size={10} />
                        </Button>
                    </a>
                    <Button size="sm" className={style} onClick={() => setOpen(true)}><Eye size={10} /></Button>
                    <Button disabled size="sm" className={style}><Pencil size={10} /></Button>
                    <Button size="sm" className={style} onClick={() => setConfirmDelete(true)}><Trash2 size={10} /></Button>
                </div>
            </div>


            <FilePreviewModal file={file} fileName={fileName} fileType={fileType} open={open} onClose={() => setOpen(false)} />

            <ModalConfirm
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
                onConfirm={deleteFile}
                title={`Delete ${fileName}?`}
                description="Are you sure you want to delete this file?"
                confirmLabel="Delete"
            />
        </>
    );
}
