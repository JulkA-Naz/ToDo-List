document.addEventListener('DOMContentLoaded', function () {
  const todoInput = document.getElementById('todoInput');
  const addBtn = document.getElementById('addBtn');
  const todoList = document.getElementById('todoList');

  function createTodoElement(todoText) {
    const li = document.createElement('li');

    const numberSpan = document.createElement('span');
    numberSpan.classList.add('number');
    li.appendChild(numberSpan);

    const span = document.createElement('span');
    span.textContent = todoText;
    li.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.className = 'delete-btn';
    deleteBtn.addEventListener('click', function () {
      li.remove();
      updateLocalStorage();
      updateNumbering();
    });

    li.appendChild(deleteBtn);
    return li;
  }

  function loadTodos() {
    try {
      const todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => {
        todoList.appendChild(createTodoElement(todo));
      });
      updateNumbering();
    } catch (error) {
      console.error('Error loading todos from localStorage', error);
    }
  }

  function addTodoList(todoText) {
    const li = createTodoElement(todoText);
    todoList.appendChild(li);
    updateNumbering();
  }

  function updateNumbering() {
    const listItems = todoList.querySelectorAll('li');
    listItems.forEach((li, index) => {
      const numberSpan = li.querySelector('.number');
      numberSpan.textContent = `${index + 1}. `;
    });
  }

  function updateLocalStorage() {
    const todos = Array.from(todoList.querySelectorAll('li span:nth-child(2)')).map(span => span.textContent);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addBtn.addEventListener('click', function () {
    const todoText = todoInput.value.trim();
    if (todoText !== '') {
      addTodoList(todoText);
      updateLocalStorage();
      todoInput.value = '';
    }
  });

  todoInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addBtn.click();
    }
  });

  window.addEventListener('storage', function (event) {
    if (event.key === 'todos') {
      todoList.innerHTML = '';
      loadTodos();
    }
  });

  loadTodos();
});