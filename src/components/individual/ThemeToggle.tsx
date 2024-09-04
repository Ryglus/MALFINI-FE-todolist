
import { Button, useMantineColorScheme} from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';

function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <Button
            onClick={() => toggleColorScheme()}

            aria-label="Toggle color scheme"
        >
            {colorScheme === 'dark' ? (
                <IconSun stroke={1.5} />
            ) : (
                <IconMoon stroke={1.5} />
            )}
        </Button>
    );
}

export default ThemeToggle;
