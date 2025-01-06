import { saveTasksToStorage, loadTasksFromStorage } from "./storage.js"

let tasks = loadTasksFromStorage() || []
let draggedTaskId = null
let taskList = document.getElementById("taskList")

function renderTasks(filter = "all", filteredList = null) {

  taskList.innerHTML = "" // Effacer la liste existante

  let filteredTasks = filteredList || tasks.filter((task) => {

    if (filter === "all") return true
    if (filter === "completed") return task.completed
    if (filter === "in-progress") return !task.completed

  })

  // Mise à jour des compteurs

  let totalTasks = tasks.length
  let completedTasks = tasks.filter((task) => task.completed).length
  let inProgressTasks = tasks.filter((task) => !task.completed).length

  let allButton = document.querySelector('[data-filter="all"]')
  let completedButton = document.querySelector('[data-filter="completed"]')
  let inProgressButton = document.querySelector('[data-filter="in-progress"]')

  if (allButton) allButton.textContent = `Toutes (${totalTasks})`
  if (completedButton) completedButton.textContent = `Terminées (${completedTasks})`
  if (inProgressButton) inProgressButton.textContent = `En cours (${inProgressTasks})`

  // Afficher un message si aucune tâche n'est disponible

  if (filteredTasks.length === 0) {

    let emptyMessage = document.createElement("li")
    emptyMessage.className = "list-group-item text-center"
    emptyMessage.textContent = "Aucune tâche disponible."
    taskList.appendChild(emptyMessage)

    return

  }

  filteredTasks.forEach((task) => {

    let listItem = document.createElement("li")
    listItem.className = `list-group-item task ${task.completed ? "completed" : ""}`
    listItem.draggable = true // Ajout pour Drag & Drop
    listItem.dataset.id = task.id

    let checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    checkbox.className = "form-check-input me-2"
    checkbox.addEventListener("change", () => toggleTaskCompletion(task.id))

    let taskText = document.createElement("span")
    taskText.textContent = task.text

    // Ajouter un événement pour permettre l'édition de la tâche

    taskText.addEventListener("click", () => enableTaskEditing(task.id))

    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Supprimer"
    deleteButton.className = "btn btn-danger btn-sm"
    deleteButton.addEventListener("click", () => deleteTask(task.id))

    listItem.appendChild(checkbox)
    listItem.appendChild(taskText)
    listItem.appendChild(deleteButton)

    // Ajout des événements pour Drag & Drop

    listItem.addEventListener("dragstart", (e) => dragStart(e, task.id))
    listItem.addEventListener("dragover", (e) => e.preventDefault())
    listItem.addEventListener("drop", (e) => dropTask(e, task.id))

    taskList.appendChild(listItem)

  })

}

// Gestion du Drag & Drop

function dragStart(event, taskId) {

  draggedTaskId = taskId

}

function dropTask(event, targetTaskId) {

  let draggedIndex = tasks.findIndex((task) => task.id === draggedTaskId)
  let targetIndex = tasks.findIndex((task) => task.id === targetTaskId)

  if (draggedIndex !== -1 && targetIndex !== -1) {

    let [draggedTask] = tasks.splice(draggedIndex, 1)
    tasks.splice(targetIndex, 0, draggedTask)
    saveTasksToStorage(tasks)
    renderTasks()

  }

}

// Ajouter une tâche

function addTask(taskText) {

  let newTask = { id: Date.now(), text: taskText, completed: false }
  tasks.push(newTask)
  saveTasksToStorage(tasks)
  renderTasks()

}

// Marquer une tâche comme terminée

function toggleTaskCompletion(taskId) {

  tasks = tasks.map((task) => {

    if (task.id === taskId) task.completed = !task.completed
    return task

  })

  saveTasksToStorage(tasks)
  renderTasks()

}

function enableTaskEditing(taskId) {

  let task = tasks.find((t) => t.id === taskId)
  if (!task) return
  let taskTextElement = document.querySelector(`[data-id='${taskId}'] span`)
  let input = document.createElement("input")
  input.type = "text"
  input.value = task.text
  input.className = "form-control"
  taskTextElement.replaceWith(input)

  input.addEventListener("blur", () => {

    task.text = input.value.trim()
    saveTasksToStorage(tasks)
    renderTasks()

  })

}

function deleteTask(taskId) {

  tasks = tasks.filter((task) => task.id !== taskId)
  saveTasksToStorage(tasks)
  renderTasks()

}

export { renderTasks, addTask, toggleTaskCompletion, enableTaskEditing, deleteTask }
