import '../src/style.css';
import { saveToDos, displayTodos, clearAll } from '../module/addRemove.js';
import { todos } from '../module/addRemove.js';
import { UpdateStatus } from '../module/update.js';

displayTodos();
UpdateStatus();
clearAll();
const form = document.querySelector('.todo-input');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveToDos();
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});
