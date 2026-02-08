import sys
import os
import pytest

# Add the src directory to the path to ensure we're using the local source
sys.path.insert(0, os.path.join(os.getcwd(), 'src'))

# Import from the local source
from todo.core import Task, add_task, list_tasks, toggle_task_status, update_task
from datetime import datetime

class TestAddTask:
    """Test cases for the add_task function."""

    def test_add_task_empty_title(self):
        """Test that adding a task with empty title raises ValueError."""
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            add_task("")

# Run the specific test
if __name__ == "__main__":
    test_instance = TestAddTask()
    test_instance.test_add_task_empty_title()
    print("Test passed!")