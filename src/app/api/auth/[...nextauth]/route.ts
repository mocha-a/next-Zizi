import NextAuth, { DefaultSession, DefaultUser, NextAuthOptions } from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";

// 1. Session 타입 확장 (클라이언트에서 접근할 때 사용)
declare module 'next-auth' {
    interface Session {
        user: {
            id?: string | null;
            email?: string | null;
            name?: string | null;
            birth?: string | null;
            gender?: string | null;
            provider?: string | null;
        } & DefaultSession['user'] // ⚠️ 기존 NextAuth user 속성 포함
    }

    // 2. User 타입 확장 (Provider가 제공하는 user 객체에 id 추가)
    interface User extends DefaultUser {
        id?: string; // DB ID를 임시로 저장할 속성 추가
    }
}

// 3. JWT 타입 확장 (토큰에 저장되는 정보)
declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        email?: string | null;
        provider?: string | null;
        birth?: string | null;
        gender?: string | null;
        // ⚠️ 나머지 속성 추가
    }
}

export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt' as const,
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
        async jwt({ token, user, account }) {
            if (user) {
                // 💡 DB 연결 시: user.id는 DB에서 저장된 ID가 됩니다.
                token.id = user.id as string; 
                token.email = user.email;
                token.provider = account?.provider;
            }
            
            // 🚨 DB 연결 전: user.id가 undefined일 경우, provider와 email만 저장합니다.
            if (!token.id && account?.provider) {
                // 임시 ID가 없어도 provider는 저장합니다.
                token.provider = account.provider;
                token.email = user?.email;
            }
        
            return token;
        },

        // =======================================================
        // 💻 3단계: Session 콜백 (세션에 ID 전달)
        // =======================================================
        async session({ session, token }) {
            // JWT 토큰에 있는 ID와 Provider를 세션 객체에 넣습니다.
            session.user.id = token.id; // 이미 JWT 타입에서 string | undefined 이므로 as string 불필요
            session.user.email = token.email;
            session.user.provider = token.provider;
            session.user.birth = token.birth;
            session.user.gender = token.gender;

            return session;
        },
    } as NextAuthOptions['callbacks'],
};

// 💡 authOptions를 사용하여 핸들러 객체를 생성합니다.
// NextAuth(authOptions)는 실제 로그인/로그아웃 처리를 담당하는 함수를 반환합니다.
const handler = NextAuth(authOptions); 

// ⭐️ 핵심: 이 핸들러를 GET 및 POST 메서드로 내보내야 Next.js API 라우트로 작동합니다.
// 이 코드가 없으면, NextAuth가 필요한 내부 로직(handlers 객체)을 완전히 초기화하지 않아 
// auth.ts 파일에서 "Cannot read properties of undefined (reading 'GET')" 에러가 발생합니다.
export { handler as GET, handler as POST };