// NextAuth TypeScript 타입 확장 파일
import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    needMoreInfo?: boolean;
  }

  interface Session {
    user: {
      id: string;
      needMoreInfo?: boolean;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    needMoreInfo?: boolean;
  }
}