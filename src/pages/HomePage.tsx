import TaskSection from '../components/ui/TaskSection.tsx';
import { ScrollArea, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CreateTaskSection from "../components/ui/CreateTaskSection.tsx";
import {TaskType} from "../types/TaskType.ts";
import {useState} from "react";

const HomePage = () => {
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    const handleCreateTask = (newTask: TaskType) => {
        setTasks([...tasks, newTask]); // Add new task to the list
    };
    return (
        <>
            <CreateTaskSection onCreate={handleCreateTask}/>
            <ScrollArea
                scrollHideDelay={500}
                style={{
                    height: isSmallScreen ? 'auto' : '86vh',  // Full height on larger screens, auto height on small
                    overflow: isSmallScreen ? 'visible' : 'hidden',
                    padding: '20px'
                }}
            >
                <TaskSection />
            </ScrollArea>
        </>
    );
};

export default HomePage;
