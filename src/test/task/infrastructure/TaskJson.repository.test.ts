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

    it("should throw an exception when updating a task that doesn't exist", () => {
        const repository = new TaskJsonRepository(filePath);
        const task = new Task("Updated", "Test description", new Date());

        expect(() => repository.update(1, task)).toThrow("Task with ID 1 not found.");
    });

    it("should delete a task stored in a file", () => {
        createTestTask(filePath, new Date());

        const repository = new TaskJsonRepository(filePath);
        repository.delete(1);

        const storedTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(storedTasks).toMatchObject([]);
    });

    it("should throw an exception when deleting a task that doesn't exist", () => {
        const repository = new TaskJsonRepository(filePath);

        expect(() => repository.delete(1)).toThrow("Task with ID 1 not found.");
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

    it("should complete a task stored in a file", () => {
        const newDate = new Date();
        createTestTask(filePath, newDate);

        const repository = new TaskJsonRepository(filePath);
        const task = repository.complete(1);

        expect(task).toMatchObject({
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate,
            status: TaskStatus.COMPLETED
        });

        const storedTasks = JSON.parse(fs.readFileSync(filePath, "utf-8"));
        expect(storedTasks).toMatchObject([{
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: newDate.toISOString(),
            status: TaskStatus.COMPLETED
        }]);
    });

    it("should throw an exception when completing a task that doesn't exist", () => {
        const repository = new TaskJsonRepository(filePath);

        expect(() => repository.complete(1)).toThrow("Task with ID 1 not found.");
    });
});