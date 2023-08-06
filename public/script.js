let task = document.getElementById("task");
let taskForm = document.getElementById("taskForm");
let taskId = 1;

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    let taskList = document.getElementById("taskList");

    taskList.innerHTML += `
        <tr>
            <td>${taskId}</td>
            <td>${task.value}</td>
        </tr>
    `;
    taskId++;
    task.value = null;
})