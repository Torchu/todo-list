import Task from "./Task";

/**
 * Interface that represents a repository of tasks.
 */
interface TaskRepository {
    create(task: Task): Task;
    update(id: number, task: Task): Task;
    delete(id: number): void;
    list(): Task[];
    complete(id: number): Task;
}

export default TaskRepository;