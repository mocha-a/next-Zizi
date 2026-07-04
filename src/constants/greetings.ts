export interface GreetingData {
  maxHour: number;
  id: string;
  texts: ((name: string) => string)[];
}

export const GREETINGS_BY_TIME: GreetingData[] = [
  {
    maxHour: 6,
    id: 'night',
    texts: [
      (name) => `${name} 님, \n 새벽 공기처럼 \n 잔잔하게 🎧`,
      (name) => `잠 못 드는 새벽, / ${name} 님과 함께할 / 잔잔한 선율 🌌`,
      (name) => `모두가 잠든 시간, / ${name} 님만의 / 비밀스러운 공간 🤫`,
    ],
  },
  {
    maxHour: 11,
    id: 'morning',
    texts: [
      (name) => `${name} 님의 \n 아침을 깨우는 \n 상쾌한 비트 시작 -! ♬`,
      (name) => `${name} 님, \n 기분 좋은 리듬으로 \n 하루를 열어봐 ♬`,
      (name) => `굿모닝 ${name} 님! \n 오늘 하루도 \n 활기차게 Play - ▶️`,
    ],
  },
  {
    maxHour: 17,
    id: 'afternoon',
    texts: [
      (name) => `${name} 님의 \n 오후도 Zizi가 \n 응원해 -!`,
      (name) => `반가워 ${name} 님! \n 남은 하루도 \n 힘내보자 ♬`,
      (name) => `${name} 님, \n 오후도 신나는 \n 리듬으로 가보자 ♬`,
    ],
  },
  {
    maxHour: 24,
    id: 'evening',
    texts: [
      (name) => `${name} 님, \n 오늘 하루도 \n 수고 많았어 🌙`,
      (name) => `하루의 끝, \n ${name} 님과 함께할 \n 좋은 음악 한 곡 🌙`,
      (name) => `${name} 님, \n 오늘 밤도 \n 좋은 음악과 함께 🌌`,
    ],
  },
];