console.log("script.js is loaded");

var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 

    // stop the form from reloading
    event.preventDefault();

    var listItemEl = document.createElement("li"); 
    listItemEl.className = "task-item"; 
    listItemEl.textContent = "This is a new task."; 
    tasksToDoEl.appendChild(listItemEl); 
  }; 

formEl.addEventListener("submit", createTaskHandler);

