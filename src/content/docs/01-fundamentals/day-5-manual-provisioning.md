---
title: 1.5 - Manual Provisioning
description: Learn infrastructure provisioning by manually creating resources in Azure Portal
---

Today we explore manual resource provisioning using the Azure Portal. This hands-on approach helps you understand what happens when resources are created and why automation is valuable.

## What You'll Learn

- How to create Azure resources manually through the Portal
- Configuration options and decisions required for each resource
- The time and effort involved in manual provisioning
- Why manual approaches don't scale for complex applications

## Resources

Before diving in, review these resources:

1. 📘 [Azure Portal Overview](https://learn.microsoft.com/azure/azure-portal/azure-portal-overview) - Understanding the Azure Portal interface
2. 📘 [Create Azure OpenAI Resource](https://learn.microsoft.com/azure/ai-services/openai/how-to/create-resource) - Step-by-step resource creation
3. 📘 [Azure Resource Manager](https://learn.microsoft.com/azure/azure-resource-manager/management/overview) - Understanding resource management concepts

## The Apartment Analogy: Buying One Chair

Remember our apartment analogy from Day 3? Manual provisioning is like:

**Going to a furniture store, selecting a chair, paying for it, carrying it home, and assembling it yourself.**

**Process**:

1. Research chair options
2. Drive to store
3. Select specific chair
4. Pay and load into car
5. Drive home
6. Unpack and assemble
7. Position in room

**Effort**: Doable for one chair, exhausting for furnishing an entire apartment!

## Manual Provisioning Walkthrough

Let's manually create a simple AI resource: an Azure OpenAI Service instance.

### Prerequisites

- Azure subscription
- Appropriate permissions (Contributor role)
- Azure OpenAI Service access (requires application approval)

### Step-by-Step: Creating Azure OpenAI Resource

#### Step 1: Navigate to Azure Portal

1. Go to [portal.azure.com](https://portal.azure.com)
2. Sign in with your Azure credentials
3. Click **"Create a resource"**

#### Step 2: Search for Service

1. In the search box, type "Azure OpenAI"
2. Select **"Azure OpenAI"** from results
3. Click **"Create"**

#### Step 3: Basic Configuration

**Decisions to make**:

- **Subscription**: Which subscription to bill
- **Resource Group**: Create new or use existing
  - Name: `rg-retail-ai-dev`
  - Region: East US
- **Region**: Where to deploy (affects latency and availability)
  - Choose: East US
- **Name**: Unique name for your resource
  - Example: `openai-retail-assistant-dev`
- **Pricing Tier**: Standard S0

**Time**: ~2 minutes

#### Step 4: Network Configuration

**Decisions to make**:

- **Network Access**: Public or private endpoint
  - Choose: All networks (for development)
  - Production would use private endpoint
- **Allow Azure services**: Yes/No
  - Choose: Yes

**Time**: ~1 minute

#### Step 5: Security & Identity

**Decisions to make**:

- **Managed Identity**: System-assigned or user-assigned
  - Choose: System-assigned (enabled)
- **Access Control**: RBAC settings
  - Note: Configure after creation

**Time**: ~1 minute

#### Step 6: Tags

**Optional but recommended**:

- **Environment**: Development
- **Project**: RetailAI
- **Owner**: your-email@company.com
- **CostCenter**: IT-AI-Projects

**Time**: ~1 minute

#### Step 7: Review + Create

1. Review all settings
2. Read terms and conditions
3. Click **"Create"**
4. Wait for deployment (3-5 minutes)

**Total time for one resource**: ~10 minutes

### Step 8: Post-Creation Configuration

After the resource is created, you still need to:

1. **Deploy a Model**
   - Navigate to Azure OpenAI Studio
   - Click "Deployments"
   - Create new deployment
   - Select model (gpt-4, gpt-35-turbo)
   - Choose capacity (TPM)
   - Wait for deployment (~2 minutes)

2. **Get API Keys**
   - Navigate to "Keys and Endpoint"
   - Copy Key 1 or Key 2
   - Note the endpoint URL

3. **Configure Content Filters**
   - Set up content filtering policies
   - Configure severity thresholds
   - Apply to deployments

**Additional time**: ~5-10 minutes

## The Reality of Manual Provisioning

### For a Complete Retail AI Application

Our retail AI app needs ~15 resources:

| Resource                   | Est. Time | Configuration Complexity |
| -------------------------- | --------- | ------------------------ |
| Resource Group             | 2 min     | Low                      |
| Azure OpenAI               | 10 min    | Medium                   |
| AI Search                  | 8 min     | High                     |
| Cosmos DB                  | 10 min    | High                     |
| App Service Plan           | 5 min     | Medium                   |
| App Service                | 7 min     | Medium                   |
| Container Registry         | 5 min     | Low                      |
| Container Apps Environment | 8 min     | Medium                   |
| Container App              | 10 min    | High                     |
| API Management             | 15 min    | High                     |
| Application Insights       | 5 min     | Low                      |
| Log Analytics Workspace    | 5 min     | Low                      |
| Key Vault                  | 8 min     | Medium                   |
| Virtual Network            | 12 min    | High                     |
| Storage Account            | 7 min     | Medium                   |

**Total Estimated Time**: **2-3 hours** (for an experienced person!)

### Challenges with Manual Provisioning

#### 1. **Time-Consuming**

- Hours spent clicking through forms
- Waiting for resources to deploy
- Context switching between services

#### 2. **Error-Prone**

- Typos in names or settings
- Inconsistent naming conventions
- Forgotten configuration steps
- Wrong regions or SKUs

#### 3. **Difficult to Reproduce**

- No documentation of steps
- Hard to create identical dev/test/prod
- Knowledge locked in one person's head
- Onboarding new team members is painful

#### 4. **Not Version Controlled**

- Can't track changes over time
- No code review process
- No rollback capability
- No audit trail

#### 5. **Configuration Drift**

- Environments slowly diverge
- "Works on my machine" problems
- Testing doesn't match production
- Debugging becomes nightmare

#### 6. **Scaling Issues**

- Can't provision multiple environments quickly
- Regional expansion is manual copy-paste
- Disaster recovery is manual
- No automation possible

## When Manual Makes Sense

Manual provisioning is acceptable for:

✅ **Learning and exploration** - Understanding service options
✅ **Quick experiments** - Testing a single service
✅ **One-off resources** - Rarely changed, simple configurations
✅ **Emergency fixes** - When automation is broken

## Lessons Learned

From this exercise, you should appreciate:

1. **Complexity**: Even "simple" resources have many configuration options
2. **Time**: Manual provisioning doesn't scale
3. **Expertise**: You need to know what every option means
4. **Documentation**: Hard to remember or document all steps
5. **Consistency**: Easy to make different choices each time

## The Path Forward

Tomorrow (Day 6) we'll see how **ARM/Bicep templates** solve many of these problems through Infrastructure as Code.

Then on Day 7, we'll discover how **AZD templates** go even further by:

- Including application code
- Providing sensible defaults
- Enabling one-command deployment
- Incorporating best practices

## Ask Copilot

Reflect on manual provisioning:

1. "What are the main risks of manually provisioning production infrastructure, and how can they lead to security vulnerabilities?"
2. "How would you create a checklist or documentation for manually provisioning a complex multi-service application?"
3. "What Azure Portal features help reduce errors when manually creating resources?"

## Related Resources

- [Azure Portal Tips and Tricks](https://learn.microsoft.com/azure/azure-portal/azure-portal-keyboard-shortcuts)
- [Azure Resource Naming Conventions](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming)
- [Azure Tagging Strategy](https://learn.microsoft.com/azure/cloud-adoption-framework/ready/azure-best-practices/resource-tagging)
- [Azure Service Limits and Quotas](https://learn.microsoft.com/azure/azure-resource-manager/management/azure-subscription-service-limits)

---

**Next**: [Day 6 - ARM Templates](/01-fundamentals/day-6-arm-templates/)

_Tomorrow we'll explore Infrastructure as Code with ARM and Bicep templates—automating what we did manually today._
