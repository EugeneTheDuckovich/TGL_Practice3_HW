var counter;
function addTaskToList(){
    const input = document.getElementById("inputTask").value;
    if(!input || input.trim() == 0){
        alert("Cannot add empty task!");
        return;
    }

    if(typeof(counter) == "undefined"){
        counter = 1;
    }
    
    const newTask = document.createElement("input");
    newTask.id = "taskInput" + counter;
    newTask.className = "editable-task";
    newTask.disabled = true;
    newTask.value = input;


    const editButton = document.createElement("button");
    editButton.id = "edit" + counter;    
    editButton.innerHTML= "&#9998;";
    editButton.onclick = editTask;


    const deleteButton = document.createElement("button");
    deleteButton.id = "delete" + counter;
    deleteButton.innerHTML= "&#10008;";
    deleteButton.onclick = deleteTask;


    const newDiv = document.createElement("div");
    newDiv.id = "taskDiv" + counter++;
    newDiv.className = "input-section";

    newDiv.append(newTask);
    newDiv.append(editButton);
    newDiv.append(deleteButton);



    const list = document.getElementById("listSection");
    list.append(newDiv);
    updateTaskCounter();
}

var previousValue;
function editTask(){
    const needToEdit = document.getElementById("taskInput" + this.id.slice(4));

    needToEdit.disabled = !needToEdit.disabled;

    if (needToEdit.disabled) {
        if(needToEdit.value.trim() == 0){
            alert("task cannot be empty!");
            needToEdit.value = previousValue;
        }
        this.innerHTML = "&#9998;";
    } else {
        previousValue = needToEdit.value;
        this.innerHTML = "&#10004;";
    }
    updateTaskCounter();
}

function deleteTask(){
    const needToDelete = document.getElementById("taskDiv" + this.id.slice(6));
    const list = document.getElementById("listSection");
    list.removeChild(needToDelete);
    updateTaskCounter();
}

function switchMode(){
    var mainDiv = document.getElementById("todoPage");

    if (mainDiv.getAttribute("theme") == "light") {
        mainDiv.setAttribute("theme","dark");
        document.body.setAttribute("background-color", "#000000");
        this.innerHTML = "&#9728;";
    } else {
        mainDiv.setAttribute("theme","light");
        document.body.setAttribute("background-color", "#ffffff");
        this.innerHTML = "&#9789;";
    }
}

function clearAll(){
    const list = document.getElementById("listSection");
    while(list.firstChild){
            list.removeChild(list.firstChild);
    }
    updateTaskCounter();
}

function updateTaskCounter(){
    const list = document.getElementById("listSection");
    const taskCounter = document.getElementById("footLabel");
    taskCounter.textContent = `you have ` + list.children.length + ` tasks to do`;
}