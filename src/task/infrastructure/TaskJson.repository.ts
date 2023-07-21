import Task from "../domain/Task";
import fs from "fs";
import TaskModel from "./TaskJson.model";
import TaskRepository from "../domain/TaskRepository.interface";
import { TaskStatus } from "../domain/types";
import { TaskNotFoundError } from "./TaskNotFoundError";

/**
 * Repository that manages the connection with the persistance JSON file.
 */
class TaskJsonRepository implements TaskRepository {
    /**
     * Base path to the persistance datafile.
     */
    private static readonly BASE_PATH = './data/';

    /**
     * List of tasks in the system.
     */
    private tasks: TaskModel[];

    /**
     * Next ID to use.
     */
    private nextId: number;

    /**
     * Path to the persistance datafile.
     */
    private filePath: string;

    /**
     * Loads the tasks from the persistance datafile.
     * 
     * @param filePath Path to the persistance datafile.
     */
    constructor(filePath: string) {
        this.filePath = `${TaskJsonRepository.BASE_PATH}${filePath}`;

        // If it doesn't exist, create the file.
        if (!fs.existsSync(this.filePath)) {
            fs.writeFileSync(this.filePath, '', 'utf-8');
        }
        const data = fs.readFileSync(this.filePath, 'utf-8');
        this.tasks = data? JSON.parse(data) : [];
        this.nextId = (this.tasks.at(-1)?.id ?? 0) + 1;
    }

    /**
     * Saves the tasks to the persistance datafile.
     */
    private saveData(): void {
        fs.writeFileSync(this.filePath, JSON.stringify(this.tasks));
    }

    /**
     * Transforms a TaskModel object into a Task object.
     */
    private toDomain(task: TaskModel): Task {
        return new Task(task.title, task.description, new Date(task.dueDate), task.status, task.id);
    }

    /**
     * Saves the tasks to the persistance datafile and generates its ID.
     * 
     * @param task Task to save.
     * 
     * @returns The saved task.
     */
    create(task: Task): Task {
        const newTask = {
            id: this.nextId++,
            title: task.title,
            description: task.description,
            dueDate: task.dueDate.toISOString(),
            status: task.status
        }
        this.tasks.push(newTask);
        this.saveData();

        return this.toDomain(newTask);
    }

    /**
     * Updates a task in the repository.
     * 
     * @param id ID of the task to update.
     * @param task Task with the new data.
     * 
     * @returns The updated task.
     */
    update(id: number, task: Task): Task {
        // Find the task with the given ID.
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        if (taskIdx === -1) {
            throw new TaskNotFoundError(id);
        }

        // Update the task.
        this.tasks[taskIdx].title = task.title;
        this.tasks[taskIdx].description = task.description;
        this.tasks[taskIdx].dueDate = task.dueDate.toISOString();

        this.saveData();
        return this.toDomain(this.tasks[taskIdx]);
    }

    /**
     * Deletes a task from the repository.
     * 
     * @param id ID of the task to delete.
     */
    delete(id: number): void {
        // Find the task with the given ID.
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        if (taskIdx === -1) {
            throw new TaskNotFoundError(id);
        }

        // Delete the task.
        this.tasks.splice(taskIdx, 1);
        this.saveData();
    }

    /**
     * Lists the tasks in the repository.
     * 
     * @returns A list of Task objects.
     */
    list(): Task[] {
        return this.tasks.map(task => this.toDomain(task));
    }

    /**
     * Completes a task in the repository.
     * 
     * @param id ID of the task to complete.
     * 
     * @returns The completed task.
     */
    complete(id: number): Task {
        // Find the task with the given ID.
        const taskIdx = this.tasks.findIndex(task => task.id === id);
        if (taskIdx === -1) {
            throw new TaskNotFoundError(id);
        }

        // Update the task.
        this.tasks[taskIdx].status = TaskStatus.COMPLETED;

        this.saveData();
        return this.toDomain(this.tasks[taskIdx]);
    }
}

export default TaskJsonRepository;