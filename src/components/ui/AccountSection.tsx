import {Divider, Text, Group, TextInput, Avatar, Stack, Button} from '@mantine/core';
import { Link } from 'react-router-dom';
import DatePicker from "../comprised/DatePicker.tsx";
import {useState} from "react";
import TaskChart from "../comprised/TaskChart.tsx";

function AccountSection() {
    const [selectedDate, setSelectedDate] = useState(new Date());

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

                <Stack>
                    <Link to="/">
                        <Button size="sm" c="dimmed">Today tasks</Button>
                    </Link>
                    <Stack>
                        <Text size="sm" c="#FF7A00">&bull; Personal</Text>
                        <Text size="sm" c="#6A5ACD">&bull; Freelance</Text>
                        <Text size="sm" c="#FF4500">&bull; Work</Text>
                    </Stack>
                    <TextInput placeholder="Add filter" size="xs" radius="md" />
                </Stack>

                <Divider />

                <Stack>
                    <Link to="/">
                        <Text size="sm" c="dimmed">Scheduled tasks</Text>
                    </Link>
                    <Link to="/settings">
                        <Text size="sm" c="dimmed">Settings</Text>
                    </Link>
                    <Divider />
                    <Link to="/">
                        <Text size="sm" c="dimmed">Logout</Text>
                    </Link>
                </Stack>
            </Stack>
        </div>
    );
}

export default AccountSection;
