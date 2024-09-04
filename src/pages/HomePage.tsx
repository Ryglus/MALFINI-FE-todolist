import ThemeToggle from "../components/individual/ThemeToggle.tsx";
import {Button, ButtonGroup, Container, Grid, SimpleGrid, useMantineTheme} from '@mantine/core';
import AccountSection from "../components/ui/AccountSection.tsx";
import TaskSection from "../components/ui/TaskSection.tsx";


function HomePage() {
    const theme = useMantineTheme();

    return (
        <>
            <Container  style={{
                border: '6px solid',
                borderRadius: '12px',
                padding: '8px',
                borderColor: theme.colors.blue[5]
            }}>
                <Grid >
                    <Grid.Col style={{ background: theme.colors.blue[5] }}  span={{ base: 12, sm: 3}}>
                        <AccountSection />
                    </Grid.Col>
                    <Grid.Col  span={{ base: 12, sm: 9 }}  style={{ borderRadius: '0 5px 5px 0' }}>
                        <SimpleGrid>
                            <ButtonGroup>
                                <ThemeToggle />
                                <Button>Add new</Button>
                            </ButtonGroup>
                            <TaskSection />
                        </SimpleGrid>


                    </Grid.Col>
                </Grid>
            </Container>

        </>
    );
}

export default HomePage;