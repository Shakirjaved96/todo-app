# API Contracts: Todo CLI Application

## CLI Command Contracts

### Add Task Command
- **Command**: `todo add <title> [description]`
- **Parameters**:
  - `title` (required string): Task title, must not be empty
  - `description` (optional string): Task description
- **Response**: Success message with assigned task ID and timestamp
- **Errors**: Validation error if title is empty

### List Tasks Command
- **Command**: `todo list`
- **Parameters**: None
- **Response**: Formatted table of all tasks with ID, title, status, and description snippet
- **Errors**: None (empty list is valid)

### Update Task Command
- **Command**: `todo update <id> [--title] [--description]`
- **Parameters**:
  - `id` (required int): Task identifier
  - `--title` (optional string): New title value
  - `--description` (optional string): New description value
- **Response**: Success message confirming update
- **Errors**: Task not found error if ID doesn't exist

### Delete Task Command
- **Command**: `todo delete <id>`
- **Parameters**:
  - `id` (required int): Task identifier
- **Response**: Confirmation message
- **Errors**: Task not found error if ID doesn't exist

### Mark Complete Command
- **Command**: `todo done <id>`
- **Parameters**:
  - `id` (required int): Task identifier
- **Response**: Success message confirming status change
- **Errors**: Task not found error if ID doesn't exist

### Mark Incomplete Command
- **Command**: `todo undone <id>`
- **Parameters**:
  - `id` (required int): Task identifier
- **Response**: Success message confirming status change
- **Errors**: Task not found error if ID doesn't exist