import {TaskStatus} from "./types";

class Task {
  // Id: number;
  status: TaskStatus;

  constructor(
    public title: string,
    public description: string,
    public dueDate: Date
  ) {
    this.status = TaskStatus.PENDING;
  }
}

export default Task;
