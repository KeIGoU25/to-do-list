let task = document.getElementById("task");
let taskForm = document.getElementById("taskForm");
let taskId = 1;

const displayTask = (task) => {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML += `
        <tr>
            <td>${taskId}</td>
            <td>${task}</td>
        </tr>
    `;
    taskId++;
}

$(document).ready(function () {
    $('#submitBtn').click(function (e) { 
        e.preventDefault();
        const task = $('#task').val();

        $.post("/submit", { task: task },
        function (task) { 
            displayTask(task);
            $('#task').val('');
        });       
    });
});