import React, { useState } from 'react';
import {
    Button,
    TextInput,
    Text,
    Group,
    ColorPicker,
    Modal,
    Card,
    Grid,
    Tooltip,
    ActionIcon,
    Flex,
    Divider
} from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { TagType } from '../../types/TagType.ts';
import { useTasks } from '../../context/TaskContext';
import {IconEdit, IconTrash} from "@tabler/icons-react";

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

            <Card>
                <Flex justify="space-between" align="center" mb="md">
                    <Text size="xl" fw={500}>Tag Controls</Text>
                    <Button onClick={() => openModal(null)} color="blue">Add New Tag</Button>
                </Flex>
                <Divider mb={15}/>
                <Grid>
                    {tags.map(tag => (
                        <Grid.Col span={{ base: 12, sm: 6 }} key={tag.id}>
                            <Card shadow="sm" padding="lg" style={{ position: 'relative' }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        left: 0,
                                        top: 0,
                                        bottom: 0,
                                        width: '10px',
                                        backgroundColor: tag.color,
                                    }}
                                />
                                <Group align="center">
                                    <Text size="lg" fw={500}>{tag.name}</Text>
                                    <Group  style={{ marginLeft: 'auto' }}>
                                        <Tooltip label="Edit">
                                            <ActionIcon size="md" variant="subtle" color="yellow" onClick={() => openModal(tag)}>
                                                <IconEdit size={16} />
                                            </ActionIcon>
                                        </Tooltip>
                                        <Tooltip label="Delete">
                                            <ActionIcon size="md" variant="subtle" color="red" onClick={() => handleDeleteTag(tag.id)}>
                                                <IconTrash size={16} />
                                            </ActionIcon>
                                        </Tooltip>
                                    </Group>
                                </Group>
                            </Card>
                        </Grid.Col>
                    ))}
                </Grid>
            </Card>



            <Modal
                opened={isModalOpen}
                onClose={closeModal}
                title={editingTag ? 'Edit Tag' : 'Add New Tag'}
            >
                <center>
                    <TextInput
                        label="Tag Name"
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.currentTarget.value)}
                        placeholder="Enter tag name"
                    />
                    <ColorPicker
                        format="hex"
                        swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                        value={newTagColor}
                        onChange={setNewTagColor}
                        style={{marginTop: '1rem'}}
                    />
                    <Flex justify="space-between" align="center" mt={15}>
                        <Button onClick={handleSaveTag} >Save</Button>
                        <Button onClick={closeModal} variant="outline" color="red">Cancel</Button>
                    </Flex>
                </center>

            </Modal>
        </div>
    );
};

export default TagCRUDLSection;
