const STORAGE_KEY = 'taskData';

function getTasksFromStorage() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveTasksToStorage(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

export const api = {
  getTasks() {
    return getTasksFromStorage();
  },
  getTask(id) {
    return getTasksFromStorage().find(task => task.id === id);
  },
  addTask(task) {
    const tasks = getTasksFromStorage();
    task.id = crypto.randomUUID();
    tasks.push(task);
    saveTasksToStorage(tasks);
    return task;
  },
  updateTask(id, updatedTask) {
    const tasks = getTasksFromStorage().map(task =>
      task.id === id ? { ...task, ...updatedTask } : task
    );
    saveTasksToStorage(tasks);
  },
  deleteTask(id) {
    const tasks = getTasksFromStorage().filter(task => task.id !== id);
    saveTasksToStorage(tasks);
  }
};
