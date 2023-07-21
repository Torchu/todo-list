export class TaskNotFoundError extends Error {
    constructor(id: number) {
        super(`Task with ID ${id} not found.`);
    }
}