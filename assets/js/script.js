console.log("script.js is loaded");

var formEl = document.querySelector("#task-form"); 
var tasksToDoEl = document.querySelector("#tasks-to-do"); 

var createTaskHandler = function() { 

    // stop the form from reloading
    event.preventDefault();

    //Using [] selects an html element by one of its attribu
    var taskNameinput = document.querySelector("input[name='task-name']").value;
    //console.log(taskNameinput);
    //console.dir(taskNameinput);
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    //create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    //create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add html content to div
    // using innerHTML lets us insert html in a string
    taskInfoEl.innerHTML = "<h3 class='task-name'> " + taskNameinput + " </h3<span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    //add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    
  }; 

formEl.addEventListener("submit", createTaskHandler);

