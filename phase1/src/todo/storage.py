import json
import os
from typing import Dict, List, Optional, Any
from datetime import datetime


class InMemoryRepository:
    """
    Implements an in-memory repository for Task entities with file-based persistence.
    """
    
    _shared_instance = None

    def __init__(self, file_path: str = "todo_data.json"):
        self.file_path = file_path
        self._tasks: Dict[int, dict] = {}  # Store as dict to avoid circular import
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
                    # Store as dict representation
                    self._tasks[task_dict['id']] = task_dict

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
            # Save the dict representations
            data = {
                'tasks': list(self._tasks.values())
            }

            with open(self.file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, ensure_ascii=False, indent=2)
        except Exception as e:
            print(f"Warning: Could not save data to {self.file_path}: {e}")

    def add_task(self, task: dict) -> dict:
        """
        Adds a task to the repository.

        Args:
            task: Task to add (as dict)

        Returns:
            dict: The added task
        """
        self._tasks[task['id']] = task
        # Update next_id if needed
        if task['id'] >= self._next_id:
            self._next_id = task['id'] + 1
        
        # Save to file after adding
        self.save_to_file()
        
        return task

    def get_task(self, task_id: int) -> Optional[dict]:
        """
        Retrieves a task by its ID.

        Args:
            task_id: Task identifier

        Returns:
            dict: The task with the given ID, or None if not found
        """
        return self._tasks.get(task_id)

    def get_all_tasks(self) -> List[dict]:
        """
        Returns all tasks sorted by ID.

        Returns:
            List[dict]: All tasks in the repository sorted by ID
        """
        return sorted(self._tasks.values(), key=lambda x: x['id'])

    def update_task(self, task: dict) -> Optional[dict]:
        """
        Updates an existing task.

        Args:
            task: Task with updated values (as dict)

        Returns:
            dict: The updated task, or None if task doesn't exist
        """
        if task['id'] not in self._tasks:
            return None

        self._tasks[task['id']] = task

        # Save to file after updating
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

    def get_next_id(self) -> int:
        """
        Gets the next available ID for a new task.

        Returns:
            int: The next available ID
        """
        next_id = self._next_id
        self._next_id += 1
        return next_id

    @classmethod
    def get_shared_instance(cls):
        """
        Gets a shared instance of the repository (singleton pattern).

        Returns:
            InMemoryRepository: Shared instance of the repository
        """
        if cls._shared_instance is None:
            cls._shared_instance = cls()
        return cls._shared_instance