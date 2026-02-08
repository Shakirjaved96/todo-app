def sanitize_input(text):
    """Sanitize input text by stripping whitespace."""
    if text is None:
        return None
    return str(text).strip() if text else None