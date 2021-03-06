const todoList = []
const editItems = []
document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        const description = e.target.new_todo.value
        const priority = e.target.priority_select.value
        const dateItemIsDue = e.target.dueDate.value
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
    if (dateItemIsDue === "") {
        labelText.innerText = toDo
    } else {
        const dateSplit = dateItemIsDue.split("-")
        const newDate = [dateSplit[1], dateSplit[2], dateSplit[0]]
        newDateItemIsDue = newDate.join("/")
        labelText.innerText = toDo + " , Due: " + newDateItemIsDue
    }
    label.appendChild(checkbox)
    label.appendChild(labelText)

    const listItem = document.createElement("li")
    listItem.appendChild(label)
    listItem.setAttribute("class", priority_level)

    return [priority_level, listItem, newDateItemIsDue]
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

        const oldDescription = (itemToEdit[1].innerText).split(",")

        form.new_todo.value = oldDescription[0]

        form.priority_select.value = itemToEdit[0]

        const dateToInput = itemToEdit[2]
        const dateToInputSplit = dateToInput.split("/")
        const newDateToInput = [dateToInputSplit[2], dateToInputSplit[0], dateToInputSplit[1]].join("-")
        form.dueDate.value = newDateToInput

        document.getElementById("save_edit").onclick = function() { SaveEdit(indexOfItem) }
    } else {
        document.getElementById("submit").style.display = "inline"
        document.getElementById("save_edit").style.display = "none"
    }
}

function SaveEdit(indexOfItem) {
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