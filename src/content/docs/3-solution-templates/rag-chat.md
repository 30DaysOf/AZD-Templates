---
title: RAG Chat Application
description: Retrieval Augmented Generation chatbot with Azure OpenAI and AI Search
tags: [rag, chatbot, azure-openai, ai-search, template]
---

# RAG Chat Application Template

Build a production-ready Retrieval Augmented Generation (RAG) chatbot using Azure OpenAI and Azure AI Search.

## Overview

This template provides a complete RAG-based chat application that combines the power of Azure OpenAI with your own data stored in Azure AI Search.

## Architecture

- **Frontend**: React-based chat interface
- **Backend**: Python FastAPI application
- **Vector Store**: Azure AI Search with vector search capabilities
- **LLM**: Azure OpenAI GPT-4 or GPT-3.5-turbo
- **Embeddings**: Azure OpenAI text-embedding-ada-002

## Features

- Natural language conversations with context from your documents
- Document upload and automatic indexing
- Semantic search with vector embeddings
- Citation tracking for transparency
- Conversation history management

## Quick Start

```bash
# Initialize from template
azd init -t azure-rag-chat

# Provision Azure resources and deploy
azd up

# Open the application
azd browse
```

## Configuration

Customize the template by modifying:

- `infra/`: Bicep templates for Azure resources
- `app/backend/`: Python backend application
- `app/frontend/`: React frontend application
- `azure.yaml`: AZD configuration

## Cost Considerations

Estimated monthly cost: $100-$500 depending on usage and model selection.

## Learn More

- [Azure OpenAI Documentation](https://learn.microsoft.com/azure/ai-services/openai/)
- [Azure AI Search Documentation](https://learn.microsoft.com/azure/search/)
