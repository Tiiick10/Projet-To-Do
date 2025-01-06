// Sélection des éléments HTML

let taskInput = document.getElementById("taskInput")
let addTaskButton = document.getElementById("addTaskButton")
let inProgressTasks = document.getElementById("inProgressTasks")
let completedTasks = document.getElementById("completedTasks")
let deletedTasks = document.getElementById("deletedTasks")

// Chargement initial des tâches depuis le Local Storage

let tasks = JSON.parse(localStorage.getItem("tasks")) || []

// Fonction pour afficher les tâches

function renderTasks() {

  // Réinitialise les listes

  inProgressTasks.innerHTML = ""
  completedTasks.innerHTML = ""
  deletedTasks.innerHTML = ""

  // Parcours des tâches

  tasks.forEach((task, index) => {

    let li = document.createElement("li")

    li.className = "list-group-item d-flex justify-content-between align-items-center shadow-sm"
    li.innerHTML = `

      <span ${task.completed ? 'class="text-decoration-line-through text-muted"' : ""}>${task.text}</span>
      <div>

        ${!task.deleted

          ? `
            <button class="btn btn-sm btn-success me-2" onclick="toggleComplete(${index})">

              ${task.completed ? "Annuler" : "Terminer"}

            </button>

            <button class="btn btn-sm btn-danger" onclick="deleteTask(${index})">Supprimer</button>
          `
          : `
            <button class="btn btn-sm btn-danger" onclick="permanentlyDeleteTask(${index})">Supprimer définitivement</button>
          `}

      </div>

    `

    if (task.deleted) {

      deletedTasks.appendChild(li)

    } else if (task.completed) {

      completedTasks.appendChild(li)

    } else {

      inProgressTasks.appendChild(li)

    }

  })

  // Mise à jour du Local Storage

  localStorage.setItem("tasks", JSON.stringify(tasks))

}

// Fonction pour ajouter une tâche

function addTask() {

  let taskText = taskInput.value.trim()

  if (taskText === "") {

    alert("Veuillez entrer une tâche !")

    return

  }

  // Ajout d'une nouvelle tâche

  tasks.push({ text: taskText, completed: false, deleted: false })

  taskInput.value = "" // Réinitialiser le champ

  renderTasks() // Rafraîchir l'affichage

}

// Fonction pour marquer une tâche comme terminée / en cours

function toggleComplete(index) {

  tasks[index].completed = !tasks[index].completed

  renderTasks()

}

// Fonction pour supprimer une tâche

function deleteTask(index) {

  tasks[index].deleted = true

  renderTasks()

}

// Fonction pour supprimer définitivement une tâche

function permanentlyDeleteTask(index) {

  tasks.splice(index, 1) // Supprime l'élément du tableau

  renderTasks()

}

// Événement sur le bouton "Ajouter"

addTaskButton.addEventListener("click", addTask)

// Rendre les fonctions accessibles globalement

window.toggleComplete = toggleComplete
window.deleteTask = deleteTask
window.permanentlyDeleteTask = permanentlyDeleteTask

// Initialisation de l'affichage

renderTasks()
  