import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";

import CredentialsProvider from "next-auth/providers/credentials";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import bcrypt from "bcryptjs";

// Prisma Adapter
const CustomPrismaAdapter = (prismaClient: typeof prisma): Adapter => {
  const adapter = PrismaAdapter(prismaClient) as any;

  return {
    ...adapter,
    createAccount: async (account: any) => {
      const { refresh_token_expires_in, ...rest } = account;
      return adapter.createAccount(rest);
    },
    linkAccount: async (account: any) => {
      const { refresh_token_expires_in, ...rest } = account;
      return adapter.linkAccount(rest);
    },
  };
};

// 타입 확장
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    } & DefaultSession["user"];
  }
}

export const authOptions: NextAuthOptions = {
  adapter: CustomPrismaAdapter(prisma),

session: {
    strategy: "jwt"
},

  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),

    // 🔥 핵심: credentials 로그인 추가
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],

  callbacks: {
        async jwt({ token, user }) {
            if (user) {
            token.id = user.id;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
            session.user.id = token.id as string;
            }
            return session;
        },
    }
};