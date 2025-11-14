export type PageTags = {
    top: string[],
    genre: { kor: string, eng: string }[],
    mood: { kor: string, eng: string, icon: string }[]
};

export const allTags = {
    top: ['GLOBAL', 'K-POP', 'J-POP', 'POP'],
    genre: [
        {
            kor: 'POP',
            eng: 'pop'
        },
        {
            kor: 'K-POP',
            eng: 'k-pop'
        },
        {
            kor: '댄스',
            eng: 'dance'
        },
        {
            kor: '락',
            eng: 'rock'
        },
        {
            kor: '인디',
            eng: 'Indie'
        },
        {
            kor: '재즈',
            eng: "Jazz"
        },
        {
            kor: '알앤비',
            eng: 'r&b'
        },
        {
            kor: '힙합',
            eng: 'hip-hop'
        },
        {
            kor: '클래식',
            eng: 'classical'
        }
    ],
    mood: [
        {
            kor: '여유로운',
            eng: 'chill',
            icon: '☕'
        },
        {
            kor: '행복한',
            eng: 'happy',
            icon: '😊'
        },
        {
            kor: '수면',
            eng: 'sleep',
            icon: '💤'
        },
        {
            kor: '공부',
            eng: 'study',
            icon: '✏'
        },
        {
            kor: '사랑',
            eng: 'love',
            icon: '💗'
        },
        {
            kor: '슬픈',
            eng: "sad",
            icon: '🌧'
        },
        {
            kor: '운동',
            eng: 'workout',
            icon: '💪'
        },
        {
            kor: '드라이브',
            eng: 'driving',
            icon: '🚗'
        },
        {
            kor: '어두운',
            eng: 'dark',
            icon: '🕳'
        },
        {
            kor: '휴식',
            eng: "relaxing",
            icon: '🌿'
        }
    ]
};