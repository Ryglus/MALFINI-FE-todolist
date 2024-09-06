import { Card, Text, Group, Tooltip, ActionIcon, Collapse, useMantineTheme, Title } from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import { IconEdit, IconTrash, IconChevronDown, IconChevronUp, IconSquareCheck } from '@tabler/icons-react';
import { useState } from 'react';
import { updateTask } from '../../utils/taskStorage'; // Adjust the import path as needed
import { format } from 'date-fns'; // Import the date-fns format function

interface TaskProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
    onDelete: (id: string) => void;
}

function Task({ task, onEdit, onDelete }: TaskProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [checked, setChecked] = useState(task.completed); // Initialize with task's completed status
    const theme = useMantineTheme();

    // Calculate the percentage of subtasks completed
    const totalSubTasks = task.subTasks?.length || 0;
    const completedSubTasks = task.subTasks?.filter(subTask => subTask.completed).length || 0;
    const completionPercentage = totalSubTasks ? (completedSubTasks / totalSubTasks) * 100 : 0;

    // Generate color for each tag dot (you can customize this logic)
    const getTagColor = (tag: string) => {
        const colors = ['#FF7A00', '#6A5ACD', '#FF4500', '#4CAF50', '#FFC107', '#FAC1da']; // Add more colors as needed
        return colors[tag.length % colors.length]; // Basic color assignment based on tag length
    };

    // Format the date using date-fns
    const formattedDate = task.date ? format(new Date(task.date), 'MMM dd, yyyy') : 'No date';

    // Handle completion status change
    const handleCompleteToggle = () => {
        const updatedTask = { ...task, completed: !checked };
        setChecked(prev => !prev); // Update local state
        updateTask(updatedTask); // Update in local storage
    };

    return (
        <div style={{ marginBottom: '5px', minHeight: '100px' }}>
            <Card
                shadow="sm"
                padding="lg"
                style={{
                    position: 'relative',
                    padding: '14px',
                    backgroundColor: `linear-gradient(to right, ${theme.colors.green[2]} ${completionPercentage}%, ${theme.colors.gray[0]} ${completionPercentage}%)`,
                    opacity: checked ? 0.6 : 1, // Dim the card if completed
                    textDecoration: checked ? 'line-through' : 'none', // Strike-through if completed
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        width: '10px',
                        padding: '0',
                    }}
                >
                    {task.tags.map((tag, index) => (
                        <Tooltip key={index} label={tag}>
                            <div
                                style={{
                                    backgroundColor: getTagColor(tag),
                                    width: '100%',
                                    height: `${100 / task.tags.length}%`,
                                    minHeight: '10px',
                                    border: 'none',
                                }}
                            />
                        </Tooltip>
                    ))}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50px',
                    }}
                >
                    <ActionIcon
                        size="md"
                        variant="subtle"
                        color="blue"
                        onClick={() => onEdit(task)}
                        style={{ height: '100%' }}
                    >
                        <IconEdit size={16} />
                    </ActionIcon>
                </div>

                <div style={{ paddingLeft: '30px' }}>
                    <Title order={3}>{task.name}</Title>
                    <Text size="sm" style={{ marginTop: '4px' }}>{task.description}</Text>
                    <Text size="xs" color="dimmed" style={{ marginTop: '10px' }}>
                        {formattedDate}
                    </Text>
                </div>

                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <ActionIcon
                        style={{
                            flex: 1,
                            borderRadius: 0,
                            borderBottom: '1px solid #ddd',
                        }}
                        onClick={handleCompleteToggle} // Toggle completion status
                    >
                        <IconSquareCheck size={16} />
                    </ActionIcon>
                    <ActionIcon
                        style={{
                            flex: 1,
                            borderRadius: 0,
                        }}
                        onClick={() => onDelete(task.id)}
                    >
                        <IconTrash size={16} />
                    </ActionIcon>

                    {task.subTasks && task.subTasks.length > 0 && (
                        <ActionIcon
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                flex: '1',
                                borderRadius: 0,
                                borderTop: '1px solid #ddd',
                            }}
                        >
                            {collapsed ? <IconChevronDown size={16} /> : <IconChevronUp size={16} />}
                        </ActionIcon>
                    )}
                </div>
            </Card>
            {task.subTasks && task.subTasks.length > 0 && (
                <Collapse in={!collapsed}>
                    <Group
                        style={{
                            paddingTop: '5px',
                            paddingLeft: '20px',
                            width: '100%',
                            gap: '0px',
                        }}
                    >
                        {task.subTasks.map((subTask, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: '100%', // Ensure each subtask takes up full width and wraps
                                    margin: '0px', // Adjust margin as needed
                                }}
                            >
                                <Task
                                    task={subTask}
                                    onEdit={onEdit}
                                    onDelete={onDelete}
                                />
                            </div>
                        ))}
                    </Group>
                </Collapse>
            )}
        </div>
    );
}

export default Task;
