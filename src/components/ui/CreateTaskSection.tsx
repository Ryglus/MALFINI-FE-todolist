import { useState } from 'react';
import {TextInput, MultiSelect, Button, Collapse, Select, Grid, Group} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from '../../types/TaskType.ts';
import DatePickerDropdown from "../comprised/DatePickerDropdown.tsx";
import { addTask, loadTasks, updateTask } from '../../utils/taskStorage.ts';

interface CreateTaskSectionProps {
    onCreate: () => void;
}

const CreateTaskSection = ({ onCreate }: CreateTaskSectionProps) => {
    const [taskName, setTaskName] = useState('');
    const [tags, setTags] = useState<string[]>([]);
    const [date, setDate] = useState<Date | null>(null);
    const [description, setDescription] = useState('');
    const [expanded, setExpanded] = useState(false);
    const [existingTaskId, setExistingTaskId] = useState<string | null>(null);

    const tasks = loadTasks();

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
            completed: false
        };

        if (existingTaskId) {
            const selectedTask = tasks.find(task => task.id === existingTaskId);
            if (selectedTask) {
                if (!selectedTask.hasOwnProperty("subTasks")) selectedTask.subTasks = [];
                // @ts-ignore
                selectedTask.subTasks.push(newTask);
                updateTask(selectedTask);
                onCreate();
            }
        } else {
            addTask(newTask);
            onCreate();
        }

        setTaskName('');
        setTags([]);
        setDate(null);
        setDescription('');
        setExpanded(false);
        setExistingTaskId(null);
    };

    return (
        <div>
            <Grid align="center">
                <Grid.Col span={12}>
                    <Group>
                    <TextInput
                        placeholder="Task Name"
                        value={taskName}
                        onChange={(event) => {
                            const name = event.currentTarget.value;
                            setTaskName(name);
                            if (name) {
                                setExpanded(true);
                            } else {
                                setExpanded(false);
                            }
                        }}
                        required
                        label="NEW TASK"
                        style={{ transition: 'width 0.3s ease', width: expanded ? '50%' : '100%' }}
                    />
                    <Collapse in={expanded}>

                            <MultiSelect
                                placeholder="Tags"
                                data={['urgent', 'shopping', 'work', 'personal']}
                                value={tags}
                                onChange={setTags}
                                label="Tags"
                                searchable
                                style={{maxWidth:'130px'}}
                            />



                    </Collapse>
                        <Collapse in={expanded}>
                            <Select
                                placeholder="Subtask"
                                data={tasks.map(task => ({ value: task.id, label: task.name }))}
                                value={existingTaskId}
                                onChange={setExistingTaskId}
                                label="Sub-Task of"
                                searchable
                                style={{maxWidth:'130px'}}
                            />
                        </Collapse>
                    </Group>
                </Grid.Col>

                <Grid.Col span={12}>
                    <Collapse in={expanded}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {!date? (
                                <span style={{paddingTop:'25px'}}><DatePickerDropdown selectedDate={date} onDateChange={setDate} /></span>
                            ) : (
                                <DatePickerDropdown selectedDate={date} onDateChange={setDate}/>
                            )}

                            <TextInput
                                placeholder="Description"
                                value={description}
                                onChange={(event) => setDescription(event.currentTarget.value)}
                                label="Description"
                                style={{width:'100%'}}
                            />
                        </div>

                        <Button
                            onClick={handleCreateTask}
                            color="blue"
                            style={{ width: '100%', marginTop: '16px' }}
                        >
                            Create Task
                        </Button>
                    </Collapse>
                </Grid.Col>
            </Grid>
        </div>
    );
};

export default CreateTaskSection;
