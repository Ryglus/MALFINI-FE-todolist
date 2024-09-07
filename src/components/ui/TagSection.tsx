import React, { useEffect } from 'react';
import { Text, Chip, Group} from '@mantine/core';
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
        <Group>
            <Text size="lg">Filter by Tags</Text>
            <Chip.Group multiple value={selectedTagIds} onChange={handleTagChange}>
                {tags.map(tag => (
                    <Chip key={tag.id} value={tag.id} color={tag.color}>
                        {tag.name}
                    </Chip>
                ))}
            </Chip.Group>
        </Group>
    );
};

export default TagSection;
