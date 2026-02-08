import json
import os
from dataclasses import dataclass, asdict
from datetime import datetime
from typing import List, Optional


@dataclass
class Task:
    """
    Represents a single todo item with properties as defined in the canonical TodoTask v1.0 data model.

    Fields:
    - id: Unique identifier, auto-incremented upon creation (immutable)
    - title: Required string representing the task title (required, non-empty)
    - description: Optional string providing additional details about the task (nullable)
    - is_completed: Boolean indicating completion status (default: False)
    - created_at: Timestamp of task creation (immutable after creation)
    - updated_at: Timestamp of last modification (updated on any change)
    """
    id: int
    title: str
    description: Optional[str] = None
    is_completed: bool = False
    created_at: str = None  # Changed from datetime to str for JSON serialization
    updated_at: str = None  # Changed from datetime to str for JSON serialization

    def __post_init__(self):
        """Set timestamps after object creation."""
        if self.created_at is None:
            self.created_at = datetime.now().isoformat()
        if self.updated_at is None:
            self.updated_at = datetime.now().isoformat()

    def to_dict(self):
        """Convert Task to dictionary for JSON serialization."""
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'is_completed': self.is_completed,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

    @classmethod
    def from_dict(cls, data):
        """Create Task from dictionary loaded from JSON."""
        return cls(
            id=data['id'],
            title=data['title'],
            description=data.get('description'),
            is_completed=data.get('is_completed', False),
            created_at=data['created_at'],
            updated_at=data['created_at'] if 'updated_at' not in data else data['updated_at']
        )


class TaskStore:
    """
    Implements the TaskStore interface managing collection of Task entities
    with file-based storage mechanism for persistence between runs.
    """

    def __init__(self, file_path: str = "todo_data.json"):
        self.file_path = file_path
        self._tasks = {}
        self._next_id = 1
        self.load_from_file()

    def load_from_file(self):
        """Load tasks from the JSON file if it exists."""
        if os.path.exists(self.file_path):
            try:
                with open(self.file_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                
                # Load tasks
                for task_dict in data.get('tasks', []):
                    task = Task.from_dict(task_dict)
                    self._tasks[task.id] = task
                
                # Set next_id to max ID + 1
                if self._tasks:
                    self._next_id = max(self._tasks.keys()) + 1
                else:
                    self._next_id = 1
            except Exception as e:
                print(f"Warning: Could not load data from {self.file_path}: {e}")
                # Initialize with empty data if loading failed
                self._tasks = {}
                self._next_id = 1
        else:
            # File doesn't exist, initialize empty
            self._tasks = {}
            self._next_id = 1

    def save_to_file(self):
        """Save tasks to the JSON file."""
        try:
            # Convert tasks to dictionaries for JSON serialization
            tasks_list = [task.to_dict() for task in self._tasks.values()]
            
            data = {
                'tasks': tasks_list
            }
            
            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Warning: Could not save data to {self.file_path}: {e}")

    def add_task(self, title: str, description: Optional[str] = None) -> Task:
        """
        Creates and adds a new task with auto-assigned ID and current timestamp.

        Args:
            title: Required task title
            description: Optional task description

        Returns:
            Task: The added task with assigned ID

        Raises:
            ValueError: If title is empty or whitespace-only
        """
        if not title or not title.strip():
            raise ValueError("Title must not be empty or whitespace-only")

        task = Task(
            id=self._next_id,
            title=title,
            description=description
        )
        self._tasks[self._next_id] = task
        self._next_id += 1
        
        # Save to file after adding
        self.save_to_file()
        
        return task

    def get_task(self, task_id: int) -> Optional[Task]:
        """
        Retrieves a task by its ID.

        Args:
            task_id: Task identifier

        Returns:
            Task: The task with the given ID, or None if not found
        """
        return self._tasks.get(task_id)

    def get_all_tasks(self) -> List[Task]:
        """
        Returns all tasks sorted by ID.

        Returns:
            List[Task]: All tasks in the repository sorted by ID
        """
        return sorted(self._tasks.values(), key=lambda x: x.id)

    def update_task(self, task_id: int, title: Optional[str] = None, description: Optional[str] = None) -> Optional[Task]:
        """
        Updates an existing task with new values.

        Args:
            task_id: ID of the task to update
            title: New title value (optional)
            description: New description value (optional)

        Returns:
            Task: The updated task, or None if task doesn't exist
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None

        if title is not None:
            if not title or not title.strip():
                raise ValueError("Title must not be empty or whitespace-only")
            task.title = title

        if description is not None:
            task.description = description

        # Update the timestamp
        task.updated_at = datetime.now().isoformat()

        # Save to file after updating
        self.save_to_file()

        return task

    def mark_complete(self, task_id: int) -> Optional[Task]:
        """
        Marks a task as complete.

        Args:
            task_id: ID of the task to mark complete

        Returns:
            Task: The updated task, or None if task doesn't exist
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None

        task.is_completed = True
        task.updated_at = datetime.now().isoformat()
        
        # Save to file after marking complete
        self.save_to_file()
        
        return task

    def mark_pending(self, task_id: int) -> Optional[Task]:
        """
        Marks a task as pending.

        Args:
            task_id: ID of the task to mark pending

        Returns:
            Task: The updated task, or None if task doesn't exist
        """
        task = self._tasks.get(task_id)
        if task is None:
            return None

        task.is_completed = False
        task.updated_at = datetime.now().isoformat()
        
        # Save to file after marking pending
        self.save_to_file()
        
        return task

    def delete_task(self, task_id: int) -> bool:
        """
        Removes a task by its ID.

        Args:
            task_id: Task identifier

        Returns:
            bool: True if task was deleted, False if not found
        """
        if task_id in self._tasks:
            del self._tasks[task_id]
            
            # Save to file after deletion
            self.save_to_file()
            
            return True
        return False