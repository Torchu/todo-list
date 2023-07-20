import Task from "../domain/Task";

/**
 * Interface that represents a repository of tasks.
 */
interface TaskRepository {
    create(task: Task): Task;
    update(id: number, task: Task): Task;
    list(): Task[];
    complete(id: number): Task;
}

export default TaskRepository;