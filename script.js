//Deleting cards

function deleteCard(card) {

  if (confirm('Are you sure you want to delete this card?')) {
    document.getElementById(card.id).remove();
  }

}
//Gets all the cards currently in the site by the .card class
var cards;
cards = document.querySelectorAll(".card");

//For every card in the cards array sets an event listener on the delete button.
for(let card of cards) {
  card.querySelector(".delete-button").addEventListener('click', function() {
    deleteCard(card);
  });
}


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

function removeData(index){
    let list = store.get('SavedHabits');

    if(list[index].numRepeats == 0){
        alert(`Congrats! you completed task "${list[index].habitTitle}"`)
        var newTasks = store.get('SavedHabits');
        newTasks.splice(index, 1);
        store.set('SavedHabits', newTasks);
        let cardsPosition = document.querySelector('.cards-wrapper');
        cardsPosition.innerHTML = "";
        displayCardsOnReload();
    }
    else{
        if (confirm('Are you sure you want to delete this card?')) {
            var newTasks = store.get('SavedHabits');
            newTasks.splice(index, 1);
            store.set('SavedHabits', newTasks);
            let cardsPosition = document.querySelector('.cards-wrapper');
            cardsPosition.innerHTML = "";
            displayCardsOnReload();

        }
    }
}

// increments
document.querySelector('#cw').addEventListener("click",  function(e){

      if(e.target.id !=  "delbut1"){
          let list = store.get('SavedHabits');// this gets the array

          let taskID = e.target.parentNode.id; // gets the ID of the card

          let loc = e.target.id;

          let index = 0;
          for (var i = 0; i < list.length; i++) {
              if(list[i].id == taskID){
                  index = i; // gets index of the card in the object array
              }
          }

          let taskbars = list[index].numRepeats;

          let delPosition = taskbars-1;
          let parent = e.target;
          let div = e.target.children[delPosition];
          if(div){
              parent.removeChild(div);
              list[index].numRepeats--;
              store.set('SavedHabits', list);
          }

          if (list[index].numRepeats==0) {
              removeData(index);
          }
      }// end if

}) ;



var submitButton = document.getElementById('inputButton');
//when submit is pressed, move form
submitButton.onclick = function() {
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', ()=> {
    submitButton.addEventListener('click', createNewHabit);
});

//Get Info from form to create habit card
let habitsList = [];
const createNewHabit = (e)=>{
    if(document.getElementById('title').value == "" || document.getElementById('todo').value == "" ){
        alert("invalid card");
    }
    else{
      //prevent form from submitting as default
      e.preventDefault();

      //get form data into object
      let habitInfo = {
          id: Date.now(),
          habitTitle: document.getElementById('title').value,
          numRepeats: document.getElementById('todo').value,
          description: document.getElementById('description').value,
      }

      //put form data object onto habits array. Appends it to existing list so as to not delete it.
      var oldHabits = store.get('SavedHabits');
      oldHabits.push(habitInfo);
      console.log(oldHabits);

      //reset form
      document.getElementById('addTaskForm').reset();

      //save to local storage
      store.set('SavedHabits', oldHabits);

      let cardsPosition = document.querySelector('.cards-wrapper');
      cardsPosition.innerHTML = "";
      displayCardsOnReload();
    }
}

//When page reloaded, read local storage to get all habit cards
function displayCardsOnReload(){
    let count = 0;
    let habitArray = store.get("SavedHabits");
    if(habitArray == undefined){ // this if loop accounts for when there is no object created as yet.
    store.set('SavedHabits', habitsList);
      habitArray = store.get("SavedHabits");
    }

    if(habitArray.length === 0){
        alert("No Habits Stored");
    }
    else{
        for(let habit in habitArray){
            habit = habitArray[habit];
            //console.log(habit);
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
                    <div id="delbut1" class="delete-button" onclick="removeData(${count})">X</div>
                    <div id="progress-bars${count}" class="progress-bars">
                    ${pbars}
                    </div>
                </div>
                `;
            count++;

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
