import { TaskType } from '../types/TaskType.ts';
const LOCAL_STORAGE_KEY = 'tasks';

export const loadTasks = (): TaskType[] => {
    const tasksJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
};

export const saveTasks = (tasks: TaskType[]): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
};

export const addTask = (task: TaskType): void => {
    const tasks = loadTasks();
    tasks.push(task);
    saveTasks(tasks);
};

export const updateTask = (updatedTask: TaskType): void => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex > -1) {
        tasks[taskIndex] = updatedTask;
        saveTasks(tasks);
    }
};

export const deleteTask = (taskId: string): void => {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
};
