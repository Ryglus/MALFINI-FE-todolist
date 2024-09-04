import {Card, Text, Grid, Badge, Button, Group } from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import { IconEdit, IconTrash } from '@tabler/icons-react';

interface TaskProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
    onDelete: (id: string) => void;
}

function Task({ task, onEdit, onDelete }: TaskProps) {


    return (
        <Card
            shadow="sm"
            padding="lg"
            radius="md"
            style={{
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid #e0e0e0',
            }}
        >
            <Grid align="center" mb="xs">
                {/* Task Name */}
                <Grid.Col span={8}>
                    <Text size="md" >
                        {task.name}
                    </Text>
                </Grid.Col>

                {/* Edit/Delete Buttons */}
                <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Group >
                        <Button size="xs" variant="subtle" color="blue" onClick={() => onEdit(task)}>
                            <IconEdit size={16} />
                        </Button>
                        <Button size="xs" variant="subtle" color="red" onClick={() => onDelete(task.id)}>
                            <IconTrash size={16} />
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>

            {/* Task Description */}
            <Text size="sm" color="dimmed" mb="md" style={{ lineHeight: '1.4' }}>
                {task.description || 'No description provided'}
            </Text>

            <Grid align="center">
                {/* Category and Tags */}
                <Grid.Col span={8}>
                    <Group >
                        <Badge color="blue" variant="light" style={{ textTransform: 'capitalize' }}>
                            {task.category}
                        </Badge>
                        {task.tags.map((tag, index) => (
                            <Badge key={index} color="teal" variant="light">
                                {tag}
                            </Badge>
                        ))}
                    </Group>
                </Grid.Col>

                {/* Task Date */}
                <Grid.Col span={4} style={{ textAlign: 'right' }}>
                    <Text size="xs" color="dimmed">
                        {new Date(task.date).toLocaleDateString()}
                    </Text>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

export default Task;
