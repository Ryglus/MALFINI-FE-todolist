import React, { createContext, useContext, useState, useEffect } from 'react';
import { TaskType } from '../types/TaskType.ts';
import { loadTasks, addTask as addTaskStorage, updateTask as updateTaskStorage, deleteTask as deleteTaskStorage } from '../utils/taskStorage';
import { TagType } from '../types/TagType.ts';
import { loadTags, addTag as addTagStorage, updateTag as updateTagStorage, deleteTag as deleteTagStorage } from '../utils/tagStorage';

interface TaskContextType {
    tasks: TaskType[];
    filteredTasks: TaskType[];
    selectedDate: Date | null;
    selectedTags: string[];
    tags: TagType[];
    addTask: (task: TaskType) => void;
    updateTask: (task: TaskType) => void;
    deleteTask: (taskId: string) => void;
    setSelectedDate: (date: Date | null) => void;
    setSelectedTags: (tags: string[]) => void;
    createTask: (task: TaskType, parentId?: string | null) => void;
    addTag: (tag: TagType) => void;
    updateTag: (tag: TagType) => void;
    deleteTag: (tagId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tags, setTags] = useState<TagType[]>([]);

    useEffect(() => {
        const storedTasks = loadTasks();
        const storedTags = loadTags();
        setTasks(storedTasks);
        setTags(storedTags);
    }, []);

    useEffect(() => {
        setFilteredTasks(filterTasks(tasks, selectedDate, selectedTags));
    }, [tasks, selectedDate, selectedTags]);

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

    const filterTasksByTags = (tasks: TaskType[], selectedTagIds: string[]): TaskType[] => {
        if (selectedTagIds.length === 0) return tasks;

        return tasks.filter(task => {
            return selectedTagIds.every(tagId => task.tags.includes(tagId));
        });
    };

    const filterTasks = (tasks: TaskType[], date: Date | null, tags: string[]): TaskType[] => {
        const filteredByDate = filterTasksByDate(tasks, date);
        return filterTasksByTags(filteredByDate, tags);
    };

    const createTask = (task: TaskType, parentId?: string | null) => {
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

    const addTag = (tag: TagType) => {
        addTagStorage(tag);
        setTags(prevTags => [...prevTags, tag]);
    };

    const updateTag = (updatedTag: TagType) => {
        updateTagStorage(updatedTag);
        setTags(prevTags => prevTags.map(tag => (tag.id === updatedTag.id ? updatedTag : tag)));
    };

    const deleteTag = (tagId: string) => {
        deleteTagStorage(tagId);
        setTags(prevTags => prevTags.filter(tag => tag.id !== tagId));
    };

    return (
        <TaskContext.Provider value={{
            tasks,
            filteredTasks,
            selectedDate,
            selectedTags,
            tags,
            addTask,
            updateTask,
            deleteTask,
            setSelectedDate,
            setSelectedTags,
            createTask,
            addTag,
            updateTag,
            deleteTag
        }}>
            {children}
        </TaskContext.Provider>
    );
};

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (context === undefined) {
        throw new Error('useTasks must be used within a TaskProvider');
    }
    return context;
};
