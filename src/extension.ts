import * as vscode from 'vscode';
import { KrosLogViewerPanel } from './KrosLogViewerPanel';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('krosLogViewer.showLog', (uri: vscode.Uri) => {
        KrosLogViewerPanel.createOrShow(context.extensionUri, uri);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {} 