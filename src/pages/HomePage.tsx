import TaskSection from '../components/ui/TaskSection.tsx';
import { ScrollArea, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CreateTaskSection from "../components/ui/CreateTaskSection.tsx";
import { TaskType } from "../types/TaskType.ts";
import { useState, useEffect } from "react";
import { loadTasks, addTask } from '../utils/taskStorage.ts';

const HomePage = () => {
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        // Load initial tasks from local storage
        setTasks(loadTasks());
    }, []);

    const handleCreateTask = (newTask: TaskType) => {
        addTask(newTask);
        setTasks(prevTasks => [...prevTasks, newTask]);
    };

    return (
        <>
            <CreateTaskSection onCreate={handleCreateTask} />
            <ScrollArea
                scrollHideDelay={500}
                style={{
                    height: isSmallScreen ? 'auto' : '86vh',  // Full height on larger screens, auto height on small
                    overflow: isSmallScreen ? 'visible' : 'hidden',
                    padding: '20px'
                }}
            >
                <TaskSection tasks={tasks} setTasks={setTasks} />
            </ScrollArea>
        </>
    );
};

export default HomePage;
