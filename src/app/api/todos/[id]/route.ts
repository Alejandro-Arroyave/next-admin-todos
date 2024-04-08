import * as yup from "yup";
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { Todo } from "@prisma/client";

interface Segments {
  params: { id: string };
}

const getTodo = async (id: string): Promise<Todo | null> => {
  return await prisma.todo.findUnique({
    where: { id: id },
  });
};

export async function GET(request: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (todo) return NextResponse.json({ result: todo });

  return NextResponse.json(
    {
      message: "Todo not found",
    },
    {
      status: 404,
    }
  );
}

const putSchema = yup.object({
  complete: yup.boolean().optional(),
  description: yup.string().optional(),
});
export async function PUT(req: Request, { params }: Segments) {
  const todo = await getTodo(params.id);

  if (!todo)
    return NextResponse.json({ message: "Todo not found" }, { status: 404 });

  try {
    const { description, complete } = await putSchema.validate(
      await req.json()
    );

    const updatedTodo = await prisma.todo.update({
      where: { id: params.id },
      data: { description, complete },
    });
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
