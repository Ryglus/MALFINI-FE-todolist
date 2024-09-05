import { useState } from 'react';
import {TextInput, MultiSelect, Button, Stack, Collapse} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../../types/TaskType.ts';
import DatePickerDropdown from "../comprised/DatePickerDropdown.tsx";

interface CreateTaskSectionProps {
    onCreate: (newTask: TaskType) => void;
}

const CreateTaskSection = ({ onCreate }: CreateTaskSectionProps) => {
    const [taskName, setTaskName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [description, setDescription] = useState('');
    const [expanded, setExpanded] = useState(false); // To control visibility of other fields

    const handleCreateTask = () => {
        if (!taskName || !date) {
            alert('Please fill out all required fields');
            return;
        }

        const newTask: TaskType = {
            id: uuidv4(),
            name: taskName,
            date: date?.toISOString() || '',
            tags,
            description,
            completed: false,
        };

        onCreate(newTask);

        // Reset fields after creation
        setTaskName('');
        setTags([]);
        setDate(null);
        setDescription('');
        setExpanded(false); // Collapse after task creation
    };

    return (
        <div >
            <Stack>
                {/* Task Name: Always visible */}
                <TextInput
                    placeholder="Task Name"
                    value={taskName}
                    onChange={(event) => {
                        const name = event.currentTarget.value;
                        setTaskName(name);
                        if (name) {
                            setExpanded(true); // Expand other inputs if task name is filled
                        } else {
                            setExpanded(false); // Collapse if task name is empty
                        }
                    }}
                    required
                    label="Task Name"
                />

                {/* Other Inputs: Initially hidden, expanded after typing task name */}
                <Collapse in={expanded}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <DatePickerDropdown selectedDate={date} onDateChange={setDate}/>
                    </div>

                    {/* Tags MultiSelect */}
                    <MultiSelect
                        placeholder="Tags"
                        data={['urgent', 'shopping', 'work', 'personal']}
                        value={tags}
                        onChange={setTags}
                        style={{ maxWidth: '300px' }}
                        label="Tags"
                        searchable
                    />

                    {/* Description */}
                    <TextInput
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.currentTarget.value)}
                        style={{ maxWidth: '100%' }}
                        label="Description"
                    />
                    <Button onClick={handleCreateTask} color="blue">
                        Create Task
                    </Button>
                </Collapse>

            </Stack>
        </div>
    );
};

export default CreateTaskSection;
