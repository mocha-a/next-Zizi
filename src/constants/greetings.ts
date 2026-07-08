export interface GreetingSegment {
  text: string;
  isName?: boolean;
}

export interface GreetingText {
  lines: GreetingSegment[][];
}

export interface GreetingData {
  maxHour: number;
  id: string;
  texts: GreetingText[];
}

export const GREETINGS_BY_TIME: GreetingData[] = [
  {
    maxHour: 6,
    id: 'night',
    texts: [
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님,' },
          ],
          [
            { text: '새벽 공기처럼' },
          ],
          [
            { text: '잔잔하게 🎧' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '잠 못 드는 새벽, ' },
            { text: '', isName: true },
            { text: ' 님과 함께할' },
          ],
          [
            { text: '잔잔한 선율 🌌' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '모두가 잠든 시간,' },
          ],
          [
            { text: '', isName: true },
            { text: ' 님만의' },
          ],
          [
            { text: '비밀스러운 공간 🤫' },
          ],
        ],
      },
    ],
  },

  {
    maxHour: 11,
    id: 'morning',
    texts: [
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님의' },
          ],
          [
            { text: '아침을 깨우는' },
          ],
          [
            { text: '상쾌한 비트 시작 -! ♬' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님,' },
          ],
          [
            { text: '기분 좋은 리듬으로' },
          ],
          [
            { text: '하루를 열어봐 ♬' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '굿모닝 ' },
            { text: '', isName: true },
            { text: ' 님!' },
          ],
          [
            { text: '오늘 하루도' },
          ],
          [
            { text: '활기차게 Play - ▶️' },
          ],
        ],
      },
    ],
  },

  {
    maxHour: 17,
    id: 'afternoon',
    texts: [
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님의' },
          ],
          [
            { text: '오후도 Zizi가' },
          ],
          [
            { text: '응원해 -!' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '반가워 ' },
            { text: '', isName: true },
            { text: ' 님!' },
          ],
          [
            { text: '남은 하루도' },
          ],
          [
            { text: '힘내보자 ♬' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님,' },
          ],
          [
            { text: '오후도 신나는' },
          ],
          [
            { text: '리듬으로 가보자 ♬' },
          ],
        ],
      },
    ],
  },

  {
    maxHour: 24,
    id: 'evening',
    texts: [
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님,' },
          ],
          [
            { text: '오늘 하루도' },
          ],
          [
            { text: '수고 많았어🌙' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '하루의 끝,' },
          ],
          [
            { text: '', isName: true },
            { text: ' 님과 함께할' },
          ],
          [
            { text: '좋은 음악 한 곡🌙' },
          ],
        ],
      },
      {
        lines: [
          [
            { text: '', isName: true },
            { text: ' 님,' },
          ],
          [
            { text: '오늘 밤도' },
          ],
          [
            { text: '좋은 음악과 함께 🌌' },
          ],
        ],
      },
    ],
  },
];