import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  const { text } = await req.json();

  if (!text) {
    return NextResponse.json(
      { message: "No text provided" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(
      "https://api-free.deepl.com/v2/translate",
      new URLSearchParams({
        text,
        target_lang: "KO",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        },
      }
    );

    return NextResponse.json({
      translatedText: response.data.translations[0]?.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Translation failed" },
      { status: 500 }
    );
  }
}