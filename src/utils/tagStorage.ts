import { TagType } from '../types/TagType.ts';

const LOCAL_STORAGE_KEY = 'tags';

export const loadTags = (): TagType[] => {
    const tagsJson = localStorage.getItem(LOCAL_STORAGE_KEY);
    return tagsJson ? JSON.parse(tagsJson) as TagType[] : [];
};

export const saveTags = (tags: TagType[]): void => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tags));
};

export const addTag = (tag: TagType): void => {
    const tags = loadTags();
    if (!tags.some(existingTag => existingTag.id === tag.id)) {
        tags.push(tag);
        saveTags(tags);
    }
};

export const updateTag = (updatedTag: TagType): void => {
    const tags = loadTags();
    const tagIndex = tags.findIndex(existingTag => existingTag.id === updatedTag.id);
    if (tagIndex > -1) {
        tags[tagIndex] = updatedTag;
        saveTags(tags);
    }
};

export const deleteTag = (tagId: string): void => {
    const tags = loadTags();
    const updatedTags = tags.filter(tag => tag.id !== tagId);
    saveTags(updatedTags);
};
