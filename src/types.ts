import React from "react";
import { GenericType } from "typescript";

export type Lesson = {
  name: string;
  id: string;
  teacher?: string;
  adress?: string;
  homework?: string;
  type: "lection" | "practice";
};

export type Weekday = {
  isOnline?: boolean;
  date: Date;
  lessons: Lesson[];
  id: string;
};
