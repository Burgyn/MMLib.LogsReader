# Change Log

All notable changes to the "KROS Log Viewer" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial release of KROS Log Viewer
- Smart log parsing for KROS log format with timestamp, level, category detection
- Advanced filtering system with multi-select dropdowns for categories and levels
- Color-coded display for different log levels (Error, Warning, Info, Debug, Verbose)
- Multi-line log support with proper grouping of continuation lines
- Context menu integration for right-clicking .log files
- Visual indicators to distinguish between main log entries and continuation lines
- Performance optimization for large log files (displays up to 1000 entries at once)
- Real-time refresh functionality
- Responsive webview interface with VS Code theme integration

### Features
- **Log Levels Support**: ERR (Error), WRN (Warning), INF (Information), DBG (Debug), VRB (Verbose)
- **Category Recognition**: Automatic detection of log categories in square brackets
- **Visual Enhancements**: 
  - Color-coded borders for log levels
  - Category badges with gradient backgrounds
  - Subtle highlighting for continuation lines
  - Line numbers for easy navigation
- **Filtering System**:
  - Category filtering with "All", "Select All", "Select None" options
  - Log level filtering with severity-based selection
  - Apply/Reset/Refresh controls
- **Performance Features**:
  - Virtual scrolling for large files
  - Efficient parsing and rendering
  - Memory-optimized display

### Technical Details
- Built with TypeScript for VS Code
- Custom webview with HTML/CSS/JavaScript frontend
- Regular expression-based log parsing
- Responsive design following VS Code design guidelines

## [Unreleased]

### Planned Features
- Search functionality within log entries
- Export filtered results to file
- Custom log format configuration
- Syntax highlighting for JSON and XML in log messages
- Collapsible multi-line entries
- Timestamp range filtering
- Log statistics and analytics

---

## Development Notes

This extension was developed with assistance from AI (Claude) for:
- Code architecture and implementation
- TypeScript/JavaScript development
- CSS styling and responsive design
- Regular expression patterns for log parsing
- Performance optimization strategies
- Documentation and user experience design

All functionality has been thoroughly tested and customized for KROS log file analysis. 