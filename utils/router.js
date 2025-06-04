import { renderTaskList } from '../views/taskList.js';
import { renderTaskForm } from '../views/taskForm.js';
import { renderTaskDetail } from '../views/taskDetail.js';
import { renderNotFound } from '../views/notFound.js';

export function router() {
  const path = location.pathname;
  const app = document.getElementById('app');
  app.innerHTML = '';

  if (path === '/' || path === '/tasks') {
    renderTaskList(app);
  } else if (path === '/add') {
    renderTaskForm(app);
  } else if (path.startsWith('/edit/')) {
    const id = path.split('/edit/')[1];
    renderTaskForm(app, id);
  } else if (path.startsWith('/task/')) {
    const id = path.split('/task/')[1];
    renderTaskDetail(app, id);
  } else {
    renderNotFound(app);
  }
}
