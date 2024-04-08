"use client";

import { Todo } from "@prisma/client";
import React from "react";
import { TodoItem } from "..";

import * as todosApi from "@/todos/helpers/todos";
import { useRouter } from "next/navigation";

interface TodosGridProps {
  todos?: Todo[];
}

export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  const router = useRouter();
  console.log("todos", todos);

  const toggleTodo = async (id: string, complete: boolean) => {
    const updatedTodo = await todosApi.updateTodo(id, complete);
    router.refresh();
    console.log("updatedTodo", updatedTodo);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};
