const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("error-message");

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.className = "task-title";
    span.textContent = task.title;
    if (task.completed) span.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.onclick = async () => {
      await fetch(`/api/tasks/${task.id}/complete`, { method: "PUT" });
      await fetchTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      await fetchTasks();
    };

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.onclick = async () => {
  const title = taskInput.value.trim();
  if (!title) {
    errorMessage.textContent = "Το πεδίο task δεν μπορεί να είναι κενό.";
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  taskInput.value = "";
  await fetchTasks();
};

fetchTasks();

