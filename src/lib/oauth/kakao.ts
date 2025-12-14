// 카카오 인가 코드 요청 함수

export const getKakaoAuthUrl = () => {
    const baseUrl = 'https://kauth.kakao.com/oauth/authorize';

    const kakao_client_id = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID as string;
    const kakao_redirect_uri = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI as string;

    const params = new URLSearchParams({
        client_id: kakao_client_id,
        redirect_uri: kakao_redirect_uri,
        response_type: "code",
    });

    return `${baseUrl}?${params.toString()}`;
}