
// User data

const tasks = [];
//This is the object that holds all the user data. Example format:
//    id: Date.now(),
//    name: "Example task",
//    description: "This in an example task. Create 3 tasks.",
//    todo: 3,
//    completed: 0

// This function adds data to the tasks object, and then stores that object in local storage.
const addToList = (event)=>{
  event.preventDefault();
    let task = { // gets the data from the form.
        id: Date.now(),
        name: document.getElementById('title').value,
        description: document.getElementById('description').value,
        todo: document.getElementById('todo').value,
        completed: 0
    }
    var oldTasks = store.get('tasklist');
    oldTasks.push(task);
    document.querySelector('form').reset(); //resets the fields.

    store.set('tasklist', oldTasks);
}

// when we print the tasks, their delete buttons should be matched with an index
// (using a variable counter that matches with their index in the array)
// so that when we call this removeTask function, it knows which one to remove.
//eg. at counter 0:
// <button onclick="removeTask(${tasks}, ${counter})" > delete task </a>

//function removeTask(list, index){ // This is only for testing. pair up with below line
const removeFromList = (event)=>{
    event.preventDefault();
    let index = prompt("INDEX TO REMOVE?"); // This is only for testing. Pair up with above line
    var newTasks = store.get('tasklist');
    if(index > newTasks.length || index < 0){
      newTasks.splice(index, 1);
      store.set('tasklist', newTasks);
    }
    else{
      alert("Error! index not valid.");
    }
}

// Listens for click in the form. Maybe it's better to have this with the forms html if it causes any errors.
document.addEventListener('DOMContentLoaded', ()=> { //checks that the page is loaded first
    document.getElementById('button').addEventListener('click', addToList); // button ID in the form
    //document.getElementById('deleteB').addEventListener('click', removeTask);
});

//------------------

//One page navigation

//Executes script for whatever page is called.
function executeScripts(){
  let script = document.querySelector('script').innerText;
  try{
    eval(script);
  }catch(oops){
    console.error(oops);
  }
}

//Puts content from url(or html file) into the main content container
async function loadContent(title,url) {

  document.title = title;
  let content = document.querySelector('#main-content');

  if(url == null) {
    content.innerHTML = "";
  }
  else {
    let response = await fetch(url);
    content.innerHTML = await response.text();
    executeScripts();
  }
}

//Prevents the page from shifting and sends the intentions to loadContent.
function pageShift(event){

  event.preventDefault();
  event.stopPropagation();

  let a = event.target;
  let text = a.text;
  let url = a.href;
  history.pushState({title:text, url: url}, null, a.href);
  loadContent(a.text, a.href);
}

//Identifies the nav bar and intercepts clicks on links.
const navBar = document.querySelector('#navi');
navBar.addEventListener('click', pageShift, false);

//Loads the content of the last subpage on site.
function backPage(event){

  if(event.state == null){
    loadContent(null, null);
  }
  else{
    loadContent(event.state.title, event.state.url);
  }
}

//Executes backPage when user presses the back putton in their browser.
window.addEventListener('popstate', backPage);
