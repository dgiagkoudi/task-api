let currentFilter = 'all';

function setFilter(filter) {
  currentFilter = filter;

  document.querySelectorAll('.filters .filter').forEach(btn => {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  loadTasks();
}

async function loadTasks() {
  const res = await fetch("/api/tasks");
  let tasks = await res.json();

  if (currentFilter === 'completed') {
    tasks = tasks.filter(t => t.completed);
  } else if (currentFilter === 'incomplete') {
    tasks = tasks.filter(t => !t.completed);
  }

  const list = document.getElementById("taskList");
  list.innerHTML = "";
  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";

    const text = document.createElement("span");
    text.textContent = task.title;

    const toggleBtn = document.createElement("button");
    toggleBtn.textContent = task.completed ? "Undo" : "Complete";
    toggleBtn.className = "btn toggle";
    toggleBtn.onclick = () => toggleTask(task);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "btn delete";
    deleteBtn.onclick = () => deleteTask(task.id);

    li.appendChild(text);
    li.appendChild(toggleBtn);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById("taskTitle").value;
  const errorDiv = document.getElementById("errorMessage");
  errorDiv.textContent = "";

  // Validation
  if (!title || title.trim() === "") {
    errorDiv.textContent = "Το title δεν μπορεί να είναι κενό!";
    setTimeout(() => { errorDiv.textContent = ""; }, 3000);
    return;
  }

  if (title.length > 100) {
    errorDiv.textContent = "Το title είναι πολύ μεγάλο!";
    setTimeout(() => { errorDiv.textContent = ""; }, 3000);
    return;
  }

  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Date.now(), title, completed: false })
    });

    if (!res.ok) {
      const data = await res.json();
      errorDiv.textContent = data.error || "Σφάλμα κατά την προσθήκη task";
      setTimeout(() => { errorDiv.textContent = ""; }, 3000);
      return;
    }

    document.getElementById("taskTitle").value = "";
    errorDiv.textContent = "";

    loadTasks();
  } catch (err) {
    errorDiv.textContent = "Σφάλμα σύνδεσης με τον server";
    console.error(err);
    setTimeout(() => { errorDiv.textContent = ""; }, 3000);
  }
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  loadTasks();
}

async function toggleTask(task) {
  await fetch(`/api/tasks/${task.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...task, completed: !task.completed })
  });
  loadTasks();
}

loadTasks();