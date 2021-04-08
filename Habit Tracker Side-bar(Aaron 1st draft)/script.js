
//This is the object that holds all the user data
let tasks = [
//  {
//    id: 0,
//    name: "Example task",
//    description: "This in an example task. Create 3 tasks of your own!",
//    todo: 3,
//    completed: 0
//  }
];

//        const loadTasks = function(){
//
//          };

// This function adds data to an object, and then stores that object in local storage.
const addTask = function(event){
    event.preventDefault();
    let task = { // gets the data from the form.
        id: Date.now(),
        name: document.getElementById('title').value,
        description: document.getElementById('description').value,
        todo: document.getElementById('todo').value,
        completed: 0
    }
    tasks.push(task); // appends the form data to the object.
    document.querySelector('form').reset(); //resets the fields.

    localStorage.setItem('TaskList', JSON.stringify(tasks)); // stored locally. Stringify cause it has to be stored as a string.
}

document.addEventListener('DOMContentLoaded', ()=> { // listens for the click in the form.
    document.getElementById('button').addEventListener('click', addTask);
});



// Everything below this line was added by crowbar72, I am merely merging it with what I have.


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
const navBar = document.querySelector('#nav-bar');
//if(navBar){    // I'm pretty sure the error's only happening cause there's nothing to yet for when you click the sidenav buttons. Uncomment the if to have it disappear until you click the side-nav buttons.
    navBar.addEventListener('click', pageShift, false);
//}

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