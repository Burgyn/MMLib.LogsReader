export interface LogEntry {
    timestamp: string;
    level: string;
    category?: string;
    message: string;
    raw: string;
    lineNumber: number;
}

export class LogParser {
    private static readonly LOG_REGEX = /^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d{3} [+-]\d{2}:\d{2}) \[(\w+)\](?:\s*\[([^\]]+)\]>?)?\s*(.*?)$/;

    public static parse(content: string): LogEntry[] {
        const lines = content.split('\n');
        const entries: LogEntry[] = [];
        let currentEntry: LogEntry | null = null;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            const lineNumber = i + 1;

            if (!line.trim()) {
                // Skip empty lines
                continue;
            }

            const match = this.LOG_REGEX.exec(line);
            
            if (match) {
                // If we have a previous entry being built, save it
                if (currentEntry) {
                    entries.push(currentEntry);
                }

                // Start new entry
                const [, timestamp, level, category, message] = match;
                currentEntry = {
                    timestamp: timestamp.trim(),
                    level: level.trim(),
                    category: category?.trim() || undefined,
                    message: message.trim(),
                    raw: line,
                    lineNumber
                };
            } else if (currentEntry) {
                // This is a continuation line (stack trace, multi-line message, etc.)
                currentEntry.message += '\n' + line;
                currentEntry.raw += '\n' + line;
            } else {
                // Orphaned line (doesn't match pattern and no current entry)
                entries.push({
                    timestamp: '',
                    level: 'UNK',
                    category: undefined,
                    message: line,
                    raw: line,
                    lineNumber
                });
            }
        }

        // Don't forget the last entry
        if (currentEntry) {
            entries.push(currentEntry);
        }

        return entries;
    }

    public static formatTimestamp(timestamp: string): string {
        try {
            const date = new Date(timestamp);
            return date.toLocaleString();
        } catch {
            return timestamp;
        }
    }

    public static getLevelColor(level: string): string {
        switch (level.toUpperCase()) {
            case 'ERR':
            case 'ERROR':
                return '#f44336';
            case 'WRN':
            case 'WARN':
            case 'WARNING':
                return '#ff9800';
            case 'INF':
            case 'INFO':
                return '#2196f3';
            case 'DBG':
            case 'DEBUG':
                return '#4caf50';
            case 'VRB':
            case 'VERBOSE':
                return '#9c27b0';
            default:
                return '#666666';
        }
    }

    public static getLevelIcon(level: string): string {
        switch (level.toUpperCase()) {
            case 'ERR':
            case 'ERROR':
                return '❌';
            case 'WRN':
            case 'WARN':
            case 'WARNING':
                return '⚠️';
            case 'INF':
            case 'INFO':
                return 'ℹ️';
            case 'DBG':
            case 'DEBUG':
                return '🐛';
            case 'VRB':
            case 'VERBOSE':
                return '📝';
            default:
                return '📄';
        }
    }
} 