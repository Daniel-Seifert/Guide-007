import { startOfISOWeek, startOfWeek, set, parseISO } from 'date-fns';

export function makeISOKeyFromDate(date: Date): string {
  const firstDayInWeek = set(startOfWeek(date, { weekStartsOn: 1 }), {
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  return firstDayInWeek.toISOString();
}

export function getDateFromISOKey(key: string): Date {
  return parseISO(key);
}
