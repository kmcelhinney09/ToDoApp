const todoList = []
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        const description = e.target.new_todo.value
        const priority = e.target.priority_select.value
        const dueDate = e.target.dueDate.value
        buildToDo(priority,description,dueDate);
        form.reset();
    })
    const edit = document.querySelector('#edit')
    const unedit = document.querySelector('#unedit')
    const remove = document.querySelector('#remove')

    edit.addEventListener('click', () => {
        let deleteStatus = buildDeleteBtn()
        if (deleteStatus == true) {
            unedit.style.display = "inline";
            edit.style.display = "none"
        }
    });

    unedit.addEventListener('click', () => {
        destoryDeleteBtn()
        unedit.style.display = "none";
        edit.style.display = "inline"
    });

    remove.addEventListener('click', () =>{
        deletToDoItem();
    })
})

function buildToDo(priority_level,toDo,dueDate) {
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.setAttribute("class","todo_box")

    const label = document.createElement("label")
    const labelText = document.createElement("span")
    labelText.textContent = toDo

    label.appendChild(checkbox)
    label.appendChild(labelText)

    const listItem = document.createElement("li")
    listItem.appendChild(label)
    listItem.setAttribute("class",priority_level)

    

    todoList.push([priority_level,listItem,dueDate])
    displayToDoList();
}

function displayToDoList(){
    for(const todo of todoList){
        document.getElementById("todo_list").appendChild(todo[1]);
    }

}

function deletToDoItem(){
    const checkedItems = document.getElementsByClassName("todo_box")
    for(const checkedItem of checkedItems){
        if(checkedItem.checked === true){
            checkedItem.parentNode.remove()
        }
    }
}