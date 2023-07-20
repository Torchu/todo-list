import fs from "fs";
import Task from "../../../task/domain/Task";
import { TaskStatus } from "../../../task/domain/types";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import { createTestTask, persistanceCleanup } from "../../setup";

describe("TaskJsonRepository", () => {
    const filePath = "./data/tasks.test.json";

    afterEach(() => {
        persistanceCleanup("./data/tasks.test.json");
    });

    it("should create a task and store it in a file", () => {
        const repository = new TaskJsonRepository(filePath);
        const newDate = new Date();
        const task = new Task("Test", "Test description", newDate);
        const createdTask = repository.create(task);

        expect(createdTask).toMatchObject({
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.PENDING
        });

        const storedTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(storedTasks).toMatchObject([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate.toISOString(),
            status: TaskStatus.PENDING
        }]);
    });

    it("should update a task stored in a file", () => {
        const newDate = new Date();
        createTestTask(filePath, newDate);

        const repository = new TaskJsonRepository(filePath);
        const task = new Task("Updated", "Test description", newDate);
        const updatedTask = repository.update(1, task);

        expect(updatedTask).toMatchObject({
            id: 1,
            title: "Updated",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.PENDING
        });

        const storedTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(storedTasks).toMatchObject([{
            id: 1,
            title: "Updated",
            description: "Test description",
            dueDate: newDate.toISOString(),
            status: TaskStatus.PENDING
        }]);
    });


    it("should list the tasks stored in a file", () => {
        const newDate = new Date();
        createTestTask(filePath, newDate);

        const repository = new TaskJsonRepository(filePath);
        const tasks = repository.list();

        expect(tasks).toMatchObject([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.PENDING
        }]);
    });
});