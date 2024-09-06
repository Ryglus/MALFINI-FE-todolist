import {Text, useMantineTheme, RingProgress, Group, Paper} from '@mantine/core';

const TaskChart = () => {
    const theme = useMantineTheme();
    let value:number = 100;
    return (
        <Paper radius="md" shadow={'sm'} key={"asd"} style={{padding:'3px 0px 3px 0px'}}>
            <Group style={{gap:'0'}}>
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
    );
};

export default TaskChart;
