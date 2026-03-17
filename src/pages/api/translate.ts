// pages/api/translate.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

/**
 * DeepL 무료 API를 사용한 번역
 * <a> 태그와 안의 내용은 제거
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "No text provided" });

  try {
    // DeepL API key 환경변수에서 가져오기
    const apiKey = process.env.DEEPL_API_KEY;
    if (!apiKey) return res.status(500).json({ message: "DeepL API key not set" });

    // 1. <a> 태그와 안의 내용 제거
    const textWithoutLinks = text.replace(/<a [^>]*>.*?<\/a>/gi, "");

    // 2. 나머지 HTML 태그 제거 (선택사항)
    const cleanText = textWithoutLinks.replace(/<[^>]+>/g, "").trim();
    console.log(cleanText);
    // 3. DeepL API 요청
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      new URLSearchParams({
        text: cleanText,
        target_lang: "KO",
        // tag_handling 안 써도 됨, 이미 HTML 제거했으니까
      }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
          },
        }
    );

    const translatedText = response.data.translations[0]?.text;

    res.status(200).json({ translatedText });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: "Translation failed" });
  }
}
