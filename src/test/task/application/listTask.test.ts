import fs from "fs";
import listTasks from "../../../task/application/listTasks";
import { TaskStatus } from "../../../task/domain/types";
import { createTestTask, persistanceCleanup } from "../../setup";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import { create } from "domain";

describe("List tasks use case", () => {
    afterEach(() => {
        persistanceCleanup('tasks.test.json');
    });

    it("should lists the corresponding tasks", () => {
        const filePath = "tasks.test.json";
        const newDate = new Date();
        createTestTask(filePath, newDate);

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