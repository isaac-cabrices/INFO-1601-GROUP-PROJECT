//CREATE CARDS
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

    if(document.getElementById('title').value != "" && document.getElementById('todo').value != "" ){
        //get form data into object
        let habitInfo = {
            id: Date.now(),
            habitTitle: document.getElementById('title').value,
            numRepeats: document.getElementById('todo').value,
            description: document.getElementById('description').value,
            completed: 0
        }

        //put form data object onto habits array
        habitsList = JSON.parse(localStorage.getItem("SavedHabits"));
        habitsList.push(habitInfo);
        console.log(habitsList);

        //reset form
        document.getElementById('addTaskForm').reset();

        //save to local storage
        localStorage.setItem('SavedHabits', JSON.stringify(habitsList));

        createHabitCard(habitInfo);
    }
    else {
        alert("Invalid card. Enter card details to create card.");
    }
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
    pbars += '<div class="progress-bar" onClick="updateProgress(this)"></div>'
}
cardsPosition.innerHTML += `
    <div id="${info.id}" class="card">
        <div class="habit-title">
            <h1>${info.habitTitle}</h1>
        </div>
        <div class="delete-button" onClick="deleteCard(this)">X</div>
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
        alert("No Habits Stored");
    }
    else{
        for(let habit in habitArray){
            habit = habitArray[habit];
            console.log(habit);
            let i = 0;
            let cardsPosition = document.querySelector('.cards-wrapper');
            let pbars = '';
            for(i = 0; i < habit.numRepeats; i++){
                pbars += '<div class="progress-bar" onClick="updateProgress(this)"></div>'
            }
            cardsPosition.innerHTML += `
                <div id="${habit.id}" class="card">
                    <div class="habit-title">
                        <h1>${habit.habitTitle}</h1>
                    </div>
                    <div class="delete-button" onClick="deleteCard(this)">X</div>
                    <div class="progress-bars">  
                    ${pbars}
                    </div>
                </div> 
                `
        }
    } 
}
window.onload = displayCardsOnReload;

 
//DELETE CARD
function deleteCard(delButtn){
    let parent = delButtn.parentNode;
    parent.remove();
    let habitArray = JSON.parse(localStorage.getItem("SavedHabits"));
    console.log(habitArray);
    for(let i = 0; i < habitArray.length; i++){
        if(habitArray[i].id == parent.id)
            habitArray.splice(i, 1);    //remove card frrom array
    }
    localStorage.setItem('SavedHabits', JSON.stringify(habitArray));
    console.log(habitArray);
}

//CHANGE PROGRESS
let barsCompleted = 0;
function updateProgress(bar){
    let id = bar.parentNode.parentNode.id;
    let change = document.getElementById(id);
    let habitArray = JSON.parse(localStorage.getItem("SavedHabits"));
    let info = habitArray.find(function(habit, index){
        if(habit.id == id)
            return true;
    });
    console.log(info);
}



