import { Text } from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import Task from '../comprised/Task.tsx';
import {updateTask, saveTasks, loadTasks} from '../../utils/taskStorage'; // Adjust the import path as needed

interface TaskSectionProps {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskSection = ({ tasks, setTasks }: TaskSectionProps) => {
    const handleEditTask = (editedTask: TaskType) => {
        updateTask(editedTask);
        setTasks(prevTasks => prevTasks.map(task => (task.id === editedTask.id ? editedTask : task)));
    };
    const handleChangeTask = () => {
        setTasks(loadTasks);
    };
    const handleDeleteTask = (id: string) => {
        const recursiveDelete = (tasks: TaskType[]): TaskType[] => {
            return tasks
                .filter(task => task.id !== id) // Remove the task with the matching id
                .map(task => ({
                    ...task,
                    subTasks: recursiveDelete(task.subTasks || []), // Recursively check and delete in subTasks
                }));
        };

        const updatedTasks = recursiveDelete(loadTasks()); // Get updated task list after deletion
        setTasks(updatedTasks); // Update the state with the new task list
        saveTasks(updatedTasks); // Save the updated tasks to local storage
    };

    return (
        <>
            {tasks.length > 0 ? (
                tasks.map(task => (
                    <Task
                        key={task.id}
                        task={task}
                        onEdit={handleEditTask}
                        onDelete={handleDeleteTask}
                        onChange={handleChangeTask}
                    />
                ))
            ) : (
                <Text>No tasks available</Text>
            )}
        </>
    );
};

export default TaskSection;
