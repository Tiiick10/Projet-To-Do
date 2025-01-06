import { loadTasks } from "./storage.js"

export function filterTasks(filter) {

    let tasks = loadTasks()

    if (filter === "completed") {

        return tasks.filter((task) => task.completed)

    } else if (filter === "inprogress") {

        return tasks.filter((task) => !task.completed)

    }

    return tasks
    
}
