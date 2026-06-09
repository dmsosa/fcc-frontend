import { nanoid } from "@reduxjs/toolkit";
import type { TTodo } from "../store/todosSlice";

export const mockTodos: TTodo[] = [
  {
    id: nanoid(),
    text: "Finish React form validation article",
    completed: false,
    priority: "high",
  },
  {
    id: nanoid(),
    text: "Refactor filter logic for performance",
    completed: true,
    priority: "medium",
  },
  {
    id: nanoid(),
    text: "Read about React Hook Form + Zod",
    completed: false,
    priority: "medium",
  },
  {
    id: nanoid(),
    text: "Update LinkedIn profile",
    completed: true,
    priority: "low",
  },
  {
    id: nanoid(),
    text: "Plan next learning sprint",
    completed: false,
    priority: "high",
  },
  {
    id: nanoid(),
    text: "Clean up old side projects",
    completed: false,
    priority: "low",
  },
];
