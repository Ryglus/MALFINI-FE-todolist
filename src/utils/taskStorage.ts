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

    // Recursive function to find and update the task/subtask in the task tree
    const updateTaskRecursive = (tasks: TaskType[], taskToUpdate: TaskType): TaskType[] => {
        return tasks.map(task => {
            if (task.id === taskToUpdate.id) {
                return taskToUpdate; // Update the task if it matches
            }
            // If the task has subtasks, recursively update them as well
            if (task.subTasks && task.subTasks.length > 0) {
                return {
                    ...task,
                    subTasks: updateTaskRecursive(task.subTasks, taskToUpdate), // Recursively update subtasks
                };
            }
            return task;
        });
    };

    const updatedTasks = updateTaskRecursive(tasks, updatedTask);
    saveTasks(updatedTasks); // Save the updated tasks back to local storage
};


export const deleteTask = (taskId: string): void => {
    const tasks = loadTasks();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(updatedTasks);
};
