
//Deleting cards

function prepCards() {
  
  var i = 1;
  var ids = [];

  var counting = true;
  while(counting === true) {

    var name = "#card" + i;
    var c = document.querySelector(name);

    if(c) {
      //console.log('Exists');
      ids.push(i)
    }
    else {
      //console.log('Does not exist');
      counting = false;
    }

    i = i + 1;
  }

  return ids;
}

function deleteCard(id) {

  if (confirm('Are you sure you want to delete this card?')) {
    document.querySelector("#card" + id).remove();
  }

}

var ids = prepCards();
for(let id of ids) {
  document.querySelector("#delbut" + id).addEventListener('click', function() {
    deleteCard(id);
  });
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("formBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

/*
const tasks = [];
//This is the object that holds all the user data. Example format:
//    id: Date.now(),
//    name: "Example task",
//    description: "This in an example task. Create 3 tasks.",
//    todo: 3,
//    completed: 0

// This function adds data to the tasks object, and then stores that object in local storage.
const addToList = (event)=>{
    if(document.getElementById('title').value != "" && document.getElementById('todo').value != "" ){
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
        modal.style.display = "none";
    }
    else{
        alert("Invalid entry");
      }
}

function removedata(index){
    var newTasks = store.get('tasklist');
    newTasks.splice(index, 1);
    store.set('tasklist', newTasks);
}

document.addEventListener('DOMContentLoaded', ()=> { //checks that the page is loaded first
    document.getElementById('inputButton').addEventListener('click', addToList);
});*/


var submitButton = document.getElementById('inputButton');
//when submit is pressed, move form
submitButton.onclick = function() {
    modal.style.display = "none";
}

//Get Info from form to create habit card
let habitsList = [];
const createNewHabit = (e)=>{
    //prevent form from submitting as default
    e.preventDefault();

    //get form data into object
    let habitInfo = {
        id: Date.now(),
        habitTitle: document.getElementById('title').value,
        numRepeats: document.getElementById('todo').value,
        description: document.getElementById('description').value
    }

    //put form data object onto habits array
    habitsList.push(habitInfo);
    console.log(habitsList);

    //reset form
    document.getElementById('addTaskForm').reset();

    //save to local storage
    localStorage.setItem('SavedHabits', JSON.stringify(habitsList));

    createHabitCard(habitInfo);
}

//Create habit card using form info from function above
function createHabitCard(data){
let habitArray = JSON.parse(localStorage.getItem("SavedHabits"));
let info = habitArray.find(function(habit, index){
    if(habit.id == data.id)
        return true;
});
let i = 0;
let cardsPosition = document.querySelector('.cards-wrapper');
let pbars = '';
for(i = 0; i < info.numRepeats; i++){
    pbars += '<div class="progress-bar"></div>'
}
cardsPosition.innerHTML += `
    <div id="${info.id}" class="card">
        <div class="habit-title">
            <h1>${info.habitTitle}</h1>
        </div>
        <div id="delbut1" class="delete-button">X</div>
        <div class="progress-bars">  
        ${pbars}
        </div>
    </div> 
        `
}

document.addEventListener('DOMContentLoaded', ()=> {
    submitButton.addEventListener('click', createNewHabit);
});

//When page reloaded, read local storage to get all habit cards
function displayCardsOnReload(){
    let habitArray = JSON.parse(localStorage.getItem("SavedHabits"));
    if(habitArray.length === 0){
        console.log("No Habits Stored");
    }
    else{
        for(let habit in habitArray){
            habit = habitArray[habit];
            console.log(habit);
            let i = 0;
            let cardsPosition = document.querySelector('.cards-wrapper');
            let pbars = '';
            for(i = 0; i < habit.numRepeats; i++){
                pbars += '<div class="progress-bar"></div>'
            }
            cardsPosition.innerHTML += `
                <div id="${habit.id}" class="card">
                    <div class="habit-title">
                        <h1>${habit.habitTitle}</h1>
                    </div>
                    <div id="delbut1" class="delete-button">X</div>
                    <div class="progress-bars">  
                    ${pbars}
                    </div>
                </div> 
                `
        }
    } 
}
window.onload = displayCardsOnReload;


