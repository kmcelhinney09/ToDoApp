const todoList = []
const editItems = []
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    let dateItemIsDue = "";
    form.addEventListener('submit', e => {
        e.preventDefault();
        const description = e.target.new_todo.value
        const priority = e.target.priority_select.value
        const Date = e.target.dueDate.value
        if (Date === "") {
            dateItemIsDue = "0"
        } else {
            const dateSplit = Date.split("-")
            const newDate = [dateSplit[1], dateSplit[2], dateSplit[0]]
            dateItemIsDue = newDate.join("/")
        }
        todoList.push(buildToDo(priority, description, dateItemIsDue))
        displayToDoList()
        form.reset();
    })
    const edit = document.querySelector('#edit')
    const unedit = document.querySelector('#unedit')
    const remove = document.querySelector('#remove')

    edit.addEventListener('click', () => {
        createEditToDoList()
    });

    remove.addEventListener('click', () => {
        deletToDoItem();
    })
})

function buildToDo(priority_level, toDo, dateItemIsDue) {
    if (priority_level === "") {
        priority_level = "low"
    }
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"
    checkbox.setAttribute("class", "todo_box")

    const label = document.createElement("label")
    const labelText = document.createElement("span")
    if (dateItemIsDue === "0") {
        labelText.innerText = toDo
    } else {
        labelText.innerText = toDo + " .............Due: " + dateItemIsDue
    }

    label.appendChild(checkbox)
    label.appendChild(labelText)

    const listItem = document.createElement("li")
    listItem.appendChild(label)
    listItem.setAttribute("class", priority_level)

    return [priority_level, listItem, dateItemIsDue]
}

function displayToDoList() {
    for (const todo of todoList) {
        document.getElementById("todo_list").appendChild(todo[1]);
    }

}

function deletToDoItem() {
    const checkedItems = document.getElementsByClassName("todo_box")
    for (const checkedItem of checkedItems) {
        if (checkedItem.checked === true) {
            const labelOfItem = checkedItem.parentNode
            labelOfItem.parentNode.remove()
        }
    }
}

function createEditToDoList() {

    const checkedItems = document.getElementsByClassName("todo_box")
    for (const checkedItem of checkedItems) {
        if (checkedItem.checked === true) {
            editItems.push(checkedItem.nextElementSibling.outerText);
        }
    }
    editToDo();

}

function editToDo() {
    if (editItems.length > 0) {
        document.getElementById("submit").style.display = "none"
        document.getElementById("save_edit").style.display = "inline"
        const itemToEdit = todoList.find(arr => arr[1].innerText === editItems[0])
        const indexOfItem = todoList.indexOf(itemToEdit);
        const form = document.querySelector('form')
        form.new_todo.value = itemToEdit[1].innerText
        form.priority_select.value = itemToEdit[0]
        form.dueDate.value = itemToEdit[2]
        document.getElementById("save_edit").onclick = function() { SaveEdit(indexOfItem) }
    } else {
        document.getElementById("submit").style.display = "inline"
        document.getElementById("save_edit").style.display = "none"
    }
}

function SaveEdit(indexOfItem) {
    console.log("Save has been called")
    let dateDue = ""
    const form = document.querySelector('form')
    const desc = form.new_todo.value
    const priority = form.priority_select.value
    const dueDateOfItem = form.dueDate.value
    if (dueDateOfItem === "") {
        dateDue = "0"
    } else {
        dateDue = dueDateOfItem;
    }
    todoList.splice(indexOfItem, 1, buildToDo(priority, desc, dateDue))
    editItems.shift()
    form.reset()
    deletToDoItem()
    displayToDoList()
    editToDo()
}