import React from 'react';
import { Text, Group, useMantineTheme, Button} from '@mantine/core';
import { format, addDays, subDays } from 'date-fns';

interface DatePickerProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange }) => {
    const theme = useMantineTheme();
    const { colors } = theme;

    const startDate = subDays(selectedDate, 2);
    const dates = Array.from({ length: 5 }, (_, i) => addDays(startDate, i));

    return (
        <div style={{margin:'0 auto'}}>
            <Group style={{ overflowY: "hidden", display: 'flex', gap:'1px' }}>
                {dates.map((date) => {
                    const isSelected = date.toDateString() === selectedDate.toDateString();
                    return (
                        <Button
                            key={date.toDateString()}
                            style={{
                                padding:'8px',
                                color: isSelected ? colors.gray[0] : colors.dark[7],
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease',
                            }}
                            onClick={() => onDateChange(date)}
                        >
                            <Text>
                                {format(date, 'dd')}
                            </Text>
                        </Button>
                    );
                })}
            </Group>
        </div>
    );
};

export default DatePicker;
