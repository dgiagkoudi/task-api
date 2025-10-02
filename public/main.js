const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  const tasks = await res.json();
  taskList.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.title;
    if (task.completed) li.classList.add("completed");

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.onclick = async () => {
      await fetch(`/api/tasks/${task.id}/complete`, { method: "PUT" });
      fetchTasks();
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = async () => {
      await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
      fetchTasks();
    };

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

addTaskBtn.onclick = async () => {
  const title = taskInput.value.trim();
  if (!title) return;
  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  });
  taskInput.value = "";
  fetchTasks();
};

fetchTasks();
