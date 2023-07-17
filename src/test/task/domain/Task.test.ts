import Task from '../../../task/domain/Task';
import {TaskStatus} from '../../../task/domain/types';

describe('Task domain model', () => {
  it('should create a task with a pending status', () => {
    const newTask = new Task('title', 'description', new Date());
    expect(newTask.status).toBe(TaskStatus.PENDING);
  });
});
