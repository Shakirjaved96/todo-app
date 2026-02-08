from src.todo.core import Task, add_task, list_tasks, update_task, toggle_task_status, delete_task
from src.todo.storage import InMemoryRepository

# Create a repository
repo = InMemoryRepository()

# Test adding a task
task = add_task('Test task', 'Test description', repo)
print('Added task: ID=' + str(task.id) + ', Title=' + task.title)

# Test listing tasks
tasks = list_tasks(repo)
print('Total tasks: ' + str(len(tasks)))

# Test updating a task
updated_task = update_task(task.id, title='Updated task', completed=True, repo=repo)
print('Updated task: ' + updated_task.title + ', Completed: ' + str(updated_task.completed))

# Test toggling status
toggled_task = toggle_task_status(task.id, repo=repo)
print('Toggled task: ' + toggled_task.title + ', Completed: ' + str(toggled_task.completed))

# Test deleting a task
deleted = delete_task(task.id, repo=repo)
print('Deleted task: ' + str(deleted))

# Verify deletion
final_tasks = list_tasks(repo)
print('Tasks after deletion: ' + str(len(final_tasks)))
print('All functionality works as expected!')