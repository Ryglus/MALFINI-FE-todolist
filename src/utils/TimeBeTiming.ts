import { DateTime } from 'luxon';

/**
 * Converts a Date object to a local ISO string.
 * @param date - The Date object to convert.
 * @returns The local ISO string representation of the date.
 */
export const toLocalISODateString = (date: Date | null): string | null => {
    if (date) {
        const localDate = DateTime.fromJSDate(date);
        return localDate.toISODate();
    }
    return null;
};