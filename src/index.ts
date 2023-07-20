import promptSync from 'prompt-sync';
import TaskController from './task/infrastructure/Task.controller';

console.log("Welcome to the TODO list app!");
const prompt = promptSync();
const taskController = new TaskController();

/**
 * Main menu of the app.
 */
const menu = () => {
    const optionsMap: Record<string, () => void> = {
        "1": taskController.create,
        "2": taskController.list,
        "3": taskController.update,
        "4": taskController.complete,
        "5": taskController.delete,
        "0": exit
    };
    let option = "";
    while (option !== "0") {
        console.log(
            "\nSelect an option: "+
            "\n1. Create a task"+
            "\n2. List the tasks"+
            "\n3. Update a task"+
            "\n4. Complete a task"+
            "\n5. Delete a task"+
            "\n0. Exit")
        option = prompt("");
        if (!(option in optionsMap)) {
            console.error("Invalid option")
            continue;
        }
        try {
            optionsMap[option]();
        } catch (e) {
            console.log((e as Error).message);
        }
    }
};

/**
 * Closes the app.
 */
const exit = () => {
    console.log("Bye!");
};

menu();