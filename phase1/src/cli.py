import click
from typing import Optional
from todo.storage import InMemoryRepository
from todo.core import add_task, list_tasks, toggle_task_status, update_task

# Try to import sanitize_input, use passthrough if not available
try:
    from utils.input_sanitizer import sanitize_input
except ImportError:
    def sanitize_input(text):
        """Passthrough if sanitizer not available."""
        if text is None:
            return None
        return str(text).strip() if text else None

GLOBAL_REPO: Optional[InMemoryRepository] = None

def get_repo():
    global GLOBAL_REPO
    if GLOBAL_REPO is None:
        GLOBAL_REPO = InMemoryRepository.get_shared_instance()
    return GLOBAL_REPO

@click.group()
def cli():
    """A simple CLI for managing todo tasks."""
    pass

@cli.command()
@click.argument('title')
@click.argument('description', required=False)
def add(title: str, description: str):
    """Adds a new todo task."""
    try:
        sanitized_title = sanitize_input(title)
        sanitized_description = sanitize_input(description) if description else None
        task = add_task(sanitized_title, sanitized_description, get_repo())
        click.echo(f"Task added: {task.title} (ID: {task.id})")
    except ValueError as e:
        click.echo(f"Error: {e}", err=True)

@cli.command()
def list():
    """Lists all todo tasks."""
    tasks = list_tasks(get_repo())
    if not tasks:
        click.echo("No tasks found.")
        return

    # CLI-UX pattern for tabular output
    headers = ["ID", "Title", "Description", "Status"]
    data = []
    for task in tasks:
        status = "Complete" if task.completed else "Pending"
        description = task.description if task.description else "(No Description)"
        data.append([str(task.id), task.title, description, status])

    # Calculate column widths
    col_widths = [max(len(str(item)) for item in col) for col in zip(*([headers] + data))]

    # Print headers
    header_line = "    ".join(f"{header:<{col_widths[i]}}" for i, header in enumerate(headers))
    click.echo(header_line)
    click.echo("    ".join(['-' * width for width in col_widths]))

    # Print data
    for row in data:
        data_line = "    ".join(f"{item:<{col_widths[i]}}" for i, item in enumerate(row))
        click.echo(data_line)

@cli.command()
@click.argument('task_id', type=int)
def complete(task_id: int):
    """Marks a task as complete."""
    task = toggle_task_status(task_id, get_repo())
    if task:
        click.echo(f"Task {task_id} marked as complete.")
    else:
        click.echo(f"Error: Task with ID {task_id} not found.", err=True)

@cli.command()
@click.argument('task_id', type=int)
def uncomplete(task_id: int):
    """Marks a task as pending."""
    task = toggle_task_status(task_id, get_repo())
    if task:
        click.echo(f"Task {task_id} marked as pending.")
    else:
        click.echo(f"Error: Task with ID {task_id} not found.", err=True)

@cli.command()
@click.argument('task_id', type=int)
@click.option('--title', '-t', help='New title for the task')
@click.option('--description', '-d', help='New description for the task')
def update(task_id: int, title: str, description: str):
    """Updates an existing task's title or description."""
    if not title and not description:
        click.echo("Error: Missing arguments for update. Provide --title or --description.", err=True)
        return

    try:
        sanitized_title = sanitize_input(title) if title else None
        sanitized_description = sanitize_input(description) if description else None
        task = update_task(task_id, sanitized_title, sanitized_description, get_repo())
        if task:
            click.echo(f"Task {task_id} updated.")
        else:
            click.echo(f"Error: Task with ID {task_id} not found.", err=True)
    except ValueError as e:
        click.echo(f"Error: {e}", err=True)

@cli.command()
@click.argument('task_id', type=int)
def delete(task_id: int):
    """Deletes a task."""
    repo = get_repo()
    deleted = repo.delete_task(task_id)
    if deleted:
        click.echo(f"Task {task_id} deleted.")
    else:
        click.echo(f"Error: Task with ID {task_id} not found.", err=True)

if __name__ == '__main__':
    cli()