from dataclasses import dataclass
from datetime import datetime
from typing import Optional, List
from .storage import InMemoryRepository


@dataclass
class Task:
    """
    Represents a single todo item with properties as defined in the canonical TodoTask v1.0 data model.

    Fields:
    - id: Unique identifier, auto-incremented upon creation (immutable)
    - title: Required string representing the task title (required, non-empty)
    - description: Optional string providing additional details about the task (nullable)
    - completed: Boolean indicating completion status (default: False)
    - created_at: Timestamp of task creation (immutable after creation)
    - updated_at: Timestamp of last modification (updated on any change)
    """
    id: int
    title: str
    description: Optional[str] = None
    completed: bool = False
    created_at: datetime = None
    updated_at: datetime = None
    _validate: bool = True

    def __post_init__(self):
        """Validate and set timestamps after object creation."""
        if self._validate and (not self.title or not self.title.strip()):
            raise ValueError("Title cannot be empty or whitespace-only")
        
        if self.created_at is None:
            self.created_at = datetime.now()
        if self.updated_at is None:
            self.updated_at = datetime.now()

    def to_dict(self):
        """Convert Task to dictionary for storage."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }

    @classmethod
    def from_dict(cls, data):
        """Create Task from dictionary."""
        return cls(
            id=data['id'],
            title=data['title'],
            description=data.get('description'),
            completed=data.get('completed', False),
            created_at=datetime.fromisoformat(data['created_at']) if data.get('created_at') else None,
            updated_at=datetime.fromisoformat(data['updated_at']) if data.get('updated_at') else None,
            _validate=False  # Skip validation when loading from storage
        )


def add_task(title: str, description: Optional[str] = None, repo: InMemoryRepository = None) -> Task:
    """
    Creates and adds a new task with auto-assigned ID and current timestamp.

    Args:
        title: Required task title
        description: Optional task description
        repo: Repository to store the task (defaults to shared instance)

    Returns:
        Task: The added task with assigned ID

    Raises:
        ValueError: If title is empty or whitespace-only
    """
    if not title or not title.strip():
        raise ValueError("Title cannot be empty or whitespace-only")

    if repo is None:
        repo = InMemoryRepository.get_shared_instance()

    task_obj = Task(
        id=repo.get_next_id(),
        title=title,
        description=description
    )
    
    # Convert to dict for storage
    task_dict = task_obj.to_dict()
    repo.add_task(task_dict)
    
    return task_obj


def list_tasks(repo: InMemoryRepository = None) -> List[Task]:
    """
    Returns all tasks sorted by ID.

    Args:
        repo: Repository to retrieve tasks from (defaults to shared instance)

    Returns:
        List[Task]: All tasks in the repository sorted by ID
    """
    if repo is None:
        repo = InMemoryRepository.get_shared_instance()
    
    # Get tasks as dicts from repo and convert to Task objects
    task_dicts = repo.get_all_tasks()
    return [Task.from_dict(task_dict) for task_dict in task_dicts]


def toggle_task_status(task_id: int, repo: InMemoryRepository = None) -> Optional[Task]:
    """
    Toggles the completion status of a task.

    Args:
        task_id: ID of the task to toggle
        repo: Repository containing the task (defaults to shared instance)

    Returns:
        Task: The updated task, or None if task doesn't exist
    """
    if repo is None:
        repo = InMemoryRepository.get_shared_instance()
    
    task_dict = repo.get_task(task_id)
    if task_dict is None:
        return None
    
    # Update the dict
    task_dict['completed'] = not task_dict['completed']
    task_dict['updated_at'] = datetime.now().isoformat()
    
    # Update in repo
    repo.update_task(task_dict)
    
    # Return as Task object
    return Task.from_dict(task_dict)


def update_task(task_id: int, title: Optional[str] = None, description: Optional[str] = None, repo: InMemoryRepository = None) -> Optional[Task]:
    """
    Updates an existing task with new values.

    Args:
        task_id: ID of the task to update
        title: New title value (optional)
        description: New description value (optional)
        repo: Repository containing the task (defaults to shared instance)

    Returns:
        Task: The updated task, or None if task doesn't exist

    Raises:
        ValueError: If title is provided but is empty or whitespace-only
    """
    if title is not None and (not title or not title.strip()):
        raise ValueError("Title cannot be empty or whitespace-only")
    
    if repo is None:
        repo = InMemoryRepository.get_shared_instance()
    
    task_dict = repo.get_task(task_id)
    if task_dict is None:
        return None

    if title is not None:
        task_dict['title'] = title

    if description is not None:
        task_dict['description'] = description

    task_dict['updated_at'] = datetime.now().isoformat()
    
    repo.update_task(task_dict)

    return Task.from_dict(task_dict)