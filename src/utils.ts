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

export const transliterate = (word: string) => {
  let answer = "",
    a: Record<string, string> = {};

  a["Ё"] = "YO";
  a["Й"] = "I";
  a["Ц"] = "TS";
  a["У"] = "U";
  a["К"] = "K";
  a["Е"] = "E";
  a["Н"] = "N";
  a["Г"] = "G";
  a["Ш"] = "SH";
  a["Щ"] = "SCH";
  a["З"] = "Z";
  a["Х"] = "H";
  a["Ъ"] = "'";
  a["ё"] = "yo";
  a["й"] = "i";
  a["ц"] = "ts";
  a["у"] = "u";
  a["к"] = "k";
  a["е"] = "e";
  a["н"] = "n";
  a["г"] = "g";
  a["ш"] = "sh";
  a["щ"] = "sch";
  a["з"] = "z";
  a["х"] = "h";
  a["ъ"] = "'";
  a["Ф"] = "F";
  a["Ы"] = "I";
  a["В"] = "V";
  a["А"] = "a";
  a["П"] = "P";
  a["Р"] = "R";
  a["О"] = "O";
  a["Л"] = "L";
  a["Д"] = "D";
  a["Ж"] = "ZH";
  a["Э"] = "E";
  a["ф"] = "f";
  a["ы"] = "i";
  a["в"] = "v";
  a["а"] = "a";
  a["п"] = "p";
  a["р"] = "r";
  a["о"] = "o";
  a["л"] = "l";
  a["д"] = "d";
  a["ж"] = "zh";
  a["э"] = "e";
  a["Я"] = "Ya";
  a["Ч"] = "CH";
  a["С"] = "S";
  a["М"] = "M";
  a["И"] = "I";
  a["Т"] = "T";
  a["Ь"] = "'";
  a["Б"] = "B";
  a["Ю"] = "YU";
  a["я"] = "ya";
  a["ч"] = "ch";
  a["с"] = "s";
  a["м"] = "m";
  a["и"] = "i";
  a["т"] = "t";
  a["ь"] = "'";
  a["б"] = "b";
  a["ю"] = "yu";

  for (let letter of word) answer += a[letter] ?? letter;

  return answer;
};

export const createEventEmmiter = () => {
  const listeners = new Map<string, Set<(...args: any[]) => any>>();

  const subscribe = (event: string, callback: (...args: any[]) => void) => {
    if (!listeners.has(event)) listeners.set(event, new Set());
    listeners.get(event)?.add(callback);

    return () => {
      listeners.get(event)?.delete(callback);
    };
  };

  const emit = (event: string, ...args: any[]) =>
    listeners.get(event)?.forEach((listener) => listener(...args));

  return { subscribe, emit };
};

export default async function asyncMap<T extends Array<any>>(
  array: T,
  callback: (value: T[number], index: number) => Promise<any>
) {
  return Promise.all(array.map(callback));
}
