function handleFormSubmit(event) {
	event.preventDefault();

	const formData = new FormData(event.target);
	const task = Object.fromEntries(formData);
	task.id = Date.now();
	
	const taskElement = createTaskElement(task);
	const ulContainer = document.getElementById("task-list-container");
	if (!ulContainer) return;

	ulContainer.appendChild(taskElement);
	// ulContainer.innerHTML = taskElement;
}

function createTaskElement (task) {
	const divTaskContent = document.createElement("div");
	divTaskContent.classList.add("task-content");

	const h3Title = document.createElement("h3");
	h3Title.textContent = task.title;
	const pDescription = document.createElement("p");
	pDescription.textContent = task.description;

	divTaskContent.appendChild(h3Title);
	divTaskContent.appendChild(pDescription);

	const divTaskAction = document.createElement("div");
	divTaskAction.classList.add("task-actions");
	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Eliminar";
	deleteButton.addEventListener("click", () => deleteTaskElement(task))

	divTaskAction.appendChild(deleteButton);

	const li = document.createElement("li");
	li.classList.add("task-item");
	li.id = task.id;

	li.appendChild(divTaskContent);
	li.appendChild(divTaskAction);

// 	const liTemplate = `
// <li id="${task.id}" class="task-item">
// 	<div class="task-content">
// 			<h3>${task.title}</h3>
// 			<p>${task.description}</p>
// 	</div>
// 	<div class="task-actions">
// 			<button onclick="deleteTaskElement(${task.id})">Eliminar</button>
// 	</div>
// </li>`;

// 	return liTemplate;

	return li;
}

function deleteTaskElement(taskId) {
	const li = document.getElementById(taskId);
	li.remove();
}