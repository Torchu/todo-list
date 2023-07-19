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
        "0": exit
    };
    let option = "";
    while (option !== "0") {
        console.log("Select an option: \n1. Create a task\n2. List the tasks\n0. Exit")
        option = prompt("");
        option in optionsMap ? optionsMap[option]() : console.log("Invalid option");
    }
};

/**
 * Closes the app.
 */
const exit = () => {
    console.log("Bye!");
};

menu();