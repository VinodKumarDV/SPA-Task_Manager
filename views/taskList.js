import { api } from '../utils/api.js';

export function renderTaskList(container) {
  const tasks = api.getTasks();

  container.innerHTML = `
    <section>
      <h2>All Tasks</h2>
      <input type="text" id="searchInput" placeholder="Search by title or description"/>
      <select id="priorityFilter">
        <option value="">All Priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <ul id="taskList" class="draggable-list"></ul>
    </section>
  `;

  const listElement = container.querySelector('#taskList');

  const renderFilteredList = () => {
    const search = container.querySelector('#searchInput').value.toLowerCase();
    const priority = container.querySelector('#priorityFilter').value;

    const filteredTasks = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search);
      const matchesPriority = !priority || task.priority === priority;
      return matchesSearch && matchesPriority;
    });

    listElement.innerHTML = filteredTasks.map(task => `
      <li draggable="true" data-id="${task.id}">
        <strong>${task.title}</strong> (${task.priority}) – Due: ${task.dueDate}
        <br />
        <a href="/task/${task.id}" data-link>View</a> |
        <a href="/edit/${task.id}" data-link>Edit</a> |
        <button data-id="${task.id}" class="delete-btn">Delete</button>
      </li>
    `).join('');

    let draggedId = null;

    listElement.querySelectorAll('li').forEach(item => {
      item.addEventListener('dragstart', (e) => {
        draggedId = item.dataset.id;
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('dragover', (e) => e.preventDefault());

      item.addEventListener('drop', () => {
        const tasks = api.getTasks();
        const fromIndex = tasks.findIndex(t => t.id === draggedId);
        const toIndex = tasks.findIndex(t => t.id === item.dataset.id);
        const [moved] = tasks.splice(fromIndex, 1);
        tasks.splice(toIndex, 0, moved);
        localStorage.setItem('taskData', JSON.stringify(tasks));
        renderTaskList(container);
      });
    });

    listElement.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', () => {
        if (confirm('Delete this task?')) {
          api.deleteTask(button.dataset.id);
          renderTaskList(container);
        }
      });
    });
  };

  container.querySelector('#searchInput').addEventListener('input', renderFilteredList);
  container.querySelector('#priorityFilter').addEventListener('change', renderFilteredList);
  renderFilteredList();
}
