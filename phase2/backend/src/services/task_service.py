from typing import List, Optional
from src.models.task import Task, TaskCreate, TaskUpdate


class TaskService:
    def __init__(self):
        self.tasks = []
        self.next_id = 1
    
    def create_task(self, task_create: TaskCreate) -> Task:
        task = Task(
            id=self.next_id,
            title=task_create.title,
            description=task_create.description,
            completed=task_create.completed,
            created_at=task_create.created_at if hasattr(task_create, 'created_at') else __import__('datetime').datetime.utcnow(),
            updated_at=__import__('datetime').datetime.utcnow()
        )
        self.tasks.append(task)
        self.next_id += 1
        return task
    
    def get_task(self, task_id: int) -> Optional[Task]:
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None
    
    def get_tasks(self, skip: int = 0, limit: int = 100) -> List[Task]:
        return self.tasks[skip:skip + limit]
    
    def update_task(self, task_id: int, task_update: TaskUpdate) -> Optional[Task]:
        for i, task in enumerate(self.tasks):
            if task.id == task_id:
                update_data = task_update.dict(exclude_unset=True)
                updated_task = task.copy(update=update_data)
                updated_task.updated_at = __import__('datetime').datetime.utcnow()
                self.tasks[i] = updated_task
                return updated_task
        return None
    
    def delete_task(self, task_id: int) -> bool:
        initial_length = len(self.tasks)
        self.tasks = [task for task in self.tasks if task.id != task_id]
        return len(self.tasks) != initial_length