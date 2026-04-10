// 팬 숫자 K/M 포맷
export function formatFans(num: number) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}

// 총 재생시간
export function formatDuration(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (hours > 0) {
    return `총 ${hours}시간 ${minutes}분`;
  }

  return `총 ${minutes.toString().padStart(2, "0")}분 ${seconds
    .toString()
    .padStart(2, "0")}초`;
}

// 생성 날짜 포맷 (플레이리스트)
export function formatDate(date?: string) {
  if (!date) return "";

  const [d, t] = date.split(" ");
  return `${d.replace(/-/g, ".")} · ${t.slice(0, 5)}`;
}