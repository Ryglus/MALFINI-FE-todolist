import { TaskType } from '../types/TaskType';
import { updateTaskRecursive, recursiveDelete } from './taskUtils';

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
    const updatedTasks = updateTaskRecursive(tasks, updatedTask);
    saveTasks(updatedTasks);
};

export const deleteTask = (taskId: string): void => {
    const tasks = loadTasks();
    const updatedTasks = recursiveDelete(tasks, taskId);
    saveTasks(updatedTasks);
};
