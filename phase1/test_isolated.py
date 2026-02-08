#!/usr/bin/env python3
"""
Test script to run the unit tests with the correct module path.
"""

import sys
import os

# Add the src directory to the beginning of the Python path
src_path = os.path.join(os.path.dirname(__file__), 'src')
sys.path.insert(0, src_path)

# Remove any existing todo package from sys.modules to force reload
modules_to_remove = [key for key in sys.modules.keys() if key.startswith('todo')]
for mod in modules_to_remove:
    del sys.modules[mod]

# Now run the specific test
def test_add_task_empty_title():
    """Test that adding a task with empty title raises ValueError."""
    from src.todo.core import add_task
    import pytest
    
    try:
        add_task("")
        assert False, "Expected ValueError but none was raised"
    except ValueError as e:
        expected_msg = "Title cannot be empty or whitespace-only"
        actual_msg = str(e)
        assert expected_msg in actual_msg, f"Expected '{expected_msg}' in error message, but got '{actual_msg}'"
        print(f"SUCCESS: Got expected error message: {actual_msg}")

if __name__ == "__main__":
    test_add_task_empty_title()
    print("Test passed!")