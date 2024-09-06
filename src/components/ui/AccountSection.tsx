import {Divider, Text, Group, Avatar, Stack, Button, useMantineTheme} from '@mantine/core';
import { Link } from 'react-router-dom';
import DatePicker from "../comprised/DatePicker.tsx";
import {useState} from "react";
import TaskChart from "../comprised/TaskChart.tsx";

function AccountSection() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const theme = useMantineTheme();
    return (
        <div
            style={{
                height: '100%',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight:'102vh'
            }}
        >
            <Stack>
                <Group>
                    <Avatar size="lg" radius="xl" />
                    <Text size="md">Account Name</Text>
                </Group>

                <Divider/>

                <TaskChart />
                <Divider/>

                <DatePicker selectedDate={selectedDate} onDateChange={setSelectedDate} />

                <Divider/>

                <div
                    style={{

                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack>
                        <Link to="/">
                            <Button
                                size="sm"
                                variant="light"
                                color="dimmed"
                                fullWidth
                            >
                                Today tasks
                            </Button>
                        </Link>
                        <Stack >
                            <Text size="sm" c={theme.colors.orange[6]}>
                                &bull; Personal
                            </Text>
                            <Text size="sm" c={theme.colors.blue[6]}>
                                &bull; Freelance
                            </Text>
                            <Text size="sm" c={theme.colors.red[6]}>
                                &bull; Work
                            </Text>
                        </Stack>
                    </Stack>

                    <Divider my="sm" />

                    <Stack  mt="md">
                        <Link to="/">
                            <Button
                                size="sm"
                                variant="light"
                                color="dimmed"
                                fullWidth
                            >
                                Scheduled tasks
                            </Button>
                        </Link>
                        <Link to="/settings">
                            <Button
                                size="sm"
                                variant="light"
                                color="dimmed"
                                fullWidth
                            >
                                Settings
                            </Button>
                        </Link>
                        <Divider my="sm" />
                        <Link to="/">
                            <Button
                                size="sm"
                                variant="light"
                                color="dimmed"
                                fullWidth
                            >
                                Logout
                            </Button>
                        </Link>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
}

export default AccountSection;
