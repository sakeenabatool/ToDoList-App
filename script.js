const taskList = document.querySelector(".tasks");
const addBtn = document.querySelector(".add-btn");
const stats = document.querySelector(".stats");

// Track total tasks + done tasks
function updateStats() {
  const total = taskList.querySelectorAll(".task").length;
  const done = taskList.querySelectorAll(".task.done").length;
  stats.textContent = `${total} tasks • ${done} done`;
}

// Toggle done when clicking checkbox
taskList.addEventListener("click", (e) => {
  if (e.target.closest(".checkbox")) {
    const task = e.target.closest(".task");
    task.classList.toggle("done");

    const box = task.querySelector(".box");

    // If checked → ✓
    if (task.classList.contains("done")) {
      // Save original icon to data attribute if not saved yet
      if (!box.dataset.icon) {
        box.dataset.icon = box.textContent;
      }
      box.textContent = "✓";
    } else {
      // Restore the original icon
      box.textContent = box.dataset.icon || "";
    }

    updateStats();
  }
});

// Add new task
addBtn.addEventListener("click", () => {
  const title = prompt("Enter task title:");
  if (!title) return;

  const meta = prompt("Add task details (optional):") || "";
  const tag = prompt("Enter tag (Work, Personal, School, etc):") || "General";

  // Let user optionally pick an icon
  const icon =
    prompt("Choose an icon (like 🕘, ✍️, 📞, 🛒) or leave empty:") || "";

  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = `
    <div class="checkbox"><div class="box" data-icon="${icon}">${icon}</div></div>
    <div class="content">
      <div class="title">${title}</div>
      <div class="meta">${meta}</div>
    </div>
    <div class="tag">${tag}</div>
  `;

  taskList.appendChild(li);
  updateStats();
});

// Initialize stats
updateStats();
