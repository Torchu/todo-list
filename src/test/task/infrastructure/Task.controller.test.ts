import TaskController from "../../../task/infrastructure/Task.controller";

const mockInput = jest.fn();
jest.mock("prompt-sync", () => () => mockInput);

describe("Task controller", () => {
    it("should throw an error if the date format is not valid while creating", () => {
        const controller = new TaskController();
        mockInput.mockReturnValue("Test");

        expect(() => controller.create()).toThrowError("Invalid date. The correct format is YYYY-MM-DD");
    });

    it("should throw an error if the ID is not valid while updating", () => {
        const controller = new TaskController();
        mockInput.mockReturnValue("Test");

        expect(() => controller.update()).toThrowError("Invalid ID");
    });

    it("should throw an error if the date format is not valid while updating", () => {
        const controller = new TaskController();
        mockInput.mockReturnValueOnce(1);
        mockInput.mockReturnValue("Test");

        expect(() => controller.update()).toThrowError("Invalid date. The correct format is YYYY-MM-DD");
    });

    it("should throw an error if the ID is not valid while completing", () => {
        const controller = new TaskController();
        mockInput.mockReturnValue("Test");

        expect(() => controller.complete()).toThrowError("Invalid ID");
    });

    it("should throw an error if the ID is not valid while deleting", () => {
        const controller = new TaskController();
        mockInput.mockReturnValue("Test");

        expect(() => controller.delete()).toThrowError("Invalid ID");
    });
});