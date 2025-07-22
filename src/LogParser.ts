export interface LogEntry {
    timestamp: string;
    level: string;
    category?: string;
    message: string;
    raw: string;
    lineNumber: number;
    isGrouped?: boolean;
    groupedEntries?: LogEntry[];
    isDuplicate?: boolean;
    originalTimestamp?: string;
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
                    lineNumber,
                    originalTimestamp: timestamp.trim()
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
                    lineNumber,
                    originalTimestamp: ''
                });
            }
        }

        // Don't forget the last entry
        if (currentEntry) {
            entries.push(currentEntry);
        }

        // Return entries without additional processing that was causing incorrect grouping
        return entries;
    }

    private static processEntries(entries: LogEntry[]): LogEntry[] {
        const processedEntries: LogEntry[] = [];
        
        for (let i = 0; i < entries.length; i++) {
            const entry = entries[i];
            
            // Check for inner log timestamps in message
            const innerTimestamp = this.extractInnerTimestamp(entry.message);
            if (innerTimestamp && this.isDuplicateTimestamp(entry.timestamp, innerTimestamp)) {
                // Remove inner timestamp from message
                entry.message = this.removeInnerTimestamp(entry.message);
                entry.isDuplicate = true;
            }
            
            // Try to group with previous entry
            const lastEntry = processedEntries[processedEntries.length - 1];
            if (lastEntry && this.shouldGroupEntries(lastEntry, entry)) {
                // Group with previous entry
                if (!lastEntry.isGrouped) {
                    lastEntry.isGrouped = true;
                    lastEntry.groupedEntries = []; // Start with empty array, don't include the entry itself
                }
                lastEntry.groupedEntries!.push(entry);
                lastEntry.message += '\n' + entry.message;
                lastEntry.raw += '\n' + entry.raw;
            } else {
                processedEntries.push(entry);
            }
        }
        
        return processedEntries;
    }

    private static extractInnerTimestamp(message: string): string | null {
        const innerMatch = message.match(/^\[(\d{2}:\d{2}:\d{2})\s+\w+\]/);
        return innerMatch ? innerMatch[1] : null;
    }

    private static isDuplicateTimestamp(outerTimestamp: string, innerTimestamp: string): boolean {
        const outerTime = outerTimestamp.substring(11, 19); // Extract HH:mm:ss
        return Math.abs(this.timeToSeconds(outerTime) - this.timeToSeconds(innerTimestamp)) <= 1;
    }

    private static timeToSeconds(time: string): number {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    }

    private static removeInnerTimestamp(message: string): string {
        return message.replace(/^\[(\d{2}:\d{2}:\d{2})\s+\w+\]\s*/, '');
    }

    private static shouldGroupEntries(prev: LogEntry, current: LogEntry): boolean {
        // Group if same timestamp, level, and category within 1 second
        if (prev.category === current.category && 
            prev.level === current.level &&
            Math.abs(this.timeToSeconds(prev.timestamp.substring(11, 19)) - 
                    this.timeToSeconds(current.timestamp.substring(11, 19))) <= 1) {
            return true;
        }

        // Also group continuation lines (no timestamp)
        if (!current.timestamp) {
            return true;
        }

        return false;
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