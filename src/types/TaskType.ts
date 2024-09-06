export interface TaskType {
    id: string;
    subTasks?: this[];
    tags: string[];
    date: string;
    description?: string;
    name: string;
    completed: boolean;
}