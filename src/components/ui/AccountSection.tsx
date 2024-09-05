import { Divider, Paper, Text, Group, TextInput, Avatar, Stack } from '@mantine/core';

function AccountSection() {

    return (
        <Paper
            style={{
                height: '100%',
                borderRadius: '20px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}
        >
            <Stack>
                <Group>
                    <Avatar size="lg" radius="xl" />
                    <Text size="md">Account Name</Text>
                </Group>

                <Divider my="sm" color="#EDEDED" />

                <Stack>
                    <Text size="sm" color="dimmed">Today tasks</Text>
                    <Stack>
                        <Text size="sm" color="#FF7A00">&bull; Personal</Text>
                        <Text size="sm" color="#6A5ACD">&bull; Freelance</Text>
                        <Text size="sm" color="#FF4500">&bull; Work</Text>
                    </Stack>
                    <TextInput placeholder="Add filter" size="xs" radius="md" />
                </Stack>

                <Divider my="sm" color="#EDEDED" />

                <Stack>
                    <Text size="sm" color="dimmed">Scheduled tasks</Text>
                    <Text size="sm" color="dimmed">Settings</Text>
                </Stack>
            </Stack>
        </Paper>
    );
}

export default AccountSection;
