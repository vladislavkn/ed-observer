import { differenceInDays, subDays } from "date-fns";

export const formatDayAndMonth = Intl.DateTimeFormat("ru", {
  day: "numeric",
  month: "long",
}).format;

export const formatWeekDay = Intl.DateTimeFormat("ru", {
  weekday: "long",
}).format;

export const getMonday = (date: Date) => {
  date = new Date(date);
  const day = date.getDay(),
    diff = date.getDate() - day + (day === 0 ? -6 : 1);

  return new Date(date.setDate(diff));
};

export const isEmpty = (obj: any[] | Record<any, any>) =>
  (Array.isArray(obj) ? obj : obj.entries()).length === 0;

export const getWeekMonday = (day: Date) => {
  return subDays(day, Math.abs(1 - day.getDay()));
};

export const getCurrentStudyYearFirstMonday = () => {
  const currentYear = new Date().getFullYear();
  const septemberFirst = new Date(`09.01.${currentYear}`);
  return getWeekMonday(septemberFirst);
};

export const getWeekParity = (day: Date) => {
  const daysFromfirstMonday = differenceInDays(
    day,
    getCurrentStudyYearFirstMonday()
  );

  const weeksFromSeptemberFirst = Math.floor(daysFromfirstMonday / 7) + 1;

  return weeksFromSeptemberFirst % 2;
};
