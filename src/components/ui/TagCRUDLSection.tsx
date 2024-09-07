import React, { useState } from 'react';
import { Button, TextInput, Stack, Text, Group, ColorPicker, Modal } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { TagType } from '../../types/TagType.ts';
import { useTasks } from '../../context/TaskContext';

const TagCRUDLSection: React.FC = () => {
    const { tags, addTag, updateTag, deleteTag } = useTasks();
    const [editingTag, setEditingTag] = useState<TagType | null>(null);
    const [newTagName, setNewTagName] = useState('');
    const [newTagColor, setNewTagColor] = useState('#ffffff');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = (tag: TagType | null) => {
        if (tag) {
            setEditingTag(tag);
            setNewTagName(tag.name);
            setNewTagColor(tag.color);
        } else {
            setEditingTag(null);
            setNewTagName('');
            setNewTagColor('#ffffff');
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSaveTag = () => {
        if (!newTagName) {
            alert('Tag name is required');
            return;
        }

        const tag: TagType = {
            id: editingTag ? editingTag.id : uuidv4(),
            name: newTagName,
            color: newTagColor
        };

        if (editingTag) {
            updateTag(tag);
        } else {
            addTag(tag);
        }

        closeModal();
    };

    const handleDeleteTag = (tagId: string) => {
        if (window.confirm('Are you sure you want to delete this tag?')) {
            deleteTag(tagId);
        }
    };

    return (
        <div>
            <Button onClick={() => openModal(null)} color="blue" mb="md">Add New Tag</Button>
            <Stack>
                {tags.map(tag => (
                    <Group key={tag.id}>
                        <Text style={{ color: tag.color }}>{tag.name}</Text>
                        <Group>
                            <Button onClick={() => openModal(tag)} color="yellow" size="xs">Edit</Button>
                            <Button onClick={() => handleDeleteTag(tag.id)} color="red" size="xs">Delete</Button>
                        </Group>
                    </Group>
                ))}
            </Stack>

            <Modal
                opened={isModalOpen}
                onClose={closeModal}
                title={editingTag ? 'Edit Tag' : 'Add New Tag'}
            >
                <TextInput
                    label="Tag Name"
                    value={newTagName}
                    onChange={(e) => setNewTagName(e.currentTarget.value)}
                    placeholder="Enter tag name"
                />
                <ColorPicker
                    format="hex"
                    value={newTagColor}
                    onChange={setNewTagColor}
                    style={{ marginTop: '1rem' }}
                />
                <Group mt="md">
                    <Button onClick={closeModal} variant="outline">Cancel</Button>
                    <Button onClick={handleSaveTag} color="blue">Save</Button>
                </Group>
            </Modal>
        </div>
    );
};

export default TagCRUDLSection;
