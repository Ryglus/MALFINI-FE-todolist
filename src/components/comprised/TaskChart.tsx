import React from 'react';
import { Text, useMantineTheme, RingProgress, Group, Paper, Tooltip } from '@mantine/core';
import { useTasks } from '../../context/TaskContext';
import { toLocalISODateString } from '../../utils/TimeBeTiming.ts';
import {useNavigateToMainIfNotOnMain} from "../../utils/navUtil.ts";

const TaskChart: React.FC = () => {
    const theme = useMantineTheme();
    const { tasks, setSelectedDate } = useTasks();
    const navigateToMainIfNotOnMain = useNavigateToMainIfNotOnMain();

    const today = toLocalISODateString(new Date());

    const todayTasks = tasks.filter(task => toLocalISODateString(new Date(task.date)) === today);
    const totalTasks = todayTasks.length;
    const completedTasks = todayTasks.filter(task => task.completed).length;
    const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const handleClick = () => {
        setSelectedDate(new Date());
        navigateToMainIfNotOnMain();
    };

    return (
        <Tooltip label={"Click to see today's tasks"}>
            <Paper
                radius="md"
                shadow="sm"
                style={{
                    padding: '3px 0px 3px 0px',
                    cursor: 'pointer',
                }}
                onClick={handleClick}
            >
                <Group style={{ gap: '0' }}>
                    <RingProgress
                        size={60}
                        roundCaps
                        thickness={8}
                        sections={[{ value: completionPercentage, color: theme.colors.green[Math.floor((completionPercentage * 7) / 100)] }]}
                    />
                    <div>
                        <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                            {"Today's progress"}
                        </Text>
                        <Text fw={700} size="sm">
                            {`${completedTasks}/${totalTasks}`}
                        </Text>
                    </div>
                </Group>
            </Paper>
        </Tooltip>
    );
};

export default TaskChart;
