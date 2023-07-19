import { TaskId, TaskStatus } from "../domain/types";

/**
 * Represents a Task in the JSON persistance layer.
 */
interface TaskModel {
    id: TaskId;
    title: string;
    description: string;
    dueDate: string;
    status: TaskStatus;
}

export default TaskModel;