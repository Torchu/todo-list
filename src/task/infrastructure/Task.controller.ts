import promptSync from 'prompt-sync';
import Table from 'cli-table3';
import createTask from "../application/createTask";
import TaskJsonRepository from "./TaskJson.repository";
import listTasks from '../application/listTasks';

/**
 * This class is responsible for the connection between the user inputs and the application logic.
 */
class TaskController {
    /**
     * Creates a task asking the user for the data.
     */
    create() {
        const prompt = promptSync();

        const title = prompt("Enter the title of the task: ");
        const description = prompt("Enter the description of the task: ");
        const dueDate = new Date(Date.parse(prompt("Enter the due date of the task in YYYY-MM-DD format: ")));
        if (!dueDate) {
            throw new Error("Invalid date. The correct format is YYYY-MM-DD");
        }

        const task = createTask(new TaskJsonRepository('./data/tasks.json'), {title, description, dueDate});
        console.log(`Task created with ID ${task.id}`);
    }

    /**
     * Lists the tasks in a user-friendly way
     */
    list() {
        const tasks = listTasks(new TaskJsonRepository('./data/tasks.json'));
        const table = new Table({
            head: ['ID', 'Title', 'Description', 'Due Date', 'Status']
        });
        tasks.forEach(task => {
            table.push([task.id, task.title, task.description, task.dueDate.toDateString(), task.status]);
        });
        console.log(table.toString());
    }
}

export default TaskController;