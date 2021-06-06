var tasks = {};
//var 
document.getElementById("today-is").innerText = moment().format("[Today is] dddd");
var hour = +moment().format("HH");
var loopHour = 9;
console.log(hour);
var taskSection = document.getElementsByClassName("color-code");
for(var counter = 0; counter < taskSection.length; counter++){
  if(loopHour < hour){
    taskSection[counter].style.backgroundColor = "grey"
  } else if(loopHour == hour){
    taskSection[counter].style.backgroundColor = "red"
  } else if(loopHour > hour){
    taskSection[counter].style.backgroundColor = "green"
  }
  loopHour++;
}
function loadTasks(){
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!tasks) {
    tasks = {
      toDo: [{
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "",
        16: "",
        17: "",
      }]
    }
  }
  console.log(tasks)
}
function saveLocalStorage(time){
 var inputValue = document.getElementById(time).value;
 console.log(inputValue);
 tasks.toDo[0][time] = inputValue;
 console.log(tasks); 
}
var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
var createTask = function(taskText, taskDate, taskList) {
  // create elements that make up a task item
  var taskLi = $("<li>").addClass("list-group-item");
  var taskSpan = $("<span>")
    .addClass("badge badge-primary badge-pill")
    .text(taskDate);
  var taskP = $("<p>")
    .addClass("m-1")
    .text(taskText);

  // append span and p element to parent li
  taskLi.append(taskSpan, taskP);


  // append to ul list on the page
  $("#list-" + taskList).append(taskLi);
};
// modal was triggered
$("#task-form-modal").on("show.bs.modal", function() {
  // clear values
  $("#modalTaskDescription, #modalDueDate").val("");
});

// modal is fully visible
$("#task-form-modal").on("shown.bs.modal", function() {
  // highlight textarea
  $("#modalTaskDescription").trigger("focus");
});

// save button in modal was clicked
$("#task-form-modal .btn-primary").click(function() {
  // get form values
  var taskText = $("#modalTaskDescription").val();
  var taskDate = $("#modalDueDate").val();

  if (taskText && taskDate) {
    createTask(taskText, taskDate, "toDo");

    // close modal
    $("#task-form-modal").modal("hide");

    // save in tasks array
    tasks.toDo.push({
      text: taskText,
      date: taskDate
    });

    saveTasks();
  }
});

// remove all tasks
$("#remove-tasks").on("click", function() {
  for (var key in tasks) {
    tasks[key].length = 0;
    $("#list-" + key).empty();
  }
  saveTasks();
});

// load tasks for the first time
loadTasks();


