import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadedFile } from "@/types/file";
import { Download, Eye, Pencil, Trash2 } from "lucide-react";
import FilePreviewModal from "./FilePreviewModal";

const style = "bg-black/0 aspect-square w-full p-0 border-t border-t-[#332945] rounded-none hover:bg-white/10 transition-colors duration-150"

export default function File({ file }: { file: UploadedFile }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className="container p-0 flex flex-col gap-2">
                <div className="p-4">
                    <div className="flex justify-between">
                        <div className="text-title truncate">{file.name}</div>
                        <div className="text-description text-right whitespace-nowrap">
                            {file.type.toUpperCase()}
                        </div>
                    </div>
                    <div className="text-subtitle truncate">Uploaded by {file.uploaderUsername}</div>
                    <div className="text-description text-sm">
                        {new Date(file.uploadedAt).toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-4 gap-0 mt-2">
                    <Button disabled size="sm" className={style}><Download size={10} /></Button>
                    <Button size="sm" className={style} onClick={() => setOpen(true)}><Eye size={10} /></Button>
                    <Button disabled size="sm" className={style}><Pencil size={10} /></Button>
                    <Button disabled size="sm" className={style}><Trash2 size={10} /></Button>
                </div>
            </div>

            <FilePreviewModal file={file} open={open} onClose={() => setOpen(false)} />
        </>
    );
}
