import React from 'react';
import { MultiSelect, Stack, Text } from '@mantine/core';
import { useTasks } from '../../context/TaskContext';

const TagSection: React.FC = () => {
    const { tasks, setSelectedTags } = useTasks();
    const allTags = Array.from(new Set(tasks.flatMap(task => task.tags))); // Extract all unique tags

    const handleTagChange = (tags: string[]) => {
        setSelectedTags(tags); // Set selected tags for filtering
    };

    return (
        <Stack>
            <Text size="lg">Filter by Tags</Text>
            <MultiSelect
                data={allTags.map(tag => ({ value: tag, label: tag }))}
                placeholder="Select tags"
                onChange={handleTagChange}
            />
        </Stack>
    );
};

export default TagSection;
