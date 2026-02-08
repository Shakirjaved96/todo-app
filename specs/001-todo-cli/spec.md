# Feature Specification: Todo CLI Application

**Feature Branch**: `001-todo-cli`
**Created**: 2026-02-07
**Status**: Draft
**Input**: User description: "You are an expert Python architect using Spec-Kit Plus and Agentic Dev Stack methodology. Build a production-grade in-memory Todo CLI application following strict spec-driven development with **test-first discipline**.

## 📋 PROJECT CONSTITUTION
- **Project Name**: todo-cli-py
- **Phase**: I (In-Memory Console App)
- **Core Constraint**: ZERO manual coding. All implementation MUST flow from Spec-Kit Plus generated specs → test specs → implementation plan → atomic tasks → Claude Code execution.
- **Quality Gate**: Each spec iteration must be reviewed before proceeding. Tests MUST be spec-generated before implementation.

## 🎯 OBJECTIVE
Generate a complete specification package that enables Claude Code to implement a Python 3.13+ console todo app with:
- Pure in-memory storage (no databases/files)
- 5 core operations: Add, View, Update, Delete, Mark Complete
- **100% test coverage** for core business logic + CLI integration tests
- Clean architecture with separation of concerns
- Production-ready error handling and UX

## ⚙️ TECH STACK REQUIREMENTS
- Python 3.13+ (leverage type statement, Self type, @override)
- UV for dependency management (pyproject.toml)
- pytest (as dev dependency via UV)
- pytest-cov for coverage reporting
- Type hints everywhere + docstrings
- **NO runtime external dependencies** (stdlib only for production code)

## ✅ CORE FUNCTIONAL REQUIREMENTS (MUST IMPLEMENT + TEST)
| Feature | Details | Test Coverage Required |
|---------|---------|------------------------|
| **Add Task** | `todo add "Buy milk" "Get 2% milk"` → auto ID, created_at | • Valid title/desc<br>• Empty title rejection<br>• Auto-increment ID<br>• Timestamp accuracy |
| **View Tasks** | `todo list` → ID, title, status (✓/✗), desc snippet | • Empty state handling<br>• Multi-task rendering<br>• Status indicator correctness |
| **Update Task** | `todo update 3 --title "Buy eggs"` → partial updates | • Valid ID update<br>• Invalid ID rejection<br>• Partial vs full update<br>• Immutable fields protection |
| **Delete Task** | `todo delete 5` → soft confirmation prompt | • Valid deletion<br>• Invalid ID handling<br>• Empty repo edge case |
| **Toggle Status** | `todo done 2` / `todo undone 2` | • Status flip correctness<br>• Idempotency (double done → still done)<br>• Invalid ID handling |

## 🧪 TESTING REQUIREMENTS (NON-NEGOTIABLE)
### Coverage Targets
- **≥95% branch coverage** for `/src/todo/core.py` (business logic)
- **≥90% statement coverage** for `/src/todo/storage.py` (in-memory repo)
- **100% CLI command coverage** via integration tests
- Zero untested edge cases in acceptance criteria

### Test Structure

### Test Strategy Rules
- **Unit tests**: Isolate `InMemoryRepository` — no CLI coupling
- **Integration tests**: Test full CLI flow via `subprocess.run(["uv", "run", "todo", ...])` OR Typer's `CliRunner`
- **Edge cases required**:
  - Empty title/description on add
  - Non-existent task IDs on update/delete/done
  - Repository with 0 tasks (list command)
  - Repository with 100+ tasks (pagination not required but rendering must not break)
  - Unicode characters in titles/descriptions
- **Property-based testing**: Use Hypothesis for title/description fuzzing (optional but preferred)

## 🧱 PROJECT STRUCTURE (DELIVERABLES)

## 🚫 HARD CONSTRAINTS
- NO file/database persistence (pure in-memory only)
- Production code: **zero third-party dependencies**
- Test code: ONLY pytest + pytest-cov + (optional) hypothesis
- MUST generate test specs BEFORE implementation code
- MUST include `pytest --cov=src --cov-report=term-missing` in CI/docs
- All tests must pass with `uv run pytest` from project root

Wait for my explicit approval before proceeding to architecture specs or implementation. Document every spec iteration in `specs/history/` with timestamps."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Add New Tasks (Priority: P1)

As a user, I want to add new tasks to my todo list so that I can keep track of what I need to do. I should be able to specify a title and an optional description for each task.

**Why this priority**: This is the foundational capability that enables all other functionality - without the ability to add tasks, the app has no purpose.

**Independent Test**: Can be fully tested by running `todo add "Buy groceries" "Milk and bread"` and verifying that the task is stored with a unique ID and timestamp, delivering immediate value of task creation.

**Acceptance Scenarios**:

1. **Given** I have an empty todo list, **When** I run `todo add "Buy groceries" "Milk and bread"`, **Then** a new task is created with a unique ID, current timestamp, and status "pending"
2. **Given** I have an existing task with ID 1, **When** I run `todo add "Clean house"`, **Then** a new task is created with ID 2, current timestamp, and status "pending"
3. **Given** I try to add a task with an empty title, **When** I run `todo add ""`, **Then** an error is returned indicating that the title cannot be empty

---

### User Story 2 - View All Tasks (Priority: P1)

As a user, I want to view all my tasks so that I can see what needs to be done and track my progress. The list should show task ID, title, status, and a snippet of the description.

**Why this priority**: Essential for the core user experience - users need to see their tasks to manage them effectively.

**Independent Test**: Can be fully tested by adding tasks and then running `todo list`, verifying that all tasks are displayed with appropriate status indicators, delivering the value of task visibility.

**Acceptance Scenarios**:

1. **Given** I have multiple tasks in my list, **When** I run `todo list`, **Then** all tasks are displayed with ID, title, status indicator (✓/✗), and description snippet
2. **Given** I have no tasks in my list, **When** I run `todo list`, **Then** a message indicates that the list is empty
3. **Given** I have tasks with different statuses, **When** I run `todo list`, **Then** completed tasks show a checkmark and pending tasks show an X

---

### User Story 3 - Update Task Details (Priority: P2)

As a user, I want to update my tasks so that I can correct mistakes or add more information to existing tasks. I should be able to modify title, description, or other properties.

**Why this priority**: Enhances usability by allowing users to refine their tasks without recreating them.

**Independent Test**: Can be fully tested by adding a task and then updating it with `todo update 1 --title "New title"`, verifying that the task details are updated, delivering value of task refinement.

**Acceptance Scenarios**:

1. **Given** I have a task with ID 1 and title "Old title", **When** I run `todo update 1 --title "New title"`, **Then** the task title is updated while preserving other properties
2. **Given** I try to update a non-existent task, **When** I run `todo update 999 --title "Test"`, **Then** an error is returned indicating the task doesn't exist
3. **Given** I want to update multiple properties of a task, **When** I run `todo update 1 --title "New title" --description "New description"`, **Then** both properties are updated

---

### User Story 4 - Delete Tasks (Priority: P2)

As a user, I want to delete tasks from my list so that I can remove tasks that are no longer needed or were added by mistake.

**Why this priority**: Essential for list maintenance and keeping the todo list organized.

**Independent Test**: Can be fully tested by adding tasks and then deleting one with `todo delete 2`, verifying that the task is removed, delivering value of list management.

**Acceptance Scenarios**:

1. **Given** I have a task with ID 2, **When** I run `todo delete 2`, **Then** the task is removed from the list
2. **Given** I try to delete a non-existent task, **When** I run `todo delete 999`, **Then** an error is returned indicating the task doesn't exist
3. **Given** I have tasks with various IDs, **When** I delete one task, **Then** other tasks remain unaffected

---

### User Story 5 - Toggle Task Completion Status (Priority: P1)

As a user, I want to mark tasks as completed or uncompleted so that I can track my progress and see what still needs to be done.

**Why this priority**: Critical for the core functionality - tracking task completion is fundamental to a todo app.

**Independent Test**: Can be fully tested by running `todo done 1` on a pending task and `todo undone 2` on a completed task, verifying status changes, delivering value of progress tracking.

**Acceptance Scenarios**:

1. **Given** I have a pending task with ID 1, **When** I run `todo done 1`, **Then** the task status changes to completed
2. **Given** I have a completed task with ID 2, **When** I run `todo undone 2`, **Then** the task status changes back to pending
3. **Given** I try to toggle status of a non-existent task, **When** I run `todo done 999`, **Then** an error is returned indicating the task doesn't exist

---

### Edge Cases

- What happens when a user tries to add a task with Unicode characters in the title or description?
- How does the system handle a large number of tasks (100+) without performance degradation?
- What happens when trying to perform operations on an empty repository?
- How does the system handle invalid input formats or missing arguments?
- What happens when attempting idempotent operations (marking a task as done twice)?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST provide an in-memory storage mechanism that persists tasks during the application session
- **FR-002**: System MUST assign auto-incrementing unique IDs to new tasks when they are created
- **FR-003**: System MUST record timestamps when tasks are created with high precision
- **FR-004**: System MUST allow users to add tasks with required title and optional description
- **FR-005**: System MUST prevent addition of tasks with empty titles
- **FR-006**: System MUST display all tasks with ID, title, status indicator, and description snippet
- **FR-007**: System MUST allow partial updates to task properties without affecting unchanged properties
- **FR-008**: System MUST protect immutable fields (like ID and creation timestamp) from updates
- **FR-009**: System MUST require confirmation before deleting a task to prevent accidental removal
- **FR-010**: System MUST allow toggling task completion status with idempotent behavior
- **FR-011**: System MUST handle non-existent task IDs gracefully with appropriate error messages
- **FR-012**: System MUST support Unicode characters in task titles and descriptions
- **FR-013**: System MUST provide clear command-line interface with intuitive commands
- **FR-014**: System MUST handle edge cases like empty repositories without crashing
- **FR-015**: System MUST validate command-line arguments and provide helpful error messages

### Key Entities

- **Task**: Represents a single todo item with properties: ID (unique identifier), Title (required string), Description (optional string), Status (pending/completed), CreatedAt (timestamp), UpdatedAt (timestamp)
- **TodoRepository**: Manages collection of tasks with operations: Add, Get, Update, Delete, List, ToggleStatus

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can add a new task in under 1 second response time
- **SC-002**: Users can view all tasks with up to 100 items displayed in under 1 second
- **SC-003**: Users can update task properties in under 1 second response time
- **SC-004**: Users can delete a task in under 1 second response time
- **SC-005**: Users can toggle task completion status in under 1 second response time
- **SC-006**: All core operations (Add, List, Update, Delete, Done/Undone) return appropriate responses for both valid and invalid inputs
- **SC-007**: All commands provide helpful error messages when invalid arguments are provided
- **SC-008**: The application handles Unicode characters correctly without data corruption
- **SC-009**: System maintains consistent performance with 100+ tasks in the repository
- **SC-010**: The application provides a clear and intuitive command-line interface that first-time users can understand
