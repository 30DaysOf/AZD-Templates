---
title: 1.7 - AZD Templates Introduction
description: Discover how Azure Developer CLI templates provide complete, deployable solutions
---

Today we complete the provisioning journey by exploring Azure Developer CLI (AZD) templates—the most complete approach to deploying AI applications on Azure.

## What You'll Learn

- What Azure Developer CLI (AZD) is and how it differs from ARM/Bicep
- The structure and components of an AZD template
- How AZD templates provide a complete solution (infrastructure + application)
- The `azd` workflow from init to deploy

## Resources

Before diving in, review these resources:

1. 📘 [Azure Developer CLI Overview](https://learn.microsoft.com/azure/developer/azure-developer-cli/overview) - Official AZD documentation
2. 📘 [AZD Template Gallery](https://azure.github.io/awesome-azd/) - Curated collection of AZD templates
3. 🔗 [AZD GitHub Repository](https://github.com/Azure/azure-dev) - Source code and examples

## The Apartment Analogy: Full-Service Move-In

We've progressed through three scenarios:

| Day       | Analogy                  | Approach            | Completeness      |
| --------- | ------------------------ | ------------------- | ----------------- |
| **Day 5** | Buy one chair            | Manual provisioning | One resource      |
| **Day 6** | Buy full kitchen         | ARM/Bicep template  | Infrastructure    |
| **Day 7** | Hire move-in coordinator | AZD template        | Complete solution |

### The AZD Advantage

**Hiring a move-in coordinator who**:

- Orders and assembles ALL furniture
- Stocks the kitchen with essentials
- Sets up utilities and internet
- Configures smart home devices
- Hangs pictures on walls
- **Leaves you with a ready-to-live-in space**

You can still customize afterwards, but you start from a **fully functional apartment**, not an empty one!

## What is Azure Developer CLI?

**Azure Developer CLI (azd)** is a command-line tool that:

- Provisions Azure infrastructure
- Deploys application code
- Configures services and connections
- Sets up monitoring and logging
- Provides local development workflow
- Enables CI/CD integration

**Key Insight**: AZD templates are **complete solutions**, not just infrastructure definitions.

## AZD vs. Other Approaches

| Feature        | Manual | ARM/Bicep | **AZD Template** |
| -------------- | ------ | --------- | ---------------- |
| Infrastructure | ✅     | ✅        | ✅               |
| App Code       | ❌     | ❌        | **✅**           |
| Configuration  | ❌     | ❌        | **✅**           |
| Local Dev      | ❌     | ❌        | **✅**           |
| One Command    | ❌     | ❌        | **✅**           |
| Best Practices | ❌     | ⚠️        | **✅**           |
| Time to Deploy | Hours  | 15-30 min | **5-10 min**     |

## AZD Template Structure

An AZD template is a Git repository with this structure:

```
my-azd-template/
├── azure.yaml              # AZD configuration
├── infra/                  # Infrastructure as Code
│   ├── main.bicep          # Main infrastructure template
│   ├── main.parameters.json
│   └── modules/            # Reusable Bicep modules
│       ├── openai.bicep
│       ├── search.bicep
│       └── app-service.bicep
├── src/                    # Application source code
│   ├── api/                # Backend API
│   │   ├── app.py
│   │   ├── requirements.txt
│   │   └── Dockerfile
│   └── web/                # Frontend application
│       ├── package.json
│       └── src/
├── .azure/                 # AZD environment data (gitignored)
├── .devcontainer/          # Dev container configuration
├── .github/                # GitHub Actions workflows
│   └── workflows/
│       └── azure-dev.yml
└── README.md               # Getting started guide
```

### Key Files

#### 1. `azure.yaml` - The Heart of AZD

Defines the template structure and deployment targets:

```yaml
name: retail-ai-assistant
metadata:
  template: retail-ai-assistant@0.0.1

services:
  api:
    project: ./src/api
    language: python
    host: containerapp

  web:
    project: ./src/web
    language: typescript
    host: staticwebapp

hooks:
  postprovision:
    - azd env set AZURE_OPENAI_ENDPOINT $(az cognitiveservices account show -g ${AZURE_RESOURCE_GROUP} -n ${AZURE_OPENAI_NAME} --query properties.endpoint -o tsv)
```

**What it defines**:

- Template name and metadata
- Application services (API, web, etc.)
- Which host each service uses (Container Apps, Static Web Apps, etc.)
- Deployment hooks for configuration

#### 2. `infra/` - Infrastructure Templates

Contains Bicep files defining Azure resources:

```bicep
// infra/main.bicep
targetScope = 'subscription'

@minLength(1)
@maxLength(64)
@description('Name of the environment')
param environmentName string

@minLength(1)
@description('Primary location for all resources')
param location string

// Create resource group
resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-${environmentName}'
  location: location
}

// Deploy core services
module openai 'modules/openai.bicep' = {
  scope: rg
  name: 'openai'
  params: {
    name: 'openai-${environmentName}'
    location: location
  }
}

module containerApps 'modules/container-apps.bicep' = {
  scope: rg
  name: 'container-apps'
  params: {
    name: 'ca-${environmentName}'
    location: location
  }
}
```

#### 3. `src/` - Application Code

Your actual application code:

```python
from flask import Flask, request, jsonify
from azure.identity import DefaultAzureCredential
from azure.ai.openai import OpenAIClient
import os

app = Flask(__name__)

openai_endpoint = os.environ["AZURE_OPENAI_ENDPOINT"]
client = OpenAIClient(openai_endpoint, DefaultAzureCredential())

@app.route("/api/chat", methods=["POST"])
def chat():
    message = request.json["message"]
    # Use OpenAI to generate response
    response = client.chat.completions.create(
        model="gpt-4",
        messages=[{"role": "user", "content": message}]
    )
    return jsonify({"response": response.choices[0].message.content})
```

## The AZD Workflow

### 1. Initialize (`azd init`)

Start from a template:

```bash
azd init --template Azure-Samples/contoso-chat

azd init
```

**What it does**:

- Clones template repository (if using existing)
- Creates `.azure/` directory for environment data
- Prompts for environment name

### 2. Provision (`azd provision`)

Create Azure infrastructure:

```bash
azd provision
```

**What it does**:

- Prompts for Azure subscription and region
- Deploys Bicep templates from `infra/`
- Creates all Azure resources
- Captures outputs (endpoints, IDs, keys)
- Stores configuration in `.azure/<env>/.env`

**Time**: 5-10 minutes

### 3. Deploy (`azd deploy`)

Deploy application code:

```bash
azd deploy
```

**What it does**:

- Builds application code
- Creates container images (if needed)
- Deploys to target services (Container Apps, Static Web Apps, etc.)
- Configures environment variables
- Runs any post-deploy hooks

**Time**: 3-5 minutes

### 4. All-in-One (`azd up`)

Provision + Deploy in one command:

```bash
azd up
```

**This is the magic command!** From zero to deployed application in ~10 minutes.

### 5. Monitor (`azd monitor`)

View application metrics and logs:

```bash
azd monitor --overview
azd monitor --logs
```

Opens Application Insights dashboards.

### 6. Cleanup (`azd down`)

Remove all resources:

```bash
azd down
```

Deletes the resource group and all deployed resources.

## AZD Template Benefits

### For Developers

✅ **Fast Start**: Working application in minutes
✅ **Best Practices**: Security, monitoring built-in
✅ **Local Development**: Dev containers and local testing
✅ **Familiar Tools**: Use your preferred IDE and languages

### For Teams

✅ **Consistency**: Everyone uses same setup
✅ **Onboarding**: New team members productive immediately
✅ **Collaboration**: Infrastructure as code, code reviewed
✅ **Documentation**: Template itself is documentation

### For Enterprises

✅ **Governance**: Approved patterns and configurations
✅ **Compliance**: Security and compliance built-in
✅ **Cost Control**: Right-sized resources
✅ **Auditability**: Full deployment history in Git

## AZD Template Gallery

Microsoft and community maintain templates for common scenarios:

**AI & ML**:

- ChatGPT + Enterprise data (RAG)
- Azure OpenAI + Cosmos DB
- AI Agents with function calling
- Document intelligence processing

**Web Applications**:

- React + Node.js + PostgreSQL
- .NET Blazor + Azure SQL
- Python Django + Redis
- Next.js + Cosmos DB

**APIs & Microservices**:

- FastAPI on Container Apps
- .NET minimal APIs
- Dapr microservices
- Event-driven architectures

**Explore**: [azure.github.io/awesome-azd](https://azure.github.io/awesome-azd/)

## Week 1 Recap

Over the past week, you've learned:

✅ **Day 1**: Microsoft Foundry platform
✅ **Day 2**: Enterprise retail AI scenario
✅ **Day 3**: App development lifecycle (apartment analogy)
✅ **Day 4**: AI application architecture patterns
✅ **Day 5**: Manual provisioning (one chair)
✅ **Day 6**: ARM/Bicep templates (full kitchen)
✅ **Day 7**: AZD templates (move-in coordinator)

**Key Takeaway**: AZD templates provide the most complete, efficient way to deploy AI applications on Azure.

## Next Week Preview

**Week 2: AZD Deep Dive** - We'll explore:

- Installing and configuring AZD
- Finding the right template
- Creating custom templates
- Deploying and customizing
- Deconstructing template structure
- Extending with hooks and plugins

## Ask Copilot

Solidify your understanding:

1. "What are the key differences between deploying with 'azd up' versus manually running 'azd provision' and 'azd deploy' separately?"
2. "How do AZD templates handle environment-specific configuration for development, staging, and production?"
3. "What happens under the hood when you run 'azd deploy' for a containerized application?"

## Related Resources

- [AZD CLI Reference](https://learn.microsoft.com/azure/developer/azure-developer-cli/reference)
- [Creating Your First AZD Template](https://learn.microsoft.com/azure/developer/azure-developer-cli/make-azd-compatible)
- [AZD Template Best Practices](https://azure.github.io/azure-dev/docs/template-best-practices/)
- [AZD Community Discord](https://discord.gg/azure-dev)

---

**Next**: [Day 8 - AZD Workflow](/02-azd-deep-dive/day-8-azd-workflow/)

_Congratulations on completing Week 1! Next week we dive deep into mastering Azure Developer CLI._
