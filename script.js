document.addEventListener("DOMContentLoaded", () => {
  const toDoInput = document.querySelector("#to-do-input");
  const toDoButton = document.querySelector("#to-do-button");
  const toDoList = document.querySelector("#to-do-list");

  // Load saved todos
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
  savedTodos.forEach(({ text, checked }) => addToDoElement(text, checked));

  // Add new todo
  function addToDo() {
    const text = toDoInput.value.trim();
    if (!text) return;
    addToDoElement(text);
    toDoInput.value = "";
    saveTodos();
  }

  function addToDoElement(text, checked = false) {
    const li = document.createElement("li");
    li.textContent = text;
    if (checked) li.classList.add("checked");

    li.addEventListener("click", () => {
      li.classList.toggle("checked");
      saveTodos();
    });

    li.addEventListener("dblclick", () => {
      li.remove();
      saveTodos();
    });

    toDoList.appendChild(li);
  }

  function saveTodos() {
    const todos = Array.from(toDoList.children).map(li => ({
      text: li.textContent,
      checked: li.classList.contains("checked")
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  // Event listeners
  toDoButton.addEventListener("click", addToDo);
  toDoInput.addEventListener("keypress", e => {
    if (e.key === "Enter") addToDo();
  });
});
