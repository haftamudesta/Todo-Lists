import { todos, displayTodos } from './addRemove.js';
const UpdateStatus = () => {
  const checkBox = document.querySelectorAll('.check-box');
  checkBox.forEach((checks) => {
    checks.addEventListener('change', (event) => {
      let target = event.target.parentElement;
      todos[target.id].completed = 'true';
      displayTodos();
      localStorage.setItem('todos', JSON.stringify(todos));
      if (checks.checked) {
        target.classList.add('check-through');
      } else {
        target.classList.remove('check-through');
        todos[target.id].completed = 'false';
        displayTodos();
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    });
  });
};
export { UpdateStatus };
