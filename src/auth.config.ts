import { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import prisma from "@/lib/prisma";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

// custom adapter - refresh token에 의한 에러 방지를 위해
const CustomPrismaAdapter = (prismaClient: typeof prisma): Adapter => {
  // 1. 여기서 PrismaAdapter를 any로 캐스팅하여 내부 메서드 접근 제한을 풉니다.
  const adapter = PrismaAdapter(prismaClient) as any;

  return {
    ...adapter,
    
    // 1. 신규 가입 시 호출
    createAccount: async (account: any) => {
        const { refresh_token_expires_in, ...rest } = account;
        return adapter.createAccount(rest);
    },

    // 2. 기존 계정 연결 시 호출 (현재 에러가 발생하는 지점)
    linkAccount: async (account: any) => {
        const { refresh_token_expires_in, ...rest } = account;
        return adapter.linkAccount(rest);
    },
  };
};

// 1. Session 타입 확장 (클라이언트에서 접근할 때)
declare module 'next-auth' {
    interface Session {
        user: {
            id?: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
            needMoreInfo?: boolean;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        id?: string;
    }
}

declare module "next-auth/adapters" {
    interface AdapterUser {
        birth?: string | null;
        gender?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    //Adapter (DB 연결 담당)
    adapter: CustomPrismaAdapter(prisma),

    session: {
        strategy: 'database',
    },

    // provider 설정
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
        })
    ],

    callbacks: {
        // =======================================================
        // 🚨 1단계: DB 연결 시 이 부분을 수정합니다. (현재는 true 반환)
        // =======================================================
        // async signIn({ user, account, profile }) {
        //     if (account?.provider) {
        //         // 
                
        //         // ⚠️ DB 연결 시: 
        //         // 1. user, account, profile 정보를 사용하여 DB에 저장/업데이트 로직 호출
        //         // 2. const dbUser = await saveOrUpdateUser(user, account.provider);
                
        //         // 3. (옵션) DB User 객체의 ID를 user 객체에 임시 저장 (다음 jwt 콜백으로 전달)
        //         // user.id = dbUser.id; 

        //         // 4. DB 작업 성공 시 true 반환
        //         return true; 
        //     }
        //     return false;
        // },

        // =======================================================
        // ✨ 2단계: JWT 콜백 (토큰에 ID 넣기)
        // =======================================================
        // async jwt({ token, user, account }) {
        //     if (user) {
        //         // 💡 DB 연결 시: user.id는 DB에서 저장된 ID가 됩니다.
        //         token.id = user.id as string; 
        //         token.email = user.email;
        //         token.provider = account?.provider;
        //     }
            
        //     // 🚨 DB 연결 전: user.id가 undefined일 경우, provider와 email만 저장합니다.
        //     if (!token.id && account?.provider) {
        //         // 임시 ID가 없어도 provider는 저장합니다.
        //         token.provider = account.provider;
        //         token.email = user?.email;
        //     }
        
        //     return token;
        // },

        // =======================================================
        // 💻 3단계: Session 콜백 (세션에 ID 전달)
        // =======================================================
        async session({ session, user }) {
            if (session.user && user) {
                session.user.id = user.id;
                session.user.needMoreInfo = !user.birth || !user.gender;
            }

            return session;
        },
    } as NextAuthOptions['callbacks'],
};

