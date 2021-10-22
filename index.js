document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        buildToDo(e.target.new_todo.value);
        form.reset();
    })
    let edit = document.querySelector('#edit')
    let unedit = document.querySelector('#unedit')

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
})

function buildToDo(toDo) {
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const label = document.createElement("label")
    const labelText = document.createElement("span")
    labelText.textContent = toDo

    label.appendChild(checkbox)
    label.appendChild(labelText)

    const listItem = document.createElement("li")
    listItem.appendChild(label)

    document.getElementById("todo_list").appendChild(listItem);

}

function buildDeleteBtn() {
    const todoItems = document.querySelectorAll('.todo_item');
    if (todoItems.length > 0) {
        for (const item of todoItems) {
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.addEventListener('click', handleDeleteToDo)
            item.appendChild(deleteBtn);
        }
        return true
    }
    else {
        alert("Must have ToDo items to edit them")
        return false
    }
}

function destoryDeleteBtn() {
    const todoItems = document.querySelectorAll('.todo_item');
    if (todoItems.length > 0) {
        for (const item of todoItems) {
            item.lastChild.remove();
        }
    }
    else {
        alert("No Items to unedit")
    }
}
function handleDeleteToDo(e) {
    e.target.parentNode.remove();
}