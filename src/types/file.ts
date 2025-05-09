export type FileMetadata = {
    language?: string;
    moduleTarget?: string;
    tags?: string[];
    description?: string;
    source?: 'student' | 'teacher' | 'admin' | 'system';
};

export type UploadedFile = {
    id: string;
    url: string;
    uploadedAt: string;
    size: number;
    uploaderId: string;
    uploaderUsername?: string;
    metadata?: FileMetadata;
};


export type FileStoreState = {
    files: UploadedFile[];
    setFiles: (files: UploadedFile[]) => void;
    addFile: (file: UploadedFile) => void;
    updateFile: (file: UploadedFile) => void;
    deleteFile: (id: string) => void;
};
