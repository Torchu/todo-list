import Task from "../domain/Task";
import fs from "fs";
import TaskModel from "./TaskJson.model";
import TaskRepository from "./TaskRepository.interface";

/**
 * Repository that manages the connection with the persistance JSON file.
 */
class TaskJsonRepository implements TaskRepository {
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
        this.filePath = filePath;

        // If it doesn't exist, create the file.
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '', 'utf-8');
        }
        const data = fs.readFileSync(filePath, 'utf-8');
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
            dueDate: task.dueDate,
            status: task.status
        }
        this.tasks.push(newTask);
        this.saveData();

        return new Task(newTask.title, newTask.description, newTask.dueDate, newTask.status, newTask.id);
    }
}

export default TaskJsonRepository;