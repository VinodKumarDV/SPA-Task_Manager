import { api } from '../utils/api.js';
import { router } from '../utils/router.js';

export function renderTaskForm(container, id = null) {
  const isEdit = !!id;
  const task = isEdit ? api.getTask(id) : { title: '', description: '', dueDate: '', priority: 'Low' };

  const html = `
    <section>
      <h2>${isEdit ? 'Edit' : 'Add'} Task</h2>
      <form id="task-form">
        <label>Title: <input type="text" name="title" value="${task.title}" required></label><br/>
        <label>Description: <textarea name="description" required>${task.description}</textarea></label><br/>
        <label>Due Date: <input type="date" name="dueDate" value="${task.dueDate}" required></label><br/>
        <label>Priority:
          <select name="priority" required>
            <option value="Low" ${task.priority === 'Low' ? 'selected' : ''}>Low</option>
            <option value="Medium" ${task.priority === 'Medium' ? 'selected' : ''}>Medium</option>
            <option value="High" ${task.priority === 'High' ? 'selected' : ''}>High</option>
          </select>
        </label><br/>
        <button type="submit">${isEdit ? 'Update' : 'Add'} Task</button>
      </form>
    </section>
  `;

  container.innerHTML = html;

  const form = container.querySelector('#task-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const newTask = {
      title: formData.get('title'),
      description: formData.get('description'),
      dueDate: formData.get('dueDate'),
      priority: formData.get('priority')
    };

    if (isEdit) {
      api.updateTask(id, newTask);
    } else {
      api.addTask(newTask);
    }

    history.pushState(null, '', '/');
    router();
  });
}
