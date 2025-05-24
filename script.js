class ToDo {
	constructor(toDoText){
  	this.toDoText = toDoText;
  	this.createToDoElement();
  }
  
  createToDoElement() {
  	this.toDoElement = document.createElement("li");
  
  	this.toDoElement.textContent = this.toDoText;
  
  	this.toDoElement.addEventListener("click", () => {
  		this.toDoElement.classList.toggle("checked");
  	});
	
  	this.toDoElement.addEventListener("dblclick", () => {
  		this.toDoElement.remove();
  });
  }
}


class ToDoMaker {
	constructor() {
  this.toDoInput = document.querySelector("#to-do-input");
  this.toDoButton = document.querySelector("#to-do-button");
  this.toDoList = document.querySelector("#to-do-list");
  
  this.makeEventListeners();
  }
  
 addToDo() {
  let toDoText = this.toDoInput.value.trim();
  
  if (toDoText !== ""){
  let toDo = new ToDo(toDoText);
  
  this.toDoList.appendChild(toDo.toDoElement);
  
  this.toDoInput.value = "";
  }
 }
	  
  makeEventListeners(){
  	this.toDoButton.addEventListener("click", () =>{
    this.addToDo();
  })
  
  this.toDoInput.addEventListener("keypress", (e) => {
  	if (e.key === "Enter"){
 		this.addToDo();
  	}
  })
 }
}

makeItWork = new ToDoMaker()
