import { unlinkSync, writeFileSync } from 'fs';
import { TaskStatus } from '../task/domain/types';

/**
 * Deletes the file at the given path.
 * 
 * @param filePath Path to the file to delete.
 */
export function persistanceCleanup(filePath: string): void {
    unlinkSync(filePath);
}

/**
 * Poblates the persistence file with a task.
 */
export function createTestTask(filePath: string, date: Date): void {
    writeFileSync(filePath, JSON.stringify([{
        id: 1,
        title: "Test",
        description: "Test description",
        dueDate: date.toISOString(),
        status: TaskStatus.PENDING
    }]));
}