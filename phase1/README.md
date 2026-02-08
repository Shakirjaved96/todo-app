# Todo CLI Application

A production-grade in-memory Todo CLI application built with Python 3.13+ and Typer.

## Features

- Add new tasks with titles and optional descriptions
- View all tasks with status indicators
- Update existing tasks
- Delete tasks
- Mark tasks as complete/incomplete

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
uv sync
```

## Usage

```bash
# Add a new task
todo add "Buy groceries" "Milk and bread"

# List all tasks
todo list

# Update a task
todo update 1 --title "New title"

# Mark a task as done
todo done 1

# Mark a task as undone
todo undone 1

# Delete a task
todo delete 1
```

## Development

```bash
# Run tests
uv run pytest

# Run tests with coverage
uv run pytest --cov=src --cov-report=term-missing
```