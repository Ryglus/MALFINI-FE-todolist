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
                marginBottom: '15px',
            }}
        >
            <Grid align="center" mb="xs">
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
                {/* Task Name */}
                <Grid.Col span={8}>
                    <Text size="md" >
                        {task.name}
                    </Text>
                </Grid.Col>

                {/* Edit/Delete Buttons */}
                <Grid.Col span={4} style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <Group >
                        <Text size="xs" color="dimmed">
                            {new Date(task.date).toLocaleDateString()}
                        </Text>
                        <Button size="xs" variant="subtle" color="blue" onClick={() => onEdit(task)}>
                            <IconEdit size={16} />
                        </Button>
                        <Button size="xs" variant="subtle" color="red" onClick={() => onDelete(task.id)}>
                            <IconTrash size={16} />
                        </Button>
                    </Group>
                </Grid.Col>
            </Grid>
        </Card>
    );
}

export default Task;
