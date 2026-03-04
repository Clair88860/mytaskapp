let currentCategory = "todo";

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showCategory(category) {
    currentCategory = category;

    document.querySelectorAll(".tab").forEach(tab => {
        tab.classList.remove("active");
    });

    document.querySelector("." + category).classList.add("active");

    render();
}

function addTask() {
    const text = document.getElementById("taskInput").value;
    const date = document.getElementById("dateInput").value;
    const priority = document.getElementById("priorityInput").value;

    if (!text) return;

    tasks.push({
        text,
        date,
        priority,
        completed: false
    });

    document.getElementById("taskInput").value = "";
    document.getElementById("dateInput").value = "";

    saveTasks();
    render();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    render();
}

function render() {

    const content = document.getElementById("content");
    const inputArea = document.getElementById("inputArea");

    content.innerHTML = "";

    if (currentCategory !== "todo") {
        inputArea.style.display = "none";
        content.innerHTML = "<h2>" + currentCategory.toUpperCase() + " Bereich</h2>";
        return;
    }

    inputArea.style.display = "flex";

    tasks.forEach((task, index) => {
        const div = document.createElement("div");
        div.className = "card " + task.priority + (task.completed ? " completed" : "");

        div.innerHTML = `
            <div onclick="toggleTask(${index})">
                <strong>${task.text}</strong><br>
                <small>${task.date || ""}</small>
            </div>
        `;

        content.appendChild(div);
    });
}

render();
