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
