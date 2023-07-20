import { createTestTask, persistanceCleanup } from "../../setup";
import deleteTask from "../../../task/application/deleteTask";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";

describe("Delete task use case", () => {
    const filePath = 'tasks.test.json';
    afterEach(() => {
        persistanceCleanup(filePath);
    });

    it("should delete the task with the given ID", () => {
        createTestTask(filePath, new Date());
        const repository = new TaskJsonRepository(filePath);
        deleteTask(repository, 1);

        const tasks = repository.list();
        expect(tasks).toHaveLength(0);
    });
});