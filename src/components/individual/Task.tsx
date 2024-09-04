// src/components/TaskType.tsx
import { Paper, Text, Badge, Group, ActionIcon, Tooltip, TextInput } from '@mantine/core';

import { TaskType } from '../../types/TaskType';
import { useState } from 'react';

interface TaskProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
    onDelete: (id: string) => void;
}

function Task({ task, onEdit, onDelete }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTask, setEditedTask] = useState<TaskType>(task);

    const handleSave = () => {
        onEdit(editedTask);
        setIsEditing(false);
    };

    return (
        <Paper  shadow="xs" radius="md" style={{ marginBottom: '1rem' }}>
            {isEditing ? (
                <div>
                    <TextInput
                        label="TaskType Name"
                        value={editedTask.name}
                        onChange={(e) => setEditedTask({ ...editedTask, name: e.target.value })}
                    />
                    <TextInput
                        label="Description"
                        value={editedTask.description || ''}
                        onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                        style={{ marginTop: '0.5rem' }}
                    />
                    <Group style={{ marginTop: '0.5rem' }}>
                        <ActionIcon color="green" onClick={handleSave}>
                            Save
                        </ActionIcon>
                        <ActionIcon color="red" onClick={() => setIsEditing(false)}>
                            Cancel
                        </ActionIcon>
                    </Group>
                </div>
            ) : (
                <div>
                    <Group >
                        <Text >{task.name}</Text>
                        <Group >
                            <Tooltip label="Edit task">
                                <ActionIcon onClick={() => setIsEditing(true)}>

                                </ActionIcon>
                            </Tooltip>
                            <Tooltip label="Delete task">
                                <ActionIcon onClick={() => onDelete(task.id)}>

                                </ActionIcon>
                            </Tooltip>
                        </Group>
                    </Group>
                    <Text size="sm" color="dimmed" style={{ marginTop: '0.5rem' }}>
                        {task.date}
                    </Text>
                    {task.description && (
                        <Text size="sm" style={{ marginTop: '0.5rem' }}>
                            {task.description}
                        </Text>
                    )}
                    <Group style={{ marginTop: '0.5rem' }}>
                        {task.tags.map((tag, index) => (
                            <Badge key={index} variant="outline">
                                {tag}
                            </Badge>
                        ))}
                    </Group>
                </div>
            )}
        </Paper>
    );
}

export default Task;
