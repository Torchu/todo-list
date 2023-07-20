import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import completeTask from "../../../task/application/completeTask";
import { createTestTask, persistanceCleanup } from "../../setup";
import { TaskStatus } from "../../../task/domain/types";

describe("Complete task use case", () => {
    const filePath = './data/tasks.test.json';
    afterEach(() => {
        persistanceCleanup(filePath);
    });
    
    it("should complete the task with the given ID", () => {
        const newDate = new Date();
        createTestTask(filePath, newDate);

        const task = completeTask(new TaskJsonRepository(filePath), 1);
        expect(task).toMatchObject({
            id: 1,
            title: 'Test',
            description: 'Test description',
            dueDate: newDate,
            status: TaskStatus.COMPLETED
        });
    });
});