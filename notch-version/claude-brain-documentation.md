# Claude Brain — Comprehensive Codebase Audit & Documentation

**Version:** 0.1.0  
**Runtime:** Bun  
**Language:** TypeScript (ESM)  
**Audit Date:** February 4, 2026  
**Purpose:** This document serves as the living reference for understanding, maintaining, optimizing, and upgrading the Claude Brain codebase. It covers architecture, every module in detail, data flows, inter-module contracts, known issues, stub inventories, performance observations, and a prioritized roadmap.

---

## Table of Contents

1. [Project Identity & Purpose](#1-project-identity--purpose)
2. [Technology Stack](#2-technology-stack)
3. [Architecture Overview](#3-architecture-overview)
4. [Module-by-Module Breakdown](#4-module-by-module-breakdown)
   - 4.1 [Entry Point (`src/index.ts`)](#41-entry-point)
   - 4.2 [Configuration System (`src/config/`)](#42-configuration-system)
   - 4.3 [Utilities (`src/utils/`)](#43-utilities)
   - 4.4 [MCP Server (`src/server/`)](#44-mcp-server)
   - 4.5 [Tool Definitions (`src/tools/`)](#45-tool-definitions)
   - 4.6 [Vault Integration (`src/vault/`)](#46-vault-integration)
   - 4.7 [Memory System (`src/memory/`)](#47-memory-system)
   - 4.8 [Orchestration Engine (`src/orchestrator/`)](#48-orchestration-engine)
   - 4.9 [Scripts (`src/scripts/`)](#49-scripts)
5. [Data Flow Diagrams](#5-data-flow-diagrams)
6. [Dependency & Import Map](#6-dependency--import-map)
7. [Stub & TODO Inventory](#7-stub--todo-inventory)
8. [Audit Findings & Issues](#8-audit-findings--issues)
9. [Performance Observations](#9-performance-observations)
10. [Security Considerations](#10-security-considerations)
11. [Testing Strategy](#11-testing-strategy)
12. [Upgrade Roadmap](#12-upgrade-roadmap)
13. [Quick Reference: File Index](#13-quick-reference-file-index)

---

## 1. Project Identity & Purpose

Claude Brain is a **local development assistant** that bridges an **Obsidian vault** (a local folder of markdown files with YAML frontmatter) with **Claude Code** via the **Model Context Protocol (MCP)**. It provides Claude Code with:

- **Project context** — reads project descriptions, standards, and progress from the vault
- **Long-term memory** — stores and retrieves architectural decisions using local vector embeddings (all-MiniLM-L6-v2, 384 dimensions) backed by SQLite
- **Semantic recall** — finds past decisions similar to the current situation via cosine similarity search
- **Event-driven automation** — watches vault files for changes and auto-detects tasks, status changes, and decisions

The system is designed to run entirely locally with zero cloud dependencies beyond the initial model download.

---

## 2. Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Runtime | Bun 1.0+ | Fast JS/TS runtime with native SQLite |
| Language | TypeScript 5+ (ESM) | Type safety, path aliases via `@/` |
| Protocol | MCP SDK (`@modelcontextprotocol/sdk` ^1.25.2) | Stdio-based communication with Claude Code |
| Embeddings | `@xenova/transformers` 2.17.2 | Local inference for all-MiniLM-L6-v2 |
| Database | `bun:sqlite` (built-in) | Vector storage as BLOBs, WAL mode |
| Frontmatter | `gray-matter` ^4.0.3 | YAML frontmatter parsing in markdown |
| Validation | `zod` ^4.3.5 | Config schema validation |
| Logging | `pino` ^10.1.1 + `pino-pretty` ^13.1.3 | Structured logging with pretty dev output |
| HTTP (unused) | `hono` ^4.11.3 | Listed in deps, not yet used |
| Env | `dotenv` ^17.2.3 | Environment variable loading |

**Build targets:** The `package.json` defines cross-platform binary compilation via `bun build --compile` for Windows (x64), Linux (x64), and macOS (ARM64).

---

## 3. Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     Claude Code (Client)                     │
│                    Communicates via stdio                     │
└──────────────────────────┬──────────────────────────────────┘
                           │ MCP Protocol (JSON-RPC over stdio)
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    ClaudeBrainMCPServer                       │
│  src/server/mcp-server.ts                                    │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │ ListTools     │  │ CallTool     │ ← Tool router            │
│  │ Handler       │  │ Handler      │                         │
│  └──────────────┘  └──────┬───────┘                         │
│                           │                                  │
│  ┌────────────────────────▼────────────────────────┐        │
│  │           Tool Handlers (6 tools)                │        │
│  │  get_project_context  │  update_progress         │        │
│  │  remember_decision    │  recall_similar           │        │
│  │  get_code_standards   │  list_projects            │        │
│  └────────────────────────┬────────────────────────┘        │
│                           │                                  │
│  ┌────────────────────────▼────────────────────────┐        │
│  │           Shared Services (Singleton)            │        │
│  │  MemoryManager  │  VaultManager                  │        │
│  └────────┬────────────────┬───────────────────────┘        │
└───────────┼────────────────┼────────────────────────────────┘
            │                │
            ▼                ▼
┌───────────────────┐ ┌──────────────────────────────┐
│   Memory System   │ │      Vault Integration       │
│  src/memory/      │ │      src/vault/               │
│ ┌───────────────┐ │ │ ┌──────────┐ ┌─────────────┐│
│ │ EmbeddingsSvc │ │ │ │ Reader   │ │ Writer      ││
│ │ (MiniLM-L6)  │ │ │ │ (cached) │ │ (atomic)    ││
│ ├───────────────┤ │ │ ├──────────┤ ├─────────────┤│
│ │ MemoryStore   │ │ │ │ Watcher  │ │ Query       ││
│ │ (CRUD+embed)  │ │ │ │ (fs)     │ │ (search)    ││
│ ├───────────────┤ │ │ ├──────────┤ ├─────────────┤│
│ │ SemanticSearch│ │ │ │ Frontmtr │ │ Templates   ││
│ │ (cosine sim)  │ │ │ │ Utils    │ │             ││
│ ├───────────────┤ │ │ └──────────┘ └─────────────┘│
│ │ ContextBuilder│ │ └──────────────────────────────┘
│ ├───────────────┤ │
│ │ SQLite DB     │ │
│ │ (WAL mode)    │ │
│ └───────────────┘ │
└───────────────────┘

┌──────────────────────────────────────────────────────┐
│            Orchestration Engine (Phase 4)              │
│            src/orchestrator/                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │
│  │ EventBus    │  │ Coordinator  │  │ DecisionLog │ │
│  │ (pub/sub)   │  │ (queue+ops)  │  │ (auto-log)  │ │
│  ├─────────────┤  └──────────────┘  └─────────────┘ │
│  │ Handlers:   │                                     │
│  │ - Task      │  ← watches progress.md              │
│  │ - Status    │  ← detects status changes            │
│  │ - Decision  │  ← auto-stores from decisions.md     │
│  │ - Context   │  ← invalidates cache on context.md   │
│  └─────────────┘                                     │
└──────────────────────────────────────────────────────┘

┌──────────────────────┐
│  Obsidian Vault (FS) │
│  /path/to/vault/     │
│  ├── Projects/       │
│  │   └── my-project/ │
│  │       ├── context.md    │
│  │       ├── decisions.md  │
│  │       ├── progress.md   │
│  │       └── standards.md  │
│  ├── Global/         │
│  ├── Templates/      │
│  └── Memory/         │
└──────────────────────┘
```

### Phased Development

The codebase was developed in phases, referenced throughout the code:

| Phase | Name | Status |
|-------|------|--------|
| Phase 1 | MCP Server + Tool Definitions | ✅ Complete |
| Phase 2 | Obsidian Vault Integration | ✅ Complete |
| Phase 3 | Memory & Embedding System | ✅ Complete |
| Phase 4 | Orchestration Engine | ✅ Complete |
| Phase 5 | (Not referenced) | — |
| Phase 6 | Full Integration | ⚠️ Partially stub |

---

## 4. Module-by-Module Breakdown

### 4.1 Entry Point

**File:** `src/index.ts`

**Responsibilities:**
1. Loads configuration via `loadConfig()`
2. Creates the pino logger with the configured level and file path
3. Initializes shared services (memory + vault) via `initializeServices(config, logger)`
4. Creates `ClaudeBrainMCPServer` with event lifecycle hooks
5. Registers SIGTERM/SIGINT handlers for graceful shutdown
6. Starts the MCP server (stdio transport)

**Startup sequence:**
```
loadConfig() → createLogger() → initializeServices() → new ClaudeBrainMCPServer() → mcpServer.start()
```

**Key observation:** The banner is written to `stderr` to avoid interfering with MCP stdio communication. In production mode (`NODE_ENV=production`), the banner is suppressed.

**Gap:** The orchestrator (`src/orchestrator/`) is fully implemented but **never instantiated or started** from `index.ts`. The vault watcher integration in the orchestrator is therefore dead code at runtime. See [Issue #1](#audit-issue-1).

---

### 4.2 Configuration System

**Directory:** `src/config/`  
**Files:** `schema.ts`, `defaults.ts`, `loader.ts`, `watcher.ts`, `index.ts`

#### Schema (`schema.ts`)

Defines the configuration shape using Zod:

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `vaultPath` | string (required) | — | Absolute path to Obsidian vault |
| `serverName` | string | `'claude-brain'` | MCP server identifier |
| `serverVersion` | string (semver) | `'0.1.0'` | Server version |
| `logLevel` | `'debug'\|'info'\|'warn'\|'error'` | `'info'` | Pino log level |
| `logFilePath` | string | `'./logs/claude-brain.log'` | Log file location |
| `dbPath` | string | `'./data/memory.db'` | SQLite database path |
| `port` | number (1-65535) | `3000` | Future HTTP interface port |
| `enableFileWatch` | boolean | `true` | Enable vault file watching |
| `cacheSize` | number (≥1) | `100` | Cache size in MB |
| `nodeEnv` | `'development'\|'production'\|'test'` | `'development'` | Environment |

**Types exported:** `Config` (fully parsed), `PartialConfig` (input/merge form), `LogLevel`.

#### Loader (`loader.ts`)

Three-layer config merge with priority: **defaults → .claudebrainrc.json → environment variables**.

- `loadFromFile(basePath)` — reads `.claudebrainrc.json` from the given directory
- `loadFromEnv()` — maps `VAULT_PATH`, `MCP_SERVER_NAME`, `LOG_LEVEL`, etc. to config fields
- `mergeConfigs(...configs)` — shallow merge, filtering out `undefined` values
- `loadConfig(basePath?)` — orchestrates the full load-merge-validate pipeline

**Validation:** Uses `ConfigSchema.safeParse()`. On failure, throws with formatted error messages listing each invalid field.

#### Watcher (`watcher.ts`)

`ConfigWatcher` extends `EventEmitter` and uses `fs.watch()` on `.claudebrainrc.json`. Changes are debounced by 100ms. Emits `'change'` with the new `Config` or `'error'`.

**Note:** This watcher is created but never consumed in the current codebase — it's infrastructure for future hot-reload support.

#### Barrel Export (`index.ts`)

Re-exports all public symbols from the config module.

---

### 4.3 Utilities

**Directory:** `src/utils/`  
**Files:** `logger.ts`, `logger-utils.ts`, `index.ts`

#### Logger (`logger.ts`)

- `createLogger(level, logFilePath)` — creates a pino instance. In development, uses `pino-pretty` transport to stderr with colorization. In production, writes to both a log file and stdout.
- `createComponentLogger(parent, component)` — creates a child logger with `{ component }` context.
- `generateRequestId()` / `createRequestLogger()` — request-scoped logging.

**Design note:** The logger ensures the log directory exists via `ensureLogDir()` before creating the logger.

#### Logger Utils (`logger-utils.ts`)

Structured logging helpers for specific domains:

| Function | Event Type | Use Case |
|----------|-----------|----------|
| `logToolCall` | `tool_call` | MCP tool invocations |
| `logToolResult` | `tool_result` | Tool completion/failure |
| `logAgentActivity` | `agent_activity` | Agent-level decisions |
| `logPerformance` | `performance` | Timing metrics |
| `logError` | `error` | Errors with full stack |
| `logVaultOperation` | `vault_operation` | File read/write/delete |
| `logMemoryOperation` | `memory_operation` | Embedding/search ops |
| `createTimer` | — | `performance.now()` wrapper |

**Observation:** There's a naming collision — `createTimer` exists in both `logger-utils.ts` and `server/utils/request-context.ts` with slightly different signatures. The barrel export in `utils/index.ts` exports the logger-utils version.

---

### 4.4 MCP Server

**Directory:** `src/server/`  
**Files:** `mcp-server.ts`, `types.ts`, `services.ts`, `index.ts`, `handlers/`, `utils/`

#### MCP Server (`mcp-server.ts`)

`ClaudeBrainMCPServer` wraps `@modelcontextprotocol/sdk`'s `Server` class.

**Capabilities declared:** `{ tools: {} }` — only tools are currently exposed. Resources and prompts are planned for later phases.

**Handler registration:**
- `ListToolsRequestSchema` → dynamically imports `handleListTools` → returns `ToolRegistry.getToolsForListResponse()`
- `CallToolRequestSchema` → dynamically imports `handleCallTool` → routes by tool name

**Why dynamic imports?** The comment says "to avoid circular dependencies." This is because handlers import from `@/tools/registry` and `@/server/services`, which are also imported by the server module.

**Lifecycle:**
- `start()` — creates `StdioServerTransport`, calls `server.connect(transport)`, tracks connection state
- `stop()` — calls `server.close()`, logs total request count and uptime
- `getStatus()` — returns `ServerStatus` (running, name, version, connectionState, startedAt, requestCount)
- `isHealthy()` — returns `true` if running AND connected

**Event hooks (optional):**
- `onConnectionStateChange(state)` — state transitions
- `onError(error)` — server-level errors
- `onRequest(toolName, requestId)` — tool call started
- `onResponse(toolName, requestId, durationMs)` — tool call completed

#### Services (`services.ts`)

Singleton service container. Initializes `MemoryManager` and `VaultManager` once during startup.

```typescript
interface Services {
  memory: MemoryManager
  vault: VaultManager
  logger: Logger
  config: Config
}
```

**Thread safety:** Uses a single `initializationPromise` to prevent double-initialization if called concurrently.

**Access pattern:**
- `getMemoryService()` → returns `MemoryManager` (throws if not initialized)
- `getVaultService()` → returns `VaultManager` (throws if not initialized)
- `isServicesInitialized()` → boolean check

**Shutdown:** `shutdownServices()` stops vault watching and closes the memory database.

#### Handlers (`handlers/`)

**`list-tools.ts`** — Returns all tools from `ToolRegistry.getToolsForListResponse()`.

**`call-tool.ts`** — Central router:
1. Validates tool exists via `ToolRegistry.validateToolExists(name)`
2. Validates required params via `ToolRegistry.validateRequiredParams(name, args)`
3. Routes via `switch(name)` to specific handler functions
4. Converts non-MCP errors to `McpError(InternalError)`

**Tool handler files (`handlers/tools/`):**

| Handler | Status | What It Does |
|---------|--------|-------------|
| `get-project-context.ts` | 🔴 STUB | Returns mock text with `[STUB]` prefix |
| `update-progress.ts` | 🔴 STUB | Returns mock confirmation |
| `get-code-standards.ts` | 🔴 STUB | Returns mock standards |
| `list-projects.ts` | 🔴 STUB | Returns mock project list |
| `remember-decision.ts` | ✅ LIVE | Stores decision via `memory.store.storeDecision()` |
| `recall-similar.ts` | ✅ LIVE | Searches via `memory.search.search()`, formats via `contextBuilder` |

**Critical finding:** Only 2 of 6 tools are fully implemented. The 4 stub handlers don't interact with the vault at all despite the vault system being fully built. See [Issue #2](#audit-issue-2).

#### Server Utils (`utils/`)

| File | Class/Function | Purpose |
|------|---------------|---------|
| `response-formatter.ts` | `ResponseFormatter` | Static methods: `text()`, `multiText()`, `error()`, `errorResponse()`, `structured()`, `json()`, `list()`, `success()` |
| `validators.ts` | `ToolValidator` | `validate(args, zodSchema)`, `requireString()`, `optionalString()`, `requireNumber()`, `optionalNumber()`, `requireBoolean()`, `optionalBoolean()`, `requireArray()`, `optionalArray()`, `requireEnum()` |
| `error-handler.ts` | `ErrorHandler` | `toMcpError()`, `getErrorInfo()`, `logError()`, `invalidParams()`, `methodNotFound()`, `internalError()`, `wrapAsync()` |
| `request-context.ts` | `RequestContext`, `Timer` | Request tracking with IDs, timing, metadata |

**Observation:** `ResponseFormatter` and `ToolValidator` are well-designed but **mostly unused**. The current tool handlers manually construct response objects instead of using `ResponseFormatter.text()`. The validators in `validators.ts` are also unused — tool handlers cast `args as SomeInput` directly. See [Issue #3](#audit-issue-3).

---

### 4.5 Tool Definitions

**Directory:** `src/tools/`  
**Files:** `schemas.ts`, `registry.ts`, `types.ts`, `index.ts`

#### Schemas (`schemas.ts`)

Defines 6 tools as a `const` object (`TOOLS`) with `satisfies Record<string, ToolDefinition>`:

| Tool Name | Required Params | Optional Params |
|-----------|----------------|-----------------|
| `get_project_context` | `project_name` | `include_memories` (bool), `memory_limit` (number) |
| `update_progress` | `project_name`, `completed_task`, `next_steps` | `notes` |
| `remember_decision` | `project_name`, `context`, `decision`, `reasoning` | `alternatives_considered`, `tags` (string[]) |
| `recall_similar` | `query` | `project_filter`, `limit`, `min_similarity` |
| `get_code_standards` | `project_name` | `language` |
| `list_projects` | — | `status_filter` (enum: active/archived/planning/all) |

Each tool includes a `description` that guides Claude Code on when to use it.

#### Registry (`registry.ts`)

`ToolRegistry` is a static utility class:

- `getAllTools()` — returns all tool definitions
- `getToolByName(name)` — finds tool by name
- `validateToolExists(name)` — boolean check
- `validateRequiredParams(name, args)` — checks required fields are present, returns `{ valid, error? }`
- `getToolsForListResponse()` — returns tools in MCP format

**Note:** The registry uses linear search (`Object.values(TOOLS).find(...)`) which is fine for 6 tools but should be pre-indexed if tools grow significantly.

#### Types (`types.ts`)

Defines TypeScript interfaces for each tool's input and output:

- Input types: `GetProjectContextInput`, `UpdateProgressInput`, `RememberDecisionInput`, `RecallSimilarInput`, `GetCodeStandardsInput`, `ListProjectsInput`
- Output types: `ToolResponse`, `ProjectContext`, `ProgressUpdateResult`, `DecisionStorageResult`, `SimilarMemory`, `CodeStandards`, `ProjectListItem`
- Union: `ToolInput` (all input types)

**Observation:** The output types (`ProjectContext`, `CodeStandards`, etc.) are defined but never used. Actual responses are `ToolResponse` with inline text. These types represent the intended structured output format for future implementation.

---

### 4.6 Vault Integration

**Directory:** `src/vault/`  
**Files:** `types.ts`, `paths.ts`, `reader.ts`, `writer.ts`, `watcher.ts`, `query.ts`, `frontmatter.ts`, `templates.ts`, `index.ts`

This is the most feature-complete module. It provides full CRUD operations on an Obsidian-style vault.

#### Types (`types.ts`)

Core types for the vault layer:

- `VaultPaths` — root, projects, global, templates, memory directories
- `ProjectPaths` — root, context.md, decisions.md, progress.md, standards.md
- `Frontmatter` — extensible record with known fields: `type`, `project`, `status`, `created`, `updated`, `tags`, `tech_stack`, `languages`, `frameworks`, `decision_count`, `last_updated`, `current_phase`, `completion_percentage`
- `MarkdownFile` — `{ path, frontmatter, content, rawContent }`
- `ProjectStatus` — `'active' | 'planning' | 'archived'`
- `ProgressStatus` — `'in-progress' | 'blocked' | 'completed'`
- `VaultConfig` — `{ root, backupDir, cacheEnabled, watchEnabled, debounceMs }`

#### Paths (`paths.ts`)

`VaultPathUtils` provides static methods:

- `getVaultPaths(root)` — returns standard directory paths
- `getProjectPaths(root, name)` — returns paths for a specific project
- `isValidProjectName(name)` — validates kebab-case pattern: `/^[a-z0-9]+(-[a-z0-9]+)*$/`
- `normalizeProjectName(name)` — lowercases and converts to kebab-case
- `extractProjectName(filePath, root)` — extracts project name from file path
- `isInsideVault(path, root)` — security check for path traversal
- `joinVaultPath(root, ...segments)` — safe path join with traversal protection

#### Reader (`reader.ts`)

`VaultReader` provides cached file reading:

**Cache system:**
- LRU cache with configurable `maxCacheSize` (default 100) and `maxCacheAge` (default 5 minutes)
- `invalidateCache(filePath)` — removes single entry
- `clearCache()` — removes all entries
- `cleanExpiredCache()` — removes stale entries
- `getCacheStats()` — returns `{ size, files[] }`

**Read operations:**
- `readMarkdownFile(path, useCache?)` — reads file, parses with `gray-matter`, returns `MarkdownFile`
- `readMarkdownFiles(paths[], useCache?)` — batch read
- `readDirectory(path, recursive?)` — lists `.md` files
- `getProjectDirectories(projectsPath)` — lists subdirectories
- `fileExists(path)` — boolean check
- `getFileStats(path)` — returns size, created, modified dates

#### Writer (`writer.ts`)

`VaultWriter` provides safe, atomic writes with backups:

**Write operations:**
- `writeMarkdownFile(path, frontmatter, content, options?)` — atomic write via temp file + rename. Optionally creates backup and ensures directory exists.
- `updateFrontmatter(path, updates)` — reads existing file, merges frontmatter, writes back
- `appendContent(path, content, separator?)` — appends to end of file content
- `prependContent(path, content, separator?)` — prepends after frontmatter
- `replaceSection(path, sectionHeader, newContent)` — finds markdown section by header, replaces content up to next section of same/higher level
- `deleteFile(path, createBackup?)` — deletes with optional backup
- `createProjectStructure(path, name)` — creates all 4 project files from templates

**Backup system:**
- Backups stored in configurable `backupDir` (default `./data/backups`)
- Named as `{filename}.{ISO-timestamp}.bak`
- `cleanOldBackups(maxAge?)` — removes backups older than 7 days (default)

**Atomicity:** Writes go to `{path}.tmp` first, then `fs.rename()` to final path. On failure, the temp file is cleaned up.

#### Watcher (`watcher.ts`)

`VaultWatcher` extends `EventEmitter` for real-time file monitoring:

**Events:**
- `change` — all file changes
- `created` — new files
- `modified` — changed files
- `deleted` — removed files
- `error` — watcher errors

**Change detection logic:**
1. Uses `fs.watch()` with optional recursive mode
2. Only processes `.md` files
3. Debounces changes by configurable `debounceMs` (default 500ms)
4. Determines change type by comparing file existence state (`fileStates` map) before and after
5. `rename` events → checks if file exists now vs. before to distinguish create/delete
6. `change` events → always `modified`

**Methods:**
- `watch(dirPath, recursive?)` — start watching
- `unwatch(dirPath)` / `unwatchAll()` — stop watching
- `refreshFileStates(dirPath)` — scan directory to populate initial state
- `getStatus()` — returns watched paths and active debounce count

#### Query Engine (`query.ts`)

`VaultQuery` provides multi-criteria search across the vault:

**Query options:**
- `text` — full-text search across title, frontmatter, and content
- `tags`, `status`, `project`, `type`, `techStack` — frontmatter filters
- `dateRange` — filter by date field with start/end bounds
- `limit`, `offset` — pagination
- `sortBy` — `'score' | 'date' | 'name'`
- `sortDirection` — `'asc' | 'desc'`

**Scoring system:**
| Match Type | Points |
|-----------|--------|
| Title text match | 30 per term |
| Frontmatter text match | 15 per term |
| Content text match | 2 per occurrence (max 20 per term) |
| Project filter match | 25 |
| Tag match | 20 per tag |
| Status match | 15 |
| Type match | 15 |
| Tech stack match | 15 per tech |
| Date in range | 5 |

**Performance note:** The query engine reads ALL markdown files from Projects/ and Global/ directories, parses each with `gray-matter`, then filters/scores in memory. This is fine for small vaults (< 1000 files) but will degrade with scale. See [Issue #4](#audit-issue-4).

**Convenience methods:** `searchText()`, `getByTag()`, `getByProject()`, `getByType()`, `getRecentlyUpdated()`, `getAllProjects()`, `getProjectFiles()`

#### Frontmatter Utils (`frontmatter.ts`)

`FrontmatterUtils` provides static methods for working with frontmatter:

- **Validation:** `validateFrontmatter(fm, requiredFields)`, `validateTypes(fm, schema)`
- **Extraction:** `getProject()`, `getStatus()`, `getTags()`, `getTechStack()`, `getLanguages()`, `getFrameworks()`, `getDate()`, `getType()`, `getCompletionPercentage()`, `getCurrentPhase()`, `getDecisionCount()`
- **Type guards:** `isValidProjectStatus()`, `isValidProgressStatus()`, `isType()`
- **Creation:** `createDefaultFrontmatter(type, projectName)` — generates type-appropriate defaults
- **Merge:** `mergeFrontmatter(existing, updates)` — always updates the `updated` timestamp

#### Templates (`templates.ts`)

Contains string templates for 6 file types:
1. `PROJECT_CONTEXT` — project overview with frontmatter
2. `DECISIONS_LOG` — decision tracking file
3. `PROGRESS_TRACKER` — progress tracking file
4. `CODING_STANDARDS` — coding standards file
5. `DECISION_ENTRY` — individual decision entry
6. `PROGRESS_ENTRY` — individual progress entry

**Template variables:** `{{PROJECT_NAME}}`, `{{PROJECT_TITLE}}`, `{{DATE}}`, `{{DECISION_NUMBER}}`, `{{DECISION_TITLE}}`, `{{STATUS}}`, `{{CONTEXT}}`, `{{DECISION}}`, `{{CONSEQUENCES}}`, `{{TITLE}}`, `{{DESCRIPTION}}`

**Helpers:** `renderTemplate()`, `getTodayDate()`, `projectNameToTitle()`, `createProjectVariables()`

#### VaultManager (`index.ts`)

The `VaultManager` class is the unified facade combining all vault components:

**Construction:**
- Creates `VaultReader`, `VaultWriter`, `VaultWatcher`, `VaultQuery`
- Wires watcher's `change` event to invalidate reader cache
- Configures backup directory, cache, and watch settings

**Public API:**
- `initialize()` — creates vault directories (Projects, Global, Templates, Memory)
- `startWatching()` / `stopWatching()` — vault file monitoring
- `createProject(name)` — validates name, creates structure from templates
- `getProjectContext(name)` — reads context.md
- `updateProgress(name, updates)` — updates progress frontmatter + appends content
- `addDecision(name, decision)` — formats and appends decision entry, increments count
- `search(options)` — delegates to VaultQuery
- `listProjects()` — returns project directory names
- `getProjectMetadata(name)` — combines context + progress frontmatter
- `getStats()` — project count, file count, cache stats, watcher status
- `cleanup()` — stops watching, clears cache, cleans old backups

---

### 4.7 Memory System

**Directory:** `src/memory/`  
**Files:** `types.ts`, `schema.ts`, `database.ts`, `embeddings.ts`, `embedding-utils.ts`, `store.ts`, `search.ts`, `context-builder.ts`, `index.ts`

#### Types (`types.ts`)

| Type | Purpose |
|------|---------|
| `Memory` | Core record: id, project, content, embedding (number[]), dates, metadata |
| `Decision` | Specialized memory: context, decision, reasoning, alternatives, outcome, tags |
| `MemorySearchResult` | Search hit: memory + similarity score + optional decision |
| `StoreMemoryInput` | Input for storing: project, content, metadata |
| `StoreDecisionInput` | Input for decisions: project, context, decision, reasoning, alternatives, tags |
| `SearchOptions` | Search params: project, limit, minSimilarity, tags |
| `MemoryRow` | SQLite row shape (embedding as Buffer/Uint8Array) |
| `DecisionRow` | SQLite decision row shape |
| `DatabaseStats` | Counts + size |
| `EmbeddingCacheStats` | Cache size + keys |
| `MemorySystemStats` | Combined database + embedding stats |

#### Schema (`schema.ts`)

Two SQLite tables:

**`memories`:**
```sql
id TEXT PRIMARY KEY
project TEXT NOT NULL
content TEXT NOT NULL
embedding BLOB NOT NULL   -- float32 array stored as binary
created_at TEXT NOT NULL
updated_at TEXT NOT NULL
metadata TEXT              -- JSON string
```
Indexes: `idx_memories_project`, `idx_memories_created`

**`decisions`:**
```sql
id TEXT PRIMARY KEY
memory_id TEXT NOT NULL → REFERENCES memories(id) ON DELETE CASCADE
context TEXT NOT NULL
decision TEXT NOT NULL
reasoning TEXT NOT NULL
alternatives TEXT
outcome TEXT
tags TEXT                  -- JSON array string
```
Index: `idx_decisions_memory`

Schema version: 1 (migration infrastructure exists but no actual migrations yet).

#### Database (`database.ts`)

`MemoryDatabase` manages the SQLite connection:

- `initialize()` — ensures directory exists, opens database, enables WAL mode + foreign keys, runs schema DDL
- `getDb()` — returns raw `Database` instance
- `close()` — closes connection
- `getStats()` — counts + page size calculation
- `healthCheck()` — runs `SELECT 1`
- `vacuum()` — reclaims space
- `beginTransaction()` / `commit()` / `rollback()` — transaction control

**WAL mode:** Write-Ahead Logging is enabled for better concurrent read performance, which is appropriate since reads (semantic search) will be far more frequent than writes.

#### Embeddings (`embeddings.ts`)

`EmbeddingService` wraps `@xenova/transformers` for local inference:

**Model:** `Xenova/all-MiniLM-L6-v2` — 384-dimensional sentence embeddings

**Initialization:**
- Lazy initialization on first use
- Downloads model on first run (cached by transformers.js afterward)
- Uses `feature-extraction` pipeline with `{ pooling: 'mean', normalize: true }`

**Caching:**
- In-memory LRU cache with configurable `maxCacheSize` (default 1000)
- Cache key: 32-bit hash of input text (simple `(hash << 5) - hash + charCode`)
- **Hash collision risk:** The 32-bit hash has a realistic collision probability for large datasets. Different texts could map to the same cache key, returning wrong embeddings. See [Issue #5](#audit-issue-5).

**Text preprocessing:**
- Collapses whitespace
- Truncates to 1024 characters (roughly 256 tokens for this model)

**Batch processing:**
- `generateEmbeddings(texts[])` — processes in batches of 10 with `Promise.all` per batch
- Does not use the model's native batch API — each text is embedded individually

**Output:** `number[]` of 384 dimensions, normalized (unit length).

#### Embedding Utils (`embedding-utils.ts`)

Pure functions for vector operations:

| Function | Purpose |
|----------|---------|
| `embeddingToBuffer(embedding)` | Converts `number[]` to `Buffer` (float32LE, 4 bytes per number) |
| `bufferToEmbedding(buffer)` | Converts `Buffer` or `Uint8Array` back to `number[]` |
| `normalizeEmbedding(embedding)` | L2 normalization to unit length |
| `cosineSimilarity(a, b)` | Returns -1 to 1 similarity score |
| `euclideanDistance(a, b)` | L2 distance (lower = more similar) |
| `dotProduct(a, b)` | Vector dot product |
| `magnitude(v)` | L2 norm |
| `averageEmbeddings(embeddings[])` | Element-wise average of multiple vectors |
| `topKSimilar(query, candidates, k)` | Returns top-k most similar with indices and scores |

**Note on Bun compatibility:** `bufferToEmbedding` handles both `Buffer` and `Uint8Array` because Bun's SQLite returns BLOBs as `Uint8Array`, not `Buffer`.

#### Store (`store.ts`)

`MemoryStore` provides CRUD operations:

**Create:**
- `storeMemory(input)` — generates embedding, creates UUID, stores in `memories` table
- `storeDecision(input)` — combines context+decision+reasoning into content string, stores as memory with `{ type: 'decision' }` metadata, then creates `decisions` row linked by `memory_id`

**Read:**
- `getMemory(id)` — by memory ID
- `getDecision(id)` — by decision ID
- `getDecisionByMemoryId(memoryId)` — by linked memory
- `getProjectMemories(project)` — all memories for a project, ordered by date desc
- `getProjectDecisions(project)` — all decisions for a project via JOIN
- `getMemoryCount(project?)` — count with optional project filter
- `getProjects()` — `SELECT DISTINCT project` from memories

**Update:**
- `updateMemory(id, content)` — regenerates embedding, updates content and timestamp
- `updateDecisionOutcome(id, outcome)` — sets outcome on decision

**Delete:**
- `deleteMemory(id)` — cascades to linked decisions via foreign key

#### Search (`search.ts`)

`SemanticSearch` implements vector similarity search:

**`search(query, options)`:**
1. Generates query embedding
2. Runs SQL query with optional project filter
3. Loads ALL matching rows into memory
4. For each row: deserializes embedding, computes cosine similarity
5. Filters by `minSimilarity` threshold
6. Checks metadata for `type: 'decision'`, loads decision details if present
7. Filters by tags if specified
8. Sorts by similarity descending
9. Applies limit

**Performance concern:** This is a full table scan + in-memory similarity computation. Every search reads ALL embeddings from the database, deserializes them, and computes similarity. For N memories, this is O(N) reads + O(N × 384) multiply-add operations. See [Issue #6](#audit-issue-6).

**Specialized search methods:**
- `findSimilarDecisions(context, project?, limit?)` — searches with 0.3 minimum similarity, filters for decisions only
- `getRecommendations(context, project, limit?)` — searches with 0.7 minimum similarity
- `findByTags(tags[], project?, limit?)` — SQL-based tag matching on decisions
- `hybridSearch(query, options)` — combines semantic search with text search (`LIKE` query), boosts hybrid matches by 1.2x
- `textSearch(query, project?)` — simple `LIKE '%query%'` with 0.8 default similarity

#### Context Builder (`context-builder.ts`)

`MemoryContextBuilder` formats search results for Claude Code consumption:

**Formats:**
- `detailed` — full decision with all fields, similarity %, metadata, dates
- `concise` — truncated preview (100-150 chars), similarity %
- `summary` — one-line: decision text + project name

**Token budget management:**
- Rough estimate: 1 token ≈ 4 characters
- `maxTokens` option truncates output with `[Context truncated due to length]` marker

**Convenience methods:**
- `buildDecisionContext(results)` — detailed format for decisions, 2000 token max
- `buildRecommendationContext(results)` — concise format, 1000 token max
- `buildSingleDecisionContext(result)` — full detail for one decision
- `combineContexts(contexts[], maxTokens?)` — joins with separator

#### MemoryManager (`index.ts`)

Unified facade for the entire memory system:

**Components:**
- `database: MemoryDatabase`
- `embeddings: EmbeddingService`
- `contextBuilder: MemoryContextBuilder`
- `store: MemoryStore` (initialized after database)
- `search: SemanticSearch` (initialized after database)

**Lifecycle:**
- `initialize()` — initializes database, downloads/loads embedding model, creates store and search
- `close()` — closes database, nulls store and search
- `healthCheck()` — delegates to database health check
- `getStats()` — combines database and embedding cache stats

**Convenience methods:**
- `rememberDecision(project, context, decision, reasoning, options?)` — wraps `store.storeDecision()`
- `recallSimilar(query, options?)` — wraps `search.search()` + `contextBuilder.buildDecisionContext()`
- `getRecommendations(context, project, limit?)` — wraps `search.getRecommendations()` + `contextBuilder.buildRecommendationContext()`

---

### 4.8 Orchestration Engine

**Directory:** `src/orchestrator/`  
**Files:** `types.ts`, `event-emitter.ts`, `event-queue.ts`, `coordinator.ts`, `decision-logger.ts`, `task-parser.ts`, `handlers/`, `index.ts`

#### Types (`types.ts`)

**Event types (16 total):**
- File: `file:created`, `file:modified`, `file:deleted`
- Task: `task:created`, `task:updated`, `task:completed`, `task:blocked`
- Decision: `decision:made`, `decision:updated`
- Project: `project:created`, `project:updated`, `project:archived`
- System: `system:ready`, `system:error`, `system:shutdown`

**Priority levels:** `low`, `normal`, `high`, `urgent`

**Key interfaces:** `Event`, `EventHandler`, `EventQueueItem`, `Operation`, `CoordinatorStats`, `OrchestratorStats`

#### EventBus (`event-emitter.ts`)

Extends Node's `EventEmitter` with typed events:

- `registerHandler(handler)` — subscribes handler to its declared event types
- `unregisterHandler(name)` — removes handler and its listeners
- `emitEvent(type, payload, source, priority?)` — creates event with UUID, adds to history, emits
- `getHistory(options?)` — filter by type, source, since date, limit
- `getStats()` — total events, handler count, events-by-type counts

**History:** Maintains a rolling history with configurable `maxHistorySize` (default 1000). Oldest events are dropped when limit is reached.

#### EventQueue (`event-queue.ts`)

Priority-based event queue with retry support:

- `enqueue(event, maxRetries?)` — inserts based on priority order (urgent=0, high=1, normal=2, low=3)
- `dequeue()` — returns next ready item (respects `scheduledFor` times)
- `reschedule(item, delayMs)` — increments retry count, sets future `scheduledFor` time
- `peek()` — look without removing
- `getStatus()` — queue size, processing state, event details

**Retry behavior:** Items can be retried up to `maxRetries` (default 3). Failed items are rescheduled with the delay specified by the caller (coordinator uses exponential backoff: `2^retries * 1000ms`).

#### AgentCoordinator (`coordinator.ts`)

Coordinates operations with concurrency control:

- `routeEvent(event)` — adds to queue, starts processing if idle
- `processQueue()` — loop: checks concurrency limit, dequeues ready items, processes
- `processEvent(item)` — creates `Operation`, emits event to bus, tracks status
- `setMaxConcurrent(value)` — runtime adjustment (default 5)
- `clearCompleted()` — frees memory from finished operations
- `stop()` / `resume()` — pause/resume processing

**Concurrency:** Tracks running operations and blocks dequeue when `maxConcurrent` is reached. Uses polling (100ms) to wait for completion.

#### DecisionLogger (`decision-logger.ts`)

Automatically captures and stores decisions:

- `logDecision(decision)` — stores in memory system AND appends to vault `Projects/{project}/decisions.md`
- `formatDecisionEntry(decision)` — markdown formatting with all fields
- Static: `detectDecision(text)` — keyword detection (decided to, chose to, went with, etc.)
- Static: `extractDecisionFromText(text)` — regex extraction of decision and reasoning
- Static: `createDecisionEntry(...)` — factory method for minimal input

#### TaskParser (`task-parser.ts`)

Extracts tasks from markdown files:

**Supported formats:**
- Frontmatter `tasks` array
- Markdown headers: `## Task: [title]` with `Status: [status]`
- Checkboxes: `- [ ] todo`, `- [x] done`, `- [>] in-progress`, `- [!] blocked`

**Metadata extraction from task lines:**
- Priority tags: `#high`, `#medium`, `#low`
- Due dates: `[due: 2024-01-15]` or `@due(2024-01-15)`

**Utility methods:** `filterByStatus()`, `getOverdueTasks()`, `sortByPriority()`, `formatAsMarkdown()`, `validateTask()`

#### Event Handlers (`handlers/`)

Four specialized handlers, all extending `BaseHandler`:

| Handler | Event Types | Files Watched | Action |
|---------|------------|---------------|--------|
| `TaskHandler` | `file:created`, `file:modified` | `**/progress.md` | Extracts tasks, emits task events |
| `StatusChangeHandler` | `file:modified` | All `.md` files | Compares frontmatter status to cached, emits `project:updated` |
| `DecisionDetectionHandler` | `file:modified` | `**/decisions.md` | Extracts decisions, stores in memory, emits `decision:made` |
| `ContextUpdateHandler` | `file:modified` | `**/context.md` | Invalidates reader cache, emits `project:updated` |

**`BaseHandler`** provides:
- Logging helpers: `logHandling()`, `logSuccess()`, `logError()`
- File filtering: `shouldHandleFile(path, patterns)` — checks path suffix

**DecisionDetectionHandler details:**
- Debounces by 5000ms per file (prevents re-processing rapid saves)
- Extracts decisions via regex matching of the markdown decision format
- Parses: Context, Decision, Reasoning, Alternatives, Tags
- Each extracted decision is individually stored via `memory.store.storeDecision()`

#### Orchestrator (`index.ts`)

The `Orchestrator` class ties everything together:

**Construction:**
- Creates EventBus, AgentCoordinator, DecisionLogger
- Creates all 4 handlers
- Wires handlers to event bus

**`initialize()`:**
1. Registers all handlers with event bus
2. Sets up vault watcher integration (file changes → event bus events)
3. Emits `system:ready`

**Vault watcher integration:**
```
vault.watcher.on('change')  → eventBus.emitEvent('file:modified')
vault.watcher.on('created') → eventBus.emitEvent('file:created')
vault.watcher.on('deleted') → eventBus.emitEvent('file:deleted')
```

**Shutdown:** emits `system:shutdown`, stops coordinator, removes all listeners.

**CRITICAL GAP:** This entire orchestrator module is never instantiated in `src/index.ts`. See [Issue #1](#audit-issue-1).

---

### 4.9 Scripts

**Directory:** `src/scripts/`  
**Files:** `setup.ts`, `health-check.ts`

#### Setup (`setup.ts`)

Run via `bun run setup`. Performs:
1. Checks Bun version ≥ 1.0.0
2. Creates `data/` and `logs/` directories
3. Copies `.env.example` to `.env` if `.env` doesn't exist
4. Validates configuration (warns if `VAULT_PATH` is unconfigured)

#### Health Check (`health-check.ts`)

Performs 5 checks:
1. Configuration loads and validates
2. `data/` directory exists and is writable
3. `logs/` directory exists and is writable
4. Vault path exists and is a directory
5. Required npm dependencies are installed (`hono`, `@modelcontextprotocol/sdk`, `zod`, `pino`)

Returns exit code 1 if any check fails.

---

## 5. Data Flow Diagrams

### Tool Call Flow (remember_decision)

```
Claude Code → [stdio JSON-RPC] → MCP Server
  → CallToolRequestSchema handler
    → handleCallTool('remember_decision', args, logger)
      → handleRememberDecision(args, logger)
        → getMemoryService()
          → memory.store.storeDecision({project, context, decision, reasoning, ...})
            → embeddings.generateEmbedding(combinedContent)
              → transformers.js pipeline('feature-extraction', text)
              → 384-dim float32 array
            → INSERT INTO memories (id, project, content, embedding, ...)
            → INSERT INTO decisions (id, memory_id, context, decision, ...)
          ← decisionId
        ← ToolResponse { content: [{ type: 'text', text: '...' }] }
      ← response
    ← response
  ← [stdio JSON-RPC response]
← Claude Code receives decision confirmation
```

### Tool Call Flow (recall_similar)

```
Claude Code → [stdio] → MCP Server
  → handleRecallSimilar(args, logger)
    → memory.search.search(query, options)
      → embeddings.generateEmbedding(query) → queryVector
      → SELECT * FROM memories WHERE [filters]
      → For each row:
        → bufferToEmbedding(row.embedding) → candidateVector
        → cosineSimilarity(queryVector, candidateVector) → score
        → If score ≥ minSimilarity: include in results
        → If metadata.type === 'decision': load decision details
      → Sort by similarity DESC, apply limit
    ← MemorySearchResult[]
    → contextBuilder.buildDecisionContext(results)
    ← formatted markdown string
  ← ToolResponse with formatted context
← Claude Code receives similar decisions
```

### Vault Change Flow (currently dead code)

```
Obsidian saves file → fs.watch() detects change
  → VaultWatcher.handleFileChange() [debounced 500ms]
    → VaultWatcher.emitFileChange()
      → emit('change', { type, path, timestamp })
        → VaultManager: reader.invalidateCache(path)
        → Orchestrator (if initialized):
          → eventBus.emitEvent('file:modified', { path })
            → DecisionDetectionHandler (if decisions.md)
              → reader.readMarkdownFile(path)
              → extractDecisions(content)
              → memory.store.storeDecision() for each
              → eventBus.emitEvent('decision:made')
            → ContextUpdateHandler (if context.md)
              → reader.invalidateCache(path)
              → eventBus.emitEvent('project:updated')
            → TaskHandler (if progress.md)
              → extractTasks(content) + extractCheckboxTasks(content)
              → eventBus.emitEvent('task:created' | 'task:completed' | ...)
            → StatusChangeHandler (all .md)
              → Compare frontmatter.status to cached
              → eventBus.emitEvent('project:updated') if changed
```

---

## 6. Dependency & Import Map

### External Dependencies

| Package | Version | Used By | Purpose |
|---------|---------|---------|---------|
| `@modelcontextprotocol/sdk` | ^1.25.2 | `server/mcp-server.ts` | MCP protocol implementation |
| `@xenova/transformers` | 2.17.2 | `memory/embeddings.ts` | Local ML model inference |
| `dotenv` | ^17.2.3 | `config/loader.ts` | `.env` file loading |
| `gray-matter` | ^4.0.3 | `vault/reader.ts`, `vault/writer.ts` | YAML frontmatter parsing |
| `hono` | ^4.11.3 | **UNUSED** | HTTP framework (future use) |
| `pino` | ^10.1.1 | `utils/logger.ts` | Structured logging |
| `pino-pretty` | ^13.1.3 | `utils/logger.ts` | Dev log formatting |
| `zod` | ^4.3.5 | `config/schema.ts`, `server/utils/validators.ts` | Schema validation |

### Internal Module Dependency Graph

```
src/index.ts
├── @/config (loadConfig)
├── @/utils (createLogger, createComponentLogger)
├── @/server (ClaudeBrainMCPServer)
└── @/server/services (initializeServices, shutdownServices)

src/server/services.ts
├── @/memory (MemoryManager)
├── @/vault (VaultManager)
└── @/config (Config type)

src/server/handlers/call-tool.ts
├── @/tools/registry (ToolRegistry)
└── @/server/handlers/tools/* (6 handler functions)

src/server/handlers/tools/remember-decision.ts
└── @/server/services (getMemoryService, isServicesInitialized)

src/server/handlers/tools/recall-similar.ts
└── @/server/services (getMemoryService, isServicesInitialized)

src/orchestrator/index.ts
├── @/vault (VaultManager)
├── @/memory (MemoryManager)
├── orchestrator/event-emitter (EventBus)
├── orchestrator/coordinator (AgentCoordinator)
├── orchestrator/decision-logger (DecisionLogger)
└── orchestrator/handlers/* (4 handler classes)

src/memory/index.ts (MemoryManager)
├── memory/database (MemoryDatabase → bun:sqlite)
├── memory/embeddings (EmbeddingService → @xenova/transformers)
├── memory/store (MemoryStore)
├── memory/search (SemanticSearch)
└── memory/context-builder (MemoryContextBuilder)

src/vault/index.ts (VaultManager)
├── vault/reader (VaultReader → gray-matter)
├── vault/writer (VaultWriter → gray-matter)
├── vault/watcher (VaultWatcher → fs.watch)
├── vault/query (VaultQuery)
├── vault/frontmatter (FrontmatterUtils)
├── vault/paths (VaultPathUtils)
└── vault/templates (TEMPLATES)
```

---

## 7. Stub & TODO Inventory

### Stub Handlers (Phase 6 incomplete)

| Handler | File | What It Should Do |
|---------|------|-------------------|
| `get_project_context` | `server/handlers/tools/get-project-context.ts` | Read vault context.md, merge with progress, standards, and semantic memories |
| `update_progress` | `server/handlers/tools/update-progress.ts` | Write to vault progress.md via VaultWriter |
| `get_code_standards` | `server/handlers/tools/get-code-standards.ts` | Read vault standards.md, merge global + project standards |
| `list_projects` | `server/handlers/tools/list-projects.ts` | Scan vault Projects/ directory, read metadata |

### Missing Integrations

| What | Where | Status |
|------|-------|--------|
| Orchestrator startup | `src/index.ts` | Never instantiated |
| Vault watcher → event system | Orchestrator built but dead | Needs `index.ts` integration |
| HTTP interface | `hono` dependency installed | No routes defined anywhere |
| Config hot-reload | `ConfigWatcher` built | Never consumed |
| Schema migrations | `SCHEMA_VERSION` defined | No migration runner |

### Inline TODOs

Found in code comments:
- `get-project-context.ts`: "TODO: Implement in Phase 6"
- `update-progress.ts`: "TODO: Implement in Phase 6"
- `get-code-standards.ts`: "TODO: Implement in Phase 2 and Phase 6"
- `list-projects.ts`: "TODO: Implement in Phase 2"

---

## 8. Audit Findings & Issues

<a id="audit-issue-1"></a>
### Issue #1: Orchestrator Never Started (Critical)

**Severity:** Critical  
**Location:** `src/index.ts`  
**Description:** The entire orchestration engine (`src/orchestrator/`) is fully implemented with event handlers, a coordinator, a decision logger, and vault watcher integration, but it is never instantiated or started from the application entry point. This means file watching events never flow through the event system, auto-decision detection doesn't run, and task extraction doesn't happen.

**Impact:** All Phase 4 features (automatic decision capture, task extraction, status tracking) are dead code.

**Fix:** Add orchestrator initialization to `src/index.ts` after services are initialized:
```typescript
import { createOrchestrator } from '@/orchestrator'

// After initializeServices()
const orchestrator = createOrchestrator(logger, services.vault, services.memory)
await orchestrator.initialize()

// In shutdown handler:
orchestrator.shutdown()
```

<a id="audit-issue-2"></a>
### Issue #2: 4 of 6 Tool Handlers Are Stubs (High)

**Severity:** High  
**Location:** `src/server/handlers/tools/`  
**Description:** `get_project_context`, `update_progress`, `get_code_standards`, and `list_projects` return mock responses with `[STUB]` prefixes. The vault system these handlers need is fully built and available via `getVaultService()`.

**Impact:** Claude Code receives fake data for 4 of its 6 tools, limiting the usefulness of the entire system.

**Fix:** Implement each handler using `getVaultService()`. For example, `list_projects` should call `vault.listProjects()` and `vault.getProjectMetadata()` for each project.

<a id="audit-issue-3"></a>
### Issue #3: Built Utilities Not Used (Low)

**Severity:** Low  
**Location:** `src/server/utils/`  
**Description:** `ResponseFormatter`, `ToolValidator`, and `ErrorHandler.wrapAsync()` are well-designed utility classes that are never used by the actual tool handlers. Handlers manually construct responses and cast arguments without validation.

**Impact:** Inconsistent response formatting, no runtime type validation on tool arguments (relying only on the registry's required-field check), and manual error handling that could miss edge cases.

**Fix:** Refactor handlers to use these utilities:
```typescript
// Before:
const input = args as RememberDecisionInput
return { content: [{ type: 'text', text: '...' }] }

// After:
const input = ToolValidator.validate(args, RememberDecisionSchema)
return ResponseFormatter.text('...')
```

<a id="audit-issue-4"></a>
### Issue #4: Vault Query Loads All Files (Medium)

**Severity:** Medium  
**Location:** `src/vault/query.ts` → `query()`  
**Description:** Every query reads ALL markdown files from both Projects/ and Global/ directories, parses each with `gray-matter`, then filters in memory. No file-level filtering is done before parsing.

**Impact:** Query performance degrades linearly with vault size. A vault with 1000 files will parse all 1000 on every query, even if searching for a single project.

**Fix:** Add early directory-level filtering (e.g., if `project` filter is specified, only scan that project's directory). Consider caching frontmatter separately from content for filter-only queries.

<a id="audit-issue-5"></a>
### Issue #5: Embedding Cache Hash Collisions (Medium)

**Severity:** Medium  
**Location:** `src/memory/embeddings.ts` → `getCacheKey()`  
**Description:** The cache key is a 32-bit integer hash of the input text. With the birthday paradox, collision probability reaches ~50% at ~65,000 entries and is non-trivial even at the 1000-entry default max. A collision would return the wrong embedding for a text.

**Impact:** Incorrect semantic search results in rare but possible cases.

**Fix:** Use a proper hash function or store the full text as the key (memory cost is modest since the embedding itself is 384×4 = 1,536 bytes, dwarfing typical text keys).

<a id="audit-issue-6"></a>
### Issue #6: Semantic Search Full Table Scan (Medium)

**Severity:** Medium  
**Location:** `src/memory/search.ts` → `search()`  
**Description:** Every semantic search loads ALL embeddings from the database, deserializes each (384 floats from binary), and computes cosine similarity in JavaScript. This is O(N) per search.

**Impact:** At 10,000 memories, each search reads ~6MB of embedding data (10,000 × 384 × 4 bytes) and performs ~3.84 million floating-point operations. Latency will be seconds, not milliseconds.

**Fix options:**
1. **Short-term:** Add an in-memory embedding index (load once, update on writes). This avoids repeated deserialization.
2. **Medium-term:** Use SQLite's built-in math functions with a pre-filter on project/date to reduce candidates.
3. **Long-term:** Integrate a proper vector index (HNSW via `sqlite-vss`, or a separate vector store like `hnswlib-node`).

<a id="audit-issue-7"></a>
### Issue #7: No Input Validation on Tool Arguments (Medium)

**Severity:** Medium  
**Location:** `src/server/handlers/tools/*.ts`  
**Description:** All tool handlers use `args as SomeInput` type assertions without runtime validation. While the registry checks for required fields, it doesn't validate types, ranges, or formats. For example, `min_similarity` could be a string or a number > 1 without any error.

**Impact:** Unexpected runtime errors or silent incorrect behavior with malformed inputs.

**Fix:** Use the existing `ToolValidator.validate()` with Zod schemas for each tool input.

<a id="audit-issue-8"></a>
### Issue #8: Duplicate createTimer Implementations (Low)

**Severity:** Low  
**Location:** `src/utils/logger-utils.ts` and `src/server/utils/request-context.ts`  
**Description:** Two different `createTimer` functions exist with slightly different return types. The `utils/` version returns `{ stop: () => number }` while the `server/utils/` version returns a `Timer` class with `stop()`, `getDuration()`, and `isStopped()`.

**Impact:** Confusion about which to import, potential bugs if the wrong one is used.

**Fix:** Consolidate into a single `Timer` implementation.

<a id="audit-issue-9"></a>
### Issue #9: Decision Handler Debounce Doesn't Prevent Duplicates (Medium)

**Severity:** Medium  
**Location:** `src/orchestrator/handlers/decision-handler.ts`  
**Description:** The `DecisionDetectionHandler` debounces file processing by 5 seconds, but it re-extracts ALL decisions from the file each time. There's no mechanism to track which decisions have already been stored, leading to duplicate entries in the memory database on every file save.

**Impact:** The same decision gets stored multiple times, polluting search results.

**Fix:** Track stored decision hashes (e.g., hash of context+decision+reasoning) and skip duplicates. Or maintain a last-processed-line-count/content-hash to only process new entries.

<a id="audit-issue-10"></a>
### Issue #10: No Graceful Handling of Missing Vault Path (Medium)

**Severity:** Medium  
**Location:** `src/server/services.ts`  
**Description:** If `VAULT_PATH` points to a non-existent directory, `VaultManager.initialize()` will create the directory structure. However, the reader and watcher will operate on an empty vault, and the user might not realize their vault isn't connected.

**Impact:** Silent failure — the system appears to work but has no project data.

**Fix:** Add a startup warning or health check that verifies the vault path contains expected structure (a Projects/ directory with at least one project).

---

## 9. Performance Observations

### Startup Performance

1. **Embedding model download:** First run downloads ~80MB model. Subsequent runs use cache.
2. **Model loading:** `transformers.js` model initialization takes 2-5 seconds on modern hardware.
3. **Database initialization:** SQLite + WAL setup is near-instant.
4. **Vault initialization:** Directory creation is near-instant.

**Total cold start:** ~3-8 seconds (dominated by model loading).

### Runtime Performance

| Operation | Expected Latency | Bottleneck |
|-----------|-----------------|------------|
| `remember_decision` | 50-200ms | Embedding generation |
| `recall_similar` (100 memories) | 100-300ms | Full scan + similarity |
| `recall_similar` (10,000 memories) | 2-10s | Full scan + deserialization |
| File read (cached) | < 1ms | Memory lookup |
| File read (uncached) | 1-5ms | Disk I/O + parsing |
| File write (atomic) | 5-20ms | Write + rename + backup |

### Memory Usage

| Component | Estimated RAM |
|-----------|--------------|
| Embedding model | ~100-200MB |
| Embedding cache (1000 entries) | ~1.5MB |
| File cache (100 files) | ~1-10MB |
| Event history (1000 events) | ~1MB |
| SQLite WAL | Variable |

**Total baseline:** ~150-250MB, dominated by the embedding model.

### Optimization Priorities

1. **Embedding index** — eliminate repeated deserialization in search
2. **Vault query filtering** — scan only relevant directories
3. **Batch embedding writes** — use transactions for multiple stores
4. **Lazy model loading** — defer embedding model until first use (already partially done)

---

## 10. Security Considerations

1. **Path traversal protection:** `VaultPathUtils.joinVaultPath()` and `isInsideVault()` prevent escaping the vault root. This is correctly implemented.

2. **Atomic writes:** The temp-file-then-rename pattern prevents data corruption from interrupted writes. Temp file cleanup is handled in the error path.

3. **No network exposure:** The server uses stdio transport only. The `hono` HTTP server is installed but unused. If enabled in the future, auth and CORS must be added.

4. **SQL injection:** All database queries use parameterized statements (`?` placeholders). No string concatenation in SQL.

5. **File permissions:** The setup script checks write permissions on data/ and logs/ directories.

6. **No secrets in config:** The configuration schema doesn't include API keys or tokens. All operation is local.

7. **Concern: `LIKE` queries in text search** use user-provided query text directly in the pattern (`%${query}%`). While parameterized, the `%` and `_` wildcards in user input could cause unexpected matches. Consider escaping these characters.

---

## 11. Testing Strategy

### Current State

The `package.json` defines `bun test` and `bun test --watch` scripts, but **no test files are included in the provided codebase**. The testing infrastructure exists but needs implementation.

### Recommended Test Structure

```
tests/
├── unit/
│   ├── config/
│   │   ├── schema.test.ts
│   │   └── loader.test.ts
│   ├── memory/
│   │   ├── embedding-utils.test.ts    ← pure functions, easy to test
│   │   ├── store.test.ts              ← needs SQLite setup
│   │   ├── search.test.ts             ← needs embeddings mock
│   │   └── context-builder.test.ts    ← pure formatting
│   ├── vault/
│   │   ├── paths.test.ts              ← pure functions
│   │   ├── frontmatter.test.ts        ← pure functions
│   │   ├── templates.test.ts          ← pure functions
│   │   ├── reader.test.ts             ← needs temp files
│   │   └── writer.test.ts             ← needs temp files
│   ├── orchestrator/
│   │   ├── event-queue.test.ts        ← pure data structure
│   │   ├── task-parser.test.ts        ← pure parsing
│   │   └── decision-logger.test.ts
│   └── tools/
│       ├── registry.test.ts           ← static methods
│       └── schemas.test.ts
├── integration/
│   ├── memory-system.test.ts          ← full store→search→recall
│   ├── vault-operations.test.ts       ← full read→write→watch
│   └── tool-handlers.test.ts          ← full tool call flow
└── e2e/
    └── mcp-server.test.ts             ← stdio protocol test
```

### Testing Priorities

1. **Embedding utils** — pure math functions, zero dependencies, highest value/effort ratio
2. **Path utils + frontmatter** — pure functions, many edge cases
3. **Task parser** — complex regex parsing, many input formats
4. **Memory store + search** — needs SQLite fixture but validates core value prop
5. **Tool handlers** — integration tests with mocked services

---

## 12. Upgrade Roadmap

### Priority 1: Complete Phase 6 Integration (HIGH)

1. **Wire up orchestrator** in `src/index.ts`
2. **Implement 4 stub handlers** using vault services
3. **Add duplicate detection** to decision handler
4. **Validate tool arguments** with Zod schemas

### Priority 2: Performance (MEDIUM)

1. **In-memory embedding index** — load embeddings at startup, update on writes
2. **Vault query optimization** — directory-level filtering before file parsing
3. **Fix embedding cache hash** — use SHA-256 or store full text keys
4. **Batch operations** — wrap multi-decision stores in transactions

### Priority 3: Reliability (MEDIUM)

1. **Add tests** — start with pure function units, then integration
2. **Use ResponseFormatter everywhere** — consistent response formatting
3. **Add health endpoint** — expose via HTTP (hono) or as an MCP resource
4. **Schema migrations** — implement migration runner for database upgrades
5. **Error boundary in orchestrator** — prevent handler failures from crashing the event loop

### Priority 4: Features (LOW)

1. **MCP Resources** — expose vault files as MCP resources for direct reading
2. **MCP Prompts** — predefined prompts for common workflows
3. **Config hot-reload** — consume the existing ConfigWatcher
4. **HTTP API** — expose tools via REST (hono) for non-MCP clients
5. **Export/import** — backup and restore memory database
6. **Embedding model selection** — configurable model for different quality/speed tradeoffs

---

## 13. Quick Reference: File Index

| File Path | Lines (est.) | Module | Status |
|-----------|-------------|--------|--------|
| `src/index.ts` | 65 | Entry | ✅ Working (missing orchestrator) |
| `src/config/schema.ts` | 40 | Config | ✅ Complete |
| `src/config/defaults.ts` | 15 | Config | ✅ Complete |
| `src/config/loader.ts` | 85 | Config | ✅ Complete |
| `src/config/watcher.ts` | 80 | Config | ✅ Built, unused |
| `src/config/index.ts` | 5 | Config | ✅ Barrel |
| `src/utils/logger.ts` | 55 | Utils | ✅ Complete |
| `src/utils/logger-utils.ts` | 55 | Utils | ✅ Complete |
| `src/utils/index.ts` | 15 | Utils | ✅ Barrel |
| `src/server/mcp-server.ts` | 170 | Server | ✅ Complete |
| `src/server/types.ts` | 30 | Server | ✅ Complete |
| `src/server/services.ts` | 100 | Server | ✅ Complete |
| `src/server/index.ts` | 25 | Server | ✅ Barrel |
| `src/server/handlers/list-tools.ts` | 15 | Server | ✅ Complete |
| `src/server/handlers/call-tool.ts` | 75 | Server | ✅ Complete |
| `src/server/handlers/tools/get-project-context.ts` | 40 | Server | 🔴 Stub |
| `src/server/handlers/tools/update-progress.ts` | 40 | Server | 🔴 Stub |
| `src/server/handlers/tools/get-code-standards.ts` | 35 | Server | 🔴 Stub |
| `src/server/handlers/tools/list-projects.ts` | 35 | Server | 🔴 Stub |
| `src/server/handlers/tools/remember-decision.ts` | 80 | Server | ✅ Live |
| `src/server/handlers/tools/recall-similar.ts` | 85 | Server | ✅ Live |
| `src/server/utils/response-formatter.ts` | 95 | Server | ✅ Built, underused |
| `src/server/utils/validators.ts` | 160 | Server | ✅ Built, unused |
| `src/server/utils/error-handler.ts` | 110 | Server | ✅ Built, underused |
| `src/server/utils/request-context.ts` | 85 | Server | ✅ Built, underused |
| `src/tools/schemas.ts` | 130 | Tools | ✅ Complete |
| `src/tools/registry.ts` | 85 | Tools | ✅ Complete |
| `src/tools/types.ts` | 105 | Tools | ✅ Complete |
| `src/tools/index.ts` | 20 | Tools | ✅ Barrel |
| `src/vault/types.ts` | 55 | Vault | ✅ Complete |
| `src/vault/paths.ts` | 75 | Vault | ✅ Complete |
| `src/vault/reader.ts` | 170 | Vault | ✅ Complete |
| `src/vault/writer.ts` | 250 | Vault | ✅ Complete |
| `src/vault/watcher.ts` | 200 | Vault | ✅ Complete |
| `src/vault/query.ts` | 280 | Vault | ✅ Complete |
| `src/vault/frontmatter.ts` | 210 | Vault | ✅ Complete |
| `src/vault/templates.ts` | 105 | Vault | ✅ Complete |
| `src/vault/index.ts` | 225 | Vault | ✅ Complete |
| `src/memory/types.ts` | 90 | Memory | ✅ Complete |
| `src/memory/schema.ts` | 45 | Memory | ✅ Complete |
| `src/memory/database.ts` | 130 | Memory | ✅ Complete |
| `src/memory/embeddings.ts` | 170 | Memory | ✅ Complete |
| `src/memory/embedding-utils.ts` | 120 | Memory | ✅ Complete |
| `src/memory/store.ts` | 230 | Memory | ✅ Complete |
| `src/memory/search.ts` | 250 | Memory | ✅ Complete |
| `src/memory/context-builder.ts` | 180 | Memory | ✅ Complete |
| `src/memory/index.ts` | 160 | Memory | ✅ Complete |
| `src/orchestrator/types.ts` | 85 | Orch. | ✅ Complete |
| `src/orchestrator/event-emitter.ts` | 140 | Orch. | ✅ Complete |
| `src/orchestrator/event-queue.ts` | 140 | Orch. | ✅ Complete |
| `src/orchestrator/coordinator.ts` | 190 | Orch. | ✅ Complete |
| `src/orchestrator/decision-logger.ts` | 155 | Orch. | ✅ Complete |
| `src/orchestrator/task-parser.ts` | 210 | Orch. | ✅ Complete |
| `src/orchestrator/handlers/base-handler.ts` | 55 | Orch. | ✅ Complete |
| `src/orchestrator/handlers/task-handler.ts` | 130 | Orch. | ✅ Complete |
| `src/orchestrator/handlers/status-handler.ts` | 100 | Orch. | ✅ Complete |
| `src/orchestrator/handlers/decision-handler.ts` | 145 | Orch. | ✅ Has dup issue |
| `src/orchestrator/handlers/context-handler.ts` | 60 | Orch. | ✅ Complete |
| `src/orchestrator/handlers/index.ts` | 10 | Orch. | ✅ Barrel |
| `src/orchestrator/index.ts` | 195 | Orch. | ✅ Complete |
| `src/scripts/setup.ts` | 85 | Scripts | ✅ Complete |
| `src/scripts/health-check.ts` | 85 | Scripts | ✅ Complete |
| `.env.example` | 10 | Config | ✅ Reference |
| `package.json` | 45 | Root | ✅ Complete |

**Total estimated source lines:** ~5,900 (excluding tests)

---

*End of Claude Brain Codebase Documentation v1.0*
