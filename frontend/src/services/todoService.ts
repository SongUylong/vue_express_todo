import axios from "axios";
import type { Todo } from "../types/Todo";

const API_URL = import.meta.env.VITE_API_URL as string;
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};
export const createTodo = async (task: string): Promise<Todo> => {
  const res = await axios.post(API_URL, { task });
  return res.data;
};
export const updateTodo = async (id: number): Promise<Todo> => {
  const res = await axios.patch(`${API_URL}/${id}`);
  return res.data;
};
export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
