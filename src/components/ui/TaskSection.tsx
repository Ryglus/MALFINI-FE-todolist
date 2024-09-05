import { Text } from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import Task from '../comprised/Task.tsx';
import { updateTask, deleteTask } from '../../utils/taskStorage'; // Adjust the import path as needed

interface TaskSectionProps {
    tasks: TaskType[];
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>;
}

const TaskSection = ({ tasks, setTasks }: TaskSectionProps) => {
    const handleEditTask = (editedTask: TaskType) => {
        updateTask(editedTask);
        setTasks(prevTasks => prevTasks.map(task => (task.id === editedTask.id ? editedTask : task)));
    };

    const handleDeleteTask = (id: string) => {
        deleteTask(id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
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
                    />
                ))
            ) : (
                <Text>No tasks available</Text>
            )}
        </>
    );
};

export default TaskSection;
