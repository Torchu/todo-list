import { unlinkSync } from 'fs';

/**
 * Deletes the file at the given path.
 * 
 * @param filePath Path to the file to delete.
 */
export function persistanceCleanup(filePath: string): void {
    unlinkSync(filePath);
}