import React, {  useState } from 'react';
import {Link,  useNavigate} from 'react-router-dom';
import { Divider, Text, Group, Avatar, Stack, Button, useMantineTheme } from '@mantine/core';
import DatePicker from "../comprised/DatePicker";
import TaskChart from "../comprised/TaskChart";
import {toLocalISODateString} from "../../utils/TimeBeTiming.ts";

const AccountSection: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const theme = useMantineTheme();
    const navigate = useNavigate();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);

        const localISODate = toLocalISODateString(date);
        navigate(localISODate ? `/?date=${localISODate}` : `/`);
    };

    return (
        <div
            style={{
                height: '100%',
                padding: '15px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '102vh'
            }}
        >
            <Stack>
                <Group>
                    <Avatar size="lg" radius="xl" />
                    <Text size="md">Account Name</Text>
                </Group>

                <Divider />

                <TaskChart />
                <Divider />

                <DatePicker
                    currentDate={selectedDate}
                    onDateChange={handleDateChange}
                />
                <Divider />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <Stack>
                        <Text>tags</Text>
                        <Stack>
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

                    <Stack mt="md">
                        <Link to="/settings">
                            <Button size="sm" variant="light" color="dimmed" fullWidth>
                                Settings
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button size="sm" variant="light" color="dimmed" fullWidth>
                                Logout
                            </Button>
                        </Link>
                    </Stack>
                </div>
            </Stack>
        </div>
    );
};

export default AccountSection;
