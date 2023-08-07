let task = document.getElementById("task");
let taskForm = document.getElementById("taskForm");
let taskId = 1;

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        data.forEach(item => {
            displayTask(item.id, item.task);
        });
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchData();

const displayTask = (id, task) => {
    let taskList = document.getElementById("taskList");

    taskList.innerHTML += `
        <tr>
            <td>${id}</td>
            <td>${task}</td>
        </tr>
    `;
}

$(document).ready(function () {
    $('#submitBtn').click(function (e) { 
        e.preventDefault();
        const task = $('#task').val();
        $.post("/submit", { id: taskId, task: task },
        function (data) { 
            const { id, task } = data;
            displayTask(id, task);
            $('#task').val('');
            taskId++;
        });       
    });
});