import { Text } from '@mantine/core';
import { useState } from 'react';
import { TaskType } from '../../types/TaskType.ts';
import Task from '../individual/Task.tsx';
import { ScrollArea } from '@mantine/core';

const sampleTasks: TaskType[] = [
    { id: '1', category: 'Work', tags: ['urgent'], date: '2024-09-01', name: 'Complete project', description: 'Finish the final report.' },
    { id: '2', category: 'Personal', tags: ['shopping'], date: '2024-09-02', name: 'Buy groceries' },
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
                    <ScrollArea h={250} scrollHideDelay={500}>
                        {tasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                            />
                        ))}
                    </ScrollArea>

            ) : (
                <Text>No tasks available</Text>
            )}
        </>
    );
}

export default TaskSection;
