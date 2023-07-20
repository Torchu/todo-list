import { unlinkSync, writeFileSync, readFileSync } from 'fs';
import { TaskStatus } from '../task/domain/types';
import TaskModel from '../task/infrastructure/TaskJson.model';

/**
 * Deletes the file at the given path.
 * 
 * @param filePath Path to the file to delete.
 */
export function persistanceCleanup(filePath: string): void {
    unlinkSync(`./data/${filePath}`);
}

/**
 * Poblates the persistence file with a task.
 */
export function createTestTask(filePath: string, date: Date): void {
    writeFileSync(`./data/${filePath}`, JSON.stringify([{
        id: 1,
        title: "Test",
        description: "Test description",
        dueDate: date.toISOString(),
        status: TaskStatus.PENDING
    }]));
}

/**
 * Returns the stored tasks.
 * 
 * @param filePath Path to the file to read.
 * 
 * @returns The stored tasks.
 */
export function getStoredTasks(filePath: string): TaskModel[] {
    return JSON.parse(readFileSync(`./data/${filePath}`, "utf-8"));
}