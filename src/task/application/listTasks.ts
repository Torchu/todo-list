import Task from "../domain/Task";
import TaskRepository from "../domain/TaskRepository.interface";

/**
 * List the tasks in the application.
 * 
 * @param repository Repository in which the tasks are.
 * 
 * @returns A list of Task objects.
 */
function listTasks(repository: TaskRepository): Task[] {
    return repository.list();
}

export default listTasks;