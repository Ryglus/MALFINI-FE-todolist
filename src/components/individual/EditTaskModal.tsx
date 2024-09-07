import React, { useState, useEffect } from 'react';
import {Modal, TextInput, Textarea, Button, MultiSelect, Flex, Group} from '@mantine/core';
import { TaskType } from '../../types/TaskType';
import DatePickerDropdown from '../comprised/DatePickerDropdown';
import { useTasks } from '../../context/TaskContext';

interface EditTaskModalProps {
    task: TaskType;
    opened: boolean;
    onClose: () => void;
    onSave: (updatedTask: TaskType) => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ task, opened, onClose, onSave }) => {
    const { tags: allTags } = useTasks();
    const [name, setName] = useState(task.name);
    const [description, setDescription] = useState(task.description || '');
    const [date, setDate] = useState<Date | null>(task.date ? new Date(task.date) : null);
    const [selectedTags, setSelectedTags] = useState<string[]>(task.tags || []);
    const [tagOptions, setTagOptions] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        setTagOptions(allTags.map(tag => ({ value: tag.id, label: tag.name })));
    }, [allTags]);

    const handleSave = () => {
        onSave({ ...task, name, description, date: date?.toISOString() || '', tags: selectedTags });
        onClose();
    };

    // @ts-ignore
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title="Edit Task"
            size="lg"
        >
            <TextInput
                label="Task Name"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
            />
            <Group>
                {date ? (
                    <DatePickerDropdown selectedDate={date} onDateChange={setDate}/>
                ) : (
                    <span style={{paddingTop: '40px'}}>
                                    <DatePickerDropdown selectedDate={date} onDateChange={setDate}/>
                                </span>
                )}
                <MultiSelect
                    label="Tags"
                    data={tagOptions}
                    value={selectedTags}
                    onChange={setSelectedTags}
                />
            </Group>
            <Textarea
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.currentTarget.value)}
                mt="md"
            />


            <Flex justify="space-between" align="center" mt={15}>
                <Button onClick={handleSave}>Save</Button>
                <Button onClick={onClose} variant="outline" color='red'>Cancel</Button>
            </Flex>
        </Modal>
    );
};

export default EditTaskModal;
