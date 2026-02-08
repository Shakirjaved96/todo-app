from typer.testing import CliRunner
from unittest.mock import patch
from src.todo.storage import InMemoryRepository
from src.todo.cli import app

def debug_test():
    runner = CliRunner()
    test_repo = InMemoryRepository()

    print("Testing first command...")
    result = runner.invoke(app, ['add', 'Test task'])
    print(f"Exit code: {result.exit_code}")
    print(f"Output: {repr(result.output)}")
    print(f"Exception info: {result.exc_info}")

    print("\nTesting second command...")
    with patch('src.todo.cli.get_repo', return_value=test_repo):
        result = runner.invoke(app, ['add', 'Test task 2', 'With description'])
        print(f"Exit code: {result.exit_code}")
        print(f"Output: {repr(result.output)}")
        print(f"Exception info: {result.exc_info}")

if __name__ == "__main__":
    debug_test()