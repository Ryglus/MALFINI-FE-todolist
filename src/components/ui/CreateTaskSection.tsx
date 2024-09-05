import { useState } from 'react';
import { TextInput, MultiSelect, Button, Stack, Card } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../../types/TaskType.ts';

interface CreateTaskSectionProps {
    onCreate: (newTask: TaskType) => void;
}

const CreateTaskSection = ({ onCreate }: CreateTaskSectionProps) => {
    const [taskName, setTaskName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateTask = () => {
        if (!taskName || !date) {
            alert('Please fill out all required fields');
            return;
        }

        const newTask: TaskType = {
            id: uuidv4(),
            name: taskName,
            date,
            tags,
            description,
            completed: false,
        };

        onCreate(newTask);

        // Reset fields after creation
        setTaskName('');
        setTags([]);
        setDate('');
        setDescription('');
    };

    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Stack>
                <TextInput
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(event) => setTaskName(event.currentTarget.value)}
                    required
                    label="Task Name"
                />
                <TextInput
                    placeholder="Date"
                    type="date"
                    value={date}
                    onChange={(event) => setDate(event.currentTarget.value)}
                    required
                    style={{ maxWidth: '200px' }}
                    label="Due Date"
                />
                <TextInput
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.currentTarget.value)}
                    style={{ maxWidth: '100%' }}
                    label="Description"
                />
                <MultiSelect
                    placeholder="Tags"
                    data={['urgent', 'shopping', 'work', 'personal']}
                    value={tags}
                    onChange={setTags}
                    style={{ maxWidth: '300px' }}
                    label="Tags"
                />
                <Button onClick={handleCreateTask} color="blue">
                    Create Task
                </Button>
            </Stack>
        </Card>
    );
};

export default CreateTaskSection;
