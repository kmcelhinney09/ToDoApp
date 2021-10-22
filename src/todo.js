document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form')
    const url = document.location.href
    console.log(url.split('='))
    // form.addEventListener('submit', e => {
    //     e.preventDefault();
    //     createToDoList(e.target.new_todo_list.value)
    //     form.reset();
    // })
    // document.getElementById("remove_list").addEventListener('click',() =>{
    //     deleteTodoList();
    // })
})