document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    form.addEventListener('submit', e => {
        e.preventDefault();
        buildToDo(e.target.new_todo.value);
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

function buildToDo(toDo) {
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

    document.getElementById("todo_list").appendChild(listItem);

}

function deletToDoItem(){
    const checkedItems = document.getElementsByClassName("todo_box")
    for(const checkedItem of checkedItems){
        if(checkedItem.checked === true){
            console.log(checkedItem.parentNode.remove())
        }
    }
}