console.log("script.js is loaded");

var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

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

    // create div to hold the task info and add it to the list item
    let taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
     // using innerHTML lets us insert html in a string
    taskInfoEl.innerHTML  = "<h3 class='task-name'> " + taskDataObj.name + " </h3<span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);



  }

formEl.addEventListener("submit", taskFormHandler);

