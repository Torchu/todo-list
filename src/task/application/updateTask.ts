import Task from "../domain/Task";
import { TaskId } from "../domain/types";
import TaskRepository from "../domain/TaskRepository.interface";

/**
 * Updates a task with the given data.
 * 
 * @param repository Repository in which the task will be updated.
 * @param id ID of the task to update.
 * @param data Data of the task to update.
 */
function updateTask(
    repository: TaskRepository,
    id: TaskId,
    data: {title: string, description: string, dueDate: Date}
): Task {
    const newData = new Task(data.title, data.description, data.dueDate);
    return repository.update(id, newData);
}

export default updateTask;