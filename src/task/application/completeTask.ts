import { TaskId } from "../domain/types";
import TaskRepository from "../infrastructure/TaskRepository.interface";

/**
 * Completes the task with the given ID
 * 
 * @param repository The repository to use
 * @param id The ID of the task to complete
 * 
 * @returns The completed task
 */
function completeTask(repository: TaskRepository, id: TaskId) {
    return repository.complete(id);
}

export default completeTask;