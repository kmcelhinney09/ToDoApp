const todoLists = [];
const listToDisplay = [];

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        createToDoList(e.target.new_todo_list.value)
        form.reset();
    })
    document.getElementById("remove_list").addEventListener('click',() =>{
        deleteTodoList();
    })
})

function createToDoList(todoListTitle) {
    todoLists.push(
        {
            title: todoListTitle,
            todos: []
        }
    )
    displayList(todoListTitle)
}

function displayList(Title){
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.setAttribute("class","todo_box")
        
        const labelText = document.createElement("a");
        labelText.href = "./todoList.html?name=                " + Title
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
