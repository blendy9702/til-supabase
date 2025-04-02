"use server";

import { resolve } from "path";

const TODOS: string[] = [];
// 할일 목록 가져오기
export const getTodos = async (): Promise<string[]> => {
  // 딜레이 추가
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return TODOS;
};

// 할일 목록 추가하기
export const createTodos = async (data: string): Promise<string[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  // 새로운 todo 를 추가
  TODOS.push(data);
  return TODOS;
};
