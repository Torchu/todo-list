import fs from "fs";
import Task from "../../../task/domain/Task";
import { TaskStatus } from "../../../task/domain/types";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import { persistanceCleanup } from "../../setup";

describe("TaskJsonRepository", () => {
    afterEach(() => {
        persistanceCleanup("./data/tasks.test.json");
    });

    it("should create a task and store it in a file", () => {
        const repository = new TaskJsonRepository("./data/tasks.test.json");
        const newDate = new Date();
        const task = new Task("Test", "Test description", newDate, TaskStatus.PENDING);
        const createdTask = repository.create(task);

        expect(createdTask).toMatchObject({
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.PENDING
        });

        const storedTasks = JSON.parse(fs.readFileSync("./data/tasks.test.json", "utf-8"));
        expect(storedTasks).toMatchObject([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate.toISOString(),
            status: TaskStatus.PENDING
        }]);
    });
});