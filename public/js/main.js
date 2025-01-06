import { renderTasks, addTask, toggleTaskCompletion, enableTaskEditing, deleteTask } from "./tasks.js";
import { createDarkModeButton, toggleDarkMode } from "./darkMode.js";

// Sélection des éléments

let taskInput = document.getElementById("taskInput");
let addTaskButton = document.getElementById("addTaskButton");
let filterButtons = document.querySelectorAll(".filter-button");

// Ajouter le bouton de mode sombre

let darkModeButton = createDarkModeButton();
darkModeButton.addEventListener("click", () => toggleDarkMode(darkModeButton));
document.body.appendChild(darkModeButton);

// Ajouter une tâche

addTaskButton.addEventListener("click", () => {

  let taskText = taskInput.value.trim();
  if (!taskText) return;
  addTask(taskText);
  taskInput.value = ""; // Réinitialiser le champ

});

// Gestion des filtres

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    let filter = button.getAttribute("data-filter");
    renderTasks(filter);

  });

});

// Initialisation

renderTasks()
toggleTaskCompletion()
enableTaskEditing()
deleteTask()
