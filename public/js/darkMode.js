export function toggleDarkMode(darkModeButton) {

  document.body.classList.toggle("dark-mode")
  darkModeButton.textContent = document.body.classList.contains("dark-mode") ? "Mode Clair" : "Mode Sombre"

}

export function createDarkModeButton() {

  let darkModeButton = document.createElement("button")
  darkModeButton.textContent = "Mode Sombre"
  darkModeButton.className = "btn btn-secondary position-fixed top-0 end-0 m-3"
  
  return darkModeButton

}
