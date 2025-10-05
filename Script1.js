let currentDetailTask = null;

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li span").forEach(span => {
        tasks.push(span.innerText);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let saved = localStorage.getItem("tasks");
    if (saved) {
        JSON.parse(saved).forEach(task => addTaskFromStorage(task));
    }
}

function addTaskFromStorage(taskName) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = taskName;
    li.appendChild(span);

    let btnEdit = document.createElement("button");
    btnEdit.innerText = "✏️ Edit";
    btnEdit.onclick = function () {
        let newTask = prompt("Sửa công việc:", span.innerText);
        if (newTask !== null && newTask.trim() !== "") {
            span.innerText = newTask.trim();
            saveTasks();
        }
    };

    let btnDetail = document.createElement("button");
    btnDetail.innerText = "📋 Detail";
    btnDetail.onclick = function () {
        currentDetailTask = li;
        showDetail(span.innerText);
    };

    let btnDelete = document.createElement("button");
    btnDelete.innerText = "🗑️ Xóa";
    btnDelete.onclick = function () {
        li.remove();
        saveTasks();
        if (currentDetailTask === li) hideDetail();
    };

    li.appendChild(btnEdit);
    li.appendChild(btnDetail);
    li.appendChild(btnDelete);
    document.getElementById("taskList").appendChild(li);
}

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();
    if (task === "") return;

    addTaskFromStorage(task);
    saveTasks();
    input.value = "";
}

function showDetail(taskName) {
    let detailDiv = document.getElementById("detailView");
    detailDiv.style.display = "block";
    document.getElementById("detailTaskName").innerText = taskName;
    document.getElementById("detailContent").innerText = "Chưa có nội dung cụ thể.";
    document.getElementById("detailDeadline").innerText = "Chưa đặt deadline.";
    document.getElementById("detailNote").innerText = "Không có ghi chú.";
}

function hideDetail() {
    document.getElementById("detailView").style.display = "none";
    currentDetailTask = null;
}

window.onload = function () {
    loadTasks();
    document.getElementById("addBtn").onclick = addTask;
};
