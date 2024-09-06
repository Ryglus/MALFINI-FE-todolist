import { useState } from 'react';
import { DatePicker, DateInput } from '@mantine/dates';
import { ActionIcon, Menu } from '@mantine/core';
import { IconCalendar } from '@tabler/icons-react';

interface DatePickerDropdownProps {
    onDateChange: (date: Date | null) => void;
    selectedDate: Date | null;
}

const DatePickerDropdown = ({ onDateChange, selectedDate }: DatePickerDropdownProps) => {
    const [isDateSelected, setIsDateSelected] = useState(!!selectedDate);

    const handleDateChange = (newDate: Date | null) => {
        onDateChange(newDate);
        setIsDateSelected(!!newDate);

    };

    return (
        <>
            {!isDateSelected || selectedDate == null ? (
                <Menu shadow="md">
                    <Menu.Target>
                        <ActionIcon size={'lg'} ><IconCalendar size={16} /></ActionIcon>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <DatePicker
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </Menu.Dropdown>
                </Menu>
            ) : (
                <DateInput
                    label="Date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    placeholder="Pick a date"
                    clearable
                />
            )}
        </>
    );
};

export default DatePickerDropdown;
