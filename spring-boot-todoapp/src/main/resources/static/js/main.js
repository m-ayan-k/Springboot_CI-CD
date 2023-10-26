const inputElement = document?.querySelector('#todo_entry');
const submitButton = document?.querySelector('#submit_button');
const updateButton = document?.querySelector('#update_button');
const cancleButton = document?.querySelector('#cancle_button');

const errorMessage = document.querySelector('.error-message');
const todoListContainer = document.querySelector('.todo-list');

let input_value = null;
let editableItem = {};
const input_value_min_length = 3;

// Unique ID Generator
const uniqueId = range => {
  let result = '';
  const letters = '0123456789~!@#$%^&*ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < range; i++) {
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  };
  return result;
};

// Current Date
const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

let todoListData = [
   {
      heading: 'First ToDO List',
      id: uniqueId(10),
      date: currentDate,
      completed: false,
   },
   {
      heading: 'Second ToDO List',
      id: uniqueId(10),
      date: currentDate,
      completed: false,
   },
   {
      heading: 'Third ToDO List',
      id: uniqueId(10),
      date: currentDate,
      completed: false,
   }
];

inputElement.addEventListener('input', (e) => {
  const this_item = e.target;
  
  input_value = this_item.value;

  if (input_value.length < input_value_min_length) {
    this_item.classList.remove('is-valid');
    this_item.classList.add('is-invalid');
    errorMessage.innerText = `Input Value cannot be less than ${input_value_min_length}`;
    errorMessage.style.display = 'block';
    return;
  } else {
    this_item.classList.remove('is-invalid');
    this_item.classList.add('is-valid');
    errorMessage.innerText = '';
    errorMessage.style.display = 'none';
    return input_value;
  }
});

// Generate ToDo List Item
const generateToDoItems = (array) => {
  array.map(item => {
    let itemHTML = `<li class="todo-list__item shadow ${item.completed ? ' completed' : ''}" id="${item.id}" title="${item.completed ? 'This item is completed' : ''}">
      <div class="__heading fs-5 fw-bold">${item.heading}</div>
      <div class="__buttons flex-shrink-0 d-flex gap-1">
        <div class="__edit" id="${item.id}" onclick="edit_todo_item(event, '${item.id}')"><i class="fa-solid pe-none fa-pencil"></i></div>
        <div class="__delete" id="${item.id}" onclick="delete_todo_item(event, '${item.id}')"><i class="fa-solid pe-none fa-trash-alt"></i></div>
        <div class="__complete" id="${item.id}" onclick="complete_todo_item(event, '${item.id}')">
         <i class="fa-solid pe-none fa-check-square"></i>
         </div>
      </div>
    </li>`;
    todoListContainer.insertAdjacentHTML('beforeend', itemHTML);
  })
}

// First time generating TODO items if data exists in "todoListData" 
generateToDoItems(todoListData);

submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (input_value) {
    inputElement.value = '';

    const newEntry = {
      heading: input_value,
      id: uniqueId(10),
      date: currentDate,
      completed: false,
    };

    todoListData.unshift(newEntry);    
    todoListContainer.innerHTML = '';
    generateToDoItems(todoListData);

    inputElement.classList.remove('is-invalid');
    inputElement.classList.remove('is-valid');
    errorMessage.innerText = '';
    errorMessage.style.display = 'none';

  } else {
    inputElement.classList.add('is-invalid');
    errorMessage.innerText = 'Input Field cannot be empty!';
    errorMessage.style.display = 'block';
  }
});

const delete_todo_item = (event, id) => {
  todoListData = todoListData.filter(item => item.id !== id);
  let thisItem = event.target.parentNode.parentNode;
  thisItem.remove();
}
const edit_todo_item = (event, id) => {
   submitButton.style.display = 'none';
   updateButton.style.display = 'block';
   cancleButton.style.display = 'block';
   editableItem = todoListData.find(item => item.id === id);
   inputElement.value = editableItem.heading;
   input_value = editableItem.heading;
};
const complete_todo_item = (event, id) => {
   let completableItem = todoListData.find(item => item.id === id);
   completableItem.completed = true;   
   todoListContainer.innerHTML = '';
   generateToDoItems(todoListData);
}
updateButton.addEventListener('click', (e) => {
   e.preventDefault();
   submitButton.style.display = 'block';
   updateButton.style.display = 'none';
   let updateableItem = todoListData.find(item => item.id === editableItem.id);
   updateableItem.heading = input_value;
   todoListContainer.innerHTML = '';
   generateToDoItems(todoListData);
   
   // reseting elements
   inputElement.classList.remove('is-valid');
   inputElement.classList.remove('is-invalid');
   inputElement.value = '';
   input_value = '';
   editableItem = {};
   cancleButton.style.display = 'none';
});
cancleButton.addEventListener('click', e => {
   e.preventDefault();
   inputElement.value = '';
   inputElement.classList.remove('is-valid');
   inputElement.classList.remove('is-invalid');
   input_value = '';
   editableItem = {};
   e.target.style.display = 'none';
   updateButton.style.display = 'none';
   submitButton.style.display = 'block';
})
