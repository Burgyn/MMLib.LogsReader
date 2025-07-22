# Installation Guide

## Install from VS Code Marketplace (Recommended)

1. Open **Visual Studio Code**
2. Press `Ctrl+Shift+X` (Windows/Linux) or `Cmd+Shift+X` (Mac) to open Extensions
3. Search for **"KROS Log Viewer"**
4. Click **Install** on the extension by **kros**
5. The extension will be automatically activated

## Install from VSIX File

If you have a `.vsix` file:

1. Open **Visual Studio Code**
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type **"Extensions: Install from VSIX..."**
4. Select the downloaded `.vsix` file
5. Click **Install**
6. Restart VS Code if prompted

## Getting Started

After installation:

1. **Open a log file**: Right-click any `.log` file in VS Code Explorer
2. **Select**: "Show KROS Log" from the context menu
3. **Start filtering**: Use the dropdowns to filter by categories and log levels
4. **Apply filters**: Click the "Apply" button to update the view

## System Requirements

- **Visual Studio Code**: Version 1.74.0 or higher
- **Node.js**: Not required for using the extension (only for development)
- **Operating System**: Windows, macOS, or Linux

## Supported File Types

- `.log` files with KROS log format
- Files with timestamp pattern: `YYYY-MM-DD HH:mm:ss.fff +/-HH:mm [LEVEL] [CATEGORY] Message`

## Troubleshooting

### Extension not appearing in context menu
- Make sure you're right-clicking on a `.log` file
- Try reloading VS Code window: `Ctrl+Shift+P` → "Developer: Reload Window"

### Log file not parsing correctly
- Verify your log file follows the KROS log format
- Check the VS Code Developer Console for error messages: `Help` → `Toggle Developer Tools`

### Performance issues with large files
- The extension limits display to 1000 entries at once for performance
- Use filtering to reduce the number of visible entries
- Consider splitting very large log files

## Uninstallation

1. Open Extensions (`Ctrl+Shift+X`)
2. Find "KROS Log Viewer"
3. Click the gear icon
4. Select "Uninstall"

## Getting Help

- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/Burgyn/MMLib.LogsReader/issues)
- 💬 [GitHub Discussions](https://github.com/Burgyn/MMLib.LogsReader/discussions) 