import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET(request: Request) {
  const session = await prisma.todo.deleteMany();
  await prisma.user.deleteMany();

  const user = await prisma.user.create({
    data: {
      email: "test@test.com",
      password: bcryptjs.hashSync("123456"),
      roles: ["admin", "client", "super-user"],
      todos: {
        create: [
          { description: "Piedra del alma", complete: true },
          { description: "Piedra del tiempo" },
          { description: "Piedra de la mente" },
          { description: "Piedra de la realidad" },
          { description: "Piedra del poder" },
          { description: "Piedra del espacio" },
        ],
      },
    },
  });

  // await prisma.todo.createMany({
  //   data: [
  //     { description: "Piedra del alma", complete: true },
  //     { description: "Piedra del tiempo" },
  //     { description: "Piedra de la mente" },
  //     { description: "Piedra de la realidad" },
  //     { description: "Piedra del poder" },
  //     { description: "Piedra del espacio" },
  //   ],
  // });

  return NextResponse.json({ message: "Seed executed" });
}
