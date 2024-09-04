// src/components/ThemeToggle.tsx
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
// @ts-ignore
import { IconSun, IconMoon } from '@tabler/icons-react';

function ThemeToggle() {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    return (
        <ActionIcon
            onClick={() => toggleColorScheme()}
            variant="default"
            size="xl"
            aria-label="Toggle color scheme"
        >
            {colorScheme === 'dark' ? (
                <IconSun stroke={1.5} />
            ) : (
                <IconMoon stroke={1.5} />
            )}
        </ActionIcon>
    );
}

export default ThemeToggle;
