let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editing = -1;
const toDoInput = document.querySelector('#new-list');
const todoListElement = document.querySelector('.to-do-list');

const saveToDos = () => {
  const todovalue = toDoInput.value;
  const isDuplicate = todos.some((todo) => todo.value === todovalue);
  if (todovalue === '') {
    notifyUser('To do list can not be empty!');
  } else if (isDuplicate) {
    notifyUser('it is already in you list. please add another.');
  } else {
    if (editing >= 0) {
      todos = todos.map((todo, index) => {
        return {
          value: index === editing ? todovalue : todo.value,
          completed: todo.completed,
          index: index,
        };
      });
      editing = -1;
    } else {
      todos.push({
        value: todovalue,
        completed: false,
        index: todos.length,
      });
    }
    toDoInput.value = '';
  }
};

const displayTodos = () => {
  if (todos.length === 0) {
    todoListElement.innerHTML =
      '<center>Nothing to do yet! please add to do list </center>';
    return;
  }
  todoListElement.innerHTML = '';
  todos.forEach((todo, index) => {
    todoListElement.innerHTML += `
    <div class="todo" id="${index}">
    <input type="checkbox" class="check-box" />
    <p class="list-element  data-action="check" >${todo.value}</p>
    
    <div class="setting">
    <div class="ellips-vertical">
    <i class="fa-solid fa-ellipsis-vertical" ></i>
    </div>
    <div class="edit-delete">
  <i class="fa-sharp fa-solid fa-trash" data-action="delete"></i>
    </div>
  </div>
  </div>
        `;
  });
  const unhide = document.querySelectorAll('.ellips-vertical');
  const showElement = document.querySelector('.edit-delete');
  const todoClass = document.querySelector('.todo');

  unhide.forEach((element) =>
    element.addEventListener('click', (e) => {
      if (e.target.classList.contains('fa-solid')) {
        showElement.classList.toggle('show-menu');
        todoClass.style.backgroundColor = 'goldenrod';
      } else {
        todoClass.style.backgroundColor = 'white';
      }
    })
  );
};

todoListElement.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'to-do-list') {
    const todo = parentElement;
    const todoId = Number(todo.id);
    const action = target.dataset.action;
    action === 'check' && checkTodo(todoId);
    action === 'delete' && deleteTodo(todoId);
  }
});

const checkTodo = (todoId) => {
  todos = todos.map((todo, index) => {
    if (index === todoId) {
      return {
        value: todo.value,
        completed: !todo.completed,
        index: index,
      };
    } else {
      return {
        value: todo.value,
        completed: todo.completed,
        index: index,
      };
    }
  });
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
};

const deleteTodo = (todoId) => {
  todos = todos.filter((todo, index) => index !== todoId);
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
};

const notifyUser = (message) => {
  const notification = document.querySelector('.show-notification');
  notification.classList.add('notification-element');
  notification.innerHTML = message;
  toDoInput.value = '';
  setTimeout(() => {
    notification.classList.remove('notification-element');
    toDoInput.value = '';
  }, 1000);
};

const clearAll = () => {
  const clearElements = document.querySelector('.clear-completed');
  clearElements.addEventListener('click', () => {
    todos = todos.filter((todo) => todo.completed === false);
    displayTodos();
    localStorage.setItem('todos', JSON.stringify(todos));
  });
};

export { saveToDos, displayTodos, todos, clearAll };
