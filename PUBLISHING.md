# Publishing Guide to VS Code Marketplace

## Prerequisites

1. **Visual Studio Marketplace Account**
   - Go to [Visual Studio Marketplace](https://marketplace.visualstudio.com/)
   - Sign in with Microsoft account
   - Create a publisher account if you don't have one

2. **Personal Access Token (PAT)**
   - Go to [Azure DevOps](https://dev.azure.com/)
   - User Settings → Personal Access Tokens
   - Create new token with **Marketplace (manage)** scope
   - Save the token securely (you'll need it later)

3. **Install VSCE (Visual Studio Code Extension CLI)**
   ```bash
   npm install -g @vscode/vsce
   ```

## Manual Publishing Steps

### 1. Prepare the Extension

```bash
# Ensure everything is compiled
npm run compile

# Run quality checks
vsce ls  # Lists what will be packaged
```

### 2. Package the Extension

```bash
# Create VSIX package
vsce package

# This creates: kros-log-viewer-1.0.0.vsix
```

### 3. Test the Package

```bash
# Install locally to test
code --install-extension kros-log-viewer-1.0.0.vsix

# Test functionality, then uninstall
code --uninstall-extension kros.kros-log-viewer
```

### 4. Publish to Marketplace

```bash
# Login to marketplace
vsce login kros  # Replace 'kros' with your publisher name

# Publish (will prompt for PAT token)
vsce publish

# OR publish with specific version
vsce publish 1.0.0

# OR publish with token directly
vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN
```

## Automated Publishing with GitHub Actions

The repository includes GitHub Actions that will automatically:

1. **Build and test** on every push/PR
2. **Publish to marketplace** when you create a git tag

### Setup Automated Publishing

1. **Add PAT to GitHub Secrets**
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add new repository secret:
     - Name: `VSCE_PAT`
     - Value: Your Personal Access Token

2. **Create a Release**
   ```bash
   # Tag a version
   git tag v1.0.0
   git push origin v1.0.0
   ```
   
   The GitHub Action will automatically:
   - Build the extension
   - Run quality checks
   - **If VSCE_PAT is set**: Publish to marketplace
   - **If VSCE_PAT is missing**: Skip publish but create GitHub release with VSIX file
   - Create GitHub release with VSIX file

### Detailed GitHub Secrets Setup

1. **Create Personal Access Token**
   - Go to [Azure DevOps](https://dev.azure.com/)
   - Click your profile picture → Personal Access Tokens
   - Click "New Token"
   - Name: "VS Code Marketplace Publishing"
   - Scopes: Select **"Marketplace (manage)"** only
   - Click "Create" and **save the token immediately**

2. **Add Secret to GitHub Repository**
   - Go to your GitHub repository
   - Settings → Security → Secrets and variables → Actions
   - Click "New repository secret"
   - Name: `VSCE_PAT`
   - Secret: Paste your Personal Access Token
   - Click "Add secret"

3. **Verify Setup**
   ```bash
   # Create a test tag to trigger the action
   git tag v1.0.1
   git push origin v1.0.1
   
   # Check GitHub Actions tab for build status
   ```

### What Happens During Automated Publishing

**✅ With VSCE_PAT configured:**
- Builds extension
- Publishes to VS Code Marketplace automatically
- Creates GitHub release with VSIX file
- Release notes indicate marketplace publication

**⚠️ Without VSCE_PAT configured:**
- Builds extension successfully
- Skips marketplace publishing (with helpful message)
- Creates GitHub release with VSIX file for manual installation
- Release notes indicate manual installation required

## Version Management

### Update Version Number

Update version in `package.json`:

```json
{
  "version": "1.0.1"
}
```

### Publishing Updates

```bash
# For patch updates (1.0.0 → 1.0.1)
vsce publish patch

# For minor updates (1.0.0 → 1.1.0)  
vsce publish minor

# For major updates (1.0.0 → 2.0.0)
vsce publish major
```

## Pre-Publication Checklist

- [ ] All TypeScript compiles without errors
- [ ] Extension works in development mode (`F5`)
- [ ] README.md is complete and accurate
- [ ] CHANGELOG.md is updated
- [ ] License file exists
- [ ] package.json has correct metadata
- [ ] .vscodeignore excludes unnecessary files
- [ ] Version number is correct
- [ ] Extension tested with sample log files

## Post-Publication Steps

1. **Update GitHub Repository**
   - Create release notes
   - Update documentation if needed
   - Monitor for issues

2. **Promote the Extension**
   - Share with KROS team
   - Add to internal documentation
   - Consider blog post or announcement

## Troubleshooting

### Common Issues

**"Publisher not found"**
- Make sure your publisher name matches exactly
- Verify you're logged in: `vsce logout` then `vsce login publisher-name`

**"Package failed validation"**
- Check `vsce ls` output
- Ensure all required files are included
- Verify package.json format

**"Authentication failed"**
- Generate new PAT token with correct scopes
- Ensure token hasn't expired

### Getting Help

- [VSCE Documentation](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
- [VS Code Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)
- [Marketplace Publisher Management](https://marketplace.visualstudio.com/manage) 