'use client'

import { UploadedFile } from "@/types/file";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useEffect, useState } from "react";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function FilePreviewModal({
    file,
    open,
    onClose,
}: {
    file: UploadedFile;
    open: boolean;
    onClose: () => void;
}) {

    const [numPages, setNumPages] = useState<number | null>(null);
    const [textContent, setTextContent] = useState("");

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    useEffect(() => {
        if (file.type === "text") {
            fetch("/files/file.txt")
                .then((res) => res.text())
                .then(setTextContent)
                .catch((err) => setTextContent("Failed to load text file."));
        }
    }, [file]);


    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-[#1A1533] text-white modal max-h-[90vh] overflow-auto p-4 rounded-xl border-[#332945]">
                <DialogHeader>
                    <DialogTitle className="text-title">{file.name}</DialogTitle>
                    <DialogClose />
                </DialogHeader>

                {file.type === "audio" && (
                    <audio controls className="w-full">
                        <source src={'/files/file.mp3'} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}

                {file.type === "video" && (
                    <video controls className="w-full max-h-[70vh]">
                        <source src={'/files/file.mp4'} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                {file.type === "text" && (
                    <div className="w-full h-[70vh] bg-white text-black rounded p-4 overflow-auto font-mono text-sm whitespace-pre-wrap border border-[#ccc] shadow-inner">
                        {textContent}
                    </div>
                )}

                {file.type === "image" && (
                    <img
                        src={'/files/file.png'}
                        alt={file.name}
                        className="max-w-full max-h-[70vh] rounded"
                    />
                )}

                {file.type === 'pdf' && (
                    <div className="w-full h-[70vh] bg-white rounded mt-4 overflow-auto px-4">
                        {numPages && (
                            <div className="w-100% flex flex-col">
                                <div className="text-description m-auto mt-2">Please wait a few seconds if the content doesn't load immediately.</div>
                                <div className="text-description m-auto mb-2">Total pages: {numPages}</div>
                            </div>
                        )}
                        <Document
                            file={'/files/file.pdf'}
                            onLoadSuccess={onDocumentLoadSuccess}
                            className="space-y-4"
                        >
                            {Array.from({ length: numPages || 0 }, (_, index) => (
                                <Page key={index} pageNumber={index + 1} />
                            ))}
                        </Document>

                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}
