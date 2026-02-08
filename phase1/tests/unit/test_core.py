import pytest
from datetime import datetime
from src.todo.core import Task, add_task, list_tasks, toggle_task_status, update_task


class TestTask:
    """Test cases for the Task data class."""
    
    def test_task_creation_valid(self):
        """Test creating a valid task with all fields."""
        task = Task(
            id=1,
            title="Test task",
            description="Test description",
            completed=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        assert task.id == 1
        assert task.title == "Test task"
        assert task.description == "Test description"
        assert task.completed is False
    
    def test_task_validation_empty_title(self):
        """Test that creating a task with empty title raises ValueError."""
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            Task(
                id=1,
                title="",
                description="Test description",
                completed=False,
                _validate=True
            )
    
    def test_task_validation_whitespace_only_title(self):
        """Test that creating a task with whitespace-only title raises ValueError."""
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            Task(
                id=1,
                title="   ",
                description="Test description",
                completed=False,
                _validate=True
            )


class TestAddTask:
    """Test cases for the add_task function."""
    
    def test_add_task_success(self):
        """Test adding a task with valid title and description."""
        title = "Buy groceries"
        description = "Milk and bread"
        
        task = add_task(title, description)
        
        assert task.title == title
        assert task.description == description
        assert task.completed is False
    
    def test_add_task_without_description(self):
        """Test adding a task with only a title."""
        title = "Clean house"
        
        task = add_task(title)
        
        assert task.title == title
        assert task.description is None
        assert task.completed is False
    
    def test_add_task_empty_title(self):
        """Test that adding a task with empty title raises ValueError."""
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            add_task("")
    
    def test_add_task_whitespace_only_title(self):
        """Test that adding a task with whitespace-only title raises ValueError."""
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            add_task("   ")


class TestListTasks:
    """Test cases for the list_tasks function."""
    
    def test_list_tasks_empty(self):
        """Test listing tasks when the list is empty."""
        from src.todo.storage import InMemoryRepository
        repo = InMemoryRepository()
        result = list_tasks(repo)
        
        assert result == []
    
    def test_list_tasks_single(self):
        """Test listing tasks when there's a single task."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Test task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        repo = InMemoryRepository()
        repo._tasks[1] = task
        result = list_tasks(repo)
        
        assert result == [task]
        assert len(result) == 1
    
    def test_list_tasks_multiple_sorted_by_id(self):
        """Test listing tasks when there are multiple tasks, sorted by ID."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task1 = Task(
            id=2,
            title="Second task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        task2 = Task(
            id=1,
            title="First task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        task3 = Task(
            id=3,
            title="Third task",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        repo = InMemoryRepository()
        repo._tasks[2] = task1
        repo._tasks[1] = task2
        repo._tasks[3] = task3
        result = list_tasks(repo)
        
        assert len(result) == 3
        assert result[0].id == 1
        assert result[1].id == 2
        assert result[2].id == 3


class TestToggleTaskStatus:
    """Test cases for the toggle_task_status function."""
    
    def test_toggle_status_from_pending_to_completed(self):
        """Test toggling status from pending to completed."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Test task",
            completed=False,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        original_updated_at = task.updated_at
        toggled_task = toggle_task_status(1, repo)
        
        assert toggled_task is not None
        assert toggled_task.completed is True
        assert toggled_task.updated_at >= original_updated_at
    
    def test_toggle_status_from_completed_to_pending(self):
        """Test toggling status from completed to pending."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Test task",
            completed=True,
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        original_updated_at = task.updated_at
        toggled_task = toggle_task_status(1, repo)
        
        assert toggled_task is not None
        assert toggled_task.completed is False
        assert toggled_task.updated_at >= original_updated_at


class TestUpdateTask:
    """Test cases for the update_task function."""
    
    def test_update_task_title_and_description(self):
        """Test updating both title and description."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Original title",
            description="Original description",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        original_created_at = task.created_at
        original_updated_at = task.updated_at
        
        updated_task = update_task(1, title="New title", description="New description", repo=repo)
        
        assert updated_task is not None
        assert updated_task.title == "New title"
        assert updated_task.description == "New description"
        assert updated_task.created_at == original_created_at  # Should remain unchanged
        assert updated_task.updated_at >= original_updated_at  # Should be updated (or same due to timing precision)
    
    def test_update_task_partial_updates(self):
        """Test updating only title or only description."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Original title",
            description="Original description",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        # Update only title
        original_desc = task.description
        original_created_at = task.created_at
        original_updated_at = task.updated_at
        
        updated_task = update_task(1, title="New title", repo=repo)
        
        assert updated_task is not None
        assert updated_task.title == "New title"
        assert updated_task.description == original_desc  # Should remain unchanged
        assert updated_task.created_at == original_created_at  # Should remain unchanged
        assert updated_task.updated_at >= original_updated_at  # Should be updated (or same due to timing precision)
        
        # Reset and update only description
        task2 = Task(
            id=2,
            title="Original title",
            description="Original description",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        original_title = task2.title
        original_created_at2 = task2.created_at
        original_updated_at2 = task2.updated_at
        
        updated_task2 = update_task(task2, description="New description")
        
        assert updated_task2.title == original_title  # Should remain unchanged
        assert updated_task2.description == "New description"
        assert updated_task2.created_at == original_created_at2  # Should remain unchanged
        assert updated_task2.updated_at > original_updated_at2  # Should be updated
    
    def test_update_task_empty_title_error(self):
        """Test that updating with empty title raises ValueError."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Original title",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            update_task(1, title="", repo=repo)
    
    def test_update_task_whitespace_only_title_error(self):
        """Test that updating with whitespace-only title raises ValueError."""
        from datetime import datetime
        from src.todo.storage import InMemoryRepository
        task = Task(
            id=1,
            title="Original title",
            created_at=datetime.now(),
            updated_at=datetime.now()
        )
        
        repo = InMemoryRepository()
        repo._tasks[1] = task
        
        with pytest.raises(ValueError, match="Title cannot be empty or whitespace-only"):
            update_task(1, title="   ", repo=repo)