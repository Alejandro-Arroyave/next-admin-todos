"use client";

import { Todo } from "@prisma/client";
import React, { startTransition, useOptimistic } from "react";

import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface TodoItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}

export const TodoItem = ({ todo, toggleTodo }: TodoItemProps) => {
  const [todoOptimisitic, toggleTodoOptimisitic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimisitic(!todoOptimisitic.complete));
      await toggleTodo(todoOptimisitic.id, !todoOptimisitic.complete);
    } catch (error) {
      startTransition(() => toggleTodoOptimisitic(!todoOptimisitic.complete));
    }
  };

  return (
    <div
      className={
        todoOptimisitic.complete ? styles.todoDone : styles.todoPending
      }
    >
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          // onClick={() =>
          //   toggleTodo(todoOptimisitic.id, !todoOptimisitic.complete)
          // }
          onClick={onToggleTodo}
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 ${
            todoOptimisitic.complete ? "bg-blue-100" : "bg-red-100"
          }`}
        >
          {todoOptimisitic.complete ? (
            <IoCheckboxOutline size={30} />
          ) : (
            <IoSquareOutline size={30} />
          )}
        </div>

        <div className="text-center sm:text-left">
          {todoOptimisitic.description}
        </div>
      </div>
    </div>
  );
};
