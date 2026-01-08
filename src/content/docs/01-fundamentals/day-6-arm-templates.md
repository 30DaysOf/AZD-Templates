---
title: 1.6 - ARM Templates
description: Automate infrastructure provisioning with Azure Resource Manager templates
---

Today we level up from manual provisioning to Infrastructure as Code (IaC) using Azure Resource Manager (ARM) and Bicep templates.

## What You'll Learn

- What Infrastructure as Code (IaC) is and why it matters
- The difference between ARM JSON and Bicep syntax
- How templates solve manual provisioning problems
- When to use ARM/Bicep versus other approaches

## Resources

Before diving in, review these resources:

1. 📘 [What is Infrastructure as Code?](https://learn.microsoft.com/devops/deliver/what-is-infrastructure-as-code) - Core IaC concepts
2. 📘 [Bicep Documentation](https://learn.microsoft.com/azure/azure-resource-manager/bicep/) - Modern Azure IaC language
3. 📘 [ARM Template Reference](https://learn.microsoft.com/azure/templates/) - Complete resource definitions

## The Apartment Analogy: Buying a Full Kitchen

Remember Day 5 where we bought and assembled one chair? Today we're buying and assembling **an entire kitchen**!

**Process**:

1. Create a detailed shopping list
2. Order all items at once
3. Have them delivered together
4. Follow assembly instructions
5. Connect appliances
6. Verify everything works

**Better than one-at-a-time because**:

- Coordinated delivery
- Instructions ensure compatibility
- Repeatable for multiple kitchens
- Can share list with others

**Still requires**:

- You do the assembly
- You understand the instructions
- You verify connections
- You don't get the "furnished" part (no food, dishes, etc.)

## Infrastructure as Code (IaC)

### What is IaC?

**Infrastructure as Code** means managing infrastructure through declarative configuration files rather than manual processes.

**Instead of**:

- "Click here, then there, then enter this value..."

**You write**:

- "I want these resources with these settings"

**Benefits**:

- ✅ Version controlled (Git)
- ✅ Code reviewed
- ✅ Automated deployment
- ✅ Reproducible
- ✅ Self-documenting
- ✅ Testable

### ARM vs. Bicep

Azure supports two IaC languages:

#### ARM (JSON)

**Pros**:

- Native Azure format
- All features available immediately
- Widely documented

**Cons**:

- Verbose and complex
- Hard to read and maintain
- Easy to make syntax errors

**Example**:

```json
{
  "$schema": "https://schema.management.azure.com/schemas/2019-04-01/deploymentTemplate.json#",
  "contentVersion": "1.0.0.0",
  "resources": [
    {
      "type": "Microsoft.CognitiveServices/accounts",
      "apiVersion": "2023-05-01",
      "name": "[parameters('openAIName')]",
      "location": "[parameters('location')]",
      "sku": {
        "name": "S0"
      },
      "kind": "OpenAI",
      "properties": {
        "customSubDomainName": "[parameters('openAIName')]",
        "publicNetworkAccess": "Enabled"
      }
    }
  ]
}
```

#### Bicep

**Pros**:

- Clean, readable syntax
- Type safety and IntelliSense
- Easier to learn and maintain
- Compiles to ARM JSON

**Cons**:

- Requires Bicep CLI
- Slight learning curve if you know ARM

**Same Example in Bicep**:

```bicep
param openAIName string
param location string

resource openAI 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAIName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    customSubDomainName: openAIName
    publicNetworkAccess: 'Enabled'
  }
}
```

**Much cleaner!** We'll use Bicep for examples going forward.

## Bicep Template Structure

### Basic Components

#### 1. Parameters

**Inputs** to your template:

```bicep
@description('Name of the Azure OpenAI resource')
param openAIName string

@description('Azure region for deployment')
param location string = resourceGroup().location

@description('Environment name')
@allowed(['dev', 'test', 'prod'])
param environment string = 'dev'
```

#### 2. Variables

**Computed values** used throughout:

```bicep
var resourceGroupName = 'rg-retail-ai-${environment}'
var tags = {
  Environment: environment
  Project: 'RetailAI'
  ManagedBy: 'Bicep'
}
```

#### 3. Resources

**Azure resources** to create:

```bicep
resource openAI 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAIName
  location: location
  tags: tags
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    customSubDomainName: openAIName
    publicNetworkAccess: 'Enabled'
  }
}
```

#### 4. Outputs

**Values** returned after deployment:

```bicep
output openAIEndpoint string = openAI.properties.endpoint
output openAIId string = openAI.id
```

## Complete Example: Retail AI Core Resources

Let's create a Bicep template for our retail AI application's core services:

```bicep
// Parameters
param projectName string = 'retailai'
param environment string = 'dev'
param location string = resourceGroup().location

// Variables
var uniqueSuffix = uniqueString(resourceGroup().id)
var openAIName = '${projectName}-openai-${environment}-${uniqueSuffix}'
var searchName = '${projectName}-search-${environment}-${uniqueSuffix}'
var cosmosName = '${projectName}-cosmos-${environment}-${uniqueSuffix}'

// Azure OpenAI
resource openAI 'Microsoft.CognitiveServices/accounts@2023-05-01' = {
  name: openAIName
  location: location
  sku: {
    name: 'S0'
  }
  kind: 'OpenAI'
  properties: {
    customSubDomainName: openAIName
    publicNetworkAccess: 'Enabled'
  }
}

// Azure AI Search
resource search 'Microsoft.Search/searchServices@2023-11-01' = {
  name: searchName
  location: location
  sku: {
    name: 'basic'
  }
  properties: {
    replicaCount: 1
    partitionCount: 1
  }
}

// Cosmos DB
resource cosmos 'Microsoft.DocumentDB/databaseAccounts@2023-04-15' = {
  name: cosmosName
  location: location
  kind: 'GlobalDocumentDB'
  properties: {
    databaseAccountOfferType: 'Standard'
    locations: [
      {
        locationName: location
        failoverPriority: 0
      }
    ]
  }
}

// Outputs
output openAIEndpoint string = openAI.properties.endpoint
output searchEndpoint string = 'https://${search.name}.search.windows.net'
output cosmosEndpoint string = cosmos.properties.documentEndpoint
```

## Deploying Bicep Templates

### Using Azure CLI

```bash
az login

az group create \
  --name rg-retail-ai-dev \
  --location eastus

az deployment group create \
  --resource-group rg-retail-ai-dev \
  --template-file main.bicep \
  --parameters environment=dev projectName=retailai
```

### What Happens During Deployment

1. **Validation**: Azure checks template syntax
2. **Preview**: Shows what will be created/changed
3. **Execution**: Creates resources in parallel where possible
4. **Status**: Reports progress and any errors
5. **Outputs**: Returns specified output values

**Time**: ~10-15 minutes (vs. 2-3 hours manually!)

## Benefits Over Manual Provisioning

| Aspect              | Manual             | ARM/Bicep                 |
| ------------------- | ------------------ | ------------------------- |
| **Time**            | 2-3 hours          | 10-15 minutes             |
| **Errors**          | Frequent           | Rare (validated)          |
| **Consistency**     | Variable           | Identical every time      |
| **Documentation**   | Separate docs      | Self-documenting code     |
| **Version Control** | Not possible       | Full Git history          |
| **Review**          | Hard to review     | Code review process       |
| **Rollback**        | Manual undo        | Redeploy previous version |
| **Testing**         | Manual testing     | Automated validation      |
| **Collaboration**   | Email instructions | PR/merge workflow         |

## Limitations of ARM/Bicep

While better than manual, ARM/Bicep still has gaps:

❌ **No Application Code**: Only infrastructure, not the app
❌ **Requires Expertise**: Must know Azure resource types
❌ **Complex Dependencies**: Managing resource relationships is hard
❌ **No Local Dev**: Can't test locally before deployment
❌ **Incomplete Solution**: Still need deployment pipelines, monitoring setup, etc.

## Advanced Bicep Features

### Modules

Break large templates into reusable pieces:

```bicep
module openAIModule './modules/openai.bicep' = {
  name: 'openAIDeployment'
  params: {
    name: openAIName
    location: location
  }
}
```

### Conditional Deployment

Deploy resources based on conditions:

```bicep
resource privateEndpoint 'Microsoft.Network/privateEndpoints@2023-05-01' = if (usePrivateEndpoint) {
  // ... configuration
}
```

### Loops

Create multiple similar resources:

```bicep
resource storageAccounts 'Microsoft.Storage/storageAccounts@2023-01-01' = [for i in range(0, 3): {
  name: '${storageBaseName}${i}'
  location: location
  // ... configuration
}]
```

## Best Practices

1. **Use Parameters**: Make templates reusable
2. **Add Descriptions**: Document what parameters do
3. **Use Variables**: Avoid repetition
4. **Consistent Naming**: Follow naming conventions
5. **Tag Resources**: Enable cost tracking and organization
6. **Output Important Values**: Return endpoints, IDs
7. **Use Modules**: Keep templates maintainable
8. **Version Control**: Commit templates to Git

## Ask Copilot

Explore IaC concepts:

1. "What are the advantages of using Bicep modules to organize infrastructure code compared to having everything in a single template file?"
2. "How do you handle secrets and sensitive configuration values when using Bicep templates?"
3. "What's the difference between imperative and declarative infrastructure management, and why does Azure use the declarative approach?"

## Related Resources

- [Bicep Learning Path](https://learn.microsoft.com/training/paths/fundamentals-bicep/)
- [Bicep Best Practices](https://learn.microsoft.com/azure/azure-resource-manager/bicep/best-practices)
- [Azure Verified Modules](https://aka.ms/avm) - Pre-built, tested Bicep modules
- [Bicep Playground](https://aka.ms/bicepdemo) - Try Bicep in browser

---

**Next**: [Day 7 - AZD Templates Intro](/01-fundamentals/day-7-azd-templates/)

_Tomorrow we'll discover how AZD templates complete the picture by combining infrastructure AND application deployment._
