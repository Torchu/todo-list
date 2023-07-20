import Task from "../../../task/domain/Task";
import { TaskStatus } from "../../../task/domain/types";

describe("A task", () => {
    it("should be created", () => {
        const date = new Date();
        const task = new Task("Test", "Test description", date, TaskStatus.PENDING, 1);
        expect(task).toMatchObject({
            id: 1,
            title: "Test",
            description: "Test description",
            dueDate: date,
            status: TaskStatus.PENDING
        });
    });

    it("should be created without id", () => {
        const date = new Date();
        const task = new Task("Test", "Test description", date, TaskStatus.PENDING);
        expect(task).toMatchObject({
            title: "Test",
            description: "Test description",
            dueDate: date,
            status: TaskStatus.PENDING
        });
    });

    it("should set the default status to PENDING", () => {
        const date = new Date();
        const task = new Task("Test", "Test description", date);
        expect(task).toMatchObject({
            title: "Test",
            description: "Test description",
            dueDate: date,
            status: TaskStatus.PENDING
        });
    });
});