import { GREETINGS_BY_TIME } from "@/constants/greetings";

export function getGreeting() {
  const hour = Number(
    new Intl.DateTimeFormat('ko-KR', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Seoul',
    }).format(new Date())
  );

  const group =
    GREETINGS_BY_TIME.find((g) => hour < g.maxHour) ??
    GREETINGS_BY_TIME.at(-1)!;

  const randomIndex = Math.floor(Math.random() * group.texts.length);

  const greeting = group.texts[randomIndex];

  return {
    id: group.id,
    lines: greeting.lines,
  };
}