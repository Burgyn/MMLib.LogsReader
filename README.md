# KROS Log Viewer

Enhanced Visual Studio Code extension for viewing and analyzing KROS application logs with advanced filtering and visualization capabilities.

![KROS Log Viewer Screenshot](https://img.shields.io/badge/VSCode-Extension-blue?logo=visualstudiocode)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

- 🎯 **Smart Log Parsing**: Automatically parses KROS log format with timestamp, level, category, and message detection
- 🔍 **Advanced Filtering**: Filter logs by categories and severity levels with multi-select dropdowns
- 🎨 **Color-coded Display**: Different colors for log levels (Error, Warning, Info, Debug, Verbose)
- 📊 **Multi-line Log Support**: Properly groups continuation lines and stack traces
- ⚡ **Performance Optimized**: Efficiently handles large log files with virtual scrolling
- 🖱️ **Context Menu Integration**: Right-click on .log files to open in KROS Log Viewer
- 🔄 **Real-time Updates**: Refresh functionality to reload log files
- 📋 **Visual Indicators**: Clear distinction between main log entries and continuation lines

## 🚀 Installation

### From Visual Studio Code Marketplace

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "KROS Log Viewer"
4. Click Install

### From VSIX Package

1. Download the `.vsix` file
2. Open VS Code
3. Press `Ctrl+Shift+P` and type "Extensions: Install from VSIX"
4. Select the downloaded file

## 📖 Usage

### Opening Log Files

1. **Context Menu**: Right-click any `.log` file in Explorer → "Show KROS Log"
2. **Command Palette**: `Ctrl+Shift+P` → "Show KROS Log"

### Filtering Logs

1. **Categories**: Select specific categories (MyDocuments, Partners, etc.) or "All Categories"
2. **Log Levels**: Choose severity levels (ERR, WRN, INF, DBG, VRB) or "All Levels"  
3. **Apply Filters**: Click "Apply" to update the view
4. **Reset**: Click "Reset" to clear all filters
5. **Refresh**: Click "Refresh" to reload the log file

### Visual Elements

- **Color-coded borders**: Left border indicates log level severity
- **Category badges**: Colored pills showing log categories
- **Continuation lines**: Subtle background for multi-line log entries
- **Line numbers**: Easy navigation and reference

## 📁 Supported Log Format

The extension recognizes KROS log format:

```
2025-07-21 13:08:34.239 +00:00 [INF] [Partners] Log message here
2025-07-21 13:08:34.385 +00:00 [DBG] Debug message without category
2025-07-21 13:08:34.535 +00:00 [ERR] [MyDocuments] Error message
    Stack trace continuation line
    Another continuation line
```

### Log Levels
- `ERR` - Error (red)
- `WRN` - Warning (orange)
- `INF` - Information (blue)
- `DBG` - Debug (green)
- `VRB` - Verbose (purple)

### Categories
Categories are specified in square brackets `[CategoryName]`. If no category is present, it displays as `MAIN`.

## 🛠️ Development

### Prerequisites
- Node.js (v16 or higher)
- Visual Studio Code
- TypeScript

### Building from Source

```bash
# Clone the repository
git clone https://github.com/Burgyn/MMLib.LogsReader.git
cd MMLib.LogsReader

# Install dependencies
npm install

# Compile TypeScript
npm run compile

# Package extension
npm install -g vsce
vsce package
```

### Development Mode

1. Clone the repository
2. Open in VS Code
3. Press `F5` to launch Extension Development Host
4. Test your changes in the new VS Code window

## 📝 Configuration

No additional configuration required. The extension works out of the box with KROS log files.

## 🐛 Known Limitations

- Maximum 1000 log entries displayed at once for performance
- Large files may take a moment to parse initially
- Only supports KROS log format pattern

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for KROS application log analysis
- Inspired by developer needs for better log visualization
- Community feedback and suggestions

## ⚠️ AI Disclosure

This Visual Studio Code extension was developed with significant assistance from artificial intelligence (Claude AI). The AI helped with:

- Code architecture and implementation
- TypeScript and JavaScript development  
- CSS styling and responsive design
- Regular expressions for log parsing
- Performance optimization strategies
- Documentation and README creation

While AI assisted in the development process, all code has been reviewed, tested, and customized for the specific needs of KROS log file analysis. The extension functionality, user experience design, and final implementation decisions were guided by human oversight and testing.

## 📞 Support

For support, bug reports, or feature requests:

- 🐛 [GitHub Issues](https://github.com/Burgyn/MMLib.LogsReader/issues)
- 📧 Email: [your-email@domain.com]
- 💬 [GitHub Discussions](https://github.com/Burgyn/MMLib.LogsReader/discussions)

---

**Made with ❤️ for better log analysis** 