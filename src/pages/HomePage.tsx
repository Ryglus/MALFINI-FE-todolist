import { Card, ScrollArea, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import CreateTaskSection from "../components/ui/CreateTaskSection";
import TaskSection from '../components/ui/TaskSection';

const HomePage = () => {
    const theme = useMantineTheme();
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    return (
        <>
            <Card className="mantine-visible-from-md" style={{ margin: '20px 15px 0px 0px' }}>
                <CreateTaskSection />
            </Card>

            <ScrollArea
                scrollHideDelay={500}
                style={{
                    height: isSmallScreen ? '100%' : '73vh',
                    overflow: isSmallScreen ? 'visible' : 'hidden',
                    padding: '20px'
                }}
                className="mantine-visible-from-md"
            >
                <TaskSection />
            </ScrollArea>
            <div
                style={{
                    height: '100%',
                    padding: '20px'
                }}
                className="mantine-hidden-from-md"
            >
                <TaskSection />
            </div>
        </>
    );
};

export default HomePage;