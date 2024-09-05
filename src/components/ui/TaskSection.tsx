import { Text } from '@mantine/core';
import { useState } from 'react';
import { TaskType } from '../../types/TaskType.ts';
import Task from '../comprised/Task.tsx';

const sampleTasks: TaskType[] = [
    { id: '1', category: 'Work', tags: ['urgent'], date: '2024-09-01', name: 'Complete project', description: 'Finish the final report.' },
    { id: '2', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '3', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '4', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '5', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '6', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '7', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '8', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '9', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '10', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '11', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
    { id: '12', category: 'Personal', tags: ['shopping','asd'], date: '2024-09-02', name: 'Buy groceries' },
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
