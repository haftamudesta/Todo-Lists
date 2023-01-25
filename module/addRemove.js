let todos = JSON.parse(localStorage.getItem('todos')) || [];
let editing = -1;
const toDoInput = document.querySelector('#new-list');
const todoListElement = document.querySelector('.to-do-list');

const saveToDos = () => {
  const todovalue = toDoInput.value;
  const isDuplicate = todos.some((todo) => todo.value === todovalue);
  if (todovalue === '') {
    return;
  } else if (isDuplicate) {
    return;
  } else {
    if (editing >= 0) {
      todos = todos.map((todo, index) => {
        return {
          value: index === editing ? todovalue : todo.value,
          checked: todo.checked,
          color: todo.color,
          index: index,
        };
      });
      editing = -1;
    } else {
      todos.push({
        value: todovalue,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        index: todos.length,
      });
      toDoInput.value = '';
    }
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
      <input type="checkbox" class="chech-box" />
      <p class="list-element" data-action="check" >${todo.value}</p>
      <i class="fa-regular fa-pen-to-square" data-action="edit" ></i>
      <i class="fa-sharp fa-solid fa-trash" data-action="delete"></i>
    </div>
        `;
  });
};

todoListElement.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'to-do-list') {
    const todo = parentElement;
    const todoId = Number(todo.id);
    const action = target.dataset.action;
    action === 'check' && checkTodo(todoId);
    action === 'edit' && editTodo(todoId);
    action === 'delete' && deleteTodo(todoId);
  }
});

const checkTodo = (todoId) => {
  todos = todos.map((todo, index) => {
    if (index === todoId) {
      return {
        value: todo.value,
        color: todo.color,
        checked: !todo.checked,
        index: index,
      };
    } else {
      return {
        value: todo.value,
        color: todo.color,
        checked: todo.checked,
        index: index,
      };
    }
  });
  displayTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
};

const editTodo = (todoId) => {
  toDoInput.value = todos[todoId].value;
  editing = todoId;
};

const deleteTodo = (todoId) => {
  todos = todos.filter((todo, index) => todoId !== index);
  localStorage.setItem('todos', JSON.stringify(todos));
  displayTodos();
};

export { saveToDos, displayTodos, todos };
