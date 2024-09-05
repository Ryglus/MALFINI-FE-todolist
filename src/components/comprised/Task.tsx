import {Card, Text, Group, Tooltip, ActionIcon, Collapse} from '@mantine/core';
import { TaskType } from '../../types/TaskType.ts';
import {IconEdit, IconTrash, IconChevronDown, IconChevronUp, IconSquareCheck} from '@tabler/icons-react';
import { useState } from 'react';

interface TaskProps {
    task: TaskType;
    onEdit: (task: TaskType) => void;
    onDelete: (id: string) => void;
}

function Task({ task, onEdit, onDelete }: TaskProps) {
    const [collapsed, setCollapsed] = useState(true);
    // @ts-ignore
    let [checked, setChecked] = useState(false); // State to track if the task is completed

    // Generate color for each tag dot (you can customize this logic)
    const getTagColor = (tag: string) => {
        const colors = ['#FF7A00', '#6A5ACD', '#FF4500', '#4CAF50', '#FFC107','#FAC1da']; // Add more colors as needed
        return colors[tag.length % colors.length]; // Basic color assignment based on tag length
    };

    return (
        <div style={{marginBlock:'5px'}}>
            <Card shadow="sm" padding="lg" style={{position: 'relative'}}>
                <div
                    style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0, // This ensures the div fills the full height of the card
                        flexDirection: 'column',
                        justifyContent: 'space-between', // Distribute tags evenly along the full height
                        width: '10px',
                        padding: '0', // Padding to create space between tags and the top/bottom of the card
                    }}
                >
                    {task.tags.map((tag, index) => (
                        <Tooltip key={index} label={tag}>
                            <div
                                style={{
                                    backgroundColor: getTagColor(tag),
                                    width: '100%',
                                    height: `${100 / task.tags.length}%`, // Make the tag height proportional to the number of tags
                                    minHeight: '10px', // Ensures that tags don't get too small
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
                        width: '50px', // Adjust width as needed
                    }}
                >
                    <ActionIcon
                        size="md"
                        variant="subtle"
                        color="blue"
                        onClick={() => onEdit(task)}
                        style={{height: '100%'}} // Ensures the ActionIcon takes up full height
                    >
                        <IconEdit size={16}/>
                    </ActionIcon>
                </div>
                <div style={{paddingLeft: '25px'}}>

                    <h3>{task.name}</h3>
                    <p>{task.description}</p>
                </div>

                {/* Buttons on the right */}
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
                        onClick={() => setChecked(prevChecked => !prevChecked)}
                    >
                        <IconSquareCheck size={16}/>
                    </ActionIcon>
                    <ActionIcon
                        style={{
                            flex: 1,
                            borderRadius: 0,

                        }}
                        onClick={() => onDelete(task.id)}
                    >
                        <IconTrash size={16}/>
                    </ActionIcon>
                    {task.subTasks && (
                        <ActionIcon
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                flex: '1',
                                borderRadius: 0,
                                borderTop: '1px solid #ddd',
                            }} // 33% if subtasks are present
                        >
                            {collapsed ? <IconChevronDown size={16}/> : <IconChevronUp size={16}/>}
                        </ActionIcon>
                    )}
                </div>

            </Card>
            {/* Collapsible Subtasks */}
            {task.subTasks && (

                <Collapse in={!collapsed}>
                    <Group style={{paddingLeft: '20px'}}>
                        {task.subTasks.map((subTask, index) => (
                            <Card>
                                <Text key={index} size="sm" color="dimmed">
                                    {subTask.name}
                                </Text>
                            </Card>
                        ))}
                    </Group>
                </Collapse>

            )}
        </div>
    );
}

export default Task;
