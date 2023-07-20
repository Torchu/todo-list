import updateTask from "../../../task/application/updateTask";
import { TaskStatus } from "../../../task/domain/types";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import { createTestTask, persistanceCleanup } from "../../setup";

describe("Update task use case", () => {
    const filePath = './data/tasks.test.json';
    afterEach(() => {
        persistanceCleanup(filePath);
    });

    it("should correclty update a task", () => {
        const newDate = new Date();
        createTestTask(filePath, newDate);

        const newTask = updateTask(
            new TaskJsonRepository(filePath),
            1,
            {title: 'Updated', description: 'Test description', dueDate: newDate}
        );
        expect(newTask).toMatchObject({
            id: 1,
            title: 'Updated',
            description: 'Test description',
            dueDate: newDate,
            status: TaskStatus.PENDING
        });
    });
});