import { Card, ScrollArea, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CreateTaskSection from "../components/ui/CreateTaskSection";
import { TaskType } from "../types/TaskType";
import { useState, useEffect } from "react";
import { loadTasks } from '../utils/taskStorage';
import TaskSection from '../components/ui/TaskSection';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);
    const [, setTasks] = useState<TaskType[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const location = useLocation();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const dateParam = query.get('date');

        if (dateParam) {
            const date = new Date(dateParam);
            setSelectedDate(date);
        } else {
            setSelectedDate(null);
        }
    }, [location.search]);

    useEffect(() => {
        const allTasks = loadTasks();
        setTasks(allTasks);
        setFilteredTasks(filterTasksByDate(allTasks, selectedDate));
    }, [selectedDate]);

    const filterTasksByDate = (tasks: TaskType[], date: Date | null): TaskType[] => {
        if (!date) return tasks;

        return tasks.filter(task => {
            const taskDate = new Date(task.date);
            return taskDate.toDateString() === date.toDateString();
        });
    };

    const handleCreateTask = () => {
        const updatedTasks = loadTasks();
        setTasks(updatedTasks);
        setFilteredTasks(filterTasksByDate(updatedTasks, selectedDate));
    };

    return (
        <>
            <Card className="mantine-visible-from-md" style={{ margin: '20px 15px 0px 0px' }}>
                <CreateTaskSection onCreate={handleCreateTask} />
            </Card>

            <ScrollArea
                scrollHideDelay={500}
                style={{
                    height: isSmallScreen ? '100%' : '73vh',
                    overflow: isSmallScreen ? 'visible' : 'hidden',
                    padding: '20px'
                }}
                className="mantine-visible-from-md"
            >
                <TaskSection tasks={filteredTasks} setTasks={setTasks} />
            </ScrollArea>
            <div
                style={{
                    height: '100%',
                    padding: '20px'
                }}
                className="mantine-hidden-from-md"
            >
                <TaskSection tasks={filteredTasks} setTasks={setTasks} />
            </div>
        </>
    );
};

export default HomePage;
