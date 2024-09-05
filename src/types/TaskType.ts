
export interface TaskType {
    id: string;
    subTasks?: this[];
    tags: string[];
    date: string; // ISO date string or a format suitable for your date picker
    description?: string;
    name: string;
}