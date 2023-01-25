import './style.css';
import { saveToDos, displayTodos } from '../module/addRemove.js';
import { todos, todoListElement } from '../module/addRemove.js';

displayTodos();
const form = document.querySelector('.todo-input');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveToDos();
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});
