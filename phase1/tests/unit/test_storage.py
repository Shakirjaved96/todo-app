import pytest
from datetime import datetime
from src.todo.storage import InMemoryRepository
from src.todo.core import Task


class TestInMemoryRepository:
    """Test cases for the InMemoryRepository class."""
    
    def test_add_task(self):
        """Test adding a task to the repository."""
        repo = InMemoryRepository()
        task_data = Task(
            id=0,  # Will be assigned by repository
            title="Test task",
            description="Test description",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        added_task = repo.add(task_data)
        
        assert added_task.id == 1  # First task should get ID 1
        assert added_task.title == "Test task"
        assert added_task.description == "Test description"
        assert repo.get(added_task.id) is not None
    
    def test_get_existing_task(self):
        """Test retrieving an existing task by ID."""
        repo = InMemoryRepository()
        task_data = Task(
            id=0,
            title="Test task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        added_task = repo.add(task_data)
        
        retrieved_task = repo.get(added_task.id)
        
        assert retrieved_task is not None
        assert retrieved_task.id == added_task.id
        assert retrieved_task.title == added_task.title
    
    def test_get_nonexistent_task(self):
        """Test retrieving a non-existent task by ID."""
        repo = InMemoryRepository()
        
        retrieved_task = repo.get(999)
        
        assert retrieved_task is None
    
    def test_list_tasks_empty(self):
        """Test listing tasks when the repository is empty."""
        repo = InMemoryRepository()
        
        tasks = repo.list()
        
        assert tasks == []
    
    def test_list_tasks_multiple(self):
        """Test listing multiple tasks."""
        repo = InMemoryRepository()
        
        # Add multiple tasks
        task1_data = Task(
            id=0,
            title="First task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        task2_data = Task(
            id=0,
            title="Second task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        task3_data = Task(
            id=0,
            title="Third task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        task1 = repo.add(task1_data)
        task2 = repo.add(task2_data)
        task3 = repo.add(task3_data)
        
        tasks = repo.list()
        
        assert len(tasks) == 3
        # Tasks should be sorted by ID
        assert tasks[0].id == task1.id
        assert tasks[1].id == task2.id
        assert tasks[2].id == task3.id
    
    def test_update_existing_task(self):
        """Test updating an existing task."""
        repo = InMemoryRepository()
        task_data = Task(
            id=0,
            title="Original title",
            description="Original description",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        added_task = repo.add(task_data)
        
        # Update the task
        updates = {
            'title': 'Updated title',
            'description': 'Updated description'
        }
        updated_task = repo.update(added_task.id, updates)
        
        assert updated_task is not None
        assert updated_task.title == 'Updated title'
        assert updated_task.description == 'Updated description'
    
    def test_update_nonexistent_task(self):
        """Test updating a non-existent task."""
        repo = InMemoryRepository()
        
        updates = {
            'title': 'Updated title'
        }
        result = repo.update(999, updates)
        
        assert result is None
    
    def test_delete_existing_task(self):
        """Test deleting an existing task."""
        repo = InMemoryRepository()
        task_data = Task(
            id=0,
            title="Test task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        added_task = repo.add(task_data)
        
        # Verify task exists before deletion
        assert repo.get(added_task.id) is not None
        
        # Delete the task
        deleted = repo.delete(added_task.id)
        
        assert deleted is True
        assert repo.get(added_task.id) is None
    
    def test_delete_nonexistent_task(self):
        """Test deleting a non-existent task."""
        repo = InMemoryRepository()
        
        deleted = repo.delete(999)
        
        assert deleted is False
    
    def test_toggle_status_existing_task(self):
        """Test toggling status of an existing task."""
        repo = InMemoryRepository()
        task_data = Task(
            id=0,
            title="Test task",
            completed=False,  # Initially pending
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        added_task = repo.add(task_data)
        
        # Toggle status (should become completed)
        toggled_task = repo.toggle_status(added_task.id)
        
        assert toggled_task is not None
        assert toggled_task.completed is True
        
        # Toggle again (should become pending)
        toggled_again_task = repo.toggle_status(added_task.id)
        
        assert toggled_again_task is not None
        assert toggled_again_task.completed is False
    
    def test_toggle_status_nonexistent_task(self):
        """Test toggling status of a non-existent task."""
        repo = InMemoryRepository()
        
        result = repo.toggle_status(999)
        
        assert result is None