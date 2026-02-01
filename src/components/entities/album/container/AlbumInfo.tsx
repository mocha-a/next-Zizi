import React, { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  album?: {
    name: string;
    artists: {
      name: string;
    }[];
  } | null;
}

const API_KEY = "1a683a3bff554bed77e6d5e89b7d5a63";
const LAST_FM_URL = "https://ws.audioscrobbler.com/2.0/";

export default function AlbumInfo({ album }: Props) {
  const [ data, setData ] = useState<any>(null);
  const [ translated, setTranslated ] = useState("");

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        // 1️⃣ Last.fm 앨범 정보 가져오기
        const res = await axios.get(LAST_FM_URL, {
          params: {
            method: "album.getInfo",
            artist: album?.artists[0].name,
            album: album?.name,
            api_key: API_KEY,
            format: "json"
          }
        });
        setData(res.data.album);

        // 2️⃣ 영어 설명 가져오기
        const summary = res.data.album.wiki?.summary || "";
        console.log("Original:", summary);

        if (summary) {
          // 3️⃣ <a> 태그 제거
          const cleanSummary = summary.replace(/<a [^>]*>.*?<\/a>/gi, "");

          // 4️⃣ 문장 단위로 쪼개기
          const sentences = cleanSummary
            .split(/(?<=[.?!])\s+/) // . ? ! 뒤 공백 기준
            .map(s => s.trim())
            .filter(Boolean);

          // 5️⃣ 문장 단위 번역
          const translatedSentences: string[] = [];
          for (const sentence of sentences) {
            const translatedRes = await axios.post("/api/translate", { text: sentence });
            translatedSentences.push(translatedRes.data.translatedText || "");
          }

          // 6️⃣ 줄바꿈 적용
          setTranslated(translatedSentences.join("\n"));
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchAlbum();
  }, []);

  return (
    <div style={{  }}>
      {data ? (
        <>
          <pre style={{ whiteSpace: "pre-wrap", paddingBottom: "60px" }}>
            {translated}
          </pre>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
