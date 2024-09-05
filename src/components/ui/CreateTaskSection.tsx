import { useState } from 'react';
import { TextInput, Select, MultiSelect, Button, Group } from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';

interface CreateTaskSectionProps {
    onCreate: (newTask: TaskType) => void;
}

const CreateTaskSection = ({ onCreate }: CreateTaskSectionProps) => {
    const [taskName, setTaskName] = useState('');
    const [category, setCategory] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState('');

    const handleCreateTask = () => {
        if (!taskName || !date || !category) {
            alert('Please fill out all required fields');
            return;
        }

        const newTask: TaskType = {
            id: Date.now().toString(),
            name: taskName,
            date,
            tags,
        };

        onCreate(newTask);

        setTaskName('');
        setCategory(null);
        setTags([]);
        setDate('');
    };

    return (
        <Group>
            <TextInput
                placeholder="Task Name"
                value={taskName}
                onChange={(event) => setTaskName(event.currentTarget.value)}
                required

            />
            <TextInput
                placeholder="Date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.currentTarget.value)}
                required
                style={{ maxWidth: '150px' }}
            />
            <Select
                placeholder="Category"
                data={['Work', 'Personal', 'Other']}
                value={category}
                onChange={(value) => setCategory(value)}
                required
                style={{ maxWidth: '100px' }}
            />
            <MultiSelect
                placeholder="Tags"
                data={['urgent', 'shopping', 'work', 'personal']}
                value={tags}
                onChange={setTags}
                style={{ maxWidth: '100px' }}
            />
            <Button onClick={handleCreateTask}>Create</Button>
        </Group>
    );
};

export default CreateTaskSection;
