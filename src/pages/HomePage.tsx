import ThemeToggle from "../components/individual/ThemeToggle.tsx";
import { Grid } from '@mantine/core';
import AccountSection from "../components/ui/AccountSection.tsx";
import TaskSection from "../components/ui/TaskSection.tsx";


function Home() {
    return (
        <>
            <ThemeToggle />
            <Grid>
                <Grid.Col span={{ base: 12, sm: 3}}>
                    <AccountSection />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 9 }}>
                    <TaskSection />
                </Grid.Col>
            </Grid>
        </>
    );
}

export default Home;