import { api } from '../utils/api.js';

export function renderTaskDetail(container, id) {
  const task = api.getTask(id);

  if (!task) {
    container.innerHTML = `<p>Task not found.</p>`;
    return;
  }

  container.innerHTML = `
    <section>
      <h2>${task.title}</h2>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Due Date:</strong> ${task.dueDate}</p>
      <p><strong>Priority:</strong> ${task.priority}</p>
      <a href="/" data-link>Back to List</a>
    </section>
  `;
}
