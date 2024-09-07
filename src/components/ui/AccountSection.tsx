import React from 'react';
import { Link } from 'react-router-dom';
import { Divider, Text, Group, Avatar, Stack, Button, useMantineTheme } from '@mantine/core';
import DatePicker from "../comprised/DatePicker";
import TaskChart from "../comprised/TaskChart";
import { useTasks } from '../../context/TaskContext';
import {useNavigateToMainIfNotOnMain} from "../../utils/navUtil.ts";
import TagSection from "./TagSection.tsx";

const AccountSection: React.FC = () => {
    const { selectedDate, setSelectedDate,setSelectedTags } = useTasks();
    useMantineTheme();
    const navigateToMainIfNotOnMain = useNavigateToMainIfNotOnMain();

    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
        if (date) setSelectedDate(date);
        else {
            setSelectedDate(date);
            setSelectedTags([]);
        }
        navigateToMainIfNotOnMain();
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
                        <TagSection />
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