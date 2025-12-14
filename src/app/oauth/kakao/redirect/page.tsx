"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function KakaoRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState('');
    
    useEffect(() => {
        const code = searchParams?.get("code");
    
        if (!code) {
            router.push('/login');
            return;
        }

        fetch("/api/oauth/kakao", { 
            method: "POST",
            headers: {
                // ❗ 이 헤더가 누락되면 서버가 body를 JSON으로 인식 못할 수 있습니다.
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ code })
        })
        .then(res => {
            // 서버가 302 응답을 보냈다면 (로그인 성공), 
            // 클라이언트도 즉시 메인 페이지로 이동을 시도합니다.
            if (res.ok || res.status === 302) { 
                setStatus('로그인 성공! 메인 페이지로 이동 중...');
                // ❗ 클라이언트 측에서도 명시적으로 리다이렉트 호출
                router.push('/'); 
            } else {
                // 로그인 실패 (401/400/500 등)
                return res.json().then(data => {
                    throw new Error(data.message || '로그인 처리 실패');
                });
            }
        })
        .catch(err => {
            console.error("카카오 로그인 처리 중 에러 발생:", err);
            setStatus(`로그인 실패: ${err.message}`);
            router.push('/login');
        });
        
    }, [router, searchParams]);

  return (
    <div>
        <h2>카카오 로그인 처리 중...</h2>
        <p>{status}</p>
        {/* 로그인 성공 후에도 이 컴포넌트가 잠시 남아있을 수 있지만,
            router.push('/')가 최종적으로 페이지를 전환시켜야 합니다. */}
    </div>
  );
}
