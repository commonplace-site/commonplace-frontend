export type FileType = 'audio' | 'video' | 'pdf' | 'image' | 'text';

export type UploadedFile = {
    id: string;
    name: string;
    type: FileType;
    url: string;
    uploadedAt: string; // ISO timestamp
    size?: number;
    uploaderId?: string;
    uploaderUsername?: string;
    metadata?: Record<string, any>;
};

export type FileStoreState = {
    files: UploadedFile[];
    setFiles: (files: UploadedFile[]) => void;
    addFile: (file: UploadedFile) => void;
    updateFile: (file: UploadedFile) => void;
    deleteFile: (id: string) => void;
};
