import {TaskId, TaskStatus} from "./types";

/**
 * Class that represents the task entity.
 */
class Task {
  constructor(
    public title: string,
    public description: string,
    public dueDate: Date,
    public status: TaskStatus,
    public id?: TaskId,
  ) {
  }
}

export default Task;
