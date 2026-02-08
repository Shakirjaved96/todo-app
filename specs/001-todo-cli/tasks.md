# Implementation Tasks: Todo CLI Application

**Feature**: Todo CLI Application
**Branch**: 001-todo-cli
**Generated**: 2026-02-07
**Input**: spec.md, plan.md, data-model.md, contracts/

## Implementation Strategy

Build the application incrementally following the user story priorities (P1, P2). Start with core data structures and repository, then add CLI functionality. Each user story represents an independently testable increment with MVP being User Story 1 (Add New Tasks).

## Phase 1: Setup & Project Initialization

- [ ] T001 Create project directory structure: src/todo/, tests/unit/, tests/integration/
- [ ] T002 Create pyproject.toml with Python 3.13+ requirement, Typer dependency, and test dependencies (pytest, pytest-cov)
- [ ] T003 Initialize git repository and create .gitignore for Python project
- [ ] T004 Create README.md with project overview and usage instructions

## Phase 2: Foundational Components (Blocking Prerequisites)

- [ ] T010 [P] Define Task data class in src/todo/core.py with all required fields (id, title, description, completed, created_at, updated_at)
- [ ] T011 [P] Implement Task validation rules in src/todo/core.py to ensure title is not empty
- [ ] T012 [P] Create InMemoryRepository class in src/todo/storage.py with basic storage mechanism
- [ ] T013 [P] Implement all required repository operations (add, get, list, update, delete, toggle_status) in src/todo/storage.py
- [ ] T014 Create __init__.py files in src/ and src/todo/ directories
- [ ] T015 [P] Create basic CLI structure in src/todo/cli.py with Typer app initialization

## Phase 3: [US1] Add New Tasks (Priority: P1)

### Goal
Enable users to add new tasks with title and optional description, assigning auto-incremented IDs and timestamps.

### Independent Test Criteria
Can run `todo add "Buy groceries" "Milk and bread"` and verify the task is stored with a unique ID and timestamp.

### Implementation Tasks
- [ ] T020 [P] [US1] Implement add_task function in src/todo/core.py that validates title is not empty
- [ ] T021 [P] [US1] Implement add command in src/todo/cli.py that accepts title and optional description
- [ ] T022 [P] [US1] Connect CLI add command to core add functionality via repository
- [ ] T023 [US1] Test: Create test_add_task_empty_title in tests/unit/test_core.py to verify empty title rejection
- [ ] T024 [US1] Test: Create test_add_task_success in tests/unit/test_core.py to verify proper task creation
- [ ] T025 [US1] Test: Create integration test for add command in tests/integration/test_cli.py

### Acceptance Tests
- [ ] T026 [US1] Verify task with empty title returns error when using `todo add ""`
- [ ] T027 [US1] Verify task with valid title gets auto-assigned ID and timestamp when using `todo add`
- [ ] T028 [US1] Verify task can be retrieved after creation

## Phase 4: [US2] View All Tasks (Priority: P1)

### Goal
Enable users to view all tasks with ID, title, status indicator, and description snippet.

### Independent Test Criteria
Can add tasks and then run `todo list`, verifying that all tasks are displayed with appropriate status indicators.

### Implementation Tasks
- [ ] T030 [P] [US2] Implement list_tasks function in src/todo/core.py that retrieves all tasks from repository
- [ ] T031 [P] [US2] Implement list command in src/todo/cli.py that displays all tasks with ID, title, status, and description
- [ ] T032 [P] [US2] Create proper formatting for task display including status indicators (✓/✗)
- [ ] T033 [US2] Test: Create test_list_tasks_empty in tests/unit/test_core.py to verify empty list handling
- [ ] T034 [US2] Test: Create test_list_tasks_multiple in tests/unit/test_core.py to verify multi-task rendering
- [ ] T035 [US2] Test: Create integration test for list command in tests/integration/test_cli.py

### Acceptance Tests
- [ ] T036 [US2] Verify empty task list shows appropriate message when using `todo list`
- [ ] T037 [US2] Verify multiple tasks display with correct ID, title, status indicators when using `todo list`
- [ ] T038 [US2] Verify completed tasks show checkmark and pending tasks show X

## Phase 5: [US5] Toggle Task Completion Status (Priority: P1)

### Goal
Enable users to mark tasks as completed or uncompleted to track progress.

### Independent Test Criteria
Can run `todo done 1` on a pending task and `todo undone 2` on a completed task, verifying status changes.

### Implementation Tasks
- [ ] T040 [P] [US5] Implement toggle_task_status function in src/todo/core.py that flips completion status
- [ ] T041 [P] [US5] Implement done command in src/todo/cli.py that marks task as completed
- [ ] T042 [P] [US5] Implement undone command in src/todo/cli.py that marks task as uncompleted
- [ ] T043 [P] [US5] Add proper error handling for non-existent task IDs in toggle operations
- [ ] T044 [US5] Test: Create test_toggle_status_success in tests/unit/test_core.py to verify status flipping
- [ ] T045 [US5] Test: Create test_toggle_status_nonexistent in tests/unit/test_core.py to verify error handling
- [ ] T046 [US5] Test: Create integration tests for done/undone commands in tests/integration/test_cli.py

### Acceptance Tests
- [ ] T047 [US5] Verify pending task changes to completed when using `todo done <id>`
- [ ] T048 [US5] Verify completed task changes back to pending when using `todo undone <id>`
- [ ] T049 [US5] Verify error returned when toggling status of non-existent task

## Phase 6: [US3] Update Task Details (Priority: P2)

### Goal
Enable users to update existing tasks by modifying title, description, or other properties.

### Independent Test Criteria
Can add a task and then update it with `todo update 1 --title "New title"`, verifying that the task details are updated.

### Implementation Tasks
- [ ] T050 [P] [US3] Implement update_task function in src/todo/core.py that allows partial updates
- [ ] T051 [P] [US3] Implement update command in src/todo/cli.py with optional title and description parameters
- [ ] T052 [P] [US3] Ensure immutable fields (ID, created_at) are protected from updates
- [ ] T053 [P] [US3] Add proper error handling for non-existent task IDs in update operations
- [ ] T054 [US3] Test: Create test_update_task_success in tests/unit/test_core.py to verify partial updates
- [ ] T055 [US3] Test: Create test_update_task_invalid_id in tests/unit/test_core.py to verify error handling
- [ ] T056 [US3] Test: Create integration test for update command in tests/integration/test_cli.py

### Acceptance Tests
- [ ] T057 [US3] Verify task properties can be updated individually without affecting others
- [ ] T058 [US3] Verify error returned when trying to update non-existent task
- [ ] T059 [US3] Verify immutable fields remain unchanged during updates

## Phase 7: [US4] Delete Tasks (Priority: P2)

### Goal
Enable users to delete tasks from the list for maintenance and organization.

### Independent Test Criteria
Can add tasks and then delete one with `todo delete 2`, verifying that the task is removed.

### Implementation Tasks
- [ ] T060 [P] [US4] Implement delete_task function in src/todo/core.py that removes task by ID
- [ ] T061 [P] [US4] Implement delete command in src/todo/cli.py that accepts task ID
- [ ] T062 [P] [US4] Add soft confirmation prompt for delete operations to prevent accidental removal
- [ ] T063 [P] [US4] Add proper error handling for non-existent task IDs in delete operations
- [ ] T064 [US4] Test: Create test_delete_task_success in tests/unit/test_core.py to verify proper deletion
- [ ] T065 [US4] Test: Create test_delete_task_invalid_id in tests/unit/test_core.py to verify error handling
- [ ] T066 [US4] Test: Create integration test for delete command in tests/integration/test_cli.py

### Acceptance Tests
- [ ] T067 [US4] Verify task is removed from list when using `todo delete <id>`
- [ ] T068 [US4] Verify error returned when trying to delete non-existent task
- [ ] T069 [US4] Verify other tasks remain unaffected after one is deleted

## Phase 8: Polish & Cross-Cutting Concerns

- [ ] T070 Implement proper error messages for all CLI commands that follow the specification requirements
- [ ] T071 Add support for Unicode characters in task titles and descriptions
- [ ] T072 Improve CLI help messages and usage documentation
- [ ] T073 Add type hints throughout the codebase following Python 3.13+ features
- [ ] T074 Create comprehensive test suite that achieves ≥95% branch coverage for core.py and ≥90% statement coverage for storage.py
- [ ] T075 Test: Run full test suite with coverage report using `pytest --cov=src --cov-report=term-missing`
- [ ] T076 Implement __main__.py entry point to allow running the application with `python -m todo`
- [ ] T077 Update README.md with installation and usage instructions
- [ ] T078 Test all edge cases: empty repositories, large number of tasks (100+), invalid inputs, Unicode characters

## Dependencies

- User Story 1 (Add) must be completed before User Story 2 (View) and User Story 5 (Toggle)
- User Story 2 (View) and User Story 5 (Toggle) must be completed before User Story 3 (Update) and User Story 4 (Delete)
- User Story 3 (Update) and User Story 4 (Delete) can be implemented in parallel after dependencies

## Parallel Execution Opportunities

- T010-T013: Core models and repository can be developed in parallel (different files)
- T020-T022: US1 implementation tasks can be worked on simultaneously with US2 preparation
- T030-T032: US2 implementation can proceed in parallel with US5 preparation
- T050-T053: US3 implementation can proceed in parallel with US4 implementation (T060-T063)
- T023-T025, T033-T035, T044-T046: Unit tests for different user stories can be written in parallel

## MVP Scope

MVP includes User Story 1 (Add New Tasks) and basic functionality from User Story 2 (View Tasks) to allow creation and viewing of tasks. This delivers immediate value with core functionality working.