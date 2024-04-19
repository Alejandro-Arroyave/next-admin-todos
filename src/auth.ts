import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./lib/prisma";
import { Adapter } from "next-auth/adapters";
import { signInEmailPassword } from "./auth/actions/auth-actions";

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "usuario@test.com",
        },
        password: { label: "Password", type: "password", placeholder: "" },
      },
      async authorize(credentials, req) {
        const user = await signInEmailPassword(
          credentials.email,
          credentials.password
        );
        // const user = { id: "1", name: "Jhon Smith", email: "test@test.com" };

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // console.log(user);
      return true;
    },
    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });

      if (dbUser?.isActive === false) throw Error("Deactivated user");

      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
