'use strict'

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


let toDoData = [];

window.onunload = function() {
    localStorage.setItem('items', JSON.stringify(toDoData));
};


if (localStorage.getItem('items')) {
    toDoData = JSON.parse(localStorage.getItem('items'))
}else{
    toDoData = [];
};

const render = () => {

    // Очищаем содержимое строк
    todoList.innerHTML = '';
    todoCompleted.innerHTML = '';

    toDoData.forEach((item, i) =>{

        // Создаем нашу li
        const li = document.createElement('li');
        li.classList.add('todo-item');

        //Вставляем верстку в нашу li
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        // Реализуем работу выполненных/ не выполненных дел
        if(item.completed) {
            todoCompleted.append(li)
        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', () =>{
            item.completed = !item.completed;
            render();
        });
        // Реализуем удаление элемента
        const todoRemove = li.querySelector('.todo-remove');
        todoRemove.addEventListener('click', function () {
            toDoData.splice(i, 1);
            render();
        })

    })
}

todoControl.addEventListener('submit', (event) => {
    event.preventDefault();

    const newToDo = {
        text: headerInput.value,
        completed: false
    }
    // Проверка на пустую строку и добавление нового дела
    if(headerInput.value !== ''){
    toDoData.push(newToDo);
    headerInput.value = '';
    };
    render();
})
render();