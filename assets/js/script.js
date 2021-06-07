var tasks = {}; 
document.getElementById("today-is").innerText = moment().format("[Today is] dddd");
var hour = +moment().format("HH");
var loopHour = 9;
console.log(hour);
var taskSection = document.getElementsByClassName("color-code");
// uses two counters and compares the currnt time to whether they should be gry red or green
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
//checking to see if we have tasks in local storage then we populate the input tags with values
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
  for(var key in tasks.toDo[0]){
    document.getElementById(key).value = tasks.toDo[0][key];
  }
}
//button value for saving to local storage
function saveLocalStorage(time){
 var inputValue = document.getElementById(time).value;
// console.log(inputValue);
 tasks.toDo[0][time] = inputValue;
 //console.log(tasks); 
 saveTasks();
 console.log(localStorage.getItem("tasks"));
}
var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// load tasks for the first time
loadTasks();


