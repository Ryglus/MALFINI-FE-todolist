import React, { useEffect } from 'react';
import { Stack, Text, Chip } from '@mantine/core';
import { useTasks } from '../../context/TaskContext';
import { useNavigateToMainIfNotOnMain } from "../../utils/navUtil.ts";

const TagSection: React.FC = () => {
    const { tags, selectedTags, setSelectedTags } = useTasks();
    const navigateToMainIfNotOnMain = useNavigateToMainIfNotOnMain();

    const [selectedTagIds, setSelectedTagIds] = React.useState<string[]>(selectedTags);

    useEffect(() => {
        setSelectedTagIds(selectedTags);
    }, [selectedTags]);

    const handleTagChange = (newSelectedTagIds: string[]) => {
        setSelectedTagIds(newSelectedTagIds);
        setSelectedTags(newSelectedTagIds);
        navigateToMainIfNotOnMain();
    };

    return (
        <Stack>
            <Text size="lg">Filter by Tags</Text>
            <Chip.Group multiple value={selectedTagIds} onChange={handleTagChange}>
                {tags.map(tag => (
                    <Chip key={tag.id} value={tag.id} color={tag.color}>
                        {tag.name}
                    </Chip>
                ))}
            </Chip.Group>
        </Stack>
    );
};

export default TagSection;
