"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginButtons() {
    const handleLogin = (provider: string) => {
        // ❗ signIn 함수는 하나만 사용하고, Provider 이름만 바꿔서 호출합니다.
        signIn(provider, { callbackUrl: '/' }); 
    };

    return (
        <div className='login-social-icons'>
            {/* 카카오 로그인 */}
            <button onClick={() => handleLogin('kakao')}>
                <Image
                    src={'/imgs/login_kakao.png'}
                    alt='login-kakao'
                    width={60}
                    height={60}
                />
            </button>

            {/* 구글 로그인 */}
            <button onClick={() => handleLogin('google')}>
                <Image
                    src={'/imgs/login_google.png'}
                    alt='login-google'
                    width={60}
                    height={60}
                />
            </button>

            {/* 네이버 로그인 */}
            <button onClick={() => handleLogin('naver')}>
                <Image
                    src={'/imgs/login_naver.png'}
                    alt='login-naver'
                    width={60}
                    height={60}
                />
            </button>
        </div>
    )
}