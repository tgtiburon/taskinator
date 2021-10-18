
console.log("script.js is loaded");
// references to document elements

let formEl = document.querySelector("#task-form"); 
let tasksToDoEl = document.querySelector("#tasks-to-do"); 
let tasksInProgressEl = document.querySelector("#tasks-in-progress");
let tasksCompletedEl = document.querySelector("#tasks-completed");
let pageContentEl = document.querySelector("#page-content");


let taskIdCounter = 0;
let tasks = [];


var taskFormHandler = function(event) { 

    // stop the form from reloading
    event.preventDefault();

    //Using [] selects an html element by one of its attribu
    let taskNameInput = document.querySelector("input[name='task-name']").value;
    let taskTypeInput = document.querySelector("select[name='task-type']").value;
  
    // check if input values are empty strings
    // if the variables are empty they are "falsy values"
    if (!taskNameInput || !taskTypeInput) {
      alert("You need to fill out the task form!");
      return false;
    }
    // reset form fields for the next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;
    
    // check if task is new or one being edited by seeing if it has data-task-id
    let isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete
    // edit process
    if (isEdit) {
      let taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl
    // function
    else {
      let taskDataObj = {
        name: taskNameInput, 
        type: taskTypeInput,
        status: "to do"
      };
      createTaskEl(taskDataObj);
    }
    
};// end taskFormHandler()

   //Creates the new task html code, we pass it taskDataObj for the info.
let createTaskEl = function(taskDataObj) {

    // create list item
    let listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    // setting the "data-task-id" to the value of taskIdCounter
    listItemEl.setAttribute("data-task-id", taskIdCounter);


    // create div to hold the task info and add it to the list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
     // using innerHTML lets us insert html in a string
   taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // create task actions (buttons and select) for the task
    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);
    tasksToDoEl.appendChild(listItemEl);

    taskDataObj.id = taskIdCounter;
    // push puts any data on the end of an array.
    tasks.push(taskDataObj);
    // increase the task counter for the next unique id
    taskIdCounter++;

    console.log(taskDataObj);
    console.log(taskDataObj.status);
};//end createTaskEl()

let createTaskActions = function(taskId) {
  // create container to hold elements
  let actionContainerEl = document.createElement("div");
  actionContainerEl.className = "task-actions";

  // create edit button
  let editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  let deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(deleteButtonEl);
  // create change status dropdown
  let statusSelectEl = document.createElement("Select");
  statusSelectEl.className = "select-status";
  statusSelectEl.setAttribute("name", "status-change");
  statusSelectEl.setAttribute("data-task-id", taskId);
  actionContainerEl.appendChild(statusSelectEl);
  // create status options
  let statusChoices = ["To Do", "In Progress", "Completed"];

  for (var i = 0; i< statusChoices.length; i++) {
    // create an option element
    let statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);

    // append to select
    statusSelectEl.appendChild(statusOptionEl);

  }

  return actionContainerEl;
};//end createTaskActions()

let completeEditTask = function(taskName, taskType, taskId) {
    let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    console.log("Task Updated!");
    // loop through tasks array and task object with new content
    // does the id = taskId    
    // parseInt turns taskId into an integer.
    for (let i = 0; i < tasks.length; i++) {
      if(tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].taskType;
      }
      
    };


    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";

};//end createTaskEl() 

 
let taskButtonHandler = function(event) {
  // get target element from event
  let targetEl = event.target;

  // edit button clicked
  if(event.target.matches(".edit-btn")) {
    let taskId = targetEl.getAttribute("data-task-id");
    editTask(taskId);
  }
  // delete button clicked
  if (event.target.matches(".delete-btn")) {
    let taskId = event.target.getAttribute("data-task-id");
    deleteTask(taskId); 
  }
};// end taskButtonHandler()

let editTask = function(taskId) {
  //debugger;
  console.log("editing task #" + taskId);
  // get task list element
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  // get content from task name and type
  let taskName = taskSelected.querySelector("h3.task-name").textContent;
  console.log(taskName);

 
  let taskType = taskSelected.querySelector("span.task-type").textContent;
  console.log(taskType);

  // write values of taskname and tasktype to the form to be edited
  document.querySelector("input[name='task-name']").value = taskName;
  document.querySelector("select[name='task-type']").value = taskType;
  // update forms button to reflect editing a task vs creating a new one
  formEl.querySelector("#save-task").textContent = "Save Task";
  // set data attribute to the form with a value of the tasks id so it knows
  // which one is being edited
  formEl.setAttribute("data-task-id", taskId);

};// end editTask()

let deleteTask = function(taskId) {
   // No space between .task-item[data-task-id] means the properties must be on 
    //same element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    console.log(taskSelected);
    taskSelected.remove();

    // create a new array to hold the updated list of tasks
    let updatedTaskArr = [];

    // loop through current tasks
    for (var i=0; i<tasks.length; i++) {
      // if tasks[i].id doesn't match the value of taskId, let's keep that task
      // and push it onto the new array, otherwise don't add it (delete it)
      if (tasks[i].id !== parseInt(taskId)) {
        updatedTaskArr.push(tasks[i]);
      }
    }

    // reassign tasks array to be the same as the new updatedTaskArr
    tasks = updatedTaskArr;
};// end deleteTask()

let taskStatusChangeHandler = function(event) {

  // get the task item's id
  let taskId = event.target.getAttribute("data-task-id");

  // get the currently selected options value and convert it to lower case
  let statusValue = event.target.value.toLowerCase();

  // find the parent task item element based on the id
  let taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

  if (statusValue === "to do") {
    tasksToDoEl.appendChild(taskSelected);
  }
  else if (statusValue === "in progress") {
    tasksInProgressEl.appendChild(taskSelected);
  } 
  else if (statusValue === "completed") {
    tasksCompletedEl.appendChild(taskSelected);
  }

  // update task's in the task array
  for (var i=0; i< tasks.length; i++) {
    if (tasks[i].id === parseInt(taskId)) {
      tasks[i].status = statusValue;
    }
  }
  console.log("tasks= ");
  console.dir(tasks);

};// end taskStatusChangeHandler()
 
// Event listeners

formEl.addEventListener("submit", taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);


