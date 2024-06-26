import * as yup from "yup";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getUserSessionServer } from "@/auth/actions/auth-actions";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const take = searchParams.get("take") ?? "10";
  const skip = searchParams.get("skip") ?? "0";

  if (isNaN(+take)) {
    return NextResponse.json(
      { message: "Invalid take parameter, has to be a number" },
      { status: 400 }
    );
  }
  if (isNaN(+skip)) {
    return NextResponse.json(
      { message: "Invalid skip parameter, has to be a number" },
      { status: 400 }
    );
  }

  const todos = await prisma.todo.findMany({
    take: +take,
    skip: +skip,
  });

  return NextResponse.json(todos);
}

// POST
const postSchema = yup.object({
  description: yup.string().required(),
  complete: yup.boolean().optional().default(false),
});

export async function POST(req: Request) {
  const user = await getUserSessionServer();

  if (!user) {
    return NextResponse.json("Not authorized", { status: 401 });
  }

  try {
    const { description, complete } = await postSchema.validate(
      await req.json()
    );

    const todo = await prisma.todo.create({
      data: { description, complete, userId: user.id! },
    });

    return NextResponse.json(todo);
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    await prisma.todo.deleteMany({
      where: { complete: true },
    });

    return NextResponse.json("deleted");
  } catch (error) {
    return NextResponse.json(error, { status: 400 });
  }
}
