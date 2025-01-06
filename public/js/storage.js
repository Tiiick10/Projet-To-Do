export function loadTasks() {

    return JSON.parse(localStorage.getItem("tasks")) || []

}

export function saveTask(tasks) {

    localStorage.setItem("tasks", JSON.stringify(tasks))

}

export function toggleTask(id, tasks, newStatus) {

    let task = tasks.find((task) => task.id === id)

    if (task) {

        task.status = newStatus

        saveTask(tasks)

    }

}
