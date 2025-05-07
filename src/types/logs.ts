export type LogMetadata = {
    ip?: string;
    durationMs?: number;
    relatedFileId?: string;
    affectedModule?: string;
    [key: string]: string | number | boolean | undefined;
};

export type SystemLogType =
    | 'auth'
    | 'deployment'
    | 'module'
    | 'upload'
    | 'info'
    | 'system'
    | 'flag'
    | 'aalam';

export type SystemLogEntry = {
    id: string;
    timestamp: string; // ISO format
    type: SystemLogType;
    source: string;
    message: string;
    details?: string;
    userId?: string;
    username?: string;
    metadata?: LogMetadata;
};

export type SystemLogsState = {
    logs: SystemLogEntry[];
    setLogs: (logs: SystemLogEntry[]) => void;
    addLog: (log: SystemLogEntry) => void;
    deleteLog: (id: string) => void;
    updateLog: (id: string, updatedFields: Partial<SystemLogEntry>) => void;
};
