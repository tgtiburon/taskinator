console.log("script.js is loaded");

var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 
let taskIdCounter = 0;

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


    // package up the data as an object
    let taskDataObj = {
      name: taskNameInput, 
      type: taskTypeInput
    };

    // send it as an argument to createTaskEl

    createTaskEl(taskDataObj);
    formEl.reset();
    
  }; 

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
    taskInfoEl.innerHTML  = "<h3 class='task-name'> " + taskDataObj.name + " </h3<span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    let taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    tasksToDoEl.appendChild(listItemEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase the task counter for the next unique id
    taskIdCounter++;
  }

  let createTaskActions = function(taskId) {
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

    let statusSelectEl = document.createElement("Select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    let statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i< statusChoices.length; i++) {
      // create an option element
      let statusOptionEl = document.createElement("option");
      statusOptionEl.textContent = statusChoices[i];
      statusOptionEl.setAttribute("value", statusChoices[i]);

      // append to select
      statusSelectEl.appendChild(statusOptionEl);



    }
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;

  };

formEl.addEventListener("submit", taskFormHandler);

