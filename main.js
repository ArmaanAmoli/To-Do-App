function render(){
    const listOfTask = document.querySelector(".list")
    listOfTask.innerHTML=``
    //This function will render evety task stored in the local storage
    let LT = localStorage.getItem("tasks")
    LT = JSON.parse(LT)
    if(LT==null){
        return
    }
    let HTMLcontent = ""
    for(let i = 0 ; i<LT.length ; i++){
        HTMLcontent+=`
        <div class="task">
                    <input type="checkbox" id="${i}" name="Checkbox" ${LT[i][4]?'checked':''}>
                    <h3>${LT[i][0]}</h3>
                    <p>${LT[i][1]} - ${LT[i][2]}</p>
        </div>`
    }
    listOfTask.innerHTML = HTMLcontent

    //After rendering we will we attaching event listeners
    const Checkboxes = document.querySelectorAll('input[type="checkbox"]')
    Checkboxes.forEach(cb=>
        cb.addEventListener('change',handleCheckboxChange)
    )
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
        <h2>Description</h2>
        <textarea id="comment" name="comment" rows="15" cols="60" placeholder="Type here..."></textarea>
  
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
    const IsDone = false // Initiating the task as not done

    taskWidget = [newTaskName , StartDate , Deadline , TaskDescription , IsDone]
    if(taskWidget[0]!=="" && taskWidget[1]!==""){
        Local = localStorage.getItem("tasks")
        if(Local == null){
            localStorage.setItem("tasks",JSON.stringify([taskWidget]))
        }
        else{
            let LocalArray = JSON.parse(Local)
            LocalArray.push(taskWidget)
            localStorage.setItem("tasks", JSON.stringify(LocalArray))
        }
        render()
    }
    newTaskForm.remove();
}




//Creating a function to detect change in a checkbox
function handleCheckboxChange(event){
    const ClickedCheckBox = event.target
    let idOfCB = ClickedCheckBox.id
    //Through the ID we will update the local storage as the ID is same as the index of the particular Task in local storage
    let taskArray = JSON.parse(localStorage.getItem("tasks"))
    taskArray[Number(idOfCB)][4] = !taskArray[Number(idOfCB)][4]  // If checked returns true
    console.log(taskArray[Number(idOfCB)][4] + " " + Number(idOfCB))
    localStorage.setItem("tasks" , JSON.stringify(taskArray))
}




