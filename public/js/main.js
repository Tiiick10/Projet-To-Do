import { renderTasks, addTask, toggleTaskCompletion, enableTaskEditing, deleteTask } from "./tasks.js"
import { createDarkModeButton, toggleDarkMode } from "./darkMode.js"

// Sélection des éléments

let taskInput = document.getElementById("taskInput")
let addTaskButton = document.getElementById("addTaskButton")
let filterButtons = document.querySelectorAll(".filter-button")

// Ajouter le bouton de mode sombre

let darkModeButton = createDarkModeButton()
darkModeButton.addEventListener("click", () => toggleDarkMode(darkModeButton))
document.body.appendChild(darkModeButton)

// Ajouter une tâche

addTaskButton.addEventListener("click", () => {

  let taskText = taskInput.value.trim()
  if (!taskText) return
  addTask(taskText)
  taskInput.value = "" // Réinitialiser le champ

})

// Gestion des filtres

filterButtons.forEach((button) => {

  button.addEventListener("click", () => {

    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")
    let filter = button.getAttribute("data-filter")
    renderTasks(filter)

  })

})

// Ajouter une tâche avec "Entrée"

document.getElementById("taskInput").addEventListener("keypress", function(event) {

  if (event.key === "Enter") {

      document.getElementById("addTaskButton").click()

  }
  
})

// Calculatrice

let calcDisplay = document.getElementById("calcDisplay")

let calculator = document.getElementById("calculator")

let currentInput = ""

let operator = null

let previousValue = null

// Gestion des clics sur les boutons

calculator.addEventListener("click", (e) => {

    let target = e.target

    let action = target.dataset.action

    let operatorValue = target.dataset.operator

    let buttonText = target.textContent

    // Si c'est un chiffre ou un point

    if (!action && !operatorValue) {

        if (currentInput.length < 20) { // Limite la longueur de l'affichage

            currentInput += buttonText

            updateDisplay(currentInput)

        }

    }

    // Si c'est une opération

    if (operatorValue) {

        if (currentInput) {

            previousValue = parseFloat(currentInput)

            operator = operatorValue

            currentInput = ""

        }

    }

    // Si c'est "C"

    if (action === "clear") {

        resetCalculator()

    }

    // Si c'est "="

    if (action === "equals") {

        if (operator && previousValue !== null && currentInput) {

            let result = calculate(previousValue, parseFloat(currentInput), operator)

            updateDisplay(result)

            resetCalculator(result) // Réinitialise pour continuer les calculs

        }

    }

})

// Met à jour l'affichage

function updateDisplay(value) {

    calcDisplay.value = value

}

// Reset la calculatrice

function resetCalculator(result = "") {

    currentInput = "" // Reset de l'input actuel
    previousValue = null // Reset la valeur précédente
    operator = null // Reset de l'opérateur
    updateDisplay(result) // MaJ affichage

}

// Calculs

function calculate(value1, value2, operator) {

    switch (operator) {

        case "+":

            return value1 + value2

        case "-":

            return value1 - value2

        case "*":

            return value1 * value2

        case "/":

            return value2 !== 0 ? value1 / value2 : "Erreur"

        case "%":

            return value1 % value2

        default:

            return value2

    }

}

// Initialisation

renderTasks()
toggleTaskCompletion()
enableTaskEditing()
deleteTask()
