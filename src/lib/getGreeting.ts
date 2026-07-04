import { GREETINGS_BY_TIME } from "@/constants/greetings";

export function getGreeting(name: string) {
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

  const text = group.texts[randomIndex](name);

  return {
    id: group.id,
    lines: text.split('\n'),
  };
}