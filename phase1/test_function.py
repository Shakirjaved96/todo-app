import sys
import os
# Add the src directory to the path
sys.path.insert(0, os.path.join(os.getcwd(), 'src'))

from todo.core import add_task

print("Testing add_task function...")
try:
    result = add_task('')
    print('ERROR: Expected exception but got result:', result)
except ValueError as e:
    print('Got expected ValueError:', repr(str(e)))
    expected = 'Title cannot be empty or whitespace-only'
    if str(e) == expected:
        print('SUCCESS: Error message is correct')
    else:
        print('FAILURE: Error message is wrong')
        print('Expected:', repr(expected))
except Exception as e:
    print('Got unexpected exception:', type(e).__name__, str(e))

# Also test the function signature
import inspect
print("Function signature:", inspect.signature(add_task))