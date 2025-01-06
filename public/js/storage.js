export function saveTasksToStorage(tasks) {

  localStorage.setItem("tasks", JSON.stringify(tasks))

}

export function loadTasksFromStorage() {

  let savedTasks = localStorage.getItem("tasks")

  return savedTasks ? JSON.parse(savedTasks) : []

}
