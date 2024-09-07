import { TaskType } from '../types/TaskType';
import {toLocalISODateString} from "./TimeBeTiming.ts";

// Recursive function to update a task in a nested list of tasks
export const updateTaskRecursive = (tasks: TaskType[], taskToUpdate: TaskType): TaskType[] => {
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

export const recursiveDelete = (tasks: TaskType[], taskId: string): TaskType[] => {
    return tasks
        .filter(task => task.id !== taskId)
        .map(task => ({
            ...task,
            subTasks: recursiveDelete(task.subTasks || [], taskId),
        }));
};

export const getTodaysTasksRecursive = (tasks: TaskType[]): TaskType[] => {
    const today = toLocalISODateString(new Date());

    const collectTodaysTasks = (tasks: TaskType[]): TaskType[] => {
        return tasks.reduce((result: TaskType[], task: TaskType) => {
            const isToday = toLocalISODateString(new Date(task.date)) === today;
            const filteredSubTasks = collectTodaysTasks(task.subTasks || []);

            if (isToday) {
                result.push(task);
            }

            return result.concat(filteredSubTasks);
        }, []);
    };

    return collectTodaysTasks(tasks);
};