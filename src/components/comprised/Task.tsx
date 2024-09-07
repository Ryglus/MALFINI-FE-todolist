import { useState } from 'react';
import {
    Card,
    Text,
    Group,
    Tooltip,
    ActionIcon,
    Collapse,
    useMantineTheme,
    Title,
    Progress
} from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import { IconEdit, IconTrash, IconChevronDown, IconChevronUp, IconSquareCheck } from '@tabler/icons-react';
import { useTasks } from '../../context/TaskContext'; // Import the context
import { format } from 'date-fns';

interface TaskProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
}

function Task({ task, onEdit }: TaskProps) {
    const [collapsed, setCollapsed] = useState(true);
    const [checked, setChecked] = useState(task.completed);
    const theme = useMantineTheme();
    const { updateTask, deleteTask } = useTasks();

    const totalSubTasks = task.subTasks?.length || 0;
    const completedSubTasks = task.subTasks?.filter(subTask => subTask.completed).length || 0;
    const completionPercentage = totalSubTasks ? (completedSubTasks / totalSubTasks) * 100 : 0;

    const getTagColor = (tag: string) => {
        const colors = ['#FF7A00', '#6A5ACD', '#FF4500', '#4CAF50', '#FFC107', '#FAC1da'];
        return colors[tag.length % colors.length];
    };

    const formattedDate = task.date ? format(new Date(task.date), 'MMM dd, yyyy') : 'No date';

    const handleCompleteToggle = () => {
        const updatedTask = { ...task, completed: !checked };
        setChecked(prev => !prev);
        updateTask(updatedTask);
    };

    const handleDelete = () => {
        deleteTask(task.id);
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
                    opacity: checked ? 0.6 : 1,
                    textDecoration: checked ? 'line-through' : 'none',
                }}
            >
                {task.subTasks && task.subTasks.length > 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Progress
                            style={{ borderRadius: '0', height: '3px' }}
                            value={(task.subTasks.filter(subTask => subTask.completed).length / task.subTasks.length) * 100}
                            transitionDuration={250}
                        />
                    </div>
                )}
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
                        <Tooltip.Floating key={index} label={tag}>
                            <div
                                style={{
                                    backgroundColor: getTagColor(tag),
                                    width: '100%',
                                    height: `${100 / task.tags.length}%`,
                                    minHeight: '10px',
                                    border: 'none',
                                }}
                            />
                        </Tooltip.Floating>
                    ))}
                </div>
                <div
                    style={{
                        position: 'absolute',
                        left: 10,
                        top: 0,
                        gap: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
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
                        onClick={handleCompleteToggle}
                    >
                        <IconSquareCheck size={16} />
                    </ActionIcon>
                    <ActionIcon
                        style={{
                            flex: 1,
                            borderRadius: 0,
                        }}
                        onClick={handleDelete}
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
                                    flex: '100%',
                                    margin: '0px',
                                }}
                            >
                                <Task
                                    task={subTask}
                                    onEdit={onEdit}
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
