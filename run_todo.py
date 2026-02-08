from src.todo.cli import app

# Test the CLI functionality
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        # Pass command line arguments to the app
        app()
    else:
        # Show help if no args provided
        app(['--help'])