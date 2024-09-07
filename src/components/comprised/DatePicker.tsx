import React, { useEffect, useState } from 'react';
import { Text, Group, useMantineTheme, Button } from '@mantine/core';
import { addDays, subDays } from 'date-fns';

interface DatePickerProps {
    currentDate: Date | null;
    onDateChange: (date: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ currentDate, onDateChange }) => {
    const theme = useMantineTheme();
    const { colors } = theme;
    const [startDate, setStartDate] = useState<Date>(subDays(new Date(), 2));

    useEffect(() => {
        if (currentDate) {
            setStartDate(subDays(currentDate, 2));
        } else {
            setStartDate(subDays(new Date(), 2));
        }
    }, [currentDate]);

    const dates = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));

    const handleDateChange = (date: Date | null) => {
        onDateChange(date);
    };
    const handleDefaultChange = () => {
        onDateChange(null);
    }
    return (
        <div style={{ margin: '0 auto', width: '100%' }}>
            <Group
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '1px',
                    marginBottom: '10px',
                }}
            >
                {dates.map((date) => {
                    const isSelected = currentDate && date.toDateString() === currentDate.toDateString();
                    return (
                        <Button
                            variant="light"
                            color="dimmed"
                            key={date.toDateString()}
                            style={{
                                flexGrow: 1,
                                padding: '8px',
                                color: isSelected ? colors.gray[0] : colors.dark[6],
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                                textAlign: 'center',
                            }}
                            onClick={() => handleDateChange(date)}
                        >
                            <Text>{date.getDate()}</Text>
                        </Button>
                    );
                })}
            </Group>

            {/* All Tasks Button */}
            <Button
                variant="light"
                color="dimmed"
                fullWidth
                style={{
                    padding: '8px',
                    color: !currentDate ? colors.gray[0] : colors.dark[7],
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease',
                    textAlign: 'center',
                }}
                onClick={() => handleDefaultChange()}
            >
                All tasks
            </Button>
        </div>
    );
};

export default DatePicker;
