function render() {
    const listOfTask = document.querySelector(".list")
    listOfTask.innerHTML = ``
    //This function will render evety task stored in the local storage
    let LT = localStorage.getItem("tasks")
    LT = JSON.parse(LT)
    if (LT == null) {
        return
    }
    let HTMLcontent = ""
    for (let i = 0; i < LT.length; i++) {
        HTMLcontent += `
        <div class="task" id="TaskElement-${LT[i][5]}">
                    <input type="checkbox" id="${LT[i][5]}" name="Checkbox" ${LT[i][4] ? 'checked' : ''}>
                    <div class = "Task-content">
                        <h3>${LT[i][0]}</h3>
                        <p>${LT[i][1]} - ${LT[i][2]}</p>
                    </div>
                    <button class="delete-task-button" id="DELETE-${LT[i][5]}"><img src="delete.svg"></button>
        </div>`
    }
    listOfTask.innerHTML = HTMLcontent

    //After rendering we will we attaching event listeners
    const Checkboxes = document.querySelectorAll('input[type="checkbox"]')
    Checkboxes.forEach(cb =>
        cb.addEventListener('change', handleCheckboxChange)
    )

    //Adding Event Listner to all the Delete Buttons
    for(let i=0 ; i< LT.length ; i++){
        let deleteButton = document.getElementById(`DELETE-${LT[i][5]}`)
        deleteButton.addEventListener('click',function(){DeleteTask(Number(LT[i][5]))})
    }
}

let addNewTaskButton;

//we use DOMContentLoaded because we are waiting for the html content to entirely load so that Javascript can safely access the element
document.addEventListener("DOMContentLoaded", () => {
    render()
    addNewTaskButton = document.querySelector(".Ad_button");
    addNewTaskButton.addEventListener('click', createNewTask);
});

// const BodyHtmlElement = document.body
let newTaskForm;
let taskWidget;
let NewTaskWindowCloseButton;
function createNewTask() {
    if (newTaskForm) {
        newTaskForm.remove();
    }

    newTaskForm = document.createElement('div')
    newTaskForm.classList.add("NewTaskForm")
    newTaskForm.id = 'newT'
    newTaskForm.innerHTML += `
        <div class = "new-task-header">
            <h1>Add a new New Task</h1>
            <div class = "utility-buttons">
                <button class="save-new-task">save</button>
                <button class="Close">X</button>
            </div>
            
        </div>
        <h2>Task Name</h2>
        <input type="text" placeholder="Enter new task" class="newTaskName">
        <div class="Dates">
            <div class="date">
                <h3>Start Date</h3>
                <input type="date" id="StartDate" class="meeting-time">
            </div>
    
        <div class="date">
            <h3>Deadline</h3>
            <input type="date" id="Deadline" class="meeting-time">
        </div>
        </div>
        <h2>Description</h2>
        <textarea id="comment" name="comment" rows="15" cols="60" placeholder="Type here..."></textarea>
  
    `
    document.body.appendChild(newTaskForm)
    const saveTaskButton = document.querySelector(".save-new-task")
    saveTaskButton.addEventListener('click', saveNewTask)
    NewTaskWindowCloseButton = document.querySelector(".Close")
    NewTaskWindowCloseButton.addEventListener("click", closeWindow)
}

function closeWindow() { newTaskForm.remove() }// Close the window if you 'X' button clicked

function saveNewTask() { // as the user click "save" button we want to add new html element in the list class

    //We will be going to store task ID as timestamp-> int meiliseconds from Jan 1 1970 UTC bye using -> Date.now()
    const newTaskName = document.querySelector(".newTaskName").value
    const StartDate = document.querySelector("#StartDate").value
    const Deadline = document.querySelector("#Deadline").value
    const TaskDescription = document.querySelector("#comment").value
    const IsDone = false // Initiating the task as not done
    const ID = Date.now()

    taskWidget = [newTaskName, StartDate, Deadline, TaskDescription, IsDone, ID]
    if (taskWidget[0] !== "" && taskWidget[1] !== "") {
        Local = localStorage.getItem("tasks")
        if (Local == null) {
            localStorage.setItem("tasks", JSON.stringify([taskWidget]))
        }
        else {
            let LocalArray = JSON.parse(Local)
            LocalArray.push(taskWidget)
            localStorage.setItem("tasks", JSON.stringify(LocalArray))
        }
        render()
    }
    newTaskForm.remove();
}

//Creating a function to detect change in a checkbox
function handleCheckboxChange(event) {
    const ClickedCheckBox = event.target
    let idOfCB = Number(ClickedCheckBox.id)
    //Through the ID we will update the local storage as the ID is stored in the 5th index of each subarray
    let taskArray = JSON.parse(localStorage.getItem("tasks"))

    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][5] == idOfCB) {
            taskArray[i][4] = !taskArray[i][4]
            break
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskArray))
}

function DeleteTask(ID){ //Takes in the id of Task-HTML and removes it from the local storage
    let taskArray = JSON.parse(localStorage.getItem("tasks"))
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i][5] == ID) {
            taskArray.splice(i,1)
            break
        }
    }
    localStorage.setItem("tasks", JSON.stringify(taskArray))
    render()
}