import { Divider, Text, Group, TextInput, Avatar, Stack } from '@mantine/core';
import { Link } from 'react-router-dom';

function AccountSection() {
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

                <Divider my="sm" color="#EDEDED" />

                <Stack>
                    <Link to="/">
                        <Text size="sm" color="dimmed">Today tasks</Text>
                    </Link>
                    <Stack>
                        <Text size="sm" color="#FF7A00">&bull; Personal</Text>
                        <Text size="sm" color="#6A5ACD">&bull; Freelance</Text>
                        <Text size="sm" color="#FF4500">&bull; Work</Text>
                    </Stack>
                    <TextInput placeholder="Add filter" size="xs" radius="md" />
                </Stack>

                <Divider my="sm" color="#EDEDED" />

                <Stack>
                    <Link to="/">
                        <Text size="sm" color="dimmed">Scheduled tasks</Text>
                    </Link>
                    <Link to="/settings">
                        <Text size="sm" color="dimmed">Settings</Text>
                    </Link>
                </Stack>
            </Stack>
        </div>
    );
}

export default AccountSection;
