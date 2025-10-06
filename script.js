class ToDo {
  constructor(toDoText, checked = false) {
    this.toDoText = toDoText;
    this.checked = checked;
    this.createToDoElement();
  }

  createToDoElement() {
    this.toDoElement = document.createElement("li");
    this.toDoElement.textContent = this.toDoText;

    if (this.checked) {
      this.toDoElement.classList.add("checked");
    }

    this.toDoElement.addEventListener("click", () => {
      this.checked = !this.checked; // Update state
      this.toDoElement.classList.toggle("checked");
      this.save(); // Save immediately
    });

    this.toDoElement.addEventListener("dblclick", () => {
      this.remove();
      this.save(); // Save immediately
    });
  }

  save() {
    ToDoMaker.saveToLocalStorage();
  }

  remove() {
    this.toDoElement.remove();
  }
}


class ToDoMaker {
  constructor() {
    this.toDoInput = document.querySelector("#to-do-input");
    this.toDoButton = document.querySelector("#to-do-button");
    this.toDoList = document.querySelector("#to-do-list");

    this.todos = []; // Keep track of ToDo instances

    this.makeEventListeners();
    this.loadFromLocalStorage(); // Load saved todos on page load
  }

  addToDo() {
    let toDoText = this.toDoInput.value.trim();
    if (toDoText !== "") {
      const toDo = new ToDo(toDoText);
      this.todos.push(toDo);
      this.toDoList.appendChild(toDo.toDoElement);
      this.toDoInput.value = "";
      toDo.save();
    }
  }

  makeEventListeners() {
    this.toDoButton.addEventListener("click", () => this.addToDo());
    this.toDoInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") this.addToDo();
    });
  }

  static saveToLocalStorage() {
    const listItems = document.querySelectorAll("#to-do-list li");
    const todos = [];
    listItems.forEach(item => {
      todos.push({
        text: item.textContent,
        checked: item.classList.contains("checked")
      });
    });
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  loadFromLocalStorage() {
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.forEach(todoData => {
      const toDo = new ToDo(todoData.text, todoData.checked);
      this.todos.push(toDo);
      this.toDoList.appendChild(toDo.toDoElement);
    });
  }
}

const makeItWork = new ToDoMaker();
