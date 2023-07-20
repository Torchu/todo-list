import promptSync from 'prompt-sync';
import Table from 'cli-table3';
import createTask from "../application/createTask";
import TaskJsonRepository from "./TaskJson.repository";
import listTasks from '../application/listTasks';
import updateTask from '../application/updateTask';
import completeTask from '../application/completeTask';
import deleteTask from '../application/deleteTask';

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

    /**
     * Updates a task asking the user for the data and the task ID.
     */
    update() {
        const prompt = promptSync();

        const id = parseInt(prompt("Enter the ID of the task: "));
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }

        const title = prompt("Enter the new title of the task: ");
        const description = prompt("Enter the new description of the task: ");
        const dueDate = new Date(Date.parse(prompt("Enter the new due date of the task in YYYY-MM-DD format: ")));
        if (!dueDate) {
            throw new Error("Invalid date. The correct format is YYYY-MM-DD");
        }
        
        const task = updateTask(new TaskJsonRepository('./data/tasks.json'), id, {title, description, dueDate});
        console.log(`Task updated with ID ${task.id}`);
    }

    /**
     * Completes a task asking the user for the task ID.
     */
    complete() {
        const prompt = promptSync();

        const id = parseInt(prompt("Enter the ID of the task: "));
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }

        const task = completeTask(new TaskJsonRepository('./data/tasks.json'), id);
        console.log(`Task completed with ID ${task.id}`);
    }

    /**
     * Deletes a task asking the user for the task ID.
     */
    delete() {
        const prompt = promptSync();

        const id = parseInt(prompt("Enter the ID of the task: "));
        if (isNaN(id)) {
            throw new Error("Invalid ID");
        }

        deleteTask(new TaskJsonRepository('./data/tasks.json'), id);
        console.log(`Task deleted with ID ${id}`);
    }
}

export default TaskController;