import subprocess
import sys
from typer.testing import CliRunner
import pytest
from src.todo.cli import app


runner = CliRunner()


class TestCLIIntegration:
    """Integration tests for the CLI commands."""
    
    def test_add_command_success(self):
        """Test adding a task via CLI."""
        result = runner.invoke(app, ["add", "Test task", "--description", "Test description"])
        
        assert result.exit_code == 0
        assert "Added task with ID:" in result.stdout
    
    def test_add_command_empty_title_error(self):
        """Test that adding a task with empty title returns an error."""
        result = runner.invoke(app, ["add", ""])
        
        assert result.exit_code != 0
        assert "Error:" in result.stdout
    
    def test_list_command_empty(self):
        """Test listing tasks when there are no tasks."""
        result = runner.invoke(app, ["list"])
        
        assert result.exit_code == 0
        assert "No tasks found." in result.stdout
    
    def test_list_command_with_tasks(self):
        """Test listing tasks when there are tasks."""
        # First add a task
        add_result = runner.invoke(app, ["add", "Test task", "--description", "Test description"])
        assert add_result.exit_code == 0
        
        # Then list tasks
        list_result = runner.invoke(app, ["list"])
        
        assert list_result.exit_code == 0
        assert "Test task" in list_result.stdout
        assert "[✗]" in list_result.stdout  # Should show as not completed
    
    def test_update_command_success(self):
        """Test updating a task via CLI."""
        # First add a task
        add_result = runner.invoke(app, ["add", "Original title"])
        assert add_result.exit_code == 0
        # Extract the ID from the output
        output_lines = add_result.stdout.split('\n')
        task_line = [line for line in output_lines if "Added task with ID:" in line][0]
        task_id = int(task_line.split(': ')[1])
        
        # Then update the task
        update_result = runner.invoke(app, ["update", str(task_id), "--title", "Updated title"])
        
        assert update_result.exit_code == 0
        assert f"Updated task with ID: {task_id}" in update_result.stdout
    
    def test_update_command_invalid_id(self):
        """Test updating a non-existent task via CLI."""
        result = runner.invoke(app, ["update", "999", "--title", "Updated title"])
        
        assert result.exit_code == 0  # Command executes but reports error
        assert "Error: Task with ID 999 not found." in result.stdout
    
    def test_delete_command_success(self):
        """Test deleting a task via CLI."""
        # First add a task
        add_result = runner.invoke(app, ["add", "Test task to delete"])
        assert add_result.exit_code == 0
        # Extract the ID from the output
        output_lines = add_result.stdout.split('\n')
        task_line = [line for line in output_lines if "Added task with ID:" in line][0]
        task_id = int(task_line.split(': ')[1])
        
        # Mock the confirmation prompt to return True
        import unittest.mock
        with unittest.mock.patch('typer.confirm', return_value=True):
            delete_result = runner.invoke(app, ["delete", str(task_id)])
        
        assert delete_result.exit_code == 0
        assert f"Deleted task with ID: {task_id}" in delete_result.stdout
    
    def test_delete_command_invalid_id(self):
        """Test deleting a non-existent task via CLI."""
        import unittest.mock
        with unittest.mock.patch('typer.confirm', return_value=True):
            result = runner.invoke(app, ["delete", "999"])
        
        assert result.exit_code == 0  # Command executes but reports error
        assert "Error: Task with ID 999 not found." in result.stdout
    
    def test_done_command_success(self):
        """Test marking a task as done via CLI."""
        # First add a task
        add_result = runner.invoke(app, ["add", "Test task"])
        assert add_result.exit_code == 0
        # Extract the ID from the output
        output_lines = add_result.stdout.split('\n')
        task_line = [line for line in output_lines if "Added task with ID:" in line][0]
        task_id = int(task_line.split(': ')[1])
        
        # Mark as done
        done_result = runner.invoke(app, ["done", str(task_id)])
        
        assert done_result.exit_code == 0
        assert f"Marked task {task_id} as done." in done_result.stdout
    
    def test_done_command_invalid_id(self):
        """Test marking a non-existent task as done via CLI."""
        result = runner.invoke(app, ["done", "999"])
        
        assert result.exit_code == 0  # Command executes but reports error
        assert "Error: Task with ID 999 not found." in result.stdout
    
    def test_undone_command_success(self):
        """Test marking a task as undone via CLI."""
        # First add and complete a task
        add_result = runner.invoke(app, ["add", "Test task"])
        assert add_result.exit_code == 0
        # Extract the ID from the output
        output_lines = add_result.stdout.split('\n')
        task_line = [line for line in output_lines if "Added task with ID:" in line][0]
        task_id = int(task_line.split(': ')[1])
        
        # Mark as done first
        done_result = runner.invoke(app, ["done", str(task_id)])
        assert done_result.exit_code == 0
        
        # Then mark as undone
        undone_result = runner.invoke(app, ["undone", str(task_id)])
        
        assert undone_result.exit_code == 0
        assert f"Marked task {task_id} as undone." in undone_result.stdout
    
    def test_undone_command_invalid_id(self):
        """Test marking a non-existent task as undone via CLI."""
        result = runner.invoke(app, ["undone", "999"])
        
        assert result.exit_code == 0  # Command executes but reports error
        assert "Error: Task with ID 999 not found." in result.stdout