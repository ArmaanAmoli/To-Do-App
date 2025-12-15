function render(){
    const listOfTask = document.querySelector(".list")
    listOfTask.innerHTML=``
    //This function will render evety task stored in the local storage
    LT = localStorage.getItem("tasks")
    LT = JSON.parse(LT)
    if(LT==null){
        return
    }
    for(let i = 0 ; i<LT.length ; i++){
        listOfTask.innerHTML+=`
        <div class="task">
                    <input type="checkbox" id="completed" name="Checkbox" value="No">
                    <h3>${LT[i][0]}</h3>
                    <p>${LT[i][1]} - ${LT[i][2]}</p>
        </div>
    `
    }
}

let addNewTaskButton;

render()
//we use DOMContentLoaded because we are waiting for the html content to entirely load so that Javascript can safely access the element
document.addEventListener("DOMContentLoaded", () => {
    addNewTaskButton = document.querySelector(".Ad_button");
    addNewTaskButton.addEventListener('click', createNewTask);
});

// const BodyHtmlElement = document.body
let newTaskForm;
let taskWidget;
function createNewTask(){
    if (newTaskForm) {
        newTaskForm.remove();
    }
    
    newTaskForm = document.createElement('div')
    newTaskForm.classList.add("NewTaskForm")
    newTaskForm.id = 'newT'
    newTaskForm.innerHTML+=`
        <div class = "new-task-header">
            <h1>Add a new New Task</h1>
            <button class="save-new-task">save</button>
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
        <h2>Task Description</h2>
        <textarea id="comment" name="comment" rows="4" cols="50" placeholder="Type here..."></textarea>
  
    `
    document.body.appendChild(newTaskForm)
    const saveTaskButton = document.querySelector(".save-new-task")
    saveTaskButton.addEventListener('click',saveNewTask)
    
}

// as the user click "save" button we want to add new html element in the list class

function saveNewTask(){
    const newTaskName = document.querySelector(".newTaskName").value
    const StartDate = document.querySelector("#StartDate").value
    const Deadline = document.querySelector("#Deadline").value
    const TaskDescription = document.querySelector("#comment").value

    taskWidget = [newTaskName , StartDate , Deadline , TaskDescription]
    if(taskWidget[0]!=="" && taskWidget[1]!==""){
        Local = localStorage.getItem("tasks")
        if(Local == null){
            localStorage.setItem("tasks",JSON.stringify([taskWidget]))
        }
        else{
            LocalArray = JSON.parse(Local)
            LocalArray.push(taskWidget)
            localStorage.setItem("tasks", JSON.stringify(LocalArray))
        }
        render()
    }
    newTaskForm.remove();
}



