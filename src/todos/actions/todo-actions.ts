"use server";

import prisma from "@/lib/prisma";
import { Todo } from "@prisma/client";
import { revalidatePath } from "next/cache";

const sleep = (seconds: number = 0): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, seconds * 1000);
  });
};

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo> => {
  await sleep(2);
  const todo = await prisma.todo.findFirst({ where: { id: id } });

  if (!todo) throw `Todo with id ${id} does not exist`;

  const updatedTodo = await prisma.todo.update({
    where: { id },
    data: { complete },
  });

  revalidatePath("/dashboard/server-todos");

  return updatedTodo;
};
export const addTodo = async (description: string) => {
  try {
    const todo = await prisma.todo.create({ data: { description } });
    revalidatePath("/dashboard/server-todos");

    return todo;
  } catch (error) {
    return {
      message: "Error creating todo",
    };
  }
};

export const deleteCompleted = async (): Promise<void> => {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });
    revalidatePath("/dashboard/server-todos");
  } catch (error) {
    console.log("error");
  }
};
