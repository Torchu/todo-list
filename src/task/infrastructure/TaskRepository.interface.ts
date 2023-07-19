import Task from "../domain/Task";

/**
 * Interface that represents a repository of tasks.
 */
interface TaskRepository {
    create(task: Task): Task;
}

export default TaskRepository;