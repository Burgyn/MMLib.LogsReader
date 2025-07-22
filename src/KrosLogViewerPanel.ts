import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { LogParser, LogEntry } from './LogParser';

export class KrosLogViewerPanel {
    public static currentPanel: KrosLogViewerPanel | undefined;
    public static readonly viewType = 'krosLogViewer';

    private readonly _panel: vscode.WebviewPanel;
    private readonly _extensionUri: vscode.Uri;
    private _disposables: vscode.Disposable[] = [];
    private _logEntries: LogEntry[] = [];
    private _filteredEntries: LogEntry[] = [];

    public static createOrShow(extensionUri: vscode.Uri, logFileUri: vscode.Uri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;

        if (KrosLogViewerPanel.currentPanel) {
            KrosLogViewerPanel.currentPanel._panel.reveal(column);
            KrosLogViewerPanel.currentPanel._loadLogFile(logFileUri);
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            KrosLogViewerPanel.viewType,
            'KROS Log Viewer',
            column || vscode.ViewColumn.One,
            {
                enableScripts: true,
                localResourceRoots: [
                    vscode.Uri.joinPath(extensionUri, 'media')
                ]
            }
        );

        KrosLogViewerPanel.currentPanel = new KrosLogViewerPanel(panel, extensionUri);
        KrosLogViewerPanel.currentPanel._loadLogFile(logFileUri);
    }

    private constructor(panel: vscode.WebviewPanel, extensionUri: vscode.Uri) {
        this._panel = panel;
        this._extensionUri = extensionUri;

        this._update();

        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        
        this._panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'filter':
                        this._applyFilter(message.categories, message.levels);
                        return;
                    case 'refresh':
                        this._refreshLogs();
                        return;
                }
            },
            null,
            this._disposables
        );
    }

    public dispose() {
        KrosLogViewerPanel.currentPanel = undefined;

        this._panel.dispose();

        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }

    private async _loadLogFile(logFileUri: vscode.Uri) {
        try {
            const logContent = fs.readFileSync(logFileUri.fsPath, 'utf8');
            console.log(`Loading log file: ${logFileUri.fsPath}`);
            console.log(`File content length: ${logContent.length} characters`);
            
            this._logEntries = LogParser.parse(logContent);
            console.log(`Parsed ${this._logEntries.length} log entries`);
            
            // Debug: Show first few entries
            if (this._logEntries.length > 0) {
                console.log('First few entries:');
                this._logEntries.slice(0, 3).forEach((entry, index) => {
                    console.log(`${index + 1}. Level: "${entry.level}", Category: "${entry.category || 'undefined'}", Message: "${entry.message.substring(0, 50)}..."`);
                });
            }
            
            this._filteredEntries = [...this._logEntries];
            this._update();

            // Show file info
            const stats = fs.statSync(logFileUri.fsPath);
            const fileName = path.basename(logFileUri.fsPath);
            
            this._panel.webview.postMessage({
                command: 'fileLoaded',
                fileName: fileName,
                totalEntries: this._logEntries.length,
                fileSize: this._formatFileSize(stats.size)
            });

            this._sendFilterOptions();
        } catch (error) {
            console.error(`Failed to load log file:`, error);
            vscode.window.showErrorMessage(`Failed to load log file: ${error}`);
        }
    }

    private _sendFilterOptions() {
        const categories = new Set<string>();
        const levels = new Set<string>();

        this._logEntries.forEach(entry => {
            if (entry.category) {
                categories.add(entry.category);
            }
            levels.add(entry.level);
        });

        const categoryArray = Array.from(categories).sort();
        const levelArray = Array.from(levels).sort();
        
        console.log(`Found categories: [${categoryArray.join(', ')}]`);
        console.log(`Found levels: [${levelArray.join(', ')}]`);

        this._panel.webview.postMessage({
            command: 'filterOptions',
            categories: categoryArray,
            levels: levelArray
        });
    }

    private _applyFilter(selectedCategories: string[], selectedLevels: string[]) {
        this._filteredEntries = this._logEntries.filter(entry => {
            const categoryMatch = selectedCategories.length === 0 || 
                                 selectedCategories.includes('ALL') ||
                                 selectedCategories.includes(entry.category || 'MAIN');
            
            const levelMatch = selectedLevels.length === 0 || 
                              selectedLevels.includes('ALL') ||
                              selectedLevels.includes(entry.level);

            return categoryMatch && levelMatch;
        });

        this._panel.webview.postMessage({
            command: 'updateEntries',
            entries: this._filteredEntries.slice(0, 1000), // Limit for performance
            total: this._filteredEntries.length
        });
    }

    private _refreshLogs() {
        // For now, we'll just re-apply the current filter
        this._panel.webview.postMessage({
            command: 'updateEntries',
            entries: this._filteredEntries.slice(0, 1000),
            total: this._filteredEntries.length
        });
    }

    private _formatFileSize(bytes: number): string {
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 Bytes';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    private _update() {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
    }

    private _getHtmlForWebview(webview: vscode.Webview) {
        const styleResetUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'reset.css')
        );
        const styleVSCodeUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'vscode.css')
        );
        const styleMainUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'main.css')
        );
        const scriptUri = webview.asWebviewUri(
            vscode.Uri.joinPath(this._extensionUri, 'media', 'main.js')
        );

        const nonce = getNonce();

        return `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link href="${styleResetUri}" rel="stylesheet">
                <link href="${styleVSCodeUri}" rel="stylesheet">
                <link href="${styleMainUri}" rel="stylesheet">
                <title>KROS Log Viewer</title>
            </head>
            <body>
                <div class="container">
                    <header class="header">
                        <h1>KROS Log Viewer</h1>
                        <div class="file-info">
                            <span id="file-name">No file loaded</span>
                            <span id="file-stats"></span>
                        </div>
                    </header>
                    
                    <div class="filters">
                        <div class="filter-group">
                            <label for="category-filter">Categories:</label>
                            <select id="category-filter" multiple>
                                <option value="ALL" selected>All Categories</option>
                            </select>
                        </div>
                        
                        <div class="filter-group">
                            <label for="level-filter">Log Levels:</label>
                            <select id="level-filter" multiple>
                                <option value="ALL" selected>All Levels</option>
                            </select>
                        </div>
                        
                        <div class="filter-actions">
                            <button id="apply-filter">Apply Filters</button>
                            <button id="clear-filter">Clear All</button>
                            <button id="refresh">Refresh</button>
                        </div>
                    </div>
                    
                    <div class="log-stats">
                        <span id="showing-count">Showing 0 entries</span>
                        <span id="total-count">of 0 total</span>
                    </div>
                    
                    <div class="log-container">
                        <div id="log-entries"></div>
                        <div id="loading" class="loading">Loading...</div>
                    </div>
                </div>
                
                <script nonce="${nonce}" src="${scriptUri}"></script>
            </body>
            </html>`;
    }
}

function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
} 