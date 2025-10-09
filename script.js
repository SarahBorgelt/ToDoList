//Event listener will only function after the HTML document has been completely loaded
document.addEventListener("DOMContentLoaded", () => {

  //Grab HTML elements to move into JavaScript and assign constants
  const toDoInput = document.querySelector("#to-do-input");
  const toDoButton = document.querySelector("#to-do-button");
  const toDoList = document.querySelector("#to-do-list");

  // Get a string from local storage under the key "todos"
  //JSON.parse converts the string back into an array of objects
  //If there is nothing in local storage, it defaults to an empty array
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  //Loop through the saved To-Dos. 
  //Desstructures each object to get the text and checked properties. More commonly seen as const taskText = todo.text;
  //Adds items to the DOM (Document Object Model)
  savedTodos.forEach(({ text, checked }) => addToDoElement(text, checked));


  // Create an "Add new ToDo" function
  function addToDo() {
    //Get the value of the input field and trim any extra spaces
    const text = toDoInput.value.trim();

    //Checks if the text is empty and stops immediately if so.
    if (!text) return;

    //Calls another function that creates a new HTML element.
    addToDoElement(text);

    //Clear the input field after the To-Do has been added
    toDoInput.value = "";

    //Save the updated list to local storage
    saveTodos();
  }


  //Defines the Add-To-Do function
  //checked = false sets the default value as false and text is the string for the to-do item
  function addToDoElement(text, checked = false) {

    //Creates a new list item element <li> in memory
    const li = document.createElement("li");

    //sets the text inside the <li> to whatever the user typed
    li.textContent = text;

    //If the checked parameter is true, it adds the "checked" class to the <li>
    if (checked) li.classList.add("checked");

    //Adds a click event listener to to <li>
    li.addEventListener("click", () => {

      //Toggles the "checked" class if it is missing or removes it if it is present
      li.classList.toggle("checked");

      //Saves the updated To-Do list in local storage
      saveTodos();
    });

    //Adds a double-click event listener to the <li>
    li.addEventListener("dblclick", () => {

      //if the user double-clicks, it removes the <li> from the DOM
      li.remove();

      //Saves the updated To-Do list in local storage after an item has been removed
      saveTodos();
    });

    //Takes the <li> element created in addToDoElement and adds it to the DOM so it becomes visible on the page
    toDoList.appendChild(li);
  }

  //Create a new function called saveTodos
  function saveTodos() {

    //Converts the HTML collection of <li> elements into an array so we can use a map method
    //.map(li => ({ text: li.textContent, checked: li.classList.contains("checked") })) loops through
    //each <li> element and creates a new object with the text and checked properties
    const todos = Array.from(toDoList.children).map(li => ({
      text: li.textContent,
      checked: li.classList.contains("checked")
    }));

    //Converts the array of objects into a string using JSON.stringify
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  //Adds an event listener for click to run the addToDo function
  toDoButton.addEventListener("click", addToDo);

  //Adds an event listener for keypress to run the addToDo function when the Enter key is pressed
  toDoInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addToDo();
  });
});
