# Data Model: Todo CLI Application

## Task Entity

Represents a single todo item with properties as defined in the canonical TodoTask v1.0 data model from the constitution.

### Fields
- **id**: `int` - Unique identifier, auto-incremented upon creation (immutable)
- **title**: `str` - Required string representing the task title (required, non-empty)
- **description**: `str` - Optional string providing additional details about the task (nullable)
- **completed**: `bool` - Boolean indicating completion status (default: False)
- **created_at**: `datetime` - Timestamp of task creation (immutable after creation)
- **updated_at**: `datetime` - Timestamp of last modification (updated on any change)

### Validation Rules
- Title must not be empty or whitespace-only
- ID must be unique within the repository
- created_at is set once on creation and never modified
- updated_at is updated on every modification

### State Transitions
- Pending (completed=False) ↔ Completed (completed=True) - via toggle operations
- Creation: title, description, completed=False, created_at, updated_at
- Updates: only title, description, completed, updated_at can be modified

## TodoRepository Interface

Manages collection of Task entities with the following operations:

### Operations
- **add(task_data)**: Creates a new task with auto-assigned ID and current timestamp
- **get(id)**: Retrieves a task by its ID
- **list()**: Returns all tasks sorted by ID
- **update(id, updates)**: Modifies specific fields of a task
- **delete(id)**: Removes a task by its ID
- **toggle_status(id)**: Flips the completed status of a task

### Constraints
- No direct access to underlying storage mechanism
- Thread-safe operations (if applicable)
- Maintains data integrity across operations
- Proper error handling for invalid IDs