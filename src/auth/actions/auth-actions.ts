import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

export const getUserSessionServer = async () => {
  const session = await auth();

  return session?.user;
};

export const signInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!bcryptjs.compareSync(password, user.password ?? "")) {
    return null;
  }

  return user;
};

const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      email,
      password: bcryptjs.hashSync(password),
      name: email.split("@")[0],
    },
  });

  return user;
};
