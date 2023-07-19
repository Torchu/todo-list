import fs from "fs";
import listTasks from "../../../task/application/listTasks";
import { TaskStatus } from "../../../task/domain/types";
import { persistanceCleanup } from "../../setup";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";

describe("List tasks use case", () => {
    afterEach(() => {
        persistanceCleanup('./data/tasks.test.json');
    });

    it("should lists the corresponding tasks", () => {
        const filePath = "./data/tasks.test.json";
        const newDate = new Date();
        fs.writeFileSync(filePath, JSON.stringify([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate.toISOString(),
            status: TaskStatus.PENDING
        }]));

        const tasks = listTasks(new TaskJsonRepository(filePath));

        expect(tasks).toMatchObject([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.PENDING
        }]);
    });
});