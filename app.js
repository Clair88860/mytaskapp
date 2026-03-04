// Aktuelle Kategorie
let currentCategory = "todo";

// Datenstruktur
let tasks = JSON.parse(localStorage.getItem("tasks")) || {
  todo: [], routine: [], event: [], checklist: []
};

// Speichern
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Neue Aufgabe hinzufügen (nur To-Do)
function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("dateInput").value;
  const priority = document.getElementById("priorityInput").value;

  if (!text) return;

  tasks.todo.push({ text, date, priority, completed: false });
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";

  saveTasks();
  renderTasks();
}

// Aufgabe abhaken
function toggleTask(index) {
  tasks.todo[index].completed = !tasks.todo[index].completed;
  saveTasks();
  renderTasks();
}

// Aufgabe löschen
function deleteTask(index) {
  tasks.todo.splice(index, 1);
  saveTasks();
  renderTasks();
}

// Kategorie wechseln
function showCategory(category) {
  currentCategory = category;

  // Aktiven Tab setzen
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });
  document.querySelector(`.tab.${category}`).classList.add("active");

  renderTasks();
}

// Aufgaben oder Kategorie-Text rendern
function renderTasks() {
  const list = document.getElementById("taskList");
  const inputArea = document.getElementById("inputArea");
  list.innerHTML = "";

  if (currentCategory === "todo") {
    inputArea.style.display = "flex";
    tasks.todo.forEach((task, index) => {
      const card = document.createElement("div");
      card.className = `card ${task.priority} ${task.completed ? "completed" : ""}`;
      card.innerHTML = `
        <div onclick="toggleTask(${index})">
          <strong>${task.text}</strong><br>
          <small>${task.date || ""}</small>
        </div>
        <button onclick="deleteTask(${index})">X</button>
      `;
      list.appendChild(card);
    });
  } else {
    // Für andere Kategorien einfach Text anzeigen
    inputArea.style.display = "none";
    let text = "";
    switch(currentCategory) {
      case "routine": text = "Hier ist dein Routine-Bereich."; break;
      case "event": text = "Hier ist dein Event-Bereich."; break;
      case "checklist": text = "Hier ist dein Checkliste-Bereich."; break;
      case "calendar": text = "Hier ist dein Kalender."; break;
    }
    const div = document.createElement("div");
    div.style.color = "#ccc";
    div.style.fontSize = "18px";
    div.textContent = text;
    list.appendChild(div);
  }
}

// Initial rendern
renderTasks();