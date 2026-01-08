---
title: 2.2 - Installation & Commands
description: Install Azure Developer CLI and master all available commands
---

Today we cover installing AZD on different platforms and explore the complete command reference to become AZD power users.

## What You'll Learn

- How to install AZD on Windows, macOS, and Linux
- Complete AZD command reference
- Configuration and customization options
- Tips and tricks for efficient AZD usage

## Resources

Before diving in, review these resources:

1. 📘 [Install Azure Developer CLI](https://learn.microsoft.com/azure/developer/azure-developer-cli/install-azd) - Official installation guide
2. 📘 [AZD Command Reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference) - Complete command documentation
3. 📘 [AZD Configuration](https://learn.microsoft.com/azure/developer/azure-developer-cli/configure-devcontainer) - Customization options

## Installation

### Windows

**Option 1: Windows Package Manager (winget)**

```powershell
winget install microsoft.azd
```

**Option 2: PowerShell Script**

```powershell
powershell -ex AllSigned -c "Invoke-RestMethod 'https://aka.ms/install-azd.ps1' | Invoke-Expression"
```

**Option 3: MSI Installer**
Download from [aka.ms/azd-windows](https://aka.ms/azd-windows)

**Verify Installation**:

```powershell
azd version
```

### macOS

**Option 1: Homebrew**

```bash
brew tap azure/azd
brew install azd
```

**Option 2: Install Script**

```bash
curl -fsSL https://aka.ms/install-azd.sh | bash
```

**Verify Installation**:

```bash
azd version
```

### Linux

**Option 1: Install Script**

```bash
curl -fsSL https://aka.ms/install-azd.sh | bash
```

**Option 2: Package Managers**

**Ubuntu/Debian**:

```bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

**RHEL/CentOS**:

```bash
curl -sL https://aka.ms/InstallAzureCLIRPM | sudo bash
```

### Dev Containers

Add to `devcontainer.json`:

```json
{
  "features": {
    "ghcr.io/azure/azure-dev/azd:latest": {}
  }
}
```

### GitHub Codespaces

Pre-installed in many Azure templates. If not, use install script.

### CI/CD Pipelines

**GitHub Actions**:

```yaml
- name: Install azd
  uses: Azure/setup-azd@v0.1.0
```

**Azure Pipelines**:

```yaml
- task: Bash@3
  displayName: Install azd
  inputs:
    targetType: inline
    script: |
      curl -fsSL https://aka.ms/install-azd.sh | bash
```

## Complete Command Reference

### Core Workflow Commands

| Command         | Purpose               | Example                          |
| --------------- | --------------------- | -------------------------------- |
| `azd init`      | Initialize project    | `azd init --template <template>` |
| `azd up`        | Provision + Deploy    | `azd up`                         |
| `azd provision` | Create infrastructure | `azd provision`                  |
| `azd deploy`    | Deploy application    | `azd deploy api`                 |
| `azd down`      | Delete resources      | `azd down --force`               |

### Authentication Commands

| Command           | Purpose          | Example                            |
| ----------------- | ---------------- | ---------------------------------- |
| `azd auth login`  | Sign in to Azure | `azd auth login --use-device-code` |
| `azd auth logout` | Sign out         | `azd auth logout`                  |
| `azd auth token`  | Get access token | `azd auth token --output json`     |

### Environment Commands

| Command              | Purpose                | Example                       |
| -------------------- | ---------------------- | ----------------------------- |
| `azd env new`        | Create environment     | `azd env new prod`            |
| `azd env list`       | List environments      | `azd env list`                |
| `azd env select`     | Set active environment | `azd env select dev`          |
| `azd env set`        | Set variable           | `azd env set API_KEY "value"` |
| `azd env get-values` | Show all variables     | `azd env get-values`          |
| `azd env refresh`    | Sync environment       | `azd env refresh`             |

### Monitoring & Troubleshooting

| Command       | Purpose        | Example                  |
| ------------- | -------------- | ------------------------ |
| `azd monitor` | View telemetry | `azd monitor --overview` |
| `azd show`    | Show app info  | `azd show`               |
| `azd version` | Show version   | `azd version`            |
| `azd config`  | Manage config  | `azd config list`        |

### Template Commands

| Command                   | Purpose               | Example                                |
| ------------------------- | --------------------- | -------------------------------------- |
| `azd template list`       | Browse templates      | `azd template list`                    |
| `azd template show`       | Show template details | `azd template show <template>`         |
| `azd template source add` | Add template source   | `azd template source add <name> <url>` |

### Infrastructure Commands

| Command            | Purpose                 | Example            |
| ------------------ | ----------------------- | ------------------ |
| `azd infra create` | Create infra file       | `azd infra create` |
| `azd infra synth`  | Generate ARM from Bicep | `azd infra synth`  |
| `azd infra delete` | Delete infrastructure   | `azd infra delete` |

### Pipeline Commands

| Command               | Purpose         | Example               |
| --------------------- | --------------- | --------------------- |
| `azd pipeline config` | Configure CI/CD | `azd pipeline config` |

## Command Options & Flags

### Global Flags

Available on all commands:

```bash
--cwd <path>              # Change working directory
--debug                   # Enable debug logging
--no-prompt              # Disable interactive prompts
--output <format>        # Output format: json, table, none
--verbose               # Verbose logging
```

**Example**:

```bash
azd provision --debug --output json --no-prompt
```

### Common Flags by Command

**azd init**

```bash
--template <name>        # Template to use
--location <region>      # Azure region
--subscription <id>      # Azure subscription
```

**azd provision**

```bash
--preview               # Show changes without deploying
--no-state             # Don't save state
--no-progress          # Disable progress indicator
```

**azd deploy**

```bash
--service <name>        # Deploy specific service
--from-package <path>   # Deploy from package
--all                  # Deploy all services
```

**azd down**

```bash
--force                # Skip confirmation
--purge               # Remove soft-deleted resources
--no-wait            # Don't wait for completion
```

## Configuration

### Global Configuration

**View Configuration**:

```bash
azd config list
```

**Set Values**:

```bash
azd config set defaults.location eastus

azd config set defaults.subscription <subscription-id>

azd config set telemetry.enabled true

azd config set output.format json
```

**Configuration File**: `~/.azd/config.json`

### Project Configuration (azure.yaml)

```yaml
name: my-app
metadata:
  template: my-app@1.0.0

services:
  api:
    project: ./src/api
    language: python
    host: containerapp

hooks:
  postprovision:
    - echo "Custom hook"

pipeline:
  provider: github
```

## Aliases & Shortcuts

Create shell aliases for frequently used commands:

**Bash/Zsh (~/.bashrc or ~/.zshrc)**:

```bash
alias azdup='azd up'
alias azdp='azd provision'
alias azdd='azd deploy'
alias azdm='azd monitor --overview'
alias azdown='azd down'
```

**PowerShell (Profile)**:

```powershell
function azdup { azd up }
function azdp { azd provision }
function azdd { azd deploy }
function azdm { azd monitor --overview }
function azdown { azd down }
```

## Tips & Tricks

### 1. Quick Environment Switching

```bash
azde() {
  azd env select $1
  azd env get-values
}

azde dev
azde prod
```

### 2. Preview Before Deploying

Always preview infrastructure changes:

```bash
azd provision --preview
azd provision
```

### 3. Deploy Specific Service

When iterating on code:

```bash
azd deploy api    # Only deploy API
azd deploy web    # Only deploy web
```

### 4. Check Resource Status

```bash
azd show

azd show --open-portal
```

### 5. Debug Failed Deployments

```bash
azd deploy --debug

azd monitor --logs
```

### 6. Automate with Scripts

```bash
#!/bin/bash

for env in dev test prod; do
  azd env select $env
  azd provision
  azd deploy
done
```

### 7. Use Environment Variables

```bash
azd env set AZURE_LOCATION eastus \
  API_PORT 8000 \
  LOG_LEVEL DEBUG
```

### 8. Export Configuration

```bash
azd env get-values > config.txt
```

## Shell Completion

Enable tab completion for faster typing:

**Bash**:

```bash
echo 'source <(azd completion bash)' >> ~/.bashrc
```

**Zsh**:

```bash
echo 'source <(azd completion zsh)' >> ~/.zshrc
```

**PowerShell**:

```powershell
azd completion powershell | Out-String | Invoke-Expression
```

## Version Management

**Check Current Version**:

```bash
azd version
```

**Update to Latest**:

```bash
azd upgrade
```

**Install Specific Version**:

```bash
winget install microsoft.azd --version 1.5.0

curl -fsSL https://aka.ms/install-azd.sh | bash -s -- --version 1.5.0
```

## Uninstallation

**Windows**:

```powershell
winget uninstall microsoft.azd
```

**macOS**:

```bash
brew uninstall azd
```

**Linux**:

```bash
sudo rm $(which azd)
```

## Ask Copilot

Explore AZD commands:

1. "What are the performance implications of using '--debug' flag in production deployments?"
2. "How do you configure azd to work behind a corporate proxy?"
3. "What's the best practice for managing azd configuration across a team of developers?"

## Related Resources

- [AZD CLI Reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference)
- [AZD Release Notes](https://github.com/Azure/azure-dev/releases)
- [AZD Configuration Guide](https://learn.microsoft.com/azure/developer/azure-developer-cli/configure-devcontainer)
- [AZD GitHub Repository](https://github.com/Azure/azure-dev)

---

**Next**: [Day 10 - Finding Templates](/02-azd-deep-dive/day-10-finding-templates/)

_Tomorrow we'll explore the AZD template gallery and learn how to find the perfect template for your project._
