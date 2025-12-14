"use client";

import Image from "next/image";
import { getKakaoAuthUrl } from '@/lib/oauth/kakao';

export default function KakaoLoginButton() {
    return (
        <button onClick={() => (window.location.href = getKakaoAuthUrl())}>
            <Image
                src={'/imgs/login_kakao.png'}
                alt='login-kakao'
                width={60}
                height={60}
            />
        </button>
    )
}