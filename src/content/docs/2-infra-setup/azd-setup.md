---
title: Azure Developer CLI Setup
description: Install and configure Azure Developer CLI (azd) for template deployment
tags: [azd, azure-cli, setup, installation]
---

# Azure Developer CLI Setup

Get started with Azure Developer CLI (azd) to streamline your Azure application development.

## Prerequisites

- Azure subscription
- Git
- Your preferred IDE or code editor

## Installation

### Windows

```powershell
winget install microsoft.azd
```

### macOS

```bash
brew tap azure/azd && brew install azd
```

### Linux

```bash
curl -fsSL https://aka.ms/install-azd.sh | bash
```

## Verification

Verify your installation:

```bash
azd version
```

## Authentication

Sign in to your Azure account:

```bash
azd auth login
```

## Next Steps

Once azd is installed, you can:
- Initialize a new project from a template
- Deploy Azure resources
- Monitor your applications
- Clean up resources when done

Explore the Solution Templates section for ready-to-use templates.
