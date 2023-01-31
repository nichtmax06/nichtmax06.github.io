// todo.js

// Get the form element
const taskForm = document.getElementById('new-task-form');
// Get the task list element
const tasksElement = document.getElementById('tasks');

// Event listener for the form
taskForm.addEventListener('submit', function(e) {
	e.preventDefault();

	// Get the value of the input element
	const taskInput = document.getElementById('new-task-input');
	const taskInputValue = taskInput.value;

	if (taskInputValue === '') {
		alert('Please enter a valid task');
		return;
	}

	// Create a new task
	const task = document.createElement('div');
	task.classList.add('task');
	task.innerHTML = `
		<div class="content">
			<input 
				type="text" 
				class="text" 
				value="${taskInputValue}"
				readonly>
		</div>
		<div class="actions">
			<button class="edit">Edit</button>
			<button class="delete">Delete</button>
		</div>
	`;

	// Append the task to the task list
	tasksElement.appendChild(task);

	// Add the task to localStorage
	addTaskToLocalStorage(taskInputValue);

	// Reset the input value
	taskInput.value = '';
});

// Event listener for the edit button
tasksElement.addEventListener('click', function(e) {
	if (e.target.classList.contains('edit')) {
		// Get the task text
		const taskText = e.target.parentElement.previousElementSibling.children[0];
		// Make the text editable
		taskText.removeAttribute('readonly');
		// Change the edit button text
		e.target.innerText = 'Save';
		// Change the class to save
		e.target.classList.replace('edit', 'save');
	}

	if (e.target.classList.contains('save')) {
		// Get the task text
		const taskText = e.target.parentElement.previousElementSibling.children[0];
		// Make the text non-editable
		taskText.setAttribute('readonly', 'readonly');
		// Change the save button text
		e.target.innerText = 'Edit';
		// Change the class to edit
		e.target.classList.replace('save', 'edit');
		// Update local storage
		updateLocalStorage(taskText.value);
	}

	if (e.target.classList.contains('delete')) {
		// Get the task
		const task = e.target.parentElement.parentElement;
		// Remove the task from the DOM
		tasksElement.removeChild(task);
		// Remove the task from local storage
		removeTaskFromLocalStorage(task);
	}
});

// Function to add a task to local storage
function addTaskToLocalStorage(task) {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	tasks.push(task);
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to update a task in local storage
function updateLocalStorage(task) {
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	// Find the index of the task
	const taskIndex = tasks.indexOf(task);
	// Update the task in the tasks array
	tasks[taskIndex] = task;
	// Update local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to remove a task from local storage
function removeTaskFromLocalStorage(task) {
	let tasks = JSON.parse(localStorage.getItem('tasks'));
	// Get the task text
	const taskText = task.children[0].children[0].value;
	// Find the index of the task
	const taskIndex = tasks.indexOf(taskText);
	// Remove the task from the array
	tasks.splice(taskIndex, 1);
	// Update local storage
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load up tasks when page is refreshed
function loadTasks() {
	let tasks;
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) {
		// Create a new task
		const taskElement = document.createElement('div');
		taskElement.classList.add('task');
		taskElement.innerHTML = `
			<div class="content">
				<input 
					type="text" 
					class="text" 
					value="${task}"
					readonly>
			</div>
			<div class="actions">
				<button class="edit">Edit</button>
				<button class="delete">Delete</button>
			</div>
		`;

		// Append the task to the task list
		tasksElement.appendChild(taskElement);
	});
}

// Load up tasks when page is refreshed
loadTasks();