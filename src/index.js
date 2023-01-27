import './style.css';
import {
  saveToDos,
  displayTodos,
  clearAll,
  UpdateStatus,
} from '../module/addRemove.js';
import { todos } from '../module/addRemove.js';
//import { UpdateStatus } from '../module/update.js';

displayTodos();
UpdateStatus();
const form = document.querySelector('.todo-input');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  saveToDos();
  displayTodos();
  UpdateStatus();

  localStorage.setItem('todos', JSON.stringify(todos));
});
clearAll();
