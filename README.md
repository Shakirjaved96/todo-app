# Todo CLI Application

A production-grade in-memory Todo CLI application built with Python 3.13+ and Typer.

## Features

- Add new tasks with titles and optional descriptions
- View all tasks with status indicators
- Update existing tasks
- Delete tasks
- Mark tasks as complete/incomplete

## Prerequisites

- Python 3.13+
- UV package manager

## Installation

1. Clone the repository
2. Install dependencies:
```bash
uv sync
```

Or install in development mode:
```bash
uv pip install -e .
```

## Usage

### Add a new task
```bash
todo add "Task title" "Optional description"
```

### List all tasks
```bash
todo list
```

### Update a task
```bash
todo update 1 --title "New title" --description "New description"
```

### Delete a task
```bash
todo delete 1
```

### Mark task as completed
```bash
todo done 1
```

### Mark task as incomplete
```bash
todo undone 1
```

## Development

### Running tests
```bash
uv run pytest
```

### Running tests with coverage
```bash
uv run pytest --cov=src --cov-report=term-missing
```

### Running the CLI directly
```bash
uv run python -m todo.cli
```

### Running with python -m
```bash
python -m todo
```

## Project Structure
- `src/todo/core.py` - Core business logic and Task entity
- `src/todo/storage.py` - In-memory repository implementation
- `src/todo/cli.py` - CLI interface using Typer
- `src/todo/__main__.py` - Entry point for `python -m todo`
- `tests/unit/` - Unit tests for business logic
- `tests/integration/` - Integration tests for CLI