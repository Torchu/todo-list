import createTask from "../../../task/application/createTask";
import { TaskStatus } from "../../../task/domain/types";
import TaskJsonRepository from "../../../task/infrastructure/TaskJson.repository";
import { persistanceCleanup } from "../../setup";

describe("Create task use case", () => {
    afterEach(() => {
        persistanceCleanup('tasks.test.json');
    });

    it("should generate a new ID and set the status to pending", () => {
        const newDate = new Date();
        const newTask = createTask(
            new TaskJsonRepository('tasks.test.json'),
            {title: 'Test title', description: 'Test description', dueDate: newDate}
        );
        expect(newTask).toMatchObject({
            id: 1,
            title: 'Test title',
            description: 'Test description',
            dueDate: newDate,
            status: TaskStatus.PENDING
        });
    });
});