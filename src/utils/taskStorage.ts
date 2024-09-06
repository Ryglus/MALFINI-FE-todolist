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
    const updateTaskRecursive = (tasks: TaskType[], taskToUpdate: TaskType): TaskType[] => {
        return tasks.map(task => {
            if (task.id === taskToUpdate.id) {
                return taskToUpdate;
            }
            if (task.subTasks && task.subTasks.length > 0) {
                return {
                    ...task,
                    subTasks: updateTaskRecursive(task.subTasks, taskToUpdate),
                };
            }
            return task;
        });
    };

    const updatedTasks = updateTaskRecursive(tasks, updatedTask);
    saveTasks(updatedTasks);
};


export const deleteTask = (taskId: string): void => {
    const recursiveDelete = (tasks: TaskType[]): TaskType[] => {
        return tasks
            .filter(task => task.id !== taskId)
            .map(task => ({
                ...task,
                subTasks: recursiveDelete(task.subTasks || []),
            }));
    };

    const tasks = loadTasks();
    const updatedTasks = recursiveDelete(tasks);
    saveTasks(updatedTasks);
};
