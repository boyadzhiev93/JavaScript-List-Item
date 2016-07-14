/* I create Interactive Java Script List where
 you can add yours Everyday tasks and delete tasks when you completed*/
//Get HTML elements
"use strict";
var textInput = document.getElementById('text-input');
var addButton = document.getElementsByTagName('button')[0];
var toDoItem = document.getElementById('to-do-item');
var completedItem = document.getElementById('completed-item');
// Create a function which creates a new task
var newTask = function(taskString){
  var listItem = document.createElement('li');
  var chakBox = document.createElement('input');
  var label = document.createElement('label');
  var editInput = document.createElement('input');
  var editButton = document.createElement('button');
  var deleteButton = document.createElement('button');
  var checkBox = document.createElement('input');
  checkBox.type ='checkbox';

  //Add attribute on some of the elements
  editInput.type = 'text';
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.innerText = 'Delete';
  deleteButton.className = 'delete';

  label.innerText = taskString;
  //Append matching elements to the element list
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', deleteTask);
  editButton.addEventListener('click', editTask);
  return listItem;
}
//add tasks
var addTask = function() {
  var listItem = newTask(textInput.value);
  toDoItem.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  textInput.value = '';
}
// set click handler on add button
addButton.addEventListener('click', addTask);

//delete tasks
var deleteTask = function() {

  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  ul.removeChild(listItem);
}

//edit tasks
var editTask = function() {
  var listItem = this.parentNode;
  var editInput = listItem.querySelector('input[type=text]');
  var label = listItem.querySelector('label');

  var containsClass = listItem.classList.contains('editMode');
  console.log(containsClass);
  if(containsClass){
    label.innerText = editInput.value;
  }else {
    editInput.value = label.innerText;
  }
  listItem.classList.toggle('editMode');
}
//when checkbox checked tasks go in completed
var bindTaskEvents = function(taskListItem, checkBoxEventHandler) {
  //select taskListItem children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  //bind checkBoxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;
}
//function for task complete
var taskCompleted = function() {
  //Append the task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedItem.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//function for task incomplete
var taskIncomplete = function() {
  //Append the task list item to the #incomplete-tasks
  var listItem = this.parentNode;
  toDoItem.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
}
