import { useState } from 'react';
import { Button, ButtonGroup, Container, Grid, SimpleGrid, Drawer, Burger, useMantineTheme } from '@mantine/core';
import AccountSection from '../components/ui/AccountSection.tsx';
import TaskSection from '../components/ui/TaskSection.tsx';
import ThemeToggle from '../components/individual/ThemeToggle.tsx';

function HomePage() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);  // State for Drawer visibility
    const title = opened ? 'Close navigation' : 'Open navigation';

    return (
        <>
            {/* Hamburger menu for small screens */}
            <Burger
                opened={opened}
                onClick={() => setOpened((prev) => !prev)}
                title={title}
                size="sm"
                hiddenFrom="sm"
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 10,
                    display: 'block', // Show on small screens
                }}
            />

            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="md"
                size="sm"
                withCloseButton={false}
                style={{ backgroundColor: theme.colors.blue[5] }}
            >
                <AccountSection />
            </Drawer>

            <Container
                style={{
                    border: '6px solid',
                    borderRadius: '12px',
                    padding: '8px',
                    borderColor: theme.colors.blue[5],
                    maxWidth: '1200px',
                }}
            >
                <Grid>
                    <Grid.Col
                        style={{
                            background: theme.colors.blue[5],
                        }}
                        span={{ sm: 3, md: 3 }}
                    >
                        <div className="mantine-visible-from-sm">
                            <AccountSection  />
                        </div>
                        <div className="mantine-hidden-from-sm">
                            <ButtonGroup me="xs">
                                <ThemeToggle />
                                <Button>Add new</Button>
                            </ButtonGroup>
                        </div>
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 9 }} style={{ borderRadius: '0 5px 5px 0' }}>
                        <SimpleGrid>

                            <TaskSection />
                        </SimpleGrid>
                    </Grid.Col>
                </Grid>
            </Container>
        </>
    );
}

export default HomePage;
