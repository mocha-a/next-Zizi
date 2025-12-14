// import { PrismaClient } from '@prisma/client';

// // Next.js 개발 환경에서 Hot Reloading 시 인스턴스 중복 생성을 막기 위한 안전장치
// declare global {
//   var prisma: PrismaClient | undefined;
// }

// // 전역에서 재사용하거나 새로 생성합니다.
// const db = global.prisma || new PrismaClient({
//   log: ['query'], // (선택 사항)
// });

// if (process.env.NODE_ENV !== 'production') global.prisma = db;

// export default db;