export type SystemLogType = 'auth' | 'deployment' | 'module' | 'upload' | 'info' | 'system' | 'flag' | 'aalam';

export type SystemLogEntry = {
    id: string;
    timestamp: string; // ISO format
    type: SystemLogType;
    source: string; // module or service name, e.g. 'language-test', 'dev-portal'
    message: string;
    details?: string; // optional expanded description or stack trace
    userId?: string;
    username?: string;
    metadata?: Record<string, any>;
}

export type SystemLogsState = {
    logs: SystemLogEntry[];
    setLogs: (logs: SystemLogEntry[]) => void;
    addLog: (log: SystemLogEntry) => void;
    deleteLog: (id: string) => void;
    updateLog: (id: string, updatedFields: Partial<SystemLogEntry>) => void;
};