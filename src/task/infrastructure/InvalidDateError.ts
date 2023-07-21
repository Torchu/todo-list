export class InvalidDateError extends Error {
    constructor() {
        super("Invalid date. The correct format is YYYY-MM-DD");
    }
}