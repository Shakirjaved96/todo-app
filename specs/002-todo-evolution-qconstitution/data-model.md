# Data Model: Todo Evolution Constitution

## Overview
This document defines the canonical TodoTask data model and its evolution across the 5 phases of the todo system, as specified in the constitution.

## TodoTask Data Model Evolution

### Phase I Schema (v1.0)
The initial schema for the CLI phase with minimal fields:

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task",
    "required": true
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task",
    "required": false
  },
  "status": {
    "type": "enum",
    "values": ["pending", "completed"],
    "description": "Current status of the task",
    "required": true,
    "default": "pending"
  },
  "created_at": {
    "type": "datetime",
    "description": "Timestamp when the task was created",
    "required": true
  },
  "updated_at": {
    "type": "datetime",
    "description": "Timestamp when the task was last updated",
    "required": true
  }
}
```

### Phase II Schema (v2.0)
Enhanced schema for the API phase with additional metadata:

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task",
    "required": true,
    "min_length": 1,
    "max_length": 255
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task",
    "required": false,
    "max_length": 1000
  },
  "status": {
    "type": "enum",
    "values": ["pending", "completed"],
    "description": "Current status of the task",
    "required": true,
    "default": "pending"
  },
  "created_at": {
    "type": "datetime",
    "description": "Timestamp when the task was created",
    "required": true
  },
  "updated_at": {
    "type": "datetime",
    "description": "Timestamp when the task was last updated",
    "required": true
  },
  "user_id": {
    "type": "integer",
    "description": "ID of the user who owns this task",
    "required": true
  }
}
```

### Phase III Schema (v3.0)
Enhanced schema for the UI and AI phase with priority and tagging:

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task",
    "required": true,
    "min_length": 1,
    "max_length": 255
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task",
    "required": false,
    "max_length": 1000
  },
  "status": {
    "type": "enum",
    "values": ["pending", "completed", "in-progress"],
    "description": "Current status of the task",
    "required": true,
    "default": "pending"
  },
  "priority": {
    "type": "enum",
    "values": ["low", "medium", "high"],
    "description": "Priority level of the task",
    "required": false,
    "default": "medium"
  },
  "tags": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "description": "Tags associated with the task",
    "required": false,
    "max_items": 10
  },
  "created_at": {
    "type": "datetime",
    "description": "Timestamp when the task was created",
    "required": true
  },
  "updated_at": {
    "type": "datetime",
    "description": "Timestamp when the task was last updated",
    "required": true
  },
  "user_id": {
    "type": "integer",
    "description": "ID of the user who owns this task",
    "required": true
  }
}
```

### Phase IV Schema (v4.0)
Enhanced schema for the agentic phase with scheduling and assignment:

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task",
    "required": true,
    "min_length": 1,
    "max_length": 255
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task",
    "required": false,
    "max_length": 1000
  },
  "status": {
    "type": "enum",
    "values": ["pending", "completed", "in-progress", "blocked"],
    "description": "Current status of the task",
    "required": true,
    "default": "pending"
  },
  "priority": {
    "type": "enum",
    "values": ["low", "medium", "high", "urgent"],
    "description": "Priority level of the task",
    "required": true,
    "default": "medium"
  },
  "tags": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "description": "Tags associated with the task",
    "required": false,
    "max_items": 10
  },
  "recurrence_rule": {
    "type": "string",
    "description": "RRULE for recurring tasks (RFC 5545)",
    "required": false
  },
  "due_date": {
    "type": "datetime",
    "description": "Due date for the task",
    "required": false
  },
  "assigned_to": {
    "type": "string",
    "description": "User ID or identifier of the person assigned to this task",
    "required": false
  },
  "created_by": {
    "type": "string",
    "description": "User ID of the person who created this task",
    "required": true
  },
  "created_at": {
    "type": "datetime",
    "description": "Timestamp when the task was created",
    "required": true
  },
  "updated_at": {
    "type": "datetime",
    "description": "Timestamp when the task was last updated",
    "required": true
  },
  "completed_at": {
    "type": "datetime",
    "description": "Timestamp when the task was completed",
    "required": false
  }
}
```

### Phase V Schema (v5.0)
Final schema for the cloud-native phase with full functionality:

```json
{
  "id": {
    "type": "integer",
    "description": "Unique identifier for the task",
    "required": true
  },
  "title": {
    "type": "string",
    "description": "Title of the task",
    "required": true,
    "min_length": 1,
    "max_length": 255
  },
  "description": {
    "type": "string",
    "description": "Optional description of the task",
    "required": false,
    "max_length": 1000
  },
  "status": {
    "type": "enum",
    "values": ["pending", "completed", "in-progress", "blocked"],
    "description": "Current status of the task",
    "required": true,
    "default": "pending"
  },
  "priority": {
    "type": "enum",
    "values": ["low", "medium", "high", "urgent"],
    "description": "Priority level of the task",
    "required": true,
    "default": "medium"
  },
  "tags": {
    "type": "array",
    "items": {
      "type": "string"
    },
    "description": "Tags associated with the task",
    "required": false,
    "max_items": 10
  },
  "recurrence_rule": {
    "type": "string",
    "description": "RRULE for recurring tasks (RFC 5545)",
    "required": false
  },
  "due_date": {
    "type": "datetime",
    "description": "Due date for the task",
    "required": false
  },
  "assigned_to": {
    "type": "string",
    "description": "User ID or identifier of the person assigned to this task",
    "required": false
  },
  "created_by": {
    "type": "string",
    "description": "User ID of the person who created this task",
    "required": true
  },
  "created_at": {
    "type": "datetime",
    "description": "Timestamp when the task was created",
    "required": true
  },
  "updated_at": {
    "type": "datetime",
    "description": "Timestamp when the task was last updated",
    "required": true
  },
  "completed_at": {
    "type": "datetime",
    "description": "Timestamp when the task was completed",
    "required": false
  },
  "metadata": {
    "type": "object",
    "description": "Additional metadata associated with the task",
    "required": false,
    "additional_properties": true
  },
  "version": {
    "type": "integer",
    "description": "Version number for optimistic locking",
    "required": true,
    "default": 1
  }
}
```

## Relationships

### User-Task Relationship
- A User can have many Tasks
- A Task belongs to one User
- Foreign key: `user_id` in Task referencing `id` in User

### Task Dependencies (Future Enhancement)
- A Task can depend on other Tasks
- Implemented via a separate TaskDependency entity

## Validation Rules

### Common Validation Across All Phases
- Title must be 1-255 characters
- Description must be 0-1000 characters
- ID must be a positive integer
- Timestamps must be in ISO 8601 format
- Status must be one of the allowed enum values

### Phase-Specific Validation
- Phase III+: Priority must be one of allowed values if present
- Phase IV+/V: Due date must be in the future if present
- Phase IV+/V: Assigned user must exist if present

## State Transitions

Tasks can transition between states according to the following rules:

```
pending → in-progress → completed
pending → blocked → in-progress → completed
pending → blocked → pending
completed → pending (to reopen)
in-progress → blocked → in-progress
```

## API Contract Standards

All API contracts must conform to JSON Schema specifications with clear validation rules. Versioning follows semantic versioning principles with backward-compatible changes only.

## Persistence Strategy Evolution

- Phase I: In-memory storage
- Phase II: Neon PostgreSQL serverless
- Phase III: Enhanced PostgreSQL with indexing
- Phase IV: Event-sourced architecture with Kafka
- Phase V: Distributed storage with replication