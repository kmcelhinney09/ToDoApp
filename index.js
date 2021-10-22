let todoLists = [];
const listToDisplay = [];
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('#todo_form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        createToDoList(e.target.new_todo_list.value)
        form.reset();
    })
    document.getElementById("remove_list").addEventListener('click',() =>{
        deleteTodoList();
    })
    document.getElementById("remove").addEventListener('click',() =>{
        deleteTodoList();
    })
})

function createToDoList(todoListTitle) {
    const todoList = {
        title: todoListTitle,
        todos: []
    }
    todoLists.push(todoList)
    displayList(todoListTitle)
    console.log(todoLists)
}

function displayList(Title){
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute("class","todo_box")
        
        const labelText = document.createElement("a");
        labelText.href = `./todoList.html?name=${Title}`
        labelText.textContent = Title;
        
        const displayListLabel = document.createElement("label");
        displayListLabel.appendChild(checkbox);
        displayListLabel.appendChild(labelText);

        const listItem = document.createElement("li");
        listItem.appendChild(displayListLabel)
        document.querySelector("#list_todos").appendChild(listItem);
}


function deleteTodoList(){
    console.log( document.getElementsByClassName("todo_box")[0].checked)
}
