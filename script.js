// Local storage'daki görevleri al
function getTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return tasks;
}

// Görevleri local storage'a kaydet
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Görev listesini güncelle
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    const tasks = getTasks();

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${task}</span>
            <button class="edit-button" onclick="editTask(${index})">Düzenle</button>
            <button class="delete-button" onclick="deleteTask(${index})">Sil</button>
        `;
        taskList.appendChild(listItem);
    });
}

// Yeni görev ekle
function addTask() {
    const taskInput = document.getElementById("task");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const tasks = getTasks();
        tasks.push(taskText);
        saveTasks(tasks);
        taskInput.value = "";
        updateTaskList();
    }
}

// Görevi düzenle
function editTask(index) {
    const tasks = getTasks();
    const updatedTaskText = prompt("Görevi düzenle:", tasks[index]);

    if (updatedTaskText !== null) {
        tasks[index] = updatedTaskText;
        saveTasks(tasks);
        updateTaskList();
    }
}

// Görevi sil
function deleteTask(index) {
    const tasks = getTasks();
    tasks.splice(index, 1);
    saveTasks(tasks);
    updateTaskList();
}
// Görevleri ara
function searchTasks() {
    const searchTerm = document.getElementById("search").value.trim().toLowerCase();
    const tasks = getTasks();
    const filteredTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm));

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    filteredTasks.forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${task}</span>
            <button class="edit-button" onclick="editTask(${index})">Düzenle</button>
            <button class="delete-button" onclick="deleteTask(${index})">Sil</button>
        `;
        taskList.appendChild(listItem);
    });
}

// Arama düğmesine tıklanınca arama işlevini çağır
document.getElementById("searchButton").addEventListener("click", searchTasks);


// Sayfa yüklendiğinde görev listesini güncelle
window.onload = updateTaskList;
