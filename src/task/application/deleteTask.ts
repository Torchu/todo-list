import { TaskId } from "../domain/types";
import TaskRepository from "../infrastructure/TaskRepository.interface";

/**
 * Deletes the given task.
 * 
 * @param repository Repository in which the task will be deleted.
 * @param id ID of the task to delete.
 */
function deleteTask(repository: TaskRepository, id: TaskId): void {
    repository.delete(id);
}

export default deleteTask;