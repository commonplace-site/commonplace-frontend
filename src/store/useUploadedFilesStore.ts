import { FileStoreState, UploadedFile } from '@/types/file';
import { create } from 'zustand';

export const defaultFiles: UploadedFile[] = [
    {
        id: 'file-1',
        url: '/files/file.mp3',
        uploadedAt: '2025-05-07T09:00:00Z',
        size: 2048000,
        uploaderId: 'user-2',
        uploaderUsername: 'alice',
    },
    {
        id: 'file-2',
        url: '/files/file.mp4',
        uploadedAt: '2025-05-06T15:30:00Z',
        size: 105000000,
        uploaderId: 'user-3',
        uploaderUsername: 'bob',
    },
    {
        id: 'file-3',
        url: '/files/file.pdf',
        uploadedAt: '2025-05-05T12:45:00Z',
        size: 780000,
        uploaderId: 'user-1',
        uploaderUsername: 'Alex',
    },
    {
        id: 'file-4',
        url: '/files/file.png',
        uploadedAt: '2025-05-04T08:20:00Z',
        size: 256000,
        uploaderId: 'user-4',
        uploaderUsername: 'carol',
    },
    {
        id: 'file-5',
        url: '/files/file.txt',
        uploadedAt: '2025-05-03T18:05:00Z',
        size: 3200,
        uploaderId: 'user-2',
        uploaderUsername: 'alice',
    }
];



export const useUploadedFilesStore = create<FileStoreState>((set) => ({
    files: defaultFiles,
    setFiles: (files) => set({ files }),
    addFile: (file) =>
        set((state) => ({
            files: [...state.files, file],
        })),
    updateFile: (updatedFile) =>
        set((state) => ({
            files: state.files.map((file) =>
                file.id === updatedFile.id ? updatedFile : file
            ),
        })),
    deleteFile: (id) =>
        set((state) => ({
            files: state.files.filter((file) => file.id !== id),
        })),
}));
