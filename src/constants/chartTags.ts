export type PageTags = {
    top: string[],
    genre: { name: string, id: string }[],
    // mood: { kor: string, eng: string, icon: string }[]
};

export const allTags = {
    // top: ['GLOBAL', 'K-POP', 'J-POP', 'POP'],
    genre: [
        {
            name: 'POP',
            id: '132'
        },
        // {
        //     kor: 'K-POP',
        //     eng: 'k-pop'
        // },
        {
            name: '댄스',
            id: '113'
        },
        {
            name: '락',
            id: '152'
        },
        // {
        //     name: '인디',
        // },
        {
            name: '재즈',
            id: '129'
        },
        {
            name: 'R&B',
            id: '165'
        },
        {
            name: '랩/힙합',
            id: '116'
        },
        {
            name: '클래식',
            id: '98'
        }
    ],
    // mood: [
    //     {
    //         kor: '여유로운',
    //         eng: 'chill',
    //         icon: '☕'
    //     },
    //     {
    //         kor: '행복한',
    //         eng: 'happy',
    //         icon: '😊'
    //     },
    //     {
    //         kor: '수면',
    //         eng: 'sleep',
    //         icon: '💤'
    //     },
    //     {
    //         kor: '공부',
    //         eng: 'study',
    //         icon: '✏'
    //     },
    //     {
    //         kor: '사랑',
    //         eng: 'love',
    //         icon: '💗'
    //     },
    //     {
    //         kor: '슬픈',
    //         eng: "sad",
    //         icon: '🌧'
    //     },
    //     {
    //         kor: '운동',
    //         eng: 'workout',
    //         icon: '💪'
    //     },
    //     {
    //         kor: '드라이브',
    //         eng: 'driving',
    //         icon: '🚗'
    //     },
    //     {
    //         kor: '어두운',
    //         eng: 'dark',
    //         icon: '🕳'
    //     },
    //     {
    //         kor: '휴식',
    //         eng: "relaxing",
    //         icon: '🌿'
    //     }
    // ]
};