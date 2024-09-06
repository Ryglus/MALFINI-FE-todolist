import { Text, useMantineTheme, RingProgress, Group, Paper, Tooltip } from '@mantine/core';
import { Link } from 'react-router-dom';
import {toLocalISODateString} from "../../utils/TimeBeTiming.ts";

const TaskChart = () => {
    const theme = useMantineTheme();
    let value: number = 100;
    const today = toLocalISODateString( new Date()); // Format YYYY-MM-DD
    return (
        <Link to={`/tasks?date=${today}`} style={{ textDecoration: 'none' }}>
            <Tooltip label={"Click to see today's tasks"}>
                <Paper
                    radius="md"
                    shadow={'sm'}
                    style={{
                        padding: '3px 0px 3px 0px',
                        cursor: 'pointer', // Make the cursor a pointer
                    }}
                >
                    <Group style={{ gap: '0' }}>
                        <RingProgress
                            size={60}
                            roundCaps
                            thickness={8}
                            sections={[{ value: value, color: theme.colors.green[Math.floor((value * 7) / 100)] }]}
                        />
                        <div>
                            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
                                {"Today's progress"}
                            </Text>
                            <Text fw={700} size="sm">
                                {"15/15"}
                            </Text>
                        </div>
                    </Group>
                </Paper>
            </Tooltip>
        </Link>
    );
};

export default TaskChart;
