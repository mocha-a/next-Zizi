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

  const [d] = date.split(" ");
  return `${d.replace(/-/g, ".")}`;
}

// 마지막 업데이트 날짜 포맷 (플레이리스트)
const isSameDate = (a: string, b: string) => {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
};

const date = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
};

export const formatUpDate = (
  createdDate: string,
  updatedDate: string
) => {
  const now = new Date();
  const updated = new Date(updatedDate);

  const diff = (now.getTime() - updated.getTime()) / 1000;

  if (isSameDate(createdDate, updatedDate)) return null;

  if (diff < 60) return "방금 전";
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`;

  const days = Math.floor(diff / 86400);

  if (days <= 7) return `${days}일 전`;

  return date(updated);
};