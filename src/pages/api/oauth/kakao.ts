import { NextApiRequest, NextApiResponse } from "next";
import querystring from 'querystring'; // Pages Router에서 URL 인코딩을 위해 사용

const kakao_token_url = "https://kauth.kakao.com/oauth/token";

const client_id = process.env.KAKAO_CLIENT_ID!;
const client_secret = process.env.KAKAO_CLIENT_SECRET!;
const redirect_uri = process.env.KAKAO_REDIRECT_URI!;

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
    // ⚠️ Pages Router에서는 req.body에 JSON이 자동으로 파싱되어 들어옵니다.
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: "code missing" });
    }

    try {
        // 1) 토큰 요청
        const tokenRes = await fetch(kakao_token_url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
            body: querystring.stringify({
                grant_type: "authorization_code",
                client_id: client_id,
                client_secret: client_secret,
                redirect_uri: redirect_uri,
                code,
            }),
        });

        if (!tokenRes.ok) {
            const errorData = await tokenRes.json();
            console.error("카카오 토큰 요청 실패 상세:", errorData);
            return res.status(401).json({ error: "Failed to get token from Kakao", details: errorData });
        }
    
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;
    
        // // 2) 유저 정보 요청
        // const userRes = await fetch("https://kapi.kakao.com/v2/user/me", {
        //     headers: { Authorization: `Bearer ${accessToken}` },
        // });
    
        // const userInfo = await userRes.json();
    
        // const kakaoId = userInfo.id;
        // const email = userInfo.kakao_account.email;
    
        // 3) DB에 유저 저장 or 찾기
        // const user = await saveOrFindUser("kakao", kakaoId, email);
    
        // 4) 쿠키 발급
        // JWT/세션 발급 후 쿠키에 저장하는 방식 (액세스 토큰 자체를 쿠키에 저장하는 것은 권장되지 않습니다)
        res.setHeader('Set-Cookie', `token=${accessToken}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`);
        
        // 리다이렉트
        res.redirect(302, "http://localhost:3000");

    } catch (error) {
        console.error("카카오 로그인 API 처리 중 에러 발생:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}

export default async function KakaoOAuthHandler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        // POST 요청일 때만 처리 함수 호출
        await handlePost(req, res);
    } else {
        // POST가 아닌 요청은 거부
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}