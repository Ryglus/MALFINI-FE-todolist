import TaskSection from '../components/ui/TaskSection.tsx';
import {Card, ScrollArea, useMantineTheme} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CreateTaskSection from "../components/ui/CreateTaskSection.tsx";
import { TaskType } from "../types/TaskType.ts";
import { useState, useEffect } from "react";
import { loadTasks } from '../utils/taskStorage.ts';

const HomePage = () => {
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        setTasks(loadTasks());
    }, []);

    const handleCreateTask = () => {
        setTasks(loadTasks());
    };

    return (
        <>
            <Card className="mantine-visible-from-md" style={{margin:'20px 15px 0px 0px'}}>
                <CreateTaskSection onCreate={handleCreateTask} />
            </Card>

            <ScrollArea
                scrollHideDelay={500}
                style={{
                    height: isSmallScreen ? 'auto' : '73vh',
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
