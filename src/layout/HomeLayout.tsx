import {
    Burger,
    Button,
    ButtonGroup,
    Container,
    Drawer,
    Grid, Title,
    useMantineTheme
} from "@mantine/core";
import AccountSection from "../components/ui/AccountSection.tsx";
import {IconPlus} from "@tabler/icons-react";
import {useState} from "react";
import {Outlet} from "react-router-dom";
import {useMediaQuery} from '@mantine/hooks';

interface HomeLayoutProps {
    title?: string
}

const HomeLayout = ({title}: HomeLayoutProps) => {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const isSmallScreen = useMediaQuery(`(max-width: ${theme.breakpoints.md}px)`);

    return (
        <div>
            <Drawer
                opened={opened}
                onClose={() => setOpened(false)}
                padding="md"
                size="sm"
                withCloseButton={true}
                title={title}
            >
                <AccountSection/>
            </Drawer>

            {/* Layout for larger screens */}
            <Container
                style={{
                    border: '6px solid',
                    borderRadius: '12px',
                    padding: '0px',
                    borderColor: theme.colors.blue[5],
                    height: isSmallScreen ? 'auto' : '85vh',
                    overflow: isSmallScreen ? 'visible' : 'hidden',
                }}
                mt={"xl"}
                className="mantine-visible-from-md"
            >
                <Grid>
                    <Grid.Col
                        span={{base: 3, md: 3}}
                        style={{
                            backgroundColor: theme.colors.blue[5],
                        }}
                    >
                        <AccountSection/>
                    </Grid.Col>

                    <Grid.Col span={{base: 12, sm: 9}} style={{padding:'0 6px 0 0'}}>
                        <Outlet/>
                    </Grid.Col>
                </Grid>
            </Container>

            {/* Layout for smaller screens */}
            <Container
                style={{
                    padding: '0',
                    maxWidth: '100vw',
                    border: 'none',
                    borderRadius: '0',
                    height: 'auto',
                }}
                className="mantine-hidden-from-md"
            >
                <div
                    style={{
                        backgroundColor: theme.colors.blue[5],
                        padding: '20px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((prev) => !prev)}
                        size="sm"
                    />
                    <Title order={1} ml={"md"}>{title}</Title>
                    <ButtonGroup  style={{justifyContent: 'flex-end', width: '100%'}}>
                        <Button leftSection={<IconPlus/>}> New</Button>
                    </ButtonGroup>
                </div>

                <span
                    style={{
                        position: 'absolute',
                        backgroundColor: theme.colors.blue[5],
                        height: '100px',
                        width: '100%',
                        zIndex: -1
                    }}
                />
                <Outlet/>
            </Container>
        </div>
    );
};

export default HomeLayout;
