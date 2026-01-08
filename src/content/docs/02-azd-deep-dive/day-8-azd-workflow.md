---
title: 2.1 - AZD Workflow
description: Master the Azure Developer CLI workflow from initialization to deployment
---

Welcome to Week 2! This week we deep dive into Azure Developer CLI. Today we explore the complete AZD workflow and understand each command's purpose.

## What You'll Learn

- The complete AZD workflow from start to finish
- When and why to use each AZD command
- Environment management and configuration
- Best practices for AZD-based development

## Resources

Before diving in, review these resources:

1. 📘 [AZD Architecture and Concepts](https://learn.microsoft.com/azure/developer/azure-developer-cli/architecture) - Understanding AZD internals
2. 📘 [AZD Environments](https://learn.microsoft.com/azure/developer/azure-developer-cli/manage-environment-variables) - Managing environments and configuration
3. 📘 [AZD Commands Reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference) - Complete command documentation

## The AZD Development Lifecycle

```
┌─────────────┐
│   azd init  │  Initialize project
└──────┬──────┘
       ↓
┌─────────────┐
│   azd auth  │  Authenticate to Azure
└──────┬──────┘
       ↓
┌─────────────┐
│ azd provision│ Create infrastructure
└──────┬──────┘
       ↓
┌─────────────┐
│  azd deploy │  Deploy application
└──────┬──────┘
       ↓
┌─────────────┐
│ azd monitor │  Monitor application
└──────┬──────┘
       ↓
┌─────────────┐
│   azd down  │  Clean up resources
└─────────────┘
```

## Core Commands Deep Dive

### 1. `azd init` - Project Initialization

**Purpose**: Start a new project or adopt existing code

**Usage Scenarios**:

**A. From Template**

```bash
azd init --template Azure-Samples/contoso-chat
```

- Clones template repository
- Creates `.azure/` directory
- Prompts for environment name

**B. From Existing Code**

```bash
cd my-existing-project
azd init
```

- Detects project structure
- Prompts for services to deploy
- Creates `azure.yaml` and `infra/` folder

**C. Empty Project**

```bash
mkdir my-new-project
cd my-new-project
azd init
```

- Creates basic structure
- Prompts for language and services

**What Gets Created**:

```
.azure/
  <env-name>/
    .env            # Environment variables (gitignored)
    config.json     # Environment configuration
```

### 2. `azd auth login` - Authentication

**Purpose**: Authenticate with Azure

**Methods**:

**Interactive Login**

```bash
azd auth login
```

Opens browser for Azure authentication

**Device Code Flow**

```bash
azd auth login --use-device-code
```

For environments without browser

**Service Principal**

```bash
azd auth login --client-id <id> --client-secret <secret> --tenant-id <tenant>
```

For CI/CD pipelines

**Check Authentication**

```bash
azd auth login --check-status
```

### 3. `azd env` - Environment Management

**Purpose**: Manage deployment environments

**List Environments**

```bash
azd env list
```

**Create Environment**

```bash
azd env new <env-name>
```

**Select Environment**

```bash
azd env select <env-name>
```

**Set Variables**

```bash
azd env set API_KEY "your-key-value"
azd env set ENABLE_MONITORING true
```

**View Configuration**

```bash
azd env get-values
```

**Real-World Example**:

```bash
azd env new dev
azd env set AZURE_LOCATION eastus
azd env set AZURE_OPENAI_SKU S0

azd env new prod
azd env set AZURE_LOCATION westus
azd env set AZURE_OPENAI_SKU S0
azd env set ENABLE_PRIVATE_ENDPOINTS true
```

### 4. `azd provision` - Infrastructure Deployment

**Purpose**: Create and configure Azure resources

**Basic Usage**

```bash
azd provision
```

**Preview Changes**

```bash
azd provision --preview
```

Shows what will be created/modified (like Terraform plan)

**What Happens**:

1. Reads `azure.yaml` and `infra/` templates
2. Prompts for required parameters
3. Deploys Bicep templates to Azure
4. Captures outputs (endpoints, keys)
5. Stores values in `.azure/<env>/.env`
6. Runs post-provision hooks

**Time**: 5-10 minutes (varies by complexity)

**Output Example**:

```
Provisioning Azure resources (azd provision)

  (✓) Done: Resource group: rg-retailai-dev
  (✓) Done: Azure OpenAI: openai-retailai-dev-abc123
  (✓) Done: AI Search: search-retailai-dev-abc123
  (✓) Done: Cosmos DB: cosmos-retailai-dev-abc123
  (✓) Done: Container Apps Environment: cae-retailai-dev

SUCCESS: Your application was provisioned in 8m 32s
```

### 5. `azd deploy` - Application Deployment

**Purpose**: Build and deploy application code

**Basic Usage**

```bash
azd deploy
```

**Deploy Specific Service**

```bash
azd deploy api
azd deploy web
```

**What Happens**:

1. Builds application code
2. Creates container images (if containerized)
3. Pushes images to Azure Container Registry
4. Deploys to target hosts (Container Apps, Static Web Apps, etc.)
5. Applies environment variables
6. Runs post-deploy hooks

**Time**: 3-5 minutes

**Output Example**:

```
Deploying services (azd deploy)

  (✓) Done: Building api (3m 12s)
  (✓) Done: Deploying api to Container App (1m 45s)
  (✓) Done: Building web (2m 5s)
  (✓) Done: Deploying web to Static Web App (1m 8s)

SUCCESS: Your application was deployed in 5m 10s

Endpoints:
  web: https://retailai-web-abc123.azurestaticapps.net
  api: https://api-abc123.eastus.azurecontainerapps.io
```

### 6. `azd up` - All-in-One

**Purpose**: Provision + Deploy in one command

```bash
azd up
```

**Perfect for**:

- Initial deployment
- Fresh environment setup
- Demo scenarios
- Onboarding new developers

**Equivalent to**:

```bash
azd provision
azd deploy
```

### 7. `azd monitor` - Application Monitoring

**Purpose**: View application telemetry and logs

**Overview Dashboard**

```bash
azd monitor --overview
```

Opens Application Insights overview

**Live Logs**

```bash
azd monitor --logs
```

Streams application logs

**Query Logs**

```bash
azd monitor --logs --query "traces | where severityLevel >= 3"
```

### 8. `azd down` - Resource Cleanup

**Purpose**: Delete all Azure resources

**Basic Usage**

```bash
azd down
```

**Force Delete (no confirmation)**

```bash
azd down --force
```

**Purge (remove soft-deleted resources)**

```bash
azd down --purge
```

**What Gets Deleted**:

- Resource group and all resources
- Deployments
- Role assignments
- **Local environment files remain** (.azure/ folder)

## Environment Configuration

### .azure/<env>/.env File

AZD stores configuration here:

```bash
AZURE_SUBSCRIPTION_ID=12345678-1234-1234-1234-123456789012
AZURE_LOCATION=eastus
AZURE_RESOURCE_GROUP=rg-retailai-dev

AZURE_OPENAI_ENDPOINT=https://openai-retailai-dev.openai.azure.com/
AZURE_SEARCH_ENDPOINT=https://search-retailai-dev.search.windows.net
AZURE_COSMOS_ENDPOINT=https://cosmos-retailai-dev.documents.azure.com:443/

API_KEY=your-api-key
ENABLE_MONITORING=true
LOG_LEVEL=INFO
```

### Accessing in Code

**Python**:

```python
import os

openai_endpoint = os.environ["AZURE_OPENAI_ENDPOINT"]
api_key = os.environ["API_KEY"]
```

**Node.js**:

```javascript
const openaiEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.API_KEY;
```

## Best Practices

### 1. Environment Strategy

- **dev**: Individual developer environments
- **test**: Shared testing environment
- **staging**: Pre-production validation
- **prod**: Production workloads

### 2. Configuration Management

✅ **Store in .env**: Environment-specific values
✅ **Use Key Vault**: Sensitive secrets
✅ **Version Control**: azure.yaml and infra/ templates
❌ **Never Commit**: .azure/ directory contents

### 3. Development Workflow

```bash
azd init --template <template-name>
azd auth login
azd up

azd deploy

azd provision --preview  # Preview changes
azd provision           # Apply changes

azd down
```

### 4. Team Collaboration

**Option A: Shared Dev Resources**

- One dev environment
- Quick but can have conflicts

**Option B: Individual Environments**

- Each developer has own environment
- Higher cost but isolated

**Option C: Ephemeral Environments**

- Create, use, destroy
- Best cost/isolation balance

## Hooks for Customization

Add custom logic to workflow:

### azure.yaml hooks

```yaml
hooks:
  preprovision:
    - echo "About to provision..."

  postprovision:
    - azd env set API_ENDPOINT $(az containerapp show -g $AZURE_RESOURCE_GROUP -n api --query properties.configuration.ingress.fqdn -o tsv)

  predeploy:
    - npm run test

  postdeploy:
    - echo "Deployment complete!"
    - azd env get-values
```

## Troubleshooting Commands

**Check AZD Version**

```bash
azd version
```

**Update AZD**

```bash
azd upgrade
```

**View Detailed Logs**

```bash
azd provision --debug
```

**Show Help**

```bash
azd --help
azd provision --help
```

## Ask Copilot

Explore AZD workflow:

1. "What's the difference between running 'azd up' once versus running 'azd provision' followed by multiple 'azd deploy' commands during development?"
2. "How do you safely manage secrets and API keys when using azd for deployment?"
3. "What happens to Azure resources if you delete the .azure directory locally?"

## Related Resources

- [AZD Best Practices](https://azure.github.io/azure-dev/docs/best-practices/)
- [AZD FAQ](https://learn.microsoft.com/azure/developer/azure-developer-cli/faq)
- [AZD Troubleshooting](https://learn.microsoft.com/azure/developer/azure-developer-cli/troubleshoot)
- [AZD GitHub Discussions](https://github.com/Azure/azure-dev/discussions)

---

**Next**: [Day 9 - Installation & Commands](/02-azd-deep-dive/day-9-installation/)

_Tomorrow we'll cover AZD installation across platforms and explore all available commands in detail._
