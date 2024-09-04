import { Container, Divider, Paper, Text, Group, TextInput } from '@mantine/core';

function AccountSection() {
    return (
        <Container>
            <Paper  shadow="xs">
                <Text size="lg">Account Information</Text>
                <Divider my="sm" />
                <Group>

                    <TextInput placeholder="Todo tags" />
                </Group>
            </Paper>
        </Container>
    );
}

export default AccountSection;