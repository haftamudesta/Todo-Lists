import { todos } from './addRemove.js';
const UpdateStatus = () => {
  const checkBox = document.querySelectorAll('.check-box');
  checkBox.forEach((checks) => {
    checks.addEventListener('change', (event) => {
      let target = event.target.parentElement;

      if (checks.checked) {
        target.classList.add('check-through');
        todos[target.id].completed = 'true';
        localStorage.setItem('todos', JSON.stringify(todos));
      } else {
        target.classList.remove('check-through');
        todos[target.id].completed = 'false';
        localStorage.setItem('todos', JSON.stringify(todos));
      }
    });
  });
};
export { UpdateStatus };
