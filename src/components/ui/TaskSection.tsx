import { Text } from '@mantine/core';
import { useState } from 'react';
import { TaskType } from '../../types/TaskType.ts';
import Task from '../comprised/Task.tsx';

const sampleTasks: TaskType[] = [
    { id: '1', tags: ['urgent'], date: '2024-09-01', name: 'Complete project', description: 'Finish the final report.' },
    { id: '2', subTasks: [{ id: '3', tags: ['urgent'], date: '2024-09-01', name: 'Complete project', description: 'Finish the final report.' }], tags: ['shopping','asd'], date: '2024-09-02', name: 'Go read a book you fat faggot, oh ye, little faggie' },

    // Add more tasks as needed
];

function TaskSection() {
    const [tasks, setTasks] = useState<TaskType[]>(sampleTasks);

    const handleEditTask = (editedTask: TaskType) => {
        setTasks(tasks.map(task => (task.id === editedTask.id ? editedTask : task)));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    return (
        <>
            {tasks.length > 0 ? (
                    <>
                        {tasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </>

            ) : (
                <Text>No tasks available</Text>
            )}
        </>
    );
}

export default TaskSection;
