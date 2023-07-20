import Task from "../domain/Task";
import TaskRepository from "../infrastructure/TaskRepository.interface";

/**
 * Creates a task with the given data.
 *
 * @param repository Repository in which the task will be created.
 * @param data Data of the task to create.
 *
 * @returns The created task.
 */
function createTask(
    repository: TaskRepository,
    data: {title: string, description: string, dueDate: Date}
): Task {
    const newTask = new Task(data.title, data.description, data.dueDate);
    return repository.create(newTask);
}

export default createTask;