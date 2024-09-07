import React, { createContext, useContext, useState, useEffect } from 'react';
import { TaskType } from '../types/TaskType.ts';
import { loadTasks, addTask as addTaskStorage, updateTask as updateTaskStorage, deleteTask as deleteTaskStorage } from '../utils/taskStorage';

interface TaskContextType {
    tasks: TaskType[];
    filteredTasks: TaskType[];
    selectedDate: Date | null;
    addTask: (task: TaskType) => void;
    updateTask: (task: TaskType) => void;
    deleteTask: (taskId: string) => void;
    setSelectedDate: (date: Date | null) => void;
    createTask: (task: TaskType, parentId?: string | null) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    useEffect(() => {
        const storedTasks = loadTasks();
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        setFilteredTasks(filterTasksByDate(tasks, selectedDate));
    }, [tasks, selectedDate]);

    const addTask = (task: TaskType) => {
        addTaskStorage(task);
        setTasks(prevTasks => [...prevTasks, task]);
    };

    const updateTask = (updatedTask: TaskType) => {
        updateTaskStorage(updatedTask);
        setTasks(prevTasks => {
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

            return updateTaskRecursive(prevTasks, updatedTask);
        });
    };

    const deleteTask = (taskId: string) => {
        deleteTaskStorage(taskId);
        setTasks(prevTasks => {
            const recursiveDelete = (tasks: TaskType[]): TaskType[] => {
                return tasks
                    .filter(task => task.id !== taskId)
                    .map(task => ({
                        ...task,
                        subTasks: recursiveDelete(task.subTasks || []),
                    }));
            };

            return recursiveDelete(prevTasks);
        });
    };

    const filterTasksByDate = (tasks: TaskType[], date: Date | null): TaskType[] => {
        if (!date) return tasks;

        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === date.toDateString();
        });
    };

    const createTask = (task: TaskType, parentId?: string) => {
        if (parentId) {
            const selectedTask = tasks.find(task => task.id === parentId);
            if (selectedTask) {
                if (!selectedTask.subTasks) selectedTask.subTasks = [];
                selectedTask.subTasks.push(task);
                updateTask(selectedTask);
            }
        } else {
            addTask(task);
        }
    };

    // @ts-ignore
    return (<TaskContext.Provider value={{ tasks, filteredTasks, selectedDate, addTask, updateTask, deleteTask, setSelectedDate, createTask }}>{children}</TaskContext.Provider>);
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
