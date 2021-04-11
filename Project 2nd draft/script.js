
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
